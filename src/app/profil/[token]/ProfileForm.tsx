'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Field, inputClass, inputStyle } from '@/app/admin/_components/FormField';

type Initial = {
  firstName: string;
  lastName: string;
  avatarUrl: string;
  bio: string;
  city: string;
  country: string;
  showInCommunity: boolean;
};

export function ProfileForm({ token, initial }: { token: string; initial: Initial }) {
  const router = useRouter();
  const [firstName, setFirstName] = useState(initial.firstName);
  const [lastName, setLastName] = useState(initial.lastName);
  const [avatarUrl, setAvatarUrl] = useState(initial.avatarUrl);
  const [bio, setBio] = useState(initial.bio);
  const [city, setCity] = useState(initial.city);
  const [country, setCountry] = useState(initial.country);
  const [showInCommunity, setShowInCommunity] = useState(initial.showInCommunity);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/subscribe/profile/${token}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName || null,
          lastName: lastName || null,
          avatarUrl: avatarUrl || null,
          bio: bio || null,
          city: city || null,
          country: country || null,
          showInCommunity,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setMsg(j.error ?? 'Kaydedilemedi.');
      } else {
        setMsg('Kaydedildi.');
        router.refresh();
      }
    } catch {
      setMsg('Ağ hatası.');
    } finally {
      setBusy(false);
    }
  }

  const initial1 = (firstName || 'A').slice(0, 1).toUpperCase();
  const lastInitial = lastName ? lastName.slice(0, 1).toUpperCase() + '.' : '';

  return (
    <form onSubmit={save} className="grid gap-8 lg:grid-cols-[1fr_280px]">
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Ad" required>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputClass}
              style={inputStyle}
              required
            />
          </Field>
          <Field label="Soyad" hint="Yalnızca baş harfi gösterilir.">
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={inputClass}
              style={inputStyle}
            />
          </Field>
        </div>

        <Field label="Profil fotoğrafı (URL)" hint="Kare, 256px ve üstü önerilir.">
          <input
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className={inputClass}
            style={inputStyle}
            placeholder="https://…"
          />
        </Field>

        <Field label="Kısa tanıtım" hint="Ne yapıyorsun, neyin peşindesin. 2–3 cümle.">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className={inputClass}
            style={inputStyle}
            maxLength={280}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Şehir">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={inputClass}
              style={inputStyle}
              placeholder="İstanbul"
            />
          </Field>
          <Field label="Ülke">
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={inputClass}
              style={inputStyle}
              placeholder="TR"
              maxLength={2}
            />
          </Field>
        </div>

        <label
          className="flex items-start gap-3 rounded-2xl border p-4 text-[13px]"
          style={{ borderColor: 'var(--border)' }}
        >
          <input
            type="checkbox"
            checked={showInCommunity}
            onChange={(e) => setShowInCommunity(e.target.checked)}
            className="mt-0.5"
          />
          <span>
            <span className="font-semibold">Ana sayfada görüneyim.</span>{' '}
            <span style={{ color: 'color-mix(in oklab, var(--fg) 58%, transparent)' }}>
              Yeni katılanlar şeridinde adın ve fotoğrafın gösterilir. Soyadın yıldızlı kalır.
            </span>
          </span>
        </label>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={busy}
            className="btn-dark rounded-[8px] px-5 py-2.5 text-[13px] font-medium disabled:opacity-60"
          >
            {busy ? 'Kaydediliyor…' : 'Kaydet'}
          </button>
          {msg && (
            <span
              className="text-[12px]"
              style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
            >
              {msg}
            </span>
          )}
        </div>
      </div>

      <aside
        className="h-fit rounded-2xl border p-5"
        style={{ borderColor: 'var(--border)' }}
      >
        <p className="eyebrow">Ana sayfada görünüşü</p>
        <div className="mt-4 flex items-center gap-3">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt={firstName}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full border text-[14px] font-semibold"
              style={{ borderColor: 'var(--border)' }}
            >
              {initial1}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold">
              {firstName || '—'} {lastInitial && <span>{lastInitial[0]}★.</span>}
            </p>
            <p
              className="truncate text-[11.5px]"
              style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
            >
              {[city, country].filter(Boolean).join(' · ') || 'Konum yok'}
            </p>
          </div>
        </div>
      </aside>
    </form>
  );
}
