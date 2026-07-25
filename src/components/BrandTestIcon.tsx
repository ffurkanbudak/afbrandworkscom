import type { BrandTest } from '@/lib/brand-tests';

/*
 * Notion tarzı, elle çizilmiş hissi veren özel duotone ikonlar.
 * Zemin ve çerçeve, testin ana renginden türetilir.
 */

function SproutGlyph({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[56%] w-[56%]" aria-hidden>
      <path d="M12 20.5v-7" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <path
        d="M12 13.5C12 9.3 9 6.8 4.8 6.8c0 4.2 3 6.7 7.2 6.7Z"
        fill={color}
        fillOpacity={0.22}
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <path
        d="M12 11.2c0-3.1 2.4-5.7 6.4-5.7 0 3.7-2.4 5.7-6.4 5.7Z"
        fill={color}
        fillOpacity={0.22}
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <path d="M5.5 20.5h13" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}

function CeilingGlyph({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[56%] w-[56%]" aria-hidden>
      <path
        d="M3.5 4.5h17"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeDasharray="2.6 3"
      />
      <path
        d="M3.5 18.5 9 13l3.5 3.5 7-7"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 9.5h4v4"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="13" r="1.5" fill={color} fillOpacity={0.28} />
    </svg>
  );
}

function ScaleGlyph({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[56%] w-[56%]" aria-hidden>
      <rect
        x="9.3"
        y="9.3"
        width="5.4"
        height="5.4"
        rx="1.2"
        fill={color}
        fillOpacity={0.28}
        stroke={color}
        strokeWidth={1.5}
      />
      <path d="M4 9V5.6A1.6 1.6 0 0 1 5.6 4H9" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <path d="M15 4h3.4A1.6 1.6 0 0 1 20 5.6V9" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <path d="M20 15v3.4a1.6 1.6 0 0 1-1.6 1.6H15" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <path d="M9 20H5.6A1.6 1.6 0 0 1 4 18.4V15" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}

const GLYPHS: Record<BrandTest['icon'], (p: { color: string }) => React.ReactElement> = {
  sprout: SproutGlyph,
  gauge: CeilingGlyph,
  rocket: ScaleGlyph,
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
        background: `color-mix(in oklab, ${test.color} 13%, transparent)`,
        border: `1px solid color-mix(in oklab, ${test.color} 34%, transparent)`,
      }}
    >
      <Glyph color={test.color} />
    </div>
  );
}
