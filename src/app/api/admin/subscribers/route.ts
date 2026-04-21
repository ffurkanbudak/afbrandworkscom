import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const url = new URL(req.url);
  const status = url.searchParams.get('status') as any;
  const subs = await db.subscriber.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: 'desc' },
    take: 1000,
  });
  return NextResponse.json({
    subscribers: subs,
    total: subs.length,
    confirmed: subs.filter((s) => s.status === 'CONFIRMED').length,
  });
}
