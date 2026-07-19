import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PillarJsonLd } from '@/components/PillarJsonLd';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

const TITLE = 'Marka Danışmanlığı — Ahmet Furkan Budak';
const DESCRIPTION =
  'Stratejik marka danışmanlığı: konumlandırma, marka kimliği, pazarlama iletişimi ve sürdürülebilir büyüme. Ahmet Furkan Budak Toganworks yönetiminde kurumlara ve girişimcilere marka danışmanlığı sunar.';

export const metadata: Metadata = {
  title: 'Marka Danışmanlığı',
  description: DESCRIPTION,
  keywords: [
    'marka danışmanlığı',
    'marka danışmanı',
    'stratejik marka danışmanı',
    'marka stratejisi danışmanlığı',
    'marka yönetimi danışmanlığı',
    'Türkiye marka danışmanı',
    'Ahmet Furkan Budak',
    'Toganworks',
  ],
  alternates: { canonical: '/marka-danismanligi' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/marka-danismanligi`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'Afbrandworks',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const FAQS = [
  {
    question: 'Marka danışmanlığı nedir?',
    answer:
      'Marka danışmanlığı; bir kurumun ya da girişimcinin piyasadaki konumunu, farklılaşma eksenini, kimlik yapısını ve iletişim stratejisini dışarıdan bir uzmanla birlikte yeniden ele aldığı stratejik bir disiplindir. Amaç, markanın uzun vadeli büyüme kararlarını kısa vadeli pazarlama hamlelerinden ayırmak ve sürdürülebilir bir kimlik zemini kurmaktır.',
  },
  {
    question: 'Hangi durumlarda marka danışmanı çağırılır?',
    answer:
      'Yeni bir marka kurulurken, mevcut marka yeniden konumlandırılırken, kategori değişirken, rakip hareketlerine yanıt gerektiğinde, halka arz veya yatırım turu öncesinde ya da iç ekiplerin stratejik bir mesafeye ihtiyaç duyduğu dönemlerde başvurulur.',
  },
  {
    question: 'Marka danışmanlığı süreci nasıl işler?',
    answer:
      'Süreç üç kısımdan oluşur. Birincisi teşhis: mevcut konumun, rekabet ortamının ve hedef kitlenin analizi. İkincisi çerçeve kurulumu: konumlandırma, kimlik ve iletişim eksenlerinin netleştirilmesi. Üçüncüsü uygulama desteği: ekip eğitimi, kanal bazlı uygulama ve sağlık taraması. Her süreç markanın büyüklüğüne göre dört ile on iki hafta arasında tamamlanır.',
  },
  {
    question: 'Marka danışmanlığı ile marka ajansı arasındaki fark nedir?',
    answer:
      'Marka ajansı genellikle uygulama odaklıdır; logo tasarımı, görsel kimlik, kampanya prodüksiyonu üretir. Marka danışmanlığı ise strateji odaklıdır; konumlandırma, farklılaşma ekseni ve iletişim çerçevesini kurar. Ajans çıktıyı üretir, danışmanlık kararın çerçevesini çizer. İki disiplin birbirinin yerini alamaz, birbirini tamamlar.',
  },
  {
    question: 'Ahmet Furkan Budak ile marka danışmanlığı için nasıl iletişime geçilir?',
    answer:
      'Afbrandworks iletişim sayfasından ya da info@toganworks.com adresinden iletişim kurulabilir. Görüşme öncesi kısa bir brief doldurulur; marka büyüklüğü, sektör ve süreç aciliyeti anlaşıldıktan sonra uygun format önerilir.',
  },
];

export default function MarkaDanismanligiPage() {
  return (
    <>
      <PillarJsonLd
        slug="marka-danismanligi"
        title={TITLE}
        description={DESCRIPTION}
        faqs={FAQS}
      />

      <div className="fade-up mx-auto max-w-[780px] pt-10 md:pt-16">
        <header>
          <p
            className="text-[11px] font-semibold tracking-[0.14em] uppercase"
            style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
          >
            Marka Danışmanlığı
          </p>
          <h1 className="font-display mt-4 text-[40px] leading-[1.05] tracking-tight md:text-[54px]">
            Markanızın stratejik zemini, dışarıdan uzman bir gözün disiplinine hazır olur.
          </h1>
          <p
            className="mt-6 max-w-[58ch] text-[17px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
          >
            Marka danışmanlığı, kurumların ve girişimcilerin piyasa konumlarını,
            farklılaşma eksenlerini ve uzun vadeli büyüme yönlerini
            berraklaştırmak için başvurduğu stratejik bir disiplindir. Ahmet
            Furkan Budak, Toganworks yönetiminde; konumlandırma, kimlik,
            iletişim ve sürdürülebilir büyüme ekseninde markalara danışmanlık
            sunar.
          </p>
        </header>

        <nav aria-label="Bölümler" className="mt-12">
          <ul
            className="grid grid-cols-1 gap-2 text-[13px] sm:grid-cols-2"
            style={{ color: 'color-mix(in oklab, var(--fg) 72%, transparent)' }}
          >
            <li>
              <a href="#tanim" className="hover:underline">1. Marka danışmanlığı nedir?</a>
            </li>
            <li>
              <a href="#ne-zaman" className="hover:underline">2. Hangi durumlarda çağırılır?</a>
            </li>
            <li>
              <a href="#surec" className="hover:underline">3. Danışmanlık süreci</a>
            </li>
            <li>
              <a href="#kapsam" className="hover:underline">4. Hizmet kapsamı</a>
            </li>
            <li>
              <a href="#yaklasim" className="hover:underline">5. Yaklaşım</a>
            </li>
            <li>
              <a href="#sss" className="hover:underline">6. Sık sorulan sorular</a>
            </li>
          </ul>
        </nav>

        <div className="mt-14 space-y-12 text-[16.5px] leading-[1.75]">
          <section id="tanim">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              1. Marka danışmanlığı nedir?
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Marka danışmanlığı; bir markanın hedef kitlesinin zihninde
                tuttuğu rafı, rakiplerden farklılaştığı ekseni ve uzun vadeli
                büyüme yönünü dışarıdan bir uzmanla birlikte yeniden ele
                aldığı çalışma alanıdır. İçeride çalışmanın avantajı yakınlık,
                dışarıdan çalışmanın avantajı mesafedir. Marka danışmanı, bir
                iç ekibin kör noktasında kalmış kararları görünür kılar ve
                stratejik bir düzlemde yeniden çerçeveler.
              </p>
              <p>
                Marka danışmanlığı pazarlama danışmanlığından ayrılır.
                Pazarlama danışmanlığı kampanya, kanal ve dönüşüm odaklıdır;
                marka danışmanlığı konumlandırma, kimlik ve uzun vadeli anlam
                çerçevesi üzerine düşünür. Pazarlama bir çeyrekte etkisini
                gösterir, marka danışmanlığının sonucu beş yılda ölçülür.
              </p>
              <p>
                Bu ayrım, danışmanın çalışma biçimini belirler. Bir marka
                danışmanı, birebir kampanya üretmez; kampanyaların üzerine
                oturacağı çerçeveyi kurar. Günlük pazarlama kararlarına
                karışmaz; o kararların içinde verildiği stratejik zemini
                netleştirir.
              </p>
            </div>
          </section>

          <section id="ne-zaman">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              2. Hangi durumlarda çağırılır?
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>Marka danışmanlığına başvurulan tipik durumlar şunlardır:</p>
              <ul className="space-y-2 pl-5" style={{ listStyle: 'disc' }}>
                <li>
                  <strong>Yeni marka kuruluşu:</strong> İsim, konumlandırma,
                  kimlik ve iletişim çerçevesinin ilk günden tutarlı biçimde
                  kurulması gerektiğinde.
                </li>
                <li>
                  <strong>Yeniden konumlandırma:</strong> Mevcut markanın
                  kategorideki rafının değiştiğini, eski konumlandırmanın
                  artık çalışmadığını hissettiğinizde.
                </li>
                <li>
                  <strong>Kategori değişimi:</strong> Yeni bir kategoriye
                  girişte ya da mevcut kategoride sınırların bulanıklaştığı
                  anlarda.
                </li>
                <li>
                  <strong>Rakip hareketine yanıt:</strong> Güçlü bir rakibin
                  kategoride yer kapmasından sonra konumunuzu
                  tazelemeniz gerektiğinde.
                </li>
                <li>
                  <strong>Yatırım turu ya da halka arz öncesi:</strong>{' '}
                  Yatırımcı hikayesi ile operasyonel gerçekliğin örtüşmesi
                  gerektiğinde.
                </li>
                <li>
                  <strong>İç ekip için dış mesafe:</strong> Uzun süre aynı
                  markaya bakan ekibin yeni bir bakış açısına ihtiyacı
                  olduğunda.
                </li>
              </ul>
            </div>
          </section>

          <section id="surec">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              3. Danışmanlık süreci
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Süreç üç aşamadan oluşur. Her aşamanın çıktısı sonraki
                aşamanın girdisidir; atlama yapılmaz.
              </p>
              <ol className="space-y-4 pl-5" style={{ listStyle: 'decimal' }}>
                <li>
                  <strong>Teşhis.</strong> Mevcut konumlandırma, kategori
                  rekabeti, hedef kitle içgörüleri ve iç ekibin markaya dair
                  zihin haritası incelenir. Çıktı: bulgular raporu.
                </li>
                <li>
                  <strong>Çerçeve kurulumu.</strong> Konumlandırma ekseni,
                  farklılaşma kanıtları, değer önerisi ve iletişim
                  prensipleri netleştirilir. Çıktı: strateji dokümanı.
                </li>
                <li>
                  <strong>Uygulama desteği.</strong> Ekip eğitimi, kanal
                  bazlı uygulama kılavuzu ve ilk aylarda sağlık taraması
                  yapılır. Çıktı: uygulanabilir günlük kılavuzlar.
                </li>
              </ol>
              <p>
                Sürecin toplam uzunluğu markanın büyüklüğüne ve karmaşıklığına
                göre değişir. Genç bir girişim için dört-altı hafta, orta
                ölçekli bir kurum için sekiz-on iki hafta tipiktir.
              </p>
            </div>
          </section>

          <section id="kapsam">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              4. Hizmet kapsamı
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Marka danışmanlığı çalışmaları aşağıdaki başlıklardan biri ya
                da birkaçının birleşimi olarak yürütülür:
              </p>
              <ul className="space-y-2 pl-5" style={{ listStyle: 'disc' }}>
                <li>
                  Marka konumlandırma: Kategorideki raf, farklılaşma ekseni,
                  değer önerisi ve hedef kitle çerçevesi.
                </li>
                <li>
                  Marka kimliği ve isimlendirme: İsim, ses tonu, görsel
                  kimlik prensipleri, mesaj çerçeveleri.
                </li>
                <li>
                  Pazarlama iletişimi stratejisi: Kanal haritası, içerik
                  çerçevesi, kampanya ekseni.
                </li>
                <li>
                  Marka sağlık analizi: Mevcut markanın durum tespiti ve
                  iyileştirme haritası.
                </li>
                <li>
                  Kadın girişimci markalaşma programı: Kadın kurucular için
                  markalaşma odaklı mentörlük.
                </li>
                <li>
                  Birebir mentörlük: Kurucuların günlük karar anlarında dış
                  referans olarak kullanabileceği sürekli danışmanlık.
                </li>
              </ul>
            </div>
          </section>

          <section id="yaklasim">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              5. Yaklaşım
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Çalışma çerçevesinde üç temel ilke gözetilir.
              </p>
              <p>
                <strong>Birincisi, yazılı düşünmek.</strong> Sözlü kararlar
                çabuk kaybolur. Her stratejik çıktı yazılıdır; teslim
                aldığınız dokümanlar ileride yeni ekip üyelerine de aynı
                çerçeveyi aktarır.
              </p>
              <p>
                <strong>İkincisi, somut olmak.</strong> Soyut kavramlar karar
                üretmez. Markayı tarif ederken spesifik örnekler, spesifik
                rakipler ve spesifik tüketici cümleleri kullanılır.
              </p>
              <p>
                <strong>Üçüncüsü, uzun vade.</strong> Danışmanlığın çıktısı
                bir çeyrekte değil beş yılda görünür. Kısa vadeli hamleler
                önerilmez; zaten başka kanallar bunu yapar.
              </p>
              <p>
                Çalışma yöntemi{' '}
                <Link href="/kunye" className="underline">
                  Afbrandworks editoryal çerçevesi
                </Link>{' '}
                ile tutarlıdır: spekülasyon yerine veri, retorik yerine
                somutluk, acele yerine disiplin.
              </p>
            </div>
          </section>

          <section id="sss">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              6. Sık sorulan sorular
            </h2>
            <div className="mt-4 space-y-6">
              {FAQS.map((f) => (
                <div key={f.question}>
                  <h3 className="font-display text-[17px] leading-[1.3] tracking-tight md:text-[19px]">
                    {f.question}
                  </h3>
                  <p
                    className="mt-2 text-[15.5px] leading-[1.65]"
                    style={{ color: 'color-mix(in oklab, var(--fg) 80%, transparent)' }}
                  >
                    {f.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section
          className="mt-20 rounded-[14px] border p-7 md:p-10"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-soft)' }}
        >
          <p className="eyebrow">İletişim</p>
          <h2 className="font-display mt-3 text-[26px] leading-[1.15] tracking-tight md:text-[30px]">
            Markanız için stratejik bir konuşma planlayın.
          </h2>
          <p
            className="mt-4 max-w-[54ch] text-[15.5px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 75%, transparent)' }}
          >
            Kısa bir brief doldurduktan sonra durum ve süreç için uygun format
            önerilir. Genç girişimler, ölçeklenmiş kurumlar ve kadın
            girişimciler için ayrı çalışma çerçeveleri vardır.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/iletisim"
              className="btn-red inline-flex items-center gap-2 rounded-[8px] px-5 py-3 text-[14px] font-semibold"
            >
              İletişime geçin
              <ArrowRight className="h-[13px] w-[13px]" strokeWidth={2.25} />
            </Link>
            <Link
              href="/uyelik"
              className="inline-flex items-center gap-2 rounded-[8px] border px-5 py-3 text-[13.5px] font-medium"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
            >
              Üyelik paketlerini inceleyin
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
