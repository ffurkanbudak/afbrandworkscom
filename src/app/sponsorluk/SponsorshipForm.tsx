'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export function SponsorshipForm() {
  const [state, setState] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setState('loading');
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/sponsorships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(form)),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(json.error ?? 'Gönderilemedi.');
        setState('error');
        return;
      }
      setState('sent');
      (e.target as HTMLFormElement).reset();
    } catch {
      setErr('Ağ hatası.');
      setState('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="company" label="Firma" required placeholder="Marka / kurum" />
        <Field name="website" label="Web" placeholder="markaniz.com" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="İrtibat kişisi" required placeholder="Adınız Soyadınız" />
        <Field name="email" type="email" label="E-posta" required placeholder="isim@marka.com" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="phone" label="Telefon (opsiyonel)" placeholder="+90" />
        <Select
          name="budgetRange"
          label="Bütçe aralığı"
          options={[
            '5.000₺ altı',
            '5.000₺ - 25.000₺',
            '25.000₺ - 100.000₺',
            '100.000₺ - 500.000₺',
            '500.000₺ üzeri',
            'Değerlendirme sonrası',
          ]}
        />
      </div>
      <Field name="timeline" label="Takvim" placeholder="Örn: 2026 Q2, bahar kampanyası" />
      <TextArea
        name="goals"
        label="Beklentileriniz"
        required
        placeholder="Hangi markayı, hangi kitleye, hangi mesajla ulaştırmak istiyorsunuz? Ortak çalışmayı nasıl hayal ediyorsunuz?"
      />

      <button
        type="submit"
        disabled={state === 'loading'}
        className="btn-dark inline-flex w-full items-center justify-center gap-2 rounded-[6px] py-3 text-[13.5px] font-medium disabled:opacity-60"
      >
        {state === 'loading' ? 'Gönderiliyor…' : state === 'sent' ? 'İletildi ✓' : 'Talebi gönder'}
        {state === 'idle' && <ArrowRight className="h-[14px] w-[14px]" strokeWidth={2.25} />}
      </button>
      {state === 'error' && err && (
        <p className="text-[13px]" style={{ color: '#DC2626' }}>
          {err}
        </p>
      )}
      {state === 'sent' && (
        <p className="text-[13px]" style={{ color: '#16A34A' }}>
          Teşekkürler. Değerlendirip dönüş yapacağım.
        </p>
      )}
    </form>
  );
}

function Field({
  name,
  label,
  type = 'text',
  placeholder,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
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
        required={required}
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
      <select name={name} className="input-base mt-2">
        <option value="">Seçin…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
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
  required,
}: {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
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
        required={required}
        rows={6}
        placeholder={placeholder}
        className="input-base mt-2 resize-y"
      />
    </label>
  );
}
