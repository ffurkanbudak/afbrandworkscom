import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { generateGiftCode, defaultExpiry } from '@/lib/gift-code';

async function guard() {
  const { userId } = await auth();
  if (!userId) return { error: 'unauthorized', status: 401 as const };
  const admin = await db.admin.findUnique({ where: { clerkId: userId } });
  if (!admin) return { error: 'forbidden', status: 403 as const };
  return { admin };
}

export async function GET() {
  const g = await guard();
  if ('error' in g) return NextResponse.json({ error: g.error }, { status: g.status });
  const codes = await db.giftCode.findMany({
    orderBy: [{ createdAt: 'desc' }],
    take: 500,
    include: {
      redeemedBy: { select: { id: true, email: true, name: true, firstName: true } },
    },
  });
  return NextResponse.json({ codes });
}

export async function POST(req: Request) {
  const g = await guard();
  if ('error' in g) return NextResponse.json({ error: g.error }, { status: g.status });
  const body = await req.json().catch(() => ({}));
  const plan = body.plan === 'MIMARI' ? 'MIMARI' : body.plan === 'ORTAK' ? 'ORTAK' : null;
  if (!plan) {
    return NextResponse.json({ error: 'Paket ORTAK veya MIMARI olmalı.' }, { status: 400 });
  }

  const senderName = typeof body.senderName === 'string' ? body.senderName.trim() || null : null;
  const senderEmail = typeof body.senderEmail === 'string' ? body.senderEmail.trim() || null : null;
  const recipientEmail = typeof body.recipientEmail === 'string' ? body.recipientEmail.trim() || null : null;
  const note = typeof body.note === 'string' ? body.note.trim() || null : null;

  let code = generateGiftCode();
  for (let i = 0; i < 5; i++) {
    const exists = await db.giftCode.findUnique({ where: { code } });
    if (!exists) break;
    code = generateGiftCode();
  }

  const gift = await db.giftCode.create({
    data: {
      code,
      plan,
      status: 'ACTIVE',
      senderName,
      senderEmail,
      recipientEmail,
      note,
      expiresAt: defaultExpiry(),
    },
  });

  return NextResponse.json({ giftCode: gift });
}
