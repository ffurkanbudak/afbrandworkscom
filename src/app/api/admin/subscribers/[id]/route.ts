import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { calcTier } from '@/app/admin/_lib/tier';

async function guard() {
  const { userId } = await auth();
  if (!userId) return { error: 'unauthorized', status: 401 as const };
  const admin = await db.admin.findUnique({ where: { clerkId: userId } });
  if (!admin) return { error: 'forbidden', status: 403 as const };
  return { admin };
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const g = await guard();
  if ('error' in g) return NextResponse.json({ error: g.error }, { status: g.status });
  const { id } = await ctx.params;
  const body = await req.json();

  const existing = await db.subscriber.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'not-found' }, { status: 404 });

  const data: Record<string, unknown> = {};
  if (body.tier) data.tier = body.tier;
  if (typeof body.showInCommunity === 'boolean') data.showInCommunity = body.showInCommunity;
  if (typeof body.activityScoreDelta === 'number') {
    const newScore = Math.max(0, existing.activityScore + body.activityScoreDelta);
    data.activityScore = newScore;
    if (!body.tier) data.tier = calcTier(newScore);
  }

  const sub = await db.subscriber.update({ where: { id }, data });
  return NextResponse.json({ subscriber: sub });
}
