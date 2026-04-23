import { randomInt } from 'crypto';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const DEFAULT_EXPIRY_MONTHS = 6;

export function generateGiftCode(): string {
  const block = (len: number) =>
    Array.from({ length: len }, () => ALPHABET[randomInt(0, ALPHABET.length)]).join('');
  return `AFB-${block(5)}-${block(5)}`;
}

export function defaultExpiry(now: Date = new Date()): Date {
  const d = new Date(now);
  d.setMonth(d.getMonth() + DEFAULT_EXPIRY_MONTHS);
  return d;
}
