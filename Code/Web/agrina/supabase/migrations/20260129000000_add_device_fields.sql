-- Add new columns to devices table
ALTER TABLE "public"."devices"
  ADD COLUMN IF NOT EXISTS "lot_owner" text,
  ADD COLUMN IF NOT EXISTS "start_date" timestamp with time zone,
  ADD COLUMN IF NOT EXISTS "end_date" timestamp with time zone,
  ADD COLUMN IF NOT EXISTS "coordinates" jsonb,
  ADD COLUMN IF NOT EXISTS "field_description" text,
  ADD COLUMN IF NOT EXISTS "crop_type" text,
  ADD COLUMN IF NOT EXISTS "notes" text;

-- Add comments for clarity (optional, but good practice)
COMMENT ON COLUMN "public"."devices"."coordinates" IS 'GPS coordinates stored as JSONB, e.g., {"lat": 12.34, "lng": 56.78}';
