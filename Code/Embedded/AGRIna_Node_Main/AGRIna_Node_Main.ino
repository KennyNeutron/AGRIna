// AGRIna_Node_Main.ino — Receiver (ESP32 + RA-02/SX1278)
#include <SPI.h>
#include <LoRa.h>
#include "DataStructure.h"  // defines packed AGRInaData + global Data_AGRIna (unused here) :contentReference[oaicite:1]{index=1}

// ==== ESP32 LoRa Pins (match your wiring) ====
static const int PIN_LORA_SS   = 5;   // NSS / CS
static const int PIN_LORA_RST  = 14;  // RESET
static const int PIN_LORA_DIO0 = 26;   // DIO0

// ==== LoRa Radio Settings ====
static const long LORA_FREQUENCY = 433E6; // change to 868E6 or 915E6 as applicable

// Optional: Expected header/footer for quick validation
static const uint8_t kHeader = 0x55;
static const uint8_t kFooter = 0xAA;

void hexDump(const uint8_t* buf, size_t len) {
  for (size_t i = 0; i < len; i++) {
    if (i && (i % 16 == 0)) Serial.println();
    if (buf[i] < 0x10) Serial.print('0');
    Serial.print(buf[i], HEX);
    Serial.print(' ');
  }
  Serial.println();
}

void setup() {
  Serial.begin(115200);
  while (!Serial) {}

  Serial.println(F("\nAGRIna LoRa RX (ESP32 + RA-02) starting..."));
  Serial.print(F("Expecting payload bytes: "));
  Serial.println(sizeof(AGRInaData));

  LoRa.setPins(PIN_LORA_SS, PIN_LORA_RST, PIN_LORA_DIO0);
  if (!LoRa.begin(LORA_FREQUENCY)) {
    Serial.println(F("[ERR] LoRa init failed. Check wiring/frequency."));
    for(;;) { delay(1000); }
  }

  // Optional radio tuning (match TX if you changed these there)
  LoRa.setSpreadingFactor(7);
  LoRa.setSignalBandwidth(125E3);
  LoRa.setCodingRate4(5);

  Serial.println(F("[OK] LoRa ready. Waiting for packets..."));
}

void loop() {
  int packetSize = LoRa.parsePacket();
  if (packetSize <= 0) return;

  Serial.println(F("\n--- Packet Received ---"));
  Serial.print(F("packetSize=")); Serial.print(packetSize);
  Serial.print(F("  RSSI="));     Serial.print(LoRa.packetRssi());
  Serial.print(F("  SNR="));      Serial.println(LoRa.packetSnr(), 1);

  // Read all available bytes
  uint8_t buf[64];  // plenty for this struct
  int idx = 0;
  while (LoRa.available() && idx < (int)sizeof(buf)) {
    buf[idx++] = LoRa.read();
  }

  if (idx != (int)sizeof(AGRInaData)) {
    Serial.print(F("[WARN] Unexpected size. Got ")); Serial.print(idx);
    Serial.print(F(", expected ")); Serial.println(sizeof(AGRInaData));
    Serial.println(F("Hex dump:"));
    hexDump(buf, idx);
    return;
  }

  // Reconstruct struct
  AGRInaData rx{};
  memcpy(&rx, buf, sizeof(rx));

  // Validate header/footer
  bool ok = (rx.Header == kHeader) && (rx.Footer == kFooter);

  if (!ok) {
    Serial.println(F("[WARN] Header/Footer invalid. Dumping bytes:"));
    Serial.print(F("Header=0x")); Serial.print(rx.Header, HEX);
    Serial.print(F("  Footer=0x")); Serial.println(rx.Footer, HEX);
    hexDump(buf, idx);
    return;
  }

  // Print decoded fields
  Serial.println(F("[OK] Valid AGRInaData payload"));
  Serial.print(F("DeviceID: ")); Serial.println(rx.AN_DeviceID);
  Serial.print(F("Soil Temp (°C): ")); Serial.println(rx.AN_SoilTemperature, 2);
  Serial.print(F("pH: ")); Serial.println(rx.AN_pH, 2);
  Serial.print(F("Nitrogen: ")); Serial.println(rx.AN_Nitrogen);
  Serial.print(F("Phosphorus: ")); Serial.println(rx.AN_Phosphorus);
  Serial.print(F("Potassium: ")); Serial.println(rx.AN_Potassium);
}
