import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hediye Edin · Afbrandworks',
  description:
    'Ortak ve Mimari üyelikleri hediye etme imkanı. Yakında.',
  alternates: { canonical: '/hediye-et' },
};

export default function HediyeEtPage() {
  return (
    <div className="fade-up mx-auto max-w-[720px] pt-10 text-center md:pt-24">
      <p
        className="text-[11px] font-semibold tracking-[0.14em] uppercase"
        style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
      >
        Hediye Edin
      </p>
      <h1 className="font-display mt-4 text-[40px] leading-[1.05] tracking-tight md:text-[52px]">
        Bir üyelik hediye edin.
      </h1>
      <p
        className="mx-auto mt-6 max-w-[52ch] text-[16px] leading-[1.65]"
        style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
      >
        Ortak ve Mimari üyeliklerini sevdiklerinize armağan edebileceğiniz
        hediye sistemi hazırlık aşamasındadır. Ortak ve Mimari paketlerinin
        kendisi açıldığında bu sayfa da devreye girecektir.
      </p>
      <Link
        href="/uyelik"
        className="mt-10 inline-flex items-center gap-2 rounded-[8px] px-5 py-3 text-[14px] font-semibold transition hover:opacity-90"
        style={{ background: 'var(--fg)', color: 'var(--bg)' }}
      >
        Paketleri incele
        <ArrowRight className="h-[13px] w-[13px]" strokeWidth={2.25} />
      </Link>
    </div>
  );
}
