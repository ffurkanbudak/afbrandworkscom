import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resend, FROM_ADDRESS } from '@/lib/email';
import { renderAutoReplyEmail } from '@/lib/email-templates';
import { getRecentPostsForEmail } from '@/lib/email-recent-posts';

export async function POST(req: Request) {
  const { name, email, topic, message } = await req.json();
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Eksik alan.' }, { status: 400 });
  }
  const saved = await db.contactMessage.create({ data: { name, email, topic, message } });

  if (process.env.OWNER_EMAIL) {
    await resend.emails
      .send({
        from: FROM_ADDRESS,
        to: process.env.OWNER_EMAIL,
        replyTo: email,
        subject: `[İletişim] ${topic ?? 'Yeni mesaj'} · ${name}`,
        text: `${name} <${email}>\nKonu: ${topic ?? '-'}\n\n${message}`,
      })
      .catch(() => null);
  }

  const firstName = String(name).split(' ')[0] || null;
  const recentPosts = await getRecentPostsForEmail().catch(() => []);
  const reply = renderAutoReplyEmail({ kind: 'contact', firstName, recentPosts });
  await resend.emails
    .send({
      from: FROM_ADDRESS,
      to: email,
      subject: reply.subject,
      html: reply.html,
      attachments: reply.attachments,
    })
    .catch(() => null);

  return NextResponse.json({ ok: true, id: saved.id });
}
