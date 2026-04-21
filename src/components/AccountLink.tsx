'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function AccountLink({
  className,
  style,
  onClick,
}: {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch('/api/me/notifications', { cache: 'no-store' });
        if (!res.ok) return;
        const json = await res.json();
        if (alive) setUnread(Number(json.unread ?? 0));
      } catch {}
    };
    load();
    const t = setInterval(load, 60_000);
    const onVis = () => {
      if (document.visibilityState === 'visible') load();
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      alive = false;
      clearInterval(t);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  const has = unread > 0;

  return (
    <Link
      href="/hesap"
      onClick={onClick}
      className={className}
      style={style}
      aria-label={has ? `Hesabım, ${unread} okunmamış bildirim` : 'Hesabım'}
    >
      <span className="relative inline-flex items-center gap-1.5">
        {has && (
          <span
            className="relative flex h-[7px] w-[7px]"
            aria-hidden
          >
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
              style={{ background: '#EA4E0D' }}
            />
            <span
              className="relative inline-flex h-[7px] w-[7px] rounded-full"
              style={{ background: '#EA4E0D' }}
            />
          </span>
        )}
        <span>Hesabım</span>
        {has && (
          <span
            className="ml-0.5 inline-flex min-w-[17px] items-center justify-center rounded-full px-1.5 text-[10px] font-semibold leading-[16px] tracking-tight"
            style={{
              background: '#EA4E0D',
              color: '#FFFFFF',
            }}
          >
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </span>
    </Link>
  );
}
