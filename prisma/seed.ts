import { PrismaClient } from '@prisma/client';
import { TAXONOMY } from '../src/lib/tags';

const prisma = new PrismaClient();

async function main() {
  for (const [i, entry] of TAXONOMY.entries()) {
    await prisma.tag.upsert({
      where: { slug: entry.slug },
      update: { labelTr: entry.labelTr, labelEn: entry.labelEn, group: entry.group, order: i },
      create: { ...entry, order: i },
    });
  }
}

main().finally(() => prisma.$disconnect());
