import { NextResponse } from 'next/server';
import { auth } from '@/lib/admin-auth';
import { db } from '@/lib/db';

async function guard() {
  const { userId } = await auth();
  if (!userId) return { error: 'unauthorized', status: 401 as const };
  const admin = await db.admin.findUnique({ where: { clerkId: userId } });
  if (!admin) return { error: 'forbidden', status: 403 as const };
  return { admin };
}

const VALID_TIERS = ['DAILY', 'MONTHLY', 'QUARTERLY'] as const;
type Tier = (typeof VALID_TIERS)[number];

export async function GET() {
  const g = await guard();
  if ('error' in g) return NextResponse.json({ error: g.error }, { status: g.status });
  const sponsors = await db.sponsor.findMany({
    orderBy: [{ endDate: 'desc' }],
    take: 500,
  });
  return NextResponse.json({ sponsors });
}

export async function POST(req: Request) {
  const g = await guard();
  if ('error' in g) return NextResponse.json({ error: g.error }, { status: g.status });
  const body = await req.json().catch(() => ({}));

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (!name) return NextResponse.json({ error: 'İsim gerekli.' }, { status: 400 });

  const tier: Tier = VALID_TIERS.includes(body.tier) ? body.tier : 'MONTHLY';
  const startDate = body.startDate ? new Date(body.startDate) : new Date();
  const endDate = body.endDate ? new Date(body.endDate) : null;
  if (!endDate || Number.isNaN(endDate.getTime())) {
    return NextResponse.json({ error: 'Bitiş tarihi gerekli.' }, { status: 400 });
  }
  if (endDate <= startDate) {
    return NextResponse.json(
      { error: 'Bitiş tarihi başlangıçtan sonra olmalı.' },
      { status: 400 },
    );
  }

  const sponsor = await db.sponsor.create({
    data: {
      name,
      logoUrl: body.logoUrl || null,
      bio: body.bio || null,
      websiteUrl: body.websiteUrl || null,
      linkedinUrl: body.linkedinUrl || null,
      instagramUrl: body.instagramUrl || null,
      xUrl: body.xUrl || null,
      tier,
      startDate,
      endDate,
      active: body.active !== false,
    },
  });

  return NextResponse.json({ sponsor });
}
