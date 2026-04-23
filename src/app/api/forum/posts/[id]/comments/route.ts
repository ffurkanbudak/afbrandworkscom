import { NextResponse } from 'next/server';
import { getCurrentSubscriber } from '@/lib/subscriber';
import { db } from '@/lib/db';
import { canReplyToPlan } from '@/lib/plan';
import { computePublishAt, isProfileComplete } from '@/lib/forum-guard';
import { scanContent, BLOCK_USER_MESSAGE } from '@/lib/forum-moderation';

const MIN_BODY = 5;
const MAX_BODY = 3000;

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const viewer = await getCurrentSubscriber();

  const post = await db.forumPost.findUnique({
    where: { id },
    select: { id: true, status: true, publishAt: true, authorId: true },
  });
  if (!post) return NextResponse.json({ error: 'not-found' }, { status: 404 });

  const now = new Date();
  const isAuthor = viewer?.id === post.authorId;
  const isLive = post.status === 'PUBLISHED' && post.publishAt <= now;
  if (!isLive && !isAuthor) {
    return NextResponse.json({ error: 'not-found' }, { status: 404 });
  }

  const comments = await db.forumComment.findMany({
    where: {
      postId: post.id,
      status: 'PUBLISHED',
      OR: [
        { publishAt: { lte: now } },
        ...(viewer ? [{ authorId: viewer.id }] : []),
      ],
    },
    orderBy: { createdAt: 'asc' },
    take: 200,
    include: {
      author: {
        select: {
          id: true,
          firstName: true,
          name: true,
          avatarUrl: true,
          plan: true,
        },
      },
    },
  });

  return NextResponse.json({
    viewerPlan: viewer?.plan ?? null,
    comments: comments.map((c) => ({
      id: c.id,
      body: c.body,
      parentId: c.parentId,
      createdAt: c.createdAt,
      publishAt: c.publishAt,
      mine: viewer?.id === c.authorId,
      author: c.author,
    })),
  });
}

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const viewer = await getCurrentSubscriber();
  if (!viewer) {
    return NextResponse.json({ error: 'Önce giriş yapın.' }, { status: 401 });
  }
  if (viewer.status !== 'CONFIRMED') {
    return NextResponse.json(
      { error: 'Aboneliğiniz onaylanana kadar yanıt veremezsiniz.' },
      { status: 403 },
    );
  }
  if (!isProfileComplete(viewer)) {
    return NextResponse.json(
      { error: 'Yanıt vermek için profil fotoğrafı ve tanıtım metni gerekli.' },
      { status: 403 },
    );
  }

  const { id } = await ctx.params;
  const post = await db.forumPost.findUnique({
    where: { id },
    select: { id: true, status: true, publishAt: true },
  });
  if (!post || post.status !== 'PUBLISHED' || post.publishAt > new Date()) {
    return NextResponse.json({ error: 'Konu yayında değil.' }, { status: 404 });
  }

  const body = await req.json().catch(() => ({}));
  const text = typeof body.body === 'string' ? body.body.trim() : '';
  const parentId = typeof body.parentId === 'string' && body.parentId ? body.parentId : null;

  if (text.length < MIN_BODY) {
    return NextResponse.json({ error: `Yanıt en az ${MIN_BODY} karakter olmalı.` }, { status: 400 });
  }
  if (text.length > MAX_BODY) {
    return NextResponse.json({ error: `Yanıt ${MAX_BODY} karakteri aşamaz.` }, { status: 400 });
  }

  if (parentId) {
    const parent = await db.forumComment.findUnique({
      where: { id: parentId },
      select: {
        postId: true,
        author: { select: { plan: true } },
      },
    });
    if (!parent || parent.postId !== post.id) {
      return NextResponse.json({ error: 'Yanıtlanacak yorum bulunamadı.' }, { status: 404 });
    }
    if (!canReplyToPlan(viewer.plan, parent.author.plan)) {
      return NextResponse.json(
        { error: 'Bu yoruma yanıt verme hakkınız yok.' },
        { status: 403 },
      );
    }
  }

  const scan = scanContent(text);
  if (scan.status === 'BLOCKED') {
    return NextResponse.json({ error: BLOCK_USER_MESSAGE }, { status: 400 });
  }

  const comment = await db.forumComment.create({
    data: {
      postId: post.id,
      authorId: viewer.id,
      parentId,
      body: text,
      publishAt: computePublishAt(),
      status: 'PUBLISHED',
    },
  });

  await db.forumPost.update({
    where: { id: post.id },
    data: { replyCount: { increment: 1 } },
  });

  if (scan.status === 'FLAGGED') {
    await db.forumFlag.create({
      data: {
        commentId: comment.id,
        reason: `Otomatik uyarı: ${scan.terms.join(', ')}`,
      },
    });
  }

  await db.subscriber.update({
    where: { id: viewer.id },
    data: { lastActiveAt: new Date(), activityScore: { increment: 2 } },
  });

  return NextResponse.json({
    comment: { id: comment.id, publishAt: comment.publishAt },
  });
}
