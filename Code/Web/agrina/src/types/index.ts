export interface Device {
  id: string; // uuid
  serial_number: string | null;
  name: string | null;
  status: string | null;
  firmware_version: string | null;
  last_seen: string | null; // timestamptz
  update_interval_seconds: number | null; // int4
  temperature_unit: string | null;
  auto_sync: boolean | null;
  created_at: string | null; // timestamptz
  // New fields
  lot_owner: string | null;
  start_date: string | null; // timestamptz
  end_date: string | null; // timestamptz
  coordinates: { lat: number; lng: number } | null; // jsonb or point
  field_description: string | null;
  crop_type: string | null;
  notes: string | null;
}
