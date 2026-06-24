import { NextResponse } from 'next/server';
import { auth } from '@/lib/admin-auth';
import { db } from '@/lib/db';

const ALLOWED = ['UNREAD', 'READ', 'ARCHIVED'] as const;

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const admin = await db.admin.findUnique({ where: { clerkId: userId } });
  if (!admin) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const { id } = await ctx.params;
  const { status } = await req.json();
  if (!ALLOWED.includes(status)) {
    return NextResponse.json({ error: 'Geçersiz durum.' }, { status: 400 });
  }

  const m = await db.contactMessage.update({
    where: { id },
    data: {
      status,
      ...(status === 'READ' ? { readAt: new Date() } : {}),
      ...(status === 'ARCHIVED' ? { archivedAt: new Date() } : {}),
      ...(status === 'UNREAD' ? { readAt: null, archivedAt: null } : {}),
    },
  });
  return NextResponse.json({ message: m });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const admin = await db.admin.findUnique({ where: { clerkId: userId } });
  if (!admin) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const { id } = await ctx.params;
  await db.contactMessage.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
