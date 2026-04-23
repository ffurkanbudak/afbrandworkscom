import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const VALID_PLANS = ['ORTAK', 'MIMARI'] as const;
type WaitlistPlan = (typeof VALID_PLANS)[number];

export async function POST(req: Request) {
  const { email, plan, source } = await req.json().catch(() => ({}));

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Geçerli bir e-posta gerekli.' }, { status: 400 });
  }

  if (!VALID_PLANS.includes(plan)) {
    return NextResponse.json({ error: 'Geçersiz paket.' }, { status: 400 });
  }

  await db.waitlistEntry.upsert({
    where: { email_plan: { email, plan: plan as WaitlistPlan } },
    create: { email, plan: plan as WaitlistPlan, source: source ?? 'uyelik' },
    update: { source: source ?? undefined },
  });

  return NextResponse.json({ ok: true });
}
