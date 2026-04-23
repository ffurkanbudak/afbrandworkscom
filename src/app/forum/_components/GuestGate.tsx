import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function GuestGate({ variant }: { variant: 'list' | 'post' }) {
  return (
    <div
      className="mx-auto my-10 max-w-[540px] rounded-[14px] border p-7 text-center md:p-10"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-soft)' }}
    >
      <p
        className="text-[11px] font-semibold tracking-[0.14em] uppercase"
        style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
      >
        Topluluk
      </p>
      <h3 className="font-display mt-3 text-[22px] leading-[1.15] md:text-[26px]">
        {variant === 'list'
          ? 'Bu konuşmaları görmek için topluluğa katılın.'
          : 'Bu konuşmayı görmek için topluluğa katılın.'}
      </h3>
      <p
        className="mx-auto mt-4 max-w-[44ch] text-[13.5px] leading-[1.6]"
        style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
      >
        Forumda markalaşma, pazarlama, girişimcilik ve iletişim üzerine
        kurucuların sohbetleri yürüyor. Tam erişim için ücretsiz Gözlemci
        paketiyle başlayabilirsiniz.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
        <Link
          href="/sign-up"
          className="inline-flex items-center justify-center gap-2 rounded-[8px] px-5 py-3 text-[13.5px] font-semibold transition hover:opacity-90"
          style={{ background: 'var(--fg)', color: 'var(--bg)' }}
        >
          Kaydol
          <ArrowRight className="h-[13px] w-[13px]" strokeWidth={2.25} />
        </Link>
        <Link
          href="/uyelik"
          className="inline-flex items-center justify-center rounded-[8px] border px-5 py-3 text-[13px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
          style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
        >
          Paketleri incele
        </Link>
      </div>
    </div>
  );
}
