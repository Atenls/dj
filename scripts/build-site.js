import { randomUUID } from 'node:crypto';
import { readdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { seal } from '../docs/site-crypto.js';

const imageTypes = new Map([
  ['.avif', 'image/avif'],
  ['.gif', 'image/gif'],
  ['.jpeg', 'image/jpeg'],
  ['.jpg', 'image/jpeg'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp'],
]);

async function collectContent(source, directory, pages, images) {
  const entries = await readdir(join(source, directory), { withFileTypes: true });
  entries.sort((first, second) => first.name.localeCompare(second.name, 'en'));
  for (const entry of entries) {
    const file = `${directory}/${entry.name}`;
    if (entry.isDirectory()) {
      await collectContent(source, file, pages, images);
      continue;
    }
    if (!entry.isFile()) throw new Error(`Unsupported source entry: ${file}`);

    const extension = entry.name.slice(entry.name.lastIndexOf('.')).toLowerCase();
    if (extension === '.md') {
      pages[file] = await readFile(join(source, file), 'utf8');
      continue;
    }
    const type = imageTypes.get(extension);
    if (!type) throw new Error(`Unsupported source file: ${file}`);

    const bytes = await readFile(join(source, file));
    images[file] = { type, data: bytes.toString('base64') };
  }
}

export async function buildSite(source, output, passwords, dynamic) {
  const sidebar = await readFile(join(source, '_sidebar.md'), 'utf8');
  const pages = Object.create(null);
  const images = Object.create(null);
  await collectContent(source, 'dj', pages, images);
  if (!pages['dj/README.md']) throw new Error('The source homepage is missing or empty.');

  const zipped = gzipSync(JSON.stringify({ sidebar, pages, images }));
  const pack = await seal(zipped, passwords, dynamic);
  const temporary = `${output}.${randomUUID()}.tmp`;
  try {
    await writeFile(temporary, pack, { flag: 'wx' });
    await rename(temporary, output);
  } finally {
    await rm(temporary, { force: true });
  }
  return { pages: Object.keys(pages).length, images: Object.keys(images).length, bytes: pack.length };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const [source, output = 'docs/site.pack'] = process.argv.slice(2);
    if (!source || process.stdin.isTTY) throw new Error('Group credentials are required on standard input.');

    const chunks = [];
    for await (const chunk of process.stdin) chunks.push(chunk);
    let credentials;
    try {
      credentials = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch {
      throw new Error('Invalid group credentials');
    }
    if (!credentials || Object.getPrototypeOf(credentials) !== Object.prototype) throw new Error('Invalid group credentials');
    const passwords = credentials.passwords ?? credentials;
    if (!passwords || Object.getPrototypeOf(passwords) !== Object.prototype) throw new Error('Invalid group credentials');

    const result = await buildSite(resolve(source), resolve(output), passwords, credentials.dynamic);
    console.log(`Encrypted ${result.pages} pages, one sidebar and ${result.images} images (${result.bytes} bytes).`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
