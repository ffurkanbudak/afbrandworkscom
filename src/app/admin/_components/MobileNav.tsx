'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Sidebar } from './Sidebar';

type Counts = {
  applications: number;
  sponsorships: number;
  messages: number;
  comments: number;
};

export function MobileNav({ counts }: { counts: Counts }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Yönetim menüsünü aç"
        aria-expanded={open}
        className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] border transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)] md:hidden"
        style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
      >
        <Menu className="h-[16px] w-[16px]" strokeWidth={1.85} />
      </button>

      <div
        aria-hidden={!open}
        className="fixed inset-0 z-50 md:hidden"
        style={{
          pointerEvents: open ? 'auto' : 'none',
          opacity: open ? 1 : 0,
          transition: 'opacity .25s ease',
        }}
      >
        <button
          aria-label="Menüyü kapat"
          onClick={() => setOpen(false)}
          className="absolute inset-0 h-full w-full cursor-default"
          style={{ background: 'rgba(10,10,10,0.32)', backdropFilter: 'blur(4px)' }}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Yönetim menüsü"
          className="absolute top-0 left-0 flex h-full w-full max-w-[300px] flex-col border-r"
          style={{
            background: 'var(--bg)',
            borderColor: 'var(--border)',
            transform: open ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform .32s cubic-bezier(.2,.7,.2,1)',
          }}
          onClick={(e) => {
            const t = e.target as HTMLElement;
            if (t.closest('a')) setOpen(false);
          }}
        >
          <div
            className="flex items-center justify-between border-b px-4 py-4"
            style={{ borderColor: 'var(--border)' }}
          >
            <span
              className="text-[11px] font-semibold tracking-[0.14em] uppercase"
              style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
            >
              Yönetim
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Menüyü kapat"
              className="flex h-8 w-8 items-center justify-center rounded-[6px] transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
              style={{ color: 'var(--fg)' }}
            >
              <X className="h-[16px] w-[16px]" strokeWidth={1.85} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Sidebar counts={counts} />
          </div>
        </aside>
      </div>
    </>
  );
}
