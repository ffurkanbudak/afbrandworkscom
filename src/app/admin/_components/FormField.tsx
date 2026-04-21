import type { ReactNode } from 'react';

export function Field({
  label,
  hint,
  children,
  required,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-2">
        <span className="eyebrow">{label}</span>
        {required && (
          <span className="text-[10px]" style={{ color: '#EA4E0D' }}>
            ·zorunlu
          </span>
        )}
      </span>
      <div className="mt-2">{children}</div>
      {hint && (
        <p
          className="mt-1.5 text-[11.5px] leading-[1.5]"
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          {hint}
        </p>
      )}
    </label>
  );
}

export const inputClass =
  'w-full rounded-[8px] border px-3.5 py-2.5 text-[14px] outline-none transition focus:border-[color-mix(in_oklab,var(--fg)_55%,var(--border))]';

export const inputStyle: React.CSSProperties = {
  borderColor: 'var(--border)',
  background: 'transparent',
  color: 'var(--fg)',
};
