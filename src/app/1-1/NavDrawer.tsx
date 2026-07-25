'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Mail } from 'lucide-react';
import { Logo } from '@/components/Logo';

const WHATSAPP_URL =
  'https://wa.me/905374349566?text=' +
  encodeURIComponent('Merhaba Ahmet Bey, 1:1 Marka Danışmanlığı hakkında bilgi almak istiyorum.');

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden role="img">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2c-5.523 0-10 4.477-10 10 0 1.765.462 3.489 1.34 5.007L2 22l5.11-1.34A9.96 9.96 0 0 0 12.004 22c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18.2a8.19 8.19 0 0 1-4.174-1.14l-.299-.177-3.03.795.81-2.955-.195-.303A8.2 8.2 0 1 1 12.004 20.2z" />
    </svg>
  );
}

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
          <Link href="/" aria-label="Ahmet Furkan Budak" className="flex items-center" style={{ color: 'var(--fg)' }}>
            <Logo height={18} />
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <a
              href="mailto:info@toganworks.com"
              aria-label="info@toganworks.com adresine e-posta gönderin"
              title="info@toganworks.com"
              className="inline-flex items-center justify-center rounded-[6px] border p-2.5 transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
            >
              <Mail className="h-[17px] w-[17px]" strokeWidth={1.75} />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
              className="inline-flex items-center justify-center rounded-[6px] p-2.5 text-white transition hover:opacity-90"
              style={{ background: '#25D366' }}
            >
              <WhatsAppIcon className="h-[17px] w-[17px]" />
            </a>
          </div>
        </div>
      </header>

      <div
        aria-hidden={!open}
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

          <div className="mt-auto space-y-2.5 border-t pt-5" style={{ borderColor: 'var(--border)' }}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[14px] font-medium transition hover:opacity-75"
            >
              <WhatsAppIcon className="h-[15px] w-[15px]" />
              WhatsApp
            </a>
            <a
              href="mailto:info@toganworks.com"
              className="flex items-center gap-2 text-[14px] font-medium transition hover:opacity-75"
            >
              <Mail className="h-[15px] w-[15px]" strokeWidth={1.75} />
              info@toganworks.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
