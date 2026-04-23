import type { Subscriber } from '@prisma/client';

const MIN_BIO_LENGTH = 10;

export function isProfileComplete(sub: Pick<Subscriber, 'avatarUrl' | 'bio'>): boolean {
  if (!sub.avatarUrl) return false;
  const bio = sub.bio?.trim() ?? '';
  return bio.length >= MIN_BIO_LENGTH;
}

export const PUBLISH_DELAY_MS = 60 * 60 * 1000;

export function computePublishAt(now: Date = new Date()): Date {
  return new Date(now.getTime() + PUBLISH_DELAY_MS);
}
