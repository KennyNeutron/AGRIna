-- Profiles: Users can view their own profile
create policy "Users can view own profile" 
on public.profiles for select 
using (auth.uid() = id);

create policy "Users can update own profile" 
on public.profiles for update 
using (auth.uid() = id);

-- Devices: Authenticated users can view all devices (for now, simplistic model)
create policy "Authenticated users can view devices" 
on public.devices for select 
to authenticated 
using (true);

-- Sensor Readings: Authenticated users can view all readings
create policy "Authenticated users can view readings" 
on public.sensor_readings for select 
to authenticated 
using (true);

-- Deployments: Authenticated users can view all deployments
create policy "Authenticated users can view deployments" 
on public.deployments for select 
to authenticated 
using (true);

-- Alerts: Authenticated users can view all alerts
create policy "Authenticated users can view alerts" 
on public.alerts for select 
to authenticated 
using (true);

-- Export Logs: Users can view their own logs
create policy "Users can view own export logs" 
on public.export_logs for select 
using (auth.uid() = user_id);

create policy "Users can create export logs" 
on public.export_logs for insert 
to authenticated 
with check (auth.uid() = user_id);
