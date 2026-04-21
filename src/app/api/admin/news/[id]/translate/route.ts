import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { translateNews } from '@/lib/news/translate';

export async function POST(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const admin = await db.admin.findUnique({ where: { clerkId: userId } });
  if (!admin) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const { id } = await ctx.params;
  const item = await db.newsItem.findUnique({
    where: { id },
    include: { source: true },
  });
  if (!item) return NextResponse.json({ error: 'not-found' }, { status: 404 });

  if (item.source.language === 'TR') {
    const updated = await db.newsItem.update({
      where: { id },
      data: {
        titleTr: item.originalTitle.slice(0, 140),
        summaryTr: item.originalExcerpt?.slice(0, 400) ?? null,
        status: item.status === 'DRAFT' ? 'PENDING_REVIEW' : item.status,
      },
    });
    return NextResponse.json({ item: updated });
  }

  try {
    const result = await translateNews({
      title: item.originalTitle,
      excerpt: item.originalExcerpt,
      language: item.source.language,
    });

    const updated = await db.newsItem.update({
      where: { id },
      data: {
        titleTr: result.titleTr,
        summaryTr: result.summaryTr,
        editorialNote: result.editorialNote,
        status: item.status === 'DRAFT' ? 'PENDING_REVIEW' : item.status,
      },
    });

    return NextResponse.json({ item: updated });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'bilinmeyen hata';
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
