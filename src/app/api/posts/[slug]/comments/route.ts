import { NextResponse } from 'next/server';
import { getCurrentSubscriber } from '@/lib/subscriber';
import { db } from '@/lib/db';

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const post = await db.post.findUnique({ where: { slug }, select: { id: true } });
  if (!post) return NextResponse.json({ error: 'not-found' }, { status: 404 });

  const sub = await getCurrentSubscriber();
  const comments = await db.postComment.findMany({
    where: {
      postId: post.id,
      OR: [
        { status: 'APPROVED' },
        ...(sub ? [{ subscriberId: sub.id }] : []),
      ],
    },
    orderBy: { createdAt: 'desc' },
    include: {
      subscriber: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          name: true,
          avatarUrl: true,
          tier: true,
        },
      },
    },
    take: 80,
  });

  return NextResponse.json({
    comments: comments.map((c) => ({
      id: c.id,
      body: c.body,
      status: c.status,
      createdAt: c.createdAt,
      mine: sub?.id === c.subscriberId,
      author: c.subscriber,
    })),
  });
}

export async function POST(req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const sub = await getCurrentSubscriber();
  if (!sub) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { slug } = await ctx.params;
  const post = await db.post.findUnique({ where: { slug }, select: { id: true } });
  if (!post) return NextResponse.json({ error: 'not-found' }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const text = typeof body.body === 'string' ? body.body.trim() : '';
  if (text.length < 3) {
    return NextResponse.json({ error: 'Yorum çok kısa.' }, { status: 400 });
  }
  if (text.length > 2000) {
    return NextResponse.json({ error: 'Yorum 2000 karakteri aşamaz.' }, { status: 400 });
  }

  const comment = await db.postComment.create({
    data: {
      postId: post.id,
      subscriberId: sub.id,
      body: text,
      status: 'PENDING',
    },
  });

  await db.subscriber.update({
    where: { id: sub.id },
    data: {
      lastActiveAt: new Date(),
      activityScore: { increment: 3 },
    },
  });

  return NextResponse.json({ comment: { id: comment.id, status: comment.status } });
}
