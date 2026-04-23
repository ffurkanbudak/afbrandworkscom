import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { calcTier } from '@/app/admin/_lib/tier';
import { resend, FROM_ADDRESS, SITE_URL } from '@/lib/email';
import { renderConfirmEmail } from '@/lib/email-templates';

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
  const body = await req.json();

  const existing = await db.subscriber.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'not-found' }, { status: 404 });

  if (body.action === 'approve') {
    if (existing.status === 'CONFIRMED') {
      return NextResponse.json({ ok: true, alreadyConfirmed: true });
    }
    const confirmToken = randomBytes(24).toString('hex');
    const now = new Date();
    const sub = await db.subscriber.update({
      where: { id },
      data: { status: 'CONFIRMED', confirmedAt: now, confirmToken },
    });
    const confirmUrl = `${SITE_URL}/api/subscribe/confirm?token=${confirmToken}`;
    const unsubscribeUrl = `${SITE_URL}/api/subscribe/unsubscribe?token=${existing.unsubscribeToken}`;
    const mail = renderConfirmEmail({ confirmUrl, unsubscribeUrl });
    await resend.emails
      .send({
        from: FROM_ADDRESS,
        to: existing.email,
        subject: mail.subject,
        html: mail.html,
        attachments: mail.attachments,
      })
      .catch(() => null);
    return NextResponse.json({ subscriber: sub });
  }

  const data: Record<string, unknown> = {};
  if (body.tier) data.tier = body.tier;
  if (typeof body.showInCommunity === 'boolean') data.showInCommunity = body.showInCommunity;
  if (typeof body.activityScoreDelta === 'number') {
    const newScore = Math.max(0, existing.activityScore + body.activityScoreDelta);
    data.activityScore = newScore;
    if (!body.tier) data.tier = calcTier(newScore);
  }

  const sub = await db.subscriber.update({ where: { id }, data });
  return NextResponse.json({ subscriber: sub });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const g = await guard();
  if ('error' in g) return NextResponse.json({ error: g.error }, { status: g.status });
  const { id } = await ctx.params;
  const existing = await db.subscriber.findUnique({ where: { id }, select: { id: true } });
  if (!existing) return NextResponse.json({ error: 'not-found' }, { status: 404 });
  await db.subscriber.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
