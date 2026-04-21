import { PrismaClient } from '@prisma/client';
import { DEFAULT_SOURCES, logoUrlFor } from '../src/lib/news/sources';

const prisma = new PrismaClient();

async function main() {
  for (const s of DEFAULT_SOURCES) {
    await prisma.newsSource.upsert({
      where: { slug: s.slug },
      update: {
        name: s.name,
        homepageUrl: s.homepageUrl,
        feedUrl: s.feedUrl,
        logoUrl: logoUrlFor(s.logoDomain),
        language: s.language,
        type: s.type,
        keywordFilter: s.keywordFilter ?? null,
      },
      create: {
        slug: s.slug,
        name: s.name,
        homepageUrl: s.homepageUrl,
        feedUrl: s.feedUrl,
        logoUrl: logoUrlFor(s.logoDomain),
        language: s.language,
        type: s.type,
        keywordFilter: s.keywordFilter ?? null,
      },
    });
  }
  const keepSlugs = DEFAULT_SOURCES.map((s) => s.slug);
  const disabled = await prisma.newsSource.updateMany({
    where: { slug: { notIn: keepSlugs }, enabled: true },
    data: { enabled: false },
  });
  if (disabled.count > 0) {
    console.log(`Disabled ${disabled.count} source(s) not in default list.`);
  }
  const count = await prisma.newsSource.count({ where: { enabled: true } });
  console.log(`Seeded ${count} active news sources.`);
}

main().finally(() => prisma.$disconnect());
