import { NextResponse } from 'next/server';
import { getCurrentSubscriber } from '@/lib/subscriber';
import { db } from '@/lib/db';

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const sub = await getCurrentSubscriber();
  if (!sub) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { id } = await ctx.params;

  const comment = await db.newsComment.findUnique({ where: { id } });
  if (!comment) return NextResponse.json({ error: 'not-found' }, { status: 404 });
  if (comment.subscriberId !== sub.id) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  await db.$transaction([
    db.newsComment.delete({ where: { id } }),
    ...(comment.status === 'APPROVED'
      ? [
          db.newsItem.update({
            where: { id: comment.newsItemId },
            data: { commentCount: { decrement: 1 } },
          }),
        ]
      : []),
  ]);

  return NextResponse.json({ ok: true });
}
