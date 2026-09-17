'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import type { BrandTest as BrandTestData } from '@/lib/brand-tests';
import { BRAND_TESTS, getMaxScore, getResultBand } from '@/lib/brand-tests';

const KIRMIZI = '#DC2626';
const SOLUK = 'rgba(255,255,255,0.65)';
const SILIK = 'rgba(255,255,255,0.45)';
const CIZGI = 'rgba(255,255,255,0.12)';
const KART = '#141414';
const HARFLER = ['A', 'B', 'C', 'D'];

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden role="img">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2c-5.523 0-10 4.477-10 10 0 1.765.462 3.489 1.34 5.007L2 22l5.11-1.34A9.96 9.96 0 0 0 12.004 22c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18.2a8.19 8.19 0 0 1-4.174-1.14l-.299-.177-3.03.795.81-2.955-.195-.303A8.2 8.2 0 1 1 12.004 20.2z" />
    </svg>
  );
}

/** Seviye zorluğunu gösteren üç çubuk. */
function Zorluk({ seviye }: { seviye: number }) {
  return (
    <span className="inline-flex items-end gap-[3px]" aria-label={`Zorluk ${seviye} / 3`}>
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className="w-[5px] rounded-[2px]"
          style={{ height: 6 + n * 4, background: n <= seviye ? '#FFFFFF' : 'rgba(255,255,255,0.18)' }}
        />
      ))}
    </span>
  );
}

/** Puanı sıfırdan sayarak gösterir. */
function SayacPuan({ hedef }: { hedef: number }) {
  const [deger, setDeger] = useState(0);
  useEffect(() => {
    let kare = 0;
    const toplam = 28;
    const id = setInterval(() => {
      kare += 1;
      setDeger(Math.round((hedef * kare) / toplam));
      if (kare >= toplam) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [hedef]);
  return <>{deger}</>;
}

export function BrandTest({ whatsappUrl }: { whatsappUrl: string }) {
  const [test, setTest] = useState<BrandTestData | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [secilen, setSecilen] = useState<number | null>(null);

  // Test başlayınca, bittiğinde ya da seçime dönülünce test alanı görünür yere kayar (telefonda önemli).
  const asama = test ? (answers.length >= test.questions.length ? 'sonuc' : 'soru') : 'secim';
  const ilkRender = useRef(true);
  useEffect(() => {
    if (ilkRender.current) {
      ilkRender.current = false;
      return;
    }
    const el = document.getElementById('marka-testi');
    if (el && el.getBoundingClientRect().top < 0) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [asama, test]);

  const current = answers.length;
  const finished = test !== null && current >= test.questions.length;
  const score = answers.reduce<number>((a, b) => a + b, 0);

  function pickTest(t: BrandTestData) {
    setTest(t);
    setAnswers([]);
    setSecilen(null);
  }

  function yanitla(index: number, puan: number) {
    if (secilen !== null) return;
    setSecilen(index);
    // Seçim kısa süre vurgulanır, ardından sıradaki soruya geçilir.
    setTimeout(() => {
      setAnswers((a) => [...a, puan]);
      setSecilen(null);
    }, 260);
  }

  // Klavyeyle yanıt: 1-4 ya da A-D.
  useEffect(() => {
    if (!test || finished) return;
    const q = test.questions[current];
    const dinle = (e: KeyboardEvent) => {
      const k = e.key.toUpperCase();
      const i = /^[1-4]$/.test(k) ? Number(k) - 1 : HARFLER.indexOf(k);
      if (i >= 0 && q.options[i]) yanitla(i, q.options[i].score);
    };
    window.addEventListener('keydown', dinle);
    return () => window.removeEventListener('keydown', dinle);
  });

  /* ── Seviye seçimi ── */
  if (!test) {
    return (
      <div className="mx-auto mt-10 max-w-[1000px]">
        <div className="grid gap-4 md:grid-cols-3">
          {BRAND_TESTS.map((t, i) => (
            <button
              key={t.slug}
              type="button"
              onClick={() => pickTest(t)}
              className="group flex flex-col rounded-[14px] border p-6 text-left text-white transition duration-300 hover:-translate-y-1 hover:border-white/30"
              style={{ borderColor: CIZGI, background: KART }}
            >
              <div className="flex w-full items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: SILIK }}>
                  Seviye {i + 1}
                </span>
                <Zorluk seviye={i + 1} />
              </div>
              <span className="font-display mt-5 text-[44px] leading-none tracking-tight" style={{ fontWeight: 800 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-display mt-4 text-[18px] leading-[1.25] tracking-tight" style={{ fontWeight: 700 }}>
                {t.title}
              </span>
              <span className="mt-2 flex-1 text-[13.5px] leading-[1.55]" style={{ color: SOLUK, fontWeight: 300 }}>
                {t.audience}
              </span>
              <span className="mt-5 flex w-full items-center justify-between border-t pt-4" style={{ borderColor: CIZGI }}>
                <span className="text-[12px]" style={{ color: SILIK }}>
                  {t.questions.length} soru · {t.duration}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold">
                  Başla
                  <ArrowRight className="h-[14px] w-[14px] transition group-hover:translate-x-1" strokeWidth={2.25} />
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Soruların ve yorumların tamamı: testi çözmeden görmek isteyenler ve arama motorları için */}
        <details
          className="group mt-6 rounded-[14px] px-5 py-4 md:px-7 md:py-5"
          style={{ background: '#FFFFFF', border: '0.5px solid rgba(10,10,10,0.14)', color: '#0A0A0A' }}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-semibold tracking-tight [&::-webkit-details-marker]:hidden">
            Testlerdeki soruları ve sonuç yorumlarını gör
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[17px] leading-none transition-transform duration-200 group-open:rotate-45"
              style={{ border: '0.5px solid rgba(10,10,10,0.2)' }}
              aria-hidden
            >
              +
            </span>
          </summary>
          <div className="mt-6 grid gap-8 md:grid-cols-3 md:gap-0">
            {BRAND_TESTS.map((t, i) => (
              <div
                key={t.slug}
                className={`text-[13.5px] leading-[1.65] ${i > 0 ? 'border-t pt-8 md:border-l md:border-t-0 md:pl-7 md:pt-0' : ''} ${i < 2 ? 'md:pr-7' : ''}`}
                style={{ borderColor: 'rgba(10,10,10,0.1)' }}
              >
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em]" style={{ color: 'rgba(10,10,10,0.5)' }}>
                  Seviye {i + 1}
                </p>
                <p className="font-display mt-1 text-[16px] leading-[1.3] tracking-tight" style={{ fontWeight: 700 }}>
                  {t.title}
                </p>

                <p className="mt-5 text-[10.5px] font-semibold uppercase tracking-[0.16em]" style={{ color: 'rgba(10,10,10,0.5)' }}>
                  Sorular
                </p>
                <ol className="mt-2.5 flex flex-col gap-2">
                  {t.questions.map((q, n) => (
                    <li key={q.question} className="flex gap-2.5">
                      <span className="w-5 shrink-0 tabular-nums" style={{ color: 'rgba(10,10,10,0.4)', fontWeight: 600 }}>
                        {n + 1}.
                      </span>
                      <span style={{ color: '#0A0A0A' }}>{q.question}</span>
                    </li>
                  ))}
                </ol>

                <p className="mt-6 text-[10.5px] font-semibold uppercase tracking-[0.16em]" style={{ color: 'rgba(10,10,10,0.5)' }}>
                  Sonuç yorumları
                </p>
                <div className="mt-2.5 flex flex-col gap-3">
                  {t.bands.map((band) => (
                    <div key={band.title} className="rounded-[10px] p-3" style={{ background: '#F5F5F5' }}>
                      <p className="flex flex-wrap items-baseline justify-between gap-x-2">
                        <span className="font-semibold">{band.title}</span>
                        <span className="text-[11.5px] tabular-nums" style={{ color: 'rgba(10,10,10,0.5)' }}>
                          {band.min}–{band.max} puan
                        </span>
                      </p>
                      <p className="mt-1" style={{ color: 'rgba(10,10,10,0.78)' }}>
                        {band.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </details>
      </div>
    );
  }

  const seviyeNo = BRAND_TESTS.findIndex((t) => t.slug === test.slug) + 1;

  /* ── Sorular ── */
  if (!finished) {
    const q = test.questions[current];
    const yariYol = current === Math.floor(test.questions.length / 2);
    return (
      <div className="mx-auto mt-10 max-w-[680px] rounded-[14px] border p-6 text-white md:p-8" style={{ borderColor: CIZGI, background: KART }}>
        <div className="flex items-center justify-between gap-3">
          <span className="min-w-0 truncate text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: SILIK }}>
            Seviye {seviyeNo} · {test.shortTitle}
          </span>
          <span className="font-display shrink-0 text-[14px] tabular-nums" style={{ fontWeight: 700 }}>
            {current + 1}
            <span style={{ color: SILIK, fontWeight: 400 }}> / {test.questions.length}</span>
          </span>
        </div>

        {/* Adım adım ilerleme çubuğu */}
        <div className="mt-4 flex gap-1.5" aria-hidden>
          {test.questions.map((_, i) => (
            <span
              key={i}
              className="h-1.5 flex-1 rounded-full transition-colors duration-300"
              style={{ background: i < current ? '#FFFFFF' : i === current ? KIRMIZI : CIZGI }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {yariYol && (
              <p className="mt-6 text-[12px] font-semibold" style={{ color: KIRMIZI }}>
                Yarı yoldasınız!
              </p>
            )}
            <p className={`${yariYol ? 'mt-2' : 'mt-6'} min-h-[56px] text-[17px] leading-[1.5]`} style={{ fontWeight: 500 }}>
              {q.question}
            </p>

            <div className="mt-5 flex flex-col gap-2.5">
              {q.options.map((o, i) => {
                const aktif = secilen === i;
                return (
                  <button
                    key={o.label}
                    type="button"
                    onClick={() => yanitla(i, o.score)}
                    className="group flex items-center gap-3 rounded-[10px] border px-3 py-3 text-left text-[14px] leading-[1.45] transition hover:border-white/35 hover:bg-white/[0.06]"
                    style={{
                      borderColor: aktif ? '#FFFFFF' : CIZGI,
                      background: aktif ? 'rgba(255,255,255,0.12)' : 'transparent',
                    }}
                  >
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] border text-[12px] font-semibold transition"
                      style={{
                        borderColor: aktif ? '#FFFFFF' : CIZGI,
                        background: aktif ? '#FFFFFF' : 'transparent',
                        color: aktif ? '#0A0A0A' : SOLUK,
                      }}
                    >
                      {HARFLER[i]}
                    </span>
                    <span style={{ fontWeight: 400 }}>{o.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-5 flex items-center justify-between text-[12px]" style={{ color: SILIK }}>
          <button
            type="button"
            onClick={() => (current === 0 ? setTest(null) : setAnswers((a) => a.slice(0, -1)))}
            className="inline-flex items-center gap-1 transition hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            {current === 0 ? 'Seviye seçimine dön' : 'Önceki soru'}
          </button>
          <span className="hidden sm:inline">Klavyeden A–D ile de yanıtlayabilirsiniz</span>
        </div>
      </div>
    );
  }

  /* ── Sonuç ── */
  const maxScore = getMaxScore(test);
  const band = getResultBand(test, score);
  const oran = maxScore ? score / maxScore : 0;
  const R = 52;
  const cevre = 2 * Math.PI * R;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="mx-auto mt-10 max-w-[680px] rounded-[14px] border p-6 text-white md:p-8"
      style={{ borderColor: CIZGI, background: KART }}
    >
      <div className="flex flex-col items-center text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: SILIK }}>
          Seviye {seviyeNo} tamamlandı · {test.shortTitle}
        </p>

        {/* Puan halkası */}
        <div className="relative mt-5 h-[132px] w-[132px]">
          <svg viewBox="0 0 132 132" className="h-full w-full -rotate-90" aria-hidden>
            <circle cx="66" cy="66" r={R} fill="none" stroke={CIZGI} strokeWidth="9" />
            <motion.circle
              cx="66"
              cy="66"
              r={R}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={cevre}
              initial={{ strokeDashoffset: cevre }}
              animate={{ strokeDashoffset: cevre * (1 - oran) }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-[36px] leading-none tracking-tight" style={{ fontWeight: 800 }}>
              <SayacPuan hedef={score} />
            </span>
            <span className="mt-1 text-[12px]" style={{ color: SILIK }}>
              / {maxScore} puan
            </span>
          </div>
        </div>

        {/* Ulaşılan kademe, üç kademelik yol üzerinde */}
        <div className="mt-6 flex w-full max-w-[460px] gap-1.5">
          {test.bands.map((b) => {
            const bu = b.title === band.title;
            return (
              <div
                key={b.title}
                className="flex-1 rounded-[8px] border px-2 py-2 text-[11px] leading-[1.3]"
                style={{
                  borderColor: bu ? '#FFFFFF' : CIZGI,
                  background: bu ? '#FFFFFF' : 'transparent',
                  color: bu ? '#0A0A0A' : SILIK,
                  fontWeight: bu ? 700 : 400,
                }}
              >
                {b.title}
              </div>
            );
          })}
        </div>

        <h3 className="font-display mt-6 text-[22px] tracking-tight" style={{ fontWeight: 800 }}>
          {band.title}
        </h3>
        <p className="mt-3 max-w-[52ch] text-[14.5px] leading-[1.7]" style={{ color: SOLUK, fontWeight: 300 }}>
          {band.summary}
        </p>

        <div className="mt-6 w-full rounded-[12px] border p-5 text-left" style={{ borderColor: CIZGI }}>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em]" style={{ color: SILIK }}>
            Sıradaki adımlarınız
          </p>
          <ol className="mt-3 flex flex-col gap-3">
            {band.recommendations.map((rec, i) => (
              <li key={rec} className="flex items-start gap-3 text-[13.5px] leading-[1.5]">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
                  style={{ background: '#FFFFFF', color: '#0A0A0A' }}
                >
                  {i + 1}
                </span>
                <span style={{ color: SOLUK, fontWeight: 300 }}>{rec}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-7 flex w-full flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:items-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-[8px] px-5 py-3 text-[13.5px] font-semibold text-white transition hover:opacity-90"
            style={{ background: '#25D366' }}
          >
            <WhatsAppGlyph className="h-[17px] w-[17px]" />
            Sonucumu Konuşalım!
          </a>
          <button
            type="button"
            onClick={() => pickTest(test)}
            className="inline-flex items-center justify-center gap-2 rounded-[8px] border px-5 py-3 text-[13.5px] font-medium text-white transition hover:bg-white/10"
            style={{ borderColor: CIZGI }}
          >
            <RotateCcw className="h-4 w-4" strokeWidth={1.75} />
            Tekrar Çöz
          </button>
          <button
            type="button"
            onClick={() => setTest(null)}
            className="inline-flex items-center justify-center rounded-[8px] px-4 py-3 text-[13.5px] font-medium transition hover:text-white"
            style={{ color: SOLUK }}
          >
            Başka seviye seç
          </button>
        </div>
      </div>
    </motion.div>
  );
}
