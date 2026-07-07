-- =========================================
-- EVENT STAFF TABLE
-- =========================================

CREATE TABLE IF NOT EXISTS event_staff (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,

  event_id uuid REFERENCES events(id) ON DELETE CASCADE NOT NULL,

  email text NOT NULL,

  role text NOT NULL DEFAULT 'scanner'
    CHECK (role IN ('scanner', 'manager')),

  created_at timestamptz DEFAULT now(),

  -- Prevent duplicate invites at the DB level
  CONSTRAINT unique_event_staff UNIQUE (event_id, email)
);


-- =========================================
-- ROW LEVEL SECURITY (RLS)
-- =========================================

ALTER TABLE event_staff ENABLE ROW LEVEL SECURITY;

-- Organizers can view staff for events they own
CREATE POLICY "Organizers can view their event staff"
  ON event_staff
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = event_staff.event_id
        AND events.organizer_id = auth.uid()
    )
  );

-- Organizers can add staff to events they own
CREATE POLICY "Organizers can add staff to their events"
  ON event_staff
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = event_staff.event_id
        AND events.organizer_id = auth.uid()
    )
  );

-- Organizers can remove staff from events they own
CREATE POLICY "Organizers can remove staff from their events"
  ON event_staff
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = event_staff.event_id
        AND events.organizer_id = auth.uid()
    )
  );
