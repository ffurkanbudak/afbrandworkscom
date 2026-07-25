'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'motion/react';
import { SocialCloud } from '@/components/ui/footer-section-4-utils/social-cloud';

const FOOTER_TITLE = 'Stratejik Marka Danışmanı | Yazar | Girişimci';

type FooterLink = { label: string; href: string };
type FooterSection = { title: string; links: FooterLink[] };

const footerLinks: FooterSection[] = [
  {
    title: 'Keşfet',
    links: [
      { label: 'Ana Sayfa', href: '/' },
      { label: 'Marka Masası', href: '/1-1' },
      { label: 'Yazılar', href: '/posts' },
      { label: 'Öneriler', href: '/oneriler' },
      { label: 'Hakkımda', href: '/hakkinda' },
      { label: 'Künye', href: '/kunye' },
      { label: 'İletişim', href: '/iletisim' },
    ],
  },
  {
    title: 'Rehberler',
    links: [
      { label: 'Marka Danışmanlığı', href: '/marka-danismanligi' },
      { label: 'Marka Stratejisi', href: '/marka-stratejisi' },
      { label: 'Marka Yönetimi', href: '/marka-yonetimi' },
      { label: 'Marka Konumlandırma', href: '/konumlandirma' },
      { label: 'Marka Kimliği', href: '/marka-kimligi' },
      { label: 'Marka Mimarisi', href: '/marka-mimarisi' },
    ],
  },
  {
    title: 'Daha Fazlası',
    links: [
      { label: 'Marka Farklılaşması', href: '/farklilasma' },
      { label: 'Dijital Markalaşma', href: '/dijital-markalasma' },
      { label: 'Pazarlama İletişimi', href: '/pazarlama-iletisimi' },
      { label: 'Marka Sağlığı', href: '/marka-sagligi' },
      { label: 'Marka Yenilemesi', href: '/marka-yenilemesi' },
      { label: 'Marka Sözlüğü', href: '/sozluk' },
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function Footer4() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === 'loading') return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      });
      if (!res.ok) throw new Error();
      setStatus('ok');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <footer className="font-sans mt-20 px-4 pb-12 [--color-primary:#0A0A0A]">
      <motion.div
        className="mx-auto w-full max-w-[1400px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <div className="flex h-full flex-col gap-4 md:flex-row">
          {/* Siyah kart */}
          <motion.div
            className="relative flex min-h-[300px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-(--color-primary) p-8 md:min-h-[600px] md:w-1/3 md:p-10"
            variants={itemVariants}
          >
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

            <div className="relative z-10">
              <Link href="/" aria-label="Ahmet Furkan Budak" className="inline-flex items-center">
                {/* Siyah zeminde her temada beyaz logo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-white.svg"
                  alt="Ahmet Furkan Budak"
                  style={{ height: 22, width: 'auto' }}
                />
              </Link>
            </div>

            <div className="relative z-10 space-y-6">
              <h3 className="whitespace-nowrap text-[14px] font-bold text-white sm:text-base">{FOOTER_TITLE}</h3>
              <SocialCloud className="gap-4 text-white/80" />
              <div className="space-y-1.5">
                <p className="text-xs text-white/60">
                  &copy; {new Date().getFullYear()} Ahmet Furkan Budak. Tüm hakları saklıdır.
                </p>
                <p className="inline-flex items-center gap-1.5 text-xs text-white/60">
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
                      src="/toganworks-dark.png"
                      alt="Toganworks"
                      style={{ height: 13, width: 'auto' }}
                    />
                  </a>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bağlantılar kartı */}
          <motion.div
            className="flex min-h-[500px] w-full flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 md:min-h-[600px] md:w-2/3 md:p-12"
            variants={itemVariants}
          >
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
              {footerLinks.map((section) => (
                <div key={section.title} className="flex flex-col space-y-6">
                  <h4 className="text-lg font-bold text-[var(--fg)]">{section.title}</h4>
                  <ul className="flex flex-col space-y-3 text-[14px] font-medium text-[color-mix(in_oklab,var(--fg)_65%,transparent)]">
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
                          <Link href={link.href} className="transition-colors hover:text-[var(--fg)]">
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bülten */}
            <div className="mt-12 space-y-4 md:mt-0">
              <h4 className="text-lg font-bold text-[var(--fg)]">Bülten</h4>
              <form
                onSubmit={handleSubscribe}
                className="flex w-full max-w-md flex-col gap-4 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  aria-label="E-posta adresiniz"
                  className="flex-1 rounded-md border border-[var(--border)] bg-transparent px-4 py-2.5 text-[13px] text-[var(--fg)] focus:outline-none focus:ring-1 focus:ring-[var(--fg)]"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="whitespace-nowrap rounded-md bg-[var(--fg)] px-6 py-2.5 text-[13px] font-medium text-[var(--bg)] transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {status === 'loading' ? 'Gönderiliyor…' : 'Bültene Kaydolun!'}
                </button>
              </form>
              {status === 'ok' && (
                <p className="text-sm text-[color-mix(in_oklab,var(--fg)_70%,transparent)]">
                  Teşekkürler! Kaydınız alındı.
                </p>
              )}
              {status === 'error' && (
                <p className="text-sm text-red-500">Bir şeyler ters gitti, lütfen tekrar deneyin.</p>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}
