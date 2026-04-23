import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

type MiniPlan = {
  name: string;
  subtitle: string;
  tagline: string;
  bullets: string[];
  locked?: boolean;
};

const MINI_PLANS: MiniPlan[] = [
  {
    name: 'Gözlemci',
    subtitle: 'Ücretsiz',
    tagline: 'Tüm yazılara erişim, yorum ve beğeni hakkı.',
    bullets: [
      'Tüm blog yazılarına sınırsız erişim',
      'Haftalık marka bülteni',
      'Topluluk alanına katılım',
    ],
  },
  {
    name: 'Ortak',
    subtitle: 'Orta Paket · Yakında',
    tagline: 'Bir danışmanla çalışma ve topluluk içinde görülme.',
    bullets: [
      '1 saat birebir mentörlük',
      'Öncelikli yanıt 24 saat içinde',
      'Kadın Girişimci Programı hakkı',
    ],
    locked: true,
  },
  {
    name: 'Mimari',
    subtitle: 'Üst Paket · Yakında',
    tagline: 'Stratejik ortaklık, raporlama ve tanıtım.',
    bullets: [
      '2 saat birebir mentörlük',
      'WhatsApp öncelik hattı',
      'Yıllık marka sağlık raporu',
    ],
    locked: true,
  },
];

export function Paywall() {
  return (
    <div className="relative mx-auto mt-4 max-w-[860px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-40"
        style={{
          background:
            'linear-gradient(to bottom, color-mix(in oklab, var(--bg) 0%, transparent), var(--bg) 85%)',
        }}
      />
      <div
        className="relative rounded-[14px] border p-6 md:p-10"
        style={{ borderColor: 'var(--border)', background: 'var(--bg-soft)' }}
      >
        <div className="text-center">
          <p
            className="text-[11px] font-semibold tracking-[0.14em] uppercase"
            style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
          >
            Okumaya devam et
          </p>
          <h3 className="font-display mt-3 text-[24px] leading-[1.15] md:text-[30px]">
            Yazının tamamı üyeler için
          </h3>
          <p
            className="mx-auto mt-4 max-w-[52ch] text-[14.5px] leading-[1.6]"
            style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
          >
            Üç paketten birini seçin. Gözlemci ücretsizdir; Ortak ve Mimari
            paketleri için ön kayıt açıktır.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {MINI_PLANS.map((p) => (
            <div
              key={p.name}
              className="relative rounded-[10px] border p-5"
              style={{
                borderColor: 'var(--border)',
                background: 'var(--bg)',
              }}
            >
              {p.locked && (
                <span
                  className="absolute top-3 right-3 rounded-full border px-2 py-[3px] text-[9.5px] font-semibold tracking-[0.12em] uppercase"
                  style={{
                    borderColor: 'color-mix(in oklab, var(--fg) 25%, transparent)',
                    color: 'color-mix(in oklab, var(--fg) 75%, transparent)',
                  }}
                >
                  Yakında
                </span>
              )}
              <p
                className="text-[10.5px] font-semibold tracking-[0.14em] uppercase"
                style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
              >
                {p.subtitle}
              </p>
              <h4 className="font-display mt-2 text-[19px] tracking-tight">
                {p.name}
              </h4>
              <p
                className="mt-2 text-[12.5px] leading-[1.55]"
                style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
              >
                {p.tagline}
              </p>
              <ul className="mt-4 space-y-1.5">
                {p.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-1.5 text-[12px] leading-[1.5]"
                  >
                    <Check
                      className="mt-[2px] h-[11px] w-[11px] shrink-0"
                      strokeWidth={2.25}
                      style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
                    />
                    <span style={{ color: 'color-mix(in oklab, var(--fg) 80%, transparent)' }}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/uyelik"
            className="inline-flex items-center justify-center gap-2 rounded-[8px] px-5 py-3 text-[14px] font-semibold transition hover:opacity-90"
            style={{ background: 'var(--fg)', color: 'var(--bg)' }}
          >
            Üyelikleri gör
            <ArrowRight className="h-[13px] w-[13px]" strokeWidth={2.25} />
          </Link>
          <Link
            href="/sign-in"
            className="inline-flex items-center justify-center rounded-[8px] border px-5 py-3 text-[13.5px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
            style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
          >
            Zaten üye misiniz? Giriş yap
          </Link>
        </div>
      </div>
    </div>
  );
}
