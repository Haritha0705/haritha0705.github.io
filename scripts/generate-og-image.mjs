// Generates a 1200×630 OG image as a PNG using only Node.js built-ins
// Run: node scripts/generate-og-image.mjs

import { writeFileSync } from 'fs';

/*
 * We create a minimal valid PNG entirely in memory.
 * The image is 1200×630, dark background (#0B0B11) with a teal accent bar.
 * For a production-quality OG image with text, swap this out with a
 * designed image exported from Figma / Canva at 1200×630.
 *
 * This script produces a solid-color placeholder so social previews
 * always have *something* to show.
 */

const W = 1200;
const H = 630;

// Build raw RGBA pixel data
const raw = Buffer.alloc(W * H * 4);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const idx = (y * W + x) * 4;
    if (y < 6 || y > H - 7) {
      // Teal accent bars top & bottom
      raw[idx] = 0;      // R
      raw[idx + 1] = 200; // G
      raw[idx + 2] = 170; // B
      raw[idx + 3] = 255; // A
    } else {
      // Dark background
      raw[idx] = 11;
      raw[idx + 1] = 11;
      raw[idx + 2] = 17;
      raw[idx + 3] = 255;
    }
  }
}

// ---- Minimal PNG encoder (no dependencies) ----
import { deflateSync } from 'zlib';

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let j = 0; j < 8; j++) c = (c >>> 1) ^ (c & 1 ? 0xEDB88320 : 0);
  }
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function pngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeAndData = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData));
  return Buffer.concat([len, typeAndData, crc]);
}

// IHDR
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 2; // color type RGB
ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

// Convert RGBA → filtered RGB rows (filter byte 0 = None)
const rowBytes = 1 + W * 3;
const filtered = Buffer.alloc(H * rowBytes);
for (let y = 0; y < H; y++) {
  filtered[y * rowBytes] = 0; // filter: None
  for (let x = 0; x < W; x++) {
    const si = (y * W + x) * 4;
    const di = y * rowBytes + 1 + x * 3;
    filtered[di] = raw[si];
    filtered[di + 1] = raw[si + 1];
    filtered[di + 2] = raw[si + 2];
  }
}

const compressed = deflateSync(filtered);

const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), // PNG signature
  pngChunk('IHDR', ihdr),
  pngChunk('IDAT', compressed),
  pngChunk('IEND', Buffer.alloc(0)),
]);

writeFileSync('public/og-image.png', png);
console.log('✅ OG image created: public/og-image.png (%d bytes)', png.length);

