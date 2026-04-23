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
      className="group block overflow-hidden rounded-[12px] border transition hover:bg-[color-mix(in_oklab,var(--fg)_2%,transparent)]"
      style={{ borderColor: 'var(--border)' }}
    >
      <div
        className="relative aspect-[5/3] w-full overflow-hidden"
        style={{ background: 'var(--bg-soft)' }}
      >
        {row.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={row.coverImageUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(at 30% 30%, color-mix(in oklab, var(--fg) 10%, transparent) 0%, transparent 55%)',
            }}
          />
        )}
        <span
          className="absolute top-3 left-3 rounded-[6px] border px-2 py-[3px] text-[9.5px] font-semibold tracking-[0.12em] uppercase"
          style={{
            background: 'var(--bg)',
            borderColor: 'var(--border)',
            color: 'color-mix(in oklab, var(--fg) 80%, transparent)',
          }}
        >
          {row.origin === 'GLOBAL' ? 'Global' : 'Yerel'}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start gap-3">
          {row.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={row.logoUrl}
              alt=""
              loading="lazy"
              className="h-10 w-10 shrink-0 rounded-full border object-cover"
              style={{ background: 'var(--bg-soft)', borderColor: 'var(--border)' }}
            />
          ) : (
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-[13px] font-semibold"
              style={{
                background: 'color-mix(in oklab, var(--fg) 6%, transparent)',
                borderColor: 'var(--border)',
              }}
            >
              {row.name.slice(0, 1).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="font-display text-[18px] leading-[1.18] tracking-tight">
              {row.name}
            </h3>
            <p
              className="mt-1 text-[11.5px] font-semibold tracking-[0.08em] uppercase"
              style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
            >
              {row.sector} · {row.foundedYear}
            </p>
          </div>
        </div>
        {row.positioning && (
          <p
            className="mt-4 line-clamp-3 text-[13.5px] leading-[1.55]"
            style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
          >
            {row.positioning}
          </p>
        )}
      </div>
    </Link>
  );
}
