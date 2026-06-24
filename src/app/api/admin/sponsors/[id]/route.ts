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

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const g = await guard();
  if ('error' in g) return NextResponse.json({ error: g.error }, { status: g.status });
  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));

  const existing = await db.sponsor.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'not-found' }, { status: 404 });

  const data: Record<string, unknown> = {};
  if (typeof body.name === 'string') data.name = body.name.trim();
  if ('logoUrl' in body) data.logoUrl = body.logoUrl || null;
  if ('bio' in body) data.bio = body.bio || null;
  if ('websiteUrl' in body) data.websiteUrl = body.websiteUrl || null;
  if ('linkedinUrl' in body) data.linkedinUrl = body.linkedinUrl || null;
  if ('instagramUrl' in body) data.instagramUrl = body.instagramUrl || null;
  if ('xUrl' in body) data.xUrl = body.xUrl || null;
  if (VALID_TIERS.includes(body.tier)) data.tier = body.tier;
  if (typeof body.active === 'boolean') data.active = body.active;
  if (body.startDate) data.startDate = new Date(body.startDate);
  if (body.endDate) data.endDate = new Date(body.endDate);

  const sponsor = await db.sponsor.update({ where: { id }, data });
  return NextResponse.json({ sponsor });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const g = await guard();
  if ('error' in g) return NextResponse.json({ error: g.error }, { status: g.status });
  const { id } = await ctx.params;
  const existing = await db.sponsor.findUnique({ where: { id }, select: { id: true } });
  if (!existing) return NextResponse.json({ error: 'not-found' }, { status: 404 });
  await db.sponsor.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
