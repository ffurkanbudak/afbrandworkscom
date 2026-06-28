import Link from 'next/link';
import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Logo } from './Logo';

const EXPLORE: [string, string][] = [
  ['Ana Sayfa', '/'],
  ['Hizmetler', '/hizmetler'],
  ['Yazılar', '/posts'],
  ['Gündem', '/gundem'],
  ['Konular', '/konular'],
  ['Öneriler', '/oneriler'],
  ['Hakkımda', '/hakkinda'],
  ['Künye', '/kunye'],
  ['İletişim', '/iletisim'],
];

const GUIDES: [string, string][] = [
  ['Marka Danışmanlığı', '/marka-danismanligi'],
  ['Marka Stratejisi', '/marka-stratejisi'],
  ['Marka Yönetimi', '/marka-yonetimi'],
  ['Marka Konumlandırma', '/konumlandirma'],
  ['Marka Kimliği', '/marka-kimligi'],
  ['Marka Mimarisi', '/marka-mimarisi'],
  ['Marka Farklılaşması', '/farklilasma'],
  ['Dijital Markalaşma', '/dijital-markalasma'],
  ['Pazarlama İletişimi', '/pazarlama-iletisimi'],
  ['Marka Sağlığı', '/marka-sagligi'],
  ['Marka Yenilemesi', '/marka-yenilemesi'],
  ['Marka Sözlüğü', '/sozluk'],
];

function MediumIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden role="img">
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  );
}

type Social = { label: string; href: string; icon?: LucideIcon };

const SOCIAL: Social[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ahmetfurkanbudak/', icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/afbrandworks', icon: Instagram },
  { label: 'X (Twitter)', href: 'https://x.com/afurkanbudakcom', icon: Twitter },
  { label: 'YouTube', href: 'https://www.youtube.com/@ahmetfurkanbudak', icon: Youtube },
  { label: 'Medium', href: 'https://medium.com/@ahmetfurkanbudak' },
];

export function Footer() {
  return (
    <footer
      className="font-sans mx-auto mt-20 w-full max-w-[1400px] px-6 pb-12 md:px-10 lg:px-14"
      style={{ color: 'var(--fg)' }}
    >
      <div className="rule-solid opacity-[0.12]" style={{ opacity: 0.12 }} />

      <div className="flex flex-col gap-6 pt-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <a
            href="/"
            aria-label="Ahmet Furkan Budak"
            className="inline-flex items-center"
            style={{ color: 'var(--fg)' }}
          >
            <Logo height={18} />
          </a>
          <p
            className="mt-3 text-[11px] font-medium tracking-[0.04em]"
            style={{ color: 'color-mix(in oklab, var(--fg) 52%, transparent)' }}
          >
            Stratejik Marka Danışmanı • Yazar • Girişimci
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          {SOCIAL.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                title={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-[8px] border transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
                style={{ borderColor: 'var(--border)', color: 'color-mix(in oklab, var(--fg) 78%, transparent)' }}
              >
                {Icon ? (
                  <Icon className="h-[15px] w-[15px]" strokeWidth={1.75} />
                ) : (
                  <MediumIcon className="h-[15px] w-[15px]" />
                )}
              </a>
            );
          })}
        </div>
      </div>

      <nav
        className="mt-12 grid gap-x-10 gap-y-10 border-t pt-10 sm:grid-cols-2 lg:grid-cols-3"
        style={{ borderColor: 'var(--border)' }}
      >
        <div>
          <p className="eyebrow">Keşfet</p>
          <ul className="mt-4 space-y-2.5 text-[14px]">
            {EXPLORE.map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-block transition hover:translate-x-0.5 hover:opacity-100"
                  style={{ color: 'color-mix(in oklab, var(--fg) 72%, transparent)' }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className="eyebrow">Rehberler</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2.5 text-[14px] sm:grid-cols-3">
            {GUIDES.map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-block transition hover:translate-x-0.5 hover:opacity-100"
                  style={{ color: 'color-mix(in oklab, var(--fg) 72%, transparent)' }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div
        className="mt-12 flex flex-col items-start justify-between gap-3 border-t pt-6 text-[13px] md:flex-row md:items-center"
        style={{
          borderTop: '1px solid var(--border)',
          color: 'color-mix(in oklab, var(--fg) 55%, transparent)',
        }}
      >
        <p>© 2026 Ahmet Furkan Budak. Tüm hakları saklıdır.</p>
        <p className="inline-flex items-center gap-2">
          <span>Powered by</span>
          <a
            href="https://toganworks.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Toganworks"
            className="inline-flex items-center transition hover:opacity-80"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/toganworks-light.png"
              alt="Toganworks"
              className="logo-on-light"
              style={{ height: 15, width: 'auto' }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/toganworks-dark.png"
              alt="Toganworks"
              className="logo-on-dark"
              style={{ height: 15, width: 'auto' }}
            />
          </a>
        </p>
      </div>
    </footer>
  );
}
