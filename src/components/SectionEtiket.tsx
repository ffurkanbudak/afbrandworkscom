import type { CSSProperties, ReactNode } from 'react';

/**
 * Bölüm başlığının üstünde duran küçük, yuvarlak köşeli etiket kutusu.
 * koyu: siyah bölümler · acik: beyaz bölümler · tema: sitenin açık/koyu temasını izler.
 * Renkler satır içi verilir; derlenmiş CSS'e bağlı kalmaz.
 */
const TEMALAR: Record<'koyu' | 'acik' | 'tema', CSSProperties> = {
  koyu: { borderColor: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.78)', background: 'rgba(255,255,255,0.05)' },
  acik: { borderColor: 'rgba(10,10,10,0.14)', color: 'rgba(10,10,10,0.72)', background: '#FFFFFF' },
  tema: {
    borderColor: 'color-mix(in oklab, var(--fg) 16%, transparent)',
    color: 'color-mix(in oklab, var(--fg) 72%, transparent)',
    background: 'var(--bg)',
  },
};

export function SectionEtiket({
  children,
  tema,
  ortali = true,
}: {
  children: ReactNode;
  tema: 'koyu' | 'acik' | 'tema';
  ortali?: boolean;
}) {
  return (
    <div className={ortali ? 'mb-4 flex justify-center' : 'mb-4 flex'}>
      <span
        className="inline-flex items-center gap-2 whitespace-nowrap px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em]"
        style={{ ...TEMALAR[tema], borderWidth: 1, borderStyle: 'solid', borderRadius: 10 }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#DC2626' }} aria-hidden />
        {children}
      </span>
    </div>
  );
}
