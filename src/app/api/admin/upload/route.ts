import { NextResponse } from 'next/server';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { randomBytes } from 'node:crypto';
import sharp from 'sharp';
import { auth } from '@/lib/admin-auth';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const maxDuration = 30;

// Sharp ile küçültüp sıkıştırdığımız için ham dosya sınırını yüksek tutuyoruz.
const MAX_BYTES = 30 * 1024 * 1024; // 30MB

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const admin = await db.admin.findUnique({ where: { clerkId: userId } });
  if (!admin) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const form = await req.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Dosya bulunamadı.' }, { status: 400 });
  }
  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'Sadece görsel yükleyebilirsiniz.' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Dosya 30MB sınırını geçiyor.' }, { status: 400 });
  }

  try {
    const input = Buffer.from(await file.arrayBuffer());

    // En çok 2000px genişliğe küçült, WebP'e sıkıştır (kalite 82) → küçük dosya.
    const { data, info } = await sharp(input)
      .rotate()
      .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer({ resolveWithObject: true });

    const name = `${Date.now()}-${randomBytes(5).toString('hex')}.webp`;

    // Production (Vercel): BLOB_READ_WRITE_TOKEN varsa kalıcı Blob depolama kullan.
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import('@vercel/blob');
      const blob = await put(`posts/${name}`, data, {
        access: 'public',
        contentType: 'image/webp',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      return NextResponse.json({ url: blob.url, width: info.width, height: info.height });
    }

    // Geliştirme (yerel): public/uploads klasörüne yaz.
    const dir = join(process.cwd(), 'public', 'uploads');
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, name), data);
    return NextResponse.json({ url: `/uploads/${name}`, width: info.width, height: info.height });
  } catch (err) {
    console.error('image upload failed', err);
    return NextResponse.json({ error: 'Görsel işlenemedi. Farklı bir dosya deneyin.' }, { status: 500 });
  }
}
