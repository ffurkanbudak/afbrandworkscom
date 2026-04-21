import { PrismaClient } from '@prisma/client';
import { fetchRss } from '../src/lib/news/rss';

const prisma = new PrismaClient();

const MAX_PER_SOURCE = 15;
const MAX_AGE_DAYS = 21;

function matchesKeywords(text: string, filter: string | null): boolean {
  if (!filter) return true;
  const hay = text.toLowerCase();
  const terms = filter.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean);
  if (terms.length === 0) return true;
  return terms.some((t) => hay.includes(t));
}

async function main() {
  const sources = await prisma.newsSource.findMany({ where: { enabled: true } });
  const cutoff = new Date(Date.now() - MAX_AGE_DAYS * 24 * 60 * 60 * 1000);

  for (const source of sources) {
    try {
      const items = await fetchRss(source.feedUrl);
      const fresh = items
        .filter((i) => i.publishedAt > cutoff)
        .filter((i) => matchesKeywords(`${i.title} ${i.excerpt ?? ''}`, source.keywordFilter))
        .slice(0, MAX_PER_SOURCE);

      let inserted = 0;
      for (const item of fresh) {
        const existing = await prisma.newsItem.findUnique({ where: { externalUrl: item.link } });
        if (existing) continue;
        await prisma.newsItem.create({
          data: {
            sourceId: source.id,
            externalUrl: item.link,
            originalTitle: item.title.slice(0, 500),
            originalExcerpt: item.excerpt?.slice(0, 1200) ?? null,
            imageUrl: item.imageUrl,
            publishedAt: item.publishedAt,
            status: 'DRAFT',
          },
        });
        inserted += 1;
      }

      await prisma.newsSource.update({
        where: { id: source.id },
        data: { lastFetchedAt: new Date(), lastError: null },
      });

      console.log(`${source.slug.padEnd(30)} fetched=${items.length}  inserted=${inserted}`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'unknown';
      await prisma.newsSource.update({
        where: { id: source.id },
        data: { lastFetchedAt: new Date(), lastError: msg.slice(0, 400) },
      });
      console.log(`${source.slug.padEnd(30)} ERROR: ${msg}`);
    }
  }

  const total = await prisma.newsItem.count();
  console.log(`\nToplam NewsItem: ${total}`);
}

main().finally(() => prisma.$disconnect());
