'use client';

import { useState, type ReactNode } from 'react';

export function InfoTooltip({
  children,
  title,
  width = 280,
}: {
  children: ReactNode;
  title?: string;
  width?: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-label={title ?? 'Bilgi'}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-[16px] w-[16px] items-center justify-center rounded-full border text-[10px] font-semibold leading-none transition"
        style={{
          borderColor: 'color-mix(in oklab, var(--fg) 35%, transparent)',
          color: 'color-mix(in oklab, var(--fg) 70%, transparent)',
          background: 'transparent',
        }}
      >
        i
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute left-1/2 top-[calc(100%+6px)] z-50 -translate-x-1/2 rounded-[8px] border p-3 text-[12px] leading-[1.55] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)]"
          style={{
            width,
            borderColor: 'var(--border)',
            background: 'var(--bg)',
            color: 'var(--fg)',
          }}
        >
          {title && (
            <span
              className="mb-1.5 block text-[10px] font-semibold tracking-[0.14em] uppercase"
              style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
            >
              {title}
            </span>
          )}
          <span className="block">{children}</span>
        </span>
      )}
    </span>
  );
}
