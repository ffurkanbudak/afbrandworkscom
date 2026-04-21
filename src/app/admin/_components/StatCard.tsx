import type { ReactNode } from 'react';

export function StatCard({
  label,
  value,
  hint,
  trend,
  accent = false,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  trend?: { delta: number; suffix?: string };
  accent?: boolean;
}) {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        borderColor: 'var(--border)',
        background: accent
          ? 'color-mix(in oklab, var(--fg) 4%, transparent)'
          : 'transparent',
      }}
    >
      <p className="eyebrow">{label}</p>
      <p className="font-display mt-3 text-[38px] leading-none tabular-nums tracking-tight">
        {value}
      </p>
      <div className="mt-3 flex items-center justify-between gap-2 text-[12px]">
        {hint && (
          <span style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}>
            {hint}
          </span>
        )}
        {trend && (
          <span
            className="font-medium tabular-nums"
            style={{ color: trend.delta >= 0 ? '#16A34A' : '#DC2626' }}
          >
            {trend.delta >= 0 ? '+' : ''}
            {trend.delta}
            {trend.suffix ?? ''}
          </span>
        )}
      </div>
    </div>
  );
}
