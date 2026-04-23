import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  const { email, name, source } = await req.json().catch(() => ({}));

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Geçerli bir e-posta gerekli.' }, { status: 400 });
  }

  await db.subscriber.upsert({
    where: { email },
    create: { email, name, source, status: 'PENDING' },
    update: { name: name ?? undefined, source: source ?? undefined },
  });

  return NextResponse.json({ ok: true, pending: true });
}
