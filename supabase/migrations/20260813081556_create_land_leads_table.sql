/*
# Create leads table for land sale inquiries

1. New Tables
- `leads`
  - `id` (uuid, primary key)
  - `name` (text, not null) — full name of the interested party
  - `email` (text, not null) — contact email
  - `phone` (text, nullable) — optional phone number
  - `message` (text, nullable) — optional message from the interested party
  - `interest` (text, nullable) — what they are interested in (e.g. investment, tourism, solar, residential)
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `leads`.
- This is a no-auth public landing page, so allow anon INSERT only (public can submit leads).
- No SELECT/UPDATE/DELETE for anon — leads are private to the site owner.
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text,
  interest text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
CREATE POLICY "anon_insert_leads" ON leads FOR INSERT
  TO anon, authenticated WITH CHECK (true);