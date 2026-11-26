import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, isAbsolute, relative, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? 'docs');
const port = Number(process.env.PORT ?? 8080);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
};

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    const file = resolve(root, `.${pathname}${pathname.endsWith('/') ? 'index.html' : ''}`);
    const local = relative(root, file);
    if (local.startsWith('..') || isAbsolute(local)) throw new Error('File not found');

    const entry = await stat(file);
    if (entry.isDirectory() && !pathname.endsWith('/')) {
      response.writeHead(302, { Location: `${url.pathname}/${url.search}` });
      return response.end();
    }
    if (!entry.isFile()) throw new Error('File not found');
    response.setHeader('Content-Type', types[extname(file)] ?? 'application/octet-stream');
    if (request.method === 'HEAD') return response.end();
    const contents = createReadStream(file);
    contents.on('error', () => response.destroy());
    contents.pipe(response);
  } catch {
    response.writeHead(404).end();
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Preview: http://127.0.0.1:${server.address().port}/`);
});
