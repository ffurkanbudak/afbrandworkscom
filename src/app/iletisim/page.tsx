import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight, Phone, Mail, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const PHONE_DISPLAY = '0537 434 95 66';
const PHONE_HREF = 'tel:+905374349566';
const EMAILS = ['info@toganworks.com'];

const LINKS: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ahmetfurkanbudak/', Icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/afbrandworks', Icon: Instagram },
  { label: 'Twitter / X', href: 'https://x.com/afurkanbudakcom', Icon: Twitter },
  { label: 'YouTube', href: 'https://www.youtube.com/@ahmetfurkanbudak', Icon: Youtube },
];

export default function ContactPage() {
  return (
    <div className="fade-up pt-10 md:pt-16">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.05fr_1fr]">
        <section>
          <p className="eyebrow">İletişim</p>
          <h1 className="font-display mt-3 text-[36px] leading-[1.04] tracking-tight md:text-[48px] lg:text-[56px]">
            İletişime Geçin!
          </h1>
          <div
            className="mt-7 max-w-[56ch] space-y-5 text-[17px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
          >
            <p>
              Marka konumlandırma, pazarlama iletişimi, marka stratejisi ve
              sürdürülebilir büyüme gibi başlıklardaki danışmanlık talepleriniz
              için doğrudan telefon veya e-posta ile ulaşabilirsiniz.
            </p>
            <p>
              Buradaki içerikleri ve yazıları kullanmak ya da telif konusunda
              bilgi almak için de bana doğrudan yazabilirsiniz. Talepler kısa
              sürede değerlendirilir.
            </p>
          </div>

          <div className="mt-12">
            <p className="eyebrow">Diğer kanallar</p>
            <div className="mt-5 flex items-center gap-2">
              {LINKS.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-[10px] border transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
                  style={{ borderColor: 'var(--border)', color: 'color-mix(in oklab, var(--fg) 80%, transparent)' }}
                >
                  <Icon className="h-[17px] w-[17px]" strokeWidth={1.75} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          className="h-fit rounded-[12px] p-7 md:p-10"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <p className="eyebrow">Doğrudan İletişim</p>

          <div className="mt-6 space-y-3">
            <a
              href={PHONE_HREF}
              className="group flex items-center gap-4 rounded-[10px] border p-4 transition hover:bg-[color-mix(in_oklab,var(--fg)_4%,transparent)]"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px]"
                style={{ background: 'color-mix(in oklab, var(--fg) 6%, transparent)' }}
              >
                <Phone className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </span>
              <span className="min-w-0">
                <span
                  className="block text-[11px] font-semibold tracking-[0.12em] uppercase"
                  style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                >
                  Telefon
                </span>
                <span className="mt-0.5 block text-[18px] font-semibold tracking-tight">
                  {PHONE_DISPLAY}
                </span>
              </span>
              <ArrowUpRight
                className="ml-auto h-[16px] w-[16px] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.75}
                style={{ color: 'color-mix(in oklab, var(--fg) 50%, transparent)' }}
              />
            </a>

            {EMAILS.map((email) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="group flex items-center gap-4 rounded-[10px] border p-4 transition hover:bg-[color-mix(in_oklab,var(--fg)_4%,transparent)]"
                style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px]"
                  style={{ background: 'color-mix(in oklab, var(--fg) 6%, transparent)' }}
                >
                  <Mail className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </span>
                <span className="min-w-0">
                  <span
                    className="block text-[11px] font-semibold tracking-[0.12em] uppercase"
                    style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                  >
                    E-posta
                  </span>
                  <span className="mt-0.5 block truncate text-[18px] font-semibold tracking-tight">
                    {email}
                  </span>
                </span>
                <ArrowUpRight
                  className="ml-auto h-[16px] w-[16px] shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.75}
                  style={{ color: 'color-mix(in oklab, var(--fg) 50%, transparent)' }}
                />
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
