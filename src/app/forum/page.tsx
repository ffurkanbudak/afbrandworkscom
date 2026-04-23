import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Forum · Afbrandworks',
  description:
    'Markalaşma, pazarlama, girişimcilik ve iletişim üzerine topluluk sohbetleri. Yakında.',
  alternates: { canonical: '/forum' },
};

export default function ForumPage() {
  return (
    <div className="fade-up mx-auto max-w-[720px] pt-10 text-center md:pt-24">
      <p
        className="text-[11px] font-semibold tracking-[0.14em] uppercase"
        style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
      >
        Forum
      </p>
      <h1 className="font-display mt-4 text-[40px] leading-[1.05] tracking-tight md:text-[52px]">
        Topluluk sohbeti yakında açılıyor.
      </h1>
      <p
        className="mx-auto mt-6 max-w-[52ch] text-[16px] leading-[1.65]"
        style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
      >
        Markalaşma, pazarlama, girişimcilik ve iletişim üzerine kurucuların
        birbirinden öğrendiği bir düşünce alanı kuruyoruz. Etiket havuzu, bir
        saatlik gecikmeli yayın ve editoryal çerçeve ile.
      </p>
      <Link
        href="/uyelik"
        className="mt-10 inline-flex items-center gap-2 rounded-[8px] px-5 py-3 text-[14px] font-semibold transition hover:opacity-90"
        style={{ background: 'var(--fg)', color: 'var(--bg)' }}
      >
        Üyeliği incele
        <ArrowRight className="h-[13px] w-[13px]" strokeWidth={2.25} />
      </Link>
    </div>
  );
}
