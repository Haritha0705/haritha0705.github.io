import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SOURCE = join(ROOT, 'public', 'haritha.jpg');

async function check() {
  const meta = await sharp(SOURCE).metadata();
  const size = Math.min(meta.width, meta.height);
  const left = Math.round((meta.width - size) / 2);
  const top = Math.round((meta.height - size) / 2);

  const sq = await sharp(SOURCE)
    .extract({ left, top, width: size, height: size })
    .ensureAlpha()
    .toBuffer();

  const sqMeta = await sharp(sq).metadata();
  console.log('Square buffer:', sqMeta.channels, 'channels, hasAlpha:', sqMeta.hasAlpha);

  const ico32 = await sharp(sq).resize(32, 32).png().toBuffer();
  const ico32Meta = await sharp(ico32).metadata();
  console.log('ICO 32px PNG:', ico32Meta.channels, 'channels, hasAlpha:', ico32Meta.hasAlpha);

  // IHDR color type byte is at offset 25 in a PNG
  console.log('Color type byte:', ico32[25], '(6=RGBA, 2=RGB)');

  // Also try explicit 4-channel approach
  const ico32v2 = await sharp(sq).resize(32, 32).ensureAlpha().png({ colours: 256 }).toBuffer();
  const ico32v2Meta = await sharp(ico32v2).metadata();
  console.log('ICO 32px v2 PNG:', ico32v2Meta.channels, 'channels, hasAlpha:', ico32v2Meta.hasAlpha);
  console.log('Color type byte v2:', ico32v2[25], '(6=RGBA, 2=RGB)');

  // Try raw approach - force RGBA then encode PNG
  const raw32 = await sharp(sq).resize(32, 32).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  console.log('Raw 32px:', raw32.info.channels, 'channels, width:', raw32.info.width, 'height:', raw32.info.height);
  
  const ico32v3 = await sharp(raw32.data, { raw: { width: 32, height: 32, channels: 4 } }).png().toBuffer();
  console.log('Color type byte v3:', ico32v3[25], '(6=RGBA, 2=RGB)');
}

check().catch(console.error);

