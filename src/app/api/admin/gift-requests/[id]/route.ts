import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

async function guard() {
  const { userId } = await auth();
  if (!userId) return { error: 'unauthorized', status: 401 as const };
  const admin = await db.admin.findUnique({ where: { clerkId: userId } });
  if (!admin) return { error: 'forbidden', status: 403 as const };
  return { admin };
}

const VALID_STATUSES = ['PENDING', 'AWAITING_PAYMENT', 'COMPLETED', 'CANCELLED'] as const;

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const g = await guard();
  if ('error' in g) return NextResponse.json({ error: g.error }, { status: g.status });
  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));

  const existing = await db.giftRequest.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'not-found' }, { status: 404 });

  const data: Record<string, unknown> = {};
  if (VALID_STATUSES.includes(body.status)) data.status = body.status;
  if (typeof body.adminNote === 'string') data.adminNote = body.adminNote.trim() || null;
  if (typeof body.issuedCode === 'string') data.issuedCode = body.issuedCode.trim() || null;

  const updated = await db.giftRequest.update({ where: { id }, data });
  return NextResponse.json({ request: updated });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const g = await guard();
  if ('error' in g) return NextResponse.json({ error: g.error }, { status: g.status });
  const { id } = await ctx.params;
  const existing = await db.giftRequest.findUnique({ where: { id }, select: { id: true } });
  if (!existing) return NextResponse.json({ error: 'not-found' }, { status: 404 });
  await db.giftRequest.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
