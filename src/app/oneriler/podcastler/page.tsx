import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Podcast Önerileri · Pazarlama ve Strateji',
  description:
    'Pazarlama, girişimcilik ve yönetim düşüncesi üzerine dinlemeye değer uzun biçimli podcast önerileri. Ahmet Furkan Budak seçkisi.',
  keywords: ['pazarlama podcasti', 'girişimcilik podcasti', 'strateji podcasti', 'iş dünyası podcast'],
  alternates: { canonical: '/oneriler/podcastler' },
};

const SHOWS: string[] = [
  '1qYBUYkp5LRb1Sj0JfZLXW',
  '5ZavqjLuzDk7b2FxTrQOE8',
  '69CrvJvDXdhEPQQuSlXCyT',
  '1rCeqPdviUG61ucnpFDl6n',
  '2NQZF7yOjIpLfi86lLPAVg',
];

const EPISODES: string[] = [
  '035NOmKic4K7CqhJnIzEOZ',
  '4BFW3vuzSHfLGhQp9wt6FT',
  '4EKykT5iscD0zquoqvNy9A',
  '6SXvrlcWqwVwSr9VKMojZc',
  '0bFVGv2ZbQ2r8OWIQYVAr8',
  '2xm45qh9SOPFlzRKcs203K',
  '1X3aiUTUCqB39hKaxG9B0u',
  '1Uz6L9zdC2v1AgR4O3yS2c',
  '1IhAcMpWoMhrpyvovhDkjV',
  '35M4A9N1yyvZ7NlPjsCj3x',
  '4XvFypFJqUnAPkHdJWDX6g',
  '2dkqSLzgewSAe5cG5wsnnO',
  '4GGTJLx3NKZAfTqeAHxLQa',
  '53q79BEv4eOsNDvQexpv3c',
  '1wXpQi28PR7Kd538KkHyaI',
];

export default function PodcastlerPage() {
  return (
    <div className="fade-up pt-10 md:pt-16">
      <section className="max-w-[780px]">
        <Link
          href="/oneriler"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium"
          style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
        >
          <ArrowLeft className="h-[13px] w-[13px]" strokeWidth={2} />
          Tüm önerilere dön
        </Link>
        <p className="eyebrow mt-7">Öneriler · Podcastler</p>
        <h1 className="font-display mt-3 text-[30px] leading-[1.04] tracking-tight md:text-[40px] lg:text-[46px]">
          Dinlenesi sohbetler.
        </h1>
        <p
          className="mt-6 max-w-[58ch] text-[18px] leading-[1.6] md:text-[19px]"
          style={{ color: 'color-mix(in oklab, var(--fg) 68%, transparent)' }}
        >
          Strateji, iletişim ve girişimcilik düşüncesini uzun soluklu
          konuşmalarla genişleten yayınlar. Aşağıda takip edilmeye değer
          seriler ve öne çıkan bölümler yer alıyor.
        </p>
      </section>

      <section className="mt-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Takip Edilecek Seriler</p>
            <h2 className="font-display mt-3 text-[22px] leading-[1.12] tracking-tight md:text-[27px]">
              Tek başına okuma listesi kuran yayınlar
            </h2>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SHOWS.map((id) => (
            <iframe
              key={id}
              src={`https://open.spotify.com/embed/show/${id}?utm_source=generator&theme=0`}
              width="100%"
              height={352}
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              style={{ border: 0, display: 'block', background: 'var(--bg)', colorScheme: 'normal' }}
              title={`Spotify podcast ${id}`}
            />
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Seçili Bölümler</p>
            <h2 className="font-display mt-3 text-[22px] leading-[1.12] tracking-tight md:text-[27px]">
              Önerilen kayıtlar
            </h2>
            <p
              className="mt-4 max-w-[58ch] text-[15.5px] leading-[1.65]"
              style={{ color: 'color-mix(in oklab, var(--fg) 68%, transparent)' }}
            >
              Strateji, marka ve girişimcilik üzerine altını çizdiğim konuşmalar.
              Kısa bir dinleyiş sırasıyla, yolda ya da masa başında eşlik
              edebilecek bölümler.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {EPISODES.map((id) => (
            <iframe
              key={id}
              src={`https://open.spotify.com/embed/episode/${id}?utm_source=generator&theme=0`}
              width="100%"
              height={152}
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              style={{ border: 0, display: 'block', background: 'var(--bg)', colorScheme: 'normal' }}
              title={`Spotify bölüm ${id}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
