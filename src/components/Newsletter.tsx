import { SubscribeForm } from './SubscribeForm';
import { XCard } from './XCard';

export function Newsletter({ readerCount = 300 }: { readerCount?: number }) {
  return (
    <section
      className="relative rounded-[12px] border px-7 py-10 md:px-9 md:py-12 lg:px-12"
      style={{
        background: 'var(--bg)',
        borderColor: 'var(--border)',
        color: 'var(--fg)',
      }}
    >
      <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1fr)_250px] md:gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
        <div className="flex min-w-0 flex-col gap-7">
          <div>
            <p
              className="text-[11px] font-semibold tracking-[0.14em] uppercase"
              style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
            >
              Bülten · {readerCount}+ okuyucu
            </p>
            <h3
              className="mt-4 font-display text-[22px] leading-[1.15] text-balance md:text-[26px]"
              style={{ fontWeight: 800 }}
            >
              Marka danışmanından haftalık 5 dakikalık notlar
            </h3>
            <p
              className="mt-4 max-w-[54ch] text-[15px] leading-[1.6]"
              style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)', fontWeight: 300 }}
            >
              Dünyanın marka, pazarlama ve iletişim gündemini her hafta tek e-postada keşfedin.
            </p>
          </div>

          <div className="w-full max-w-[560px]">
            <SubscribeForm />
            <p
              className="mt-3 text-[12px] leading-[1.55]"
              style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
            >
              E-postanızı bırakın; sizi bülten listemize ekleyelim. Dilediğiniz an çıkabilirsiniz.
            </p>
          </div>
        </div>

        <XCard />
      </div>
    </section>
  );
}
