import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import type { Prisma } from '@prisma/client';
import { db } from '@/lib/db';
import { calcTier } from '@/app/admin/_lib/tier';

const COOKIE_NAME = 'sub_token';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const slug = typeof body.slug === 'string' ? body.slug.slice(0, 200) : null;
  if (!slug) return NextResponse.json({ ok: false }, { status: 400 });

  const post = await db.post.findUnique({
    where: { slug },
    select: { id: true, status: true },
  });
  if (!post || post.status !== 'PUBLISHED') {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  const h = await headers();
  const c = await cookies();
  const token = c.get(COOKIE_NAME)?.value ?? null;
  const country = h.get('x-vercel-ip-country') ?? null;
  const city = h.get('x-vercel-ip-city') ?? null;
  const referer = h.get('referer')?.slice(0, 400) ?? null;
  const userAgent = h.get('user-agent')?.slice(0, 240) ?? null;

  const subscriber = token
    ? await db.subscriber.findUnique({
        where: { unsubscribeToken: token },
        select: { id: true, activityScore: true, tier: true },
      })
    : null;

  const ops: Prisma.PrismaPromise<unknown>[] = [
    db.postView.create({
      data: {
        postId: post.id,
        subscriberId: subscriber?.id ?? null,
        country,
        city,
        referer,
        userAgent,
      },
    }),
    db.post.update({
      where: { id: post.id },
      data: { viewCount: { increment: 1 } },
    }),
  ];

  if (subscriber) {
    const nextScore = subscriber.activityScore + 1;
    const nextTier = calcTier(nextScore);
    ops.push(
      db.subscriber.update({
        where: { id: subscriber.id },
        data: {
          lastActiveAt: new Date(),
          activityScore: nextScore,
          ...(nextTier !== subscriber.tier ? { tier: nextTier } : {}),
        },
      })
    );
  }

  await db.$transaction(ops);

  return NextResponse.json({ ok: true });
}
