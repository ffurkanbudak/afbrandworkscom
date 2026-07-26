'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { GoogleCalendarLogo, GmailLogo, WhatsAppGlyph } from '@/components/ui/brand-icons';

const TAKVIM_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1um6hda1soZolvF4yY1oTMwugah-W2o-rB-jGgcJ0_eIzeTL8qR5oKuRHr6TcU8YI7oAwmI2eH?gv=true';

const WHATSAPP_URL =
  'https://wa.me/905374349566?text=' +
  encodeURIComponent('Merhaba Ahmet Bey, 1:1 Marka Danışmanlığı hakkında bilgi almak istiyorum.');

const NAV_ITEMS: [string, string][] = [
  ['Ana Sayfa', '/'],
  ['Marka Masası', '/1-1'],
  ['Yazılar', '/posts'],
  ['Hakkımda', '/hakkinda'],
  ['İletişim', '/iletisim'],
];

export function NavDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-40 border-b"
        style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center gap-4 px-6 md:px-10 lg:px-14">
          <button
            type="button"
            aria-label="Menüyü aç"
            onClick={() => setOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-[8px] transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
            style={{ color: 'var(--fg)' }}
          >
            <Menu className="h-5 w-5" strokeWidth={1.75} />
          </button>
          <Link href="/" aria-label="Ahmet Furkan Budak" className="flex min-w-0 shrink items-center" style={{ color: 'var(--fg)' }}>
            <Logo height={18} />
          </Link>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
            <a
              href={TAKVIM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Google Takvim üzerinden randevu planlayın"
              title="Randevu planlayın"
              className="inline-flex items-center justify-center rounded-[6px] border p-2 transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)] sm:p-2.5"
              style={{ borderColor: 'var(--border)' }}
            >
              <GoogleCalendarLogo className="h-[16px] w-[16px] sm:h-[17px] sm:w-[17px]" />
            </a>
            <a
              href="mailto:info@toganworks.com"
              aria-label="info@toganworks.com adresine e-posta gönderin"
              title="info@toganworks.com"
              className="inline-flex items-center justify-center rounded-[6px] border p-2 transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)] sm:p-2.5"
              style={{ borderColor: 'var(--border)' }}
            >
              <GmailLogo className="h-[16px] w-[16px] sm:h-[17px] sm:w-[17px]" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp üzerinden iletişime geçin"
              title="WhatsApp"
              className="inline-flex items-center justify-center rounded-[6px] p-2 text-white transition hover:opacity-90 sm:p-2.5"
              style={{ background: '#25D366' }}
            >
              <WhatsAppGlyph className="h-[16px] w-[16px] sm:h-[17px] sm:w-[17px]" />
            </a>
          </div>
        </div>
      </header>

      <div
        inert={!open}
        className={`fixed inset-0 z-50 transition ${open ? '' : 'pointer-events-none'}`}
      >
        {/* Overlay */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Panel */}
        <div
          className={`absolute left-0 top-0 flex h-full w-[300px] max-w-[85vw] flex-col border-r p-6 transition-transform duration-300 ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--fg)' }}
        >
          <div className="flex items-center justify-between">
            <Logo height={16} />
            <button
              type="button"
              aria-label="Menüyü kapat"
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-[8px] transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
            >
              <X className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>

          <nav className="mt-8 flex flex-col gap-1">
            {NAV_ITEMS.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-[8px] px-3 py-2.5 text-[15px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex items-center gap-2 border-t pt-5" style={{ borderColor: 'var(--border)' }}>
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
        </div>
      </div>
    </>
  );
}
