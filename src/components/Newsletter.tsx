import { SubscribeForm } from './SubscribeForm';

export function Newsletter({ readerCount = 300 }: { readerCount?: number }) {
  return (
    <section
      className="relative overflow-hidden rounded-[12px] px-7 py-12 md:px-14 md:py-16"
      style={{
        background: 'var(--fg)',
        color: 'var(--bg)',
      }}
    >
      <div className="relative z-10 flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[52ch]">
          <p
            className="text-[11px] font-semibold tracking-[0.14em] uppercase"
            style={{ color: 'color-mix(in oklab, var(--bg) 65%, transparent)' }}
          >
            Bülten · {readerCount}+ okuyucu
          </p>
          <h3
            className="mt-4 font-display text-[24px] leading-[1.15] md:text-[30px]"
            style={{ fontWeight: 800 }}
          >
            Marka Danışmanından Haftalık 5 Dakikalık Notlar
          </h3>
          <p
            className="mt-4 text-[15px] leading-[1.6] font-normal"
            style={{ color: 'color-mix(in oklab, var(--bg) 70%, transparent)', fontWeight: 400 }}
          >
            Geçici akımları geride bırakın, doğrudan büyüme mimarisine odaklanın.
            Marka inşası üzerine yazılar, sektörel gelişmeler, stratejik yöntemler
            ve kanıtlanmış vaka analizleriyle her hafta e-posta kutunuza ulaşan
            rafine bir içgörü.
          </p>
        </div>

        <div className="w-full md:max-w-[380px]">
          <p
            className="text-[11px] font-semibold tracking-[0.14em] uppercase"
            style={{ color: 'color-mix(in oklab, var(--bg) 65%, transparent)' }}
          >
            Bültene Kaydolun
          </p>
          <SubscribeForm />
          <p
            className="mt-3 text-[12.5px] leading-[1.55]"
            style={{ color: 'color-mix(in oklab, var(--bg) 55%, transparent)' }}
          >
            E-postanızı bırakın; sizi bülten listemize ekleyelim. Dilediğiniz an çıkabilirsiniz.
          </p>
        </div>
      </div>
    </section>
  );
}
