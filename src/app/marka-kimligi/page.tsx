import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PillarJsonLd } from '@/components/PillarJsonLd';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

const TITLE = 'Marka Kimliği — Rehber';
const DESCRIPTION =
  'Marka kimliği nedir, nasıl oluşturulur, hangi bileşenlerden oluşur? Logo, tipografi, renk paleti, sesin tonu ve görsel sistem. Ahmet Furkan Budak rehberi.';

export const metadata: Metadata = {
  title: 'Marka Kimliği',
  description: DESCRIPTION,
  keywords: [
    'marka kimliği',
    'marka kimliği nedir',
    'kurumsal kimlik',
    'marka kimliği nasıl oluşturulur',
    'brand identity',
    'marka kimliği tasarımı',
    'logo ve marka kimliği',
    'görsel kimlik',
    'marka kimliği bileşenleri',
  ],
  alternates: { canonical: '/marka-kimligi' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/marka-kimligi`,
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
    question: 'Marka kimliği nedir?',
    answer:
      'Marka kimliği; bir markanın görünür ve işitilir yüzüdür. Logo, tipografi, renk paleti, görsel sistem, fotoğraf dili, hareket dili ve ses tonundan oluşur. Kimlik stratejinin yansımasıdır; iyi kurulmuş bir kimlik her temas noktasında aynı marka hissini yaratır.',
  },
  {
    question: 'Marka kimliği ile logo aynı şey mi?',
    answer:
      'Hayır. Logo marka kimliğinin yalnızca bir bileşenidir; kimliğin tamamı değildir. Marka kimliği; logoya ek olarak tipografi, renk paleti, grafik dili, fotoğraf stili, ikonografi, ses tonu ve kullanım kurallarını kapsar. Logo kimliğin yüzüdür; kimlik ise bedeninin tamamıdır.',
  },
  {
    question: 'Marka kimliği nasıl oluşturulur?',
    answer:
      'Süreç stratejiyle başlar. Önce konumlandırma, farklılaşma ekseni ve marka kişiliği netleşir. Sonra görsel sistem (logo, renk, tipografi, grid), yazılı sistem (ses tonu, terminoloji, başlık kuralları) ve deneyim sistemi (fotoğraf, ikonografi, hareket) kurulur. Son adım marka kitabının hazırlanması ve ekip eğitimidir.',
  },
  {
    question: 'Marka kimliğinin temel bileşenleri nelerdir?',
    answer:
      'Beş temel bileşen vardır: görsel sistem (logo, işaret, renk, tipografi), yazılı sistem (ses tonu, başlık ve metin kuralları), fotoğraf ve ikonografi dili, hareket ve etkileşim dili ve uygulama kuralları (marka kitabı). Her bileşen stratejiden türetilir; stratejisiz kimlik dekor olarak kalır.',
  },
  {
    question: 'Marka kimliği ne zaman yenilenmeli?',
    answer:
      'Konumlandırma değiştiğinde, hedef kitle genişlediğinde, marka kategorisi dönüştüğünde, dijital deneyim ön plana çıktığında veya kimlik mevcut pazar beklentilerini karşılayamaz hale geldiğinde yenileme gerekir. Kimlik sık sık değişmez; tutarlılık kimlik için güvenin temelidir. Yenileme sıçramalı değil evrimsel olursa birikmiş marka değeri korunur.',
  },
  {
    question: 'Marka kimliği marka kitabı (brand guidelines) neden gerekli?',
    answer:
      'Marka kitabı; kimlik kararlarının tüm ekibe ve dış iş ortaklarına aynı şekilde iletilmesini sağlayan referans belgedir. Logonun nasıl kullanılacağı, renklerin hangi durumlarda uygulanacağı, tipografi hiyerarşisi, ses tonu örnekleri ve yasak kullanımlar burada yer alır. Marka kitabı olmayan kimlik zamanla dağılır.',
  },
];

export default function MarkaKimligiPage() {
  return (
    <>
      <PillarJsonLd
        slug="marka-kimligi"
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
            Marka Kimliği
          </p>
          <h1 className="font-display mt-4 text-[40px] leading-[1.05] tracking-tight md:text-[54px]">
            Marka kimliği; stratejinin görünür, işitilir, hissedilir hâlidir.
          </h1>
          <p
            className="mt-6 max-w-[58ch] text-[17px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
          >
            Marka kimliği; logodan fazlasıdır. Tipografi, renk, görsel sistem,
            fotoğraf dili, hareket ve ses tonunun ortak bir hikâyeyi tutarlı
            anlatmasıdır. Bu rehberde kimliğin tanımı, bileşenleri, kurulma
            süreci ve yenileme kararları işleniyor.
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
            <li><a href="#tanim" className="hover:underline">1. Marka kimliği nedir?</a></li>
            <li><a href="#bilesen" className="hover:underline">2. Temel bileşenler</a></li>
            <li><a href="#surec" className="hover:underline">3. Kurulma süreci</a></li>
            <li><a href="#kitap" className="hover:underline">4. Marka kitabı</a></li>
            <li><a href="#yenileme" className="hover:underline">5. Yenileme kararı</a></li>
            <li><a href="#sss" className="hover:underline">6. Sık sorulan sorular</a></li>
          </ul>
        </nav>

        <div className="mt-14 space-y-12 text-[16.5px] leading-[1.75]">
          <section id="tanim">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              1. Marka kimliği nedir?
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Marka kimliği, markanın dış dünyaya temas ettiği her noktada
                tuttuğu görünür ve işitilir çerçevedir. Logo bu çerçevenin
                yüzüdür ama kimliğin kendisi değildir. Kimlik; renk paleti,
                tipografi, grafik dili, ikonografi, fotoğraf stili, hareket
                dili ve ses tonunun bütünleşik çalışmasıdır.
              </p>
              <p>
                Kimliğin temel işlevi tanınırlığı sağlamaktır. Tüketici bir
                gazete ilanında, dijital banner'da, ürün ambalajında veya
                müşteri hizmetleri konuşmasında aynı marka hissini almalıdır.
                Bu tutarlılık güven biriktirir; kimlik dağıldıkça güven
                birikimi de dağılır.
              </p>
              <p>
                Stratejik açıdan kimlik; konumlandırmanın, marka kişiliğinin
                ve değer önerisinin somutlaşmış hâlidir. Stratejisiz kurulan
                kimlik güzel tasarım olsa bile boş kalır; çünkü hangi
                konumlandırmayı taşıdığı belli değildir.
              </p>
            </div>
          </section>

          <section id="bilesen">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              2. Temel bileşenler
            </h2>
            <div
              className="mt-4 space-y-6"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  a. Görsel sistem
                </h3>
                <p className="mt-2">
                  Logo, işaret, renk paleti, tipografi, grid ve grafik dili bu
                  sistemin parçalarıdır. Her biri birbirinden bağımsız
                  tasarlanmaz; tek bir görsel dilin farklı araçlarıdır. Renk
                  paleti marka kişiliğini taşır, tipografi okunurluk ve
                  karakter kurar, grid düzenin omurgasıdır.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  b. Yazılı sistem ve ses tonu
                </h3>
                <p className="mt-2">
                  Markanın yazılı iletişimindeki tonu, kullandığı kelimeler,
                  başlık ve metin kuralları bu sistemde yer alır. Ses tonu
                  formal, samimi, öğretici, meydan okuyucu veya ilham veren
                  olabilir; hangisi olduğu stratejiden türetilir. Markaya özgü
                  terminoloji ve yasak kelimeler de burada tanımlanır.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  c. Fotoğraf ve ikonografi dili
                </h3>
                <p className="mt-2">
                  Marka neyi nasıl gösteriyor? Fotoğraflar kurgu mu belgesel
                  mi? İnsan odaklı mı ürün odaklı mı? Işık ve çerçeveleme
                  kuralları nelerdir? İkonografide çizgisellik, doluluk,
                  yuvarlaklık gibi tercihler birlikte karar verilir.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  d. Hareket ve etkileşim dili
                </h3>
                <p className="mt-2">
                  Dijital çağda kimlik yalnızca sabit değil, hareket ederek de
                  kendini gösterir. Geçişler, animasyonlar, etkileşim geri
                  bildirimleri, ses efektleri ve video kurgusu markanın hareket
                  dilini belirler. Hızlı mı sakin mi, mekanik mi organik mi
                  sorularının yanıtı burada şekillenir.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  e. Uygulama kuralları
                </h3>
                <p className="mt-2">
                  Yukarıdaki tüm sistemlerin nasıl birlikte çalışacağını
                  tanımlayan kurallar marka kitabında toplanır. Asıl güç
                  kuralların katılığında değil, neyin neden öyle olduğunu
                  anlatan çerçevenin netliğindedir.
                </p>
              </div>
            </div>
          </section>

          <section id="surec">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              3. Kurulma süreci
            </h2>
            <ol
              className="mt-4 space-y-4 list-decimal pl-5"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <li>
                <strong>Strateji ve kişilik:</strong> Konumlandırma,
                farklılaşma ekseni ve marka kişiliği netleşir. Kimlik buradan
                beslenir.
              </li>
              <li>
                <strong>Araştırma:</strong> Kategori taraması, rakip analizi,
                hedef kitle görsel alışkanlıkları ve kültürel çerçeve incelenir.
              </li>
              <li>
                <strong>Konsept alternatifleri:</strong> Üç farklı yönü
                keşfeden moodboard ve yön önerileri hazırlanır; stratejiye
                hangisinin daha iyi hizmet ettiği karara bağlanır.
              </li>
              <li>
                <strong>Sistem tasarımı:</strong> Seçilen yön; logo, renk,
                tipografi, grid, fotoğraf ve ses tonu sistemine dönüştürülür.
              </li>
              <li>
                <strong>Kanal uygulamaları:</strong> Web sitesi, sosyal medya,
                ambalaj, sunum, e-posta, reklam gibi kanallarda uygulanır;
                sistem gerçek hayatta sınanır.
              </li>
              <li>
                <strong>Marka kitabı ve eğitim:</strong> Kurallar yazılır,
                örnekler gösterilir, iç ekip ve ajanslar eğitilir. Lansman
                sonrası düzenli denetim yapılır.
              </li>
            </ol>
          </section>

          <section id="kitap">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              4. Marka kitabı
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Marka kitabı (brand guidelines); kimliğin kural kitabıdır.
                İyi bir marka kitabı hem "ne" hem "niye" sorularını yanıtlar.
                "Logomuz beyaz arka planda kullanılır" bir kuraldır; "çünkü
                renk paletimiz beyazın üzerinde en net okunur" o kuralın
                gerekçesidir. Gerekçeli kurallar ekibin kararlarını tutarlı
                kılar; gerekçesiz kurallar ise esnek durumlarda bozulur.
              </p>
              <p>
                Kitap içinde tipik olarak şunlar bulunur: marka stratejisinin
                özeti, logo varyasyonları ve kullanım alanları, renk paleti ve
                oranlar, tipografi hiyerarşisi, grid ve layout kuralları,
                fotoğraf dili örnekleri, ikonografi sistemi, ses tonu örnekleri
                ve yasak kullanımlar. Dijital ağırlıklı markalarda dijital
                bileşenler ayrı bir bölümde detaylandırılır.
              </p>
            </div>
          </section>

          <section id="yenileme">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              5. Yenileme kararı
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Kimlik yenileme (rebranding) ciddi bir karardır. Mevcut
                kimlikte birikmiş zihinsel yatırım; tanınırlık, sadakat,
                fiyat premium'u gibi değerler yenileme sırasında risk
                altındadır. O yüzden yenileme kararı strateji değişikliğini
                takip etmelidir, estetik tatminsizliği değil.
              </p>
              <p>
                İki tipik yaklaşım vardır: sıçramalı yenileme (eski kimlikten
                radikal kopuş) ve evrimsel yenileme (mevcut kimliği modern
                çağa taşıma). Konumlandırma gerçekten değiştiyse sıçramalı;
                sadece güncelleme gerekiyorsa evrimsel yaklaşım daha az risk
                taşır.
              </p>
              <p>
                Yenileme sürecinde tek tehlike eski kimliği kaybetmek değildir.
                Yeni kimliğin uygulamada tutarsız kalması, marka kitabının
                yazılmaması veya iç ekibin eğitilmemesi de yenilemeyi
                başarısız kılar. Lansman sonrası ilk 6-12 ay uygulama
                denetimi süreci kilitler.
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
              <Link href="/marka-yonetimi" className="hover:underline">
                Marka Yönetimi rehberi
              </Link>
            </li>
            <li>
              <Link href="/dijital-markalasma" className="hover:underline">
                Dijital Markalaşma rehberi
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
          <h2 className="font-display mt-3 text-[26px] leading-[1.15] tracking-tight md:text-[30px]">
            Marka kimliğinizi stratejik bir mercekle mi sınamalısınız?
          </h2>
          <p
            className="mt-4 max-w-[58ch] text-[15.5px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 68%, transparent)' }}
          >
            Kimlik sorunu çoğu zaman estetik değil stratejiktir. Ahmet Furkan
            Budak ile marka kimliğinizin strateji ile uyumunu, tutarlılık
            düzeyini ve yenileme ihtiyacını birlikte ele alabilirsiniz.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="btn-red inline-flex items-center gap-2 rounded-[6px] px-4 py-2.5 text-[13px] font-medium"
            >
              İletişime geçin
              <ArrowRight className="h-[13px] w-[13px]" strokeWidth={2.25} />
            </Link>
            <Link
              href="/marka-danismanligi"
              className="inline-flex items-center gap-2 rounded-[6px] border px-4 py-2.5 text-[13px] font-medium"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
            >
              Danışmanlık sayfası
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
