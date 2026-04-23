'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

const LINKS: [string, string][] = [
  ['LinkedIn', 'https://www.linkedin.com/in/ahmetfurkanbudak/'],
  ['Instagram', 'https://www.instagram.com/afbrandworks'],
  ['Twitter / X', 'https://x.com/afurkanbudakcom'],
  ['YouTube', 'https://www.youtube.com/@ahmetfurkanbudak'],
];

export default function ContactPage() {
  const [state, setState] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(form)),
      });
      if (!res.ok) throw new Error();
      setState('sent');
      (e.target as HTMLFormElement).reset();
    } catch {
      setState('error');
    }
  }

  return (
    <div className="fade-up pt-10 md:pt-16">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.05fr_1fr]">
        <section>
          <p className="eyebrow">İletişim</p>
          <h1 className="font-display mt-3 text-[36px] leading-[1.04] tracking-tight md:text-[48px] lg:text-[56px]">
            Gündem.
          </h1>
          <div
            className="mt-7 max-w-[56ch] space-y-5 text-[17px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
          >
            <p>
              Marka konumlandırma, kurumsal yeniden yapılanma ve büyüme mimarisi
              alanlarındaki danışmanlık taleplerinizi bu kanal üzerinden
              iletebilirsiniz. Danışmanlık, mentorluk ve konuşmacı davetleri
              doğrudan değerlendirilir.
            </p>
            <p>
              Ortak etkinlik, podcast veya akademik proje önerileriniz için aynı
              formu kullanın. Tüm taleplere üç iş günü içerisinde yanıt
              sağlanır.
            </p>
          </div>

          <div className="mt-12">
            <p className="eyebrow">Diğer kanallar</p>
            <ul className="mt-5 grid grid-cols-1 gap-1 sm:grid-cols-2">
              {LINKS.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group flex items-center justify-between gap-4 rounded-[10px] px-4 py-3 transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
                    style={{ color: 'var(--fg)' }}
                  >
                    <span className="text-[15px] font-medium">{label}</span>
                    <ArrowUpRight
                      className="h-[15px] w-[15px] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.75}
                      style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="rounded-[12px] p-7 md:p-10"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <p className="eyebrow">Talep Formu</p>
          <h2 className="font-display mt-3 text-[26px] leading-[1.15] tracking-tight">
            Gündeminizi birkaç satırla paylaşın.
          </h2>

          <form onSubmit={onSubmit} className="mt-7 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="name" label="İsim ve Kurum" placeholder="Zeynep Yılmaz / Toganworks" />
              <Select
                name="topic"
                label="Gündem/Konu Başlığı"
                options={[
                  'Sponsorluk',
                  'Yazarlık başvurusu',
                  'Danışmanlık',
                  'Eğitim',
                  'Mentörlük',
                  'Konuşmacı daveti',
                  'İş birliği',
                  'Medya / Röportaj',
                  'Diğer',
                ]}
              />
            </div>
            <Field name="email" type="email" label="E-posta" placeholder="ornek@marka.com" />
            <TextArea
              name="message"
              label="Mesajınız"
              placeholder="Markanız, hedefiniz ve mevcut durumunuz hakkında birkaç cümle."
            />
            <button
              type="submit"
              disabled={state === 'loading'}
              className="btn-dark inline-flex w-full items-center justify-center gap-2 rounded-[8px] py-3.5 text-[13.5px] font-medium tracking-[0.01em] disabled:opacity-60"
            >
              {state === 'loading'
                ? 'Gönderiliyor…'
                : state === 'sent'
                  ? 'Gönderildi ✓'
                  : 'Gönderin'}
              {state === 'idle' && (
                <ArrowRight className="h-[14px] w-[14px]" strokeWidth={2.25} />
              )}
            </button>
            {state === 'error' && (
              <p className="text-[13px]" style={{ color: '#C2410C' }}>
                Bir hata oluştu. Lütfen tekrar deneyin.
              </p>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  type = 'text',
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span
        className="block text-[12px] font-semibold tracking-[0.12em] uppercase"
        style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
      >
        {label}
      </span>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="input-base mt-2"
      />
    </label>
  );
}

function Select({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span
        className="block text-[12px] font-semibold tracking-[0.12em] uppercase"
        style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
      >
        {label}
      </span>
      <select name={name} required defaultValue="" className="input-base mt-2">
        <option value="" disabled>
          Seçiniz
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({
  name,
  label,
  placeholder,
}: {
  name: string;
  label: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span
        className="block text-[12px] font-semibold tracking-[0.12em] uppercase"
        style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
      >
        {label}
      </span>
      <textarea
        name={name}
        required
        rows={6}
        placeholder={placeholder}
        className="input-base mt-2 resize-y"
      />
    </label>
  );
}
