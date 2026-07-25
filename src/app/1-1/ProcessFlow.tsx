'use client';

import { motion } from 'motion/react';

/** Notion tarzı çizim avatar (DiceBear "notionists") */
const AVATAR_URL = 'https://api.dicebear.com/9.x/notionists/svg?seed=marka-teatisi&backgroundColor=ffffff';

/** Durakların yatay konumları (%) ve dalga üzerindeki dikey konumları (%) */
const STOPS: { left: string; top: string }[] = [
  { left: '10%', top: '20%' },
  { left: '30%', top: '80%' },
  { left: '50%', top: '20%' },
  { left: '70%', top: '80%' },
  { left: '90%', top: '20%' },
];

const AVATAR_LIFT = 'calc(A - 74px)';

function avatarTop(stopTop: string) {
  return AVATAR_LIFT.replace('A', stopTop);
}

/** Dalga üzerinde durak durak süzülen Notion avatarı (imleç) */
function TravelingAvatar() {
  const lefts = STOPS.map((s) => s.left);
  const tops = STOPS.map((s) => avatarTop(s.top));
  return (
    <motion.div
      className="pointer-events-none absolute z-10 flex -translate-x-1/2 flex-col items-center"
      initial={{ left: lefts[0], top: tops[0] }}
      animate={{
        left: [
          lefts[0], lefts[0],
          lefts[1], lefts[1],
          lefts[2], lefts[2],
          lefts[3], lefts[3],
          lefts[4], lefts[4],
          lefts[0],
        ],
        top: [
          tops[0], tops[0],
          tops[1], tops[1],
          tops[2], tops[2],
          tops[3], tops[3],
          tops[4], tops[4],
          tops[0],
        ],
      }}
      transition={{
        duration: 16,
        times: [0, 0.14, 0.2, 0.34, 0.4, 0.54, 0.6, 0.74, 0.8, 0.97, 1],
        ease: 'easeInOut',
        repeat: Infinity,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={AVATAR_URL}
        alt=""
        width={46}
        height={46}
        className="h-[46px] w-[46px] rounded-full border-2 border-white bg-white object-cover shadow-lg"
      />
      {/* İmleç ucu */}
      <span
        className="mt-[-5px] h-2.5 w-2.5 rotate-45"
        style={{ background: '#DC2626' }}
        aria-hidden
      />
    </motion.div>
  );
}

export function ProcessFlow({ steps }: { steps: string[] }) {
  return (
    <div>
      {/* Masaüstü: dalgalı çizgi + süzülen avatar */}
      <div className="mx-auto mt-24 hidden max-w-[860px] md:block">
        <div className="relative h-[150px]">
          <TravelingAvatar />

          {/* Dalgalı çizgi */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 150"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M100,30 C200,30 200,120 300,120 C400,120 400,30 500,30 C600,30 600,120 700,120 C800,120 800,30 900,30"
              fill="none"
              style={{ stroke: 'color-mix(in oklab, var(--fg) 20%, transparent)' }}
              strokeWidth="1.5"
              strokeDasharray="5 6"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Duraklar */}
          {STOPS.map((s, i) => (
            <span
              key={i}
              className="absolute z-10 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[11px] font-semibold text-white"
              style={{ left: s.left, top: s.top, background: '#DC2626' }}
            >
              {i + 1}
            </span>
          ))}
        </div>

        {/* Adım metinleri */}
        <ol className="mt-6 grid grid-cols-5">
          {steps.map((line) => (
            <li key={line} className="px-2 text-center">
              <p
                className="text-[13.5px] leading-[1.5]"
                style={{ color: 'var(--fg)', fontWeight: 300 }}
              >
                {line}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Mobil: dikey liste */}
      <ol className="mx-auto mt-10 flex max-w-[480px] flex-col gap-3 md:hidden">
        {steps.map((line, i) => (
          <li
            key={line}
            className="flex items-start gap-3 rounded-[8px] border px-5 py-4"
            style={{ borderColor: 'var(--border)' }}
          >
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
              style={{ background: '#DC2626' }}
            >
              {i + 1}
            </span>
            <p className="text-[14.5px] leading-[1.5]" style={{ color: 'var(--fg)', fontWeight: 300 }}>
              {line}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
