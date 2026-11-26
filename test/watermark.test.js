import assert from 'node:assert/strict';
import { test } from 'node:test';
import { decodeGroup, encodeGroup, gridSize, layout } from '../docs/watermark-pattern.js';

test('watermark data preserves numbered and dynamic group IDs with a checksum', () => {
  for (const group of [1, 8, 153, 2_147_483_647]) {
    const bits = encodeGroup(group);
    assert.equal(decodeGroup(bits), group);
    bits[12] ^= 1;
    assert.equal(decodeGroup(bits), null);
  }
  assert.equal(decodeGroup(encodeGroup(0)), null);
});

test('pilot and data occupy distinct cells in the tiled watermark', () => {
  const locations = new Set();
  for (const { x, y } of [...layout.pilot, ...layout.data.flat()]) {
    assert.ok(x >= 0 && x < gridSize && y >= 0 && y < gridSize);
    const index = y * gridSize + x;
    assert.ok(!locations.has(index));
    locations.add(index);
  }
});
