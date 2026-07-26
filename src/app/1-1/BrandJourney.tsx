'use client';

import { motion } from 'motion/react';

const AVATAR_URL =
  'https://api.dicebear.com/9.x/notionists/svg?seed=marka-teatisi&backgroundColor=ffffff';

const KIRMIZI = '#DC2626';

/** Yolculuğun on durağı. Tek sırada dizildiği için etiketler kısa tutuldu. */
const ADIMLAR: { baslik: string; metin: string }[] = [
  { baslik: 'Tanışma', metin: 'Ücretsiz ön görüşmede sizi ve markanızı dinliyorum.' },
  { baslik: 'Mevcut durum', metin: 'Markanın bugün nerede durduğu görünür hâle geliyor.' },
  { baslik: 'Çalışma modeli', metin: 'İhtiyaca ve sürecin yoğunluğuna uygun model birlikte belirleniyor.' },
  { baslik: 'Hedefler', metin: 'Öncelikler ve başarı ölçütleri birlikte tanımlanıyor.' },
  { baslik: 'Stratejik çerçeve', metin: 'Konumlandırma ve farklılaşma ekseni kuruluyor.' },
  { baslik: 'Kimlik ve mesaj', metin: 'Ses tonu, mesaj mimarisi ve görsel yön netleşiyor.' },
  { baslik: 'Dijital markalaşma', metin: 'Dijital kanallar markanın tutarlı yansımasına dönüşüyor.' },
  { baslik: 'Pazarlama', metin: 'Kanal stratejisi ve içerik planı devreye giriyor.' },
  { baslik: 'Talebin artması', metin: 'Bilinirlik ve tercih edilirlik satışa dönüşmeye başlıyor.' },
  { baslik: 'Sürdürülebilir büyüme', metin: 'Ölçüyor, öğreniyor ve markayı bir üst noktaya taşıyoruz.' },
];

const DALGA_Y = 150;
const AVATAR_KALDIRMA = 74;

/* Duraklar 1000 birimlik görünüm kutusunda 100 birim arayla; tepe ve çukur dönüşümlü. */
const X = ADIMLAR.map((_, i) => 50 + i * 100);
const Y = ADIMLAR.map((_, i) => (i % 2 === 0 ? 30 : 120));

/** Duraklar arasında yumuşak kavisle geçen kesikli yol. */
const YOL = X.slice(0, -1)
  .map((x, i) => {
    const bas = i === 0 ? `M${x},${Y[i]} ` : '';
    return `${bas}C${x + 50},${Y[i]} ${X[i + 1] - 50},${Y[i + 1]} ${X[i + 1]},${Y[i + 1]}`;
  })
  .join(' ');

const SOL = X.map((x) => `${x / 10}%`);

/** Duraklar arasında süzülen avatar; her durakta kısa süre bekler. */
function SuzulenAvatar() {
  const solKare: string[] = [];
  const ustKare: number[] = [];
  const zaman: number[] = [];
  const pay = 0.94 / ADIMLAR.length;

  ADIMLAR.forEach((_, i) => {
    solKare.push(SOL[i], SOL[i]);
    ustKare.push(Y[i] - AVATAR_KALDIRMA, Y[i] - AVATAR_KALDIRMA);
    zaman.push(i * pay, i * pay + pay * 0.5);
  });
  solKare.push(SOL[0]);
  ustKare.push(Y[0] - AVATAR_KALDIRMA);
  zaman.push(1);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-20 flex -translate-x-1/2 flex-col items-center"
      initial={{ left: SOL[0], top: Y[0] - AVATAR_KALDIRMA }}
      animate={{ left: solKare, top: ustKare }}
      transition={{ duration: 30, times: zaman, ease: 'easeInOut', repeat: Infinity }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={AVATAR_URL}
        alt=""
        width={46}
        height={46}
        className="h-[46px] w-[46px] rounded-full border-2 border-white bg-white object-cover shadow-lg"
      />
      <span className="mt-[-5px] h-2.5 w-2.5 rotate-45" style={{ background: KIRMIZI }} aria-hidden />
    </motion.div>
  );
}

export function BrandJourney() {
  return (
    <>
      {/* Geniş ekran: tek sırada bombeli dalga, üzerinde süzülen avatar */}
      <div className="mx-auto hidden w-full max-w-[1440px] px-4 xl:block">
        <div className="relative mt-20" style={{ height: DALGA_Y }}>
          <SuzulenAvatar />

          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 150"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d={YOL}
              fill="none"
              style={{ stroke: 'color-mix(in oklab, var(--fg) 20%, transparent)' }}
              strokeWidth="1.5"
              strokeDasharray="5 6"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {ADIMLAR.map((adim, i) => {
            const tepede = Y[i] < 75;
            return (
              <span
                key={adim.baslik}
                className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: SOL[i], top: Y[i] }}
              >
                <button
                  type="button"
                  aria-describedby={`adim-${i}`}
                  className="flex h-7 w-7 cursor-help items-center justify-center rounded-full text-[11px] font-semibold text-white transition group-hover:scale-110 group-focus-within:scale-110"
                  style={{ background: KIRMIZI }}
                >
                  {i + 1}
                </button>

                <span
                  id={`adim-${i}`}
                  role="tooltip"
                  className={`pointer-events-none absolute left-1/2 z-30 w-[190px] -translate-x-1/2 rounded-[8px] px-3 py-2 text-center text-[12px] leading-[1.45] opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 ${
                    tepede ? 'top-full mt-3' : 'bottom-full mb-3'
                  }`}
                  style={{ background: 'var(--fg)', color: 'var(--bg)' }}
                >
                  {adim.metin}
                </span>
              </span>
            );
          })}
        </div>

        <ol className="mt-7 grid grid-cols-10">
          {ADIMLAR.map((adim) => (
            <li key={adim.baslik} className="px-1 text-center">
              <p
                className="text-[12px] leading-[1.3] tracking-tight whitespace-nowrap"
                style={{ color: 'var(--fg)', fontWeight: 300 }}
              >
                {adim.baslik}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Dar ekran: numaralı dikey liste */}
      <ol className="mx-auto mt-10 flex max-w-[480px] flex-col gap-3 px-6 xl:hidden">
        {ADIMLAR.map((adim, i) => (
          <li
            key={adim.baslik}
            className="flex items-start gap-3 rounded-[10px] border px-5 py-4"
            style={{ borderColor: 'var(--border)' }}
          >
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
              style={{ background: KIRMIZI }}
            >
              {i + 1}
            </span>
            <div>
              <p
                className="text-[14.5px] leading-[1.3] tracking-tight"
                style={{ color: 'var(--fg)', fontWeight: 600 }}
              >
                {adim.baslik}
              </p>
              <p
                className="mt-1 text-[13.5px] leading-[1.5]"
                style={{ color: 'color-mix(in oklab, var(--fg) 62%, transparent)' }}
              >
                {adim.metin}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
