'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Field, inputClass, inputStyle } from '../_components/FormField';

type Initial = {
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  email: string;
  role: string;
};

const TITLE_SUGGESTIONS = [
  'Stratejik marka danışmanı',
  'Marka mimarı',
  'Kurucu',
  'Yazı editörü',
];

export function ProfileForm({ initial }: { initial: Initial }) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState(initial.name);
  const [title, setTitle] = useState(initial.title);
  const [bio, setBio] = useState(initial.bio);
  const [avatarUrl, setAvatarUrl] = useState(initial.avatarUrl);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  async function handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      setMsg({ kind: 'err', text: 'Sadece görsel dosyaları yükleyebilirsin.' });
      return;
    }
    setUploading(true);
    setMsg(null);
    try {
      const dataUrl = await resizeImage(file, 256, 0.85);
      setAvatarUrl(dataUrl);
    } catch {
      setMsg({ kind: 'err', text: 'Görsel okunamadı.' });
    } finally {
      setUploading(false);
    }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: name || null,
          title: title || null,
          bio: bio || null,
          avatarUrl: avatarUrl || null,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setMsg({ kind: 'err', text: j.error ?? 'Kaydedilemedi.' });
      } else {
        setMsg({ kind: 'ok', text: 'Kaydedildi.' });
        router.refresh();
      }
    } catch {
      setMsg({ kind: 'err', text: 'Ağ hatası.' });
    } finally {
      setBusy(false);
    }
  }

  const initial1 = (name || initial.email).slice(0, 1).toUpperCase();

  return (
    <form onSubmit={save} className="grid gap-10 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div>
          <p className="eyebrow">Profil fotoğrafı</p>
          <div className="mt-3 flex items-center gap-5">
            <div
              className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border"
              style={{
                borderColor: 'var(--border)',
                background: avatarUrl ? 'transparent' : 'color-mix(in oklab, var(--fg) 5%, transparent)',
              }}
            >
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarUrl} alt={name || 'Avatar'} className="h-full w-full object-cover" />
              ) : (
                <span
                  className="text-[24px] font-semibold"
                  style={{ color: 'color-mix(in oklab, var(--fg) 75%, transparent)' }}
                >
                  {initial1}
                </span>
              )}
              {uploading && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: 'rgba(10,10,10,0.45)', color: '#fff' }}
                >
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="inline-flex items-center gap-1.5 rounded-[6px] border px-3 py-2 text-[12.5px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
                  style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                >
                  <Upload className="h-[13px] w-[13px]" strokeWidth={1.85} />
                  {avatarUrl ? 'Fotoğrafı değiştir' : 'Fotoğraf yükle'}
                </button>
                {avatarUrl && (
                  <button
                    type="button"
                    onClick={() => setAvatarUrl('')}
                    className="inline-flex items-center gap-1.5 rounded-[6px] border px-3 py-2 text-[12.5px] font-medium transition hover:bg-[color-mix(in_oklab,#DC2626_6%,transparent)]"
                    style={{ borderColor: 'var(--border)', color: '#DC2626' }}
                  >
                    <X className="h-[13px] w-[13px]" strokeWidth={1.85} />
                    Kaldır
                  </button>
                )}
              </div>
              <p
                className="text-[11.5px] leading-[1.5]"
                style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
              >
                JPG, PNG ya da WebP. Otomatik olarak 256×256'ya sığdırılır.
              </p>
              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                  e.target.value = '';
                }}
              />
            </div>
          </div>

          <details className="mt-4">
            <summary
              className="cursor-pointer text-[11.5px] font-medium tracking-[0.08em]"
              style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
            >
              Bunun yerine dış bir URL kullan
            </summary>
            <input
              value={avatarUrl.startsWith('data:') ? '' : avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className={inputClass + ' mt-3'}
              style={inputStyle}
              placeholder="https://…"
            />
          </details>
        </div>

        <Field label="Görünen ad" required>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            style={inputStyle}
            placeholder="Ahmet Furkan Budak"
          />
        </Field>

        <div>
          <Field label="Unvan" hint="Ana sayfa imzanda ve panel üst çubuğunda görünür.">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              style={inputStyle}
              placeholder="Stratejik marka danışmanı"
            />
          </Field>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {TITLE_SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setTitle(s)}
                className="rounded-full border px-2.5 py-1 text-[11px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
                style={{
                  borderColor: 'var(--border)',
                  color:
                    title === s
                      ? 'var(--fg)'
                      : 'color-mix(in oklab, var(--fg) 65%, transparent)',
                  background:
                    title === s ? 'color-mix(in oklab, var(--fg) 6%, transparent)' : 'transparent',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <Field label="Kısa biyografi" hint="Yazı imzalarında kullanılır. İki üç cümleyi geçmesin.">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className={inputClass}
            style={inputStyle}
          />
        </Field>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={busy || uploading}
            className="btn-dark rounded-[8px] px-5 py-2.5 text-[13px] font-medium disabled:opacity-60"
          >
            {busy ? 'Kaydediliyor…' : 'Değişiklikleri kaydet'}
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
      </div>

      <aside className="space-y-5">
        <div className="rounded-2xl border p-5" style={{ borderColor: 'var(--border)' }}>
          <p className="eyebrow">Önizleme</p>
          <div className="mt-4 flex items-center gap-3">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={name || 'Avatar'}
                className="h-14 w-14 rounded-full border object-cover"
                style={{ borderColor: 'var(--border)' }}
              />
            ) : (
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full border text-[13px] font-semibold"
                style={{ borderColor: 'var(--border)' }}
              >
                {initial1}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold">{name || '—'}</p>
              <p
                className="truncate text-[12px]"
                style={{
                  color: title
                    ? 'color-mix(in oklab, var(--fg) 60%, transparent)'
                    : 'color-mix(in oklab, var(--fg) 40%, transparent)',
                }}
              >
                {title || 'Unvan ekle'}
              </p>
            </div>
          </div>
          {bio && <p className="mt-4 text-[12.5px] leading-[1.6]">{bio}</p>}
        </div>

        <div
          className="rounded-2xl border p-5 text-[12.5px]"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="eyebrow">Hesap</p>
          <dl className="mt-4 space-y-2">
            <div className="flex items-baseline justify-between gap-3">
              <dt style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}>E-posta</dt>
              <dd className="min-w-0 truncate text-right">{initial.email}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}>Rol</dt>
              <dd className="min-w-0 truncate text-right">{initial.role}</dd>
            </div>
          </dl>
          <p
            className="mt-3 text-[11.5px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
          >
            E-posta ve rol Clerk üzerinden yönetilir.
          </p>
        </div>
      </aside>
    </form>
  );
}

async function resizeImage(file: File, size: number, quality: number): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('read-failed'));
    reader.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error('image-failed'));
    el.src = dataUrl;
  });

  const srcSize = Math.min(img.naturalWidth, img.naturalHeight);
  const sx = (img.naturalWidth - srcSize) / 2;
  const sy = (img.naturalHeight - srcSize) / 2;

  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('no-context');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, sx, sy, srcSize, srcSize, 0, 0, size, size);

  return canvas.toDataURL('image/jpeg', quality);
}
