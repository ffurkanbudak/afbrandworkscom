import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { fetchRss } from '@/lib/news/rss';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const MAX_PER_SOURCE = 15;
const MAX_AGE_DAYS = 21;

function matchesKeywords(text: string, filter: string | null): boolean {
  if (!filter) return true;
  const hay = text.toLowerCase();
  const terms = filter
    .split(',')
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
  if (terms.length === 0) return true;
  return terms.some((t) => hay.includes(t));
}

function isAuthorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return process.env.NODE_ENV !== 'production';
  const auth = req.headers.get('authorization') ?? '';
  if (auth === `Bearer ${secret}`) return true;
  const url = new URL(req.url);
  return url.searchParams.get('secret') === secret;
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const sources = await db.newsSource.findMany({ where: { enabled: true } });
  const cutoff = new Date(Date.now() - MAX_AGE_DAYS * 24 * 60 * 60 * 1000);

  const summary: Array<{ slug: string; fetched: number; inserted: number; error?: string }> = [];

  for (const source of sources) {
    try {
      const items = await fetchRss(source.feedUrl);
      const fresh = items
        .filter((i) => i.publishedAt > cutoff)
        .filter((i) => matchesKeywords(`${i.title} ${i.excerpt ?? ''}`, source.keywordFilter))
        .slice(0, MAX_PER_SOURCE);

      const isTurkish = source.language === 'TR';
      let inserted = 0;
      for (const item of fresh) {
        const existing = await db.newsItem.findUnique({ where: { externalUrl: item.link } });
        if (existing) continue;
        const originalTitle = item.title.slice(0, 500);
        const originalExcerpt = item.excerpt?.slice(0, 1200) ?? null;
        await db.newsItem.create({
          data: {
            sourceId: source.id,
            externalUrl: item.link,
            originalTitle,
            originalExcerpt,
            imageUrl: item.imageUrl,
            publishedAt: item.publishedAt,
            status: isTurkish ? 'PENDING_REVIEW' : 'DRAFT',
            titleTr: isTurkish ? originalTitle.slice(0, 140) : null,
            summaryTr: isTurkish ? originalExcerpt?.slice(0, 400) ?? null : null,
          },
        });
        inserted += 1;
      }

      await db.newsSource.update({
        where: { id: source.id },
        data: { lastFetchedAt: new Date(), lastError: null },
      });

      summary.push({ slug: source.slug, fetched: items.length, inserted });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'unknown';
      await db.newsSource.update({
        where: { id: source.id },
        data: { lastFetchedAt: new Date(), lastError: msg.slice(0, 400) },
      });
      summary.push({ slug: source.slug, fetched: 0, inserted: 0, error: msg });
    }
  }

  return NextResponse.json({ ok: true, summary });
}
