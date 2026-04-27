import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import path from 'node:path';

export const runtime = 'nodejs';
export const alt = 'Afbrandworks · Markalaşma Günlüğü';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const logoPath = path.join(process.cwd(), 'public', 'icon-512.png');
  const logoData = readFileSync(logoPath);
  const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          color: '#ffffff',
          fontFamily: 'Georgia, serif',
          padding: '64px',
        }}
      >
        <img
          src={logoSrc}
          width={280}
          height={280}
          style={{
            borderRadius: 32,
            boxShadow: '0 24px 80px rgba(220,34,4,0.35)',
          }}
        />
        <div
          style={{
            marginTop: 56,
            fontSize: 72,
            lineHeight: 1.05,
            fontWeight: 600,
            letterSpacing: -2,
          }}
        >
          Afbrandworks
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 30,
            lineHeight: 1.3,
            opacity: 0.78,
            textAlign: 'center',
          }}
        >
          Markalaşma Günlüğü · Ahmet Furkan Budak
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 18,
            letterSpacing: 4,
            opacity: 0.5,
            textTransform: 'uppercase',
          }}
        >
          afbrandworks.com
        </div>
      </div>
    ),
    { ...size },
  );
}
