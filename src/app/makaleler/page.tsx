import fs from 'node:fs/promises';
import path from 'node:path';
import Link from 'next/link';
import type { Metadata } from 'next';
import { db } from '@/lib/db';
import { TAXONOMY } from '@/lib/tags';
import { PostListItem } from '@/components/PostListItem';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');
const YAZAR = 'Ahmet Furkan Budak';

export const metadata: Metadata = {
  title: 'Makaleler',
  description:
    'Ahmet Furkan Budak’ın markalaşma, konumlandırma, farklılaşma ve büyüme üzerine yazdığı tüm makaleler.',
  alternates: { canonical: '/makaleler' },
  openGraph: {
    type: 'website',
    url: '/makaleler',
    title: 'Makaleler · Ahmet Furkan Budak',
    description: 'Markalaşma, konumlandırma ve büyüme üzerine tüm makaleler.',
  },
};

type Makale = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: Date | string | null;
  authorName: string;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  etiketler: { slug: string; labelTr: string }[];
};

/** Yayındaki yazılar veritabanından gelir. */
async function veritabanindanOku(): Promise<Makale[]> {
  const posts = await db.post.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    include: { author: true, tags: { include: { tag: true } } },
  });
  return posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    publishedAt: p.publishedAt,
    authorName: p.author?.name ?? YAZAR,
    coverImageUrl: p.coverImageUrl,
    coverImageAlt: p.coverImageAlt,
    etiketler: p.tags.map(({ tag }) => ({ slug: tag.slug, labelTr: tag.labelTr })),
  }));
}

/**
 * Veritabanı erişilemezse (ör. DATABASE_URL tanımsız yerel ortam) depodaki
 * content/posts dışa aktarımı okunur; sayfa yine tüm yazıları gösterir.
 */
async function depodanOku(): Promise<Makale[]> {
  const klasor = path.join(process.cwd(), 'content', 'posts');
  const dosyalar = (await fs.readdir(klasor)).filter((f) => f.endsWith('.json'));
  const etiketAdi = new Map(TAXONOMY.map((t) => [t.slug, t.labelTr]));
  const yazilar = await Promise.all(
    dosyalar.map(async (f) => {
      const d = JSON.parse(await fs.readFile(path.join(klasor, f), 'utf8'));
      return {
        id: d.slug,
        slug: d.slug,
        title: d.title,
        excerpt: d.excerpt ?? '',
        publishedAt: d.publishedAt ?? null,
        authorName: YAZAR,
        coverImageUrl: d.coverImageUrl ?? null,
        coverImageAlt: d.coverImageAlt ?? null,
        etiketler: ((d.tags ?? []) as string[]).map((slug) => ({
          slug,
          labelTr: etiketAdi.get(slug) ?? slug,
        })),
      } satisfies Makale;
    }),
  );
  return yazilar.sort(
    (a, b) => new Date(b.publishedAt ?? 0).getTime() - new Date(a.publishedAt ?? 0).getTime(),
  );
}

export default async function MakalelerPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const tumu = await veritabanindanOku().catch(() => depodanOku().catch(() => []));

  // Yalnızca en az bir yazısı olan etiketler, yazı sayısına göre sıralı.
  const sayac = new Map<string, { slug: string; labelTr: string; adet: number }>();
  for (const m of tumu) {
    for (const e of m.etiketler) {
      const k = sayac.get(e.slug) ?? { ...e, adet: 0 };
      k.adet += 1;
      sayac.set(e.slug, k);
    }
  }
  const etiketler = [...sayac.values()].sort((a, b) => b.adet - a.adet);
  const aktif = tag ? sayac.get(tag) : undefined;
  const makaleler = aktif ? tumu.filter((m) => m.etiketler.some((e) => e.slug === tag)) : tumu;

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Makaleler',
    itemListElement: makaleler.slice(0, 20).map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/posts/${m.slug}`,
      name: m.title,
    })),
  };

  const pill =
    'inline-flex shrink-0 items-center whitespace-nowrap rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition';

  return (
    <div className="fade-up pt-10 pb-8 md:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <header className="max-w-[62ch]">
        <h1
          className="font-display text-[32px] leading-[1.05] tracking-tight md:text-[44px]"
          style={{ fontWeight: 800 }}
        >
          {aktif ? aktif.labelTr : 'Makaleler'}
        </h1>
        <p
          className="mt-3 text-[15px] leading-[1.65]"
          style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)', fontWeight: 300 }}
        >
          Markalaşma, konumlandırma ve büyüme üzerine yazdığım tüm makaleler.
        </p>
      </header>

      {etiketler.length > 0 && (
        <nav aria-label="Etiketler" className="mt-8">
          {/* Telefonda tek satırda yatay kayar; geniş ekranda satırlara sarar. */}
          <ul className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
            <li>
              <Link
                href="/makaleler"
                className={pill}
                style={
                  aktif
                    ? { borderColor: 'var(--border)', color: 'color-mix(in oklab, var(--fg) 75%, transparent)' }
                    : { borderColor: 'var(--fg)', background: 'var(--fg)', color: 'var(--bg)' }
                }
              >
                Tümü
              </Link>
            </li>
            {etiketler.map((e) => {
              const secili = aktif?.slug === e.slug;
              return (
                <li key={e.slug}>
                  <Link
                    href={`/makaleler?tag=${e.slug}`}
                    className={pill}
                    style={
                      secili
                        ? { borderColor: 'var(--fg)', background: 'var(--fg)', color: 'var(--bg)' }
                        : { borderColor: 'var(--border)', color: 'color-mix(in oklab, var(--fg) 75%, transparent)' }
                    }
                  >
                    {e.labelTr}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      <section className="mt-6">
        {makaleler.length === 0 ? (
          <p className="py-10 text-[15px]" style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}>
            Bu etikette henüz yazı yok.
          </p>
        ) : (
          makaleler.map((m) => (
            <PostListItem
              key={m.id}
              slug={m.slug}
              title={m.title}
              excerpt={m.excerpt}
              publishedAt={m.publishedAt}
              authorName={m.authorName}
              coverImageUrl={m.coverImageUrl}
              coverImageAlt={m.coverImageAlt}
              primaryTag={m.etiketler[0]?.labelTr}
            />
          ))
        )}
      </section>
    </div>
  );
}
