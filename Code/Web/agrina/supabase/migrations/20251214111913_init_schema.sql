-- Create profiles table
create table if not exists public.profiles (
  id uuid not null references auth.users(id) on delete cascade primary key,
  full_name text,
  email text unique,
  company text,
  role text default 'user',
  avatar_url text,
  updated_at timestamp with time zone
);

-- Create devices table
create table if not exists public.devices (
  id uuid not null default gen_random_uuid() primary key,
  serial_number text not null unique,
  name text not null,
  status text default 'offline',
  firmware_version text,
  last_seen timestamp with time zone,
  update_interval_seconds integer default 30,
  temperature_unit text default 'celsius',
  auto_sync boolean default true,
  created_at timestamp with time zone default now()
);

-- Create deployments table
create table if not exists public.deployments (
  id uuid not null default gen_random_uuid() primary key,
  device_id uuid not null references public.devices(id),
  location_name text not null,
  lot_owner text,
  crop_type text,
  coordinates point,
  start_date timestamp with time zone default now(),
  end_date timestamp with time zone,
  notes text,
  created_at timestamp with time zone default now()
);

-- Create sensor_readings table
create table if not exists public.sensor_readings (
  id bigint generated always as identity primary key,
  device_id uuid not null references public.devices(id),
  deployment_id uuid references public.deployments(id),
  ph decimal(4,2),
  temperature decimal(5,2),
  nitrogen decimal(6,2),
  phosphorus decimal(6,2),
  potassium decimal(6,2),
  signal_quality integer,
  recorded_at timestamp with time zone default now()
);

-- Create alerts table
create table if not exists public.alerts (
  id uuid not null default gen_random_uuid() primary key,
  device_id uuid references public.devices(id),
  type text not null,
  message text not null,
  is_read boolean default false,
  created_at timestamp with time zone default now()
);

-- Create user_preferences table
create table if not exists public.user_preferences (
  user_id uuid not null references public.profiles(id) primary key,
  alerts_enabled boolean default true,
  email_notifications boolean default true,
  data_retention_days integer default 365,
  timezone text default 'Asia/Manila'
);

-- Create export_logs table
create table if not exists public.export_logs (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id),
  format text,
  resource_type text,
  configuration jsonb,
  date_range_start timestamp with time zone,
  date_range_end timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security (RLS) on all tables
alter table public.profiles enable row level security;
alter table public.devices enable row level security;
alter table public.deployments enable row level security;
alter table public.sensor_readings enable row level security;
alter table public.alerts enable row level security;
alter table public.user_preferences enable row level security;
alter table public.export_logs enable row level security;
