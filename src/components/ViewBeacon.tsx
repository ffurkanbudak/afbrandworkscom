'use client';

import { useEffect } from 'react';

export function ViewBeacon({ slug }: { slug: string }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const key = `viewed:${slug}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');
    } catch {}

    const payload = JSON.stringify({ slug });
    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: 'application/json' });
        navigator.sendBeacon('/api/track/view', blob);
        return;
      }
    } catch {}
    fetch('/api/track/view', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  }, [slug]);

  return null;
}
