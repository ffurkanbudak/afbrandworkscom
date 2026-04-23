import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const revalidate = 60;

export async function GET() {
  const now = new Date();
  const sponsor = await db.sponsor.findFirst({
    where: {
      active: true,
      startDate: { lte: now },
      endDate: { gt: now },
    },
    orderBy: [{ tier: 'desc' }, { endDate: 'asc' }],
    select: {
      id: true,
      name: true,
      logoUrl: true,
      bio: true,
      websiteUrl: true,
      linkedinUrl: true,
      instagramUrl: true,
      xUrl: true,
      tier: true,
      endDate: true,
    },
  });
  return NextResponse.json({ sponsor });
}
