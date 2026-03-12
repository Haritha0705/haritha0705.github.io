import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SOURCE = join(ROOT, 'public', 'haritha.jpg');

/**
 * Force-produce an RGBA PNG at a given size.
 * sharp strips alpha when all pixels are opaque, so we go through raw pixels
 * to guarantee 4-channel output (color-type 6).
 */
async function rgbaPng(inputBuffer, size) {
  const { data, info } = await sharp(inputBuffer)
    .resize(size, size, { fit: 'cover' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toBuffer();
}

/**
 * Build a minimal ICO file containing RGBA PNG images.
 */
function createIco(pngBuffers, sizes) {
  const headerSize = 6;
  const dirEntrySize = 16;
  const numImages = pngBuffers.length;
  let dataOffset = headerSize + dirEntrySize * numImages;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);           // Reserved
  header.writeUInt16LE(1, 2);           // Type: 1 = ICO
  header.writeUInt16LE(numImages, 4);   // Image count

  const parts = [header];

  for (let i = 0; i < numImages; i++) {
    const entry = Buffer.alloc(dirEntrySize);
    const s = sizes[i] >= 256 ? 0 : sizes[i];
    entry.writeUInt8(s, 0);                              // Width
    entry.writeUInt8(s, 1);                              // Height
    entry.writeUInt8(0, 2);                              // Color palette
    entry.writeUInt8(0, 3);                              // Reserved
    entry.writeUInt16LE(1, 4);                           // Color planes
    entry.writeUInt16LE(32, 6);                          // Bits per pixel
    entry.writeUInt32LE(pngBuffers[i].length, 8);        // Data size
    entry.writeUInt32LE(dataOffset, 12);                 // Data offset
    parts.push(entry);
    dataOffset += pngBuffers[i].length;
  }

  parts.push(...pngBuffers);
  return Buffer.concat(parts);
}

async function main() {
  // Centre-crop source to a square
  const meta = await sharp(SOURCE).metadata();
  const size = Math.min(meta.width, meta.height);
  const left = Math.round((meta.width - size) / 2);
  const top = Math.round((meta.height - size) / 2);

  const square = await sharp(SOURCE)
    .extract({ left, top, width: size, height: size })
    .toBuffer();

  // 1. icon.png — 512×512 (PWA / manifest)
  const icon512 = await rgbaPng(square, 512);
  writeFileSync(join(ROOT, 'app', 'icon.png'), icon512);
  console.log('✅ app/icon.png  (512×512, RGBA)');

  // 2. apple-icon.png — 180×180
  const apple180 = await rgbaPng(square, 180);
  writeFileSync(join(ROOT, 'app', 'apple-icon.png'), apple180);
  console.log('✅ app/apple-icon.png  (180×180, RGBA)');

  // 3. favicon.ico — multi-size RGBA PNGs
  const ico16 = await rgbaPng(square, 16);
  const ico32 = await rgbaPng(square, 32);
  const ico48 = await rgbaPng(square, 48);

  // Verify color type is 6 (RGBA)
  [ico16, ico32, ico48].forEach((buf, i) => {
    const ct = buf[25];
    if (ct !== 6) throw new Error(`PNG ${[16, 32, 48][i]}px has color-type ${ct}, expected 6 (RGBA)`);
  });

  const icoBuffer = createIco([ico16, ico32, ico48], [16, 32, 48]);
  writeFileSync(join(ROOT, 'app', 'favicon.ico'), icoBuffer);
  console.log('✅ app/favicon.ico  (16+32+48, RGBA)');

  console.log('\n🎉  All favicons generated (RGBA) from haritha.jpg');
}

main().catch((err) => { console.error(err); process.exit(1); });
