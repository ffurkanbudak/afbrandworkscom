import type { ReactNode } from 'react';

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-6 pb-8 border-b" style={{ borderColor: 'var(--border)' }}>
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="font-display mt-2 text-[40px] leading-[1.04] tracking-tight md:text-[46px]">
          {title}
        </h1>
        {description && (
          <p
            className="mt-3 max-w-[58ch] text-[14.5px] leading-[1.55]"
            style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
          >
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

export function SectionHeader({
  title,
  hint,
  actions,
}: {
  title: string;
  hint?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-4">
      <div>
        <h2 className="font-display text-[20px] leading-tight tracking-tight">{title}</h2>
        {hint && (
          <p className="mt-1 text-[12.5px]" style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}>
            {hint}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
