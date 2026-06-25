import sharp from 'sharp';
import { resolve } from 'node:path';

const SRC = '/tmp/tw-logo.png';
const pub = resolve(process.cwd(), 'public');

// 1) Şeffaf kenarları kırp → sıkı logo
const trimmed = await sharp(SRC).trim().toBuffer();
const meta = await sharp(trimmed).metadata();
console.log('kırpılmış boyut:', meta.width, 'x', meta.height);

// 2) Koyu tema: orijinal (beyaz wordmark + kırmızı işaret)
await sharp(trimmed).png().toFile(resolve(pub, 'toganworks-dark.png'));
console.log('toganworks-dark.png yazıldı');

// 3) Açık tema: beyaz/gri pikselleri siyaha çevir, kırmızıyı koru
const { data, info } = await sharp(trimmed).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const px = info.width * info.height;
for (let i = 0; i < px; i++) {
  const o = i * info.channels;
  const r = data[o], g = data[o + 1], b = data[o + 2];
  const isReddish = r - Math.max(g, b) > 35; // kırmızı işaret
  if (!isReddish) {
    data[o] = 0; data[o + 1] = 0; data[o + 2] = 0; // wordmark → siyah (alpha korunur)
  }
}
await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
  .png()
  .toFile(resolve(pub, 'toganworks-light.png'));
console.log('toganworks-light.png yazıldı');
