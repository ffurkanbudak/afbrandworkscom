import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

function clean(v: unknown, max: number): string | null {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  if (!t) return null;
  return t.slice(0, max);
}

function revalidateNews(itemId?: string) {
  revalidatePath('/');
  revalidatePath('/gundem');
  if (itemId) revalidatePath(`/gundem/${itemId}`);
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const admin = await db.admin.findUnique({ where: { clerkId: userId } });
  if (!admin) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const { id } = await ctx.params;
  const item = await db.newsItem.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ error: 'not-found' }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const action = body.action as string | undefined;

  if (action === 'save') {
    const titleTr = clean(body.titleTr, 140);
    const summaryTr = clean(body.summaryTr, 400);
    const editorialNote = clean(body.editorialNote, 220);
    const updated = await db.newsItem.update({
      where: { id },
      data: {
        titleTr,
        summaryTr,
        editorialNote,
        status: item.status === 'DRAFT' && titleTr && summaryTr ? 'PENDING_REVIEW' : item.status,
      },
    });
    if (item.status === 'APPROVED' || updated.status === 'APPROVED') revalidateNews(id);
    return NextResponse.json({ item: updated });
  }

  if (action === 'approve') {
    const titleTr = clean(body.titleTr, 140) ?? item.titleTr;
    const summaryTr = clean(body.summaryTr, 400) ?? item.summaryTr;
    const editorialNote = clean(body.editorialNote, 220) ?? item.editorialNote;
    if (!titleTr || !summaryTr) {
      return NextResponse.json({ error: 'Başlık ve özet zorunlu.' }, { status: 400 });
    }
    const updated = await db.newsItem.update({
      where: { id },
      data: {
        titleTr,
        summaryTr,
        editorialNote,
        status: 'APPROVED',
        approvedAt: new Date(),
        approvedById: admin.id,
        rejectedAt: null,
        rejectionReason: null,
      },
    });
    revalidateNews(id);
    return NextResponse.json({ item: updated });
  }

  if (action === 'reject') {
    const reason = clean(body.rejectionReason, 240);
    if (!reason) {
      return NextResponse.json({ error: 'Reddetme gerekçesi gerekli.' }, { status: 400 });
    }
    const updated = await db.newsItem.update({
      where: { id },
      data: {
        status: 'REJECTED',
        rejectedAt: new Date(),
        rejectionReason: reason,
        approvedAt: null,
      },
    });
    if (item.status === 'APPROVED') revalidateNews(id);
    return NextResponse.json({ item: updated });
  }

  if (action === 'archive') {
    const updated = await db.newsItem.update({
      where: { id },
      data: { status: 'ARCHIVED' },
    });
    if (item.status === 'APPROVED') revalidateNews(id);
    return NextResponse.json({ item: updated });
  }

  if (action === 'restore') {
    const updated = await db.newsItem.update({
      where: { id },
      data: {
        status: item.titleTr && item.summaryTr ? 'PENDING_REVIEW' : 'DRAFT',
        rejectedAt: null,
        rejectionReason: null,
        approvedAt: null,
      },
    });
    if (item.status === 'APPROVED') revalidateNews(id);
    return NextResponse.json({ item: updated });
  }

  return NextResponse.json({ error: 'bilinmeyen aksiyon' }, { status: 400 });
}
