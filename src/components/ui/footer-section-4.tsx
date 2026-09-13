'use client';

import Link from 'next/link';
import { Handshake } from 'lucide-react';
import { SocialCloud } from '@/components/ui/footer-section-4-utils/social-cloud';

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('Quasar İstanbul, Büyükdere Cad. No: 76, Mecidiyeköy, Şişli, İstanbul');

type FooterLink = { label: string; href: string; vurgulu?: boolean };
type FooterSection = { title: string; links: FooterLink[] };

const footerLinks: FooterSection[] = [
  {
    title: 'Keşfet',
    links: [
      { label: 'Ana Sayfa', href: '/', vurgulu: true },
      { label: 'Hakkımda', href: '/#hakkinda' },
      { label: 'Makaleler', href: '/makaleler' },
      { label: 'İletişim', href: '/iletisim' },
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

            {/* Ofis ve iletişim bilgileri: kartın sağ altında */}
            <div className="mt-10 border-t border-[var(--border)] pt-6 md:ml-auto md:w-full md:max-w-[520px]">
              <div className="grid gap-6 text-[12.5px] leading-[1.6] sm:grid-cols-2 sm:text-[13.5px] text-[color-mix(in_oklab,var(--fg)_65%,transparent)]">
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--fg)]">Ofis</h4>
                  <address className="mt-2.5 not-italic">
                    <a
                      href={MAPS_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-[var(--fg)]"
                    >
                      Fulya Mah. Büyükdere Cad. Quasar İstanbul No: 76 Kat: 13 D. No: 188
                      <br />
                      Mecidiyeköy, Şişli, İstanbul, Türkiye
                    </a>
                  </address>
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--fg)]">İletişim</h4>
                  <ul className="mt-2.5 space-y-1">
                    <li>
                      <a href="mailto:info@toganworks.com" className="transition-colors hover:text-[var(--fg)]">
                        info@toganworks.com
                      </a>
                    </li>
                    <li>
                      <a href="tel:+905374349566" className="whitespace-nowrap transition-colors hover:text-[var(--fg)]">
                        +90 (537) 434 95 66
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
