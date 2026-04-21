'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export function WriterApplicationForm() {
  const [state, setState] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setState('loading');
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form);
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
        <Field name="name" label="İsim" placeholder="Adınız Soyadınız" required />
        <Field name="email" type="email" label="E-posta" placeholder="siz@ornek.com" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="phone" label="Telefon (opsiyonel)" placeholder="+90" />
        <Field name="linkedinUrl" label="LinkedIn (opsiyonel)" placeholder="linkedin.com/in/…" />
      </div>
      <Field name="proposedTitle" label="Önerilen başlık" placeholder="Tek bir cümlede özet" required />
      <Field name="topics" label="Konular" placeholder="markalaşma, girişim, Türk dünyası" />
      <TextArea
        name="pitch"
        label="Metin özeti"
        placeholder="Yazmak istediğin metnin ana tezini, hangi deneyimden yola çıktığını, okuyucuya ne bıraktığını birkaç paragrafta anlat."
        required
      />
      <Field name="sampleUrl" label="Örnek çalışma URL'si (opsiyonel)" placeholder="https://…" />

      <button
        type="submit"
        disabled={state === 'loading'}
        className="btn-dark inline-flex w-full items-center justify-center gap-2 rounded-[6px] py-3 text-[13.5px] font-medium disabled:opacity-60"
      >
        {state === 'loading' ? 'Gönderiliyor…' : state === 'sent' ? 'İletildi ✓' : 'Başvuruyu gönder'}
        {state === 'idle' && <ArrowRight className="h-[14px] w-[14px]" strokeWidth={2.25} />}
      </button>
      {state === 'error' && err && (
        <p className="text-[13px]" style={{ color: '#DC2626' }}>
          {err}
        </p>
      )}
      {state === 'sent' && (
        <p className="text-[13px]" style={{ color: '#16A34A' }}>
          Teşekkürler. Üç iş günü içinde dönüş yapacağım.
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
        rows={7}
        placeholder={placeholder}
        className="input-base mt-2 resize-y"
      />
    </label>
  );
}
