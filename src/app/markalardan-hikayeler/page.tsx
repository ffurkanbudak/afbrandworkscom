import type { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';
import { BrandStoryCard, type BrandStoryRow } from './_components/BrandStoryCard';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com';

export const metadata: Metadata = {
  title: 'Markalardan Hikayeler · Afbrandworks',
  description:
    'Global ve yerel markaların stratejik zihin haritası. Her markanın arkasındaki konumlandırma, kuruluş hikayesi, kriz yönetimi ve afbrandworks editoryal yorumu.',
  alternates: { canonical: '/markalardan-hikayeler' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/markalardan-hikayeler`,
    title: 'Markalardan Hikayeler · Afbrandworks',
    description:
      'Global ve yerel markaların stratejik zihin haritası.',
  },
};

export const dynamic = 'force-dynamic';

type Tab = 'all' | 'global' | 'local';

function sectorSlug(s: string): string {
  return s
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u')
    .replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export default async function MarkalarPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; sector?: string }>;
}) {
  const sp = await searchParams;
  const tab: Tab = sp.tab === 'global' ? 'global' : sp.tab === 'local' ? 'local' : 'all';
  const sectorFilter = sp.sector ? String(sp.sector) : null;

  const where = {
    status: 'PUBLISHED' as const,
    ...(tab === 'global' ? { origin: 'GLOBAL' as const } : {}),
    ...(tab === 'local' ? { origin: 'LOCAL' as const } : {}),
  };

  const stories = await db.brandStory.findMany({
    where,
    orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
    take: 300,
  });

  const sectorSet = new Map<string, string>();
  for (const s of stories) {
    if (s.sector) sectorSet.set(sectorSlug(s.sector), s.sector);
  }
  const sectors = Array.from(sectorSet.entries()).sort((a, b) => a[1].localeCompare(b[1], 'tr'));
  const activeSectorLabel = sectorFilter && sectorSet.get(sectorFilter);

  const filtered: BrandStoryRow[] = stories
    .filter((s) => !sectorFilter || sectorSlug(s.sector) === sectorFilter)
    .map((s) => ({
      slug: s.slug,
      name: s.name,
      sector: s.sector,
      positioning: s.positioning,
      headquartersCity: s.headquartersCity,
      headquartersCountry: s.headquartersCountry,
      foundedYear: s.foundedYear,
      origin: s.origin,
      logoUrl: s.logoUrl,
      coverImageUrl: s.coverImageUrl,
    }));

  return (
    <div className="fade-up pt-10 md:pt-16">
      <header className="mx-auto max-w-[780px] text-center">
        <p
          className="text-[11px] font-semibold tracking-[0.14em] uppercase"
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          Markalardan Hikayeler
        </p>
        <h1 className="font-display mt-4 text-[40px] leading-[1.04] tracking-tight md:text-[54px]">
          Her markanın arkasında bir strateji vardır.
        </h1>
        <p
          className="mx-auto mt-5 max-w-[58ch] text-[16px] leading-[1.65]"
          style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
        >
          Global ve yerel markaların kuruluş hikayesi, krizleri, dönüm noktaları
          ve afbrandworks editoryal yorumuyla inşa çerçevesi. Liste değil,
          stratejik zihin haritası.
        </p>
      </header>

      <nav
        aria-label="Sekmeler"
        className="mx-auto mt-10 flex max-w-[400px] items-center justify-center gap-1 rounded-[10px] border p-1"
        style={{ borderColor: 'var(--border)' }}
      >
        <TabChip href={buildUrl('all', sectorFilter)} label="Tümü" active={tab === 'all'} />
        <TabChip href={buildUrl('global', sectorFilter)} label="Global" active={tab === 'global'} />
        <TabChip href={buildUrl('local', sectorFilter)} label="Yerel" active={tab === 'local'} />
      </nav>

      {sectors.length > 0 && (
        <div className="mx-auto mt-6 max-w-[1200px]">
          <div className="no-scrollbar flex flex-wrap items-center justify-center gap-1.5">
            <SectorChip
              href={buildUrl(tab, null)}
              label="Tüm sektörler"
              active={!sectorFilter}
            />
            {sectors.map(([slug, label]) => (
              <SectorChip
                key={slug}
                href={buildUrl(tab, slug)}
                label={label}
                active={sectorFilter === slug}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto mt-10 max-w-[1200px]">
        {filtered.length === 0 ? (
          <p
            className="rounded-[12px] border p-8 text-center text-[13.5px]"
            style={{
              borderColor: 'var(--border)',
              color: 'color-mix(in oklab, var(--fg) 60%, transparent)',
            }}
          >
            {activeSectorLabel
              ? `${activeSectorLabel} sektöründe henüz yayında marka yok.`
              : 'Henüz yayında marka yok.'}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((r) => (
              <BrandStoryCard key={r.slug} row={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function buildUrl(tab: Tab, sector: string | null): string {
  const p = new URLSearchParams();
  if (tab !== 'all') p.set('tab', tab);
  if (sector) p.set('sector', sector);
  const qs = p.toString();
  return qs ? `/markalardan-hikayeler?${qs}` : '/markalardan-hikayeler';
}

function TabChip({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className="flex-1 rounded-[7px] px-3 py-2 text-center text-[12.5px] font-semibold transition"
      style={{
        background: active ? 'var(--fg)' : 'transparent',
        color: active ? 'var(--bg)' : 'var(--fg)',
      }}
    >
      {label}
    </Link>
  );
}

function SectorChip({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className="rounded-[6px] border px-2.5 py-1 text-[12px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
      style={{
        borderColor: active ? 'var(--fg)' : 'var(--border)',
        background: active ? 'color-mix(in oklab, var(--fg) 7%, transparent)' : 'transparent',
        fontWeight: active ? 600 : 500,
        color: 'var(--fg)',
      }}
    >
      {label}
    </Link>
  );
}
