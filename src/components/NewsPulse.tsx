'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Newspaper, X } from 'lucide-react';

type Item = {
  id: string;
  title: string;
  approvedAt: string | null;
  source: { name: string; logoUrl: string | null };
};

const INITIAL_DELAY = 16_000;
const VISIBLE_MS = 6_500;
const GAP_MS = 12_000;
const FETCH_INTERVAL = 10 * 60 * 1_000;

export function NewsPulse() {
  const [items, setItems] = useState<Item[]>([]);
  const [idx, setIdx] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cycleRef = useRef(0);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch('/api/news/recent', { cache: 'no-store' });
        if (!res.ok) return;
        const json = await res.json();
        if (alive && Array.isArray(json.items)) setItems(json.items);
      } catch {}
    };
    load();
    const t = setInterval(load, FETCH_INTERVAL);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  useEffect(() => {
    if (dismissed || items.length === 0) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const schedule = (ms: number, fn: () => void) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(fn, ms);
    };

    const show = () => {
      const next = cycleRef.current % items.length;
      setIdx(next);
      schedule(VISIBLE_MS, hide);
    };

    const hide = () => {
      setIdx(null);
      cycleRef.current += 1;
      schedule(GAP_MS, show);
    };

    schedule(INITIAL_DELAY, show);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [items, dismissed]);

  if (dismissed) return null;
  const item = idx != null ? items[idx] : null;

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-24 left-5 z-40 max-w-[calc(100vw-2.5rem)] sm:bottom-28 sm:left-6"
    >
      <div
        className="pointer-events-auto transition-all duration-[600ms]"
        style={{
          transform: item ? 'translateY(0)' : 'translateY(28px)',
          opacity: item ? 1 : 0,
          transitionTimingFunction: item ? 'cubic-bezier(.2,.75,.25,1)' : 'cubic-bezier(.55,.05,.85,.35)',
          filter: item ? 'blur(0)' : 'blur(2px)',
        }}
      >
        {item && <ToastCard item={item} onClose={() => setDismissed(true)} />}
      </div>
    </div>
  );
}

function ToastCard({ item, onClose }: { item: Item; onClose: () => void }) {
  return (
    <div
      className="relative flex items-center gap-3 rounded-[12px] border py-3 pr-9 pl-3.5 shadow-[0_10px_32px_-16px_rgba(0,0,0,0.35)]"
      style={{
        borderColor: 'color-mix(in oklab, var(--border) 85%, transparent)',
        background: 'color-mix(in oklab, var(--bg-card, var(--bg)) 92%, transparent)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        minWidth: 264,
        maxWidth: 340,
      }}
    >
      {item.source.logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.source.logoUrl}
          alt=""
          aria-hidden
          className="h-9 w-9 shrink-0 rounded-full object-cover"
          style={{ border: '1px solid var(--border)' }}
        />
      ) : (
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
          style={{
            borderColor: 'var(--border)',
            background: 'color-mix(in oklab, var(--fg) 5%, transparent)',
            color: 'color-mix(in oklab, var(--fg) 70%, transparent)',
          }}
          aria-hidden
        >
          <Newspaper className="h-[15px] w-[15px]" strokeWidth={1.6} />
        </div>
      )}

      <Link
        href={`/gundem/${item.id}`}
        className="min-w-0 flex-1 leading-tight outline-none"
      >
        <p className="line-clamp-2 text-[13px] font-semibold tracking-tight">
          {item.title}
        </p>
        <p
          className="mt-0.5 flex items-center gap-1.5 text-[11px] tracking-tight"
          style={{ color: 'color-mix(in oklab, var(--fg) 58%, transparent)' }}
        >
          <span
            className="inline-flex h-[6px] w-[6px] rounded-full"
            style={{ background: '#F97316' }}
            aria-hidden
          />
          <span>Yeni haber</span>
          <span aria-hidden style={{ color: 'color-mix(in oklab, var(--fg) 30%, transparent)' }}>
            ·
          </span>
          <span className="truncate">{item.source.name}</span>
          {item.approvedAt && (
            <>
              <span aria-hidden style={{ color: 'color-mix(in oklab, var(--fg) 30%, transparent)' }}>
                ·
              </span>
              <span>{relTime(item.approvedAt)}</span>
            </>
          )}
        </p>
      </Link>

      <button
        type="button"
        onClick={onClose}
        aria-label="Kapat"
        className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-[6px] transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
        style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
      >
        <X className="h-[12px] w-[12px]" strokeWidth={1.75} />
      </button>
    </div>
  );
}

function relTime(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffSec = Math.max(1, Math.round((now - then) / 1000));
  if (diffSec < 60) return 'az önce';
  const min = Math.round(diffSec / 60);
  if (min < 60) return `${min} dk önce`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr} sa önce`;
  const day = Math.round(hr / 24);
  if (day < 7) return `${day} gün önce`;
  const wk = Math.round(day / 7);
  if (wk < 5) return `${wk} hf önce`;
  const mo = Math.round(day / 30);
  return `${mo} ay önce`;
}
