'use client';

import { CalendarClock } from 'lucide-react';

const SCHEDULING_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1um6hda1soZolvF4yY1oTMwugah-W2o-rB-jGgcJ0_eIzeTL8qR5oKuRHr6TcU8YI7oAwmI2eH?gv=true';

export function AppointmentButton() {
  return (
    <div>
      <style>{`
        @keyframes push-pulse {
          0%, 100% { transform: translateY(0) scale(1); box-shadow: 0 4px 12px -6px rgba(220,38,38,0.5); }
          50% { transform: translateY(-3px) scale(1.035); box-shadow: 0 14px 30px -8px rgba(220,38,38,0.55); }
        }
        .push-pulse { animation: push-pulse 2.4s cubic-bezier(.4,0,.2,1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .push-pulse { animation: none; }
        }
      `}</style>

      <div className="text-center">
        <h2
          className="font-display text-[24px] tracking-tight md:text-[28px]"
          style={{ fontWeight: 700 }}
        >
          Markanız için doğru kararları birlikte alalım.
        </h2>
        <p
          className="mx-auto mt-4 max-w-[520px] text-[15px] leading-[1.65]"
          style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)', fontWeight: 300 }}
        >
          İlk görüşme sizi ve markanızı tanımak için ayrılır; birlikte çalışıp
          çalışmayacağımıza bu görüşmenin sonunda birlikte karar veririz.
        </p>
      </div>

      <div className="mx-auto mt-10 flex max-w-[520px] justify-center">
        {/* Randevu kartı */}
        <div
          className="flex w-full flex-col items-center justify-center rounded-[12px] border p-7 text-center md:p-8"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
        >
          <span
            className="flex h-11 w-11 items-center justify-center rounded-full"
            style={{ background: 'var(--fg)' }}
          >
            <CalendarClock className="h-5 w-5" strokeWidth={1.75} style={{ color: 'var(--bg)' }} />
          </span>
          <p
            className="mt-4 text-[13.5px] leading-[1.6]"
            style={{ color: 'color-mix(in oklab, var(--fg) 62%, transparent)', fontWeight: 300 }}
          >
            Randevunuzu oluşturun; görüşme daveti takviminize otomatik düşsün.
          </p>
          <a
            href={SCHEDULING_URL}
            target="_blank"
            rel="noreferrer"
            className="push-pulse mt-6 inline-flex items-center gap-2 rounded-[8px] px-6 py-3 text-[13.5px] font-semibold text-white"
            style={{ background: '#DC2626' }}
          >
            Hemen Randevu Oluşturun!
          </a>
        </div>
      </div>
    </div>
  );
}
