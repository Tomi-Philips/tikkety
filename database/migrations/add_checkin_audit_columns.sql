-- Run this in your Supabase SQL Editor
-- Adds check-in audit columns to the tickets table

ALTER TABLE tickets
  ADD COLUMN IF NOT EXISTS checked_in_at  timestamptz DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS checked_in_by  uuid        DEFAULT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS checkin_method text        DEFAULT NULL CHECK (checkin_method IN ('manual', 'qr'));

-- Optional: index for fast per-event check-in stats queries
CREATE INDEX IF NOT EXISTS tickets_event_id_checkin ON tickets (event_id, admissions_used);

-- Verify columns were added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'tickets'
  AND column_name IN ('checked_in_at', 'checked_in_by', 'checkin_method')
ORDER BY column_name;
