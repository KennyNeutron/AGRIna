
void LED_Setup() {
  pinMode(LEDred_Pin, OUTPUT);
  pinMode(LEDgreen_Pin, OUTPUT);
  LEDred_Off();
  LEDgreen_Off();
}

void LEDred_On() {
  digitalWrite(LEDred_Pin, LOW);
}

void LEDred_Off() {
  digitalWrite(LEDred_Pin, HIGH);
}

void LEDgreen_On() {
  digitalWrite(LEDgreen_Pin, LOW);
}

void LEDgreen_Off() {
  digitalWrite(LEDgreen_Pin, HIGH);
}
