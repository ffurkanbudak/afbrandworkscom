import { NextResponse } from 'next/server';
import { auth } from '@/lib/admin-auth';
import { db } from '@/lib/db';

const ALLOWED = ['PENDING', 'REVIEWING', 'ACCEPTED', 'REJECTED'] as const;

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const admin = await db.admin.findUnique({ where: { clerkId: userId } });
  if (!admin) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const { id } = await ctx.params;
  const { status, adminNote } = await req.json();
  if (status && !ALLOWED.includes(status)) {
    return NextResponse.json({ error: 'Geçersiz durum.' }, { status: 400 });
  }

  const req2 = await db.sponsorshipRequest.update({
    where: { id },
    data: {
      ...(status ? { status } : {}),
      ...(adminNote !== undefined ? { adminNote } : {}),
      ...(status && status !== 'PENDING' ? { reviewedAt: new Date() } : {}),
    },
  });
  return NextResponse.json({ sponsorship: req2 });
}
