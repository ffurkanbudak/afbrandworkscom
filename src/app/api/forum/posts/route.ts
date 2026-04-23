import { NextResponse } from 'next/server';
import { getCurrentSubscriber } from '@/lib/subscriber';
import { db } from '@/lib/db';
import { computePublishAt, isProfileComplete } from '@/lib/forum-guard';

const MIN_TITLE = 8;
const MAX_TITLE = 180;
const MIN_BODY = 40;
const MAX_BODY = 6000;

export async function POST(req: Request) {
  const sub = await getCurrentSubscriber();
  if (!sub) {
    return NextResponse.json({ error: 'Önce giriş yapın.' }, { status: 401 });
  }
  if (sub.status !== 'CONFIRMED') {
    return NextResponse.json(
      { error: 'Aboneliğiniz onaylanana kadar konu açamazsınız.' },
      { status: 403 },
    );
  }
  if (!isProfileComplete(sub)) {
    return NextResponse.json(
      { error: 'Konu açmak için profil fotoğrafı ve tanıtım metni gerekli.' },
      { status: 403 },
    );
  }

  const body = await req.json().catch(() => ({}));
  const title = typeof body.title === 'string' ? body.title.trim() : '';
  const content = typeof body.body === 'string' ? body.body.trim() : '';
  const tagSlug = typeof body.tagSlug === 'string' ? body.tagSlug : '';

  if (title.length < MIN_TITLE) {
    return NextResponse.json({ error: `Başlık en az ${MIN_TITLE} karakter olmalı.` }, { status: 400 });
  }
  if (title.length > MAX_TITLE) {
    return NextResponse.json({ error: `Başlık ${MAX_TITLE} karakteri aşamaz.` }, { status: 400 });
  }
  if (content.length < MIN_BODY) {
    return NextResponse.json(
      { error: `İçerik en az ${MIN_BODY} karakter olmalı.` },
      { status: 400 },
    );
  }
  if (content.length > MAX_BODY) {
    return NextResponse.json(
      { error: `İçerik ${MAX_BODY} karakteri aşamaz.` },
      { status: 400 },
    );
  }

  const tag = await db.forumTag.findUnique({ where: { slug: tagSlug } });
  if (!tag) {
    return NextResponse.json({ error: 'Geçersiz etiket.' }, { status: 400 });
  }

  const publishAt = computePublishAt();

  const post = await db.forumPost.create({
    data: {
      authorId: sub.id,
      tagId: tag.id,
      title,
      body: content,
      publishAt,
      status: 'PUBLISHED',
    },
  });

  await db.subscriber.update({
    where: { id: sub.id },
    data: { lastActiveAt: new Date(), activityScore: { increment: 5 } },
  });

  return NextResponse.json({ post: { id: post.id, publishAt: post.publishAt } });
}
