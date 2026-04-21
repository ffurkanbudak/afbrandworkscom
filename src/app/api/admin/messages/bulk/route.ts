import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

const ACTIONS = ['mark-all-read', 'archive-all-unread', 'empty-archive'] as const;
type Action = (typeof ACTIONS)[number];

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const admin = await db.admin.findUnique({ where: { clerkId: userId } });
  if (!admin) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const { action } = (await req.json()) as { action?: Action };
  if (!action || !ACTIONS.includes(action)) {
    return NextResponse.json({ error: 'Geçersiz işlem.' }, { status: 400 });
  }

  const now = new Date();
  if (action === 'mark-all-read') {
    const r = await db.contactMessage.updateMany({
      where: { status: 'UNREAD' },
      data: { status: 'READ', readAt: now },
    });
    return NextResponse.json({ count: r.count });
  }
  if (action === 'archive-all-unread') {
    const r = await db.contactMessage.updateMany({
      where: { status: 'UNREAD' },
      data: { status: 'ARCHIVED', archivedAt: now, readAt: now },
    });
    return NextResponse.json({ count: r.count });
  }
  if (action === 'empty-archive') {
    const r = await db.contactMessage.deleteMany({ where: { status: 'ARCHIVED' } });
    return NextResponse.json({ count: r.count });
  }
  return NextResponse.json({ error: 'Bilinmeyen işlem.' }, { status: 400 });
}
