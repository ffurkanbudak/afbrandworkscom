import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Afbrandworks · Markalaşma Günlüğü';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#0a0a0a',
          color: '#ffffff',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div
          style={{
            width: 420,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0a0a0a',
            borderRight: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div
            style={{
              width: 260,
              height: 260,
              background: '#dc2204',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 24px 60px rgba(220,34,4,0.35)',
            }}
          >
            <span
              style={{
                fontSize: 140,
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: -8,
                lineHeight: 1,
                marginTop: -8,
              }}
            >
              afb
            </span>
          </div>
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '70px 80px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              letterSpacing: 4,
              opacity: 0.65,
              textTransform: 'uppercase',
            }}
          >
            afbrandworks.com
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div
              style={{
                fontSize: 78,
                lineHeight: 1.02,
                fontWeight: 500,
                letterSpacing: -2,
              }}
            >
              Afbrandworks
            </div>
            <div
              style={{
                fontSize: 34,
                lineHeight: 1.25,
                opacity: 0.88,
                maxWidth: 640,
              }}
            >
              Markalaşma Günlüğü · Ahmet Furkan Budak
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: 20, opacity: 0.5 }}>
            Konumlandırma · Farklılaşma · Sürdürülebilir Büyüme
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
