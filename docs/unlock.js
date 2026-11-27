import { readPackage, unlockInput } from './site-crypto.js';
import { showWatermark } from './watermark.js';

const gate = document.querySelector('#gate');
const form = document.querySelector('#unlock-form');
const passwordInput = document.querySelector('#site-password');
const submit = form.querySelector('button');
const status = document.querySelector('#status');
const siteRoot = new URL('.', import.meta.url);
const publicAssetsPath = new URL('public/assets/', siteRoot).pathname;

function setStatus(message) {
  if (status) status.textContent = message;
}

function pageFile(path) {
  if (path === '/') return 'dj/README.md';
  let relative;
  try {
    relative = decodeURIComponent(path).replace(/^\/+/, '');
  } catch (error) {
    if (!(error instanceof URIError)) throw error;
    return null;
  }
  if (relative.endsWith('/')) return `${relative}README.md`;
  return relative.endsWith('.md') ? relative : `${relative}.md`;
}

function replaceImages(html, path, images, imageUrls) {
  const template = document.createElement('template');
  template.innerHTML = html;
  const base = new URL(pageFile(path) ?? '.', siteRoot);

  for (const image of template.content.querySelectorAll('img[src]')) {
    const source = new URL(image.getAttribute('src'), base);
    if (source.origin !== siteRoot.origin) continue;

    // Docsify rewrites Markdown image paths and keeps the original in data-origin.
    const original = image.dataset.origin ? new URL(image.dataset.origin, base) : source;
    if (original.origin === siteRoot.origin && original.pathname.startsWith(publicAssetsPath)) {
      image.src = original.href;
      continue;
    }

    const pathname = decodeURIComponent(source.pathname);
    const file = pathname.startsWith(siteRoot.pathname)
      ? pathname.slice(siteRoot.pathname.length)
      : pathname.slice(1);
    if (!Object.hasOwn(images, file)) {
      image.removeAttribute('src');
      continue;
    }

    if (!imageUrls.has(file)) {
      const { type, data } = images[file];
      const bytes = Uint8Array.from(atob(data), character => character.charCodeAt(0));
      imageUrls.set(file, URL.createObjectURL(new Blob([bytes], { type })));
    }
    image.src = imageUrls.get(file);
  }
  return template.innerHTML;
}

function loadResource(element) {
  return new Promise((resolve, reject) => {
    element.addEventListener('load', resolve, { once: true });
    element.addEventListener('error', () => reject(new Error('无法载入阅读器资源，请刷新后重试。')), { once: true });
    document.head.append(element);
  });
}

function loadScript(file) {
  const script = document.createElement('script');
  script.src = new URL(file, siteRoot);
  return loadResource(script);
}

async function showDocs({ sidebar, pages, images }, group) {
  const stylesheets = ['vendor/vue.css', 'shared.css'].map(file => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = new URL(file, siteRoot);
    return link;
  });
  try {
    await Promise.all(stylesheets.map(loadResource));
  } catch (error) {
    stylesheets.forEach(link => link.remove());
    throw error;
  }

  const sidebarUrl = URL.createObjectURL(new Blob([sidebar], { type: 'text/plain;charset=utf-8' }));
  const imageUrls = new Map();

  window.$docsify = {
    name: '',
    repo: '',
    loadSidebar: true,
    subMaxLevel: 3,
    homepage: 'dj/README.md',
    // Docsify appends an extension to aliases. Put it inside the Blob URL fragment.
    alias: { '/(?:.*/)?_sidebar\\.md': `${sidebarUrl}#.md` },
    routes: {
      '/(.*)'(path) {
        return pages[pageFile(path)] ?? '# 页面不存在';
      },
    },
    plugins: [
      (hook, vm) => {
        hook.afterEach(html => replaceImages(html, vm.route.path, images, imageUrls));
        hook.ready(() => {
          gate.remove();
          showWatermark(group);
        });
      },
    ],
  };

  const app = document.createElement('div');
  app.id = 'app';
  gate.after(app);
  try {
    await loadScript('vendor/zoom-image.min.js');
    await loadScript('vendor/docsify.min.js');
  } catch (error) {
    app.remove();
    stylesheets.forEach(link => link.remove());
    URL.revokeObjectURL(sidebarUrl);
    throw error;
  }
}

async function loadPackage() {
  const response = await fetch(new URL('site.pack', siteRoot), { cache: 'no-store' });
  if (!response.ok) throw new Error('Could not load the encrypted package');
  return readPackage(new Uint8Array(await response.arrayBuffer()));
}

async function readSite(pack, password) {
  const access = await unlockInput(pack, password);
  const stream = new Blob([access.compressed]).stream().pipeThrough(new DecompressionStream('gzip'));
  return { group: access.group, site: await new Response(stream).json() };
}

if (globalThis.crypto?.subtle && globalThis.DecompressionStream) {
  let pendingPack = loadPackage().catch(() => null);
  submit.disabled = false;
  passwordInput.addEventListener('invalid', event => {
    if (!status || !passwordInput.validity.valueMissing) return;
    event.preventDefault();
    passwordInput.setAttribute('aria-invalid', 'true');
    setStatus('请填写此字段。');
    passwordInput.focus();
  });
  passwordInput.addEventListener('input', () => {
    passwordInput.removeAttribute('aria-invalid');
    if (!submit.disabled) setStatus('');
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submit.disabled) return;

    const password = passwordInput.value;
    passwordInput.value = '';
    passwordInput.removeAttribute('aria-invalid');
    submit.disabled = true;
    form.setAttribute('aria-busy', 'true');
    setStatus('正在解锁…');
    try {
      const pack = (await pendingPack) ?? (await loadPackage());
      pendingPack = Promise.resolve(pack);
      const { group, site } = await readSite(pack, password);
      await showDocs(site, group);
    } catch (error) {
      const invalidPassword = error.name === 'OperationError';
      if (invalidPassword) passwordInput.setAttribute('aria-invalid', 'true');
      setStatus(invalidPassword ? '访问凭证有误，请重试。' : '无法载入内容，请重试。');
      submit.disabled = false;
      form.removeAttribute('aria-busy');
      passwordInput.focus();
    }
  });
} else {
  setStatus('请使用支持解密的浏览器，并通过 HTTPS 打开此站。');
}
