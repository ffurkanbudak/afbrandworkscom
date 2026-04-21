'use client';

import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

type Tick = {
  symbol: string;
  label: string;
  price: number;
  change: number;
  changePct: number;
};

export function MarketTicker() {
  const [ticks, setTicks] = useState<Tick[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch('/api/market', { cache: 'no-store' });
        if (!res.ok) return;
        const data = (await res.json()) as { ticks?: Tick[] };
        if (!cancelled && Array.isArray(data.ticks)) setTicks(data.ticks);
      } catch {
        // silently ignore — keep previous state
      }
    }

    load();
    const id = setInterval(load, 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  if (ticks.length === 0) return null;

  const doubled = [...ticks, ...ticks];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: '#FFFFFF',
        color: '#111111',
        borderTop: '1px solid rgba(0,0,0,0.08)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
      }}
      aria-label="Piyasa verileri"
    >
      <div className="ticker-track flex items-center gap-9 whitespace-nowrap py-2.5" style={{ width: 'max-content' }}>
        {doubled.map((t, i) => {
          const up = t.change >= 0;
          return (
            <span key={`${t.symbol}-${i}`} className="inline-flex items-center gap-2.5 text-[12px]">
              <span
                className="font-semibold tracking-[0.06em] uppercase"
                style={{ color: '#111111' }}
              >
                {t.label}
              </span>
              <span
                className="font-mono tabular-nums"
                style={{ color: 'rgba(17,17,17,0.72)' }}
              >
                {formatPrice(t.price)}
              </span>
              <span
                className="inline-flex items-center gap-0.5 font-mono font-semibold tabular-nums"
                style={{ color: up ? '#16A34A' : '#DC2626' }}
              >
                {up ? (
                  <ArrowUp className="h-3 w-3" strokeWidth={2.5} />
                ) : (
                  <ArrowDown className="h-3 w-3" strokeWidth={2.5} />
                )}
                {Math.abs(t.changePct).toFixed(2)}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

function formatPrice(p: number): string {
  if (p >= 1000) return p.toLocaleString('tr-TR', { maximumFractionDigits: 2 });
  if (p >= 10) return p.toFixed(2);
  return p.toFixed(4);
}
