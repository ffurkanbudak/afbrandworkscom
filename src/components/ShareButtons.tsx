'use client';

import { useState } from 'react';
import { Linkedin, Twitter, MessageCircle, Link as LinkIcon, Check } from 'lucide-react';

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(title);

  const links = [
    {
      label: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: 'X',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      label: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.prompt('Kopyalamak için seçin', url);
    }
  }

  return (
    <div
      className="flex flex-wrap items-center gap-2"
      aria-label="Paylaşım butonları"
    >
      <span
        className="text-[11px] font-semibold tracking-[0.12em] uppercase"
        style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
      >
        Paylaşın
      </span>
      {links.map((l) => {
        const Icon = l.icon;
        return (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            aria-label={l.label}
            className="flex h-9 w-9 items-center justify-center rounded-[8px] border transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
            style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
          >
            <Icon className="h-[14px] w-[14px]" strokeWidth={1.75} />
          </a>
        );
      })}
      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? 'Kopyalandı' : 'Bağlantıyı kopyalayın'}
        className="flex h-9 items-center gap-1.5 rounded-[8px] border px-3 text-[12.5px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
        style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
      >
        {copied ? (
          <>
            <Check className="h-[13px] w-[13px]" strokeWidth={2} />
            Kopyalandı
          </>
        ) : (
          <>
            <LinkIcon className="h-[13px] w-[13px]" strokeWidth={1.75} />
            Bağlantıyı kopyalayın
          </>
        )}
      </button>
    </div>
  );
}
