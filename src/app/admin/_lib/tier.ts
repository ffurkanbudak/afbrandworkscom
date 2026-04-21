import type { SubscriberTier } from '@prisma/client';

export const TIER_LABEL: Record<SubscriberTier, string> = {
  CIRAK: 'Çırak',
  KALFA: 'Kalfa',
  USTA: 'Usta',
  PIR: 'Pîr',
};

export const TIER_DESCRIPTION: Record<SubscriberTier, string> = {
  CIRAK: 'Yeni tanışma. İlk yazıları okuyor.',
  KALFA: 'Düzenli okuyor, paylaşmaya başlıyor.',
  USTA: 'Topluluğun aktif parçası. Sık paylaşıyor.',
  PIR: 'Gerçek ruh ortağı. Topluluğu taşıyor.',
};

export const TIER_THRESHOLDS: Record<SubscriberTier, number> = {
  CIRAK: 0,
  KALFA: 25,
  USTA: 75,
  PIR: 200,
};

export const TIER_ORDER: SubscriberTier[] = ['CIRAK', 'KALFA', 'USTA', 'PIR'];

export function calcTier(score: number): SubscriberTier {
  if (score >= TIER_THRESHOLDS.PIR) return 'PIR';
  if (score >= TIER_THRESHOLDS.USTA) return 'USTA';
  if (score >= TIER_THRESHOLDS.KALFA) return 'KALFA';
  return 'CIRAK';
}

export function nextTier(tier: SubscriberTier): SubscriberTier | null {
  const i = TIER_ORDER.indexOf(tier);
  return i < TIER_ORDER.length - 1 ? TIER_ORDER[i + 1] : null;
}

export function tierProgress(score: number, tier: SubscriberTier): { pct: number; toNext: number } {
  const next = nextTier(tier);
  if (!next) return { pct: 100, toNext: 0 };
  const base = TIER_THRESHOLDS[tier];
  const top = TIER_THRESHOLDS[next];
  const pct = Math.min(100, Math.max(0, ((score - base) / (top - base)) * 100));
  return { pct, toNext: Math.max(0, top - score) };
}
