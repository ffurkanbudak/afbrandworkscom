import type { Metadata } from 'next';
import { WriterApplicationForm } from './WriterApplicationForm';

export const metadata: Metadata = {
  title: 'Yazar Başvurusu · Ahmet Furkan Budak',
  description:
    'Markalaşma, girişimcilik ve Türk dünyası üzerine yazmak isteyenler için çağrı. Afbrandworks\'te yayımlanmak üzere yazı başvurusu.',
  keywords: ['yazar ol', 'yazar başvurusu', 'misafir yazar', 'marka yazarlığı', 'içerik üretimi'],
  alternates: { canonical: '/yazar' },
  openGraph: {
    type: 'website',
    url: '/yazar',
    title: 'Yazar Ol · Ahmet Furkan Budak',
    description: 'Markalaşma üzerine yazmak isteyenler için çağrı.',
  },
};

export default function WriterApplyPage() {
  return (
    <div className="fade-up pt-10 md:pt-16">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr]">
        <section>
          <p className="eyebrow">Çağrı</p>
          <h1 className="font-display mt-3 text-[36px] leading-[1.04] tracking-tight md:text-[48px] lg:text-[56px]">
            Yazın. Paylaşalım.
          </h1>

          <div
            className="mt-7 max-w-[56ch] space-y-5 text-[17px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
          >
            <p>
              Markalaşmaya, girişimci ekosistemine ya da Türk dünyasının ekonomik
              katmanlarına dair bir metin yazdıysanız bana iletin. Uygun
              bulduklarım kendi editöryel düzenlemem eşliğinde bu sitede
              yayımlanır.
            </p>
            <p>
              Sıra dışı bir bakış, kişisel bir deneyim ya da saha notu arıyorum.
              Kuramsal bir özet değil, kendi cümlelerinizle kaleme alınmış bir
              düşünce. Başvurunuz üç iş günü içinde yanıtlanır.
            </p>
          </div>

          <ul
            className="mt-10 space-y-2 text-[13px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
          >
            <li>· En az 600 kelimelik bir metin önerisi</li>
            <li>· Kendi deneyiminize ya da gözleminize dayanmalı</li>
            <li>· Yayımlanırsa yazar adı ve bio eşliğinde paylaşılır</li>
          </ul>
        </section>

        <section
          className="rounded-[12px] p-7 md:p-10"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <p className="eyebrow">Başvuru</p>
          <h2 className="font-display mt-3 text-[26px] leading-[1.15] tracking-tight">
            Önerinizi paylaşın.
          </h2>
          <div className="mt-7">
            <WriterApplicationForm />
          </div>
        </section>
      </div>
    </div>
  );
}
