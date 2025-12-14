-- Insert a new device and its initial reading
WITH new_device AS (
  INSERT INTO public.devices (serial_number, name, status, firmware_version, temperature_unit)
  VALUES ('AGR-002', 'Rice Field Sensor A', 'online', 'v2.1.4', 'celsius')
  ON CONFLICT (serial_number) DO NOTHING
  RETURNING id
)
INSERT INTO public.sensor_readings (device_id, ph, temperature, nitrogen, phosphorus, potassium, signal_quality)
SELECT id, 6.8, 28.5, 45, 30, 40, 95
FROM new_device;
