import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { splitName } from '@/app/admin/_lib/names';

export const revalidate = 120;

function mask(last: string): string {
  const cleaned = last.trim();
  if (!cleaned) return '';
  return cleaned[0].toUpperCase() + '***';
}

export async function GET() {
  const subs = await db.subscriber.findMany({
    where: {
      status: 'CONFIRMED',
      showInCommunity: true,
      confirmedAt: { not: null },
      OR: [{ firstName: { not: null } }, { name: { not: null } }],
    },
    orderBy: { confirmedAt: 'desc' },
    take: 20,
    select: {
      firstName: true,
      lastName: true,
      name: true,
      avatarUrl: true,
      city: true,
      confirmedAt: true,
    },
  });

  const items = subs
    .map((s) => {
      const first = (s.firstName ?? splitName(s.name).first ?? '').trim();
      const last = (s.lastName ?? splitName(s.name).last ?? '').trim();
      if (!first) return null;
      return {
        first,
        lastMasked: mask(last),
        avatarUrl: s.avatarUrl,
        city: s.city,
        confirmedAt: s.confirmedAt,
      };
    })
    .filter(Boolean);

  return NextResponse.json({ items });
}
