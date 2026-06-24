import { PrismaClient } from '@prisma/client';
import { fetchOgImage } from '../src/lib/news/rss';

const prisma = new PrismaClient();

async function main() {
  const items = await prisma.newsItem.findMany({
    where: { imageUrl: null },
    select: { id: true, externalUrl: true },
  });
  console.log(`Görseli olmayan haber: ${items.length}`);

  let filled = 0;
  const CONCURRENCY = 6;
  for (let i = 0; i < items.length; i += CONCURRENCY) {
    const batch = items.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      batch.map(async (it) => {
        const img = await fetchOgImage(it.externalUrl);
        if (img) {
          await prisma.newsItem.update({ where: { id: it.id }, data: { imageUrl: img } });
          return true;
        }
        return false;
      }),
    );
    filled += results.filter(Boolean).length;
    process.stdout.write(`\r${Math.min(i + CONCURRENCY, items.length)}/${items.length} işlendi, ${filled} görsel bulundu`);
  }
  console.log(`\nTamamlandı. ${filled} habere görsel eklendi.`);
}

main().finally(() => prisma.$disconnect());
