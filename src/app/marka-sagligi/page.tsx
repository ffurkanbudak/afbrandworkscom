import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PillarJsonLd } from '@/components/PillarJsonLd';
import { PillarRelatedPosts } from '@/components/PillarRelatedPosts';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

const TITLE = 'Marka Sağlığı — Rehber';
const DESCRIPTION =
  'Marka sağlığı nedir, nasıl ölçülür? Farkındalık, hatırlanma, tercih, güven ve sadakat metrikleri; sağlık taraması (brand health tracking), ölçüm yöntemleri ve yorumlama. Ahmet Furkan Budak rehberi.';

export const metadata: Metadata = {
  title: 'Marka Sağlığı',
  description: DESCRIPTION,
  keywords: [
    'marka sağlığı',
    'marka sağlığı nedir',
    'brand health',
    'marka sağlığı ölçümü',
    'marka sağlık taraması',
    'brand tracking',
    'marka farkındalığı',
    'marka hatırlanırlık',
    'marka tercih edilme',
  ],
  alternates: { canonical: '/marka-sagligi' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/marka-sagligi`,
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
    question: 'Marka sağlığı nedir?',
    answer:
      'Marka sağlığı; markanın tanınırlık, hatırlanma, tercih edilme ve güven gibi stratejik metrikler üzerinden ölçülen performansıdır. Satış değil; satışı besleyen zihinsel altyapının durumunu gösterir. Kötü sağlık bir süre sonra satışları aşağı çeker; iyi sağlık kısa vadede görünmese de uzun vadede büyümenin temelidir.',
  },
  {
    question: 'Marka sağlığı nasıl ölçülür?',
    answer:
      'Temel ölçüm; hedef kitle üzerinde düzenli aralıklarla yapılan araştırmalardır. Yardımsız hatırlama, yardımlı tanınırlık, tercih edilme, satın alma niyeti, güven, net tavsiye puanı (NPS) ve marka çağrışımları ölçülür. Araştırma büyük markalarda üç ayda bir, küçüklerde yılda bir-iki yapılır.',
  },
  {
    question: 'Sağlık taraması (brand tracking) nedir?',
    answer:
      'Sağlık taraması; marka metriklerinin zaman içinde izlenmesini sağlayan sürekli araştırma yapısıdır. Tek seferlik bir ölçüm yerine, aynı soruların düzenli aralıklarla aynı kitleye sorulmasıyla trendler çıkarılır. Böylece kampanyaların, ürün değişikliklerinin veya rekabet hareketlerinin etkisi görünür hale gelir.',
  },
  {
    question: 'Hangi metrikler öncelikli izlenmeli?',
    answer:
      'Beş temel metrik önceliklidir: (1) yardımlı farkındalık, (2) yardımsız hatırlama, (3) satın alma değerlendirme kümesine girme, (4) tercih edilme oranı, (5) NPS veya net güven skoru. Ayrıca kategoriye özgü çağrışımlar (premium, güvenilir, yenilikçi vb.) izlenir.',
  },
  {
    question: 'Marka sağlığı kötüyse nasıl iyileştirilir?',
    answer:
      'Önce sorunun kök nedeni anlaşılır: kategori algısı mı zayıf, ürün deneyimi mi yetersiz, iletişim mi tutarsız, konumlandırma mı bulanık? Her sebep farklı müdahale gerektirir. Sığ iletişim hamleleriyle kalıcı iyileşme olmaz; stratejik köke dönmek gerekir. İyileşme aylar, bazen yıllar sürer.',
  },
  {
    question: 'Küçük markalar da sağlık ölçümü yapmalı mı?',
    answer:
      'Evet. Formel araştırma bütçesi olmayan markalar bile basit yöntemlerle sağlık izleyebilir: satış ekibinin aldığı soruların analizi, müşteri hizmetleri şikâyet kategorileri, sosyal medya sentimenti, arama hacmi trendi, tekrar alım oranı. Bu sinyallerin düzenli bir araya getirilmesi ilk sağlık çerçevesini kurar.',
  },
];

export default function MarkaSagligiPage() {
  return (
    <>
      <PillarJsonLd
        slug="marka-sagligi"
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
            Marka Sağlığı
          </p>
          <h1 className="font-display mt-4 text-[33px] leading-[1.05] tracking-tight md:text-[45px]">
            Marka sağlığı, satış rakamlarının arkasındaki zihinsel altyapının hâlidir.
          </h1>
          <p
            className="mt-6 max-w-[58ch] text-[17px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
          >
            Satış verileri bugünün resmidir; marka sağlığı ise yarının haritasıdır.
            Farkındalık, hatırlanma, tercih edilme ve güven; satışa dönüşmeden
            önce zihinde birikir veya erozyona uğrar. Bu rehber; sağlığın
            metriklerini, ölçüm yöntemlerini ve iyileştirme yaklaşımlarını
            işler.
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
            <li><a href="#tanim" className="hover:underline">1. Marka sağlığı nedir?</a></li>
            <li><a href="#metrikler" className="hover:underline">2. Temel metrikler</a></li>
            <li><a href="#tarama" className="hover:underline">3. Sağlık taraması</a></li>
            <li><a href="#yorum" className="hover:underline">4. Sonuçları yorumlama</a></li>
            <li><a href="#iyilesme" className="hover:underline">5. İyileştirme yaklaşımı</a></li>
            <li><a href="#sss" className="hover:underline">6. Sık sorulan sorular</a></li>
          </ul>
        </nav>

        <div className="mt-14 space-y-12 text-[16.5px] leading-[1.75]">
          <section id="tanim">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              1. Marka sağlığı nedir?
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Marka sağlığı; bir markanın kategoride ve hedef kitlenin
                zihninde tuttuğu yerin kalite ve derinliğini özetleyen
                stratejik durumdur. Satış bir çıktı; sağlık ise o çıktıyı
                üreten girdidir. Sağlık bozulurken satış bir süre devam
                edebilir (birikmiş momentum sayesinde), ama zamanla mutlaka
                aşağı döner.
              </p>
              <p>
                Aynı şekilde sağlık iyileştikçe kısa vadede satış değişmiyor
                görünür; oysa gelecekteki satışların zemini hazırlanmaktadır.
                Bu gecikmeli ilişki; marka yatırımlarının yarattığı değerin
                finansal raporlarda hemen görünmemesinin temel nedenidir.
              </p>
              <p>
                Sağlık yalnızca marka ekibinin değil; ürün, operasyon, müşteri
                hizmetleri ve insan kaynakları kararlarının da etkilediği
                bütünsel bir göstergedir. Ürün kalitesi düşerse iletişim
                ne kadar iyi olsa da sağlık erozyona uğrar.
              </p>
            </div>
          </section>

          <section id="metrikler">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              2. Temel metrikler
            </h2>
            <div
              className="mt-4 space-y-6"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  a. Yardımsız hatırlama
                </h3>
                <p className="mt-2">
                  "Bu kategoride hangi markaları biliyorsunuz?" sorusuna ilk
                  anda verilen yanıtlar. En güçlü marka metriklerinden biridir;
                  zihinsel rafın tepesinde durmayı gösterir. Kategoriye göre
                  ilk üçte olmak kritik eşiktir.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  b. Yardımlı tanınırlık
                </h3>
                <p className="mt-2">
                  "Şu markayı duydunuz mu?" sorusuyla ölçülür. Yüksek tanınırlık
                  gerekli bir eşiktir ama yetmez; tanınır olmak tercih
                  edilmekten farklıdır.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  c. Değerlendirme kümesine girme
                </h3>
                <p className="mt-2">
                  "Satın alma kararı verirken hangi markaları değerlendirirdiniz?"
                  Sorusu, markanın gerçek rekabet alanına girip giremediğini
                  gösterir. Bu kümeye girmek; tanınırlıktan tercihe giden yolun
                  kritik halkasıdır.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  d. Tercih edilme
                </h3>
                <p className="mt-2">
                  Aday kümeye giren markalar arasından hangisinin tercih
                  edildiği. Fiyat, deneyim, güven ve çağrışımların birleşik
                  sonucu. Tercih; değerlendirme kümesine girmenin ötesinde
                  gerçek rekabet gücünü gösterir.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  e. Güven ve net tavsiye puanı (NPS)
                </h3>
                <p className="mt-2">
                  Mevcut müşterinin markayı başkalarına tavsiye etme eğilimi.
                  Sadakatin ve sözlü pazarlamanın ana göstergesi. Düşük NPS;
                  büyüme motorunun bozulduğunu erken haber verir.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  f. Marka çağrışımları
                </h3>
                <p className="mt-2">
                  Marka hangi sıfatlarla anılıyor? Premium mu ekonomik mi,
                  yenilikçi mi klasik mi, güvenilir mi maceracı mı? Kategoriye
                  özgü çağrışımların izlenmesi; konumlandırmanın sahada nasıl
                  okunduğunu gösterir.
                </p>
              </div>
            </div>
          </section>

          <section id="tarama">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              3. Sağlık taraması
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Sağlık taraması (brand tracking); marka metriklerinin zaman
                içinde düzenli izlenmesini sağlayan sürekli araştırma
                yapısıdır. Tek seferlik bir ölçüm; o anın fotoğrafını verir
                ama trend üretemez. Sürekli tarama; kampanyaların, ürün
                değişikliklerinin ve rekabet hareketlerinin etkisini görünür
                kılar.
              </p>
              <p>
                Tarama sıklığı markanın büyüklüğüne ve kategorinin temposuna
                bağlıdır. Büyük tüketici markaları genellikle aylık veya üç
                aylık, orta ölçekli markalar altı aylık, küçük markalar yıllık
                ölçüm yapar. Daha sık ölçüm; daha keskin kararlar anlamına
                gelmez; aksine istatistiksel gürültüye yol açabilir.
              </p>
              <p>
                Formel araştırma bütçesi olmayan markalar; dijital sinyalleri
                (arama hacmi, sosyal medya sentimenti, yorum analizi) ve
                operasyonel göstergeleri (tekrar alım, şikâyet kategorileri,
                satış ekibi geri bildirimi) birleştirerek proxy bir sağlık
                çerçevesi kurabilir.
              </p>
            </div>
          </section>

          <section id="yorum">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              4. Sonuçları yorumlama
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Sağlık verisi tek başına karar üretmez; yorumlanması gerekir.
                Üç yorum çerçevesi önemlidir:
              </p>
              <ul className="space-y-3">
                <li>
                  <strong>Zaman içinde trend:</strong> Mutlak değerden çok
                  yönü izleyin. Yükseliyor mu, düşüyor mu, sabit mi? Trendin
                  yönü çoğunlukla mutlak değerden daha anlamlıdır.
                </li>
                <li>
                  <strong>Rakipe göre konum:</strong> Rakiplerle aynı anda
                  düşüyorsanız kategori problemi; yalnız siz düşüyorsanız
                  marka problemi vardır. Göreli konum yorumu netleştirir.
                </li>
                <li>
                  <strong>Hedef kitle segmentleri:</strong> Genel ortalamanın
                  altında alt kırılımlar gizli olabilir. Gençlerde
                  zayıflıyorsa gelecek pazarda sıkıntı var; sadıklarda
                  zayıflıyorsa güven erozyonu başlıyor demektir.
                </li>
              </ul>
              <p>
                Sağlık raporunu satış verileriyle birlikte okumak önemlidir.
                Satış düşerken sağlık yükseliyorsa; pazarlama çalışıyor ama
                dönüşüm aksıyor olabilir. Satış yükselirken sağlık düşüyorsa;
                kısa vadeli promosyonlar uzun vadeli marka değerini yiyor
                olabilir.
              </p>
            </div>
          </section>

          <section id="iyilesme">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              5. İyileştirme yaklaşımı
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Sağlık sorunu görüldüğünde ilk tepki genellikle iletişim
                harcamasını artırmak olur. Oysa sorunun kaynağı çoğu zaman
                iletişim değil, daha derindedir. İyileştirme üç aşamalıdır:
              </p>
              <ol className="space-y-3 list-decimal pl-5">
                <li>
                  <strong>Kök neden analizi:</strong> Hangi metrik düşüyor?
                  Farkındalık mı, tercih mi, güven mi? Her metriğin arkasında
                  farklı stratejik mesele vardır.
                </li>
                <li>
                  <strong>Müdahale planı:</strong> Farkındalık sorunuysa erişim
                  yatırımı; tercih sorunuysa konumlandırma ve farklılaşma;
                  güven sorunuysa ürün ve hizmet kalitesi; çağrışım sorunuysa
                  iletişim stratejisi ele alınır.
                </li>
                <li>
                  <strong>Takip:</strong> Müdahale sonrası en az 2-3 ölçüm
                  dönemi izlenir. Marka metriklerinde değişim yavaştır; erken
                  vazgeçmek en yaygın hatadır.
                </li>
              </ol>
              <p>
                İyileşme aylar, bazen yıllar sürer. Stratejik sabır; marka
                sağlığının birikimli karakterinden gelir.
              </p>
            </div>
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
              <Link href="/marka-yonetimi" className="hover:underline">
                Marka Yönetimi rehberi
              </Link>
            </li>
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
              <Link href="/pazarlama-iletisimi" className="hover:underline">
                Pazarlama İletişimi rehberi
              </Link>
            </li>
            <li>
              <Link href="/farklilasma" className="hover:underline">
                Marka Farklılaşması rehberi
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
          <p className="eyebrow">Sağlık analizi</p>
          <h2 className="font-display mt-3 text-[22px] leading-[1.15] tracking-tight md:text-[26px]">
            Markanızın nabzını tutmak ister misiniz?
          </h2>
          <p
            className="mt-4 max-w-[58ch] text-[15.5px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 68%, transparent)' }}
          >
            Marka sağlık analizi; mevcut metriklerinizi, dijital sinyallerinizi
            ve rekabet konumunuzu birleştirerek bir sağlık tablosu çıkarır.
            Ahmet Furkan Budak ile bu tabloyu strateji kararlarına
            dönüştürebilirsiniz.
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
        <PillarRelatedPosts href="/marka-sagligi" baslik="Marka sağlığı" />
      </div>
    </>
  );
}
