import type { Metadata } from 'next';
import { SponsorshipForm } from './SponsorshipForm';

export const metadata: Metadata = {
  title: 'Sponsor Ol',
  description:
    'Markalaşma günlüğüne sponsor olmak isteyen kurumlar için başvuru formu.',
};

export default function SponsorshipPage() {
  return (
    <div className="fade-up pt-10 md:pt-16">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr]">
        <section>
          <p className="eyebrow">Sponsorluk</p>
          <h1 className="font-display mt-3 text-[36px] leading-[1.04] tracking-tight md:text-[48px] lg:text-[56px]">
            Ortak yolculuk.
          </h1>

          <div
            className="mt-7 max-w-[56ch] space-y-5 text-[17px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
          >
            <p>
              Bu günlük; markalaşmaya, girişimci ekosistemine ve Türk dünyasının
              ekonomik gündemine ilgi duyan nitelikli bir okuyucu topluluğu
              tarafından takip ediliyor. Küçük ama etkili.
            </p>
            <p>
              Ürününüzü ya da markanızı bu topluluğa tanıtmak istiyorsanız;
              yazılar, bülten yerleşimleri ve uzun soluklu işbirlikleri üzerinden
              konuşabiliriz. Değerlendirme, birebir görüşmeyle ilerler.
            </p>
          </div>

          <ul
            className="mt-10 space-y-2 text-[13px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
          >
            <li>· Bülten yerleşimi (sabit ya da kampanyalı)</li>
            <li>· Podcast & röportaj sponsorlukları</li>
            <li>· Etkinlik ve içerik işbirlikleri</li>
          </ul>
        </section>

        <section
          className="rounded-[12px] p-7 md:p-10"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <p className="eyebrow">Sponsor Talebi</p>
          <h2 className="font-display mt-3 text-[26px] leading-[1.15] tracking-tight">
            Markanızı anlatın.
          </h2>
          <div className="mt-7">
            <SponsorshipForm />
          </div>
        </section>
      </div>
    </div>
  );
}
