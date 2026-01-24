// AGRIna_Field_Device.ino  —  Transmitter (Arduino Nano + RA-02/SX1278)
// Requires: Sandeep Mistry's LoRa library (Library Manager -> "LoRa" by Sandeep Mistry)

#include <SPI.h>
#include <LoRa.h>
#include "DataStructure.h"  // contains AGRInaData Data_AGRIna (packed)

// === LoRa Radio Pins (Arduino Nano) ===
// NSS(SS)=10, RST=9, DIO0=2  (matches your wiring)
static const int PIN_LORA_SS = 10;
static const int PIN_LORA_RST = 9;
static const int PIN_LORA_DIO0 = 2;

// === LoRa Frequency ===
// Change to 868E6 or 915E6 if you use those bands.
static const long LORA_FREQUENCY = 433E6;

// Send every N ms
static const uint32_t TX_INTERVAL_MS = 1000UL;
uint32_t lastTx = 0;

// Optional: a simple sequence counter you can add later if needed
uint32_t txCount = 0;

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

  Serial.println(F("AGRIna LoRa TX (Arduino Nano + RA-02) starting..."));

  // Set initial values for the struct (for now, static demo values)
  // Tip: Header/Footer can be used for quick packet framing checks
  Data_AGRIna.Header = 0x55;
  Data_AGRIna.AN_DeviceID = 0x03;
  //   Data_AGRIna.AN_SoilTemperature = 27.5f;
  //   Data_AGRIna.AN_pH = 6.80f;
  //   Data_AGRIna.AN_Nitrogen = 20;  // mg/kg or your chosen unit
  //   Data_AGRIna.AN_Phosphorus = 10;
  //   Data_AGRIna.AN_Potassium = 15;
  Data_AGRIna.Footer = 0xAA;

  // Configure LoRa pins and radio
  LoRa.setPins(PIN_LORA_SS, PIN_LORA_RST, PIN_LORA_DIO0);

  if (!LoRa.begin(LORA_FREQUENCY)) {
    Serial.println(F("[ERR] LoRa init failed. Check wiring/frequency."));
    while (true) { delay(1000); }
  }

  // Optional radio tweaks
  LoRa.setTxPower(17);             // 2..20 (dBm), watch legal limits
  LoRa.setSpreadingFactor(7);      // 6..12
  LoRa.setSignalBandwidth(125E3);  // 7.8E3..500E3
  LoRa.setCodingRate4(5);          // 5..8

  Serial.print(F("Struct size (bytes): "));
  Serial.println(sizeof(Data_AGRIna));
  Serial.println(F("Initial payload (hex):"));
  hexDump(reinterpret_cast<uint8_t*>(&Data_AGRIna), sizeof(Data_AGRIna));

  lastTx = millis();

  SoilSensor_setup();
}

void loop() {
  SoilSensor_loop();

  const uint32_t now = millis();
  if (now - lastTx >= TX_INTERVAL_MS) {
    lastTx = now;

    // (Optional) Mutate values here if you want to see changes over time
    // Example: Data_AGRIna.AN_SoilTemperature += 0.1f;

    // Transmit the raw struct
    LoRa.beginPacket();
    LoRa.write((uint8_t*)&Data_AGRIna, sizeof(Data_AGRIna));
    LoRa.endPacket();

    txCount++;
    Serial.print(F("TX #"));
    Serial.print(txCount);
    Serial.print(F("  bytes="));
    Serial.print(sizeof(Data_AGRIna));
    Serial.print(F("  ID="));
    Serial.print(Data_AGRIna.AN_DeviceID);
    Serial.print(F("  T="));
    Serial.print(Data_AGRIna.AN_SoilTemperature, 2);
    Serial.print(F("  pH="));
    Serial.print(Data_AGRIna.AN_pH, 2);
    Serial.print(F("  NPK="));
    Serial.print(Data_AGRIna.AN_Nitrogen);
    Serial.print('/');
    Serial.print(Data_AGRIna.AN_Phosphorus);
    Serial.print('/');
    Serial.print(Data_AGRIna.AN_Potassium);
    Serial.println();
  }
}
