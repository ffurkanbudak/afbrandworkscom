import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { Prisma } from '@prisma/client';
import { db } from '@/lib/db';

const ALLOWED = ['PENDING', 'APPROVED', 'HIDDEN'] as const;
type Status = (typeof ALLOWED)[number];

async function requireAdminId() {
  const { userId } = await auth();
  if (!userId) return null;
  const admin = await db.admin.findUnique({ where: { clerkId: userId } });
  return admin?.id ?? null;
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const adminId = await requireAdminId();
  if (!adminId) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const { id } = await ctx.params;
  const { status } = (await req.json()) as { status?: string };
  if (!status || !ALLOWED.includes(status as Status)) {
    return NextResponse.json({ error: 'Geçersiz durum.' }, { status: 400 });
  }

  const existing = await db.postComment.findUnique({ where: { id }, select: { postId: true, status: true } });
  if (!existing) return NextResponse.json({ error: 'Yorum bulunamadı.' }, { status: 404 });

  const from = existing.status;
  const to = status as Status;

  const delta = (from === 'APPROVED' ? -1 : 0) + (to === 'APPROVED' ? 1 : 0);

  const ops: Prisma.PrismaPromise<unknown>[] = [
    db.postComment.update({ where: { id }, data: { status: to } }),
  ];
  if (delta !== 0) {
    ops.push(
      db.post.update({
        where: { id: existing.postId },
        data: { commentCount: { increment: delta } },
      })
    );
  }
  await db.$transaction(ops);
  return NextResponse.json({ ok: true, status: to });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const adminId = await requireAdminId();
  if (!adminId) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const { id } = await ctx.params;
  const existing = await db.postComment.findUnique({ where: { id }, select: { postId: true, status: true } });
  if (!existing) return NextResponse.json({ ok: true });

  const ops: Prisma.PrismaPromise<unknown>[] = [db.postComment.delete({ where: { id } })];
  if (existing.status === 'APPROVED') {
    ops.push(
      db.post.update({
        where: { id: existing.postId },
        data: { commentCount: { decrement: 1 } },
      })
    );
  }
  await db.$transaction(ops);
  return NextResponse.json({ ok: true });
}
