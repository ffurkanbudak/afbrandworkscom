import type { ReactNode } from 'react';

type Tone = 'neutral' | 'accent' | 'green' | 'amber' | 'red' | 'violet';

const TONE: Record<Tone, { bg: string; fg: string; border: string }> = {
  neutral: {
    bg: 'color-mix(in oklab, var(--fg) 6%, transparent)',
    fg: 'var(--fg)',
    border: 'var(--border)',
  },
  accent: {
    bg: 'color-mix(in oklab, #EA4E0D 14%, transparent)',
    fg: '#EA4E0D',
    border: 'color-mix(in oklab, #EA4E0D 35%, transparent)',
  },
  green: {
    bg: 'color-mix(in oklab, #16A34A 14%, transparent)',
    fg: '#16A34A',
    border: 'color-mix(in oklab, #16A34A 35%, transparent)',
  },
  amber: {
    bg: 'color-mix(in oklab, #D97706 14%, transparent)',
    fg: '#D97706',
    border: 'color-mix(in oklab, #D97706 35%, transparent)',
  },
  red: {
    bg: 'color-mix(in oklab, #DC2626 14%, transparent)',
    fg: '#DC2626',
    border: 'color-mix(in oklab, #DC2626 35%, transparent)',
  },
  violet: {
    bg: 'color-mix(in oklab, #7C3AED 14%, transparent)',
    fg: '#7C3AED',
    border: 'color-mix(in oklab, #7C3AED 35%, transparent)',
  },
};

export function Pill({
  tone = 'neutral',
  children,
  className = '',
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  const t = TONE[tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[6px] border px-2.5 py-1 text-[12px] font-medium tracking-tight ${className}`}
      style={{ background: t.bg, color: t.fg, borderColor: t.border }}
    >
      {children}
    </span>
  );
}

export function statusTone(status: string): Tone {
  switch (status) {
    case 'PUBLISHED':
    case 'CONFIRMED':
    case 'ACCEPTED':
    case 'SENT':
      return 'green';
    case 'DRAFT':
    case 'PENDING':
    case 'UNREAD':
    case 'QUEUED':
      return 'amber';
    case 'REJECTED':
    case 'UNSUBSCRIBED':
    case 'BOUNCED':
    case 'FAILED':
    case 'ARCHIVED':
      return 'red';
    case 'SCHEDULED':
    case 'REVIEWING':
    case 'SENDING':
      return 'violet';
    default:
      return 'neutral';
  }
}

export const STATUS_LABEL: Record<string, string> = {
  DRAFT: 'Taslak',
  PUBLISHED: 'Yayında',
  SCHEDULED: 'Zamanlandı',
  ARCHIVED: 'Arşiv',
  PENDING: 'Bekliyor',
  REVIEWING: 'İnceleniyor',
  ACCEPTED: 'Kabul',
  REJECTED: 'Ret',
  CONFIRMED: 'Onaylı',
  UNSUBSCRIBED: 'Ayrıldı',
  BOUNCED: 'Geri döndü',
  UNREAD: 'Okunmadı',
  READ: 'Okundu',
  QUEUED: 'Sırada',
  SENDING: 'Gönderiliyor',
  SENT: 'Gönderildi',
  FAILED: 'Başarısız',
  CIRAK: 'Çırak',
  KALFA: 'Kalfa',
  USTA: 'Usta',
  PIR: 'Pîr',
};
