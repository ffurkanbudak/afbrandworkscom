import { NextResponse } from 'next/server';
import { getCurrentSubscriber } from '@/lib/subscriber';
import { db } from '@/lib/db';

export async function POST(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const sub = await getCurrentSubscriber();
  if (!sub) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { slug } = await ctx.params;

  const post = await db.post.findUnique({ where: { slug }, select: { id: true } });
  if (!post) return NextResponse.json({ error: 'not-found' }, { status: 404 });

  const existing = await db.postLike.findUnique({
    where: { postId_subscriberId: { postId: post.id, subscriberId: sub.id } },
  });

  if (existing) {
    await db.$transaction([
      db.postLike.delete({ where: { id: existing.id } }),
      db.post.update({
        where: { id: post.id },
        data: { likeCount: { decrement: 1 } },
      }),
    ]);
    return NextResponse.json({ liked: false });
  }

  await db.$transaction([
    db.postLike.create({ data: { postId: post.id, subscriberId: sub.id } }),
    db.post.update({
      where: { id: post.id },
      data: { likeCount: { increment: 1 } },
    }),
    db.subscriber.update({
      where: { id: sub.id },
      data: {
        lastActiveAt: new Date(),
        activityScore: { increment: 2 },
      },
    }),
  ]);

  return NextResponse.json({ liked: true });
}
