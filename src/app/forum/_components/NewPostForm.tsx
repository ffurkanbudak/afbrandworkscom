'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

type Tag = { slug: string; label: string };

export function NewPostForm({ tags }: { tags: Tag[] }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tagSlug, setTagSlug] = useState<string>(tags[0]?.slug ?? '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError(null);
    setBusy(true);
    try {
      const res = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ title, body, tagSlug }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? 'Gönderilemedi.');
        setBusy(false);
        return;
      }
      router.push(`/forum/${json.post.id}`);
    } catch {
      setError('Ağ hatası.');
      setBusy(false);
    }
  }

  const inputStyle = {
    borderColor: 'var(--border)',
    background: 'var(--bg)',
    color: 'var(--fg)',
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <p
          className="text-[11.5px] font-semibold tracking-[0.08em] uppercase"
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        >
          Etiket
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {tags.map((t) => {
            const on = tagSlug === t.slug;
            return (
              <button
                key={t.slug}
                type="button"
                onClick={() => setTagSlug(t.slug)}
                className="rounded-full border px-3 py-1.5 text-[12.5px] transition"
                style={{
                  borderColor: on ? 'var(--fg)' : 'var(--border)',
                  background: on
                    ? 'color-mix(in oklab, var(--fg) 7%, transparent)'
                    : 'transparent',
                  color: 'var(--fg)',
                  fontWeight: on ? 600 : 500,
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <label className="block">
        <span
          className="text-[11.5px] font-semibold tracking-[0.08em] uppercase"
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        >
          Başlık
        </span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={180}
          placeholder="Konunuzu bir cümleyle özetleyin"
          className="mt-1.5 w-full rounded-[8px] border px-3.5 py-3 text-[16px]"
          style={inputStyle}
        />
      </label>

      <label className="block">
        <span
          className="text-[11.5px] font-semibold tracking-[0.08em] uppercase"
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        >
          İçerik
        </span>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={12}
          maxLength={6000}
          placeholder="Düşüncenizi açın. Somut örnekler vermekten çekinmeyin."
          className="mt-1.5 w-full rounded-[8px] border px-3.5 py-3 text-[15px] leading-[1.6]"
          style={inputStyle}
        />
        <div
          className="mt-1.5 flex items-center justify-between text-[11px]"
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          <span>Paylaşımınız gönderimden bir saat sonra yayına alınır.</span>
          <span>{body.length}/6000</span>
        </div>
      </label>

      {error && (
        <p className="text-[12.5px]" style={{ color: '#DC2626' }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="btn-dark inline-flex items-center gap-2 rounded-[8px] px-5 py-3 text-[13.5px] font-semibold disabled:opacity-60"
      >
        {busy ? 'Gönderiliyor…' : 'Konuyu paylaşın'}
        <ArrowRight className="h-[13px] w-[13px]" strokeWidth={2.25} />
      </button>
    </form>
  );
}
