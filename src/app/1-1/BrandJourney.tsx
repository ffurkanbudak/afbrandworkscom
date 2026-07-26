'use client';

import { motion } from 'motion/react';

const AVATAR_URL =
  'https://api.dicebear.com/9.x/notionists/svg?seed=marka-teatisi&backgroundColor=ffffff';

const KIRMIZI = '#DC2626';

/** Yolculuğun on durağı. */
const ADIMLAR: { baslik: string; metin: string }[] = [
  { baslik: 'Tanışma', metin: 'Ücretsiz ön görüşmede sizi ve markanızı dinliyorum.' },
  { baslik: 'Mevcut durumun analizi', metin: 'Markanın bugün nerede durduğu görünür hâle geliyor.' },
  { baslik: 'Çalışma modelinin seçimi', metin: 'İhtiyaca ve sürecin yoğunluğuna uygun model belirleniyor.' },
  { baslik: 'Hedeflerin netleşmesi', metin: 'Öncelikler ve başarı ölçütleri birlikte tanımlanıyor.' },
  { baslik: 'Stratejik çerçeve', metin: 'Konumlandırma ve farklılaşma ekseni kuruluyor.' },
  { baslik: 'Kimlik ve mesaj', metin: 'Ses tonu, mesaj mimarisi ve görsel yön netleşiyor.' },
  { baslik: 'Dijital markalaşma', metin: 'Dijital kanallar markanın tutarlı yansımasına dönüşüyor.' },
  { baslik: 'Pazarlama ve iletişim', metin: 'Kanal stratejisi ve içerik planı devreye giriyor.' },
  { baslik: 'Talebin artırılması', metin: 'Bilinirlik ve tercih edilirlik satışa dönüşmeye başlıyor.' },
  { baslik: 'Sürdürülebilir büyüme', metin: 'Ölçüyor, öğreniyor ve markayı bir üst noktaya taşıyoruz.' },
];

const SATIR_YUKSEKLIGI = 104;

/** Duraklar arasında süzülen avatar; her durakta kısa süre bekler. */
function SuzulenAvatar() {
  // Numaranın üstünü kapatmaması için duraktan biraz yukarıda ilerler.
  const duraklar = ADIMLAR.map((_, i) => i * SATIR_YUKSEKLIGI + SATIR_YUKSEKLIGI / 2 - 38);

  const kareler: number[] = [];
  const zamanlar: number[] = [];
  const pay = 0.92 / ADIMLAR.length;

  duraklar.forEach((y, i) => {
    kareler.push(y, y);
    zamanlar.push(i * pay, i * pay + pay * 0.55);
  });
  // Sona gelince başa dönüş
  kareler.push(duraklar[0]);
  zamanlar.push(1);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block"
      initial={{ top: duraklar[0] }}
      animate={{ top: kareler }}
      transition={{
        duration: 26,
        times: zamanlar,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={AVATAR_URL}
        alt=""
        width={44}
        height={44}
        className="h-[44px] w-[44px] rounded-full border-2 border-white bg-white object-cover shadow-lg"
      />
    </motion.div>
  );
}

function Numara({ i }: { i: number }) {
  return (
    <span
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
      style={{ background: KIRMIZI }}
    >
      {i + 1}
    </span>
  );
}

export function BrandJourney() {
  return (
    <div className="mx-auto w-full max-w-[900px]">
      {/* Masaüstü: ortada çizgi, iki yana dizilen duraklar, süzülen avatar */}
      <div
        className="relative mt-12 hidden md:block"
        style={{ height: ADIMLAR.length * SATIR_YUKSEKLIGI }}
      >
        <span
          aria-hidden
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 border-l border-dashed"
          style={{ borderColor: 'color-mix(in oklab, var(--fg) 22%, transparent)' }}
        />

        <SuzulenAvatar />

        <ol>
          {ADIMLAR.map((adim, i) => {
            const solda = i % 2 === 0;
            return (
              <li
                key={adim.baslik}
                className="absolute flex w-full items-center"
                style={{ top: i * SATIR_YUKSEKLIGI, height: SATIR_YUKSEKLIGI }}
              >
                <div
                  className={`w-1/2 ${solda ? 'pr-14 text-right' : 'ml-auto pl-14 text-left'}`}
                >
                  <p
                    className="text-[15px] leading-[1.3] tracking-tight"
                    style={{ color: 'var(--fg)', fontWeight: 600 }}
                  >
                    {adim.baslik}
                  </p>
                  <p
                    className="mt-1.5 text-[13.5px] leading-[1.5]"
                    style={{ color: 'color-mix(in oklab, var(--fg) 62%, transparent)' }}
                  >
                    {adim.metin}
                  </p>
                </div>

                <span
                  aria-hidden
                  className={`absolute left-1/2 z-10 -translate-x-1/2 ${solda ? '' : ''}`}
                >
                  <Numara i={i} />
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Mobil: dikey liste */}
      <ol className="mx-auto mt-10 flex max-w-[480px] flex-col gap-3 md:hidden">
        {ADIMLAR.map((adim, i) => (
          <li
            key={adim.baslik}
            className="flex items-start gap-3 rounded-[10px] border px-5 py-4"
            style={{ borderColor: 'var(--border)' }}
          >
            <Numara i={i} />
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
    </div>
  );
}
