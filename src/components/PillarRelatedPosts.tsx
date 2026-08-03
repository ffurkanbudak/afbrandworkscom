import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { db } from '@/lib/db';
import { varlikBaglantilariniEkle } from '@/lib/entity-links';
import { formatDateCaps } from '@/lib/format';

/**
 * Bir varlık sayfasına gövde metninden bağlanan yazıları listeler.
 *
 * İlgili yazılar elle seçilmez; yazı gövdelerini bağlayan aynı katman burada
 * ters yönde çalıştırılır. Böylece bir yazı bir kavrama bağlandığı anda o
 * kavramın sayfasında da görünür ve iki yön tek kaynaktan üretilmiş olur.
 */
export async function PillarRelatedPosts({ href, baslik }: { href: string; baslik: string }) {
  const posts = await db.post.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true, title: true, excerpt: true, contentHtml: true, publishedAt: true },
    orderBy: { publishedAt: 'desc' },
  });

  const ilgili = posts
    .filter((p) => varlikBaglantilariniEkle(p.contentHtml).varliklar.some((v) => v.href === href))
    .slice(0, 4);

  if (!ilgili.length) return null;

  return (
    <section className="mx-auto w-full max-w-[1100px] px-6 pb-20 md:px-10">
      <div className="border-t pt-10" style={{ borderColor: 'var(--border)' }}>
        <p
          className="text-[11px] font-semibold tracking-[0.14em] uppercase"
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          Bu konudaki yazılar
        </p>
        <h2 className="font-display mt-3 text-[22px] leading-tight tracking-tight md:text-[26px]">
          {baslik} üzerine yazdıklarım
        </h2>

        <ul className="mt-7 grid gap-5 sm:grid-cols-2">
          {ilgili.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/posts/${p.slug}`}
                className="group flex h-full flex-col rounded-[10px] border p-5 transition hover:bg-[color-mix(in_oklab,var(--fg)_3%,transparent)]"
                style={{ borderColor: 'var(--border)' }}
              >
                <p
                  className="text-[11px] font-medium tracking-[0.04em]"
                  style={{ color: 'color-mix(in oklab, var(--fg) 52%, transparent)' }}
                >
                  {formatDateCaps(p.publishedAt)}
                </p>
                <p className="mt-2 text-[15.5px] font-semibold leading-[1.35] tracking-tight">
                  {p.title}
                </p>
                <p
                  className="mt-2 line-clamp-3 text-[13.5px] leading-[1.55]"
                  style={{ color: 'color-mix(in oklab, var(--fg) 62%, transparent)' }}
                >
                  {p.excerpt}
                </p>
                <span
                  className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium"
                  style={{ color: '#DC2626' }}
                >
                  Yazıyı okuyun
                  <ArrowRight
                    className="h-[13px] w-[13px] transition group-hover:translate-x-0.5"
                    strokeWidth={2.25}
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
