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
  const { company, name, email, phone, website, budgetRange, goals, timeline } = body ?? {};
  if (!company || !name || !email || !goals) {
    return NextResponse.json({ error: 'Zorunlu alanlar eksik.' }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: 'Geçerli bir e-posta gerekli.' }, { status: 400 });
  }

  const app = await db.sponsorshipRequest.create({
    data: {
      company: String(company).slice(0, 160),
      name: String(name).slice(0, 160),
      email: String(email).slice(0, 200),
      phone: phone ? String(phone).slice(0, 60) : null,
      website: website ? String(website).slice(0, 300) : null,
      budgetRange: budgetRange ? String(budgetRange).slice(0, 120) : null,
      goals: String(goals).slice(0, 4000),
      timeline: timeline ? String(timeline).slice(0, 240) : null,
    },
  });

  if (process.env.OWNER_EMAIL) {
    await resend.emails
      .send({
        from: FROM_ADDRESS,
        to: process.env.OWNER_EMAIL,
        replyTo: email,
        subject: `[Sponsorluk talebi] ${company} · ${name}`,
        text: `${company}\n${name} <${email}>${phone ? ` · ${phone}` : ''}\nWeb: ${website ?? '-'}\nBütçe: ${budgetRange ?? '-'}\nTakvim: ${timeline ?? '-'}\n\n${goals}`,
      })
      .catch(() => null);
  }

  const firstName = String(name).split(' ')[0] || null;
  const recentPosts = await getRecentPostsForEmail().catch(() => []);
  const reply = renderAutoReplyEmail({ kind: 'sponsorship', firstName, recentPosts });
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
