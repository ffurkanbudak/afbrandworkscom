import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { db } from '@/lib/db';
import { resend, FROM_ADDRESS, SITE_URL } from '@/lib/email';
import { renderConfirmEmail } from '@/lib/email-templates';

export async function POST(req: Request) {
  const { email, name, source } = await req.json().catch(() => ({}));

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Geçerli bir e-posta gerekli.' }, { status: 400 });
  }

  const confirmToken = randomBytes(24).toString('hex');

  const sub = await db.subscriber.upsert({
    where: { email },
    create: { email, name, source, confirmToken, status: 'PENDING' },
    update: { name: name ?? undefined, source: source ?? undefined, confirmToken },
  });

  const confirmUrl = `${SITE_URL}/api/subscribe/confirm?token=${confirmToken}`;
  const unsubscribeUrl = `${SITE_URL}/api/subscribe/unsubscribe?token=${sub.unsubscribeToken}`;

  const confirm = renderConfirmEmail({ confirmUrl, unsubscribeUrl });

  await resend.emails.send({
    from: FROM_ADDRESS,
    to: email,
    subject: confirm.subject,
    html: confirm.html,
    attachments: confirm.attachments,
  });

  return NextResponse.json({ ok: true });
}
