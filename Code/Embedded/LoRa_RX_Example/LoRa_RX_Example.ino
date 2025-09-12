#include <SPI.h>
#include <LoRa.h>

#define LORA_NSS    5   // CS
#define LORA_RST   14
#define LORA_DIO0  26
#define LORA_FREQ_HZ 433E6  // change to 868E6 or 915E6 if needed

static void loraRadioConfig() {
  LoRa.setSpreadingFactor(7);
  LoRa.setSignalBandwidth(125E3);
  LoRa.setCodingRate4(5);
  LoRa.setSyncWord(0x34);   // must match transmitter
  LoRa.enableCrc();
}

void setup() {
  Serial.begin(115200);
  // Attach module pins
  LoRa.setPins(LORA_NSS, LORA_RST, LORA_DIO0);

  if (!LoRa.begin(LORA_FREQ_HZ)) {
    Serial.println("LoRa init failed. Check wiring/power.");
    while (1) {}
  }

  loraRadioConfig();
  Serial.println("LoRa RX ready.");
}

void loop() {
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    String incoming = "";
    while (LoRa.available()) {
      incoming += (char)LoRa.read();
    }
    long rssi = LoRa.packetRssi();
    float snr = LoRa.packetSnr();

    Serial.print("Received: ");
    Serial.print(incoming);
    Serial.print(" | RSSI: ");
    Serial.print(rssi);
    Serial.print(" dBm | SNR: ");
    Serial.println(snr, 1);
  }
}
