'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Mail, RotateCcw } from 'lucide-react';
import type { BrandTest as BrandTestData } from '@/lib/brand-tests';
import { BRAND_TESTS, getMaxScore, getResultBand } from '@/lib/brand-tests';
import { BrandTestIcon } from '@/components/BrandTestIcon';

const MUTED_LIGHT = 'rgba(255,255,255,0.65)';
const FAINT_LIGHT = 'rgba(255,255,255,0.45)';
const LINE_LIGHT = 'rgba(255,255,255,0.12)';
const CONTACT_EMAIL = 'info@toganworks.com';

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden role="img">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2c-5.523 0-10 4.477-10 10 0 1.765.462 3.489 1.34 5.007L2 22l5.11-1.34A9.96 9.96 0 0 0 12.004 22c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18.2a8.19 8.19 0 0 1-4.174-1.14l-.299-.177-3.03.795.81-2.955-.195-.303A8.2 8.2 0 1 1 12.004 20.2z" />
    </svg>
  );
}

export function BrandTest({ whatsappUrl }: { whatsappUrl: string }) {
  const [test, setTest] = useState<BrandTestData | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [emailDone, setEmailDone] = useState(false);
  const [retriesLeft, setRetriesLeft] = useState(1);

  const current = answers.length;
  const finished = test !== null && current >= test.questions.length;
  const score = answers.reduce<number>((a, b) => a + b, 0);

  async function reveal(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'marka-testi' }),
      });
      if (!res.ok) throw new Error();
      setEmailDone(true);
    } catch {
      setStatus('error');
    }
  }

  function pickTest(t: BrandTestData) {
    setTest(t);
    setAnswers([]);
  }

  function backToPicker() {
    setTest(null);
    setAnswers([]);
  }

  function restart() {
    if (retriesLeft <= 0) return;
    setRetriesLeft((r) => r - 1);
    setTest(null);
    setAnswers([]);
  }

  /* ── Test seçimi ── */
  if (!test) {
    return (
      <div className="mx-auto mt-10 max-w-[860px]">
        <div className="grid gap-4 md:grid-cols-3">
          {BRAND_TESTS.map((t) => (
            <button
              key={t.slug}
              type="button"
              onClick={() => pickTest(t)}
              className="group flex flex-col items-start rounded-[12px] border p-5 text-left transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
              style={{ borderColor: LINE_LIGHT, background: '#141414' }}
            >
              <div className="flex w-full items-start justify-between">
                <BrandTestIcon test={t} size={56} iconSize={26} radius={13} />
                <span
                  className="rounded-[6px] border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]"
                  style={{ borderColor: LINE_LIGHT, color: FAINT_LIGHT }}
                >
                  {t.level}
                </span>
              </div>
              <h4 className="font-display mt-4 text-[16.5px] leading-[1.25] tracking-tight text-white" style={{ fontWeight: 700 }}>
                {t.title}
              </h4>
              <p className="mt-2 flex-1 text-[12.5px] leading-[1.55]" style={{ color: MUTED_LIGHT, fontWeight: 300 }}>
                {t.audience}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-white">
                Teste Başla
                <ArrowRight className="h-[13px] w-[13px] transition group-hover:translate-x-1" strokeWidth={2.25} />
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* ── Sorular ── */
  if (!finished) {
    const q = test.questions[current];
    return (
      <div
        className="mx-auto mt-10 max-w-[640px] rounded-[8px] border p-6 text-white md:p-8"
        style={{ borderColor: LINE_LIGHT, background: '#141414' }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <BrandTestIcon test={test} size={30} iconSize={15} radius={8} />
            <span className="truncate text-[12.5px] font-semibold tracking-tight">{test.title}</span>
          </div>
          <span className="shrink-0 text-[12px] tabular-nums" style={{ color: FAINT_LIGHT }}>
            Soru {current + 1} / {test.questions.length}
          </span>
        </div>

        <div className="mt-4 h-1 w-full overflow-hidden rounded-full" style={{ background: LINE_LIGHT }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${(current / test.questions.length) * 100}%`, background: '#DC2626' }}
          />
        </div>

        <p className="mt-6 min-h-[56px] text-[16.5px] leading-[1.55]" style={{ fontWeight: 500 }}>
          {q.question}
        </p>

        <div className="mt-5 flex flex-col gap-2.5">
          {q.options.map((o) => (
            <button
              key={o.label}
              type="button"
              onClick={() => setAnswers((a) => [...a, o.score])}
              className="rounded-[8px] border px-4 py-3 text-left text-[13.5px] font-medium leading-[1.45] text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              style={{ borderColor: LINE_LIGHT }}
            >
              {o.label}
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-center text-[12px]" style={{ color: FAINT_LIGHT }}>
          <button
            type="button"
            onClick={() =>
              current === 0 ? backToPicker() : setAnswers((a) => a.slice(0, -1))
            }
            className="inline-flex items-center gap-1 transition hover:opacity-70"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            {current === 0 ? 'Test seçimine dön' : 'Geri'}
          </button>
        </div>
      </div>
    );
  }

  const maxScore = getMaxScore(test);
  const band = getResultBand(test, score);

  /* ── E-posta kapısı ── */
  if (!emailDone) {
    return (
      <div
        className="mx-auto mt-10 max-w-[640px] rounded-[8px] border p-6 text-white md:p-8"
        style={{ borderColor: LINE_LIGHT, background: '#141414' }}
      >
        <div className="flex flex-col items-center text-center">
          <BrandTestIcon test={test} size={48} iconSize={22} radius={12} />
          <h3 className="font-display mt-4 text-[20px] tracking-tight" style={{ fontWeight: 700 }}>
            Sonucunuz hazır.
          </h3>
          <p className="mt-3 max-w-[44ch] text-[14.5px] leading-[1.65]" style={{ color: MUTED_LIGHT, fontWeight: 300 }}>
            Değerlendirmenizi görmek için e-posta adresinizi bırakın.
          </p>
          <form onSubmit={reveal} className="mt-5 flex w-full max-w-[400px] flex-col gap-2.5 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="E-posta adresiniz"
              aria-label="E-posta adresiniz"
              className="flex-1 rounded-[8px] border bg-transparent px-4 py-3 text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
              style={{ borderColor: LINE_LIGHT }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-red inline-flex items-center justify-center rounded-[8px] px-5 py-3 text-[13.5px] font-medium disabled:opacity-60"
            >
              {status === 'loading' ? 'Gönderiliyor…' : 'Sonucu Gör'}
            </button>
          </form>
          {status === 'error' && (
            <p className="mt-3 text-[13px]" style={{ color: '#F87171' }}>
              Geçerli bir e-posta girin ya da tekrar deneyin.
            </p>
          )}
          <p className="mt-4 max-w-[46ch] text-[11.5px] leading-[1.5]" style={{ color: FAINT_LIGHT, fontWeight: 300 }}>
            E-posta adresiniz yalnızca sonucunuzu iletmek ve içerik bültenine kayıt için kullanılır.
          </p>
        </div>
      </div>
    );
  }

  /* ── Sonuç ── */
  return (
    <div
      className="mx-auto mt-10 max-w-[640px] rounded-[8px] border p-6 text-white md:p-8"
      style={{ borderColor: LINE_LIGHT, background: '#141414' }}
    >
      <div className="flex flex-col items-center text-center">
        <BrandTestIcon test={test} size={48} iconSize={22} radius={12} />
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: FAINT_LIGHT }}>
          Sonucunuz · {test.shortTitle}
        </p>
        <p className="font-display mt-4 text-[40px] leading-none tracking-tight" style={{ fontWeight: 800 }}>
          {score}
          <span className="text-[18px]" style={{ color: FAINT_LIGHT, fontWeight: 400 }}>
            {' '}
            / {maxScore}
          </span>
        </p>
        <div className="mt-4 h-1.5 w-full max-w-[280px] overflow-hidden rounded-full" style={{ background: LINE_LIGHT }}>
          <div
            className="h-full rounded-full"
            style={{ width: `${(score / maxScore) * 100}%`, background: test.color }}
          />
        </div>
        <h3 className="font-display mt-6 text-[19px] tracking-tight" style={{ fontWeight: 700 }}>
          {band.title}
        </h3>
        <p className="mt-3 max-w-[52ch] text-[14.5px] leading-[1.7]" style={{ color: MUTED_LIGHT, fontWeight: 300 }}>
          {band.summary}
        </p>

        <div className="mt-6 w-full rounded-[10px] border p-5 text-left" style={{ borderColor: LINE_LIGHT }}>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em]" style={{ color: FAINT_LIGHT }}>
            Önerilen ilk adımlar
          </p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {band.recommendations.map((rec) => (
              <li key={rec} className="flex items-start gap-2.5 text-[13.5px] leading-[1.5]">
                <Check className="mt-[3px] h-[14px] w-[14px] shrink-0 text-white" strokeWidth={2.5} />
                <span style={{ color: MUTED_LIGHT, fontWeight: 300 }}>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp ile iletişime geçin"
            title="WhatsApp"
            className="inline-flex items-center justify-center rounded-[8px] p-2.5 text-white transition hover:opacity-90"
            style={{ background: '#25D366' }}
          >
            <WhatsAppGlyph className="h-[18px] w-[18px]" />
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            aria-label={`${CONTACT_EMAIL} adresine e-posta gönderin`}
            title={CONTACT_EMAIL}
            className="inline-flex items-center justify-center rounded-[8px] border p-2.5 text-white transition hover:bg-white/10"
            style={{ borderColor: LINE_LIGHT }}
          >
            <Mail className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </a>
          {retriesLeft > 0 && (
            <button
              type="button"
              onClick={restart}
              className="inline-flex items-center justify-center gap-2 rounded-[8px] border px-5 py-3 text-[13.5px] font-medium text-white transition hover:bg-white/10"
              style={{ borderColor: LINE_LIGHT }}
            >
              <RotateCcw className="h-4 w-4" strokeWidth={1.75} />
              Baştan Çöz ({retriesLeft} hak)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
