import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Ahmet Furkan Budak · Stratejik Marka Danışmanı';
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
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: '#0a0a0a',
          color: '#ffffff',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 24, letterSpacing: 4, opacity: 0.7, textTransform: 'uppercase' }}>
          afbrandworks.com
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 88, lineHeight: 1.05, fontWeight: 500, letterSpacing: -2 }}>
            Ahmet Furkan Budak
          </div>
          <div style={{ fontSize: 36, lineHeight: 1.3, opacity: 0.85, maxWidth: 900 }}>
            Stratejik Marka Danışmanı · Markalaşma Günlüğü
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 22, opacity: 0.55 }}>
          Konumlandırma · Farklılaşma · Sürdürülebilir Büyüme
        </div>
      </div>
    ),
    { ...size },
  );
}
