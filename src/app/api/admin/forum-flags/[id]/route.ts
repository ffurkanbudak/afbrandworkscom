import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

async function guard() {
  const { userId } = await auth();
  if (!userId) return { error: 'unauthorized', status: 401 as const };
  const admin = await db.admin.findUnique({ where: { clerkId: userId } });
  if (!admin) return { error: 'forbidden', status: 403 as const };
  return { admin };
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const g = await guard();
  if ('error' in g) return NextResponse.json({ error: g.error }, { status: g.status });
  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));

  const flag = await db.forumFlag.findUnique({ where: { id } });
  if (!flag) return NextResponse.json({ error: 'not-found' }, { status: 404 });

  if (body.action === 'hide') {
    if (flag.postId) {
      await db.forumPost.update({
        where: { id: flag.postId },
        data: { status: 'HIDDEN' },
      });
    } else if (flag.commentId) {
      await db.forumComment.update({
        where: { id: flag.commentId },
        data: { status: 'HIDDEN' },
      });
    }
    const updated = await db.forumFlag.update({
      where: { id },
      data: { resolved: true },
    });
    return NextResponse.json({ flag: updated });
  }

  if (body.action === 'resolve') {
    const updated = await db.forumFlag.update({
      where: { id },
      data: { resolved: true },
    });
    return NextResponse.json({ flag: updated });
  }

  return NextResponse.json({ error: 'unknown-action' }, { status: 400 });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const g = await guard();
  if ('error' in g) return NextResponse.json({ error: g.error }, { status: g.status });
  const { id } = await ctx.params;
  await db.forumFlag.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
