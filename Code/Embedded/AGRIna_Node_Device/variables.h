#define LEDred_Pin 27
#define LEDgreen_Pin 33


// WiFi Credentials
const char* ssid = "Innocore2.4G";
const char* password = "one2nine";

// --------------------------------------------------------------------------------
// CONFIGURATION
// --------------------------------------------------------------------------------
// Supabase Project Details
const char* supabase_url = "https://rivvmexaqbvmmicfodny.supabase.co/rest/v1/sensor_readings";
const char* supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpdnZtZXhhcWJ2bW1pY2ZvZG55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2Mzc3MjQsImV4cCI6MjA4MTIxMzcyNH0.Uf0X-oXKZ-FkFnh9Gv563YBLGspo4d53xsxZC3qoyrU";  // Fill with your Anon Key

// Device Configuration
// ID of "AGR-DEMO001" or similar. You must fetch this from your 'devices' table.
// Using a placeholder UUID for now. REPLACE THIS with a valid device_id from your DB.
// const char* device_id = "e95e70fe-5530-42ff-b4ac-d817e1e61c4b"; //legacy variable [not in use anymore]


//Get device ID from Supabase devices table
const char* device1_id = "16e6b082-2cdf-436d-b703-069cc04021e7";
const char* device2_id = "e95e70fe-5530-42ff-b4ac-d817e1e61c4b";
const char* device3_id = "b38994e2-8831-4c6f-8811-019653cff282";

// --------------------------------------------------------------------------------
