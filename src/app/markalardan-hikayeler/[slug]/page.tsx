import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import { db } from '@/lib/db';
import { ReadingProgress } from '@/components/ReadingProgress';
import { ShareButtons } from '@/components/ShareButtons';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com';

type Decision = { title: string; body: string };

function decisions(raw: unknown): Decision[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (d): d is Decision =>
      !!d &&
      typeof d === 'object' &&
      typeof (d as Decision).title === 'string' &&
      typeof (d as Decision).body === 'string',
  );
}

export async function generateStaticParams() {
  const rows = await db.brandStory.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true },
  });
  return rows.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = await db.brandStory.findUnique({ where: { slug } });
  if (!s || s.status !== 'PUBLISHED') return { title: 'Marka bulunamadı' };
  const title = s.metaTitle ?? `${s.name} · Markalardan Hikayeler`;
  const description = s.metaDescription ?? s.positioning.slice(0, 160);
  const url = `${SITE_URL}/markalardan-hikayeler/${s.slug}`;
  const image = s.coverImageUrl ?? `${SITE_URL}/ahmetfurkanbudak.jpeg`;
  return {
    title,
    description,
    alternates: { canonical: `/markalardan-hikayeler/${s.slug}` },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      siteName: 'Afbrandworks',
      locale: 'tr_TR',
      images: [{ url: image, width: 1200, height: 630, alt: s.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function BrandStoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = await db.brandStory.findUnique({ where: { slug } });
  if (!s || s.status !== 'PUBLISHED') notFound();

  const deciList = decisions(s.strategicDecisions);
  const url = `${SITE_URL}/markalardan-hikayeler/${s.slug}`;

  return (
    <>
      <ReadingProgress />

      <article className="fade-up mx-auto max-w-[780px] pt-8 md:pt-14">
        <Link
          href={`/markalardan-hikayeler?tab=${s.origin === 'GLOBAL' ? 'global' : 'local'}`}
          className="inline-flex items-center gap-1 text-[12px] font-medium"
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        >
          <ArrowLeft className="h-[12px] w-[12px]" strokeWidth={2} />
          Markalardan Hikayeler
        </Link>

        <header className="mt-6">
          <div className="flex items-center gap-3">
            {s.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={s.logoUrl}
                alt=""
                className="h-16 w-16 rounded-full border object-cover"
                style={{ background: 'var(--bg-soft)', borderColor: 'var(--border)' }}
              />
            ) : (
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full border text-[20px] font-semibold"
                style={{
                  background: 'color-mix(in oklab, var(--fg) 6%, transparent)',
                  borderColor: 'var(--border)',
                }}
              >
                {s.name.slice(0, 1).toUpperCase()}
              </div>
            )}
            <div>
              <p
                className="text-[11px] font-semibold tracking-[0.14em] uppercase"
                style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
              >
                {s.origin === 'GLOBAL' ? 'Global' : 'Yerel'} · {s.sector}
              </p>
              <h1 className="font-display mt-2 text-[36px] leading-[1.05] tracking-tight md:text-[46px]">
                {s.name}
              </h1>
            </div>
          </div>

          <div
            className="mt-5 flex flex-wrap items-center gap-4 text-[12.5px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-[12px] w-[12px]" strokeWidth={1.75} />
              {s.headquartersCity ? `${s.headquartersCity}, ` : ''}
              {s.headquartersCountry}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-[12px] w-[12px]" strokeWidth={1.75} />
              Kuruluş {s.foundedYear}
            </span>
          </div>
        </header>

        {s.positioning && (
          <blockquote
            className="mt-12 border-l-2 pl-5 font-display text-[22px] leading-[1.3] tracking-tight md:text-[26px]"
            style={{ borderColor: 'var(--fg)', color: 'var(--fg)' }}
          >
            {s.positioning}
          </blockquote>
        )}

        {s.foundingStory && (
          <Section title="Kuruluş hikayesi">
            <ProseBody>{s.foundingStory}</ProseBody>
          </Section>
        )}

        {s.founderVision && (
          <Section title="Kurucunun vizyonu">
            {s.founderImageUrl && (
              <div className="mb-6 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.founderImageUrl}
                  alt=""
                  className="h-14 w-14 rounded-full border object-cover"
                  style={{ background: 'var(--bg-soft)', borderColor: 'var(--border)' }}
                />
                <span
                  className="text-[12px] font-semibold tracking-[0.1em] uppercase"
                  style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                >
                  Kurucu
                </span>
              </div>
            )}
            <ProseBody>{s.founderVision}</ProseBody>
          </Section>
        )}

        {deciList.length > 0 && (
          <Section title="Markayı ayıran stratejik kararlar">
            <ol className="mt-4 space-y-6">
              {deciList.map((d, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className="mt-[2px] inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[12px] font-semibold tabular-nums"
                    style={{
                      borderColor: 'var(--border)',
                      color: 'color-mix(in oklab, var(--fg) 85%, transparent)',
                    }}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-[17px] leading-[1.25] tracking-tight">
                      {d.title}
                    </p>
                    <p
                      className="mt-2 text-[15px] leading-[1.65]"
                      style={{ color: 'color-mix(in oklab, var(--fg) 78%, transparent)' }}
                    >
                      {d.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {s.crisesAndTurningPoints && (
          <Section title="Krizler ve dönüm noktaları">
            <ProseBody>{s.crisesAndTurningPoints}</ProseBody>
          </Section>
        )}

        {s.currentPosition && (
          <Section title="Günümüzdeki konumu">
            <ProseBody>{s.currentPosition}</ProseBody>
          </Section>
        )}

        {s.editorialNote && (
          <Section title="afbrandworks editoryal yorumu">
            <div
              className="rounded-[12px] border p-5 md:p-7"
              style={{
                borderColor: 'var(--border)',
                background: 'var(--bg-soft)',
              }}
            >
              <p
                className="text-[11px] font-semibold tracking-[0.14em] uppercase"
                style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
              >
                Ahmet Furkan Budak · Analiz
              </p>
              <div className="mt-4">
                <ProseBody>{s.editorialNote}</ProseBody>
              </div>
            </div>
          </Section>
        )}

        <div
          className="mt-14 border-t pt-8"
          style={{ borderColor: 'var(--border)' }}
        >
          <ShareButtons url={url} title={`${s.name} · Markalardan Hikayeler`} />
        </div>
      </article>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14 md:mt-16">
      <h2 className="font-display text-[22px] leading-[1.2] tracking-tight md:text-[26px]">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function ProseBody({ children }: { children: string }) {
  const paragraphs = children.split(/\n\s*\n+/).map((p) => p.trim()).filter(Boolean);
  return (
    <div
      className="space-y-4 text-[16px] leading-[1.75]"
      style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
    >
      {paragraphs.map((p, i) => (
        <p key={i} className="whitespace-pre-line">
          {p}
        </p>
      ))}
    </div>
  );
}
