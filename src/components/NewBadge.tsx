'use client';

import { useEffect, useState } from 'react';

type Variant = 'light' | 'dark';
type Size = 'sm' | 'md';

const ymdFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Istanbul',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

function isToday(publishedAt: Date | string | null | undefined): boolean {
  if (!publishedAt) return false;
  const date = typeof publishedAt === 'string' ? new Date(publishedAt) : publishedAt;
  if (Number.isNaN(date.getTime())) return false;
  return ymdFormatter.format(date) === ymdFormatter.format(new Date());
}

export function NewBadge({
  publishedAt,
  variant = 'light',
  size = 'sm',
  className = '',
}: {
  publishedAt: Date | string | null | undefined;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(isToday(publishedAt));
  }, [publishedAt]);

  if (!show) return null;

  const padding = size === 'md' ? 'px-2.5 py-1' : 'px-2 py-[3px]';
  const text = size === 'md' ? 'text-[10.5px]' : 'text-[10px]';
  const gap = size === 'md' ? 'gap-1.5' : 'gap-[5px]';

  const base =
    variant === 'dark'
      ? { background: 'rgba(255,255,255,0.14)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.22)' }
      : { background: 'color-mix(in oklab, #22C55E 10%, var(--bg))', color: 'var(--fg)', border: '1px solid color-mix(in oklab, #22C55E 32%, transparent)' };

  return (
    <span
      className={`inline-flex items-center ${gap} rounded-[4px] ${padding} ${text} font-semibold tracking-[0.14em] uppercase ${className}`}
      style={base}
    >
      <span className="relative flex h-[6px] w-[6px]" aria-hidden>
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
          style={{ background: '#22C55E' }}
        />
        <span
          className="relative inline-flex h-[6px] w-[6px] rounded-full"
          style={{ background: '#22C55E' }}
        />
      </span>
      Yeni
    </span>
  );
}
