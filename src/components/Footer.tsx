import Link from 'next/link';
import { Logo } from './Logo';

const FOOTER_NAV = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/posts', label: 'Yazılar' },
  { href: '/gundem', label: 'Gündem' },
  { href: '/konular', label: 'Konular' },
  { href: '/oneriler', label: 'Öneriler' },
  { href: '/forum', label: 'Forum' },
  { href: '/uyelik', label: 'Üyelik' },
  { href: '/hediye-et', label: 'Hediye Edin' },
  { href: '/hakkinda', label: 'Hakkında' },
  { href: '/kunye', label: 'Künye' },
  { href: '/iletisim', label: 'İletişim' },
];

const PILLARS: [string, string][] = [
  ['Marka Danışmanlığı', '/marka-danismanligi'],
  ['Marka Stratejisi', '/marka-stratejisi'],
  ['Marka Yönetimi', '/marka-yonetimi'],
  ['Dijital Markalaşma', '/dijital-markalasma'],
  ['Marka Konumlandırma', '/konumlandirma'],
  ['Marka Kimliği', '/marka-kimligi'],
  ['Marka Farklılaşması', '/farklilasma'],
  ['Marka Mimarisi', '/marka-mimarisi'],
  ['Pazarlama İletişimi', '/pazarlama-iletisimi'],
  ['Marka Sağlığı', '/marka-sagligi'],
  ['Marka Yenilemesi', '/marka-yenilemesi'],
  ['Marka Sözlüğü', '/sozluk'],
];

const SOCIAL: [string, string][] = [
  ['Twitter', 'https://x.com/afurkanbudakcom'],
  ['Medium', 'https://medium.com/@ahmetfurkanbudak'],
  ['Instagram', 'https://www.instagram.com/afbrandworks'],
  ['LinkedIn', 'https://www.linkedin.com/in/ahmetfurkanbudak/'],
  ['YouTube', 'https://www.youtube.com/@ahmetfurkanbudak'],
];

export function Footer() {
  return (
    <footer
      className="mx-auto mt-20 w-full max-w-[1400px] px-6 pb-12 md:px-10 lg:px-14"
      style={{ color: 'var(--fg)' }}
    >
      <div className="rule-solid opacity-[0.12]" style={{ opacity: 0.12 }} />

      <div className="grid grid-cols-1 gap-12 pt-12 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <a
            href="/"
            aria-label="afbrandworks"
            className="flex items-center"
            style={{ color: 'var(--fg)' }}
          >
            <Logo className="h-[36px] w-auto" />
          </a>
          <p
            className="mt-5 max-w-[46ch] text-[14px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 62%, transparent)' }}
          >
            İşletme sahipleri ve girişimciler için; stratejik marka danışmanı
            Ahmet Furkan Budak&rsquo;ın marka inşasından pazarlama iletişimine
            ve stratejik yönetime kadar uzanan kişisel notlarını ve dünyadan
            marka haberlerini içermektedir.
          </p>
        </div>

        <div>
          <p className="eyebrow">Site</p>
          <ul className="mt-5 space-y-3 text-[15px]">
            {FOOTER_NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="transition hover:underline"
                  style={{ color: 'var(--fg)' }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Rehberler</p>
          <ul className="mt-5 space-y-3 text-[15px]">
            {PILLARS.map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="transition hover:underline"
                  style={{ color: 'var(--fg)' }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Sosyal</p>
          <ul className="mt-5 space-y-3 text-[15px]">
            {SOCIAL.map(([label, href]) => (
              <li key={label}>
                <Link
                  href={href}
                  className="inline-flex items-center gap-1.5 transition hover:underline"
                  style={{ color: 'var(--fg)' }}
                >
                  {label}
                  <span aria-hidden className="text-[13px] opacity-60">
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="mt-16 flex flex-col items-start justify-between gap-3 pt-6 text-[13px] md:flex-row md:items-center"
        style={{
          borderTop: '1px solid var(--border)',
          color: 'color-mix(in oklab, var(--fg) 55%, transparent)',
        }}
      >
        <p>© 2026 Ahmet Furkan Budak. Tüm hakları saklıdır.</p>
        <p>
          Powered by{' '}
          <Link
            href="https://toganworks.com"
            className="transition hover:underline"
            style={{ color: 'var(--fg)' }}
          >
            Toganworks
          </Link>
        </p>
      </div>
    </footer>
  );
}
