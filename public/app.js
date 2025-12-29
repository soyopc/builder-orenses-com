const loginSection = document.getElementById('login-section');
const siteSection = document.getElementById('site-section');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');
const siteInfo = document.getElementById('site-info');
const siteActions = document.getElementById('site-actions');
const siteForm = document.getElementById('site-form');
const templateSelect = document.getElementById('template-select');
const createSiteBtn = document.getElementById('create-site-btn');
const createError = document.getElementById('create-error');
const renameForm = document.getElementById('rename-form');
const renameSiteBtn = document.getElementById('rename-site-btn');
const renameError = document.getElementById('rename-error');

const API_BASE = '/api';

function getToken() {
  return localStorage.getItem('builder_jwt');
}

function setToken(token) {
  localStorage.setItem('builder_jwt', token);
}

function clearToken() {
  localStorage.removeItem('builder_jwt');
}

async function apiRequest(path, options = {}) {
  const token = getToken();
  const headers = options.headers || {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'request_failed');
  }
  return response.json();
}

function showLogin() {
  loginSection.classList.remove('hidden');
  siteSection.classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showSite() {
  loginSection.classList.add('hidden');
  siteSection.classList.remove('hidden');
}

async function loadTemplates() {
  const { templates } = await apiRequest('/templates');
  templateSelect.innerHTML = templates
    .map((template) => `<option value="${template}">${template}</option>`)
    .join('');
}

async function loadSite() {
  const { site } = await apiRequest('/site/me');
  siteActions.innerHTML = '';
  siteInfo.innerHTML = '';
  siteForm.classList.add('hidden');
  renameForm.classList.add('hidden');

  if (!site) {
    siteInfo.innerHTML = '<p>No tienes un sitio aún.</p>';
    siteForm.classList.remove('hidden');
    await loadTemplates();
    return;
  }

  siteInfo.innerHTML = `
    <p><strong>Slug:</strong> ${site.slug}</p>
    <p><strong>URL:</strong> <a href="https://orenses.com/u/${site.slug}/" target="_blank">https://orenses.com/u/${site.slug}/</a></p>
  `;

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Editar';
  editBtn.addEventListener('click', () => {
    window.location.href = '/editor.html';
  });

  const renameBtn = document.createElement('button');
  renameBtn.textContent = 'Renombrar';
  renameBtn.classList.add('ghost');
  renameBtn.addEventListener('click', () => {
    renameForm.classList.toggle('hidden');
  });

  siteActions.append(editBtn, renameBtn);
}

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  loginError.textContent = '';
  const formData = new FormData(loginForm);
  const payload = {
    email: formData.get('email'),
    password: formData.get('password')
  };

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      throw new Error('login_failed');
    }
    const data = await response.json();
    setToken(data.token);
    showSite();
    await loadSite();
  } catch (error) {
    loginError.textContent = 'Credenciales inválidas o error de conexión.';
  }
});

logoutBtn.addEventListener('click', () => {
  clearToken();
  showLogin();
});

createSiteBtn.addEventListener('click', async () => {
  createError.textContent = '';
  const slug = document.getElementById('new-slug').value.trim();
  const templateKey = templateSelect.value;

  try {
    await apiRequest('/site', {
      method: 'POST',
      body: JSON.stringify({ slug, templateKey })
    });
    await loadSite();
  } catch (error) {
    createError.textContent = 'No se pudo crear el sitio. Verifica el slug.';
  }
});

renameSiteBtn.addEventListener('click', async () => {
  renameError.textContent = '';
  const slug = document.getElementById('rename-slug').value.trim();

  try {
    await apiRequest('/site/rename', {
      method: 'PATCH',
      body: JSON.stringify({ slug })
    });
    await loadSite();
  } catch (error) {
    renameError.textContent = 'No se pudo renombrar el sitio.';
  }
});

(async () => {
  if (getToken()) {
    showSite();
    try {
      await loadSite();
    } catch (error) {
      showLogin();
    }
  } else {
    showLogin();
  }
})();
