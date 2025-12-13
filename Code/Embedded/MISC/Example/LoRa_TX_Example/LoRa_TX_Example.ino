#include <SPI.h>
#include <LoRa.h>

#define LORA_NSS   10   // CS
#define LORA_RST    9
#define LORA_DIO0   2
#define LORA_FREQ_HZ 433E6  // change to 868E6 or 915E6 if needed

// Optional: keep both ends identical
static void loraRadioConfig() {
  LoRa.setSpreadingFactor(7);        // SF7
  LoRa.setSignalBandwidth(125E3);    // 125 kHz
  LoRa.setCodingRate4(5);            // 4/5
  LoRa.setSyncWord(0x34);            // custom sync word (match receiver)
  LoRa.enableCrc();                  // add CRC
}

void setup() {
  Serial.begin(9600);
  while (!Serial) {}

  // Attach module pins
  LoRa.setPins(LORA_NSS, LORA_RST, LORA_DIO0);

  if (!LoRa.begin(LORA_FREQ_HZ)) {
    Serial.println("LoRa init failed. Check wiring/power.");
    while (1) {}
  }

  loraRadioConfig();
  Serial.println("LoRa TX ready.");
}

void loop() {
  const char* msg = "Hello World!";
  LoRa.beginPacket();
  LoRa.print(msg);
  LoRa.endPacket();              // TX

  Serial.print("Sent: ");
  Serial.println(msg);

  delay(1000);                   // 1 Hz
}
