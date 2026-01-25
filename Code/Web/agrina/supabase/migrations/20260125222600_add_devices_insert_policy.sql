-- Enable insert for authenticated users on devices table
create policy "Enable insert for authenticated users"
on "public"."devices"
as permissive
for insert
to authenticated
with check ( true );
