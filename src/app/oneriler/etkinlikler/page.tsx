import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Etkinlik Önerileri · Markalaşma ve Strateji',
  description:
    'Markalaşma ve strateji gündemi için takvime eklemeye değer zirve, panel ve atölye önerileri. Ahmet Furkan Budak seçkisi.',
  keywords: ['marka etkinlikleri', 'pazarlama konferansı', 'marka zirvesi', 'strateji paneli'],
  alternates: { canonical: '/oneriler/etkinlikler' },
};

export default function EtkinliklerPage() {
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
        <p className="eyebrow mt-7">Öneriler · Etkinlikler</p>
        <h1 className="font-display mt-3 text-[30px] leading-[1.04] tracking-tight md:text-[40px] lg:text-[46px]">
          Takvimdeki buluşmalar.
        </h1>
        <p
          className="mt-6 max-w-[58ch] text-[18px] leading-[1.6] md:text-[19px]"
          style={{ color: 'color-mix(in oklab, var(--fg) 68%, transparent)' }}
        >
          Zirveler, paneller ve atölyeler. Hem bizzat sahne aldığım hem de
          takibi tavsiye ettiğim markalaşma ve strateji odaklı buluşmalar bu
          sayfada yer alacak.
        </p>
      </section>

      <section
        className="mt-14 flex flex-col items-start gap-5 rounded-[12px] border p-8 md:p-10"
        style={{
          borderColor: 'var(--border)',
          background: 'color-mix(in oklab, var(--fg) 2.5%, transparent)',
        }}
      >
        <span
          className="flex h-11 w-11 items-center justify-center rounded-[10px]"
          style={{ background: 'color-mix(in oklab, var(--fg) 6%, transparent)' }}
        >
          <Calendar className="h-[20px] w-[20px]" strokeWidth={1.75} />
        </span>
        <div>
          <p
            className="text-[12px] font-semibold tracking-[0.14em] uppercase"
            style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
          >
            Hazırlanıyor
          </p>
          <h2 className="font-display mt-2 text-[19px] leading-[1.2] tracking-tight md:text-[22px]">
            Takvim yakında açılıyor.
          </h2>
          <p
            className="mt-3 max-w-[58ch] text-[15.5px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 68%, transparent)' }}
          >
            Yaklaşan etkinlikler bültende paylaşılıyor. Kaçırmamak için abone
            olmak yeterli.
          </p>
        </div>
      </section>
    </div>
  );
}
