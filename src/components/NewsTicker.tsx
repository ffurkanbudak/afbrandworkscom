'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Newspaper } from 'lucide-react';

type Item = {
  id: string;
  title: string;
  source: { name: string; logoUrl: string | null; language: 'EN' | 'TR' };
};

const REFRESH_MS = 5 * 60 * 1_000;

export function NewsTicker() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch('/api/news/recent', { cache: 'no-store' });
        if (!res.ok) return;
        const data = (await res.json()) as { items?: Item[] };
        if (!cancelled && Array.isArray(data.items)) setItems(data.items);
      } catch {}
    };
    load();
    const id = setInterval(load, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  if (items.length === 0) return null;

  const doubled = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: 'color-mix(in oklab, var(--fg) 4%, var(--bg))',
        color: 'var(--fg)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
      aria-label="Son haberler"
    >
      <div
        className="news-ticker-track flex items-center gap-8 whitespace-nowrap py-2"
        style={{ width: 'max-content' }}
      >
        {doubled.map((n, i) => (
          <Link
            key={`${n.id}-${i}`}
            href={`/gundem/${n.id}`}
            className="group inline-flex items-center gap-2.5 text-[12px] transition"
            style={{ color: 'color-mix(in oklab, var(--fg) 82%, transparent)' }}
          >
            <span
              className="inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center overflow-hidden rounded-[4px]"
              style={{ border: '1px solid var(--border)' }}
              aria-hidden
            >
              {n.source.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={n.source.logoUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <Newspaper className="h-[11px] w-[11px] opacity-60" strokeWidth={1.75} />
              )}
            </span>
            <span
              lang={n.source.language === 'EN' ? 'en' : undefined}
              className="font-semibold tracking-[0.06em] uppercase"
              style={{ color: 'color-mix(in oklab, var(--fg) 58%, transparent)' }}
            >
              {n.source.name}
            </span>
            <span className="opacity-40">·</span>
            <span className="transition group-hover:underline">{n.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
