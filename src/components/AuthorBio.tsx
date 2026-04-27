import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

export function AuthorBio() {
  return (
    <aside
      className="mx-auto mt-16 max-w-[680px] rounded-[14px] border p-6 md:p-8"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-soft)' }}
      aria-label="Yazar hakkında"
    >
      <div className="flex items-start gap-4">
        <div
          className="relative h-[80px] w-[80px] shrink-0 overflow-hidden rounded-full"
          style={{
            boxShadow: '0 0 0 1px var(--border)',
          }}
        >
          <Image
            src="/ahmetfurkanbudak.jpeg"
            alt="Ahmet Furkan Budak"
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p
            className="text-[11px] font-semibold tracking-[0.14em] uppercase"
            style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
          >
            Yazar
          </p>
          <h3 className="font-display mt-1.5 text-[22px] leading-[1.15] tracking-tight md:text-[24px]">
            Ahmet Furkan Budak
          </h3>
          <p
            className="mt-1 text-[12.5px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
          >
            Stratejik Marka Danışmanı · Fo. Toganworks
          </p>
        </div>
      </div>

      <p
        className="mt-5 text-[14.5px] leading-[1.65]"
        style={{ color: 'color-mix(in oklab, var(--fg) 80%, transparent)' }}
      >
        Markalaşma, konumlandırma, marka kimliği ve iletişim stratejisi üzerine
        yazar. Toganworks danışmanlık ofisinin kurucusu olarak markalara
        stratejik danışmanlık verir; markalaşma odaklı bir podcast yayını
        yürütür ve genç marka profesyonellerine mentorluk eder.
      </p>

      <div
        className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-5"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="flex items-center gap-1">
          <a
            href="https://www.linkedin.com/in/ahmetfurkanbudak/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-8 w-8 items-center justify-center rounded-[6px] transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
            style={{ color: 'color-mix(in oklab, var(--fg) 75%, transparent)' }}
          >
            <Linkedin className="h-[14px] w-[14px]" strokeWidth={1.75} />
          </a>
          <a
            href="https://www.instagram.com/afbrandworks"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="flex h-8 w-8 items-center justify-center rounded-[6px] transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
            style={{ color: 'color-mix(in oklab, var(--fg) 75%, transparent)' }}
          >
            <Instagram className="h-[14px] w-[14px]" strokeWidth={1.75} />
          </a>
          <a
            href="https://x.com/afurkanbudakcom"
            target="_blank"
            rel="noreferrer"
            aria-label="X"
            className="flex h-8 w-8 items-center justify-center rounded-[6px] transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
            style={{ color: 'color-mix(in oklab, var(--fg) 75%, transparent)' }}
          >
            <Twitter className="h-[14px] w-[14px]" strokeWidth={1.75} />
          </a>
          <a
            href="https://www.youtube.com/@ahmetfurkanbudak"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
            className="flex h-8 w-8 items-center justify-center rounded-[6px] transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
            style={{ color: 'color-mix(in oklab, var(--fg) 75%, transparent)' }}
          >
            <Youtube className="h-[14px] w-[14px]" strokeWidth={1.75} />
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/hakkinda"
            className="inline-flex items-center gap-1 text-[12.5px] font-medium"
            style={{ color: 'var(--fg)' }}
          >
            Profil
            <ArrowRight className="h-[12px] w-[12px]" strokeWidth={2.25} />
          </Link>
          <span className="opacity-40">·</span>
          <Link
            href="/uyelik"
            className="inline-flex items-center gap-1 text-[12.5px] font-medium"
            style={{ color: 'var(--fg)' }}
          >
            Üyelik
            <ArrowRight className="h-[12px] w-[12px]" strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
