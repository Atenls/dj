const claimsLength = 44;
const secretOffset = 12;
const signatureLength = 64;
const encoder = new TextEncoder();
const context = encoder.encode('dj:access-key:v2');
const maskContext = encoder.encode('dj:access-key-mask:v2');
const signatureAlgorithm = { name: 'ECDSA', hash: 'SHA-256' };

export function encodeBase64Url(bytes) {
  return btoa(String.fromCharCode(...bytes)).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}

export function decodeBase64Url(text) {
  if (typeof text !== 'string' || !/^[A-Za-z0-9_-]+$/.test(text)) throw new Error('Invalid base64url');
  const bytes = Uint8Array.from(atob(text.replaceAll('-', '+').replaceAll('_', '/')), character => character.charCodeAt(0));
  if (encodeBase64Url(bytes) !== text) throw new Error('Invalid base64url');
  return bytes;
}

export function isAccessKey(text) {
  return typeof text === 'string' && /^[A-Za-z0-9_-]{144}$/.test(text);
}

function signedMessage(claims) {
  const message = new Uint8Array(context.length + claimsLength);
  message.set(context);
  message.set(claims, context.length);
  return message;
}

async function maskClaims(claims, signature) {
  // The signature is public. This masks visible structure; verification authenticates the claims.
  const material = await crypto.subtle.importKey('raw', signature, 'HKDF', false, ['deriveBits']);
  const mask = new Uint8Array(await crypto.subtle.deriveBits(
    { name: 'HKDF', hash: 'SHA-256', salt: new Uint8Array(0), info: maskContext }, material, claimsLength * 8,
  ));
  return Uint8Array.from(claims, (byte, index) => byte ^ mask[index]);
}

export async function issueAccessKey(group, password, privateKey) {
  const secret = decodeBase64Url(password);
  if (!Number.isInteger(group) || group < 1 || group > 2_147_483_647 || secret.length !== 32) {
    throw new Error('Invalid access credentials');
  }

  const claims = new Uint8Array(claimsLength);
  new DataView(claims.buffer).setUint32(0, group);
  crypto.getRandomValues(claims.subarray(4, secretOffset));
  claims.set(secret, secretOffset);

  const signingKey = await crypto.subtle.importKey('pkcs8', privateKey, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']);
  const signature = new Uint8Array(await crypto.subtle.sign(signatureAlgorithm, signingKey, signedMessage(claims)));
  const token = new Uint8Array(signatureLength + claimsLength);
  token.set(signature);
  token.set(await maskClaims(claims, signature), signatureLength);
  return encodeBase64Url(token);
}

export async function readAccessKey(text, publicKey) {
  if (!isAccessKey(text)) throw new Error('Invalid access key');
  const bytes = decodeBase64Url(text);
  const signature = bytes.subarray(0, signatureLength);
  const claims = await maskClaims(bytes.subarray(signatureLength), signature);
  const verifyingKey = await crypto.subtle.importKey('raw', publicKey, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify']);
  const valid = await crypto.subtle.verify(signatureAlgorithm, verifyingKey, signature, signedMessage(claims));
  const group = new DataView(claims.buffer).getUint32(0);
  if (!valid || group < 1 || group > 2_147_483_647) throw new Error('Invalid access key');
  return { group, password: encodeBase64Url(claims.subarray(secretOffset)) };
}
