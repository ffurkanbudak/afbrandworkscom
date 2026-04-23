import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export function renderPillarOg({ eyebrow, title, subtitle }: Props) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: '#ffffff',
          color: '#0a0a0a',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 20,
              letterSpacing: 4,
              textTransform: 'uppercase',
              opacity: 0.7,
            }}
          >
            afbrandworks.com
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 18,
              letterSpacing: 2,
              textTransform: 'uppercase',
              padding: '8px 16px',
              border: '1px solid #0a0a0a',
              borderRadius: 4,
            }}
          >
            Rehber
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: '#dc2204',
              fontWeight: 600,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: title.length > 60 ? 64 : 76,
              lineHeight: 1.05,
              fontWeight: 500,
              letterSpacing: -1.5,
              maxWidth: 1050,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: 26,
                lineHeight: 1.4,
                opacity: 0.68,
                maxWidth: 1050,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            opacity: 0.62,
          }}
        >
          <div style={{ display: 'flex' }}>Ahmet Furkan Budak</div>
          <div style={{ display: 'flex' }}>Stratejik Marka Danışmanı</div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
