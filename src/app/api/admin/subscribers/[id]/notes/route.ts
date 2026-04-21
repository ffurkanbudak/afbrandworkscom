import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const admin = await db.admin.findUnique({ where: { clerkId: userId } });
  if (!admin) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const { id } = await ctx.params;
  const { body } = await req.json();
  if (!body || typeof body !== 'string' || !body.trim()) {
    return NextResponse.json({ error: 'Boş not eklenemez.' }, { status: 400 });
  }

  const sub = await db.subscriber.findUnique({ where: { id } });
  if (!sub) return NextResponse.json({ error: 'not-found' }, { status: 404 });

  const note = await db.subscriberNote.create({
    data: { subscriberId: id, authorId: admin.id, body: body.trim() },
  });
  return NextResponse.json({ note });
}
