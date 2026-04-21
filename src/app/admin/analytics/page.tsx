import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { db } from '@/lib/db';
import { PageHeader, SectionHeader } from '../_components/PageHeader';
import { StatCard } from '../_components/StatCard';
import { DataTable, Th, Td } from '../_components/DataTable';
import { TIER_LABEL, TIER_ORDER } from '../_lib/tier';

const COUNTRY_LABEL: Record<string, string> = {
  TR: 'Türkiye', US: 'ABD', DE: 'Almanya', GB: 'Birleşik Krallık',
  NL: 'Hollanda', FR: 'Fransa', AZ: 'Azerbaycan', KZ: 'Kazakistan',
  UZ: 'Özbekistan', AE: 'BAE', SA: 'Suudi Arabistan', CA: 'Kanada',
  IT: 'İtalya', ES: 'İspanya', BE: 'Belçika', SE: 'İsveç',
  AT: 'Avusturya', CH: 'İsviçre', CY: 'Kıbrıs', RU: 'Rusya',
};

export default async function AnalyticsPage() {
  const now = new Date();
  const since7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const since30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const since1 = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const [
    views7,
    views30,
    views1,
    topPostsRaw,
    countriesRaw,
    tiersRaw,
    activePosts,
    activeSubs,
    subsRecent,
  ] = await Promise.all([
    db.postView.count({ where: { createdAt: { gte: since7 } } }),
    db.postView.count({ where: { createdAt: { gte: since30 } } }),
    db.postView.count({ where: { createdAt: { gte: since1 } } }),
    db.postView.groupBy({
      by: ['postId'],
      where: { createdAt: { gte: since30 } },
      _count: { postId: true },
      orderBy: { _count: { postId: 'desc' } },
      take: 10,
    }),
    db.postView.groupBy({
      by: ['country'],
      where: { createdAt: { gte: since30 } },
      _count: { country: true },
      orderBy: { _count: { country: 'desc' } },
      take: 12,
    }),
    db.subscriber.groupBy({
      by: ['tier'],
      where: { status: 'CONFIRMED' },
      _count: { tier: true },
    }),
    db.post.count({ where: { status: 'PUBLISHED' } }),
    db.subscriber.count({ where: { status: 'CONFIRMED' } }),
    db.subscriber.count({ where: { status: 'CONFIRMED', createdAt: { gte: since30 } } }),
  ]);

  const topPostIds = topPostsRaw.map((p) => p.postId);
  const topPostsMeta = topPostIds.length
    ? await db.post.findMany({
        where: { id: { in: topPostIds } },
        select: { id: true, title: true, slug: true, viewCount: true },
      })
    : [];
  const topPostsMap = new Map(topPostsMeta.map((p) => [p.id, p]));
  const topPosts = topPostsRaw.map((p) => ({
    id: p.postId,
    count: p._count.postId,
    meta: topPostsMap.get(p.postId),
  }));

  const countryTotal = countriesRaw.reduce((acc, c) => acc + c._count.country, 0);
  const tierMap = new Map(tiersRaw.map((t) => [t.tier, t._count.tier]));

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Ölçüm"
        title="Analitik"
        description="Okunan sayfalar, aktif ülkeler, topluluk dağılımı."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Bugünkü okuma" value={views1.toLocaleString('tr-TR')} hint="Son 24 saat" />
        <StatCard label="Haftalık okuma" value={views7.toLocaleString('tr-TR')} hint="Son 7 gün" accent />
        <StatCard label="Aylık okuma" value={views30.toLocaleString('tr-TR')} hint="Son 30 gün" />
        <StatCard
          label="Aktif abone"
          value={activeSubs.toLocaleString('tr-TR')}
          hint={`Son 30 günde +${subsRecent} yeni`}
        />
      </div>

      <section>
        <SectionHeader title="En çok okunan yazılar" hint="Son 30 gün · okuma sayısına göre" />
        {topPosts.length === 0 ? (
          <EmptyRow text="Henüz ölçümlenmiş bir okuma yok." />
        ) : (
          <DataTable
            colCount={3}
            head={
              <>
                <Th>Yazı</Th>
                <Th className="text-right">30 gün</Th>
                <Th className="text-right">Toplam</Th>
              </>
            }
          >
            {topPosts.map(({ id, count, meta }) => (
              <tr key={id}>
                <Td>
                  {meta ? (
                    <Link
                      href={`/admin/posts/${id}/edit`}
                      className="inline-flex items-center gap-1 font-medium hover:underline"
                    >
                      {meta.title}
                      <ArrowUpRight className="h-[12px] w-[12px]" strokeWidth={2} />
                    </Link>
                  ) : (
                    <span style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}>
                      (silinmiş yazı)
                    </span>
                  )}
                </Td>
                <Td className="text-right tabular-nums">{count.toLocaleString('tr-TR')}</Td>
                <Td className="text-right tabular-nums">
                  {meta ? meta.viewCount.toLocaleString('tr-TR') : '·'}
                </Td>
              </tr>
            ))}
          </DataTable>
        )}
        <p
          className="mt-3 text-[11.5px]"
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          Yayındaki yazı sayısı: {activePosts}.
        </p>
      </section>

      <div className="grid gap-10 lg:grid-cols-2">
        <section>
          <SectionHeader title="Ülke dağılımı" hint="Son 30 gün okumaları" />
          {countriesRaw.length === 0 ? (
            <EmptyRow text="Henüz konum verisi yok." />
          ) : (
            <div
              className="rounded-2xl border p-5"
              style={{ borderColor: 'var(--border)' }}
            >
              <ul className="space-y-3">
                {countriesRaw.map((row) => {
                  const code = row.country ?? '—';
                  const count = row._count.country;
                  const pct = countryTotal > 0 ? (count / countryTotal) * 100 : 0;
                  return (
                    <li key={code}>
                      <div className="flex items-baseline justify-between text-[13px]">
                        <span className="font-medium">
                          {COUNTRY_LABEL[code] ?? code}
                          <span
                            className="ml-2 text-[11px]"
                            style={{ color: 'color-mix(in oklab, var(--fg) 50%, transparent)' }}
                          >
                            {code}
                          </span>
                        </span>
                        <span className="tabular-nums">
                          {count.toLocaleString('tr-TR')} · {pct.toFixed(1)}%
                        </span>
                      </div>
                      <div
                        className="mt-1.5 h-[4px] w-full overflow-hidden rounded-full"
                        style={{ background: 'color-mix(in oklab, var(--fg) 8%, transparent)' }}
                      >
                        <div
                          className="h-full"
                          style={{ width: `${pct}%`, background: 'var(--fg)' }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </section>

        <section>
          <SectionHeader title="Topluluk dağılımı" hint="Aktif abonelerin kademeleri" />
          <div
            className="rounded-2xl border p-5"
            style={{ borderColor: 'var(--border)' }}
          >
            <ul className="space-y-3">
              {TIER_ORDER.map((tier) => {
                const count = tierMap.get(tier) ?? 0;
                const pct = activeSubs > 0 ? (count / activeSubs) * 100 : 0;
                return (
                  <li key={tier}>
                    <div className="flex items-baseline justify-between text-[13px]">
                      <span className="font-medium">{TIER_LABEL[tier]}</span>
                      <span className="tabular-nums">
                        {count.toLocaleString('tr-TR')} · {pct.toFixed(1)}%
                      </span>
                    </div>
                    <div
                      className="mt-1.5 h-[4px] w-full overflow-hidden rounded-full"
                      style={{ background: 'color-mix(in oklab, var(--fg) 8%, transparent)' }}
                    >
                      <div
                        className="h-full"
                        style={{ width: `${pct}%`, background: 'var(--fg)' }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

function EmptyRow({ text }: { text: string }) {
  return (
    <div
      className="rounded-2xl border px-5 py-8 text-[13px]"
      style={{
        borderColor: 'var(--border)',
        color: 'color-mix(in oklab, var(--fg) 55%, transparent)',
      }}
    >
      {text}
    </div>
  );
}
