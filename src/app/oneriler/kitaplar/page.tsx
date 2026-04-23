import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com';

export const metadata: Metadata = {
  title: 'Kitap Önerileri · Markalaşma',
  description:
    'Konumlandırma, marka stratejisi ve iletişim düşüncesinin omurgasını oluşturan kitap önerileri. Ahmet Furkan Budak seçkisi.',
  keywords: ['markalaşma kitapları', 'marka stratejisi kitapları', 'konumlandırma kitabı', 'pazarlama kitapları'],
  alternates: { canonical: '/oneriler/kitaplar' },
};

type Book = { title: string; author: string; publisher: string };
type Collection = { category: string; books: Book[] };

const COLLECTIONS: Collection[] = [
  {
    category: 'Konumlandırma ve Marka Psikolojisi',
    books: [
      { title: 'Positioning: Zihinlere Yerleşmenin Savaşı', author: 'Al Ries & Jack Trout', publisher: 'MediaCat Yayınları' },
      { title: 'Etki: İknanın Psikolojisi', author: 'Robert Cialdini', publisher: 'MediaCat Yayınları' },
      { title: 'Hızlı ve Yavaş Düşünme', author: 'Daniel Kahneman', publisher: 'Varlık Yayınları' },
      { title: 'Akıldışı Ama Öngörülebilir', author: 'Dan Ariely', publisher: 'Optimist Yayınları' },
      { title: 'Kanca', author: 'Nir Eyal', publisher: 'Aganta Yayınları' },
      { title: 'Pazarlamanın 22 Değişmez Kuralı', author: 'Al Ries & Jack Trout', publisher: 'MediaCat Yayınları' },
    ],
  },
  {
    category: 'Hikâye, İçerik ve Viral Büyüme',
    books: [
      { title: 'Kalıcı Fikirler', author: 'Chip Heath & Dan Heath', publisher: 'MediaCat Yayınları' },
      { title: 'Bulaşıcı', author: 'Jonah Berger', publisher: 'Optimist Yayınları' },
      { title: 'Tüm Pazarlamacılar Yalancıdır', author: 'Seth Godin', publisher: 'MediaCat Yayınları' },
      { title: 'İzin Pazarlaması', author: 'Seth Godin', publisher: 'Rota Yayınları' },
      { title: 'Made in Future', author: 'Ian Rogers', publisher: 'MediaCat Yayınları' },
      { title: 'Büyüme Korsanlığı', author: 'Sean Ellis & Morgan Brown', publisher: 'Buzdağı Yayınevi' },
    ],
  },
  {
    category: 'Strateji ve İnovasyon',
    books: [
      { title: 'Kazanmak İçin Oyna', author: 'A.G. Lafley & Roger Martin', publisher: 'Optimist Yayınları' },
      { title: 'İyi Strateji Kötü Strateji', author: 'Richard Rumelt', publisher: 'The Kitap Yayınları' },
      { title: 'Yenilikçinin İkilemi', author: 'Clayton Christensen', publisher: 'Optimist Yayınları' },
      { title: 'Sıfırdan Bire', author: 'Peter Thiel', publisher: 'Pegasus Yayınları' },
      { title: '7 Adımda Stratejik Düşünme', author: 'Roger Martin', publisher: 'The Kitap Yayınları' },
      { title: 'Rekabet Stratejisi', author: 'Michael Porter', publisher: 'Sistem Yayıncılık' },
    ],
  },
  {
    category: 'Liderlik ve Yönetim',
    books: [
      { title: 'Yüksek Verimli Yönetim', author: 'Andy Grove', publisher: 'Buzdağı Yayınevi' },
      { title: 'Zor Şeylerin Zorluğu', author: 'Ben Horowitz', publisher: 'Buzdağı Yayınevi' },
      { title: 'Etkin Yönetici', author: 'Peter Drucker', publisher: 'Optimist Yayınları' },
      { title: 'Liderler Son Yer', author: 'Simon Sinek', publisher: 'Aganta Yayınları' },
      { title: 'Neden ile Başla', author: 'Simon Sinek', publisher: 'MediaCat Yayınları' },
      { title: 'Ölçeklenme', author: 'Verne Harnish', publisher: 'Optimist Yayınları' },
    ],
  },
  {
    category: 'Satış ve Müşteri',
    books: [
      { title: 'SPIN Satış', author: 'Neil Rackham', publisher: 'Optimist Yayınları' },
      { title: 'Meydan Okuyan Satıcı', author: 'Matthew Dixon & Brent Adamson', publisher: 'Optimist Yayınları' },
      { title: 'Sadakatsiz Müşteri', author: 'Fred Reichheld', publisher: 'MediaCat Yayınları' },
      { title: 'Asla Bölüşme', author: 'Chris Voss', publisher: 'Pegasus Yayınları' },
      { title: 'Yeniden Satış', author: 'Jeb Blount', publisher: 'Optimist Yayınları' },
      { title: 'Müşteri Deneyimi', author: 'Matt Watkinson', publisher: 'MediaCat Yayınları' },
    ],
  },
  {
    category: 'Dijital Çağ ve Yeni Ekonomi',
    books: [
      { title: 'Platform Devrimi', author: 'Geoffrey Parker', publisher: 'Optimist Yayınları' },
      { title: 'Yalın Başlangıç', author: 'Eric Ries', publisher: 'Optimist Yayınları' },
      { title: 'Girişimcinin El Kitabı', author: 'Steve Blank', publisher: 'Optimist Yayınları' },
      { title: 'Subscribed: Abonelik Ekonomisi', author: 'Tien Tzuo', publisher: 'The Kitap Yayınları' },
      { title: 'Trillion Dollar Coach', author: 'Eric Schmidt', publisher: 'Buzdağı Yayınevi' },
      { title: 'No Rules Rules: Netflix Kültürü', author: 'Reed Hastings & Erin Meyer', publisher: 'Buzdağı Yayınevi' },
    ],
  },
];

function pad(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

export default function KitaplarPage() {
  const totalBooks = COLLECTIONS.reduce((n, c) => n + c.books.length, 0);

  const allBooks = COLLECTIONS.flatMap((c) => c.books.map((b) => ({ ...b, category: c.category })));

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}/oneriler/kitaplar#list`,
    name: 'Markalaşma ve Strateji Okuma Listesi',
    numberOfItems: totalBooks,
    itemListElement: allBooks.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Book',
        name: b.title,
        author: { '@type': 'Person', name: b.author },
        publisher: { '@type': 'Organization', name: b.publisher },
        inLanguage: 'tr',
        genre: b.category,
      },
    })),
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/oneriler/kitaplar#collection`,
    url: `${SITE_URL}/oneriler/kitaplar`,
    name: 'Markalaşma Kitapları · Okuma Listesi',
    inLanguage: 'tr-TR',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntity: { '@id': `${SITE_URL}/oneriler/kitaplar#list` },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Öneriler', item: `${SITE_URL}/oneriler` },
      { '@type': 'ListItem', position: 3, name: 'Kitaplar', item: `${SITE_URL}/oneriler/kitaplar` },
    ],
  };

  return (
    <div className="fade-up pt-10 md:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="max-w-[780px]">
        <Link
          href="/oneriler"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium"
          style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
        >
          <ArrowLeft className="h-[13px] w-[13px]" strokeWidth={2} />
          Tüm önerilere dön
        </Link>
        <p className="eyebrow mt-7">Öneriler · Kitaplar</p>
        <h1 className="font-display mt-3 text-[36px] leading-[1.04] tracking-tight md:text-[48px] lg:text-[56px]">
          Okuma listesi.
        </h1>
        <p
          className="mt-6 max-w-[58ch] text-[18px] leading-[1.6] md:text-[19px]"
          style={{ color: 'color-mix(in oklab, var(--fg) 68%, transparent)' }}
        >
          Strateji düşüncesinin, konumlandırma pratiğinin ve marka iletişiminin
          temellerini genişleten; tekrar tekrar dönmeye değer kitaplar. Aşağıdaki
          koleksiyon, altı başlık altında {totalBooks} kitabı bir araya getiriyor.
        </p>
      </section>

      <div className="mt-20 space-y-24">
        {COLLECTIONS.map((c, ci) => (
          <section key={c.category}>
            <div className="flex items-baseline gap-5 border-b pb-6" style={{ borderColor: 'var(--border)' }}>
              <span
                className="font-mono text-[13px] tabular-nums"
                style={{ color: 'color-mix(in oklab, var(--fg) 45%, transparent)' }}
              >
                {pad(ci + 1)}
              </span>
              <h2 className="font-display text-[26px] leading-[1.12] tracking-tight md:text-[32px]">
                {c.category}
              </h2>
            </div>

            <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
              {c.books.map((b, bi) => (
                <li key={`${c.category}-${bi}`} className="group flex gap-5">
                  <span
                    className="font-mono text-[12px] tabular-nums pt-[3px]"
                    style={{ color: 'color-mix(in oklab, var(--fg) 40%, transparent)' }}
                  >
                    {pad(bi + 1)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className="font-display text-[18px] leading-[1.28] tracking-tight md:text-[19px]"
                      style={{ color: 'var(--fg)' }}
                    >
                      {b.title}
                    </p>
                    <p
                      className="mt-1.5 text-[13.5px] leading-[1.55]"
                      style={{ color: 'color-mix(in oklab, var(--fg) 62%, transparent)' }}
                    >
                      {b.author}
                      <span className="mx-2 opacity-55">·</span>
                      <span style={{ color: 'color-mix(in oklab, var(--fg) 50%, transparent)' }}>
                        {b.publisher}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section
        className="mt-24 rounded-[12px] border p-8 md:p-10"
        style={{
          borderColor: 'var(--border)',
          background: 'color-mix(in oklab, var(--fg) 2.5%, transparent)',
        }}
      >
        <p
          className="text-[12px] font-semibold tracking-[0.14em] uppercase"
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          Not
        </p>
        <h2 className="font-display mt-2 text-[22px] leading-[1.2] tracking-tight md:text-[26px]">
          Koleksiyon zamanla genişliyor.
        </h2>
        <p
          className="mt-3 max-w-[60ch] text-[15.5px] leading-[1.65]"
          style={{ color: 'color-mix(in oklab, var(--fg) 68%, transparent)' }}
        >
          Liste, yeni bir başlık eklendiğinde güncellenir. Bültene kayıtlı
          okurlar yeniliklerden ilk haberdar olanlar arasında olur.
        </p>
      </section>
    </div>
  );
}
