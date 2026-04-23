import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const VALID_PLANS = ['ORTAK', 'MIMARI'] as const;
type Plan = (typeof VALID_PLANS)[number];

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  const senderName = typeof body.senderName === 'string' ? body.senderName.trim() : '';
  const senderEmail = typeof body.senderEmail === 'string' ? body.senderEmail.trim() : '';
  const senderPhone = typeof body.senderPhone === 'string' ? body.senderPhone.trim() || null : null;
  const recipientName = typeof body.recipientName === 'string' ? body.recipientName.trim() || null : null;
  const recipientEmail = typeof body.recipientEmail === 'string' ? body.recipientEmail.trim() || null : null;
  const note = typeof body.note === 'string' ? body.note.trim() || null : null;
  const plan: Plan | null = VALID_PLANS.includes(body.plan) ? body.plan : null;

  if (!senderName) {
    return NextResponse.json({ error: 'İsim gerekli.' }, { status: 400 });
  }
  if (!senderEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) {
    return NextResponse.json({ error: 'Geçerli bir e-posta gerekli.' }, { status: 400 });
  }
  if (!plan) {
    return NextResponse.json({ error: 'Paket ORTAK veya MIMARI olmalı.' }, { status: 400 });
  }
  if (recipientEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
    return NextResponse.json({ error: 'Alıcı e-postası geçersiz.' }, { status: 400 });
  }

  await db.giftRequest.create({
    data: {
      senderName,
      senderEmail,
      senderPhone,
      recipientName,
      recipientEmail,
      plan,
      note,
      status: 'PENDING',
    },
  });

  return NextResponse.json({ ok: true });
}
