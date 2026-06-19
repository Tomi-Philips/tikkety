-- ===============================
-- TIKKETY RLS SECURITY LAYER
-- ===============================

-- Enable RLS (safe even if already enabled)
alter table profiles enable row level security;
alter table events enable row level security;
alter table tickets enable row level security;
alter table orders enable row level security;

-- ===============================
-- PROFILES SECURITY
-- ===============================

-- View own profile only
drop policy if exists "View own profile" on profiles;
create policy "View own profile"
  on profiles
  for select
  using (auth.uid() = id);

-- Update own profile only
drop policy if exists "Update own profile" on profiles;
create policy "Update own profile"
  on profiles
  for update
  using (auth.uid() = id);


-- ===============================
-- EVENTS SECURITY
-- ===============================

-- Anyone can view events (public discovery)
drop policy if exists "Public can view events" on events;
create policy "Public can view events"
  on events
  for select
  using (true);

-- Only organizers can create events
drop policy if exists "Organizers can create events" on events;
create policy "Organizers can create events"
  on events
  for insert
  with check (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'organizer'
    )
  );

-- Only event owner can update
drop policy if exists "Event owner can update" on events;
create policy "Event owner can update"
  on events
  for update
  using (organizer_id = auth.uid());


-- ===============================
-- TICKETS SECURITY
-- ===============================

-- Users can view only their tickets
drop policy if exists "View own tickets" on tickets;
create policy "View own tickets"
  on tickets
  for select
  using (user_id = auth.uid());

-- Restrict ticket creation to paid orders
drop policy if exists "Create tickets" on tickets;
create policy "Create tickets"
  on tickets
  for insert
  with check (
    exists (
      select 1 from orders
      where orders.id = order_id
      and orders.buyer_id = auth.uid()
      and orders.payment_status = 'paid'
    )
  );


-- ===============================
-- ORDERS SECURITY
-- ===============================

-- View own orders only
drop policy if exists "View own orders" on orders;
create policy "View own orders"
  on orders
  for select
  using (buyer_id = auth.uid());

-- Create own orders only
drop policy if exists "Create orders" on orders;
create policy "Create orders"
  on orders
  for insert
  with check (buyer_id = auth.uid());


-- =========================================
-- STORAGE BUCKETS & POLICIES
-- =========================================

-- Create the bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-banners', 'event-banners', true)
ON CONFLICT (id) DO NOTHING;

-- 1. Allow public select access to the bucket
DROP POLICY IF EXISTS "Allow public select access to event-banners" ON storage.objects;
CREATE POLICY "Allow public select access to event-banners"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'event-banners');

-- 2. Allow authenticated organizers to upload to the bucket
DROP POLICY IF EXISTS "Allow organizers to upload event-banners" ON storage.objects;
CREATE POLICY "Allow organizers to upload event-banners"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'event-banners'
    AND auth.role() = 'authenticated'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'organizer'
    )
  );

-- 3. Allow organizers to update their own uploads
DROP POLICY IF EXISTS "Allow organizers to update their own event-banners" ON storage.objects;
CREATE POLICY "Allow organizers to update their own event-banners"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'event-banners'
    AND auth.role() = 'authenticated'
    AND (
      auth.uid()::text = (storage.foldername(name))[1]
      OR auth.uid()::text = (storage.foldername(name))[2]
    )
  );

-- 4. Allow organizers to delete their own uploads
DROP POLICY IF EXISTS "Allow organizers to delete their own event-banners" ON storage.objects;
CREATE POLICY "Allow organizers to delete their own event-banners"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'event-banners'
    AND auth.role() = 'authenticated'
    AND (
      auth.uid()::text = (storage.foldername(name))[1]
      OR auth.uid()::text = (storage.foldername(name))[2]
    )
  );