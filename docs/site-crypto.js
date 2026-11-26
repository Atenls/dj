import { decodeBase64Url, isAccessKey, readAccessKey } from './access-key.js';

const previousMagic = new TextEncoder().encode('DJLOCK02');
const dynamicMagic = new TextEncoder().encode('DJLOCK03');
const magicLength = previousMagic.length;
const publicKeyLength = 65;
const ivLength = 12;
const saltLength = 16;
const keyLength = 32;
const tagLength = 16;
const basePrefixLength = magicLength + 2 + ivLength;
const metadataLength = 4 + saltLength + ivLength;
const slotLength = metadataLength + keyLength + tagLength;

function aes(iv, additionalData) {
  return { name: 'AES-GCM', iv, additionalData, tagLength: tagLength * 8 };
}

function slotParameters(prefix, slot) {
  const authenticated = new Uint8Array(prefix.length + metadataLength);
  authenticated.set(prefix);
  authenticated.set(slot.subarray(0, metadataLength), prefix.length);
  return aes(slot.subarray(4 + saltLength, metadataLength), authenticated);
}

async function deriveKey(password, salt, usage) {
  const encodedPassword = new TextEncoder().encode(password);
  const material = await crypto.subtle.importKey('raw', encodedPassword, 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 600_000 },
    material,
    { name: 'AES-GCM', length: 256 },
    false,
    [usage],
  );
}

export async function seal(bytes, passwords, dynamic) {
  const groups = Object.entries(passwords).sort(([first], [second]) => Number(first) - Number(second));
  if (!groups.length || groups.length + Number(Boolean(dynamic)) > 65_535 || groups.some(([id, password]) =>
    !/^[1-9]\d*$/.test(id) || Number(id) > 2_147_483_647 || typeof password !== 'string' || !password)) {
    throw new Error('Invalid group credentials');
  }
  let publicKey;
  if (dynamic) {
    publicKey = decodeBase64Url(dynamic.publicKey);
    if (publicKey.length !== publicKeyLength || publicKey[0] !== 4 || decodeBase64Url(dynamic.password).length !== keyLength) {
      throw new Error('Invalid dynamic access credentials');
    }
    groups.unshift(['0', dynamic.password]);
  }
  if (new Set(groups.map(([, password]) => password)).size !== groups.length) {
    throw new Error('Group passwords must be distinct');
  }

  const prefixLength = basePrefixLength + (publicKey?.length ?? 0);
  const header = new Uint8Array(prefixLength + groups.length * slotLength);
  header.set(publicKey ? dynamicMagic : previousMagic);
  new DataView(header.buffer).setUint16(magicLength, groups.length);
  const contentIv = crypto.getRandomValues(header.subarray(magicLength + 2, basePrefixLength));
  if (publicKey) header.set(publicKey, basePrefixLength);
  const prefix = header.subarray(0, prefixLength);
  const rawKey = crypto.getRandomValues(new Uint8Array(keyLength));
  const contentKey = await crypto.subtle.importKey('raw', rawKey, 'AES-GCM', false, ['encrypt']);
  try {
    for (const [index, [group, password]] of groups.entries()) {
      const start = prefixLength + index * slotLength;
      const slot = header.subarray(start, start + slotLength);
      new DataView(slot.buffer, slot.byteOffset, slot.byteLength).setUint32(0, Number(group));
      crypto.getRandomValues(slot.subarray(4, metadataLength));
      const key = await deriveKey(password, slot.subarray(4, 4 + saltLength), 'encrypt');
      const wrapped = await crypto.subtle.encrypt(slotParameters(prefix, slot), key, rawKey);
      slot.set(new Uint8Array(wrapped), metadataLength);
    }
  } finally {
    rawKey.fill(0);
  }

  const ciphertext = new Uint8Array(await crypto.subtle.encrypt(aes(contentIv, header), contentKey, bytes));
  const pack = new Uint8Array(header.length + ciphertext.length);
  pack.set(header);
  pack.set(ciphertext, header.length);
  return pack;
}

export function readPackage(pack) {
  function unsupported() { throw new Error('Unsupported site package'); }

  const dynamic = dynamicMagic.every((byte, index) => pack[index] === byte);
  const prefixLength = basePrefixLength + (dynamic ? publicKeyLength : 0);
  if (pack.length < prefixLength + slotLength + tagLength ||
      (!dynamic && !previousMagic.every((byte, index) => pack[index] === byte))) {
    unsupported();
  }
  const layout = new DataView(pack.buffer, pack.byteOffset, pack.byteLength);
  const count = layout.getUint16(magicLength);
  const headerLength = prefixLength + count * slotLength;
  if (!count || pack.length < headerLength + tagLength) unsupported();

  const slots = new Map();
  for (let offset = prefixLength; offset < headerLength; offset += slotLength) {
    const id = layout.getUint32(offset);
    if ((!id && !dynamic) || id > 2_147_483_647 || slots.has(id)) unsupported();
    slots.set(id, pack.subarray(offset, offset + slotLength));
  }
  if (dynamic && (!slots.has(0) || slots.size < 2 || pack[basePrefixLength] !== 4)) unsupported();
  const prefix = pack.subarray(0, prefixLength);
  const header = pack.subarray(0, headerLength);
  const contentIv = prefix.subarray(magicLength + 2, basePrefixLength);

  return {
    groups: [...slots.keys()].filter(Boolean).sort((first, second) => first - second),
    dynamicPublicKey: dynamic ? prefix.subarray(basePrefixLength) : null,
    async unlock(group, password) {
      const slot = slots.get(group);
      if (!slot) throw new Error('Unknown access group');
      const key = await deriveKey(password, slot.subarray(4, 4 + saltLength), 'decrypt');
      const rawKey = new Uint8Array(await crypto.subtle.decrypt(slotParameters(prefix, slot), key, slot.subarray(metadataLength)));
      try {
        const contentKey = await crypto.subtle.importKey('raw', rawKey, 'AES-GCM', false, ['decrypt']);
        return await crypto.subtle.decrypt(aes(contentIv, header), contentKey, pack.subarray(headerLength));
      } finally {
        rawKey.fill(0);
      }
    },
  };
}

export async function unlockInput(pack, password) {
  const key = password.trim();
  if (pack.dynamicPublicKey && isAccessKey(key)) {
    // A numbered password can also happen to have the same shape as a Key.
    const access = await readAccessKey(key, pack.dynamicPublicKey).catch(() => null);
    if (access) {
      return { group: access.group, compressed: await pack.unlock(0, access.password) };
    }
  }

  for (const group of pack.groups) {
    try {
      return { group, compressed: await pack.unlock(group, password) };
    } catch (error) {
      if (error.name !== 'OperationError') throw error;
    }
  }
  throw new DOMException('Invalid access credential', 'OperationError');
}
