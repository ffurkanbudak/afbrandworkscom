import { PrismaClient, SubscriberTier } from '@prisma/client';

const prisma = new PrismaClient();

const TIER_THRESHOLDS: Record<SubscriberTier, number> = {
  CIRAK: 0,
  KALFA: 25,
  USTA: 75,
  PIR: 200,
};

function calcTier(score: number): SubscriberTier {
  if (score >= TIER_THRESHOLDS.PIR) return 'PIR';
  if (score >= TIER_THRESHOLDS.USTA) return 'USTA';
  if (score >= TIER_THRESHOLDS.KALFA) return 'KALFA';
  return 'CIRAK';
}

async function main() {
  const subs = await prisma.subscriber.findMany({
    select: { id: true, activityScore: true, tier: true, name: true, firstName: true, lastName: true },
  });

  let updated = 0;
  for (const s of subs) {
    const data: Record<string, unknown> = {};

    const correctTier = calcTier(s.activityScore);
    if (correctTier !== s.tier) {
      data.tier = correctTier;
    }

    if (!s.firstName && !s.lastName && s.name) {
      const parts = s.name.trim().split(/\s+/);
      data.firstName = parts[0] ?? null;
      data.lastName = parts.slice(1).join(' ') || null;
    }

    if (Object.keys(data).length === 0) continue;
    await prisma.subscriber.update({ where: { id: s.id }, data });
    updated += 1;
  }

  console.log(`Updated ${updated} / ${subs.length} subscribers.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
