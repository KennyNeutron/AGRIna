void SupabaseUpdate(float py_ph, float py_temp, int py_nitrogen, int py_phosphorus, int py_potassium){
      // Check WiFi Status
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    // Begin connection
    http.begin(supabase_url);

    // Headers
    http.addHeader("Content-Type", "application/json");
    http.addHeader("apikey", supabase_key);
    http.addHeader("Authorization", String("Bearer ") + supabase_key);
    http.addHeader("Prefer", "return=minimal"); // Don't return the inserted row to save bandwidth

    // Create Dummy Data
    float ph = py_ph;
    float temp = py_temp;
    int nitrogen = py_nitrogen;
    int phosphorus = py_phosphorus;
    int potassium = py_potassium;
    int signal =  random(80, 100);  

    // Construct JSON Payload manually to avoid heavy libraries if not needed
    // Using String for simplicity in this test
    String payload = "{";
    payload += "\"device_id\": \"" + String(device_id) + "\",";
    payload += "\"ph\": " + String(ph) + ",";
    payload += "\"temperature\": " + String(temp) + ",";
    payload += "\"nitrogen\": " + String(nitrogen) + ",";
    payload += "\"phosphorus\": " + String(phosphorus) + ",";
    payload += "\"potassium\": " + String(potassium) + ",";
    payload += "\"signal_quality\": " + String(signal);
    payload += "}";

    Serial.println("Pushing data: " + payload);

    // POST Request
    int httpResponseCode = http.POST(payload);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      Serial.println(response);
    } else {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
    }

    http.end(); // Free resources

  } else {
    Serial.println("WiFi Disconnected");
  }

}