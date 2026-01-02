import express from 'express';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import multer from 'multer';

import { authRequired } from './middleware/auth.js';
import {
  pool,
  getSiteByAdmin,
  getSiteBySlug,
  createSite,
  renameSite,
  updateSiteTemplate
} from './db/index.js';
import { listTemplates, readFile, writeFile, writeBuffer, copyPrefix, movePrefix, deletePrefix } from './lib/gcs.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4007;
const jwtSecret = process.env.BUILDER_JWT_SECRET || process.env.JWT_SECRET;
const strapiUrl = process.env.STRAPI_URL || 'https://cms.orenses.com/admin/login';
const assetBaseUrl = process.env.ASSET_BASE_URL || 'https://orenses.com';

app.use(express.json({ limit: '10mb' }));
app.use(morgan('combined'));
app.use(rateLimit({ windowMs: 60 * 1000, max: 120 }));
app.use(express.static('public'));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'missing_credentials' });
  }
  if (!jwtSecret) {
    return res.status(500).json({ error: 'missing_jwt_secret' });
  }

  try {
    const response = await fetch(strapiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      return res.status(401).json({ error: payload?.error || 'invalid_login' });
    }

    const data = await response.json();
    const user = data?.data?.user;
    if (!user?.id) {
      return res.status(500).json({ error: 'invalid_strapi_response' });
    }

    const payload = {
      sub: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      scope: ['builder']
    };

    const token = jwt.sign(payload, jwtSecret, { expiresIn: '8h' });
    return res.json({ token, user: payload });
  } catch (error) {
    console.error('login_failed', error);
    return res.status(500).json({ error: 'login_failed' });
  }
});

app.use('/api', authRequired);

app.get('/api/templates', async (_req, res) => {
  try {
    const templates = await listTemplates();
    return res.json({ templates });
  } catch (error) {
    return res.status(500).json({ error: 'templates_failed' });
  }
});

app.get('/api/site/me', async (req, res) => {
  try {
    const site = await getSiteByAdmin(req.user.sub);
    return res.json({ site });
  } catch (error) {
    return res.status(500).json({ error: 'site_lookup_failed' });
  }
});

app.post('/api/site', async (req, res) => {
  const { slug, templateKey } = req.body || {};
  if (!slug || !templateKey) {
    return res.status(400).json({ error: 'missing_fields' });
  }
  if (!/^[a-z0-9-]{3,30}$/.test(slug)) {
    return res.status(400).json({ error: 'invalid_slug' });
  }

  try {
    const existing = await getSiteByAdmin(req.user.sub);
    if (existing) {
      return res.status(409).json({ error: 'site_exists' });
    }
    const slugExists = await getSiteBySlug(slug);
    if (slugExists) {
      return res.status(409).json({ error: 'slug_taken' });
    }

    const gcsPrefix = `u/${slug}`;
    const templatePrefix = `templates/${templateKey}/`;
    const destinationPrefix = `${gcsPrefix}/`;
    await copyPrefix(templatePrefix, destinationPrefix);
    const site = await createSite({
      adminId: req.user.sub,
      slug,
      templateKey,
      gcsPrefix
    });

    return res.status(201).json({ site });
  } catch (error) {
    return res.status(500).json({ error: 'site_create_failed' });
  }
});

app.patch('/api/site/rename', async (req, res) => {
  const { slug } = req.body || {};
  if (!slug) {
    return res.status(400).json({ error: 'missing_slug' });
  }
  if (!/^[a-z0-9-]{3,30}$/.test(slug)) {
    return res.status(400).json({ error: 'invalid_slug' });
  }

  try {
    const site = await getSiteByAdmin(req.user.sub);
    if (!site) {
      return res.status(404).json({ error: 'site_not_found' });
    }
    const slugExists = await getSiteBySlug(slug);
    if (slugExists) {
      return res.status(409).json({ error: 'slug_taken' });
    }

    const oldPrefix = site.gcs_prefix || `u/${site.slug}`;
    const newPrefix = `u/${slug}`;
    await movePrefix(oldPrefix, newPrefix);
    const updated = await renameSite({ adminId: req.user.sub, slug, gcsPrefix: newPrefix });

    return res.json({ site: updated });
  } catch (error) {
    return res.status(500).json({ error: 'site_rename_failed' });
  }
});

app.patch('/api/site/template', async (req, res) => {
  const templateKey = (req.body?.templateKey || '').trim();
  if (!templateKey) {
    return res.status(400).json({ error: 'missing_template' });
  }

  try {
    const site = await getSiteByAdmin(req.user.sub);
    if (!site) {
      return res.status(404).json({ error: 'site_not_found' });
    }

    const templates = await listTemplates();
    if (!templates.includes(templateKey)) {
      return res.status(400).json({ error: 'invalid_template' });
    }

    const prefix = site.gcs_prefix || `u/${site.slug}`;
    const templatePrefix = `templates/${templateKey}/`;
    const destinationPrefix = `${prefix}/`;
    await deletePrefix(destinationPrefix);
    await copyPrefix(templatePrefix, destinationPrefix);
    const updated = await updateSiteTemplate({ adminId: req.user.sub, templateKey });

    return res.json({ site: updated });
  } catch (error) {
    return res.status(500).json({ error: 'template_update_failed' });
  }
});

app.post('/api/assets', upload.any(), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'missing_files' });
  }

  try {
    const site = await getSiteByAdmin(req.user.sub);
    if (!site) {
      return res.status(404).json({ error: 'site_not_found' });
    }

    const prefix = site.gcs_prefix || `u/${site.slug}`;
    const uploads = await Promise.all(
      req.files.map(async (file) => {
        const safeName = file.originalname.replace(/[^\w.\-]+/g, '-');
        const objectPath = `${prefix}/assets/${Date.now()}-${safeName}`;
        await writeBuffer(objectPath, file.buffer, file.mimetype || 'application/octet-stream');
        return `${assetBaseUrl}/u/${site.slug}/assets/${objectPath.split('/assets/')[1]}`;
      })
    );

    return res.json({ data: uploads });
  } catch (error) {
    console.error('asset_upload_failed', error);
    return res.status(500).json({ error: 'asset_upload_failed' });
  }
});

app.get('/api/site/content', async (req, res) => {
  try {
    const site = await getSiteByAdmin(req.user.sub);
    if (!site) {
      return res.status(404).json({ error: 'site_not_found' });
    }

    const prefix = site.gcs_prefix || `u/${site.slug}`;
    const [html, css, template] = await Promise.all([
      readFile(`${prefix}/index.html`),
      readFile(`${prefix}/style.css`),
      readFile(`${prefix}/template.json`)
    ]);

    return res.json({ html, css, template });
  } catch (error) {
    return res.status(500).json({ error: 'content_load_failed' });
  }
});

app.put('/api/site/content', async (req, res) => {
  const { html, css, template } = req.body || {};
  if (typeof html !== 'string' || typeof css !== 'string' || typeof template !== 'string') {
    return res.status(400).json({ error: 'missing_content' });
  }

  try {
    const site = await getSiteByAdmin(req.user.sub);
    if (!site) {
      return res.status(404).json({ error: 'site_not_found' });
    }
    const prefix = site.gcs_prefix || `u/${site.slug}`;
    await Promise.all([
      writeFile(`${prefix}/index.html`, html, 'text/html'),
      writeFile(`${prefix}/style.css`, css, 'text/css'),
      writeFile(`${prefix}/template.json`, template, 'application/json')
    ]);

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'content_save_failed' });
  }
});

app.post('/api/site/publish', async (req, res) => {
  try {
    const site = await getSiteByAdmin(req.user.sub);
    if (!site) {
      return res.status(404).json({ error: 'site_not_found' });
    }
    const url = `https://orenses.com/u/${site.slug}/`;
    return res.json({ url });
  } catch (error) {
    return res.status(500).json({ error: 'publish_failed' });
  }
});

app.use((err, _req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.code || 'upload_error' });
  }
  return next(err);
});

app.use((err, _req, res, _next) => {
  console.error('server_error', err);
  return res.status(500).json({ error: 'server_error' });
});

app.listen(PORT, () => {
  console.log(`Builder running on ${PORT}`);
});

process.on('SIGTERM', async () => {
  await pool.end();
  process.exit(0);
});
