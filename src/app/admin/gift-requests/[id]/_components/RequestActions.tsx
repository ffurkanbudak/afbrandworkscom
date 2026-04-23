'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const STATUS_OPTIONS = [
  { value: 'PENDING', label: 'Yeni' },
  { value: 'AWAITING_PAYMENT', label: 'Ödeme bekleniyor' },
  { value: 'COMPLETED', label: 'Tamamlandı' },
  { value: 'CANCELLED', label: 'İptal' },
] as const;

export function RequestActions({
  id,
  status,
  adminNote,
  issuedCode,
}: {
  id: string;
  status: string;
  adminNote: string;
  issuedCode: string;
}) {
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState(status);
  const [note, setNote] = useState(adminNote);
  const [code, setCode] = useState(issuedCode);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function save() {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/gift-requests/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          status: currentStatus,
          adminNote: note,
          issuedCode: code,
        }),
      });
      if (res.ok) {
        setMsg('Kaydedildi.');
        router.refresh();
      } else {
        const j = await res.json().catch(() => ({}));
        setMsg(j.error ?? 'Hata.');
      }
    } catch {
      setMsg('Ağ hatası.');
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm('Bu talep kaydı silinsin mi?')) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/gift-requests/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) router.push('/admin/gift-requests');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="rounded-2xl border p-5"
      style={{ borderColor: 'var(--border)' }}
    >
      <p className="eyebrow">Yönetici işlemleri</p>

      <div className="mt-4">
        <p
          className="text-[11.5px] font-semibold tracking-[0.08em] uppercase"
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        >
          Durum
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {STATUS_OPTIONS.map((o) => (
            <button
              key={o.value}
              type="button"
              disabled={busy}
              onClick={() => setCurrentStatus(o.value)}
              className="rounded-[6px] border px-2.5 py-1 text-[12px] transition"
              style={{
                borderColor: currentStatus === o.value ? 'var(--fg)' : 'var(--border)',
                background:
                  currentStatus === o.value
                    ? 'color-mix(in oklab, var(--fg) 8%, transparent)'
                    : 'transparent',
                fontWeight: currentStatus === o.value ? 600 : 400,
              }}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <label className="mt-4 block">
        <span
          className="text-[11.5px] font-semibold tracking-[0.08em] uppercase"
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        >
          Üretilen kod (opsiyonel)
        </span>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="AFB-XXXXX-XXXXX"
          className="mt-1.5 w-full rounded-[8px] border px-3 py-2 font-mono text-[13px] tracking-wider"
          style={{
            borderColor: 'var(--border)',
            background: 'var(--bg)',
            color: 'var(--fg)',
          }}
        />
      </label>

      <label className="mt-4 block">
        <span
          className="text-[11.5px] font-semibold tracking-[0.08em] uppercase"
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        >
          İç not
        </span>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="mt-1.5 w-full rounded-[8px] border px-3 py-2 text-[13px]"
          style={{
            borderColor: 'var(--border)',
            background: 'var(--bg)',
            color: 'var(--fg)',
          }}
        />
      </label>

      <button
        onClick={save}
        disabled={busy}
        className="btn-dark mt-4 w-full rounded-[8px] py-2.5 text-[13px] font-semibold disabled:opacity-60"
      >
        {busy ? 'Kaydediliyor…' : 'Kaydet'}
      </button>

      {msg && (
        <p
          className="mt-3 text-[12px]"
          style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
        >
          {msg}
        </p>
      )}

      <div
        className="mt-6 border-t pt-5"
        style={{ borderColor: 'var(--border)' }}
      >
        <p className="eyebrow">Tehlikeli bölge</p>
        <button
          onClick={remove}
          disabled={busy}
          className="mt-3 w-full rounded-[8px] border px-3 py-2 text-[12.5px] font-medium transition hover:bg-[color-mix(in_oklab,#DC2626_8%,transparent)] disabled:opacity-50"
          style={{
            borderColor: 'color-mix(in oklab, #DC2626 45%, transparent)',
            color: '#DC2626',
          }}
        >
          Talep kaydını sil
        </button>
      </div>
    </div>
  );
}
