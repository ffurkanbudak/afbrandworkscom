import { Handshake } from 'lucide-react';

function B({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-black">{children}</strong>;
}

/**
 * Ana sayfa "Hakkında" bölümü. Hero'nun hemen altında, beyaz zeminde durur:
 * solda açılış cümlesi büyük puntoyla, sağda deneyim metni, altta davet ve CTA.
 */
export function HomeAbout() {
  return (
    <section
      id="hakkinda"
      aria-labelledby="hakkinda-baslik"
      className="full-bleed font-sans"
      style={{ background: '#FFFFFF', color: '#0A0A0A' }}
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 py-12 md:px-10 md:py-16 lg:px-14">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2
              id="hakkinda-baslik"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/50"
            >
              Hakkında
            </h2>
            <p
              className="font-display mt-4 text-[clamp(24px,2.7vw,34px)] leading-[1.15] tracking-tight text-black/80"
              style={{ fontWeight: 300 }}
            >
              Bugüne kadar <B>onlarca marka</B> için iletişim stratejileri geliştirdi ve uyguladı.
            </p>
          </div>

          <div
            className="space-y-4 text-[15px] leading-[1.7] text-black/70 lg:col-span-7 lg:pt-8"
            style={{ fontWeight: 300 }}
          >
            <p>
              Bazı markaları sıfırdan oluşturdu, bazı markaların gelişmesi ve yeniden
              yapılandırılması için stratejiler geliştirdi. Markaların daha güçlü bir kimlik
              kazanması, rakiplerinden ayrışması ve dijitalde görünür olması üzerine çalıştı.
              Türkiye ve global pazarlarda markaların büyümesine yönelik projeler geliştirdi. Özel
              sektörün yanında kamu kurumları ve kuruluşları için de projeler gerçekleştirdi.
              Bireylere, yöneticilere ve girişimcilere mentorluk, danışmanlık ve eğitimler verdi.
            </p>
            <p>
              Son dönemde AI markalaşma üzerine çalışmalar yürütüyor; markaların arama
              motorlarında ve ChatGPT, Gemini, Claude gibi yapay zekâ modellerinde doğru şekilde
              tanınması ve bulunması üzerine yeni stratejiler geliştiriyor. VANTAGE52 ile
              uluslararası iş dünyasına yönelik yayıncılık faaliyetlerini sürdürüyor.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-black/10 pt-6 md:mt-10 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="max-w-[62ch]">
            <p className="text-[16px] leading-[1.5] text-black md:text-[18px]" style={{ fontWeight: 400 }}>
              Eğer rakibinin hiç aklına gelmeyen fikirleri uygulamak, markanı daha görünür ve güçlü
              hâle getirmek istiyorsan, konuşacak çok şey var.
            </p>
            <p className="mt-1.5 text-[14px] leading-[1.6] text-black/70" style={{ fontWeight: 300 }}>
              Hemen bir tanışma görüşmesi planlayabilirsin. Görüşmek üzere.
            </p>
          </div>
          <a
            href="#marka-masasi"
            className="btn-red inline-flex w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[8px] px-5 py-3 text-[13.5px] font-semibold sm:w-auto"
          >
            <Handshake className="h-[16px] w-[16px]" strokeWidth={2} />
            Marka Masası
          </a>
        </div>
      </div>
    </section>
  );
}
