import assert from 'node:assert/strict';
import { test } from 'node:test';
import { decodeBase64Url, encodeBase64Url, isAccessKey, issueAccessKey, readAccessKey } from '../docs/access-key.js';
import { readPackage, seal, unlockInput } from '../docs/site-crypto.js';

async function signingCredentials() {
  const keys = await crypto.subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign', 'verify']);
  return {
    password: encodeBase64Url(crypto.getRandomValues(new Uint8Array(32))),
    publicKey: new Uint8Array(await crypto.subtle.exportKey('raw', keys.publicKey)),
    privateKey: new Uint8Array(await crypto.subtle.exportKey('pkcs8', keys.privateKey)),
  };
}

test('each issuance produces a fixed-length opaque key for the signed group', async () => {
  const { password, publicKey, privateKey } = await signingCredentials();
  const first = await issueAccessKey(12, password, privateKey);
  const second = await issueAccessKey(12, password, privateKey);
  for (const key of [first, second]) {
    assert.equal(isAccessKey(key), true);
    assert.equal(key.length, 144);
    assert.deepEqual(await readAccessKey(key, publicKey), { group: 12, password });
  }
  assert.notEqual(first, second);
  assert.equal(isAccessKey('A'.repeat(236)), false);
  await assert.rejects(readAccessKey('A'.repeat(236), publicKey), /Invalid access key/);
  const wrongIssuer = await signingCredentials();
  await assert.rejects(readAccessKey(first, wrongIssuer.publicKey), /Invalid access key/);
  const bytes = decodeBase64Url(first);
  bytes[bytes.length - 1] ^= 1;
  await assert.rejects(readAccessKey(encodeBase64Url(bytes), publicKey), /Invalid access key/);
});

test('changing the masked group cannot forge a new signature', async () => {
  const { password, publicKey, privateKey } = await signingCredentials();
  const bytes = decodeBase64Url(await issueAccessKey(12, password, privateKey));
  bytes[64 + 3] ^= 1; // Flip the last bit of the group while preserving the signature and mask.
  await assert.rejects(readAccessKey(encodeBase64Url(bytes), publicKey), /Invalid access key/);
});

test('dynamic keys survive a content release and numbered passwords remain available', async () => {
  const { password, publicKey, privateKey } = await signingCredentials();
  const config = { password, publicKey: encodeBase64Url(publicKey) };
  const groups = { 1: 'fixed password' };
  const text = new Uint8Array([12]);
  const initial = readPackage(await seal(new Uint8Array([1]), groups, config));
  const issued = await issueAccessKey(273, password, privateKey);
  const { password: credential } = await readAccessKey(issued, initial.dynamicPublicKey);
  assert.deepEqual(new Uint8Array(await initial.unlock(0, credential)), new Uint8Array([1]));

  const rebuiltBytes = await seal(text, groups, config);
  const rebuilt = readPackage(rebuiltBytes);
  assert.deepEqual(rebuilt.groups, [1]);
  assert.deepEqual(await readAccessKey(issued, rebuilt.dynamicPublicKey), { group: 273, password });
  assert.deepEqual(new Uint8Array(await rebuilt.unlock(0, credential)), text);
  assert.deepEqual(new Uint8Array(await rebuilt.unlock(1, groups[1])), text);
  const tampered = rebuiltBytes.slice();
  tampered[23] ^= 1;
  await assert.rejects(readPackage(tampered).unlock(0, credential), { name: 'OperationError' });

  const previous = readPackage(await seal(text, groups));
  assert.equal(previous.dynamicPublicKey, null);
  assert.deepEqual(new Uint8Array(await previous.unlock(1, groups[1])), text);
});

test('one input finds passwords and signed keys without a group hint', async () => {
  const { password, publicKey, privateKey } = await signingCredentials();
  const config = { password, publicKey: encodeBase64Url(publicKey) };
  const keyShapedPassword = 'A'.repeat(144);
  const groups = { 1: 'fixed password', 4: ' spaces preserved ', 8: keyShapedPassword };
  const text = new Uint8Array([21]);
  const pack = readPackage(await seal(text, groups, config));
  const issued = await issueAccessKey(153, password, privateKey);
  for (const [input, expected] of [[' spaces preserved ', 4], [keyShapedPassword, 8], [` ${issued} `, 153]]) {
    const { group, compressed } = await unlockInput(pack, input);
    assert.equal(group, expected);
    assert.deepEqual(new Uint8Array(compressed), text);
  }
  await assert.rejects(unlockInput(pack, 'wrong password'), { name: 'OperationError' });
  const previous = readPackage(await seal(text, groups));
  assert.equal((await unlockInput(previous, keyShapedPassword)).group, 8);
});
