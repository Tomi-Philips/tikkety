-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Events Policies
DROP POLICY IF EXISTS "Anyone can view published events" ON public.events;
CREATE POLICY "Anyone can view published events"
  ON public.events FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "Organizers can view their own events" ON public.events;
CREATE POLICY "Organizers can view their own events"
  ON public.events FOR SELECT
  USING (auth.uid() = organizer_id);

DROP POLICY IF EXISTS "Organizers can create events" ON public.events;
CREATE POLICY "Organizers can create events"
  ON public.events FOR INSERT
  WITH CHECK (auth.uid() = organizer_id);

DROP POLICY IF EXISTS "Organizers can update their own events" ON public.events;
CREATE POLICY "Organizers can update their own events"
  ON public.events FOR UPDATE
  USING (auth.uid() = organizer_id);

DROP POLICY IF EXISTS "Organizers can delete their own events" ON public.events;
CREATE POLICY "Organizers can delete their own events"
  ON public.events FOR DELETE
  USING (auth.uid() = organizer_id);

-- Ticket Types Policies
DROP POLICY IF EXISTS "Anyone can view ticket types for published events" ON public.ticket_types;
CREATE POLICY "Anyone can view ticket types for published events"
  ON public.ticket_types FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = ticket_types.event_id
        AND events.status = 'published'
    )
  );

DROP POLICY IF EXISTS "Organizers can manage ticket types for their events" ON public.ticket_types;
CREATE POLICY "Organizers can manage ticket types for their events"
  ON public.ticket_types FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = ticket_types.event_id
        AND events.organizer_id = auth.uid()
    )
  );

-- Tickets Policies
DROP POLICY IF EXISTS "Users can view their own tickets" ON public.tickets;
CREATE POLICY "Users can view their own tickets"
  ON public.tickets FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Organizers can view tickets for their events" ON public.tickets;
CREATE POLICY "Organizers can view tickets for their events"
  ON public.tickets FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = tickets.event_id
        AND events.organizer_id = auth.uid()
    )
  );


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

