import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { formatDateCaps } from '@/lib/format';

type Item = {
  id: string;
  titleTr: string | null;
  originalTitle: string;
  summaryTr: string | null;
  publishedAt: Date;
  imageUrl: string | null;
  source: { name: string; logoUrl: string | null; language: 'EN' | 'TR' };
};

export function HomeNewsGrid({ items }: { items: Item[] }) {
  if (items.length === 0) return null;

  return (
    <section className="mt-20">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Gündem</p>
          <h2 className="font-display mt-3 text-[26px] leading-[1.12] tracking-tight md:text-[32px]">
            Markalaşma dünyasından taze haberler
          </h2>
        </div>
        <Link
          href="/gundem"
          className="hidden shrink-0 items-center gap-1.5 text-[14px] font-medium md:inline-flex"
          style={{ color: 'var(--fg)' }}
        >
          Tüm gündem
          <ArrowRight className="h-[13px] w-[13px]" strokeWidth={2.25} />
        </Link>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((n) => (
          <li key={n.id}>
            <Link
              href={`/gundem/${n.id}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_14px_28px_-18px_rgba(0,0,0,0.28)]"
              style={{ borderColor: 'var(--border)' }}
            >
              <div
                className="relative aspect-[16/10] w-full overflow-hidden"
                style={{
                  background: n.imageUrl
                    ? 'color-mix(in oklab, var(--fg) 4%, transparent)'
                    : 'linear-gradient(150deg, color-mix(in oklab, var(--fg) 7%, transparent) 0%, color-mix(in oklab, var(--fg) 2%, transparent) 65%, transparent 100%)',
                }}
              >
                {n.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={n.imageUrl}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    {n.source.logoUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={n.source.logoUrl}
                        alt=""
                        className="h-8 w-8 rounded-[6px] opacity-30"
                      />
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-center gap-2">
                  {n.source.logoUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={n.source.logoUrl}
                      alt=""
                      className="h-[14px] w-[14px] rounded-[3px]"
                    />
                  )}
                  <span
                    lang="en"
                    className="text-[10.5px] font-semibold tracking-[0.12em] uppercase"
                    style={{ color: 'color-mix(in oklab, var(--fg) 58%, transparent)' }}
                  >
                    {n.source.name}
                  </span>
                </div>

                <h3 className="font-display mt-2.5 line-clamp-3 text-[15px] leading-[1.3] tracking-tight">
                  {n.titleTr ?? n.originalTitle}
                </h3>

                <div
                  className="mt-auto flex items-center justify-between gap-2 pt-3 text-[10.5px]"
                  style={{ color: 'color-mix(in oklab, var(--fg) 50%, transparent)' }}
                >
                  <span>{formatDateCaps(n.publishedAt)}</span>
                  <ArrowUpRight
                    className="h-[11px] w-[11px] transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
                    strokeWidth={1.85}
                  />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6 md:hidden">
        <Link
          href="/gundem"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium"
          style={{ color: 'var(--fg)' }}
        >
          Tüm gündem
          <ArrowRight className="h-[12px] w-[12px]" strokeWidth={2.25} />
        </Link>
      </div>
    </section>
  );
}
