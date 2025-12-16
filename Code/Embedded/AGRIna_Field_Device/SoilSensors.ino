// File: Dual_RS485_Soil_NPK_SEN0605_or_AutoScan.ino
// Board: Arduino Nano/Uno (ATmega328P)
//
// Links (each probe has its own MAX485):
//   NPK probe  (Probe A): RO=D3, RE&DE=D4, DI=D5
//   5-in-1 probe (Probe B): RO=D6, RE&DE=D7, DI=D8
//
// Both probes run at 4800-8-N-1 here and both are ID=0x01
// (that’s OK because they are on different transceivers).
//
// Behavior:
// 1) Try DFRobot SEN0605 map for NPK (FC03 @ 0x001E..0x0020).
// 2) If that fails or returns all zeros, auto-scan common maps (FC03/FC04).
// 3) Print which method was adopted.
//
// Optional: send 'd' over Serial to dump some NPK raw registers (debug).

#include <SoftwareSerial.h>

// ---------------- Pins --------------------
// Probe A: NPK
#define A_RO_PIN    3
#define A_DI_PIN    5
#define A_REDE_PIN  4
SoftwareSerial RS485_A(A_RO_PIN, A_DI_PIN); // (RX, TX)

// Probe B: 5-in-1 (Moisture, Temp, EC, pH)
#define B_RO_PIN    6
#define B_DI_PIN    8
#define B_REDE_PIN  7
SoftwareSerial RS485_B(B_RO_PIN, B_DI_PIN); // (RX, TX)

// ---------------- Serial/Modbus settings ---------------
const uint32_t MB_BAUD   = 4800;   // your devices work at 4800
const uint16_t TIMEOUTMS = 800;    // a bit generous at 4800

// Both are 0x01 (separate ports)
const uint8_t  NPK_ID    = 0x01;
const uint8_t  SOIL5_ID  = 0x01;

// 5-in-1 register map (common defaults)
const uint16_t SOIL5_START = 0x0000; // Moist, Temp, EC, pH
const uint16_t SOIL5_COUNT = 4;

// DFRobot SEN0605 fixed map (per docs)
const uint8_t  SEN_FC   = 0x03;
const uint16_t SEN_BASE = 0x001E;  // N,P,K at 0x001E..0x0020

// ---------------- Helpers -----------------
uint16_t modbusCRC(const uint8_t *buf, uint8_t len) {
  uint16_t crc = 0xFFFF;
  for (uint8_t pos = 0; pos < len; pos++) {
    crc ^= buf[pos];
    for (uint8_t i = 0; i < 8; i++) {
      if (crc & 1) { crc >>= 1; crc ^= 0xA001; }
      else         { crc >>= 1; }
    }
  }
  return crc;
}

inline void disableBothDrivers() {
  digitalWrite(A_REDE_PIN, LOW);
  digitalWrite(B_REDE_PIN, LOW);
}

// Generic Modbus read (FC = 0x03 or 0x04)
bool mbReadRegsFC(SoftwareSerial &port, uint8_t txEnPin,
                  uint8_t id, uint8_t fc, uint16_t startReg, uint16_t count,
                  uint16_t *outRegs, uint16_t timeoutMs = TIMEOUTMS) {

  uint8_t req[8] = {
    id, fc,
    (uint8_t)(startReg >> 8), (uint8_t)(startReg & 0xFF),
    (uint8_t)(count >> 8),    (uint8_t)(count & 0xFF),
    0, 0
  };
  uint16_t crc = modbusCRC(req, 6);
  req[6] = (uint8_t)(crc & 0xFF);
  req[7] = (uint8_t)(crc >> 8);

  port.listen();                         // switch SoftwareSerial listener
  while (port.available()) port.read();  // clear stale bytes

  disableBothDrivers();                  // only one transceiver active
  digitalWrite(txEnPin, HIGH);           // TX enable for this transceiver
  port.write(req, sizeof(req));
  port.flush();
  delay(6);                              // 4800 baud turnaround
  digitalWrite(txEnPin, LOW);            // RX

  // Expect: [ID][FC][ByteCount=2*count][data...][CRCLo][CRCHi]
  uint8_t buf[48]; uint8_t idx = 0;
  unsigned long t0 = millis();
  while (millis() - t0 < timeoutMs) {
    if (port.available()) {
      if (idx < sizeof(buf)) buf[idx++] = port.read();
      if (idx >= 3) {
        uint8_t bc = buf[2];
        if (idx >= 3 + bc + 2) break; // full frame received
      }
    }
  }
  if (idx < 7) return false;
  if (buf[0] != id || buf[1] != fc) return false;
  if (buf[2] != count * 2) return false;

  uint16_t rxCrc = (uint16_t)buf[idx-1] << 8 | buf[idx-2];
  uint16_t calc  = modbusCRC(buf, idx - 2);
  if (rxCrc != calc) return false;

  for (uint16_t i = 0; i < count; i++)
    outRegs[i] = (uint16_t)buf[3 + 2*i] << 8 | buf[4 + 2*i];

  return true;
}

// Optional writer: FC=0x06 (set single holding register)
//  - 0x07D0: device address
//  - 0x07D1: baud (0=2400, 1=4800, 2=9600)
bool mbWriteReg06(SoftwareSerial &port, uint8_t txEnPin,
                  uint8_t id, uint16_t reg, uint16_t value,
                  uint16_t timeoutMs = TIMEOUTMS) {
  uint8_t req[8] = {
    id, 0x06,
    (uint8_t)(reg >> 8), (uint8_t)(reg & 0xFF),
    (uint8_t)(value >> 8), (uint8_t)(value & 0xFF),
    0, 0
  };
  uint16_t crc = modbusCRC(req, 6);
  req[6] = (uint8_t)(crc & 0xFF);
  req[7] = (uint8_t)(crc >> 8);

  port.listen();
  while (port.available()) port.read();

  disableBothDrivers();
  digitalWrite(txEnPin, HIGH);
  port.write(req, sizeof(req));
  port.flush();
  delay(6);
  digitalWrite(txEnPin, LOW);

  // Expect echo of the same 8 bytes
  uint8_t resp[8]; uint8_t idx = 0;
  unsigned long t0 = millis();
  while (millis() - t0 < timeoutMs && idx < 8) {
    if (port.available()) resp[idx++] = port.read();
  }
  if (idx != 8) return false;
  return memcmp(resp, req, 8) == 0;
}

// ---------------- 5-in-1 reader ----------------
bool readSoil5(float &moist_pct, float &temp_c, float &ec_uScm, float &ph) {
  uint16_t r[SOIL5_COUNT];
  if (!mbReadRegsFC(RS485_B, B_REDE_PIN, SOIL5_ID, 0x03, SOIL5_START, SOIL5_COUNT, r))
    return false;

  // Common scaling (adjust if your leaflet differs)
  moist_pct = r[0] / 10.0f;   // 0.1% → %
  temp_c    = r[1] / 10.0f;   // 0.1°C → °C
  ec_uScm   = r[2];           // µS/cm
  ph        = r[3] / 100.0f;  // 0.01 → pH
  return true;
}

// ---------------- NPK: fixed SEN0605 + autoscan fallback ----------------
struct NpkLock { bool ok=false; uint8_t fc=0x03; uint16_t base=0x001E; bool byScan=false; } npk;

static inline bool allZero(uint16_t a, uint16_t b, uint16_t c) { return (a==0 && b==0 && c==0); }
static inline bool plausible(uint16_t n, uint16_t p, uint16_t k) {
  // very loose; prevents locking on garbage
  return (n < 30000 && p < 30000 && k < 30000) && !allZero(n,p,k);
}

// First try the official SEN0605 mapping
bool readNPK_SEN0605(uint16_t &N, uint16_t &P, uint16_t &K) {
  uint16_t r[3];
  if (!mbReadRegsFC(RS485_A, A_REDE_PIN, NPK_ID, SEN_FC, SEN_BASE, 3, r)) return false;
  N = r[0]; P = r[1]; K = r[2];
  return true;
}

// Scan common spots if the fixed map is zero/not responding
bool scanAndLockNPK(uint16_t &N, uint16_t &P, uint16_t &K) {
  const struct { uint8_t fc; uint16_t base; } tries[] = {
    {0x03, 0x0001}, {0x04, 0x0001},
    {0x03, 0x001E}, {0x04, 0x001E},
    {0x03, 0x0004}, {0x04, 0x0004},
    {0x03, 0x0031}, {0x04, 0x0031},
  };

  uint16_t r[3];
  for (uint8_t i=0; i<sizeof(tries)/sizeof(tries[0]); i++) {
    if (mbReadRegsFC(RS485_A, A_REDE_PIN, NPK_ID, tries[i].fc, tries[i].base, 3, r)) {
      if (plausible(r[0], r[1], r[2])) {
        npk.ok = true; npk.fc = tries[i].fc; npk.base = tries[i].base; npk.byScan = true;
        N=r[0]; P=r[1]; K=r[2];
        Serial.print(F("[NPK] Locked by scan: FC0x")); Serial.print(npk.fc, HEX);
        Serial.print(F(" @ 0x")); Serial.println(npk.base, HEX);
        return true;
      }
    }
  }
  return false;
}

bool readNPK(uint16_t &N, uint16_t &P, uint16_t &K) {
  if (npk.ok) { // use the known-good mapping
    uint16_t r[3];
    if (mbReadRegsFC(RS485_A, A_REDE_PIN, NPK_ID, npk.fc, npk.base, 3, r)) {
      N=r[0]; P=r[1]; K=r[2]; return true;
    } else {
      npk.ok = false; // lost lock; re-try procedure
    }
  }

  // 1) Try official SEN0605 map
  if (readNPK_SEN0605(N,P,K)) {
    if (!allZero(N,P,K)) {
      npk.ok = true; npk.fc = SEN_FC; npk.base = SEN_BASE; npk.byScan = false;
      Serial.println(F("[NPK] Using fixed SEN0605 map (FC03 @ 0x001E)"));
      return true;
    }
  }

  // 2) Try the autoscan
  if (scanAndLockNPK(N,P,K)) return true;

  // 3) Last resort: return the fixed map even if zero (so you still see a frame)
  if (readNPK_SEN0605(N,P,K)) return true;

  return false;
}

// Debug dump
void dumpNPKRaw() {
  uint16_t r[16];
  Serial.println(F("[NPK] RAW FC03 0x0000..0x000F:"));
  if (mbReadRegsFC(RS485_A, A_REDE_PIN, NPK_ID, 0x03, 0x0000, 16, r)) {
    for (uint8_t i=0;i<16;i++){ Serial.print(F(" ")); Serial.print(i,HEX); Serial.print(F(":")); Serial.print(r[i]); }
    Serial.println();
  } else Serial.println(F("  (no response)"));

  Serial.println(F("[NPK] RAW FC04 0x0000..0x000F:"));
  if (mbReadRegsFC(RS485_A, A_REDE_PIN, NPK_ID, 0x04, 0x0000, 16, r)) {
    for (uint8_t i=0;i<16;i++){ Serial.print(F(" ")); Serial.print(i,HEX); Serial.print(F(":")); Serial.print(r[i]); }
    Serial.println();
  } else Serial.println(F("  (no response)"));
}

// ---------------- Arduino lifecycle ----------------
void SoilSensor_setup() {
  pinMode(A_REDE_PIN, OUTPUT);
  pinMode(B_REDE_PIN, OUTPUT);
  disableBothDrivers();

  RS485_A.begin(MB_BAUD);
  RS485_B.begin(MB_BAUD);

  while (RS485_A.available()) RS485_A.read();
  while (RS485_B.available()) RS485_B.read();

  Serial.println(F("Dual RS485 reader @4800 (NPK fixed map + autoscan fallback)"));
  Serial.println(F("Tip: fully insert NPK probes and pack the soil; dry/loose soil can read 0,0,0."));
}

void SoilSensor_loop() {
  // ---- NPK ----
  uint16_t n, p, k;
  if (readNPK(n, p, k)) {
    Serial.print(F("[NPK] N: ")); Serial.print(n);
    Serial.print(F("  P: "));     Serial.print(p);
    Serial.print(F("  K: "));     Serial.println(k);
  } else {
    Serial.println(F("[NPK] read failed"));
  }

  // ---- 5-in-1 ----
  float moist, temp, ec, ph;
  if (readSoil5(moist, temp, ec, ph)) {
    Serial.print(F("[5in1] Moisture: ")); Serial.print(moist, 1); Serial.print(F("%  "));
    Serial.print(F("Temp: "));     Serial.print(temp, 1);  Serial.print(F(" °C  "));
    Serial.print(F("EC: "));       Serial.print(ec, 0);    Serial.print(F(" uS/cm  "));
    Serial.print(F("pH: "));       Serial.println(ph, 2);
  } else {
    Serial.println(F("[5in1] read failed"));
  }

  // On-demand raw dump
  if (Serial.available()) {
    char c = Serial.read();
    if (c=='d' || c=='D') dumpNPKRaw();
  }

  Data_AGRIna.AN_SoilTemperature = temp;
  Data_AGRIna.AN_pH = ph;
  Data_AGRIna.AN_Nitrogen = n;
  Data_AGRIna.AN_Phosphorus = p;
  Data_AGRIna.AN_Potassium = k;

  delay(2000);
}
