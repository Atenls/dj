export const cellSize = 2;
export const gridSize = 64;
export const tileSize = cellSize * gridSize;
const groupBits = 31;
const checkBits = 16;

function createLayout() {
  const occupied = new Uint8Array(gridSize * gridSize);
  let seed = 0xc6247e39;
  function randomWord() {
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    return seed >>> 0;
  }

  function taps(count) {
    return Array.from({ length: count }, () => {
      let index;
      do { index = randomWord() % occupied.length; } while (occupied[index]);
      occupied[index] = 1;
      return { x: index % gridSize, y: Math.floor(index / gridSize), sign: randomWord() & 1 ? 1 : -1 };
    });
  }

  return {
    pilot: taps(224),
    data: Array.from({ length: groupBits + checkBits }, () => taps(18)),
  };
}

export const layout = createLayout();

function checksum(group) {
  let check = 0xffff;
  for (let shift = 24; shift >= 0; shift -= 8) {
    check ^= ((group >>> shift) & 0xff) << 8;
    for (let bit = 0; bit < 8; bit++) {
      check = ((check << 1) ^ (check & 0x8000 ? 0x1021 : 0)) & 0xffff;
    }
  }
  return check;
}

export function encodeGroup(group) {
  const check = checksum(group);
  return Uint8Array.from({ length: groupBits + checkBits }, (_, bit) =>
    (bit < groupBits ? group >>> bit : check >>> (bit - groupBits)) & 1,
  );
}

export function decodeGroup(bits) {
  let group = 0;
  let check = 0;
  for (let bit = 0; bit < groupBits; bit++) group |= bits[bit] << bit;
  for (let bit = 0; bit < checkBits; bit++) check |= bits[groupBits + bit] << bit;
  return group > 0 && checksum(group) === check ? group : null;
}
