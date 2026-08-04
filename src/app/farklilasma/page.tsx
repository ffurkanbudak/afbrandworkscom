import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PillarJsonLd } from '@/components/PillarJsonLd';
import { PillarRelatedPosts } from '@/components/PillarRelatedPosts';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

const TITLE = 'Marka Farklılaşması — Rehber';
const DESCRIPTION =
  'Marka farklılaşması nedir, nasıl kurulur, hangi eksenler işler? Farklılaşma ekseni, kategori içinde ayrışma, kanıt stratejisi ve yaygın hatalar. Ahmet Furkan Budak rehberi.';

// İlgili yazılar bloğu veritabanından beslenir; yeni yazı eklendiğinde
// sayfanın yeniden derlenmesini beklemeden tazelensin.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Marka Farklılaşması',
  description: DESCRIPTION,
  keywords: [
    'marka farklılaşması',
    'farklılaşma nedir',
    'farklılaşma ekseni',
    'differentiation',
    'marka ayrışması',
    'rakipten nasıl farklılaşılır',
    'kategoriden ayrışma',
    'farklılaşma stratejisi',
  ],
  alternates: { canonical: '/farklilasma' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/farklilasma`,
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
    question: 'Marka farklılaşması nedir?',
    answer:
      'Marka farklılaşması; bir markanın kategori içinde hangi eksende ayrıştığını tanımlayan stratejik tercihtir. Sadece "daha iyi" olmak değil, farklı bir boyutta olmaktır. Fiyat, hız, kalite, deneyim, uzmanlık, kimlik veya kullanım anı etrafında kurulabilir. Konumlandırmanın inşası bu eksen üzerinden yapılır.',
  },
  {
    question: 'Farklılaşma ile konumlandırma aynı şey mi?',
    answer:
      'Değildir ama birbirinden ayrılmaz. Farklılaşma; markanın hangi eksende ayrıştığını belirler. Konumlandırma; bu ayrışmanın kategori içinde hangi zihinsel rafta durduğunu tanımlar. Farklılaşma olmadan konumlandırma bulanık kalır; konumlandırma olmadan farklılaşma dağınıklaşır.',
  },
  {
    question: 'Hangi eksenlerde farklılaşılabilir?',
    answer:
      'Yedi klasik eksen vardır: fiyat, kalite, hız, deneyim, uzmanlık, kimlik ve erişilebilirlik. Bunlara günümüzde değerler ekseni (sürdürülebilirlik, etik, kültürel uyum) eklendi. Markanın hangi eksende inanılır ve sürdürülebilir kanıt üretebileceği belirleyicidir.',
  },
  {
    question: 'Farklılaşma sürdürülebilir olmalı mıdır?',
    answer:
      'Evet. Kopyalanabilir farklılaşma kalıcı değildir. Gerçek farklılaşma; markanın iç kapasitesine, kültürüne, operasyonel kararlarına ve uzun vadeli yatırımlarına gömülmüş olmalıdır. Rakibin bir kampanyayla erişemeyeceği kadar derin bir eksen aranır.',
  },
  {
    question: 'Farklılaşma için kanıt nasıl üretilir?',
    answer:
      'Her farklılaşma iddiası kanıt gerektirir. Kanıt; ürün özellikleri, hizmet standartları, müşteri hikâyeleri, ekip uzmanlığı, süreç şeffaflığı, sertifikalar, bağımsız üçüncü taraf incelemeleri olabilir. Sözde kalan farklılaşma iddiası rekabette önce anlamsızlaşır, sonra güveni zedeler.',
  },
  {
    question: 'Farklılaşmadan çok daha önemli olan değerler var mı?',
    answer:
      'Byron Sharp gibi akademisyenler, tüketicinin çoğu kategoride markalar arasında beklenen farklar görmediğini ve zihinsel/fiziksel erişilebilirliğin daha belirleyici olduğunu savunur. Uygulamada ise farklılaşma ve erişilebilirlik birbirini dışlamaz; sürdürülebilir farklılaşma erişilebilirliği verimli kılar. İki yaklaşımı birlikte değerlendirmek stratejik dengeyi sağlar.',
  },
];

export default function FarklilasmaPage() {
  return (
    <>
      <PillarJsonLd
        slug="farklilasma"
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
            Marka Farklılaşması
          </p>
          <h1 className="font-display mt-4 text-[33px] leading-[1.05] tracking-tight md:text-[45px]">
            Farklılaşma, markanın kategoride hangi eksende ayrıştığını seçme cesaretidir.
          </h1>
          <p
            className="mt-6 max-w-[58ch] text-[17px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
          >
            Rekabetin yoğunlaştığı her kategoride markalar aynı oyun alanında
            birbirine benzer. Farklılaşma; bu benzerlikten çıkmanın, hedef
            kitlenin zihninde ayrıca bir raf açmanın stratejik kararıdır. Bu
            rehberde farklılaşmanın tanımı, eksenleri, kanıt stratejisi ve
            yaygın hataları yer alıyor.
          </p>
        </header>

        <nav
          aria-label="Bu sayfada"
          className="mt-12 border-t pt-6"
          style={{ borderColor: 'var(--border)' }}
        >
          <p
            className="text-[11px] font-semibold tracking-[0.14em] uppercase"
            style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
          >
            Bu sayfada
          </p>
          <ul
            className="mt-4 grid grid-cols-1 gap-2 text-[13px] sm:grid-cols-2"
            style={{ color: 'color-mix(in oklab, var(--fg) 72%, transparent)' }}
          >
            <li><a href="#tanim" className="hover:underline">1. Farklılaşma nedir?</a></li>
            <li><a href="#eksenler" className="hover:underline">2. Farklılaşma eksenleri</a></li>
            <li><a href="#kanit" className="hover:underline">3. Kanıt stratejisi</a></li>
            <li><a href="#surdurulebilirlik" className="hover:underline">4. Sürdürülebilirlik</a></li>
            <li><a href="#hatalar" className="hover:underline">5. Yaygın hatalar</a></li>
            <li><a href="#sss" className="hover:underline">6. Sık sorulan sorular</a></li>
          </ul>
        </nav>

        <div className="mt-14 space-y-12 text-[16.5px] leading-[1.75]">
          <section id="tanim">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              1. Farklılaşma nedir?
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Farklılaşma; bir markanın kategori içinde hangi eksende
                ayrıştığını ve bu ayrışmanın hedef kitleye neden değerli
                olduğunu tanımlayan stratejik seçimdir. Ayrışma soyut bir iddia
                değildir; somut bir özellik, bir süreç, bir kapasite ya da
                bir kültürel kararın karşılığıdır.
              </p>
              <p>
                Farklılaşma "daha iyi" olmakla karıştırılır. Oysa iki marka aynı
                eksende birbirinden daha iyi olma yarışına girerse, rekabet
                maliyete ya da sesin yüksekliğine döner. Gerçek farklılaşma;
                rekabetin oynandığı eksenin değil, markanın seçtiği eksenin
                öne çıkarılmasıdır.
              </p>
              <p>
                Zihnin kategoriye dair algısı sabit değildir. Tüketicinin
                hatırladığı üç-dört marka dışındakiler zihinde yer bulamaz.
                Farklılaşma; zihnin bu sınırlı kapasitesine sahip olmanın
                stratejik yoludur.
              </p>
            </div>
          </section>

          <section id="eksenler">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              2. Farklılaşma eksenleri
            </h2>
            <div
              className="mt-4 space-y-6"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  a. Fiyat
                </h3>
                <p className="mt-2">
                  En agresif eksen. Ya kategorinin üstünde (premium) ya da
                  altında (ekonomik) konumlanır. Orta fiyat farklılaşma
                  kurmaz; kaybolur. Fiyat farklılaşmasının kanıtı maliyet
                  yapısıdır; sürdürülebilirliği operasyonel verimliliğe
                  bağlıdır.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  b. Kalite
                </h3>
                <p className="mt-2">
                  Ürünün veya hizmetin rakiplerinden somut şekilde üstün olma
                  eksenidir. Kanıt gerektirir; bağımsız testler, üretim
                  ölçütleri, uzmanlık gerekli. İddia tek başına yetmez;
                  algılanabilir kalite tüketicinin gündelik deneyimiyle
                  doğrulanmalıdır.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  c. Hız ve kolaylık
                </h3>
                <p className="mt-2">
                  "Daha hızlı teslim", "tek tıkla sipariş", "3 dakikada
                  kurulum" gibi eksenler. Operasyonel süreçleri yeniden
                  tasarlamak gerekir. Lojistik, platform mimarisi ve ürün
                  deneyimi birlikte yeniden kurulur.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  d. Deneyim
                </h3>
                <p className="mt-2">
                  Ürün veya hizmet işlevinin ötesinde, bütünsel etkileşim
                  tasarımı. Mağaza atmosferi, ambalaj hikâyesi, müşteri
                  hizmetleri kültürü bu eksene hizmet eder. Taklit edilmesi
                  zordur çünkü tek bir değişkene bağlı değildir.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  e. Uzmanlık ve odak
                </h3>
                <p className="mt-2">
                  Genel çözüm değil derinlikli uzmanlık sunmak. "Sadece
                  bisiklet yapıyoruz", "yalnız akademisyenler için". Dar
                  odak zihin rafını keskinleştirir; genel geniş oyuncularla
                  kıyaslanmaktan çıkar.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  f. Kimlik ve kültür
                </h3>
                <p className="mt-2">
                  Ürün değil markanın neyi temsil ettiği eksen olur. Topluluk
                  oluşturan markalar buraya oynar. Kimlik tüketicinin kendi
                  kimlik anlatımının bir parçası haline gelir; fiyat duyarlılığı
                  düşer.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  g. Değerler ve amaç
                </h3>
                <p className="mt-2">
                  Sürdürülebilirlik, etik üretim, yerel destek, şeffaflık gibi
                  eksenler. Bu eksen kültürel rüzgâra duyarlıdır; samimi
                  değilse cezalandırılır. Kanıtın operasyonel olması
                  zorunludur; pazarlama sloganı olarak kalırsa tersine döner.
                </p>
              </div>
            </div>
          </section>

          <section id="kanit">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              3. Kanıt stratejisi
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Her farklılaşma iddiası kanıt gerektirir. Kanıtsız iddia;
                dikkat çekse bile güven birikimi kuramaz. Kanıt türleri
                farklılaşma eksenine göre değişir:
              </p>
              <ul className="space-y-3">
                <li>
                  <strong>Ürün kanıtı:</strong> Teknik özellikler, performans
                  testleri, karşılaştırmalı değerler.
                </li>
                <li>
                  <strong>Süreç kanıtı:</strong> Üretim şeffaflığı, tedarik
                  zinciri izlenebilirliği, servis standartları.
                </li>
                <li>
                  <strong>Uzmanlık kanıtı:</strong> Ekibin eğitimi, geçmiş
                  projeler, sektörel ödüller.
                </li>
                <li>
                  <strong>Müşteri kanıtı:</strong> Vaka çalışmaları, tavsiye
                  oranları, tekrar alım verileri.
                </li>
                <li>
                  <strong>Üçüncü taraf kanıtı:</strong> Bağımsız incelemeler,
                  sertifikalar, akreditasyonlar.
                </li>
                <li>
                  <strong>Kültürel kanıt:</strong> Çalışan hikâyeleri, şirket
                  kararları, topluluk katkıları.
                </li>
              </ul>
              <p>
                İyi bir farklılaşma stratejisi farklı kanıt türlerini birlikte
                kullanır. Tek kanıta dayanan iddia kırılgandır; çok kanıtlı
                iddia birikimli güven üretir.
              </p>
            </div>
          </section>

          <section id="surdurulebilirlik">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              4. Sürdürülebilirlik
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Farklılaşma, kopyalanabilir olduğu anda farklılaşma olmaktan
                çıkar. Rekabetçi avantajın temelinde; markanın iç kapasitesine,
                operasyonel kararlarına veya kültürüne gömülü eksenler yer
                alır. Bu tür farklılaşmaları rakip; bir kampanya, bir promosyon
                ya da bir web güncellemesiyle taklit edemez.
              </p>
              <p>
                Sürdürülebilir farklılaşmanın üç özelliği vardır: hedef kitle
                tarafından değerli bulunur, rakipler tarafından kolay
                kopyalanamaz ve marka tarafından tutarlı biçimde sunulur. Üç
                koşulun birlikte sağlanması kategoride uzun vadeli bir rafın
                garantisidir.
              </p>
            </div>
          </section>

          <section id="hatalar">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              5. Yaygın hatalar
            </h2>
            <ul
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <li>
                <strong>Çok eksende aynı anda farklılaşmaya çalışmak:</strong>
                "Hem en ucuz hem en kaliteli hem en hızlı" iddiası güvenilir
                olmaz; hiçbir eksende iz bırakmaz. Tek bir eksen seçilir;
                diğerleri rekabetçi seviyede tutulur.
              </li>
              <li>
                <strong>Rekabetin ekseninde oynamak:</strong> Rakipler fiyat
                savaşına girmişken aynı eksende yarışmak, marka değerini
                aşındırır. Farklı bir eksen açmak, oyunu değiştirmek anlamına
                gelir.
              </li>
              <li>
                <strong>Kanıtsız iddia:</strong> "En iyi hizmet", "yenilikçi
                yaklaşım", "müşteri odaklı" gibi ifadeler kanıt içermedikçe
                rekabette anlamsızlaşır. Her iddianın ardında ölçülebilir bir
                kanıt olmalıdır.
              </li>
              <li>
                <strong>İç jargonu farklılaşma sanmak:</strong> "Holistik,
                sinerjik, 360 derece" gibi kelimeler hedef kitleyle iletişim
                kurmaz. Farklılaşma müşterinin kendi diliyle ifade edilir.
              </li>
              <li>
                <strong>Farklılaşma olmadan dikkat çekmeye çalışmak:</strong>
                Reklamda öne çıkmak ile zihinde yer almak farklıdır. Eksen
                kurulmadan yapılan iletişim yüksek maliyetli ama düşük etki
                üretir.
              </li>
            </ul>
          </section>

          <section id="sss">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              6. Sık sorulan sorular
            </h2>
            <dl className="mt-6 space-y-8">
              {FAQS.map((f) => (
                <div key={f.question}>
                  <dt className="font-display text-[17px] leading-[1.3] tracking-tight md:text-[19px]">
                    {f.question}
                  </dt>
                  <dd
                    className="mt-2.5 text-[16px] leading-[1.65]"
                    style={{ color: 'color-mix(in oklab, var(--fg) 75%, transparent)' }}
                  >
                    {f.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <section
          className="mt-20 border-t pt-10"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="eyebrow">İlgili okumalar</p>
          <ul
            className="mt-6 grid grid-cols-1 gap-5 text-[15px] sm:grid-cols-2"
            style={{ color: 'var(--fg)' }}
          >
            <li>
              <Link href="/konumlandirma" className="hover:underline">
                Marka Konumlandırma rehberi
              </Link>
            </li>
            <li>
              <Link href="/marka-stratejisi" className="hover:underline">
                Marka Stratejisi rehberi
              </Link>
            </li>
            <li>
              <Link href="/marka-kimligi" className="hover:underline">
                Marka Kimliği rehberi
              </Link>
            </li>
            <li>
              <Link href="/marka-yonetimi" className="hover:underline">
                Marka Yönetimi rehberi
              </Link>
            </li>
            <li>
              <Link href="/sozluk" className="hover:underline">
                Marka Sözlüğü
              </Link>
            </li>
            <li>
              <Link href="/marka-danismanligi" className="hover:underline">
                Marka Danışmanlığı rehberi
              </Link>
            </li>
          </ul>
        </section>

        <section
          className="mt-14 rounded-[12px] border p-8 md:p-10"
          style={{
            borderColor: 'var(--border)',
            background: 'color-mix(in oklab, var(--fg) 2.5%, transparent)',
          }}
        >
          <p className="eyebrow">Danışmanlık</p>
          <h2 className="font-display mt-3 text-[22px] leading-[1.15] tracking-tight md:text-[26px]">
            Markanızın farklılaşma ekseni ne?
          </h2>
          <p
            className="mt-4 max-w-[58ch] text-[15.5px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 68%, transparent)' }}
          >
            Rakiplerle aynı eksende oynuyor olabilirsiniz. Farklılaşma
            çalışması; markanın gerçek kapasitesi, pazar boşluğu ve hedef
            kitle değerinin kesişiminde kurulur. Ahmet Furkan Budak ile bu
            çerçeveyi birlikte tanımlayabilirsiniz.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/iletisim"
              className="btn-red inline-flex items-center gap-2 rounded-[6px] px-4 py-2.5 text-[13px] font-medium"
            >
              İletişime geçin
              <ArrowRight className="h-[13px] w-[13px]" strokeWidth={2.25} />
            </Link>
                        <Link
              href="/1-1"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-[6px] border px-4 py-2.5 text-[13px] font-medium"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
            >
              Marka Masası
            </Link>
            <Link
              href="/#bulten"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-[6px] border px-4 py-2.5 text-[13px] font-medium"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
            >
              Bültene Kaydolun!
            </Link>
          </div>
        </section>
        <PillarRelatedPosts href="/farklilasma" baslik="Marka farklılaşması" />
      </div>
    </>
  );
}
