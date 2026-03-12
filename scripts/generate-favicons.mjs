import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SOURCE = join(ROOT, 'public', 'haritha.jpg');

async function generateFavicons() {
  // Read source and crop to square (center crop)
  const metadata = await sharp(SOURCE).metadata();
  const size = Math.min(metadata.width, metadata.height);
  const left = Math.round((metadata.width - size) / 2);
  const top = Math.round((metadata.height - size) / 2);

  const squareBuffer = await sharp(SOURCE)
    .extract({ left, top, width: size, height: size })
    .toBuffer();

  // 1. icon.png — 512x512 (PWA icon)
  await sharp(squareBuffer)
    .resize(512, 512, { fit: 'cover' })
    .png()
    .toFile(join(ROOT, 'app', 'icon.png'));
  console.log('✅ app/icon.png (512x512)');

  // 2. apple-icon.png — 180x180
  await sharp(squareBuffer)
    .resize(180, 180, { fit: 'cover' })
    .png()
    .toFile(join(ROOT, 'app', 'apple-icon.png'));
  console.log('✅ app/apple-icon.png (180x180)');

  // 3. favicon.ico — 48x48 PNG saved as .ico
  //    Modern browsers accept PNG-in-ICO; we'll create a proper ICO container
  const ico16 = await sharp(squareBuffer).resize(16, 16).png().toBuffer();
  const ico32 = await sharp(squareBuffer).resize(32, 32).png().toBuffer();
  const ico48 = await sharp(squareBuffer).resize(48, 48).png().toBuffer();

  // Build ICO file (multi-size PNG container)
  const icoBuffer = createIco([ico16, ico32, ico48], [16, 32, 48]);
  writeFileSync(join(ROOT, 'app', 'favicon.ico'), icoBuffer);
  console.log('✅ app/favicon.ico (16x16, 32x32, 48x48)');

  console.log('\n🎉 All favicons generated from haritha.jpg!');
}

/**
 * Creates a minimal ICO file containing PNG images.
 * ICO format: Header (6 bytes) + Directory entries (16 bytes each) + PNG data
 */
function createIco(pngBuffers, sizes) {
  const headerSize = 6;
  const dirEntrySize = 16;
  const numImages = pngBuffers.length;
  const dirSize = dirEntrySize * numImages;
  let dataOffset = headerSize + dirSize;

  // ICO Header
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);         // Reserved
  header.writeUInt16LE(1, 2);         // Type: 1 = ICO
  header.writeUInt16LE(numImages, 4); // Number of images

  // Directory entries
  const dirEntries = [];
  const dataBuffers = [];

  for (let i = 0; i < numImages; i++) {
    const entry = Buffer.alloc(dirEntrySize);
    const s = sizes[i] >= 256 ? 0 : sizes[i]; // 0 means 256
    entry.writeUInt8(s, 0);                     // Width
    entry.writeUInt8(s, 1);                     // Height
    entry.writeUInt8(0, 2);                     // Color palette
    entry.writeUInt8(0, 3);                     // Reserved
    entry.writeUInt16LE(1, 4);                  // Color planes
    entry.writeUInt16LE(32, 6);                 // Bits per pixel
    entry.writeUInt32LE(pngBuffers[i].length, 8);  // Image data size
    entry.writeUInt32LE(dataOffset, 12);            // Offset to image data

    dirEntries.push(entry);
    dataBuffers.push(pngBuffers[i]);
    dataOffset += pngBuffers[i].length;
  }

  return Buffer.concat([header, ...dirEntries, ...dataBuffers]);
}

generateFavicons().catch(console.error);

