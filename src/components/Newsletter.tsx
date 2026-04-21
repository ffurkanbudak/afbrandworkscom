import { ArrowRight } from 'lucide-react';

const CONTACT_EMAIL = 'info@afbrandworks.com';

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
          <h3 className="mt-4 font-display text-[24px] leading-[1.15] md:text-[30px]">
            Marka danışmanından haftalık 5 dakikalık notlara erişin.
          </h3>
          <p
            className="mt-4 text-[15px] leading-[1.6]"
            style={{ color: 'color-mix(in oklab, var(--bg) 70%, transparent)' }}
          >
            Geçici akımları geride bırakın, doğrudan büyüme mimarisine odaklanın.
            Marka inşası üzerine yazılar, sektörel gelişmeler, stratejik yöntemler
            ve kanıtlanmış vaka analizleriyle her hafta e-posta kutunuza ulaşan
            rafine bir içgörü.
          </p>
        </div>

        <div className="w-full md:max-w-[360px]">
          <p
            className="text-[11px] font-semibold tracking-[0.14em] uppercase"
            style={{ color: 'color-mix(in oklab, var(--bg) 65%, transparent)' }}
          >
            Bültene kaydolun!
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Bülten%20Kaydı`}
            className="mt-3 inline-flex items-center gap-2 rounded-[8px] px-5 py-3 text-[14px] font-medium transition hover:opacity-90"
            style={{ background: '#DC2204', color: '#FFFFFF' }}
          >
            {CONTACT_EMAIL}
            <ArrowRight className="h-[13px] w-[13px]" strokeWidth={2.25} />
          </a>
          <p
            className="mt-3 text-[12.5px] leading-[1.55]"
            style={{ color: 'color-mix(in oklab, var(--bg) 55%, transparent)' }}
          >
            Kayıt için yukarıdaki adrese e-posta gönderebilirsiniz.
          </p>
        </div>
      </div>
    </section>
  );
}
