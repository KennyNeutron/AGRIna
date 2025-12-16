struct __attribute__((packed)) AGRInaData {
    uint8_t Header = 0x00;  // Header byte for packet validation

    uint8_t AN_DeviceID = 0x00;
    float AN_SoilTemperature = 0.0;
    float AN_pH = 0.0;
    uint16_t AN_Nitrogen = 0;
    uint16_t AN_Phosphorus = 0;
    uint16_t AN_Potassium = 0;
    
    uint8_t Footer = 0x00;  // Footer byte for packet validation

};

AGRInaData Data_AGRIna;