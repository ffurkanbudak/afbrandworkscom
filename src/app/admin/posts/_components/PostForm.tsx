'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';
import { Field, inputClass, inputStyle } from '../../_components/FormField';

type Tag = { id: string; labelTr: string; group: string };
type Mode = { kind: 'create' } | { kind: 'edit'; postId: string };

export type PostFormInitial = {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  contentHtml: string;
  coverImageUrl: string;
  coverImageAlt: string;
  metaTitle: string;
  metaDescription: string;
  tagIds: string[];
  featured: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'ARCHIVED';
  scheduledFor: string;
};

const EMPTY: PostFormInitial = {
  slug: '',
  title: '',
  subtitle: '',
  excerpt: '',
  contentHtml: '',
  coverImageUrl: '',
  coverImageAlt: '',
  metaTitle: '',
  metaDescription: '',
  tagIds: [],
  featured: false,
  status: 'DRAFT',
  scheduledFor: '',
};

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

function plainTextToHtml(text: string): string {
  const decoded = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, '\'')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
  const stripped = decoded.replace(/<[^>]*>/g, '');
  const blocks = stripped.split(/\n\s*\n+/);
  const paragraphs: string[] = [];
  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;
    const escaped = trimmed
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const withBreaks = escaped.replace(/\n/g, '<br />');
    paragraphs.push(`<p>${withBreaks}</p>`);
  }
  return paragraphs.join('\n\n');
}

export function PostForm({
  tags,
  mode,
  initial = EMPTY,
}: {
  tags: Tag[];
  mode: Mode;
  initial?: PostFormInitial;
}) {
  const router = useRouter();
  const [data, setData] = useState<PostFormInitial>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const g: Record<string, Tag[]> = {};
    tags.forEach((t) => {
      g[t.group] = g[t.group] ?? [];
      g[t.group].push(t);
    });
    return g;
  }, [tags]);

  const autoSlug = useMemo(() => slugify(data.title), [data.title]);
  const effectiveSlug = data.slug || autoSlug;

  function update<K extends keyof PostFormInitial>(key: K, value: PostFormInitial[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function toggleTag(id: string) {
    setData((prev) => ({
      ...prev,
      tagIds: prev.tagIds.includes(id)
        ? prev.tagIds.filter((x) => x !== id)
        : [...prev.tagIds, id],
    }));
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
        update('coverImageUrl', json.url);
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
    if (!data.title.trim() || !data.excerpt.trim() || !data.contentHtml.trim()) {
      setError('Başlık, özet ve içerik zorunlu.');
      return;
    }
    if (data.tagIds.length === 0) {
      setError('En az bir etiket seçin.');
      return;
    }

    setBusy(true);
    const body = {
      slug: effectiveSlug,
      title: data.title,
      subtitle: data.subtitle || null,
      excerpt: data.excerpt,
      contentHtml: data.contentHtml,
      coverImageUrl: data.coverImageUrl || null,
      coverImageAlt: data.coverImageAlt || null,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      tagIds: data.tagIds,
      featured: data.featured,
      status: data.status,
      scheduledFor:
        data.status === 'SCHEDULED' && data.scheduledFor ? data.scheduledFor : null,
    };

    try {
      const url = mode.kind === 'create' ? '/api/admin/posts' : `/api/admin/posts/${mode.postId}`;
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
        router.push('/admin/posts');
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
    if (!confirm('Bu yazı silinsin mi? Bu işlem geri alınamaz.')) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/posts/${mode.postId}`, { method: 'DELETE' });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setError(json.error ?? 'Silinemedi.');
        setBusy(false);
        return;
      }
      router.push('/admin/posts');
    } catch {
      setError('Ağ hatası.');
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[2.2fr_1fr]">
      <div className="space-y-5">
        <Field label="Başlık" required>
          <input
            value={data.title}
            onChange={(e) => update('title', e.target.value)}
            className={inputClass + ' text-[16px]'}
            style={inputStyle}
          />
        </Field>
        <Field label="Slug" hint="Boş bırakırsan başlıktan otomatik üretilir.">
          <input
            value={data.slug}
            onChange={(e) => update('slug', e.target.value)}
            placeholder={autoSlug}
            className={inputClass + ' font-mono text-[13px]'}
            style={inputStyle}
          />
        </Field>
        <Field label="Alt başlık">
          <input
            value={data.subtitle}
            onChange={(e) => update('subtitle', e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </Field>
        <Field label="Özet" required hint="2-3 cümle. Anasayfa ve liste görünümlerinde çıkar.">
          <textarea
            value={data.excerpt}
            onChange={(e) => update('excerpt', e.target.value)}
            rows={3}
            className={inputClass}
            style={inputStyle}
          />
        </Field>
        <Field label="İçerik (HTML)" required hint="Düz metin yapıştır, altındaki butonla HTML'e çevir. Veya doğrudan HTML yaz.">
          <button
            type="button"
            onClick={() => update('contentHtml', plainTextToHtml(data.contentHtml))}
            className="mb-2 rounded-[6px] border px-2.5 py-1 text-[12px]"
            style={{ borderColor: 'var(--border)' }}
          >
            Düz metinden HTML üretin
          </button>
          <textarea
            value={data.contentHtml}
            onChange={(e) => update('contentHtml', e.target.value)}
            rows={20}
            className={inputClass + ' font-mono text-[12.5px] leading-[1.6]'}
            style={inputStyle}
            placeholder="<p>…</p>"
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Kapak görseli">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFile}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="rounded-[6px] border px-2.5 py-1 text-[12px] disabled:opacity-60"
              style={{ borderColor: 'var(--border)' }}
            >
              {uploading ? 'Yükleniyor…' : data.coverImageUrl ? 'Fotoğrafı Değiştirin' : 'Fotoğraf Ekleyin'}
            </button>
            {uploadError && (
              <p className="mt-2 text-[12.5px]" style={{ color: '#DC2626' }}>
                {uploadError}
              </p>
            )}
            {data.coverImageUrl && (
              <p
                className="mt-2 font-mono text-[11px] break-all"
                style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
              >
                {data.coverImageUrl}
              </p>
            )}
          </Field>
          <Field label="Kapak alt metni">
            <input
              value={data.coverImageAlt}
              onChange={(e) => update('coverImageAlt', e.target.value)}
              className={inputClass + ' text-[13px]'}
              style={inputStyle}
            />
          </Field>
        </div>
        {data.coverImageUrl && (
          <div
            className="overflow-hidden rounded-[10px] border"
            style={{ borderColor: 'var(--border)' }}
          >
            <img
              src={data.coverImageUrl}
              alt={data.coverImageAlt || ''}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        )}
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Meta başlık">
            <input
              value={data.metaTitle}
              onChange={(e) => update('metaTitle', e.target.value)}
              className={inputClass + ' text-[13px]'}
              style={inputStyle}
            />
          </Field>
          <Field label="Meta açıklama">
            <input
              value={data.metaDescription}
              onChange={(e) => update('metaDescription', e.target.value)}
              className={inputClass + ' text-[13px]'}
              style={inputStyle}
            />
          </Field>
        </div>
      </div>

      <aside className="space-y-5">
        <div
          className="rounded-2xl border p-5"
          style={{ borderColor: 'var(--border)' }}
        >
          <Field label="Durum">
            <select
              value={data.status}
              onChange={(e) => update('status', e.target.value as PostFormInitial['status'])}
              className={inputClass + ' text-[13px]'}
              style={inputStyle}
            >
              <option value="DRAFT">Taslak</option>
              <option value="PUBLISHED">Yayında</option>
              <option value="SCHEDULED">Zamanla</option>
              <option value="ARCHIVED">Arşivlendi</option>
            </select>
          </Field>
          {data.status === 'SCHEDULED' && (
            <div className="mt-4">
              <Field label="Zaman">
                <input
                  type="datetime-local"
                  value={data.scheduledFor}
                  onChange={(e) => update('scheduledFor', e.target.value)}
                  className={inputClass + ' text-[13px]'}
                  style={inputStyle}
                />
              </Field>
            </div>
          )}
          <label className="mt-4 flex items-center gap-2 text-[13px]">
            <input
              type="checkbox"
              checked={data.featured}
              onChange={(e) => update('featured', e.target.checked)}
            />
            Öne çıkan yazı (anasayfa hero)
          </label>

          <div className="mt-6">
            <p className="eyebrow">Etiketler</p>
            <div className="mt-3 space-y-4">
              {Object.entries(grouped).map(([group, items]) => (
                <div key={group}>
                  <p className="text-[10px] font-semibold tracking-[0.14em] uppercase" style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}>
                    {group}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {items.map((t) => {
                      const on = data.tagIds.includes(t.id);
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => toggleTag(t.id)}
                          className="rounded-[6px] border px-2.5 py-1 text-[12px] transition"
                          style={{
                            borderColor: on ? 'var(--fg)' : 'var(--border)',
                            background: on
                              ? 'color-mix(in oklab, var(--fg) 10%, transparent)'
                              : 'transparent',
                            fontWeight: on ? 600 : 400,
                          }}
                        >
                          {t.labelTr}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <p className="mt-5 text-[12.5px]" style={{ color: '#DC2626' }}>
              {error}
            </p>
          )}
          {success && (
            <p className="mt-5 text-[12.5px]" style={{ color: '#16A34A' }}>
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="btn-red mt-6 w-full rounded-full py-3 text-[13px] font-semibold tracking-[0.02em]"
          >
            {busy ? 'Kaydediliyor…' : mode.kind === 'create' ? 'Yayımla / Kaydet' : 'Değişiklikleri kaydet'}
          </button>
        </div>

        {mode.kind === 'edit' && (
          <div
            className="rounded-2xl border p-5"
            style={{ borderColor: 'var(--border)' }}
          >
            <p className="eyebrow">Tehlikeli bölge</p>
            <p className="mt-2 text-[12.5px]" style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}>
              Yazıyı kalıcı olarak sileceksen önce arşivle.
            </p>
            <button
              type="button"
              onClick={onDelete}
              disabled={busy}
              className="mt-4 w-full rounded-[6px] border py-2 text-[12.5px] font-medium transition hover:bg-[color-mix(in_oklab,#DC2626_8%,transparent)] disabled:opacity-60"
              style={{ borderColor: 'color-mix(in oklab, #DC2626 45%, transparent)', color: '#DC2626' }}
            >
              Yazıyı silin
            </button>
          </div>
        )}
      </aside>
    </form>
  );
}
