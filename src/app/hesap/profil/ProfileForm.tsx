'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Field, inputClass, inputStyle } from '@/app/admin/_components/FormField';
import { COUNTRIES, TR_CITIES } from '@/lib/geography';

type Initial = {
  firstName: string;
  lastName: string;
  avatarUrl: string;
  bio: string;
  city: string;
  country: string;
  showInCommunity: boolean;
};

export function ProfileForm({ initial }: { initial: Initial }) {
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
      const res = await fetch('/api/me/profile', {
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

  return (
    <form onSubmit={save} className="space-y-6">
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
        <Field label="Ülke">
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              if (e.target.value !== 'TR') setCity('');
            }}
            className={`${inputClass} select-reset`}
            style={inputStyle}
          >
            <option value="">Seçin…</option>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Şehir">
          {country === 'TR' ? (
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={`${inputClass} select-reset`}
              style={inputStyle}
            >
              <option value="">Seçin…</option>
              {TR_CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          ) : (
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={inputClass}
              style={inputStyle}
              placeholder="Şehir"
              disabled={!country}
            />
          )}
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
    </form>
  );
}
