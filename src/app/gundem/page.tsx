import { ArrowUpRight } from 'lucide-react';
import { db } from '@/lib/db';
import { formatDateCaps } from '@/lib/format';
import { NewsCard, HeroNewsCard } from './NewsCard';

export const metadata = {
  title: 'Gündem',
  description:
    'Dünyadan ve Türkiye\'den markalaşma haberleri. Editör tarafından Türkçeleştirilip özetlenir, orijinal kaynağa bağlantıyla yayımlanır.',
};

export const revalidate = 600;

export default async function GundemPage() {
  const items = await db.newsItem.findMany({
    where: { status: 'APPROVED' },
    include: { source: true },
    orderBy: [{ approvedAt: 'desc' }, { publishedAt: 'desc' }],
    take: 60,
  });

  const [hero, ...rest] = items;
  const latestTs = hero?.approvedAt ?? hero?.publishedAt ?? null;

  return (
    <div className="fade-up pt-10 md:pt-16">
      <section className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[780px]">
          <p className="eyebrow">Gündem</p>
          <h1 className="font-display mt-3 text-[36px] leading-[1.04] tracking-tight md:text-[48px] lg:text-[56px]">
            Dünyadan markalaşma haberleri.
          </h1>
          <p
            className="mt-6 max-w-[58ch] text-[18px] leading-[1.6]"
            style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
          >
            Küresel ve Türkiye merkezli yayın kuruluşlarından seçtiğim markalaşma ve pazarlama
            haberleri. Her başlığı okuyup kısa bir Türkçe özet yazıyorum; tam metin için
            orijinal kaynağa bağlantı veriyorum.
          </p>
        </div>
        {latestTs && (
          <div
            className="shrink-0 rounded-[10px] border px-4 py-3"
            style={{ borderColor: 'var(--border)' }}
          >
            <p
              className="text-[10px] font-semibold tracking-[0.18em] uppercase"
              style={{ color: 'color-mix(in oklab, var(--fg) 48%, transparent)' }}
            >
              Son güncelleme
            </p>
            <p className="mt-1 text-[13px] font-semibold tracking-tight">
              {formatDateCaps(latestTs)}
            </p>
            <p
              className="mt-0.5 text-[11.5px]"
              style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
            >
              {items.length} haber · {uniqueSources(items)} kaynak
            </p>
          </div>
        )}
      </section>

      {items.length === 0 ? (
        <div
          className="mt-16 rounded-2xl border px-6 py-14 text-center"
          style={{
            borderColor: 'var(--border)',
            color: 'color-mix(in oklab, var(--fg) 55%, transparent)',
          }}
        >
          <p className="text-[14px]">Henüz onaylanmış haber yok.</p>
          <p
            className="mx-auto mt-1 max-w-[42ch] text-[12.5px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 42%, transparent)' }}
          >
            Kaynaklardan toplanan başlıklar incelemeden geçer geçmez burada olacak.
          </p>
        </div>
      ) : (
        <>
          {hero && (
            <section
              className="mt-14 border-t pt-10"
              style={{ borderColor: 'var(--border)' }}
            >
              <p
                className="eyebrow mb-6 flex items-center gap-2"
                style={{ color: 'color-mix(in oklab, var(--fg) 52%, transparent)' }}
              >
                <span
                  className="inline-block h-[1px] w-6"
                  style={{ background: 'color-mix(in oklab, var(--fg) 35%, transparent)' }}
                />
                Öne çıkan
              </p>
              <HeroNewsCard item={hero} />
            </section>
          )}

          {rest.length > 0 && (
            <section
              className="mt-14 border-t pt-10"
              style={{ borderColor: 'var(--border)' }}
            >
              <p
                className="eyebrow mb-8 flex items-center gap-2"
                style={{ color: 'color-mix(in oklab, var(--fg) 52%, transparent)' }}
              >
                <span
                  className="inline-block h-[1px] w-6"
                  style={{ background: 'color-mix(in oklab, var(--fg) 35%, transparent)' }}
                />
                Kısa haberler
              </p>
              <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {rest.map((n) => (
                  <li key={n.id}>
                    <NewsCard item={n} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}

      <section
        className="mt-20 flex items-start gap-3 border-t pt-6 text-[12px] leading-[1.65]"
        style={{
          borderColor: 'var(--border)',
          color: 'color-mix(in oklab, var(--fg) 50%, transparent)',
        }}
      >
        <ArrowUpRight
          className="mt-[2px] h-[12px] w-[12px] shrink-0 opacity-60"
          strokeWidth={1.85}
        />
        <p>
          Bu sayfada yalnızca kısa Türkçe özetler ve tam metne yönlendiren bağlantılar yer alır.
          Haber metinleri ve görselleri orijinal yayın kuruluşlarına aittir. Kaldırma talepleri
          için iletişime geçin.
        </p>
      </section>
    </div>
  );
}

function uniqueSources(items: Array<{ source: { id: string } }>): number {
  return new Set(items.map((i) => i.source.id)).size;
}
