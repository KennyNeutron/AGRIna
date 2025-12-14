#include <WiFi.h>
#include <HTTPClient.h>

// --------------------------------------------------------------------------------
// CONFIGURATION
// --------------------------------------------------------------------------------
// Supabase Project Details
const char* supabase_url = "https://rivvmexaqbvmmicfodny.supabase.co/rest/v1/sensor_readings";
const char* supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpdnZtZXhhcWJ2bW1pY2ZvZG55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2Mzc3MjQsImV4cCI6MjA4MTIxMzcyNH0.Uf0X-oXKZ-FkFnh9Gv563YBLGspo4d53xsxZC3qoyrU"; // Fill with your Anon Key

// WiFi Credentials
const char* ssid = "Innocore2.4G";
const char* password = "one2nine";

// Device Configuration
// ID of "AGR-DEMO001" or similar. You must fetch this from your 'devices' table.
// Using a placeholder UUID for now. REPLACE THIS with a valid device_id from your DB.
const char* device_id = "e95e70fe-5530-42ff-b4ac-d817e1e61c4b"; 

// --------------------------------------------------------------------------------

void setup() {
  Serial.begin(115200);
  delay(1000);

  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
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
    float ph = random(550, 750) / 100.0;           // 5.50 - 7.50
    float temp = random(200, 350) / 10.0;          // 20.0 - 35.0
    int nitrogen = random(30, 60);                 // 30 - 60 ppm
    int phosphorus = random(20, 40);               // 20 - 40 ppm
    int potassium = random(100, 200);              // 100 - 200 ppm
    int signal = random(80, 100);                  // 80 - 100%

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

  // Determine delay (e.g., every 10 seconds for testing)
  delay(10000);
}
