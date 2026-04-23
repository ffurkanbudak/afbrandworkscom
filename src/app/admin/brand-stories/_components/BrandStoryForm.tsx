'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

type Decision = { title: string; body: string };

export type BrandStoryInitial = {
  name: string;
  slug: string;
  sector: string;
  foundedYear: number;
  headquartersCity: string;
  headquartersCountry: string;
  origin: 'GLOBAL' | 'LOCAL';
  logoUrl: string;
  coverImageUrl: string;
  founderImageUrl: string;
  positioning: string;
  foundingStory: string;
  founderVision: string;
  strategicDecisions: Decision[];
  crisesAndTurningPoints: string;
  currentPosition: string;
  editorialNote: string;
  metaTitle: string;
  metaDescription: string;
  status: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'ARCHIVED';
  featured: boolean;
};

const EMPTY: BrandStoryInitial = {
  name: '',
  slug: '',
  sector: '',
  foundedYear: new Date().getFullYear(),
  headquartersCity: '',
  headquartersCountry: 'Türkiye',
  origin: 'LOCAL',
  logoUrl: '',
  coverImageUrl: '',
  founderImageUrl: '',
  positioning: '',
  foundingStory: '',
  founderVision: '',
  strategicDecisions: [],
  crisesAndTurningPoints: '',
  currentPosition: '',
  editorialNote: '',
  metaTitle: '',
  metaDescription: '',
  status: 'DRAFT',
  featured: false,
};

const SECTOR_SUGGESTIONS = [
  'Havacılık', 'Otomotiv', 'Teknoloji', 'Medya', 'Yayıncılık',
  'Moda', 'Perakende', 'Finans', 'Yemek-İçecek', 'Seyahat',
  'Sağlık', 'Eğitim', 'Dijital', 'Enerji', 'Savunma', 'Lojistik',
];

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u')
    .replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

type Mode = { kind: 'create' } | { kind: 'edit'; id: string };

const inputBase = 'w-full rounded-[8px] border px-3 py-2 text-[13px]';
const inputStyle = {
  borderColor: 'var(--border)',
  background: 'var(--bg)',
  color: 'var(--fg)',
};

export function BrandStoryForm({
  mode,
  initial = EMPTY,
}: {
  mode: Mode;
  initial?: BrandStoryInitial;
}) {
  const router = useRouter();
  const [data, setData] = useState<BrandStoryInitial>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const logoRef = useRef<HTMLInputElement | null>(null);
  const coverRef = useRef<HTMLInputElement | null>(null);
  const founderRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState<'logo' | 'cover' | 'founder' | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const autoSlug = useMemo(() => slugify(data.name), [data.name]);
  const effectiveSlug = data.slug || autoSlug;

  function update<K extends keyof BrandStoryInitial>(key: K, value: BrandStoryInitial[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'logoUrl' | 'coverImageUrl' | 'founderImageUrl',
    label: 'logo' | 'cover' | 'founder',
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    setUploading(label);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      const json = await res.json();
      if (!res.ok) {
        setUploadError(json.error ?? 'Yüklenemedi.');
      } else {
        update(field, json.url);
      }
    } catch {
      setUploadError('Ağ hatası.');
    } finally {
      setUploading(null);
      e.target.value = '';
    }
  }

  function addDecision() {
    update('strategicDecisions', [...data.strategicDecisions, { title: '', body: '' }]);
  }

  function updateDecision(index: number, patch: Partial<Decision>) {
    update(
      'strategicDecisions',
      data.strategicDecisions.map((d, i) => (i === index ? { ...d, ...patch } : d)),
    );
  }

  function removeDecision(index: number) {
    update(
      'strategicDecisions',
      data.strategicDecisions.filter((_, i) => i !== index),
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!data.name.trim()) {
      setError('Marka adı zorunlu.');
      return;
    }
    setBusy(true);
    const body = {
      ...data,
      slug: effectiveSlug,
      foundedYear: Number(data.foundedYear),
    };
    try {
      const url =
        mode.kind === 'create'
          ? '/api/admin/brand-stories'
          : `/api/admin/brand-stories/${mode.id}`;
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
        router.push('/admin/brand-stories');
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
    if (!confirm('Marka hikayesi kalıcı olarak silinsin mi?')) return;
    setBusy(true);
    try {
      const res = await fetch(`/admin/brand-stories/${mode.id}`);
      const resDel = await fetch(`/api/admin/brand-stories/${mode.id}`, { method: 'DELETE' });
      if (resDel.ok) router.push('/admin/brand-stories');
      else {
        const j = await resDel.json().catch(() => ({}));
        setError(j.error ?? 'Silinemedi.');
        setBusy(false);
      }
    } catch {
      setError('Ağ hatası.');
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[2.2fr_1fr]">
      <div className="space-y-6">
        <section className="space-y-4">
          <p className="eyebrow">Temel bilgi</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <LabeledInput label="Marka adı" value={data.name} onChange={(v) => update('name', v)} required />
            <LabeledInput
              label="Slug"
              value={data.slug}
              onChange={(v) => update('slug', v)}
              placeholder={autoSlug}
              mono
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <LabeledInput
              label="Sektör"
              value={data.sector}
              onChange={(v) => update('sector', v)}
              list="sectors"
            />
            <datalist id="sectors">
              {SECTOR_SUGGESTIONS.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
            <LabeledInput
              label="Kuruluş yılı"
              type="number"
              value={String(data.foundedYear)}
              onChange={(v) => update('foundedYear', Number(v))}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <LabeledInput
              label="Merkez şehir"
              value={data.headquartersCity}
              onChange={(v) => update('headquartersCity', v)}
            />
            <LabeledInput
              label="Merkez ülke"
              value={data.headquartersCountry}
              onChange={(v) => update('headquartersCountry', v)}
            />
            <LabeledField label="Menşei">
              <select
                value={data.origin}
                onChange={(e) => update('origin', e.target.value as 'GLOBAL' | 'LOCAL')}
                className={inputBase}
                style={inputStyle}
              >
                <option value="LOCAL">Yerel (Türkiye)</option>
                <option value="GLOBAL">Global</option>
              </select>
            </LabeledField>
          </div>
        </section>

        <section className="space-y-4">
          <p className="eyebrow">Görseller</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <ImageField
              label="Logo"
              url={data.logoUrl}
              uploading={uploading === 'logo'}
              onPick={() => logoRef.current?.click()}
              onClear={() => update('logoUrl', '')}
              rounded
            />
            <input
              type="file"
              accept="image/*"
              ref={logoRef}
              onChange={(e) => handleUpload(e, 'logoUrl', 'logo')}
              className="hidden"
            />
            <ImageField
              label="Kapak"
              url={data.coverImageUrl}
              uploading={uploading === 'cover'}
              onPick={() => coverRef.current?.click()}
              onClear={() => update('coverImageUrl', '')}
            />
            <input
              type="file"
              accept="image/*"
              ref={coverRef}
              onChange={(e) => handleUpload(e, 'coverImageUrl', 'cover')}
              className="hidden"
            />
            <ImageField
              label="Kurucu fotoğrafı"
              url={data.founderImageUrl}
              uploading={uploading === 'founder'}
              onPick={() => founderRef.current?.click()}
              onClear={() => update('founderImageUrl', '')}
              rounded
            />
            <input
              type="file"
              accept="image/*"
              ref={founderRef}
              onChange={(e) => handleUpload(e, 'founderImageUrl', 'founder')}
              className="hidden"
            />
          </div>
          {uploadError && (
            <p className="text-[12px]" style={{ color: '#DC2626' }}>
              {uploadError}
            </p>
          )}
        </section>

        <section className="space-y-4">
          <p className="eyebrow">Hikaye bölümleri</p>
          <LabeledTextarea
            label="1. Konumlandırma cümlesi"
            hint="Markayı tek cümlede özetleyen keskin bir ifade."
            rows={2}
            value={data.positioning}
            onChange={(v) => update('positioning', v)}
          />
          <LabeledTextarea
            label="2. Kuruluş hikayesi"
            hint="300-500 kelime. Hikaye anlatıcısı tonuyla, akademik disiplinle."
            rows={10}
            value={data.foundingStory}
            onChange={(v) => update('foundingStory', v)}
          />
          <LabeledTextarea
            label="3. Kurucunun vizyonu"
            hint="200-300 kelime."
            rows={7}
            value={data.founderVision}
            onChange={(v) => update('founderVision', v)}
          />

          <div>
            <p
              className="text-[11.5px] font-semibold tracking-[0.08em] uppercase"
              style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
            >
              4. Markayı ayıran stratejik kararlar
            </p>
            <p
              className="mt-1 text-[11.5px]"
              style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
            >
              3-5 madde. Her biri kısa başlık + 2-3 cümle açıklama.
            </p>
            <div className="mt-3 space-y-3">
              {data.strategicDecisions.map((d, i) => (
                <div
                  key={i}
                  className="rounded-[10px] border p-3"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className="flex items-center gap-2">
                    <input
                      value={d.title}
                      onChange={(e) => updateDecision(i, { title: e.target.value })}
                      placeholder="Karar başlığı"
                      className="flex-1 rounded-[6px] border px-2.5 py-1.5 text-[13px] font-semibold"
                      style={inputStyle}
                    />
                    <button
                      type="button"
                      onClick={() => removeDecision(i)}
                      aria-label="Kaldır"
                      className="flex h-8 w-8 items-center justify-center rounded-[6px]"
                      style={{ color: '#DC2626' }}
                    >
                      <Trash2 className="h-[14px] w-[14px]" strokeWidth={1.75} />
                    </button>
                  </div>
                  <textarea
                    value={d.body}
                    onChange={(e) => updateDecision(i, { body: e.target.value })}
                    rows={3}
                    placeholder="2-3 cümle açıklama"
                    className="mt-2 w-full rounded-[6px] border px-2.5 py-2 text-[13px]"
                    style={inputStyle}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addDecision}
                className="inline-flex items-center gap-2 rounded-[8px] border px-3 py-2 text-[12.5px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
                style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
              >
                <Plus className="h-[12px] w-[12px]" strokeWidth={2} />
                Karar ekleyin
              </button>
            </div>
          </div>

          <LabeledTextarea
            label="5. Krizler ve dönüm noktaları"
            hint="200-400 kelime."
            rows={8}
            value={data.crisesAndTurningPoints}
            onChange={(v) => update('crisesAndTurningPoints', v)}
          />
          <LabeledTextarea
            label="6. Günümüzdeki konumu"
            hint="200-300 kelime."
            rows={7}
            value={data.currentPosition}
            onChange={(v) => update('currentPosition', v)}
          />
          <LabeledTextarea
            label="7. afbrandworks editoryal yorumu"
            hint="200-300 kelime. 2-3 temel marka inşa dersi. Klişe yok."
            rows={8}
            value={data.editorialNote}
            onChange={(v) => update('editorialNote', v)}
          />
        </section>

        <section className="space-y-4">
          <p className="eyebrow">SEO</p>
          <LabeledInput
            label="Meta başlık"
            value={data.metaTitle}
            onChange={(v) => update('metaTitle', v)}
          />
          <LabeledTextarea
            label="Meta açıklama"
            rows={3}
            value={data.metaDescription}
            onChange={(v) => update('metaDescription', v)}
          />
        </section>
      </div>

      <aside className="space-y-5">
        <div className="rounded-2xl border p-5" style={{ borderColor: 'var(--border)' }}>
          <LabeledField label="Durum">
            <select
              value={data.status}
              onChange={(e) => update('status', e.target.value as BrandStoryInitial['status'])}
              className={inputBase}
              style={inputStyle}
            >
              <option value="DRAFT">Taslak</option>
              <option value="PUBLISHED">Yayında</option>
              <option value="SCHEDULED">Zamanla</option>
              <option value="ARCHIVED">Arşivlendi</option>
            </select>
          </LabeledField>

          <label className="mt-4 flex items-center gap-2 text-[13px]">
            <input
              type="checkbox"
              checked={data.featured}
              onChange={(e) => update('featured', e.target.checked)}
            />
            Öne çıkarılmış marka
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
            {busy ? 'Kaydediliyor…' : mode.kind === 'create' ? 'Markayı kaydedin' : 'Değişiklikleri kaydedin'}
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
              Markayı silin
            </button>
          </div>
        )}
      </aside>
    </form>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = 'text',
  mono = false,
  list,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  mono?: boolean;
  list?: string;
}) {
  return (
    <label className="block">
      <span
        className="text-[11.5px] font-semibold tracking-[0.08em] uppercase"
        style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
      >
        {label}
        {required && ' *'}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        list={list}
        className={`${inputBase} mt-1.5 ${mono ? 'font-mono text-[12.5px]' : ''}`}
        style={inputStyle}
      />
    </label>
  );
}

function LabeledTextarea({
  label,
  value,
  onChange,
  rows = 4,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  hint?: string;
}) {
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  return (
    <label className="block">
      <span
        className="text-[11.5px] font-semibold tracking-[0.08em] uppercase"
        style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
      >
        {label}
      </span>
      {hint && (
        <span
          className="ml-2 text-[11px]"
          style={{ color: 'color-mix(in oklab, var(--fg) 50%, transparent)' }}
        >
          {hint}
        </span>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={`${inputBase} mt-1.5 leading-[1.6]`}
        style={inputStyle}
      />
      <span
        className="mt-1 block text-right text-[10.5px]"
        style={{ color: 'color-mix(in oklab, var(--fg) 50%, transparent)' }}
      >
        {wordCount} kelime
      </span>
    </label>
  );
}

function LabeledField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span
        className="text-[11.5px] font-semibold tracking-[0.08em] uppercase"
        style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
      >
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function ImageField({
  label,
  url,
  uploading,
  onPick,
  onClear,
  rounded,
}: {
  label: string;
  url: string;
  uploading: boolean;
  onPick: () => void;
  onClear: () => void;
  rounded?: boolean;
}) {
  return (
    <div>
      <p
        className="text-[11.5px] font-semibold tracking-[0.08em] uppercase"
        style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
      >
        {label}
      </p>
      <div className="mt-2 flex items-center gap-3">
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt=""
            className={`h-14 w-14 object-cover ${rounded ? 'rounded-full' : 'rounded-[6px]'}`}
            style={{ background: 'var(--bg-soft)' }}
          />
        ) : (
          <div
            className={`flex h-14 w-14 items-center justify-center text-[10px] ${rounded ? 'rounded-full' : 'rounded-[6px]'}`}
            style={{
              background: 'color-mix(in oklab, var(--fg) 6%, transparent)',
              color: 'color-mix(in oklab, var(--fg) 55%, transparent)',
            }}
          >
            –
          </div>
        )}
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={onPick}
            disabled={uploading}
            className="rounded-[6px] border px-2.5 py-1 text-[11.5px] font-medium disabled:opacity-60"
            style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
          >
            {uploading ? 'Yükleniyor…' : url ? 'Değiştirin' : 'Yükleyin'}
          </button>
          {url && (
            <button
              type="button"
              onClick={onClear}
              className="text-left text-[10.5px]"
              style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
            >
              Kaldırın
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
