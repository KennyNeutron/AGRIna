-- Insert specific user profile
INSERT INTO public.profiles (id, full_name, email, role)
VALUES 
  ('ea1be7a9-4e48-4ad2-9e93-4dc58c07609d', 'System Administrator', 'admin@agrina.com', 'admin')
ON CONFLICT (id) DO UPDATE 
SET role = 'admin';
