import { ImageResponse } from 'next/og';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const alt = 'Ahmet Furkan Budak · Markalaşma Günlüğü';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await db.post.findUnique({
    where: { slug: params.slug },
    select: { title: true, subtitle: true, excerpt: true, readingMinutes: true, tags: { include: { tag: true } } },
  });

  const title = post?.title ?? 'Markalaşma Günlüğü';
  const subtitle = post?.subtitle ?? post?.excerpt?.slice(0, 140) ?? '';
  const tag = post?.tags[0]?.tag.labelTr;

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', fontSize: 20, letterSpacing: 4, textTransform: 'uppercase', opacity: 0.7 }}>
            afbrandworks.com
          </div>
          {tag && (
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
              {tag}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: title.length > 80 ? 56 : 72, lineHeight: 1.08, fontWeight: 500, letterSpacing: -1.5, maxWidth: 1050 }}>
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: 28, lineHeight: 1.35, opacity: 0.7, maxWidth: 1050 }}>
              {subtitle}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, opacity: 0.6 }}>
          <div style={{ display: 'flex' }}>Ahmet Furkan Budak</div>
          {post?.readingMinutes && <div style={{ display: 'flex' }}>{post.readingMinutes} dk okuma</div>}
        </div>
      </div>
    ),
    { ...size },
  );
}
