'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import {
  ArrowUpRight,
  BookOpen,
  Calendar,
  ChevronDown,
  Handshake,
  Headphones,
  Instagram,
  Linkedin,
  Menu,
  Moon,
  PlayCircle,
  Sun,
  Twitter,
  X,
  Youtube,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { GoogleCalendarLogo, GmailLogo, WhatsAppGlyph } from '@/components/ui/brand-icons';

type NavLeaf = { href: string; label: string; match: (p: string) => boolean; vurgulu?: boolean };
type NavChild = { href: string; label: string; icon: LucideIcon; desc: string };
type NavBranch = {
  label: string;
  match: (p: string) => boolean;
  children: NavChild[];
};
type NavItem = NavLeaf | NavBranch;

const TAKVIM_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1um6hda1soZolvF4yY1oTMwugah-W2o-rB-jGgcJ0_eIzeTL8qR5oKuRHr6TcU8YI7oAwmI2eH?gv=true';
const WHATSAPP_URL =
  'https://wa.me/905374349566?text=' +
  encodeURIComponent('Merhaba Ahmet Bey, markam hakkında bilgi almak istiyorum.');

const NAV: NavItem[] = [
  { href: '/', label: 'Ana Sayfa', match: (p) => p === '/' },
  { href: '/posts', label: 'Yazılar', match: (p) => p.startsWith('/posts') },
  { href: '/1-1', label: 'Marka Masası', match: (p) => p.startsWith('/1-1'), vurgulu: true },
  {
    label: 'Öneriler',
    match: (p) => p.startsWith('/oneriler'),
    children: [
      { href: '/oneriler/kitaplar', label: 'Kitaplar', icon: BookOpen, desc: 'Okuma listesi' },
      { href: '/oneriler/podcastler', label: 'Podcastler', icon: Headphones, desc: 'Dinlenesi sohbetler' },
      { href: '/oneriler/videolar', label: 'Videolar', icon: PlayCircle, desc: 'Arşivlik yayınlar' },
      { href: '/oneriler/etkinlikler', label: 'Etkinlikler', icon: Calendar, desc: 'Takvimdeki buluşmalar' },
    ],
  },
  { href: '/hakkinda', label: 'Hakkımda', match: (p) => p.startsWith('/hakkinda') },
  { href: '/iletisim', label: 'İletişim', match: (p) => p.startsWith('/iletisim') },
];

function isBranch(item: NavItem): item is NavBranch {
  return 'children' in item;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileDropOpen, setMobileDropOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header
        className="font-sans sticky top-0 z-40"
        style={{
          background: 'color-mix(in oklab, var(--bg) 82%, transparent)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderBottom: '1px solid color-mix(in oklab, var(--border) 60%, transparent)',
        }}
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6 px-6 py-4 md:px-10 lg:px-14">
          <div className="flex items-center gap-3.5">
            <a
              href="/"
              aria-label="Ahmet Furkan Budak"
              className="flex items-center"
              style={{ color: 'var(--fg)' }}
            >
              <Logo height={18} />
            </a>
            <span
              className="hidden border-l pl-3.5 text-[10.5px] font-medium tracking-[0.03em] md:inline-block"
              style={{
                borderColor: 'color-mix(in oklab, var(--border) 85%, transparent)',
                color: 'color-mix(in oklab, var(--fg) 56%, transparent)',
              }}
            >
              Stratejik Marka Danışmanı • Yazar • Girişimci
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <div
              className="mr-1 hidden items-center gap-0.5 pr-1 sm:flex"
              style={{ borderRight: '1px solid color-mix(in oklab, var(--border) 75%, transparent)' }}
            >
              <a
                href="https://www.linkedin.com/in/ahmetfurkanbudak/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-[6px] transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
                style={{ color: 'color-mix(in oklab, var(--fg) 80%, transparent)' }}
              >
                <Linkedin className="h-[15px] w-[15px]" strokeWidth={1.75} />
              </a>
              <a
                href="https://www.instagram.com/afbrandworks"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-[6px] transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
                style={{ color: 'color-mix(in oklab, var(--fg) 80%, transparent)' }}
              >
                <Instagram className="h-[15px] w-[15px]" strokeWidth={1.75} />
              </a>
              <a
                href="https://x.com/afurkanbudakcom"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="flex h-8 w-8 items-center justify-center rounded-[6px] transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
                style={{ color: 'color-mix(in oklab, var(--fg) 80%, transparent)' }}
              >
                <Twitter className="h-[15px] w-[15px]" strokeWidth={1.75} />
              </a>
              <a
                href="https://www.youtube.com/@ahmetfurkanbudak"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex h-8 w-8 items-center justify-center rounded-[6px] transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
                style={{ color: 'color-mix(in oklab, var(--fg) 80%, transparent)' }}
              >
                <Youtube className="h-[15px] w-[15px]" strokeWidth={1.75} />
              </a>
            </div>

            <button
              onClick={toggle}
              aria-label={isDark ? 'Açık moda geç' : 'Koyu moda geç'}
              className="flex h-8 w-8 items-center justify-center rounded-[6px] transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
              style={{ color: 'var(--fg)' }}
            >
              {isDark ? (
                <Sun className="h-[15px] w-[15px]" strokeWidth={1.75} />
              ) : (
                <Moon className="h-[15px] w-[15px]" strokeWidth={1.75} />
              )}
            </button>

            <button
              onClick={() => setOpen(true)}
              aria-label="Menüyü aç"
              aria-expanded={open}
              className="flex h-8 w-8 items-center justify-center rounded-[6px] transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
              style={{ color: 'var(--fg)' }}
            >
              <Menu className="h-[17px] w-[17px]" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {/* inert: kapalıyken hem odaklanmayı hem erişilebilirlik ağacını kapatır;
          aria-hidden tek başına odaklanabilir öğeleri erişilebilir bırakıyordu. */}
      <div
        inert={!open}
        className="font-sans fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          pointerEvents: open ? 'auto' : 'none',
          opacity: open ? 1 : 0,
        }}
      >
        <button
          aria-label="Menüyü kapat"
          onClick={() => setOpen(false)}
          className="absolute inset-0 h-full w-full cursor-default"
          style={{ background: 'rgba(10,10,10,0.32)', backdropFilter: 'blur(4px)' }}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Site menüsü"
          className="absolute top-0 right-0 flex h-full w-full max-w-[380px] flex-col border-l"
          style={{
            background: 'var(--bg)',
            borderColor: 'var(--border)',
            transform: open ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform .38s cubic-bezier(.2,.7,.2,1)',
          }}
        >
          <div
            className="flex items-center justify-between border-b px-6 py-5"
            style={{ borderColor: 'var(--border)' }}
          >
            <span
              className="text-[11px] font-semibold tracking-[0.14em] uppercase"
              style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
            >
              Menü
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Menüyü kapat"
              className="flex h-8 w-8 items-center justify-center rounded-[6px] transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
              style={{ color: 'var(--fg)' }}
            >
              <X className="h-[17px] w-[17px]" strokeWidth={1.75} />
            </button>
          </div>

          <div
            className="border-b px-6 py-5"
            style={{ borderColor: 'var(--border)' }}
          >
            <Logo height={20} />
            <p
              className="mt-2.5 text-[11px] font-medium tracking-[0.03em]"
              style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
            >
              Stratejik Marka Danışmanı • Yazar • Girişimci
            </p>
          </div>

          <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-4 py-6">
            {NAV.map((item) => {
              if (isBranch(item)) {
                const active = item.match(pathname);
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => setMobileDropOpen((v) => !v)}
                      className="flex w-full items-center justify-between rounded-[8px] px-3 py-3 text-[15px] font-medium tracking-tight transition"
                      style={{
                        color: active
                          ? 'var(--fg)'
                          : 'color-mix(in oklab, var(--fg) 72%, transparent)',
                      }}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className="h-[16px] w-[16px] transition"
                        strokeWidth={2}
                        style={{ transform: mobileDropOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                      />
                    </button>
                    {mobileDropOpen && (
                      <div className="ml-3 flex flex-col gap-0.5 border-l pl-3" style={{ borderColor: 'var(--border)' }}>
                        {item.children.map((c) => {
                          const Icon = c.icon;
                          return (
                            <Link
                              key={c.href}
                              href={c.href}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-2.5 rounded-[8px] px-3 py-2.5 text-[15px] font-medium tracking-tight transition"
                              style={{
                                color: 'color-mix(in oklab, var(--fg) 70%, transparent)',
                              }}
                            >
                              <Icon className="h-[15px] w-[15px] opacity-70" strokeWidth={1.75} />
                              {c.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              const active = item.match(pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between rounded-[8px] px-3 py-3 text-[15px] font-medium tracking-tight transition"
                  style={{
                    color: item.vurgulu
                      ? '#DC2626'
                      : active
                        ? 'var(--fg)'
                        : 'color-mix(in oklab, var(--fg) 72%, transparent)',
                    background: active
                      ? 'color-mix(in oklab, var(--fg) 5%, transparent)'
                      : 'transparent',
                  }}
                >
                  <span className="inline-flex items-center gap-2">
                    {item.vurgulu && <Handshake className="h-[16px] w-[16px]" strokeWidth={2} />}
                    {item.label}
                  </span>
                  <ArrowUpRight
                    className="h-[15px] w-[15px] opacity-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    strokeWidth={1.75}
                  />
                </Link>
              );
            })}
          </nav>

          <div
            className="flex items-center gap-2 border-t px-6 py-4"
            style={{ borderColor: 'var(--border)' }}
          >
            <a
              href={TAKVIM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Google Takvim üzerinden randevu planlayın"
              title="Randevu planlayın"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] border transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
              style={{ borderColor: 'var(--border)' }}
            >
              <GoogleCalendarLogo className="h-5 w-5" />
            </a>
            <a
              href="mailto:info@toganworks.com"
              aria-label="E-posta gönderin"
              title="E-posta"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] border transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
              style={{ borderColor: 'var(--border)' }}
            >
              <GmailLogo className="h-5 w-5" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp üzerinden iletişime geçin"
              title="WhatsApp"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] text-white transition hover:opacity-90"
              style={{ background: '#25D366' }}
            >
              <WhatsAppGlyph className="h-5 w-5" />
            </a>
          </div>

          <div
            className="border-t px-6 py-4"
            style={{ borderColor: 'var(--border)' }}
          >
            <Link
              href="/#bulten"
              onClick={() => setOpen(false)}
              className="btn-dark flex w-full items-center justify-center rounded-[6px] px-3 py-2.5 text-center text-[13px] font-medium"
            >
              Bültene Kaydolun!
            </Link>
          </div>

          <div
            className="border-t px-6 py-5"
            style={{ borderColor: 'var(--border)' }}
          >
            <button
              onClick={toggle}
              className="flex w-full items-center justify-between rounded-[6px] px-3 py-2.5 text-[13px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
              style={{ color: 'color-mix(in oklab, var(--fg) 78%, transparent)' }}
            >
              <span>{isDark ? 'Açık mod' : 'Koyu mod'}</span>
              {isDark ? (
                <Sun className="h-[15px] w-[15px]" strokeWidth={1.75} />
              ) : (
                <Moon className="h-[15px] w-[15px]" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
