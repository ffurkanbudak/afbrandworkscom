import { NextResponse } from 'next/server';
import { getCurrentSubscriber } from '@/lib/subscriber';
import { db } from '@/lib/db';

function clean(v: unknown, max = 400): string | null {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  if (!t) return null;
  return t.slice(0, max);
}

export async function POST(req: Request) {
  const sub = await getCurrentSubscriber();
  if (!sub) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const name = clean(body.name, 120) ?? sub.name ?? sub.firstName ?? 'Abone';
  const email = clean(body.email, 200) ?? sub.email;
  const topic = clean(body.topic, 200);
  const message = clean(body.message, 4000);

  if (!message) {
    return NextResponse.json({ error: 'Mesaj boş olamaz.' }, { status: 400 });
  }

  await db.contactMessage.create({
    data: { name, email, topic, message },
  });

  await db.subscriber.update({
    where: { id: sub.id },
    data: {
      lastActiveAt: new Date(),
      activityScore: { increment: 3 },
    },
  });

  return NextResponse.json({ ok: true });
}
