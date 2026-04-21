import { PrismaClient } from '@prisma/client';
import { translateNews } from '../src/lib/news/translate';

const prisma = new PrismaClient();
const LIMIT = Number(process.argv[2] ?? 3);
const AUTO_APPROVE = process.argv.includes('--approve');
const SOURCES = process.argv
  .find((a) => a.startsWith('--sources='))
  ?.replace('--sources=', '')
  .split(',')
  .filter(Boolean);

async function main() {
  const drafts = await prisma.newsItem.findMany({
    where: {
      status: 'DRAFT',
      ...(SOURCES && SOURCES.length > 0
        ? { source: { slug: { in: SOURCES } } }
        : {}),
    },
    include: { source: true },
    orderBy: { publishedAt: 'desc' },
    take: LIMIT,
  });

  console.log(`Translating ${drafts.length} items…${AUTO_APPROVE ? ' (auto-approving)' : ''}\n`);

  for (const item of drafts) {
    console.log(`  ${item.source.name.padEnd(22)} ${item.originalTitle.slice(0, 72)}`);
    try {
      const r = await translateNews({
        title: item.originalTitle,
        excerpt: item.originalExcerpt,
        language: item.source.language,
      });
      await prisma.newsItem.update({
        where: { id: item.id },
        data: {
          titleTr: r.titleTr,
          summaryTr: r.summaryTr,
          editorialNote: r.editorialNote,
          status: AUTO_APPROVE ? 'APPROVED' : 'PENDING_REVIEW',
          approvedAt: AUTO_APPROVE ? new Date() : null,
        },
      });
      console.log(`    → ${r.titleTr}`);
      console.log(`    ${r.summaryTr}`);
      console.log();
    } catch (e) {
      console.error(`    ✗ ${e instanceof Error ? e.message : e}`);
    }
  }
}

main().finally(() => prisma.$disconnect());
