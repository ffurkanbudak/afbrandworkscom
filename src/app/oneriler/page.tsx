import Link from 'next/link';
import {
  ArrowUpRight,
  BookOpen,
  Calendar,
  Headphones,
  PlayCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Öneriler · Kitap, Podcast, Video, Etkinlik',
  description:
    'Marka stratejisi, iletişim ve yönetim düşüncesini besleyen kitap, podcast, video ve etkinlik önerileri. Ahmet Furkan Budak seçkisi.',
  keywords: [
    'markalaşma kitapları',
    'marka stratejisi kitap önerileri',
    'pazarlama podcastleri',
    'marka konferansları',
    'marka etkinlikleri',
  ],
  alternates: { canonical: '/oneriler' },
  openGraph: {
    type: 'website',
    url: '/oneriler',
    title: 'Öneriler · Ahmet Furkan Budak',
    description: 'Kitap, podcast, video, etkinlik.',
  },
};

type Section = {
  href: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  meta: string;
};

const SECTIONS: Section[] = [
  {
    href: '/oneriler/kitaplar',
    title: 'Kitaplar',
    desc: 'Konumlandırma, strateji ve iletişim düşüncesinin omurgasını kuran seçki.',
    icon: BookOpen,
    meta: 'Okuma listesi',
  },
  {
    href: '/oneriler/podcastler',
    title: 'Podcastler',
    desc: 'Uzun biçimli sohbetler; pazarlama, girişimcilik ve yönetim perspektifi.',
    icon: Headphones,
    meta: 'Dinlenesi sohbetler',
  },
  {
    href: '/oneriler/videolar',
    title: 'Videolar',
    desc: 'Konferans konuşmaları, analizler ve arşivlik yayın kayıtları.',
    icon: PlayCircle,
    meta: 'Arşivlik yayınlar',
  },
  {
    href: '/oneriler/etkinlikler',
    title: 'Etkinlikler',
    desc: 'Zirveler, paneller ve atölyeler; takvime eklemeye değer buluşmalar.',
    icon: Calendar,
    meta: 'Takvimdeki buluşmalar',
  },
];

export default function OnerilerPage() {
  return (
    <div className="fade-up pt-10 md:pt-16">
      <section className="max-w-[780px]">
        <p className="eyebrow">Öneriler</p>
        <h1 className="font-display mt-3 text-[36px] leading-[1.04] tracking-tight md:text-[48px] lg:text-[56px]">
          Düşünceyi besleyen seçki.
        </h1>
        <p
          className="mt-7 max-w-[58ch] text-[19px] leading-[1.55] md:text-[20px]"
          style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
        >
          Markalaşma, strateji ve iletişim üzerine çalışırken kendi düşüncemi
          keskinleştirdiğim kaynaklar. Kitap, podcast, video ve etkinlik
          başlıkları altında zamanla büyüyen bir koleksiyon.
        </p>
      </section>

      <section className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        {SECTIONS.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.href}
              href={s.href}
              className="group relative flex flex-col justify-between gap-10 rounded-[12px] border p-7 transition hover:-translate-y-0.5"
              style={{
                borderColor: 'var(--border)',
                background:
                  'color-mix(in oklab, var(--fg) 2.5%, transparent)',
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-[10px]"
                  style={{
                    background:
                      'color-mix(in oklab, var(--fg) 6%, transparent)',
                  }}
                >
                  <Icon className="h-[20px] w-[20px]" strokeWidth={1.75} />
                </span>
                <ArrowUpRight
                  className="h-[18px] w-[18px] opacity-40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-90"
                  strokeWidth={1.75}
                />
              </div>

              <div>
                <p
                  className="text-[12px] font-semibold tracking-[0.14em] uppercase"
                  style={{
                    color: 'color-mix(in oklab, var(--fg) 55%, transparent)',
                  }}
                >
                  {s.meta}
                </p>
                <h2 className="font-display mt-2 text-[26px] leading-[1.12] tracking-tight md:text-[30px]">
                  {s.title}
                </h2>
                <p
                  className="mt-3 max-w-[42ch] text-[15.5px] leading-[1.6]"
                  style={{
                    color: 'color-mix(in oklab, var(--fg) 68%, transparent)',
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
