import { cellSize, encodeGroup, layout, tileSize } from './watermark-pattern.js';

export function showWatermark(group) {
  const tile = document.createElement('canvas');
  tile.width = tile.height = tileSize;
  const ink = tile.getContext('2d');
  ink.globalAlpha = 0.0275;
  const [xPhase, yPhase, orientation] = crypto.getRandomValues(new Uint8Array(3));
  const polarity = orientation & 1 ? 1 : -1;
  const offsetX = xPhase % tileSize;
  const offsetY = yPhase % tileSize;

  // Encode the bits in the polarity of dispersed color samples, with a known pilot for alignment.
  function paint(taps, bitSign) {
    for (const { x, y, sign } of taps) {
      ink.fillStyle = sign * bitSign * polarity > 0 ? 'rgb(255, 255, 145)' : 'rgb(99, 159, 255)';
      ink.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
  paint(layout.pilot, 1);
  encodeGroup(group).forEach((bit, index) => paint(layout.data[index], bit ? 1 : -1));

  const overlay = document.createElement('canvas');
  overlay.className = 'reader-watermark';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.append(overlay);

  const graphics = overlay.getContext('2d');
  function draw() {
    const width = overlay.clientWidth;
    const height = overlay.clientHeight;
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    overlay.width = Math.ceil(width * scale);
    overlay.height = Math.ceil(height * scale);
    graphics.scale(scale, scale);
    graphics.translate(-offsetX, -offsetY);
    graphics.fillStyle = graphics.createPattern(tile, 'repeat');
    graphics.fillRect(0, 0, width + offsetX, height + offsetY);
  }
  draw();
  window.addEventListener('resize', draw);
}
