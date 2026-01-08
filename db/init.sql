CREATE TABLE IF NOT EXISTS builder_sites (
  id SERIAL PRIMARY KEY,
  admin_id BIGINT UNIQUE NOT NULL,
  slug VARCHAR(64) UNIQUE NOT NULL,
  template_key VARCHAR(128),
  gcs_prefix VARCHAR(256),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION touch_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS builder_sites_updated_at ON builder_sites;
CREATE TRIGGER builder_sites_updated_at
BEFORE UPDATE ON builder_sites
FOR EACH ROW
EXECUTE PROCEDURE touch_updated_at();
