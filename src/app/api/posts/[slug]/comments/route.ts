import { NextResponse } from 'next/server';
import { getCurrentSubscriber } from '@/lib/subscriber';
import { db } from '@/lib/db';
import { canReplyToPlan } from '@/lib/plan';

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
    orderBy: { createdAt: 'asc' },
    include: {
      subscriber: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          name: true,
          avatarUrl: true,
          tier: true,
          plan: true,
        },
      },
    },
    take: 200,
  });

  return NextResponse.json({
    viewerPlan: sub?.plan ?? null,
    comments: comments.map((c) => ({
      id: c.id,
      body: c.body,
      status: c.status,
      parentId: c.parentId,
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
  const parentId = typeof body.parentId === 'string' && body.parentId ? body.parentId : null;
  if (text.length < 3) {
    return NextResponse.json({ error: 'Yorum çok kısa.' }, { status: 400 });
  }
  if (text.length > 2000) {
    return NextResponse.json({ error: 'Yorum 2000 karakteri aşamaz.' }, { status: 400 });
  }

  if (parentId) {
    const parent = await db.postComment.findUnique({
      where: { id: parentId },
      select: {
        postId: true,
        subscriber: { select: { plan: true } },
      },
    });
    if (!parent || parent.postId !== post.id) {
      return NextResponse.json({ error: 'Yanıtlanacak yorum bulunamadı.' }, { status: 404 });
    }
    if (!canReplyToPlan(sub.plan, parent.subscriber.plan)) {
      return NextResponse.json(
        { error: 'Bu yoruma yanıt verme hakkınız yok.' },
        { status: 403 },
      );
    }
  }

  const comment = await db.postComment.create({
    data: {
      postId: post.id,
      subscriberId: sub.id,
      parentId,
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
