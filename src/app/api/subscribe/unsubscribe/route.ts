import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  if (!token) return NextResponse.redirect(new URL('/?unsubscribe=invalid', url));
  const sub = await db.subscriber.findUnique({ where: { unsubscribeToken: token } });
  if (!sub) return NextResponse.redirect(new URL('/?unsubscribe=invalid', url));
  await db.subscriber.update({
    where: { id: sub.id },
    data: { status: 'UNSUBSCRIBED', unsubscribedAt: new Date() },
  });
  return NextResponse.redirect(new URL('/?unsubscribe=ok', url));
}
