import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

function clean(v: unknown, max = 200): string | null {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  if (!t) return null;
  return t.slice(0, max);
}

export async function PATCH(req: Request, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;
  const sub = await db.subscriber.findUnique({ where: { unsubscribeToken: token } });
  if (!sub) return NextResponse.json({ error: 'not-found' }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const firstName = clean(body.firstName, 60);
  const lastName = clean(body.lastName, 60);
  const avatarUrl = clean(body.avatarUrl, 400);
  const bio = clean(body.bio, 280);
  const city = clean(body.city, 60);
  let country = clean(body.country, 2);
  if (country) country = country.toUpperCase();

  if (!firstName) {
    return NextResponse.json({ error: 'Ad zorunlu.' }, { status: 400 });
  }
  if (avatarUrl && !/^https?:\/\//i.test(avatarUrl)) {
    return NextResponse.json({ error: 'Fotoğraf bağlantısı geçersiz.' }, { status: 400 });
  }

  const composedName = [firstName, lastName].filter(Boolean).join(' ');

  await db.subscriber.update({
    where: { id: sub.id },
    data: {
      firstName,
      lastName,
      name: composedName || firstName,
      avatarUrl,
      bio,
      city,
      country,
      showInCommunity:
        typeof body.showInCommunity === 'boolean' ? body.showInCommunity : sub.showInCommunity,
      lastActiveAt: new Date(),
    },
  });

  return NextResponse.json({ ok: true });
}
