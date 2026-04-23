import { NextResponse } from 'next/server';
import { getCurrentSubscriber } from '@/lib/subscriber';
import { db } from '@/lib/db';

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const viewer = await getCurrentSubscriber();
  if (!viewer) {
    return NextResponse.json({ error: 'Önce giriş yapın.' }, { status: 401 });
  }
  const { id } = await ctx.params;

  const comment = await db.forumComment.findUnique({
    where: { id },
    select: { id: true, authorId: true },
  });
  if (!comment) return NextResponse.json({ error: 'not-found' }, { status: 404 });
  if (comment.authorId === viewer.id) {
    return NextResponse.json({ error: 'Kendi yanıtınızı raporlayamazsınız.' }, { status: 400 });
  }

  const body = await req.json().catch(() => ({}));
  const reasonText =
    typeof body.reason === 'string' ? body.reason.trim().slice(0, 300) : '';

  const existing = await db.forumFlag.findFirst({
    where: { commentId: id, reporterId: viewer.id },
    select: { id: true },
  });
  if (existing) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  await db.forumFlag.create({
    data: {
      commentId: id,
      reporterId: viewer.id,
      source: 'USER',
      reason: reasonText || 'Kullanıcı raporladı',
    },
  });

  return NextResponse.json({ ok: true });
}
