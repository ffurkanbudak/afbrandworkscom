'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

type SponsorInitial = {
  name: string;
  logoUrl: string;
  bio: string;
  websiteUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  xUrl: string;
  tier: 'DAILY' | 'MONTHLY' | 'QUARTERLY';
  startDate: string;
  endDate: string;
  active: boolean;
};

const EMPTY: SponsorInitial = {
  name: '',
  logoUrl: '',
  bio: '',
  websiteUrl: '',
  linkedinUrl: '',
  instagramUrl: '',
  xUrl: '',
  tier: 'MONTHLY',
  startDate: '',
  endDate: '',
  active: true,
};

export function SponsorForm({
  mode,
  initial = EMPTY,
}: {
  mode: { kind: 'create' } | { kind: 'edit'; id: string };
  initial?: SponsorInitial;
}) {
  const router = useRouter();
  const [data, setData] = useState<SponsorInitial>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  function update<K extends keyof SponsorInitial>(key: K, value: SponsorInitial[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      const json = await res.json();
      if (!res.ok) {
        setUploadError(json.error ?? 'Yüklenemedi.');
      } else {
        update('logoUrl', json.url);
      }
    } catch {
      setUploadError('Ağ hatası.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!data.name.trim()) {
      setError('İsim zorunlu.');
      return;
    }
    if (!data.endDate) {
      setError('Bitiş tarihi zorunlu.');
      return;
    }
    setBusy(true);
    const body = {
      ...data,
      startDate: data.startDate || new Date().toISOString().slice(0, 10),
    };
    try {
      const url =
        mode.kind === 'create'
          ? '/api/admin/sponsors'
          : `/api/admin/sponsors/${mode.id}`;
      const method = mode.kind === 'create' ? 'POST' : 'PATCH';
      const res = await fetch(url, {
        method,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? 'Kaydedilemedi.');
        setBusy(false);
        return;
      }
      if (mode.kind === 'create') {
        router.push('/admin/sponsors');
      } else {
        setSuccess('Kaydedildi.');
        setBusy(false);
        router.refresh();
      }
    } catch {
      setError('Ağ hatası.');
      setBusy(false);
    }
  }

  async function onDelete() {
    if (mode.kind !== 'edit') return;
    if (!confirm('Sponsor kalıcı olarak silinsin mi?')) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/sponsors/${mode.id}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/admin/sponsors');
      } else {
        const j = await res.json().catch(() => ({}));
        setError(j.error ?? 'Silinemedi.');
        setBusy(false);
      }
    } catch {
      setError('Ağ hatası.');
      setBusy(false);
    }
  }

  const inputBase = 'w-full rounded-[8px] border px-3 py-2 text-[13px]';
  const inputStyle = {
    borderColor: 'var(--border)',
    background: 'var(--bg)',
    color: 'var(--fg)',
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <div className="space-y-5">
        <label className="block">
          <span className="text-[11.5px] font-semibold tracking-[0.08em] uppercase" style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}>
            Marka adı
          </span>
          <input
            value={data.name}
            onChange={(e) => update('name', e.target.value)}
            className={inputBase + ' mt-1.5 text-[15px]'}
            style={inputStyle}
          />
        </label>
        <label className="block">
          <span className="text-[11.5px] font-semibold tracking-[0.08em] uppercase" style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}>
            Kısa tanıtım
          </span>
          <textarea
            value={data.bio}
            onChange={(e) => update('bio', e.target.value)}
            rows={3}
            className={inputBase + ' mt-1.5'}
            style={inputStyle}
          />
        </label>

        <div>
          <span className="text-[11.5px] font-semibold tracking-[0.08em] uppercase" style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}>
            Logo
          </span>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFile}
            className="hidden"
          />
          <div className="mt-1.5 flex items-center gap-3">
            {data.logoUrl && (
              <img
                src={data.logoUrl}
                alt=""
                className="h-14 w-14 rounded-full object-cover"
                style={{ background: 'var(--bg-soft)' }}
              />
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="rounded-[8px] border px-3 py-2 text-[12.5px] font-medium disabled:opacity-60"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
            >
              {uploading ? 'Yükleniyor…' : data.logoUrl ? 'Logoyu değiştirin' : 'Logoyu yükleyin'}
            </button>
            {data.logoUrl && (
              <button
                type="button"
                onClick={() => update('logoUrl', '')}
                className="rounded-[8px] px-3 py-2 text-[12.5px]"
                style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
              >
                Kaldırın
              </button>
            )}
          </div>
          {uploadError && (
            <p className="mt-2 text-[12px]" style={{ color: '#DC2626' }}>
              {uploadError}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-[11.5px] font-semibold tracking-[0.08em] uppercase" style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}>
              Web sitesi
            </span>
            <input
              type="url"
              value={data.websiteUrl}
              onChange={(e) => update('websiteUrl', e.target.value)}
              placeholder="https://"
              className={inputBase + ' mt-1.5'}
              style={inputStyle}
            />
          </label>
          <label className="block">
            <span className="text-[11.5px] font-semibold tracking-[0.08em] uppercase" style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}>
              LinkedIn
            </span>
            <input
              type="url"
              value={data.linkedinUrl}
              onChange={(e) => update('linkedinUrl', e.target.value)}
              placeholder="https://linkedin.com/company/…"
              className={inputBase + ' mt-1.5'}
              style={inputStyle}
            />
          </label>
          <label className="block">
            <span className="text-[11.5px] font-semibold tracking-[0.08em] uppercase" style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}>
              Instagram
            </span>
            <input
              type="url"
              value={data.instagramUrl}
              onChange={(e) => update('instagramUrl', e.target.value)}
              placeholder="https://instagram.com/…"
              className={inputBase + ' mt-1.5'}
              style={inputStyle}
            />
          </label>
          <label className="block">
            <span className="text-[11.5px] font-semibold tracking-[0.08em] uppercase" style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}>
              X (Twitter)
            </span>
            <input
              type="url"
              value={data.xUrl}
              onChange={(e) => update('xUrl', e.target.value)}
              placeholder="https://x.com/…"
              className={inputBase + ' mt-1.5'}
              style={inputStyle}
            />
          </label>
        </div>
      </div>

      <aside className="space-y-5">
        <div
          className="rounded-2xl border p-5"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="eyebrow">Süre ve paket</p>

          <label className="mt-4 block">
            <span className="text-[11.5px] font-semibold tracking-[0.08em] uppercase" style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}>
              Tier
            </span>
            <select
              value={data.tier}
              onChange={(e) => update('tier', e.target.value as SponsorInitial['tier'])}
              className={inputBase + ' mt-1.5'}
              style={inputStyle}
            >
              <option value="DAILY">Günlük</option>
              <option value="MONTHLY">Aylık</option>
              <option value="QUARTERLY">Üç aylık</option>
            </select>
          </label>

          <label className="mt-3 block">
            <span className="text-[11.5px] font-semibold tracking-[0.08em] uppercase" style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}>
              Başlangıç
            </span>
            <input
              type="date"
              value={data.startDate}
              onChange={(e) => update('startDate', e.target.value)}
              className={inputBase + ' mt-1.5'}
              style={inputStyle}
            />
          </label>

          <label className="mt-3 block">
            <span className="text-[11.5px] font-semibold tracking-[0.08em] uppercase" style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}>
              Bitiş
            </span>
            <input
              type="date"
              value={data.endDate}
              onChange={(e) => update('endDate', e.target.value)}
              className={inputBase + ' mt-1.5'}
              style={inputStyle}
            />
          </label>

          <label className="mt-4 flex items-center gap-2 text-[13px]">
            <input
              type="checkbox"
              checked={data.active}
              onChange={(e) => update('active', e.target.checked)}
            />
            Yayında (tarih aralığı geçerliyken gösterilir)
          </label>

          {error && (
            <p className="mt-4 text-[12.5px]" style={{ color: '#DC2626' }}>
              {error}
            </p>
          )}
          {success && (
            <p className="mt-4 text-[12.5px]" style={{ color: '#16A34A' }}>
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="btn-dark mt-5 w-full rounded-[8px] py-2.5 text-[13px] font-semibold disabled:opacity-60"
          >
            {busy ? 'Kaydediliyor…' : mode.kind === 'create' ? 'Sponsoru kaydedin' : 'Değişiklikleri kaydedin'}
          </button>
        </div>

        {mode.kind === 'edit' && (
          <div
            className="rounded-2xl border p-5"
            style={{ borderColor: 'var(--border)' }}
          >
            <p className="eyebrow">Tehlikeli bölge</p>
            <button
              type="button"
              onClick={onDelete}
              disabled={busy}
              className="mt-3 w-full rounded-[8px] border px-3 py-2 text-[12.5px] font-medium transition hover:bg-[color-mix(in_oklab,#DC2626_8%,transparent)] disabled:opacity-50"
              style={{
                borderColor: 'color-mix(in oklab, #DC2626 45%, transparent)',
                color: '#DC2626',
              }}
            >
              Sponsoru silin
            </button>
          </div>
        )}
      </aside>
    </form>
  );
}
