import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const revalidate = 120;

export async function GET() {
  const items = await db.newsItem.findMany({
    where: { status: 'APPROVED' },
    orderBy: { approvedAt: 'desc' },
    take: 10,
    include: {
      source: { select: { name: true, logoUrl: true, language: true } },
    },
  });

  return NextResponse.json({
    items: items.map((n) => ({
      id: n.id,
      title: n.titleTr ?? n.originalTitle,
      approvedAt: n.approvedAt,
      source: { name: n.source.name, logoUrl: n.source.logoUrl, language: n.source.language },
    })),
  });
}
