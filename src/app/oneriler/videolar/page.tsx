import Link from 'next/link';
import { ArrowLeft, PlayCircle } from 'lucide-react';

export const metadata = {
  title: 'Video Önerileri',
  description:
    'Konferans konuşmaları, analizler ve arşivlik yayın kayıtları üzerine video önerileri.',
};

export default function VideolarPage() {
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
        <p className="eyebrow mt-7">Öneriler · Videolar</p>
        <h1 className="font-display mt-3 text-[36px] leading-[1.04] tracking-tight md:text-[48px] lg:text-[56px]">
          Arşivlik yayınlar.
        </h1>
        <p
          className="mt-6 max-w-[58ch] text-[18px] leading-[1.6] md:text-[19px]"
          style={{ color: 'color-mix(in oklab, var(--fg) 68%, transparent)' }}
        >
          Konferans konuşmaları, saha analizleri ve uzun biçimli video
          arşivleri. Zamana direnen; birkaç kez izlenip notlar çıkarılmaya
          değer içerikler bu sayfada toplanacak.
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
          <PlayCircle className="h-[20px] w-[20px]" strokeWidth={1.75} />
        </span>
        <div>
          <p
            className="text-[12px] font-semibold tracking-[0.14em] uppercase"
            style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
          >
            Hazırlanıyor
          </p>
          <h2 className="font-display mt-2 text-[22px] leading-[1.2] tracking-tight md:text-[26px]">
            Video arşivi yakında açılıyor.
          </h2>
          <p
            className="mt-3 max-w-[58ch] text-[15.5px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 68%, transparent)' }}
          >
            Seçki; izlenme sırası ve kısa notlarla birlikte hazırlanıyor. Yeni
            bir başlık eklendiğinde bültende paylaşılacak.
          </p>
        </div>
      </section>
    </div>
  );
}
