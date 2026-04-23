import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import type { MembershipPlan } from '@prisma/client';
import { db } from '@/lib/db';
import { resend, FROM_ADDRESS, SITE_URL } from '@/lib/email';
import { renderAnnouncementEmail } from '@/lib/email-templates';
import { getRecentPostsForEmail } from '@/lib/email-recent-posts';

const KINDS = ['video', 'podcast', 'mail', 'etkinlik', 'yazi', 'duyuru'] as const;
type Kind = (typeof KINDS)[number];
const VALID_PLANS = ['GOZLEMCI', 'ORTAK', 'MIMARI'] as const satisfies readonly MembershipPlan[];

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const admin = await db.admin.findUnique({ where: { clerkId: userId } });
  if (!admin) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const body = await req.json();
  const kind = (body.kind ?? 'duyuru') as Kind;
  const title = String(body.title ?? '').trim();
  const intro = String(body.intro ?? '').trim();
  const previewText = body.previewText ? String(body.previewText).trim() : null;
  const ctaLabel = body.ctaLabel ? String(body.ctaLabel).trim() : null;
  const ctaUrl = body.ctaUrl ? String(body.ctaUrl).trim() : null;

  if (!KINDS.includes(kind)) {
    return NextResponse.json({ error: 'Geçersiz tür.' }, { status: 400 });
  }
  if (!title || !intro) {
    return NextResponse.json({ error: 'Başlık ve açıklama gerekli.' }, { status: 400 });
  }

  const rawTargetPlans = Array.isArray(body.targetPlans) ? body.targetPlans : [];
  const targetPlans: MembershipPlan[] = rawTargetPlans.filter(
    (p: unknown): p is MembershipPlan =>
      typeof p === 'string' && (VALID_PLANS as readonly string[]).includes(p),
  );
  const targetAll = targetPlans.length === 0 || targetPlans.length === VALID_PLANS.length;

  const recentPosts = await getRecentPostsForEmail().catch(() => []);

  const sampleHtml = renderAnnouncementEmail({
    kind,
    title,
    intro,
    ctaLabel,
    ctaUrl,
    previewText: previewText ?? undefined,
    unsubscribeUrl: `${SITE_URL}/api/subscribe/unsubscribe?token=PLACEHOLDER`,
    recentPosts,
  }).html;

  const broadcast = await db.broadcast.create({
    data: {
      subject: title,
      previewText,
      bodyHtml: sampleHtml,
      bodyJson: { kind, title, intro, ctaLabel, ctaUrl, previewText },
      status: 'SENDING',
      authorId: admin.id,
      targetPlans: targetAll ? [] : targetPlans,
    },
  });

  const subscribers = await db.subscriber.findMany({
    where: {
      status: 'CONFIRMED',
      ...(targetAll ? {} : { plan: { in: targetPlans } }),
    },
  });
  const BATCH = 80;
  for (let i = 0; i < subscribers.length; i += BATCH) {
    const chunk = subscribers.slice(i, i + BATCH);
    await resend.batch.send(
      chunk.map((s) => {
        const rendered = renderAnnouncementEmail({
          kind,
          title,
          intro,
          ctaLabel,
          ctaUrl,
          previewText: previewText ?? undefined,
          unsubscribeUrl: `${SITE_URL}/api/subscribe/unsubscribe?token=${s.unsubscribeToken}`,
          recentPosts,
        });
        return {
          from: FROM_ADDRESS,
          to: s.email,
          subject: rendered.subject,
          html: rendered.html,
          attachments: rendered.attachments,
        };
      }),
    );
  }

  await db.broadcast.update({
    where: { id: broadcast.id },
    data: { status: 'SENT', sentAt: new Date() },
  });

  return NextResponse.json({ ok: true, broadcastId: broadcast.id, sent: subscribers.length });
}
