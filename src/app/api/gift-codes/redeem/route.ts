import { NextResponse } from 'next/server';
import { getCurrentSubscriber } from '@/lib/subscriber';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  const sub = await getCurrentSubscriber();
  if (!sub) {
    return NextResponse.json({ error: 'Önce üye girişi yapın.' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const code = typeof body.code === 'string' ? body.code.trim().toUpperCase() : '';
  if (!code) {
    return NextResponse.json({ error: 'Hediye kodu gerekli.' }, { status: 400 });
  }

  const gift = await db.giftCode.findUnique({ where: { code } });
  if (!gift) {
    return NextResponse.json({ error: 'Kod bulunamadı.' }, { status: 404 });
  }

  if (gift.status === 'REDEEMED') {
    return NextResponse.json({ error: 'Bu kod daha önce kullanılmış.' }, { status: 400 });
  }
  if (gift.status === 'REVOKED') {
    return NextResponse.json({ error: 'Bu kod iptal edilmiş.' }, { status: 400 });
  }
  if (gift.expiresAt < new Date()) {
    await db.giftCode.update({
      where: { id: gift.id },
      data: { status: 'EXPIRED' },
    });
    return NextResponse.json({ error: 'Bu kodun süresi dolmuş.' }, { status: 400 });
  }

  const planRank = { GOZLEMCI: 1, ORTAK: 2, MIMARI: 3 } as const;
  if (planRank[sub.plan] >= planRank[gift.plan]) {
    return NextResponse.json(
      { error: `Paketiniz zaten ${sub.plan === gift.plan ? 'aynı seviyede' : 'daha yüksek'}.` },
      { status: 400 },
    );
  }

  const now = new Date();
  const [updatedGift] = await db.$transaction([
    db.giftCode.update({
      where: { id: gift.id },
      data: {
        status: 'REDEEMED',
        redeemedById: sub.id,
        redeemedAt: now,
      },
    }),
    db.subscriber.update({
      where: { id: sub.id },
      data: { plan: gift.plan, lastActiveAt: now },
    }),
  ]);

  return NextResponse.json({
    ok: true,
    plan: updatedGift.plan,
  });
}
