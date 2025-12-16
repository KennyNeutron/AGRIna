-- Allow authenticated users to update devices (for demo purposes)
create policy "Authenticated users can update devices"
on public.devices for update
to authenticated
using (true);

-- Allow authenticated users to view their own preferences
create policy "Users can view own preferences"
on public.user_preferences for select
to authenticated
using (auth.uid() = user_id);

-- Allow authenticated users to update/insert their own preferences
create policy "Users can update own preferences"
on public.user_preferences for update
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert own preferences"
on public.user_preferences for insert
to authenticated
with check (auth.uid() = user_id);
