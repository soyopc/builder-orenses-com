import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function getSiteByAdmin(adminId) {
  const { rows } = await pool.query('SELECT * FROM builder_sites WHERE admin_id = $1', [adminId]);
  return rows[0] || null;
}

export async function getSiteBySlug(slug) {
  const { rows } = await pool.query('SELECT * FROM builder_sites WHERE slug = $1', [slug]);
  return rows[0] || null;
}

export async function createSite({ adminId, slug, templateKey, gcsPrefix }) {
  const { rows } = await pool.query(
    `INSERT INTO builder_sites (admin_id, slug, template_key, gcs_prefix)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [adminId, slug, templateKey, gcsPrefix]
  );
  return rows[0];
}

export async function renameSite({ adminId, slug, gcsPrefix }) {
  const { rows } = await pool.query(
    `UPDATE builder_sites
     SET slug = $1, gcs_prefix = $2
     WHERE admin_id = $3
     RETURNING *`,
    [slug, gcsPrefix, adminId]
  );
  return rows[0] || null;
}

export async function updateSiteTemplate({ adminId, templateKey }) {
  const { rows } = await pool.query(
    `UPDATE builder_sites
     SET template_key = $1
     WHERE admin_id = $2
     RETURNING *`,
    [templateKey, adminId]
  );
  return rows[0] || null;
}
