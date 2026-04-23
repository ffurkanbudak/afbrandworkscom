'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import {
  ArrowUpRight,
  BookOpen,
  Calendar,
  ChevronDown,
  Gift,
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
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useTheme } from './ThemeProvider';
import { LiveClock } from './LiveClock';
import { AccountLink } from './AccountLink';

type NavLeaf = { href: string; label: string; match: (p: string) => boolean };
type NavChild = { href: string; label: string; icon: LucideIcon; desc: string };
type NavBranch = {
  label: string;
  match: (p: string) => boolean;
  children: NavChild[];
};
type NavItem = NavLeaf | NavBranch;

const NAV: NavItem[] = [
  { href: '/', label: 'Ana Sayfa', match: (p) => p === '/' },
  { href: '/posts', label: 'Yazılar', match: (p) => p.startsWith('/posts') },
  { href: '/gundem', label: 'Gündem', match: (p) => p.startsWith('/gundem') },
  { href: '/konular', label: 'Konular', match: (p) => p.startsWith('/konular') },
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
  { href: '/markalardan-hikayeler', label: 'Markalar', match: (p) => p.startsWith('/markalardan-hikayeler') },
  { href: '/forum', label: 'Forum', match: (p) => p.startsWith('/forum') },
  { href: '/uyelik', label: 'Üyelik', match: (p) => p.startsWith('/uyelik') },
  { href: '/hediye-et', label: 'Hediye Edin', match: (p) => p.startsWith('/hediye-et') },
  { href: '/hakkinda', label: 'Hakkında', match: (p) => p.startsWith('/hakkinda') },
  { href: '/kunye', label: 'Künye', match: (p) => p.startsWith('/kunye') },
  { href: '/contact', label: 'İletişim', match: (p) => p.startsWith('/contact') },
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
        className="sticky top-0 z-40"
        style={{
          background: 'color-mix(in oklab, var(--bg) 82%, transparent)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderBottom: '1px solid color-mix(in oklab, var(--border) 60%, transparent)',
        }}
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6 px-6 py-4 md:px-10 lg:px-14">
          <div className="flex items-center gap-4">
            <a
              href="/"
              aria-label="afbrandworks"
              className="flex items-center"
              style={{ color: 'var(--fg)' }}
            >
              <Logo className="h-[30px] w-auto" />
            </a>
            <LiveClock />
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

            <Link
              href="/hediye-et"
              aria-label="Hediye Edin"
              title="Hediye Edin"
              className="hidden h-8 w-8 items-center justify-center rounded-[6px] transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)] sm:inline-flex"
              style={{ color: 'color-mix(in oklab, var(--fg) 80%, transparent)' }}
            >
              <Gift className="h-[15px] w-[15px]" strokeWidth={1.75} />
            </Link>

            <SignedOut>
              <Link
                href="/sign-in"
                className="hidden items-center rounded-[6px] px-3 py-1.5 text-[12px] font-medium tracking-tight transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)] sm:inline-flex"
                style={{ color: 'var(--fg)' }}
              >
                Giriş
              </Link>
              <Link
                href="/sign-up"
                className="btn-dark group inline-flex items-center gap-2 rounded-[6px] px-3 py-1.5 text-[12px] font-medium tracking-tight"
              >
                <span className="relative flex h-[6px] w-[6px]" aria-hidden>
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                    style={{ background: '#22C55E' }}
                  />
                  <span
                    className="relative inline-flex h-[6px] w-[6px] rounded-full"
                    style={{ background: '#22C55E' }}
                  />
                </span>
                Abone Olun!
              </Link>
            </SignedOut>

            <SignedIn>
              <AccountLink
                className="hidden items-center gap-1.5 rounded-[6px] border px-3 py-1.5 text-[12px] font-medium tracking-tight transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)] sm:inline-flex"
                style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
              />
              <div className="flex items-center">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: { avatarBox: 'h-8 w-8' },
                  }}
                />
              </div>
            </SignedIn>

            <Link
              href="/contact?konu=sponsor"
              className="hidden items-center gap-1.5 rounded-[6px] px-3 py-1.5 text-[12px] font-medium tracking-tight transition hover:opacity-90 md:inline-flex"
              style={{ background: '#DC2204', color: '#FFFFFF' }}
            >
              <span className="relative flex h-[6px] w-[6px]" aria-hidden>
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                  style={{ background: '#FFFFFF' }}
                />
                <span
                  className="relative inline-flex h-[6px] w-[6px] rounded-full"
                  style={{ background: '#FFFFFF' }}
                />
              </span>
              Partner olun!
            </Link>

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

      <div
        aria-hidden={!open}
        className="fixed inset-0 z-50 transition-opacity duration-300"
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

          <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-4 py-6">
            {NAV.map((item) => {
              if (isBranch(item)) {
                const active = item.match(pathname);
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => setMobileDropOpen((v) => !v)}
                      className="flex w-full items-center justify-between rounded-[8px] px-3 py-3 text-[17px] font-medium tracking-tight transition"
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
                  className="group flex items-center justify-between rounded-[8px] px-3 py-3 text-[17px] font-medium tracking-tight transition"
                  style={{
                    color: active
                      ? 'var(--fg)'
                      : 'color-mix(in oklab, var(--fg) 72%, transparent)',
                    background: active
                      ? 'color-mix(in oklab, var(--fg) 5%, transparent)'
                      : 'transparent',
                  }}
                >
                  {item.label}
                  <ArrowUpRight
                    className="h-[15px] w-[15px] opacity-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    strokeWidth={1.75}
                  />
                </Link>
              );
            })}
          </nav>

          <div
            className="border-t px-6 py-4"
            style={{ borderColor: 'var(--border)' }}
          >
            <SignedOut>
              <div className="flex gap-2">
                <Link
                  href="/sign-in"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-[6px] border px-3 py-2.5 text-center text-[13px] font-medium"
                  style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                >
                  Giriş
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setOpen(false)}
                  className="btn-dark flex-1 rounded-[6px] px-3 py-2.5 text-center text-[13px] font-medium"
                >
                  Abone Olun!
                </Link>
              </div>
            </SignedOut>
            <SignedIn>
              <AccountLink
                onClick={() => setOpen(false)}
                className="btn-dark flex items-center justify-center rounded-[6px] px-3 py-2.5 text-center text-[13px] font-medium"
              />
            </SignedIn>
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
