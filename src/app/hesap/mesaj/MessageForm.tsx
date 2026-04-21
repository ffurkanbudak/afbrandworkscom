'use client';

import { useState } from 'react';
import { Field, inputClass, inputStyle } from '@/app/admin/_components/FormField';

export function MessageForm({ prefill }: { prefill: { name: string; email: string } }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/me/message', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(form)),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg({ kind: 'err', text: json.error ?? 'Gönderilemedi.' });
      } else {
        setMsg({ kind: 'ok', text: 'İletildi. Teşekkürler.' });
        (e.target as HTMLFormElement).reset();
      }
    } catch {
      setMsg({ kind: 'err', text: 'Ağ hatası.' });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="İsim" required>
          <input
            name="name"
            defaultValue={prefill.name}
            required
            className={inputClass}
            style={inputStyle}
          />
        </Field>
        <Field label="E-posta" required>
          <input
            name="email"
            type="email"
            defaultValue={prefill.email}
            required
            className={inputClass}
            style={inputStyle}
          />
        </Field>
      </div>

      <Field label="Konu">
        <input
          name="topic"
          placeholder="Kısa bir başlık"
          className={inputClass}
          style={inputStyle}
        />
      </Field>

      <Field label="Mesaj" required>
        <textarea
          name="message"
          required
          rows={7}
          className={inputClass}
          style={inputStyle}
        />
      </Field>

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={busy}
          className="btn-dark rounded-[8px] px-5 py-2.5 text-[13px] font-medium disabled:opacity-60"
        >
          {busy ? 'Gönderiliyor…' : 'Gönder'}
        </button>
        {msg && (
          <span
            className="text-[12px]"
            style={{ color: msg.kind === 'ok' ? '#16A34A' : '#DC2626' }}
          >
            {msg.text}
          </span>
        )}
      </div>
    </form>
  );
}
