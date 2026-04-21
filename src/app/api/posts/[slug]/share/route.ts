import { NextResponse } from 'next/server';
import { getCurrentSubscriber } from '@/lib/subscriber';
import { db } from '@/lib/db';

export async function POST(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const post = await db.post.findUnique({ where: { slug }, select: { id: true } });
  if (!post) return NextResponse.json({ error: 'not-found' }, { status: 404 });

  await db.post.update({
    where: { id: post.id },
    data: { shareCount: { increment: 1 } },
  });

  const sub = await getCurrentSubscriber();
  if (sub) {
    await db.subscriber.update({
      where: { id: sub.id },
      data: {
        lastActiveAt: new Date(),
        activityScore: { increment: 1 },
      },
    });
  }

  return NextResponse.json({ ok: true });
}
