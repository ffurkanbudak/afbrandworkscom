import { LineShadowText } from '@/components/ui/line-shadow-text';

const MUTED = 'rgba(255,255,255,0.72)';
const FAINT = 'rgba(255,255,255,0.42)';
const LINE = 'rgba(255,255,255,0.14)';

/** Metin akışı içinde öne çıkan tutar. */
function Fiyat({ eski, yeni, birim }: { eski?: string; yeni: string; birim?: string }) {
  return (
    <span className="whitespace-nowrap">
      {eski && (
        <s className="mr-2 text-[15px]" style={{ color: FAINT, fontWeight: 500 }}>
          {eski}
        </s>
      )}
      <strong className="text-[19px] tracking-tight text-white" style={{ fontWeight: 800 }}>
        {yeni}
      </strong>
      {birim && (
        <span className="ml-1.5 text-[14px]" style={{ color: MUTED }}>
          {birim}
        </span>
      )}
    </span>
  );
}

function ModelBasligi({ children }: { children: string }) {
  return (
    <h3
      className="font-display text-[20px] leading-[1.2] tracking-tight text-white md:text-[22px]"
      style={{ fontWeight: 700 }}
    >
      <LineShadowText shadowColor="#FFFFFF">{children}</LineShadowText>
    </h3>
  );
}

const P = 'text-[15.5px] leading-[1.85]';

export function Packages() {
  return (
    <div className="mx-auto w-full max-w-[760px] px-6">
      <h2
        className="font-display text-[24px] leading-[1.15] tracking-tight text-white md:text-[28px]"
        style={{ fontWeight: 700 }}
      >
        Nasıl çalışıyorum?
      </h2>

      <div className="mt-7 flex flex-col gap-6" style={{ color: MUTED }}>
        <p className={P}>
          Yılda yalnızca sınırlı sayıda markayla çalışıyorum. Her markanın sektörü,
          hedefleri, rekabet ortamı ve büyüme potansiyeli birbirinden ayrı olduğu için
          süreci hazır şablonlar üzerinden yürütmüyorum; masaya oturduğumuz her marka
          için ayrı hazırlanıyor, ayrı düşünüyorum. Görüşmelerde yalnızca o günün
          sorunlarını çözmek yerine, uzun vadede marka değeri oluşturacak kararları
          birlikte değerlendiriyoruz.
        </p>

        <p className={P}>
          İlk adım her zaman aynı:{' '}
          <Fiyat yeni="Ücretsiz" birim="15 dakikalık stratejik ön görüşme" />. Burada
          karşılıklı tanışıyor, markanızın mevcut durumunu kısaca analiz ediyor, temel
          ihtiyaçlarınızı ve hedeflerinizi konuşuyoruz. Görüşmenin sonunda size uygun
          çalışma modelini öneriyorum. Bu oturumda detaylı danışmanlık ya da stratejik
          yol haritası paylaşmıyorum; amacı doğru başlangıcı kurmak.
        </p>
      </div>

      <div className="mt-12 border-t pt-9" style={{ borderColor: LINE }}>
        <ModelBasligi>Stratejik Marka Mentörlüğü</ModelBasligi>
        <div className="mt-5 flex flex-col gap-5" style={{ color: MUTED }}>
          <p className={P}>
            Markasını büyütmek isteyen girişimciler, KOBİ sahipleri, e-ticaret markaları
            ve yeni büyüme dönemine hazırlanan şirketler için düzenli bir ritim. Haftada
            bir gün, iki saatlik birebir görüşmelerle ayda toplam sekiz saat birlikte
            çalışıyoruz.
          </p>
          <p className={P}>
            Görüşmeler arasında WhatsApp üzerinden öncelikli iletişim kuruyor,
            karşılaştığınız sorunlara çözüm öneriyorum. Marka, pazarlama ve büyüme
            süreçlerini birlikte değerlendiriyor; iş modeli ve konumlandırma üzerine
            istişare ediyor, öncelikli aksiyonları belirliyoruz. Her görüşmenin sonunda
            uygulanabilir bir yol haritası çıkıyor.
          </p>
          <p className={P}>
            Aylık yatırım: <Fiyat eski="₺45.000" yeni="₺34.900" birim="/ ay" />
          </p>
        </div>
      </div>

      <div className="mt-12 border-t pt-9" style={{ borderColor: LINE }}>
        <ModelBasligi>Stratejik Büyüme Partnerliği</ModelBasligi>
        <div className="mt-5 flex flex-col gap-5" style={{ color: MUTED }}>
          <p className={P}>
            Ölçeklenme sürecindeki şirketler, kurucu ortaklar, CEO&apos;lar ve üst düzey
            yöneticiler için. Haftada üç gün, birer saatlik görüşmelerle ayda toplam on
            iki saat; şirket yönetimiyle daha yakın çalıştığım, karar süreçlerine aktif
            şekilde dahil olduğum model.
          </p>
          <p className={P}>
            Öncelikli WhatsApp iletişiminin yanında, gerektiğinde hızlı karar görüşmeleri
            yapıyoruz. Yönetim kararlarını stratejik açıdan değerlendiriyor, sürekli geri
            bildirim ve gelişim takibiyle düzenli bir aksiyon planı yürütüyoruz.
          </p>
          <p className={P}>
            Aylık yatırım: <Fiyat eski="₺69.900" yeni="₺59.900" birim="/ ay" />
          </p>
        </div>
      </div>

      <p
        className={`mt-12 border-t pt-9 ${P}`}
        style={{ borderColor: LINE, color: MUTED }}
      >
        Hangi modelin size uygun olduğuna ön görüşmenin ardından birlikte karar
        veriyoruz.
      </p>
    </div>
  );
}
