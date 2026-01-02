import { registerLayoutBlocks } from './blocks/layout.js';
import { registerHeaderBlocks } from './blocks/header.js';
import { registerHeroBlocks } from './blocks/hero.js';
import { registerContentBlocks } from './blocks/content.js';
import { registerFormsBlocks } from './blocks/forms.js';
import { registerMediaBlocks } from './blocks/media.js';
import { registerFooterBlocks } from './blocks/footer.js';
import { registerUiBlocks } from './blocks/ui.js';
import { registerEcommerceBlocks } from './blocks/ecommerce.js';
import { registerSeoBlocks } from './blocks/seo.js';

const token = localStorage.getItem('builder_jwt');
if (!token) {
  window.location.href = '/';
}

let lastSelectedComponent = null;

const insertSelectedAsset = (asset) => {
  console.log('=== insertSelectedAsset llamado ===');
  console.log('asset recibido:', asset);
  const src = typeof asset === 'string' ? asset : asset?.get?.('src') || asset?.src;
  console.log('src extraído:', src);
  if (!src) {
    console.log('❌ No hay src, saliendo');
    return;
  }
  const selected = lastSelectedComponent || editor.getSelected();
  console.log('lastSelectedComponent:', lastSelectedComponent);
  console.log('editor.getSelected():', editor.getSelected());
  console.log('selected final:', selected);
  console.log('selected es imagen?', selected?.is?.('image'));
  if (selected && selected.is('image')) {
    console.log('✅ Reemplazando imagen existente');
    selected.set('src', src);
  } else {
    const target = selected || editor.getWrapper();
    console.log('🆕 Insertando nueva imagen en target:', target);
    console.log('target type:', target?.get?.('type'));
    editor.addComponents(`<img src="${src}" alt="" />`, { target });
  }
  editor.AssetManager.close();
};

const editor = grapesjs.init({
  container: '#gjs',
  fromElement: false,
  height: '100%',
  width: 'auto',
  storageManager: false,
  assetManager: {
    upload: '/api/assets',
    uploadName: 'files',
    headers: {
      Authorization: `Bearer ${token}`
    }
  },
  styleManager: {
    sectors: [
      {
        name: 'General',
        open: false,
        buildProps: ['display', 'position', 'top', 'right', 'left', 'bottom']
      },
      {
        name: 'Dimensiones',
        open: false,
        buildProps: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding']
      },
      {
        name: 'Tipografía',
        open: false,
        buildProps: ['font-family', 'font-size', 'font-weight', 'color', 'line-height', 'text-align']
      },
      {
        name: 'Decoración',
        open: false,
        buildProps: ['background-color', 'border-radius', 'box-shadow', 'opacity']
      }
    ]
  }
});

registerLayoutBlocks(editor);
registerHeaderBlocks(editor);
registerHeroBlocks(editor);
registerContentBlocks(editor);
registerFormsBlocks(editor);
registerMediaBlocks(editor);
registerFooterBlocks(editor);
registerUiBlocks(editor);
registerEcommerceBlocks(editor);
registerSeoBlocks(editor);

async function apiRequest(path, options = {}) {
  const response = await fetch(`/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {})
    }
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'request_failed');
  }
  return response.json();
}

const baseCss = `
  * { box-sizing: border-box; }
  body { margin: 0; font-family: 'Inter', sans-serif; color: #0f172a; }
  img { max-width: 100%; display: block; }
  .container { width: min(1100px, 92%); margin: 0 auto; }
  .section { padding: 64px 0; }
  .alt { background: #f8fafc; }
  .grid { display: grid; gap: 24px; }
  .grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .align-center { align-items: center; }
  .btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 18px; border-radius: 999px; background: #2563eb; color: #fff; text-decoration: none; }
  .btn.ghost { background: transparent; color: #2563eb; border: 1px solid #2563eb; }
  .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; background: #e2e8f0; font-size: 12px; }
  .card { background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08); }
  .header { padding: 20px 0; background: #fff; border-bottom: 1px solid #e2e8f0; }
  .header-dark { background: #0f172a; color: #fff; }
  .header-dark a { color: #fff; }
  .header-inner { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
  .header-centered { text-align: center; }
  .header-centered .nav { justify-content: center; margin-top: 12px; }
  .logo { font-weight: 700; font-size: 20px; }
  .nav { display: flex; gap: 16px; flex-wrap: wrap; }
  .nav a { color: inherit; text-decoration: none; }
  .hero { padding: 80px 0; }
  .hero-center { text-align: center; }
  .hero-actions { display: flex; gap: 12px; margin-top: 16px; }
  .cta { background: #1e293b; color: #fff; padding: 48px 0; }
  .cta-inner { display: flex; align-items: center; justify-content: space-between; gap: 24px; }
  .price { font-size: 24px; font-weight: 700; }
  .list { list-style: none; padding: 0; margin: 12px 0 0; display: grid; gap: 8px; }
  .list a { color: inherit; text-decoration: none; }
  .highlight { border: 2px solid #2563eb; }
  .faq { display: grid; gap: 16px; }
  .form label { display: block; margin-bottom: 12px; font-weight: 600; }
  .form input, .form textarea { width: 100%; margin-top: 6px; padding: 10px; border-radius: 8px; border: 1px solid #cbd5f5; }
  .subscribe { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
  .subscribe-form { display: flex; gap: 12px; flex-wrap: wrap; }
  .subscribe-form input { padding: 10px 12px; border-radius: 8px; border: 1px solid #cbd5f5; }
  .whatsapp { padding: 24px; text-align: center; }
  .gallery img { border-radius: 12px; }
  .video iframe, .map iframe { width: 100%; border-radius: 12px; }
  .footer { background: #0f172a; color: #fff; padding: 48px 0; }
  .footer a { color: #e2e8f0; text-decoration: none; }
  .footer-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
  .footer.minimal { background: #0b1120; }
  .footer-inner { display: flex; align-items: center; justify-content: space-between; }
  .social { display: flex; gap: 12px; }
  .ui-row { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
  .alert { padding: 12px 16px; border-radius: 8px; margin-bottom: 8px; }
  .alert.success { background: #dcfce7; color: #166534; }
  .alert.warning { background: #fef3c7; color: #92400e; }
  .alert.danger { background: #fee2e2; color: #991b1b; }
  .tabs { display: flex; gap: 8px; }
  .tab { padding: 10px 14px; border-radius: 999px; background: #e2e8f0; }
  .modal { padding: 24px; background: rgba(15, 23, 42, 0.06); border-radius: 12px; }
  .cart { display: grid; gap: 12px; }
  .cart-item, .cart-total { display: flex; justify-content: space-between; }
`;

function isValidProjectData(data) {
  return data && (Array.isArray(data.pages) || data.components || data.styles);
}

async function loadContent() {
  const { html, css, template } = await apiRequest('/site/content');
  if (template) {
    try {
      const parsed = JSON.parse(template);
      if (isValidProjectData(parsed)) {
        editor.loadProjectData(parsed);
        return;
      }
    } catch (error) {
      // ignore invalid template json
    }
  }

  editor.setComponents(html || '<main class="page"><h1>Mi sitio</h1></main>');
  editor.setStyle(`${baseCss}\n${css || ''}`);
}

async function saveContent() {
  const html = editor.getHtml();
  const css = editor.getCss();
  const template = JSON.stringify(editor.getProjectData());
  await apiRequest('/site/content', {
    method: 'PUT',
    body: JSON.stringify({ html, css, template })
  });
}

async function publishSite() {
  const result = await apiRequest('/site/publish', { method: 'POST' });
  alert(`Sitio publicado en ${result.url}`);
}

async function loadAssets() {
  try {
    const { assets } = await apiRequest('/assets');
    if (Array.isArray(assets)) {
      editor.AssetManager.add(assets);
    }
  } catch (error) {
    // ignore asset list load errors
  }
}

loadContent().catch(() => {
  alert('No se pudo cargar el contenido.');
});

loadAssets();

const backBtn = document.getElementById('back-btn');
const assetsLibraryBtn = document.getElementById('assets-library-btn');
const saveBtn = document.getElementById('save-btn');
const publishBtn = document.getElementById('publish-btn');

backBtn.addEventListener('click', () => {
  window.location.href = '/';
});

assetsLibraryBtn.addEventListener('click', () => {
  lastSelectedComponent = editor.getSelected();
  editor.runCommand('open-assets');
});

editor.on('asset:select', insertSelectedAsset);

function handleDoubleClick(event) {
  console.log('=== DOBLE CLIC detectado ===');
  console.log('event.target:', event.target);
  const target = event.target;
  const element = target?.closest?.('[data-asset],[data-asset-id],.gjs-am-asset,.gjs-am-item');
  console.log('element encontrado:', element);
  if (!element) {
    console.log('❌ No se encontró elemento');
    return;
  }
  const src =
    element.getAttribute('data-asset') ||
    element.getAttribute('data-asset-src') ||
    element.getAttribute('data-src') ||
    element.querySelector?.('img')?.getAttribute?.('src');
  console.log('src del elemento:', src);
  if (!src) {
    console.log('❌ No se pudo extraer src');
    return;
  }
  console.log('✅ Llamando a insertSelectedAsset con:', src);
  insertSelectedAsset(src);
}

editor.AssetManager.on('open', () => {
  const container = editor.AssetManager.getContainer();
  if (!container) {
    return;
  }
  if (!lastSelectedComponent) {
    lastSelectedComponent = editor.getSelected();
  }
  container.removeEventListener('dblclick', handleDoubleClick);
  container.addEventListener('dblclick', handleDoubleClick);
});

editor.AssetManager.on('close', () => {
  lastSelectedComponent = null;
});

saveBtn.addEventListener('click', async () => {
  saveBtn.textContent = 'Guardando...';
  try {
    await saveContent();
    saveBtn.textContent = 'Guardado';
  } catch (error) {
    saveBtn.textContent = 'Error';
  }
  setTimeout(() => (saveBtn.textContent = 'Guardar'), 1500);
});

publishBtn.addEventListener('click', async () => {
  publishBtn.textContent = 'Publicando...';
  try {
    await saveContent();
    await publishSite();
    publishBtn.textContent = 'Publicado';
  } catch (error) {
    publishBtn.textContent = 'Error';
  }
  setTimeout(() => (publishBtn.textContent = 'Publicar'), 1500);
});
