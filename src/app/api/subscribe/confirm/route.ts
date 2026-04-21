import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resend, FROM_ADDRESS, SITE_URL } from '@/lib/email';
import { renderWelcomeEmail } from '@/lib/email-templates';
import { getRecentPostsForEmail } from '@/lib/email-recent-posts';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  if (!token) return NextResponse.redirect(new URL('/?subscribe=invalid', url));
  const sub = await db.subscriber.findUnique({ where: { confirmToken: token } });
  if (!sub) return NextResponse.redirect(new URL('/?subscribe=invalid', url));
  const wasPending = sub.status !== 'CONFIRMED';
  const now = new Date();
  await db.subscriber.update({
    where: { id: sub.id },
    data: {
      status: 'CONFIRMED',
      confirmedAt: now,
      confirmToken: null,
      lastActiveAt: now,
    },
  });

  if (wasPending) {
    const unsubscribeUrl = `${SITE_URL}/api/subscribe/unsubscribe?token=${sub.unsubscribeToken}`;
    const firstName = (sub.name ?? '').split(' ')[0] || null;
    const recentPosts = await getRecentPostsForEmail().catch(() => []);
    const welcome = renderWelcomeEmail({ firstName, unsubscribeUrl, recentPosts });
    await resend.emails
      .send({
        from: FROM_ADDRESS,
        to: sub.email,
        subject: welcome.subject,
        html: welcome.html,
        attachments: welcome.attachments,
      })
      .catch(() => null);
  }

  const res = NextResponse.redirect(new URL('/?subscribe=ok', url));
  res.cookies.set('sub_token', sub.unsubscribeToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 365 * 2,
  });
  return res;
}
