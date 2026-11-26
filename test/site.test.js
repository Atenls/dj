import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { gunzipSync } from 'node:zlib';
import { readPackage, seal } from '../docs/site-crypto.js';
import { buildSite } from '../scripts/build-site.js';

const password = '测试口令  包含 Unicode 和空格';
const secondPassword = '第十组的另一密码';

test('a package authenticates its header and content', async () => {
  const content = new TextEncoder().encode('正文');
  const passwords = { 1: password, 10: secondPassword };
  const first = await seal(content, passwords);
  const second = await seal(content, passwords);
  assert.notDeepEqual(first.subarray(10, 22), second.subarray(10, 22));
  assert.notDeepEqual(first.subarray(26, 54), second.subarray(26, 54));
  const pack = readPackage(first);
  assert.deepEqual(pack.groups, [1, 10]);
  assert.deepEqual(new Uint8Array(await pack.unlock(1, password)), content);
  assert.deepEqual(new Uint8Array(await pack.unlock(10, secondPassword)), content);
  await assert.rejects(pack.unlock(10, password), { name: 'OperationError' });
  await assert.rejects(pack.unlock(2, password), /Unknown access group/);
  assert.throws(() => readPackage(first.subarray(0, 35)), /Unsupported site package/);
  await assert.rejects(seal(content, { 1: password, 2: password }), /must be distinct/);

  for (const offset of [10, 28, 108, first.length - 1]) {
    const tampered = first.slice();
    tampered[offset] ^= 1;
    await assert.rejects(readPackage(tampered).unlock(1, password), { name: 'OperationError' });
  }
});

test('only the changed group requires a new password after rotation', async () => {
  const content = new Uint8Array([42]);
  const pack = readPackage(await seal(content, { 1: password, 10: '新口令' }));
  await assert.rejects(pack.unlock(10, secondPassword), { name: 'OperationError' });
  assert.deepEqual(new Uint8Array(await pack.unlock(10, '新口令')), content);
  assert.deepEqual(new Uint8Array(await pack.unlock(1, password)), content);
});

test('a build stores only the private sidebar, Markdown and images', async t => {
  const root = await mkdtemp(join(tmpdir(), 'dj-site-test-'));
  t.after(() => rm(root, { force: true, recursive: true }));
  const imageDir = join(root, 'dj', 'img', '中文 目录');
  const sidebar = '# [首页](dj/README)\r\n';
  const markdown = '# 正文\r\n\r\n<img src="/dj/img/中文 目录/图.png">';
  const image = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x00, 0xff]);

  await mkdir(imageDir, { recursive: true });
  await Promise.all([
    writeFile(join(root, 'shared.css'), '.markdown-section { color: purple; }\n'),
    writeFile(join(root, '_sidebar.md'), sidebar),
    writeFile(join(root, 'dj', 'README.md'), markdown),
    writeFile(join(imageDir, '图.png'), image),
  ]);

  const output = join(root, 'site.pack');
  const result = await buildSite(root, output, { 1: password });
  const pack = await readFile(output);
  assert.deepEqual(result, { pages: 1, images: 1, bytes: pack.length });
  assert.equal(pack.includes(Buffer.from('中文 目录')), false);
  const payload = JSON.parse(gunzipSync(await readPackage(pack).unlock(1, password)));
  assert.deepEqual(Object.keys(payload), ['sidebar', 'pages', 'images']);
  assert.equal(payload.sidebar, sidebar);
  assert.equal(payload.pages['dj/README.md'], markdown);
  assert.deepEqual(payload.images['dj/img/中文 目录/图.png'], {
    type: 'image/png',
    data: image.toString('base64'),
  });
});
