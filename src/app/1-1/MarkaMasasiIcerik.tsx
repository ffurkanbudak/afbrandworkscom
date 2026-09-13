import { BrandJourney } from './BrandJourney';
import { TopicsCloud } from './TopicsCloud';
import { Packages } from './Packages';
import { BrandTest } from './BrandTest';
import { TestIcerigi } from './TestIcerigi';
import { ProcessFlow } from './ProcessFlow';
import { WHATSAPP_URL } from './MarkaMasasiHero';
import { KART_STILI } from './kartStili';

const MUTED = { color: 'var(--fg)', fontWeight: 300 };

const PROCESS_LINES = [
  'İlk görüşmede sizi ve markanızı dinliyorum.',
  'Markanızı Toganworks Brand Intelligence ile değerlendiriyorum.',
  'Hedeflerinizi konuşuyoruz.',
  'Öncelikleri belirliyoruz.',
  'Her görüşmenin sonunda uygulanabilir aksiyonlar çıkarıyoruz.',
];



const FAQ: { q: string; a: string }[] = [
  {
    q: 'Birebir danışmanlık kimler için uygundur?',
    a: 'Markasını stratejik bir öncelik olarak gören marka sahipleri, girişimciler ve yöneticiler için uygundur. Sektörden bağımsız olarak, kararlarını daha sağlıklı vermek isteyen herkesle çalışılabilir.',
  },
  {
    q: 'Bu süreç markama nasıl katkı sağlar?',
    a: 'Kararlarınızı hızlandırır, önceliklerinizi netleştirir ve size düzenli bir dış bakış açısı kazandırır. Markanızın mevcut durumu görünür hâle gelir; pazarlama ve büyüme yatırımlarınız daha verimli çalışır.',
  },
  {
    q: 'Görüşmeler hangi sıklıkla gerçekleştirilir?',
    a: 'Standart modelde ayda 5 görüşme yapılır. Ritim, gündeminizin yoğunluğuna göre birlikte planlanır.',
  },
  {
    q: 'Her görüşme ne kadar sürer?',
    a: 'Her görüşme yaklaşık 2 saat sürer. Gündemin gerektirdiği durumlarda süre birlikte esnetilebilir.',
  },
  {
    q: 'Görüşmelerde hangi konular ele alınır?',
    a: 'Marka stratejisi, konumlandırma, fiyatlandırma, pazarlama, reklam, satış süreçleri, dijital büyüme, kurumsallaşma, yeni pazarlar ve kurucu kişisel markası başta olmak üzere markanızı ilgilendiren tüm başlıklar.',
  },
  {
    q: 'Görüşmeler çevrim içi mi, yüz yüze mi yapılır?',
    a: 'Ağırlıklı olarak Meet veya Zoom üzerinden çevrim içi yapılır. Uygun durumlarda yüz yüze de bir araya gelinebilir.',
  },
  {
    q: 'Görüşmeler dışında iletişim kurulabilir mi?',
    a: '1:1 Marka Danışmanlığı modelinde görüşmeler dışında WhatsApp üzerinden iletişim sürer; gerektiğinde telefon görüşmeleri de yapılır. Diğer modellerde iletişim görüşme günleriyle sınırlıdır.',
  },
  {
    q: 'Danışmanlık süreci nasıl planlanır?',
    a: 'İlk görüşmede siz ve markanız dinlenir, ardından marka Toganworks Brand Intelligence ile değerlendirilir. Hedefler ve öncelikler netleştirilir; aylık ritim buna göre kurulur.',
  },
  {
    q: 'Her marka için aynı yöntem mi uygulanır?',
    a: 'Çerçeve aynıdır, içerik tamamen markaya özeldir. Analiz yöntemi standarttır; çıkan öncelikler ve aksiyonlar her markanın kendi durumuna göre şekillenir.',
  },
  {
    q: 'Danışmanlık süreci ne zaman başlar?',
    a: 'Ön değerlendirme görüşmesinin ardından, birlikte çalışmaya karar verilirse takvim uygunluğuna göre genellikle aynı hafta içinde başlanır.',
  },
  {
    q: 'Danışmanlık öncesinde hazırlık yapılması gerekir mi?',
    a: 'Kısa bir ön hazırlık formu paylaşılır. Markanızı ve önceliklerinizi önceden bilmek, ilk görüşmenin verimini ciddi şekilde artırır.',
  },
  {
    q: 'Danışmanlık sonunda nasıl bir çıktı elde edilir?',
    a: 'Her görüşmenin sonunda yazılı ve uygulanabilir bir aksiyon listesi çıkar. Süreç ilerledikçe bu çıktılar markanız için bir yol haritasına dönüşür.',
  },
  {
    q: 'İlk görüşme nasıl ilerler?',
    a: 'İlk görüşmede siz ve markanız dinlenir, mevcut duruma dair ilk değerlendirme paylaşılır ve öncelikleriniz için ilk yönlendirme yapılır. Ardından birlikte çalışmanın doğru olup olmadığına iki taraf birlikte karar verir.',
  },
  {
    q: 'Danışmanlık sürecinde gizlilik nasıl sağlanır?',
    a: 'Görüşmelerde paylaşılan tüm bilgiler, rakamlar ve stratejiler kesinlikle gizli tutulur. Talep edilmesi hâlinde çalışma öncesinde gizlilik sözleşmesi (NDA) imzalanabilir.',
  },
  {
    q: 'Neden aynı anda sınırlı sayıda danışan kabul edilir?',
    a: 'Her danışan için ciddi zaman ayrıldığı ve görüşmeler dışında da iletişim sürdürüldüğü için aynı anda sınırlı sayıda şirketle çalışılır. Amaç, doğru kişilerle uzun soluklu çalışabilmektir.',
  },
  {
    q: 'Danışmanlık ücretine neler dahildir?',
    a: 'Seçtiğiniz modele göre görüşmeler, görüşme öncesi hazırlık, aksiyon planları ve modele bağlı olarak görüşme dışı WhatsApp/telefon desteği ücrete dahildir; tutarlara KDV eklenir.',
  },
  {
    q: 'Program bana uygun gelmezse ne olur?',
    a: 'İlk görüşmenin ardından birlikte çalışmanın uygun olmadığına karar verilirse süreç başlamadan sonlandırılır ve ödeme eksiksiz iade edilir.',
  },
  {
    q: 'İade politikası nasıl uygulanır?',
    a: 'Danışmanlık başlamadan önce vazgeçilirse ödeme eksiksiz iade edilir. Süreç başladıktan sonra gerçekleştirilen çalışmalar iade kapsamına girmez.',
  },
  {
    q: 'Görüşmeler kayıt altına alınır mı?',
    a: 'Görüşmeler kayıt altına alınmaz; gizlilik esastır. Talep ederseniz görüşme sonunda yazılı özet ve aksiyon notları paylaşılır.',
  },
  {
    q: 'Birebir danışmanlık ile mentorluk arasındaki fark nedir?',
    a: 'Mentorluk ağırlıklı olarak deneyim aktarımıdır. Birebir danışmanlık ise analiz, strateji ve takip içeren yapılandırılmış bir çalışmadır; her görüşme somut aksiyonlarla sonuçlanır.',
  },
];

function TbiLogo({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-3 ${className ?? ''}`}
      role="img"
      aria-label="Togan Brand Intelligence"
    >
      {/* Kırmızı kurdele */}
      <svg width="14" height="26" viewBox="0 0 14 26" aria-hidden>
        <path d="M0 0 H14 V26 L7 19 L0 26 Z" fill="#DC2626" />
      </svg>
      <span className="font-display text-[26px] leading-none tracking-tight" style={{ fontWeight: 800 }}>
        TBI
      </span>
      <span className="h-8 w-[2px]" style={{ background: '#DC2626' }} aria-hidden />
      <span className="text-left text-[9px] font-semibold uppercase leading-[1.4] tracking-[0.18em]">
        Togan
        <br />
        Brand
        <br />
        Intelligence™
      </span>
    </span>
  );
}

/**
 * Marka Masası hero'sunun altındaki bölümler. Hem /1-1 sayfasında hem ana
 * sayfada kullanılır; tam genişlikli bölümler ortalanmış kapsayıcıya göre yayılır.
 */
export function MarkaMasasiIcerik() {
  return (
    <>
      {/* Marka sahibi ya da girişimciyseniz — öz değerlendirme testi */}
      {/* Beyaz zemin, kart çerçevesi korunur; test kartları koyu kalır. */}
      <section
        className="py-16 md:py-20"
        style={{ ...KART_STILI, background: '#FFFFFF', border: '1px solid #E6E6E6' }}
      >
        <div className="mx-auto w-full max-w-[900px] px-6">
          <h2 className="font-display text-center text-[24px] tracking-tight text-[#0A0A0A] md:text-[28px]" style={{ fontWeight: 700 }}>
            Markanızın birebir görüşmeye ihtiyacı var mı?
          </h2>
          <p className="mx-auto mt-4 text-center text-[15px] leading-[1.65] text-[#0A0A0A]/70 md:whitespace-nowrap" style={{ fontWeight: 300 }}>
            Size uygun testi seçin ve 10 temel soruyu yanıtlayın!
          </p>
          <BrandTest whatsappUrl={WHATSAPP_URL} />
        </div>
      </section>

      <TestIcerigi />

      {/* Çalışma modelleri */}
      <section
        className="py-20 md:py-28"
        style={{ ...KART_STILI, background: '#0A0A0A' }}
      >
        <Packages />
      </section>

      {/* Süreç */}
      <section
        id="surec"
        className="mx-auto max-w-[900px] scroll-mt-24 py-16 md:py-20"
        style={{ borderColor: 'var(--border)' }}
      >
        <h2 className="font-display text-center text-[24px] tracking-tight md:text-[28px]" style={{ fontWeight: 700 }}>
          Bu süreç nasıl ilerliyor?
        </h2>
        <div className="mt-6 flex justify-center" style={{ color: 'var(--fg)' }}>
          <TbiLogo />
        </div>
        <ProcessFlow steps={PROCESS_LINES} />
        <p className="mx-auto mt-10 text-center text-[18px] leading-[1.6] md:whitespace-nowrap" style={{ fontWeight: 300 }}>
          Bu görüşmede markanızı anlıyor ve potansiyelini açığa çıkarmanız için size yardımcı oluyorum.
        </p>
      </section>

      {/* Başlıklar */}
      <section
        className="py-16 md:py-20"
        style={{ ...KART_STILI, background: '#0A0A0A' }}
      >
        <h2 className="font-display text-center text-[24px] tracking-tight text-white md:text-[28px]" style={{ fontWeight: 700 }}>
          Hangi başlıklarda konuşuyoruz?
        </h2>
        <TopicsCloud />
      </section>

      {/* SSS */}
      <section className="mx-auto max-w-[1000px] py-16 md:py-20">
        <h2 className="font-display text-center text-[24px] tracking-tight md:text-[28px]" style={{ fontWeight: 700 }}>
          En çok hangi soruları alıyorum?
        </h2>
        <div className="mt-8 grid items-start gap-3 md:grid-cols-2">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group self-start rounded-[10px] border px-4 py-3"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[13.5px] font-medium leading-[1.4] [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  className="shrink-0 text-[16px] leading-none transition-transform duration-200 group-open:rotate-45"
                  style={{ color: 'color-mix(in oklab, var(--fg) 45%, transparent)' }}
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="mt-2.5 text-[13px] leading-[1.6]" style={MUTED}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Marka yolculuğu */}
      <section
        id="randevu"
        className="scroll-mt-24 py-16 md:py-20"
        style={
          {
            ...KART_STILI,
            // Siyah zemin; içerideki var(--fg)/var(--border) kullanan metinler açık renge döner.
            background: '#0A0A0A',
            '--bg': '#0A0A0A',
            '--fg': '#F2F2F2',
            '--border': 'rgba(255, 255, 255, 0.14)',
            color: 'var(--fg)',
          } as React.CSSProperties
        }
      >
        <h2
          className="font-display text-center text-[24px] tracking-tight md:text-[28px]"
          style={{ fontWeight: 700 }}
        >
          Markanız için doğru kararları birlikte alalım!
        </h2>
        <p
          className="mx-auto mt-4 max-w-[52ch] px-6 text-center text-[15px] leading-[1.65]"
          style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)', fontWeight: 300 }}
        >
          Tanışmadan sürdürülebilir büyümeye, süreç on adımda ilerliyor.
        </p>
        <BrandJourney />
      </section>
    </>
  );
}
