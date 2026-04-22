import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { v2 as cloudinary } from 'cloudinary';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const maxDuration = 30;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: 'Dosya 8MB sınırını geçiyor.' }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const dataUri = `data:${file.type};base64,${bytes.toString('base64')}`;

  try {
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'afbrandworks/posts',
      resource_type: 'image',
    });
    return NextResponse.json({ url: result.secure_url, width: result.width, height: result.height });
  } catch (err) {
    console.error('cloudinary upload failed', err);
    return NextResponse.json({ error: 'Yükleme başarısız.' }, { status: 500 });
  }
}
