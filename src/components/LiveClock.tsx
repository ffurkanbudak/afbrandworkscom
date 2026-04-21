'use client';

import { useEffect, useState } from 'react';

const TIME_FORMATTER = new Intl.DateTimeFormat('tr-TR', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'Europe/Istanbul',
});

function format(date: Date): { hh: string; mm: string } {
  const parts = TIME_FORMATTER.formatToParts(date);
  const hh = parts.find((p) => p.type === 'hour')?.value ?? '00';
  const mm = parts.find((p) => p.type === 'minute')?.value ?? '00';
  return { hh, mm };
}

export function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);
  const [colonOn, setColonOn] = useState(true);

  useEffect(() => {
    setNow(new Date());
    const tick = setInterval(() => setNow(new Date()), 10_000);
    const blink = setInterval(() => setColonOn((v) => !v), 1000);
    return () => {
      clearInterval(tick);
      clearInterval(blink);
    };
  }, []);

  if (!now) {
    return (
      <div
        aria-hidden
        className="hidden h-[28px] w-[72px] rounded-[5px] md:block"
        style={{ border: '1px solid var(--border)' }}
      />
    );
  }

  const { hh, mm } = format(now);

  return (
    <div
      className="hidden items-center justify-center rounded-[5px] px-2.5 py-1 md:inline-flex"
      style={{ border: '1px solid var(--border)', color: 'var(--fg)' }}
      aria-label="İstanbul saati"
      title="İstanbul saati (GMT+3)"
    >
      <span
        className="font-mono"
        style={{
          fontSize: 13,
          fontVariantNumeric: 'tabular-nums',
          fontFeatureSettings: '"tnum" 1',
          fontWeight: 400,
          lineHeight: 1,
        }}
      >
        {hh}
        <span
          aria-hidden
          style={{
            opacity: colonOn ? 1 : 0.25,
            transition: 'opacity .22s ease',
            margin: '0 0.05em',
          }}
        >
          :
        </span>
        {mm}
      </span>
    </div>
  );
}
