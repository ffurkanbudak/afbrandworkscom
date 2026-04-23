'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const KINDS = [
  { value: 'video', label: 'Yeni video' },
  { value: 'podcast', label: 'Yeni podcast bölümü' },
  { value: 'mail', label: 'Senin için bir not' },
  { value: 'etkinlik', label: 'Etkinlik daveti' },
  { value: 'yazi', label: 'Yeni yazı' },
  { value: 'duyuru', label: 'Duyuru' },
] as const;

type Kind = (typeof KINDS)[number]['value'];

const PLANS = [
  { value: 'GOZLEMCI', label: 'Gözlemci' },
  { value: 'ORTAK', label: 'Ortak' },
  { value: 'MIMARI', label: 'Mimari' },
] as const;

type Plan = (typeof PLANS)[number]['value'];

export function BroadcastForm() {
  const router = useRouter();
  const [kind, setKind] = useState<Kind>('yazi');
  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const [ctaLabel, setCtaLabel] = useState('');
  const [ctaUrl, setCtaUrl] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [selectedPlans, setSelectedPlans] = useState<Plan[]>(
    PLANS.map((p) => p.value),
  );
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  function togglePlan(p: Plan) {
    setSelectedPlans((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p],
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (!title.trim() || !intro.trim()) {
      setMsg({ kind: 'err', text: 'Başlık ve açıklama gerekli.' });
      return;
    }
    if ((ctaLabel.trim() && !ctaUrl.trim()) || (!ctaLabel.trim() && ctaUrl.trim())) {
      setMsg({ kind: 'err', text: 'CTA için hem etiket hem URL gerekli.' });
      return;
    }
    if (selectedPlans.length === 0) {
      setMsg({ kind: 'err', text: 'En az bir paket seçin.' });
      return;
    }
    const targetAll = selectedPlans.length === PLANS.length;
    const planLabel = targetAll
      ? 'tüm onaylı abonelere'
      : selectedPlans.map((p) => PLANS.find((x) => x.value === p)?.label).join(', ') + ' paketlerindeki abonelere';
    if (!confirm(`Yayın ${planLabel} gönderilsin mi?`)) return;

    setBusy(true);
    try {
      const res = await fetch('/api/admin/broadcast', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          kind,
          title,
          intro,
          ctaLabel: ctaLabel.trim() || null,
          ctaUrl: ctaUrl.trim() || null,
          previewText: previewText.trim() || null,
          targetPlans: selectedPlans,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg({ kind: 'err', text: data.error ?? 'Gönderilemedi.' });
      } else {
        setMsg({ kind: 'ok', text: `Gönderildi · ${data.sent} alıcı.` });
        setTitle('');
        setIntro('');
        setCtaLabel('');
        setCtaUrl('');
        setPreviewText('');
        router.refresh();
      }
    } catch {
      setMsg({ kind: 'err', text: 'Ağ hatası.' });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label="Tür">
        <div className="flex flex-wrap gap-1.5">
          {KINDS.map((k) => {
            const active = kind === k.value;
            return (
              <button
                type="button"
                key={k.value}
                onClick={() => setKind(k.value)}
                className="rounded-full border px-3 py-1.5 text-[12px] transition"
                style={{
                  borderColor: active ? 'var(--fg)' : 'var(--border)',
                  background: active ? 'var(--fg)' : 'transparent',
                  color: active ? 'var(--bg)' : 'var(--fg)',
                  fontWeight: active ? 600 : 500,
                }}
              >
                {k.label}
              </button>
            );
          })}
        </div>
      </Field>

      <Field label="Başlık">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Örn. Markalaşmanın 3 temel katmanı"
          className="w-full rounded-[6px] border px-3 py-2.5 text-[14px]"
          style={{ borderColor: 'var(--border)', background: 'transparent' }}
        />
      </Field>

      <Field label="Kısa açıklama / giriş">
        <textarea
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          rows={5}
          placeholder="Abonelere gösterilecek kısa metin. 2–3 cümle yeterli."
          className="w-full rounded-[6px] border px-3 py-2.5 text-[14px] leading-[1.6]"
          style={{ borderColor: 'var(--border)', background: 'transparent' }}
        />
      </Field>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="CTA etiketi (opsiyonel)">
          <input
            value={ctaLabel}
            onChange={(e) => setCtaLabel(e.target.value)}
            placeholder="İzle · Dinle · Oku"
            className="w-full rounded-[6px] border px-3 py-2.5 text-[14px]"
            style={{ borderColor: 'var(--border)', background: 'transparent' }}
          />
        </Field>
        <Field label="CTA bağlantısı (opsiyonel)">
          <input
            value={ctaUrl}
            onChange={(e) => setCtaUrl(e.target.value)}
            placeholder="https://…"
            className="w-full rounded-[6px] border px-3 py-2.5 text-[14px]"
            style={{ borderColor: 'var(--border)', background: 'transparent' }}
          />
        </Field>
      </div>

      <Field label="Önizleme metni (preheader, opsiyonel)">
        <input
          value={previewText}
          onChange={(e) => setPreviewText(e.target.value)}
          placeholder="Gelen kutusunda başlığın altında görünecek kısa satır."
          className="w-full rounded-[6px] border px-3 py-2.5 text-[13px]"
          style={{ borderColor: 'var(--border)', background: 'transparent' }}
        />
      </Field>

      <Field label="Hedef paketler">
        <div className="flex flex-wrap gap-1.5">
          {PLANS.map((p) => {
            const active = selectedPlans.includes(p.value);
            return (
              <button
                type="button"
                key={p.value}
                onClick={() => togglePlan(p.value)}
                className="rounded-full border px-3 py-1.5 text-[12px] transition"
                style={{
                  borderColor: active ? 'var(--fg)' : 'var(--border)',
                  background: active ? 'var(--fg)' : 'transparent',
                  color: active ? 'var(--bg)' : 'var(--fg)',
                  fontWeight: active ? 600 : 500,
                }}
              >
                {p.label}
              </button>
            );
          })}
        </div>
        <p
          className="mt-2 text-[11.5px]"
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          Seçilen paketlerdeki onaylı abonelere gönderilir. Tümünü seçmek
          tüm abonelere gönderir.
        </p>
      </Field>

      {msg && (
        <p
          className="text-[12.5px]"
          style={{ color: msg.kind === 'err' ? '#DC2626' : '#16A34A' }}
        >
          {msg.text}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="btn-red w-full rounded-full py-3 text-[13px] font-semibold tracking-[0.02em]"
      >
        {busy ? 'Gönderiliyor…' : selectedPlans.length === PLANS.length ? 'Tüm abonelere gönderin' : 'Seçili paketlere gönderin'}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
