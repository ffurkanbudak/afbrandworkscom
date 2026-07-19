import type { Metadata } from 'next';
import { Play, Youtube } from 'lucide-react';
import {
  fetchYouTubeVideos,
  fetchYouTubeSubscribers,
  YOUTUBE_CHANNEL,
  YOUTUBE_CHANNEL_URL,
} from '@/lib/youtube';
import { formatDateCaps } from '@/lib/format';
import { YtThumb } from '@/components/YtThumb';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

export const metadata: Metadata = {
  title: 'Videolar · Marka ve Strateji',
  description:
    'Ahmet Furkan Budak’ın YouTube kanalı: marka stratejisi, konumlandırma, pazarlama ve girişimcilik üzerine videolar.',
  alternates: { canonical: '/videolar' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/videolar`,
    title: 'Videolar · Ahmet Furkan Budak',
    description: 'Marka, pazarlama ve strateji üzerine videolar.',
  },
};

export const revalidate = 3600;

export default async function VideolarPage() {
  const [videos, subscribers] = await Promise.all([
    fetchYouTubeVideos(24),
    fetchYouTubeSubscribers(),
  ]);

  const jsonLd =
    videos.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Ahmet Furkan Budak — Videolar',
          itemListElement: videos.map((v, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'VideoObject',
              name: v.title,
              thumbnailUrl: v.thumbnail,
              uploadDate: v.publishedAt.toISOString(),
              url: v.url,
              embedUrl: `https://www.youtube.com/embed/${v.id}`,
              publisher: { '@id': `${SITE_URL}/#organization` },
              author: { '@id': `${SITE_URL}/#person` },
            },
          })),
        }
      : null;

  const subs = subscribers ?? YOUTUBE_CHANNEL.subscribersFallback;
  const meta = [subs, videos.length > 0 ? `${videos.length} video` : null].filter(Boolean);

  return (
    <div className="fade-up pt-8 md:pt-12">
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}

      {/* Kanal banner */}
      <div
        className="h-[120px] rounded-[18px] md:h-[170px]"
        style={{
          background:
            'linear-gradient(115deg, #1a1a1a 0%, #2a1010 45%, #FF0000 130%)',
        }}
        aria-hidden
      />

      {/* Kanal başlığı */}
      <div className="flex flex-col gap-5 px-1 sm:flex-row sm:items-end sm:justify-between md:px-3">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={YOUTUBE_CHANNEL.avatar}
            alt={YOUTUBE_CHANNEL.name}
            className="-mt-14 h-[112px] w-[112px] shrink-0 rounded-full border-4 object-cover md:-mt-16 md:h-[136px] md:w-[136px]"
            style={{ borderColor: 'var(--bg)', background: 'var(--bg)' }}
          />
          <div className="min-w-0 pb-1 pt-1 sm:pt-4">
            <h1 className="font-display text-[30px] font-bold leading-[1.05] tracking-[-0.025em] md:text-[40px]">
              {YOUTUBE_CHANNEL.name}
              <span style={{ color: '#FF0000' }}>.</span>
            </h1>
            <p
              className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px]"
              style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
            >
              <span className="font-medium" style={{ color: 'var(--fg)' }}>
                {YOUTUBE_CHANNEL.handle}
              </span>
              {meta.map((m) => (
                <span key={m} className="inline-flex items-center gap-2">
                  <span className="opacity-40">·</span>
                  {m}
                </span>
              ))}
            </p>
            <p
              className="mt-2.5 max-w-[62ch] text-[14.5px] leading-[1.55]"
              style={{ color: 'color-mix(in oklab, var(--fg) 66%, transparent)' }}
            >
              {YOUTUBE_CHANNEL.description}
            </p>
          </div>
        </div>

        <a
          href={YOUTUBE_CHANNEL_URL}
          target="_blank"
          rel="noreferrer"
          className="btn-red inline-flex shrink-0 items-center gap-2 self-start rounded-[8px] px-5 py-2.5 text-[13.5px] font-medium sm:self-auto"
        >
          <Youtube className="h-[16px] w-[16px]" strokeWidth={2} />
          Abone Ol
        </a>
      </div>

      {/* Videolar */}
      {videos.length > 0 ? (
        <section className="mt-10 border-t pt-8" style={{ borderColor: 'var(--border)' }}>
          <p className="eyebrow">Videolar</p>
          <ul className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <li key={v.id}>
                <a
                  href={v.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group block"
                  style={{ color: 'var(--fg)' }}
                >
                  <div
                    className="relative aspect-video w-full overflow-hidden rounded-[12px] border"
                    style={{ borderColor: 'var(--border)', background: 'color-mix(in oklab, var(--fg) 5%, transparent)' }}
                  >
                    <YtThumb id={v.id} />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-full transition group-hover:scale-110"
                        style={{ background: 'rgba(0,0,0,0.6)' }}
                      >
                        <Play className="h-5 w-5 translate-x-[1px] text-white" fill="#fff" strokeWidth={0} />
                      </span>
                    </span>
                  </div>
                  <p
                    className="mt-3 text-[10.5px] font-semibold tracking-[0.1em] uppercase"
                    style={{ color: 'color-mix(in oklab, var(--fg) 52%, transparent)' }}
                  >
                    {formatDateCaps(v.publishedAt)}
                  </p>
                  <h2 className="font-display mt-1.5 line-clamp-2 text-[16px] leading-[1.3] tracking-tight group-hover:underline md:text-[17px]">
                    {v.title}
                  </h2>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <a
          href={YOUTUBE_CHANNEL_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-10 flex flex-col items-center justify-center gap-3 rounded-2xl border px-6 py-16 text-center"
          style={{ borderColor: 'var(--border)' }}
        >
          <Youtube className="h-8 w-8" strokeWidth={1.75} style={{ color: '#FF0000' }} />
          <span className="font-display text-[18px] tracking-tight">Videolar YouTube kanalında</span>
        </a>
      )}
    </div>
  );
}
