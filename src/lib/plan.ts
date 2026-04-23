import type { MembershipPlan } from '@prisma/client';

export const PLAN_LABEL: Record<MembershipPlan, string> = {
  GOZLEMCI: 'Gözlemci',
  ORTAK: 'Ortak',
  MIMARI: 'Mimari',
};

const RANK: Record<MembershipPlan, number> = {
  GOZLEMCI: 1,
  ORTAK: 2,
  MIMARI: 3,
};

export function canReplyToPlan(
  replier: MembershipPlan,
  target: MembershipPlan,
): boolean {
  if (replier === 'GOZLEMCI') return false;
  if (replier === 'MIMARI') return true;
  return RANK[target] <= RANK[replier];
}
