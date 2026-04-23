import Link from 'next/link';
import { ArrowRight, Bookmark, Compass, Layers } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { db } from '@/lib/db';

import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com';

export const metadata: Metadata = {
  title: 'Konular · Markalaşma',
  description:
    'Markalaşmanın tüm başlıkları: konumlandırma, farklılaşma, marka mimarisi, iletişim. Sektör, disiplin ve vaka çalışmaları kategorilerinde.',
  keywords: [
    'marka konuları',
    'markalaşma kategorileri',
    'konumlandırma',
    'farklılaşma',
    'marka mimarisi',
    'büyüme mimarisi',
    'marka iletişimi',
  ],
  alternates: { canonical: '/konular' },
  openGraph: {
    type: 'website',
    url: '/konular',
    title: 'Markalaşma Konuları · Ahmet Furkan Budak',
    description: 'Sektör, disiplin ve vaka çalışmaları.',
  },
};

const GROUP_LABEL: Record<string, string> = {
  SECTOR: 'Sektörler',
  DISCIPLINE: 'Disiplinler',
  CASE_STUDY: 'Vaka çalışmaları',
};

const GROUP_INTRO: Record<string, string> = {
  SECTOR: 'Markalaşmanın sektörel farklılaştığı noktalar.',
  DISCIPLINE: 'Yöntem ve çerçeve odaklı kategoriler.',
  CASE_STUDY: 'Gerçek markalar, uygulanmış kararlar.',
};

const GROUP_ICON: Record<string, LucideIcon> = {
  SECTOR: Compass,
  DISCIPLINE: Layers,
  CASE_STUDY: Bookmark,
};

export default async function TopicsPage() {
  const [tags, countsRaw] = await Promise.all([
    db.tag.findMany({ orderBy: [{ group: 'asc' }, { order: 'asc' }] }),
    db.postTag.groupBy({
      by: ['tagId'],
      _count: { _all: true },
    }),
  ]);

  const counts = new Map(countsRaw.map((c) => [c.tagId, c._count._all]));
  const grouped = new Map<string, typeof tags>();
  for (const t of tags) {
    const arr = grouped.get(t.group) ?? [];
    arr.push(t);
    grouped.set(t.group, arr);
  }

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/konular#collection`,
    url: `${SITE_URL}/konular`,
    name: 'Markalaşma Konuları',
    description:
      'Markalaşmanın tüm başlıkları: konumlandırma, farklılaşma, marka mimarisi, iletişim. Sektör, disiplin ve vaka çalışmaları kategorilerinde.',
    inLanguage: 'tr-TR',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}/konular#itemlist`,
    name: 'Markalaşma Kategorileri',
    numberOfItems: tags.length,
    itemListElement: tags.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/posts?tag=${t.slug}`,
      name: t.labelTr,
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Konular', item: `${SITE_URL}/konular` },
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
        <p className="eyebrow">Konular</p>
        <h1 className="font-display mt-3 text-[36px] leading-[1.04] tracking-tight md:text-[48px] lg:text-[56px]">
          Markalaşmanın kategorileri.
        </h1>
        <p
          className="mt-6 max-w-[58ch] text-[18px] leading-[1.6]"
          style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
        >
          Konumlandırmadan farklılaşmaya, büyüme mimarisinden marka iletişimine
          her başlık bir çerçeve sunuyor. İlgi alanınıza göre arşive girin.
        </p>
      </section>

      {tags.length === 0 ? (
        <p
          className="mt-16 text-[16px]"
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        >
          Henüz kategori tanımlanmamış.
        </p>
      ) : (
        <div className="mt-16 space-y-16">
          {Array.from(grouped.entries()).map(([group, items]) => (
            <section
              key={group}
              className="grid gap-10 border-t pt-10 md:grid-cols-[1fr_2fr]"
              style={{ borderColor: 'var(--border)' }}
            >
              <div>
                <p className="eyebrow">{GROUP_LABEL[group] ?? group}</p>
                <p
                  className="mt-4 max-w-[32ch] text-[15px] leading-[1.55]"
                  style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
                >
                  {GROUP_INTRO[group] ?? ''}
                </p>
              </div>
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {items.map((t) => {
                  const count = counts.get(t.id) ?? 0;
                  const Icon = GROUP_ICON[t.group] ?? Layers;
                  return (
                    <li key={t.id}>
                      <Link
                        href={`/posts?tag=${t.slug}`}
                        className="group flex items-center justify-between rounded-[8px] border px-4 py-3.5 transition hover:bg-[color-mix(in_oklab,var(--fg)_4%,transparent)]"
                        style={{ borderColor: 'var(--border)' }}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px]"
                            style={{
                              background: 'color-mix(in oklab, var(--fg) 4%, transparent)',
                              color: 'color-mix(in oklab, var(--fg) 75%, transparent)',
                            }}
                          >
                            <Icon className="h-[14px] w-[14px]" strokeWidth={1.75} />
                          </span>
                          <div>
                            <p className="text-[15px] font-medium leading-[1.25] tracking-tight">
                              {t.labelTr}
                            </p>
                            <p
                              className="mt-0.5 text-[11.5px] font-semibold tracking-[0.1em] uppercase"
                              style={{ color: 'color-mix(in oklab, var(--fg) 50%, transparent)' }}
                            >
                              {count} yazı
                            </p>
                          </div>
                        </div>
                        <ArrowRight
                          className="h-[15px] w-[15px] transition group-hover:translate-x-0.5"
                          strokeWidth={1.75}
                          style={{ color: 'color-mix(in oklab, var(--fg) 48%, transparent)' }}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
