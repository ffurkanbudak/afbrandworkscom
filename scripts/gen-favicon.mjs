import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const pub = resolve(process.cwd(), 'public');
const base = readFileSync(resolve(pub, 'afb-mark-black.svg'), 'utf8');

// "afb" monogram içeriği 810x1012 tuvalinde ~ x[297,512] y[447,557] aralığında.
// Kare favicon için içeriğe ortalı kırpılmış viewBox.
const SQUARE_VB = '270 368 269 269';

function withViewBox(svg, vb) {
  return svg
    .replace(/\swidth="1080"/, '')
    .replace(/\sheight="1350"/, '')
    .replace(/viewBox="0 0 810 1012\.49997"/, `viewBox="${vb}"`);
}

// 1) Render için: siyah marka, kare kırpılmış, şeffaf zemin.
const renderSvg = withViewBox(base, SQUARE_VB);

// 2) public/favicon.svg: temaya uyumlu (açık sekmede siyah, koyu sekmede beyaz; kare kırmızı kalır).
const adaptiveSvg = withViewBox(base, SQUARE_VB)
  .replace(
    '<defs>',
    '<defs><style>.afb{fill:#0a0a0a}@media (prefers-color-scheme:dark){.afb{fill:#fff}}</style>',
  )
  .replaceAll('fill="#000000"', 'class="afb"');
writeFileSync(resolve(pub, 'favicon.svg'), adaptiveSvg);
console.log('favicon.svg yazıldı (adaptif)');

const renderBuf = Buffer.from(renderSvg);

// PNG boyutları (şeffaf zemin, siyah marka)
const pngTargets = [
  ['favicon-16.png', 16],
  ['favicon-32.png', 32],
  ['favicon-48.png', 48],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
];
for (const [name, size] of pngTargets) {
  await sharp(renderBuf, { density: 384 })
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(resolve(pub, name));
  console.log(`${name} (${size}px)`);
}

// apple-icon: iOS şeffaflığı sevmez → beyaz zemin
await sharp(renderBuf, { density: 384 })
  .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
  .flatten({ background: '#ffffff' })
  .png()
  .toFile(resolve(pub, 'apple-icon.png'));
console.log('apple-icon.png (180px, beyaz zemin)');

// favicon.ico — 16/32/48 PNG'leri PNG-in-ICO olarak paketle
const icoSizes = [16, 32, 48];
const pngs = await Promise.all(
  icoSizes.map((s) =>
    sharp(renderBuf, { density: 384 })
      .resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer(),
  ),
);

function buildIco(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);
  const entries = [];
  const datas = [];
  let offset = 6 + count * 16;
  for (let i = 0; i < count; i++) {
    const png = images[i];
    const size = icoSizes[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // colors
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += png.length;
    entries.push(entry);
    datas.push(png);
  }
  return Buffer.concat([header, ...entries, ...datas]);
}

writeFileSync(resolve(pub, 'favicon.ico'), buildIco(pngs));
console.log('favicon.ico yazıldı (16/32/48 PNG-in-ICO)');
