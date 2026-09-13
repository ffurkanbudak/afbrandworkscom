import { Lightbulb } from 'lucide-react';
import type { BrandTest } from '@/lib/brand-tests';

/*
 * Notion tarzı, kalın ve yuvarlak uçlu çizgilerle çizilmiş beyaz ikonlar.
 * Hafif beyaz dolgu, çizimi tek renkte derinlikli gösterir.
 */

const CIZGI = {
  stroke: '#FFFFFF',
  strokeWidth: 1.9,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};
const DOLGU = { fill: '#FFFFFF', fillOpacity: 0.16 };

/** Marka Kurma: fikir ampulü (Lucide "Lightbulb", ISC lisanslı). */
function IdeaGlyph() {
  return <Lightbulb color="#FFFFFF" strokeWidth={1.9} style={{ width: '60%', height: '60%' }} aria-hidden />;
}

/** Büyüme Engeli: duvarın üzerinden atlayan ok. */
function WallGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "64%", height: "64%" }} aria-hidden>
      <rect x="9.3" y="11" width="5.4" height="9.5" rx="1.2" {...DOLGU} {...CIZGI} />
      <path d="M9.3 14.2h5.4M9.3 17.4h5.4M12 11v3.2M12 17.4v3.1" {...CIZGI} strokeWidth={1.4} />
      <path d="M3.5 20.5C4.5 10.5 8 6.5 12 6.5s7.5 4 8.5 12" {...CIZGI} />
      <path d="M18.2 16.6l2.3 2.3 2-2.6" {...CIZGI} />
    </svg>
  );
}

/** Ölçeklenme: yükselen roket. */
function RocketGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "64%", height: "64%" }} aria-hidden>
      <path d="M12 2.8c3.1 2.3 4.7 5.6 4.7 9.4v3.5H7.3v-3.5c0-3.8 1.6-7.1 4.7-9.4Z" {...DOLGU} {...CIZGI} />
      <circle cx="12" cy="9.6" r="1.8" {...CIZGI} />
      <path d="M7.3 12.6 4.6 15.4v3l2.7-1.3M16.7 12.6l2.7 2.8v3l-2.7-1.3" {...CIZGI} />
      <path d="M10.2 18.4c0 1.4.7 2.4 1.8 3.2 1.1-.8 1.8-1.8 1.8-3.2" {...CIZGI} />
    </svg>
  );
}

const GLYPHS: Record<BrandTest['icon'], () => React.ReactElement> = {
  sprout: IdeaGlyph,
  gauge: WallGlyph,
  rocket: RocketGlyph,
};

export function BrandTestIcon({
  test,
  size = 64,
  radius = 16,
}: {
  test: Pick<BrandTest, 'icon' | 'color' | 'title'>;
  size?: number;
  iconSize?: number;
  radius?: number;
}) {
  const Glyph = GLYPHS[test.icon];
  return (
    <div
      aria-hidden
      className="flex shrink-0 items-center justify-center"
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: 'rgba(255, 255, 255, 0.06)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
      }}
    >
      <Glyph />
    </div>
  );
}
