import { NextResponse } from 'next/server';
import { auth } from '@/lib/admin-auth';
import { db } from '@/lib/db';

function clean(v: unknown): string | null {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  return t.length === 0 ? null : t;
}

export async function PATCH(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const admin = await db.admin.findUnique({ where: { clerkId: userId } });
  if (!admin) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const name = clean(body.name);
  const title = clean(body.title);
  const bio = clean(body.bio);
  const avatarUrl = clean(body.avatarUrl);

  if (avatarUrl) {
    const isUrl = /^https?:\/\//i.test(avatarUrl);
    const isDataImage = /^data:image\/(png|jpe?g|webp|gif);base64,/i.test(avatarUrl);
    if (!isUrl && !isDataImage) {
      return NextResponse.json({ error: 'Avatar bağlantısı geçersiz.' }, { status: 400 });
    }
    if (isDataImage && avatarUrl.length > 350_000) {
      return NextResponse.json(
        { error: 'Fotoğraf çok büyük. Daha küçük bir görsel dene.' },
        { status: 413 }
      );
    }
  }
  if (bio && bio.length > 600) {
    return NextResponse.json({ error: 'Biyografi 600 karakteri aşamaz.' }, { status: 400 });
  }

  const updated = await db.admin.update({
    where: { id: admin.id },
    data: { name, title, bio, avatarUrl },
  });

  return NextResponse.json({ admin: { id: updated.id } });
}
