import { readPackage, unlockInput } from './site-crypto.js';
import { showWatermark } from './watermark.js';

const gate = document.querySelector('#gate');
const form = document.querySelector('#unlock-form');
const passwordInput = document.querySelector('#site-password');
const submit = form.querySelector('button');
const status = document.querySelector('#status');
const siteRoot = new URL('.', import.meta.url);

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

async function showDocs({ css, sidebar, pages, images }, group) {
  const theme = document.createElement('link');
  theme.rel = 'stylesheet';
  theme.href = new URL('vendor/vue.css', siteRoot);
  try {
    await loadResource(theme);
  } catch (error) {
    theme.remove();
    throw error;
  }

  const style = document.createElement('style');
  style.textContent = css;
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
          document.head.append(style);
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
    theme.remove();
    URL.revokeObjectURL(sidebarUrl);
    throw error;
  }
}

async function loadPackage() {
  const response = await fetch(new URL('site.pack', siteRoot), { cache: 'no-store' });
  if (!response.ok) throw new Error('无法下载加密内容，请刷新页面重试。');
  const bytes = new Uint8Array(await response.arrayBuffer());

  try {
    return readPackage(bytes);
  } catch {
    throw new Error('加密文件无法读取，请刷新页面。');
  }
}

async function readSite(pack, password) {
  let access;
  try {
    access = await unlockInput(pack, password);
  } catch (error) {
    if (error.name === 'OperationError') throw new Error('密码或 Key 错误，或加密文件已损坏。');
    throw new Error('加密文件无法读取。');
  }

  const stream = new Blob([access.compressed]).stream().pipeThrough(new DecompressionStream('gzip'));
  return { group: access.group, site: await new Response(stream).json() };
}

if (!globalThis.crypto?.subtle || !globalThis.DecompressionStream) {
  status.textContent = '请使用支持解密的现代浏览器，并通过 HTTPS 打开此站。';
} else {
  status.textContent = '正在加载加密内容…';
  let pack;
  try {
    pack = await loadPackage();
    submit.disabled = false;
    status.textContent = '';
  } catch (error) {
    status.textContent = error instanceof TypeError ? '无法连接站点，请刷新页面重试。' : error.message;
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submit.disabled) return;

    const password = passwordInput.value;
    passwordInput.value = '';
    submit.disabled = true;
    form.setAttribute('aria-busy', 'true');
    status.textContent = '正在解锁…';

    try {
      const { group, site } = await readSite(pack, password);
      await showDocs(site, group);
    } catch (error) {
      status.textContent = error instanceof TypeError ? '无法载入加密站点，请检查网络后重试。' : error.message;
      submit.disabled = false;
      form.removeAttribute('aria-busy');
      passwordInput.focus();
    }
  });
}
