'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        setError('E-posta veya şifre hatalı.');
        setLoading(false);
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch {
      setError('Bağlantı hatası, tekrar deneyin.');
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center px-6" style={{ background: 'var(--bg)' }}>
      <form
        onSubmit={onSubmit}
        className="w-full max-w-[380px] rounded-[14px] border p-7"
        style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
      >
        <p className="eyebrow">Yönetim</p>
        <h1 className="font-display mt-2 text-[24px] tracking-tight">Admin Girişi</h1>
        <p className="mt-2 text-[13px]" style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}>
          Devam etmek için e-posta ve şifrenizi girin.
        </p>

        <label className="mt-6 block text-[12px] font-semibold tracking-[0.04em]" style={{ color: 'var(--fg)' }}>
          E-posta
        </label>
        <input
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ornek@eposta.com"
          className="mt-1.5 w-full rounded-[8px] border px-3.5 py-2.5 text-[14px] outline-none"
          style={{ borderColor: 'var(--border)', background: 'var(--bg)', color: 'var(--fg)' }}
        />

        <label className="mt-4 block text-[12px] font-semibold tracking-[0.04em]" style={{ color: 'var(--fg)' }}>
          Şifre
        </label>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="mt-1.5 w-full rounded-[8px] border px-3.5 py-2.5 text-[14px] outline-none"
          style={{ borderColor: 'var(--border)', background: 'var(--bg)', color: 'var(--fg)' }}
        />

        {error && (
          <p className="mt-3 text-[12.5px]" style={{ color: '#DC2626' }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-dark mt-6 w-full rounded-[8px] px-4 py-3 text-[14px] font-medium disabled:opacity-60"
        >
          {loading ? 'Giriş yapılıyor…' : 'Giriş Yap'}
        </button>
      </form>
    </div>
  );
}
