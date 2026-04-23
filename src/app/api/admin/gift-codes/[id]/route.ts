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

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const g = await guard();
  if ('error' in g) return NextResponse.json({ error: g.error }, { status: g.status });
  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));

  const existing = await db.giftCode.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'not-found' }, { status: 404 });

  if (body.action === 'revoke') {
    if (existing.status === 'REDEEMED') {
      return NextResponse.json(
        { error: 'Kullanılmış kod iptal edilemez.' },
        { status: 400 },
      );
    }
    const updated = await db.giftCode.update({
      where: { id },
      data: { status: 'REVOKED' },
    });
    return NextResponse.json({ giftCode: updated });
  }

  return NextResponse.json({ error: 'unknown-action' }, { status: 400 });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const g = await guard();
  if ('error' in g) return NextResponse.json({ error: g.error }, { status: g.status });
  const { id } = await ctx.params;
  const existing = await db.giftCode.findUnique({ where: { id }, select: { id: true } });
  if (!existing) return NextResponse.json({ error: 'not-found' }, { status: 404 });
  await db.giftCode.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
