'use client';

import Link from 'next/link';
import { Handshake } from 'lucide-react';
import { SocialCloud } from '@/components/ui/footer-section-4-utils/social-cloud';

const WHATSAPP_URL =
  'https://wa.me/905374349566?text=' +
  encodeURIComponent('Ahmet Furkan Bey Merhaba, size bir konuda danışmanlık istiyorum.');

type FooterLink = { label: string; href: string; vurgulu?: boolean };
type FooterSection = { title: string; links: FooterLink[] };

const footerLinks: FooterSection[] = [
  {
    title: 'Keşfet',
    links: [
      { label: 'Ana Sayfa', href: '/', vurgulu: true },
      { label: 'Hakkımda', href: '/#hakkinda' },
      { label: 'Makaleler', href: '/makaleler' },
      { label: 'İletişim', href: WHATSAPP_URL },
    ],
  },
  {
    title: 'Sosyal',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ahmetfurkanbudak/' },
      { label: 'Instagram', href: 'https://www.instagram.com/afbrandworks' },
      { label: 'X (Twitter)', href: 'https://x.com/afurkanbudakcom' },
      { label: 'YouTube', href: 'https://www.youtube.com/@ahmetfurkanbudak' },
      { label: 'Medium', href: 'https://medium.com/@ahmetfurkanbudak' },
    ],
  },
];

/** bitisik: üstteki bölüme boşluksuz yapışır (ana sayfa ve /1-1). */
export default function Footer4({ bitisik = false }: { bitisik?: boolean }) {
  return (
    <footer className={`font-sans ${bitisik ? 'mt-0' : 'mt-20'} px-4 pb-12 [--color-primary:#0A0A0A]`}>
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="flex h-full flex-col gap-4 md:flex-row">
          {/* Siyah kart */}
          <div className="reveal-up relative flex min-h-[200px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-(--color-primary) p-5 md:min-h-[600px] md:w-1/3 sm:p-8 md:p-10">
            {/* SVG noise dokusu */}
            <svg
              className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-90 mix-blend-multiply"
              xmlns="http://www.w3.org/2000/svg"
            >
              <filter id="noiseFilter2">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.65"
                  numOctaves="4"
                  stitchTiles="stitch"
                />
              </filter>
              <rect width="100%" height="100%" filter="url(#noiseFilter2)" />
            </svg>

            <div className="relative z-10 mt-auto space-y-6">
              <SocialCloud className="gap-4 text-white/80" />
              <div className="space-y-1.5">
                <p className="text-xs text-white/60">
                  &copy; {new Date().getFullYear()} Ahmet Furkan Budak. Tüm hakları saklıdır.
                </p>
                <p className="text-xs text-white/60">
                  Built with ❤️ by{' '}
                  <a
                    href="https://toganworks.com"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-white transition hover:opacity-80"
                  >
                    TOGANWORKS
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Bağlantılar kartı */}
          <div className="reveal-up reveal-up-delayed flex w-full flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 md:min-h-[600px] md:w-2/3 sm:p-8 md:p-12">
            <div className="grid grid-cols-2 gap-x-2 gap-y-8 md:gap-10">
              {footerLinks.map((section) => (
                <div key={section.title} className="flex flex-col space-y-6">
                  <h4 className="text-base font-bold text-[var(--fg)] sm:text-lg">{section.title}</h4>
                  <ul className="flex flex-col space-y-3 text-[12.5px] font-medium sm:text-[14px] text-[color-mix(in_oklab,var(--fg)_65%,transparent)]">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        {link.href.startsWith('http') ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="transition-colors hover:text-[var(--fg)]"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className={`inline-flex items-center gap-1.5 transition-colors ${
                              link.vurgulu ? 'font-semibold' : 'hover:text-[var(--fg)]'
                            }`}
                            style={link.vurgulu ? { color: '#DC2626' } : undefined}
                          >
                            {link.vurgulu && <Handshake className="h-[15px] w-[15px]" strokeWidth={2} />}
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
