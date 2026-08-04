import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PillarJsonLd } from '@/components/PillarJsonLd';
import { PillarRelatedPosts } from '@/components/PillarRelatedPosts';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

const TITLE = 'Marka Mimarisi — Rehber';
const DESCRIPTION =
  'Marka mimarisi nedir, hangi modeller vardır? Branded House, House of Brands, hibrit yapılar; alt marka stratejisi, endorsed brand, ürün genişlemesi ve yaygın hatalar. Ahmet Furkan Budak rehberi.';

// İlgili yazılar bloğu veritabanından beslenir; yeni yazı eklendiğinde
// sayfanın yeniden derlenmesini beklemeden tazelensin.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Marka Mimarisi',
  description: DESCRIPTION,
  keywords: [
    'marka mimarisi',
    'marka mimarisi nedir',
    'brand architecture',
    'branded house',
    'house of brands',
    'alt marka stratejisi',
    'marka portföyü',
    'ürün markalaşması',
    'endorsed brand',
  ],
  alternates: { canonical: '/marka-mimarisi' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/marka-mimarisi`,
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
    question: 'Marka mimarisi nedir?',
    answer:
      'Marka mimarisi; bir kurumun ana markası, alt markaları, ürün hatları ve uzantıları arasındaki ilişkinin yapısal tanımıdır. Hangi ismin hangi çatıda duracağını, yeni ürünlerin ana marka altında mı ayrı isimle mi büyüyeceğini ve hedef kitleye hangi hiyerarşinin sunulacağını belirler.',
  },
  {
    question: 'Branded House ile House of Brands arasındaki fark nedir?',
    answer:
      'Branded House (tekli marka çatısı); tüm ürün ve hizmetlerin ana marka ismi altında sunulduğu modeldir (Google, Apple, FedEx). House of Brands (çoklu marka portföyü); her ürün veya kategorinin kendi bağımsız markasına sahip olduğu modeldir (P&G, Unilever). İki model farklı stratejik trade-off gerektirir: tutarlılık ve verimlilik vs. esneklik ve risk dağıtımı.',
  },
  {
    question: 'Hangi modelde endorsed brand yaklaşımı kullanılır?',
    answer:
      'Endorsed brand; alt markanın kendi kimliği olan ama ana marka tarafından onaylandığı/desteklendiği yapıdır. Marriott Courtyard, Nestea, Playstation (Sony) örnekleri bu modele girer. Tek başına hareket edebilen ama güvenilirliğini ana markadan alan ürünler için idealdir.',
  },
  {
    question: 'Yeni ürün ana marka altında mı ayrı isimle mi çıkmalı?',
    answer:
      'Karar üç sorudan geçer. Birincisi: ürün ana markanın konumlandırma vaadiyle uyumlu mu? İkincisi: yeni ürünün kendi hedef kitlesi ana markanınkinden farklı mı? Üçüncüsü: başarısızlık riski ana markayı etkilerse hangi seviyede kabul edilebilir? Uyum yüksek ve risk düşükse ana marka altında; aksi durumda bağımsız isimle büyümek daha güvenlidir.',
  },
  {
    question: 'Marka mimarisi ne zaman yenilenmeli?',
    answer:
      'Şirket birleşme veya satın alma sonrasında, portföy büyüdüğünde ve karar dağınıklaştığında, yeni bir pazara girilirken, marka uzantısı yaygınlaşıp kimlik dağılmaya başladığında yenilenir. Mimari; stratejinin değişimine duyarlı olmalıdır.',
  },
  {
    question: 'Marka mimarisi tasarımında en sık yapılan hata nedir?',
    answer:
      'En yaygın hata; iç örgütsel yapıyı marka mimarisi olarak dışarı yansıtmak. Şirket departmanlarının veya satın alınan firmaların her birinin ayrı marka olarak kalmasında ısrar etmek; tüketici için anlaşılmaz bir portföy üretir. Marka mimarisi müşterinin zihnine göre kurulur, iç organizasyon şemasına göre değil.',
  },
];

export default function MarkaMimarisiPage() {
  return (
    <>
      <PillarJsonLd
        slug="marka-mimarisi"
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
            Marka Mimarisi
          </p>
          <h1 className="font-display mt-4 text-[33px] leading-[1.05] tracking-tight md:text-[45px]">
            Marka mimarisi, portföydeki her ismin birbiriyle konuşma biçimidir.
          </h1>
          <p
            className="mt-6 max-w-[58ch] text-[17px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
          >
            Bir kurumun ana markası, alt markaları, ürün hatları ve uzantıları
            arasındaki ilişki; hedef kitlenin zihninde bir harita gibi çalışır.
            İyi kurulmuş bir mimari bu haritayı netleştirir; kötü kurulmuş olan
            ise karar zorlaştırır ve marka değerini aşındırır. Bu rehberde
            modellerin farkları, seçim kriterleri ve yaygın hatalar yer alıyor.
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
            <li><a href="#tanim" className="hover:underline">1. Marka mimarisi nedir?</a></li>
            <li><a href="#modeller" className="hover:underline">2. Temel modeller</a></li>
            <li><a href="#secim" className="hover:underline">3. Model seçim kriterleri</a></li>
            <li><a href="#uzanti" className="hover:underline">4. Ürün ve hat uzantıları</a></li>
            <li><a href="#hatalar" className="hover:underline">5. Yaygın hatalar</a></li>
            <li><a href="#sss" className="hover:underline">6. Sık sorulan sorular</a></li>
          </ul>
        </nav>

        <div className="mt-14 space-y-12 text-[16.5px] leading-[1.75]">
          <section id="tanim">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              1. Marka mimarisi nedir?
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Marka mimarisi; bir kurumun sahibi olduğu markaların, alt
                markaların ve ürün hatlarının birbirleriyle nasıl ilişkileneceğini
                tanımlayan yapısal çerçevedir. Hangi ismin hangi çatıda
                duracağı, hangilerinin görünür olacağı, hangisinin ana marka
                tarafından onaylanacağı bu çerçevede kararlaştırılır.
              </p>
              <p>
                Mimari; tüketici için bir haritadır. Tüketicinin karşılaştığı
                her isim, bu harita üzerinde bir noktaya oturur; aksi durumda
                karar anında kafa karışıklığı oluşur. Mimari aynı zamanda
                iç ekip için bir karar çerçevesidir: yeni bir ürün hangi
                isim altında çıkacak, yeni bir kategoriye nasıl girilecek,
                satın alınan marka ana kimliğe nasıl entegre edilecek.
              </p>
              <p>
                İyi mimari; marka değerinin transfer edilebilirliğini artırır.
                Ana markanın birikimi yeni ürünlere taşınır; yeni ürünlerin
                başarısı ana markayı güçlendirir. Kötü mimari tersine akar;
                zayıf halka bütün yapıyı aşağı çeker.
              </p>
            </div>
          </section>

          <section id="modeller">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              2. Temel modeller
            </h2>
            <div
              className="mt-4 space-y-6"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  a. Branded House (tekli çatı)
                </h3>
                <p className="mt-2">
                  Tüm ürün ve hizmetler ana marka ismi altında sunulur. Google
                  Arama, Google Haritalar, Google Drive; hepsi aynı çatıdadır.
                  Apple, FedEx, Virgin de benzer modeli kullanır. Avantajı:
                  pazarlama harcamasının verimliliği, güven transferi, açık
                  kimlik. Riski: bir ürünün hatası tüm portföyü etkileyebilir.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  b. House of Brands (çoklu portföy)
                </h3>
                <p className="mt-2">
                  Her ürün veya kategori kendi bağımsız markasına sahiptir;
                  ana şirket arka planda durur. Procter &amp; Gamble (Pampers,
                  Gillette, Tide, Ariel), Unilever (Dove, Axe, Ben &amp; Jerry's,
                  Knorr) klasik örneklerdir. Avantajı: risk dağıtımı, farklı
                  hedef kitlelere net hitap, kategori içinde çoklu konumlandırma.
                  Riski: yüksek pazarlama maliyeti, marka değeri transferinin
                  zayıflığı.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  c. Endorsed Brand (onaylı alt marka)
                </h3>
                <p className="mt-2">
                  Alt markanın kendi kimliği vardır ama ana marka tarafından
                  "onaylanır". Marriott Courtyard, Nestea (Nestlé), Playstation
                  (Sony), Oreo (Nabisco) gibi. Alt marka bağımsız hareket eder;
                  güvenilirliğini ana markadan alır. Mixed yaklaşımların
                  esnekliğini sunar.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  d. Sub-brand (alt marka)
                </h3>
                <p className="mt-2">
                  Ana markanın kendi adını koruyarak yeni bir kategori veya
                  segment için farklı bir kimlik açmasıdır: iPhone (Apple),
                  PlayStation (Sony), Coca-Cola Zero Sugar. Ana markanın değer
                  aktarımı korunur; yeni segmentin özgün ihtiyacına alan
                  açılır.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  e. Hibrit yapılar
                </h3>
                <p className="mt-2">
                  Gerçek hayatta büyük kurumların çoğu saf model kullanmaz;
                  kategori bazında karma yapılar kurar. Nestlé bazı ürünleri
                  kendi adıyla satar, bazılarını tamamen bağımsız markalar
                  olarak yönetir. Hibrit yapı; kategorinin ihtiyacına göre
                  esneklik sağlar ama yönetilmesi daha karmaşıktır.
                </p>
              </div>
            </div>
          </section>

          <section id="secim">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              3. Model seçim kriterleri
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Model seçimi beş kriterin birlikte değerlendirilmesine dayanır:
              </p>
              <ul className="space-y-3">
                <li>
                  <strong>Hedef kitle örtüşmesi:</strong> Ürünler aynı kitleye
                  mi hitap ediyor? Örtüşme yüksekse tekli çatı; düşükse çoklu
                  portföy daha mantıklı.
                </li>
                <li>
                  <strong>Kategori uyumu:</strong> Kategoriler ana markanın
                  konumlandırma vaadiyle uyumlu mu? Uyum kopukluğu yüksekse
                  bağımsız marka açmak gerekir.
                </li>
                <li>
                  <strong>Risk toleransı:</strong> Bir ürünün başarısızlığı
                  diğerlerini ne kadar etkiler? Yüksek risk kategorilerinde
                  bağımsız isimler koruyucu olur.
                </li>
                <li>
                  <strong>Pazarlama bütçesi:</strong> Her marka kendi bütçesiyle
                  büyümek zorundadır; çoklu portföy yüksek kaynak ister. Kısıtlı
                  bütçede tekli çatı verimli çalışır.
                </li>
                <li>
                  <strong>Büyüme hedefi:</strong> Kurumsal büyüme küresel
                  ölçekteyse hibrit yapı gerekebilir. Belirli bir niş odaklıysa
                  tekli çatı odak gücü yaratır.
                </li>
              </ul>
            </div>
          </section>

          <section id="uzanti">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              4. Ürün ve hat uzantıları
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Uzantı kararları marka mimarisinin pratik sınavıdır. Mevcut
                markayı yeni bir ürün veya kategoriye taşıdığında, ana
                markanın konumlandırma vaadini zedelememek gerekir. İki
                klasik uzantı türü vardır:
              </p>
              <ul className="space-y-3">
                <li>
                  <strong>Hat uzantısı (line extension):</strong> Mevcut
                  kategoride yeni bir varyant. Coca-Cola Zero, Oreo Mini,
                  Dove Men+Care gibi. Düşük riskli; hedef kitleye yakın
                  dokunuşlar sunar.
                </li>
                <li>
                  <strong>Kategori uzantısı (category extension):</strong>
                  Mevcut marka yeni bir kategoriye taşınır. Colgate diş
                  macunundan diş fırçasına, Apple bilgisayardan müziğe.
                  Yüksek risk; ana marka vaadiyle yeni kategori arasında
                  doğal köprü olmalı.
                </li>
              </ul>
              <p>
                Uzantıda kritik soru şudur: ana marka bu yeni kategoride
                "neden bekleniyor"? Beklenti yoksa uzantı zorlanır; hedef
                kitle kategoriyi markadan ayırır. Uzantı başarısı ana markanın
                değer birikimine bağlıdır.
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
                <strong>İç yapıyı dışa yansıtmak:</strong> Şirket departmanları
                veya satın alınan firmalar; tüketici için marka değildir.
                Mimari tüketicinin zihnindeki kategoriye göre kurulur.
              </li>
              <li>
                <strong>Gereksiz alt marka enflasyonu:</strong> Her yeni ürün
                için ayrı isim açmak; hem maliyeti yüksek hem tüketici
                kafasını karıştırır. Yeni isim; gerçek konumlandırma farkı
                olduğunda açılır.
              </li>
              <li>
                <strong>Tutarsız onay stratejisi:</strong> Bazı alt markalarda
                ana marka görünür, bazılarında görünmez olursa; onay
                sinyalinin anlamı zayıflar. Onay stratejisi kategori bazında
                tutarlı uygulanmalı.
              </li>
              <li>
                <strong>Uzantıyı esnek zannetmek:</strong> Ana marka her
                kategoriye taşınamaz. Vaatin kategoriye uygunluğu test
                edilmeden yapılan uzantı hem uzantıyı hem ana markayı zedeler.
              </li>
              <li>
                <strong>Mimariyi güncellememek:</strong> Mimari stratejiyle
                birlikte yaşar. Portföy büyüdükçe veya strateji değiştikçe
                mimari de gözden geçirilir; değişmezlik zamanla kaos doğurur.
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
              <Link href="/marka-stratejisi" className="hover:underline">
                Marka Stratejisi rehberi
              </Link>
            </li>
            <li>
              <Link href="/konumlandirma" className="hover:underline">
                Marka Konumlandırma rehberi
              </Link>
            </li>
            <li>
              <Link href="/farklilasma" className="hover:underline">
                Marka Farklılaşması rehberi
              </Link>
            </li>
            <li>
              <Link href="/marka-yonetimi" className="hover:underline">
                Marka Yönetimi rehberi
              </Link>
            </li>
            <li>
              <Link href="/marka-kimligi" className="hover:underline">
                Marka Kimliği rehberi
              </Link>
            </li>
            <li>
              <Link href="/sozluk" className="hover:underline">
                Marka Sözlüğü
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
            Portföyünüzdeki markalar aynı haritayı mı taşıyor?
          </h2>
          <p
            className="mt-4 max-w-[58ch] text-[15.5px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 68%, transparent)' }}
          >
            Marka mimarisi zamanla dağılır; yeni ürünler, satın almalar,
            kategori girişleri yapıyı genişletir. Ahmet Furkan Budak ile
            mimarinin sağlığını sınayıp stratejinizle uyumlu bir harita
            kurabilirsiniz.
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
        <PillarRelatedPosts href="/marka-mimarisi" baslik="Marka mimarisi" />
      </div>
    </>
  );
}
