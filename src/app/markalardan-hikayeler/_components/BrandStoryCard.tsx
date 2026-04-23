import Link from 'next/link';

export type BrandStoryRow = {
  slug: string;
  name: string;
  sector: string;
  positioning: string;
  headquartersCity: string | null;
  headquartersCountry: string;
  foundedYear: number;
  origin: 'GLOBAL' | 'LOCAL';
  logoUrl: string | null;
  coverImageUrl: string | null;
};

export function BrandStoryCard({ row }: { row: BrandStoryRow }) {
  return (
    <Link
      href={`/markalardan-hikayeler/${row.slug}`}
      className="group block rounded-[12px] border p-5 transition hover:bg-[color-mix(in_oklab,var(--fg)_2%,transparent)]"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="mb-4 flex items-center justify-between">
        <span
          className="rounded-[6px] border px-2 py-[3px] text-[9.5px] font-semibold tracking-[0.12em] uppercase"
          style={{
            borderColor: 'var(--border)',
            color: 'color-mix(in oklab, var(--fg) 80%, transparent)',
          }}
        >
          {row.origin === 'GLOBAL' ? 'Global' : 'Yerel'}
        </span>
        <span
          className="text-[10.5px] font-semibold tracking-[0.1em] uppercase"
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          {row.foundedYear}
        </span>
      </div>
      <div className="flex items-start gap-3">
        {row.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={row.logoUrl}
            alt=""
            loading="lazy"
            className="h-12 w-12 shrink-0 rounded-full border object-cover"
            style={{ background: 'var(--bg-soft)', borderColor: 'var(--border)' }}
          />
        ) : (
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-[15px] font-semibold"
            style={{
              background: 'color-mix(in oklab, var(--fg) 6%, transparent)',
              borderColor: 'var(--border)',
            }}
          >
            {row.name.slice(0, 1).toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="font-display text-[19px] leading-[1.18] tracking-tight">
            {row.name}
          </h3>
          <p
            className="mt-1 text-[11.5px] font-semibold tracking-[0.08em] uppercase"
            style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
          >
            {row.sector}
          </p>
        </div>
      </div>
      {row.positioning && (
        <p
          className="mt-4 line-clamp-3 text-[13.5px] leading-[1.55]"
          style={{ color: 'color-mix(in oklab, var(--fg) 72%, transparent)' }}
        >
          {row.positioning}
        </p>
      )}
    </Link>
  );
}
