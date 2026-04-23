'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { SubscriberStatus, SubscriberTier } from '@prisma/client';
import { TIER_LABEL, TIER_ORDER } from '../../_lib/tier';

export function SubscriberActions({
  id,
  currentTier,
  showInCommunity,
  activityScore,
  status,
  email,
}: {
  id: string;
  currentTier: SubscriberTier;
  showInCommunity: boolean;
  activityScore: number;
  status: SubscriberStatus;
  email: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function patch(body: Record<string, unknown>, ok: string) {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/subscribers/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setMsg(j.error ?? 'Hata');
      } else {
        setMsg(ok);
        router.refresh();
      }
    } catch {
      setMsg('Ağ hatası.');
    } finally {
      setBusy(false);
    }
  }

  async function onDelete() {
    if (!confirm(`${email} kaydı kalıcı olarak silinsin mi? Bu işlem geri alınamaz.`)) return;
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/subscribers/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setMsg(j.error ?? 'Silinemedi.');
        setBusy(false);
        return;
      }
      router.push('/admin/subscribers');
    } catch {
      setMsg('Ağ hatası.');
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border p-5" style={{ borderColor: 'var(--border)' }}>
      <p className="eyebrow">Yönetici işlemleri</p>

      {status === 'PENDING' && (
        <div
          className="mt-4 rounded-[10px] border p-4"
          style={{
            borderColor: 'color-mix(in oklab, #16A34A 40%, transparent)',
            background: 'color-mix(in oklab, #16A34A 7%, transparent)',
          }}
        >
          <p className="text-[12.5px] font-semibold">Onay bekleniyor</p>
          <p
            className="mt-1 text-[12px] leading-[1.55]"
            style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
          >
            Onayladığında aboneye erişim linki e-posta ile gönderilecek.
          </p>
          <button
            disabled={busy}
            onClick={() =>
              patch({ action: 'approve' }, 'Abone onaylandı. E-posta gönderildi.')
            }
            className="mt-3 w-full rounded-[8px] px-4 py-2.5 text-[13px] font-semibold transition hover:opacity-90 disabled:opacity-50"
            style={{ background: '#16A34A', color: '#FFFFFF' }}
          >
            {busy ? 'İşleniyor…' : 'Aboneyi onayla'}
          </button>
        </div>
      )}

      <div className="mt-4">
        <p className="text-[12px] font-semibold">Kademe</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {TIER_ORDER.map((t) => (
            <button
              key={t}
              disabled={busy}
              onClick={() => patch({ tier: t }, `Kademe ${TIER_LABEL[t]} olarak ayarlandı.`)}
              className="rounded-[6px] border px-2.5 py-1 text-[12px] transition disabled:opacity-50"
              style={{
                borderColor: currentTier === t ? 'var(--fg)' : 'var(--border)',
                background: currentTier === t ? 'color-mix(in oklab, var(--fg) 10%, transparent)' : 'transparent',
                fontWeight: currentTier === t ? 600 : 400,
              }}
            >
              {TIER_LABEL[t]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-[12px] font-semibold">Aktivite puanı</p>
        <div className="mt-2 flex items-center gap-1.5">
          {[10, 25, 50].map((delta) => (
            <button
              key={delta}
              disabled={busy}
              onClick={() => patch({ activityScoreDelta: delta }, `+${delta} puan eklendi.`)}
              className="rounded-[6px] border px-2.5 py-1 text-[12px] disabled:opacity-50"
              style={{ borderColor: 'var(--border)' }}
            >
              +{delta}
            </button>
          ))}
          <span className="ml-auto tabular-nums text-[12px]" style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}>
            şu an: {activityScore}
          </span>
        </div>
      </div>

      <label className="mt-5 flex items-center gap-2 text-[13px]">
        <input
          type="checkbox"
          defaultChecked={showInCommunity}
          disabled={busy}
          onChange={(e) =>
            patch({ showInCommunity: e.target.checked }, e.target.checked ? 'Topluluk akışında görünür.' : 'Toplulukta gizlendi.')
          }
        />
        Anasayfa topluluk akışında göster
      </label>

      {msg && (
        <p className="mt-4 text-[12px]" style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}>
          {msg}
        </p>
      )}

      <div
        className="mt-6 border-t pt-5"
        style={{ borderColor: 'var(--border)' }}
      >
        <p className="eyebrow">Tehlikeli bölge</p>
        <p
          className="mt-2 text-[12px] leading-[1.55]"
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        >
          Aboneyi kalıcı olarak sil. Notlar ve teslimat kayıtları da silinir.
        </p>
        <button
          type="button"
          disabled={busy}
          onClick={onDelete}
          className="mt-3 w-full rounded-[8px] border px-4 py-2.5 text-[13px] font-semibold transition hover:bg-[color-mix(in_oklab,#DC2626_8%,transparent)] disabled:opacity-50"
          style={{
            borderColor: 'color-mix(in oklab, #DC2626 45%, transparent)',
            color: '#DC2626',
          }}
        >
          Aboneyi sil
        </button>
      </div>
    </div>
  );
}
