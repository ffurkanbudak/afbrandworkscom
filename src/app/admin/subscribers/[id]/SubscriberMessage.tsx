'use client';

import { useState } from 'react';

export function SubscriberMessage({ id, email }: { id: string; email: string }) {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: 'ok' | 'err'; text: string } | null>(null);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) {
      setMsg({ tone: 'err', text: 'Konu ve mesaj zorunlu.' });
      return;
    }
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/subscribers/${id}/message`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ subject: subject.trim(), body: body.trim() }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg({ tone: 'err', text: j.error ?? 'Gönderilemedi.' });
      } else {
        setMsg({ tone: 'ok', text: `Mesaj ${email} adresine iletildi.` });
        setSubject('');
        setBody('');
      }
    } catch {
      setMsg({ tone: 'err', text: 'Ağ hatası.' });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={send}
      className="rounded-2xl border p-5"
      style={{ borderColor: 'var(--border)' }}
    >
      <p className="eyebrow">Mesaj gönder</p>
      <p
        className="mt-1 text-[12.5px]"
        style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
      >
        Doğrudan e-posta olarak iletilir.
      </p>

      <div className="mt-4 space-y-2.5">
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Konu"
          maxLength={200}
          disabled={busy}
          className="input-base w-full"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Mesajınız..."
          rows={6}
          maxLength={8000}
          disabled={busy}
          className="input-base w-full resize-y"
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <span
          className="text-[11.5px] tabular-nums"
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          {body.length}/8000
        </span>
        <button
          type="submit"
          disabled={busy || !subject.trim() || !body.trim()}
          className="btn-dark rounded-[6px] px-3 py-2 text-[13px] font-medium disabled:opacity-50"
        >
          {busy ? 'Gönderiliyor…' : 'Gönder'}
        </button>
      </div>

      {msg && (
        <p
          className="mt-3 text-[12px]"
          style={{ color: msg.tone === 'ok' ? '#16A34A' : '#DC2626' }}
        >
          {msg.text}
        </p>
      )}
    </form>
  );
}
