'use client';

import { useEffect, useState } from 'react';

export function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const scrollHeight = h.scrollHeight - h.clientHeight;
      if (scrollHeight <= 0) {
        setPct(0);
        return;
      }
      const p = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
      setPct(p);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-50 h-[2px] w-full"
      style={{
        background: 'color-mix(in oklab, var(--fg) 6%, transparent)',
      }}
    >
      <div
        className="h-full transition-[width] duration-75"
        style={{ width: `${pct}%`, background: '#DC2204' }}
      />
    </div>
  );
}
