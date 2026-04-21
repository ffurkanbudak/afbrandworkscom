import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resend, FROM_ADDRESS } from '@/lib/email';
import { renderAutoReplyEmail } from '@/lib/email-templates';
import { getRecentPostsForEmail } from '@/lib/email-recent-posts';

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { name, email, phone, linkedinUrl, proposedTitle, pitch, sampleUrl, topics } = body ?? {};

  if (!name || !email || !proposedTitle || !pitch) {
    return NextResponse.json({ error: 'Zorunlu alanlar eksik.' }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: 'Geçerli bir e-posta gerekli.' }, { status: 400 });
  }

  const app = await db.writerApplication.create({
    data: {
      name: String(name).slice(0, 160),
      email: String(email).slice(0, 200),
      phone: phone ? String(phone).slice(0, 60) : null,
      linkedinUrl: linkedinUrl ? String(linkedinUrl).slice(0, 300) : null,
      proposedTitle: String(proposedTitle).slice(0, 240),
      pitch: String(pitch).slice(0, 6000),
      sampleUrl: sampleUrl ? String(sampleUrl).slice(0, 300) : null,
      topics: topics ? String(topics).slice(0, 240) : null,
    },
  });

  if (process.env.OWNER_EMAIL) {
    await resend.emails
      .send({
        from: FROM_ADDRESS,
        to: process.env.OWNER_EMAIL,
        replyTo: email,
        subject: `[Yazar başvurusu] ${proposedTitle} · ${name}`,
        text: `${name} <${email}>\n\nBaşlık: ${proposedTitle}\nKonular: ${topics ?? '-'}\n\n${pitch}\n\nÖrnek: ${sampleUrl ?? '-'}`,
      })
      .catch(() => null);
  }

  const firstName = String(name).split(' ')[0] || null;
  const recentPosts = await getRecentPostsForEmail().catch(() => []);
  const reply = renderAutoReplyEmail({ kind: 'application', firstName, recentPosts });
  await resend.emails
    .send({
      from: FROM_ADDRESS,
      to: email,
      subject: reply.subject,
      html: reply.html,
      attachments: reply.attachments,
    })
    .catch(() => null);

  return NextResponse.json({ ok: true, id: app.id });
}
