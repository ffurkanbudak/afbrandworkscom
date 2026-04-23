import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PillarJsonLd } from '@/components/PillarJsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com';

const TITLE = 'Pazarlama İletişimi — Rehber';
const DESCRIPTION =
  'Pazarlama iletişimi nedir, bütünleşik pazarlama iletişimi (BPİ) nasıl kurulur? Reklam, halkla ilişkiler, içerik, dijital, etkinlik; kanal seçimi, mesaj tutarlılığı ve ölçümleme. Ahmet Furkan Budak rehberi.';

export const metadata: Metadata = {
  title: 'Pazarlama İletişimi',
  description: DESCRIPTION,
  keywords: [
    'pazarlama iletişimi',
    'pazarlama iletişimi nedir',
    'bütünleşik pazarlama iletişimi',
    'entegre pazarlama iletişimi',
    'marketing communications',
    'imc',
    'kampanya stratejisi',
    'pazarlama karması',
    'iletişim stratejisi',
  ],
  alternates: { canonical: '/pazarlama-iletisimi' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/pazarlama-iletisimi`,
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
    question: 'Pazarlama iletişimi nedir?',
    answer:
      'Pazarlama iletişimi; markanın hedef kitlesine ulaşmak için kullandığı tüm mesaj ve kanalların yönetimini kapsayan disiplindir. Reklam, halkla ilişkiler, içerik pazarlaması, dijital pazarlama, sponsorluk, etkinlik, doğrudan pazarlama ve satış tutundurma bu disiplinin araçlarıdır.',
  },
  {
    question: 'Bütünleşik pazarlama iletişimi (BPİ) ne demek?',
    answer:
      'Bütünleşik pazarlama iletişimi; tüm iletişim kanallarının tek bir stratejiye bağlı ve birbirini güçlendiren biçimde kurgulanmasıdır. Reklam ayrı, sosyal medya ayrı, halkla ilişkiler ayrı yürüyemez; hepsi aynı marka vaadini farklı kanallardan anlatır. BPİ maliyet verimliliği ve mesaj tutarlılığı üretir.',
  },
  {
    question: 'Pazarlama iletişimi kampanyası nasıl kurulur?',
    answer:
      'Süreç altı adımdır: (1) hedefin tanımlanması (farkındalık, tercih, satın alma, sadakat), (2) hedef kitle içgörüsü, (3) merkezi mesaj, (4) kanal seçimi ve rol tanımları, (5) yaratıcı yapı, (6) ölçüm çerçevesi. Merkezi mesaj kampanyanın omurgasıdır; kanallar omurganın uzantılarıdır.',
  },
  {
    question: 'Hangi kanallar kullanılmalı?',
    answer:
      'Kanal seçimi iletişim hedefine ve hedef kitlenin medya davranışına göre yapılır. Farkındalık için geniş erişimli kanallar (TV, dijital görüntülü, dış mekân); tercih için içerik ve etkinlik; satın alma için performans ve doğrudan pazarlama; sadakat için CRM ve topluluk yönetimi etkili olur. Tüm kanallar tek bir merkezi mesaja hizmet eder.',
  },
  {
    question: 'Pazarlama iletişiminde başarı nasıl ölçülür?',
    answer:
      'Ölçüm her adımda farklı metriklerle yapılır: erişim ve gösterim (mesafe), farkındalık ve hatırlama (çekim), tıklama ve etkileşim (ilgi), dönüşüm ve satış (aksiyon), tekrar alım ve tavsiye (sadakat). Yalnız satışa bakmak kısa görüşlüdür; marka metrikleri uzun vadeli büyümenin göstergesidir.',
  },
  {
    question: 'Pazarlama iletişimi ile marka iletişimi aynı şey mi?',
    answer:
      'Yakındır ama aynı değildir. Marka iletişimi; markanın kim olduğunu, neyi temsil ettiğini anlatır; uzun vadeli birikim odaklıdır. Pazarlama iletişimi; marka iletişiminin içinde ama daha geniştir: satış, dağıtım desteği, fiyat iletişimi, promosyonlar da dahildir. İkisi birbirini besler; marka iletişimi güçlü olduğunda pazarlama iletişimi daha verimli çalışır.',
  },
];

export default function PazarlamaIletisimiPage() {
  return (
    <>
      <PillarJsonLd
        slug="pazarlama-iletisimi"
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
            Pazarlama İletişimi
          </p>
          <h1 className="font-display mt-4 text-[40px] leading-[1.05] tracking-tight md:text-[54px]">
            Pazarlama iletişimi, markanın sahadaki sesidir; tüm kanalların aynı şarkıyı söylemesidir.
          </h1>
          <p
            className="mt-6 max-w-[58ch] text-[17px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
          >
            Reklam, halkla ilişkiler, içerik, dijital, etkinlik ve doğrudan
            pazarlama; ayrı araçlar değil, tek bir stratejinin farklı
            ifadeleridir. Bu rehberde bütünleşik pazarlama iletişimi, kampanya
            kurulumu, kanal seçimi ve ölçüm çerçevesi işleniyor.
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
            <li><a href="#tanim" className="hover:underline">1. Pazarlama iletişimi nedir?</a></li>
            <li><a href="#butunlesik" className="hover:underline">2. Bütünleşik pazarlama iletişimi</a></li>
            <li><a href="#kanallar" className="hover:underline">3. Kanallar ve rolleri</a></li>
            <li><a href="#kampanya" className="hover:underline">4. Kampanya kurulumu</a></li>
            <li><a href="#olcum" className="hover:underline">5. Ölçüm çerçevesi</a></li>
            <li><a href="#sss" className="hover:underline">6. Sık sorulan sorular</a></li>
          </ul>
        </nav>

        <div className="mt-14 space-y-12 text-[16.5px] leading-[1.75]">
          <section id="tanim">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              1. Pazarlama iletişimi nedir?
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Pazarlama iletişimi; bir markanın ürün, hizmet ve değer
                önerisini hedef kitleye ulaştırmak için kullandığı tüm mesaj
                ve kanalların yönetimidir. Geleneksel olarak reklam odaklı
                görülse de bugün çok daha geniş bir araç setini kapsar: içerik
                pazarlaması, sosyal medya, halkla ilişkiler, etkinlik, sponsor
                ortaklıkları, topluluk yönetimi, CRM, arama motoru pazarlaması
                ve doğrudan pazarlama.
              </p>
              <p>
                Pazarlama iletişiminin işlevi tek başına satış değildir. Doğru
                kurulmuş iletişim; farkındalık yaratır, tercih kurar, marka
                değerini besler, satın alma anını kolaylaştırır ve sadakati
                pekiştirir. Her aşamanın kendi kanal karması ve metrikleri
                vardır.
              </p>
              <p>
                İletişimin etkisi; tekil kampanyalarla değil kümülatif
                birikimle ölçülür. Bir kampanya sonucu "geldi, etkiledi,
                geçti" değildir; marka değeri biriktikçe her kampanyanın
                verimi artar.
              </p>
            </div>
          </section>

          <section id="butunlesik">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              2. Bütünleşik pazarlama iletişimi
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Bütünleşik pazarlama iletişimi (BPİ); farklı iletişim
                araçlarının birbirinden bağımsız değil, tek bir strateji
                çatısı altında koordineli çalışmasıdır. Reklam bir mesaj
                veriyor, sosyal medya başka bir ton kullanıyor, halkla
                ilişkiler üçüncü bir hikâye anlatıyorsa; hedef kitle için
                marka parçalanmış görünür. BPİ bu parçalanmayı önler.
              </p>
              <p>
                BPİ'nin üç temel ilkesi vardır: mesaj tutarlılığı (tüm
                kanallarda aynı merkezi mesajın taşınması), kanal
                bütünleşmesi (kanalların birbirini güçlendirmesi) ve müşteri
                yolculuğu odaklılık (her temas noktasının bütünün bir parçası
                olarak tasarlanması).
              </p>
              <p>
                BPİ uygulamada yalnızca iletişim ajansı değil, içerik, dijital,
                PR, CRM ekiplerinin ortak bir stratejik çerçeveye oturması
                anlamına gelir. Briefler ortak hazırlanır; yaratıcı yapı
                kanala göre adapte edilir ama aynı DNA'yı taşır.
              </p>
            </div>
          </section>

          <section id="kanallar">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              3. Kanallar ve rolleri
            </h2>
            <div
              className="mt-4 space-y-6"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  a. Reklam
                </h3>
                <p className="mt-2">
                  Geniş erişim, hızlı farkındalık, duygusal hikâye. Ödenen
                  medya üzerinden yapılır. TV, radyo, dijital görüntülü,
                  dış mekân, basın kanalları buraya girer. Marka kurucu
                  rol oynar; bütçeye en duyarlı kanaldır.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  b. Halkla ilişkiler
                </h3>
                <p className="mt-2">
                  Üçüncü taraf kanallar üzerinden güvenilirlik inşası. Basın
                  bültenleri, medya ilişkileri, düşünce liderliği içerikleri,
                  kriz iletişimi. Kazanılmış medya (earned media) üzerinden
                  çalışır; reklamdan daha güvenilir algılanır.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  c. İçerik pazarlaması
                </h3>
                <p className="mt-2">
                  Hedef kitlenin ilgi alanına değer katan içeriklerle uzun
                  vadeli ilişki kurma. Blog, podcast, video serisi, araştırma
                  raporları, rehberler. SEO ile birleştiğinde arama motoru
                  görünürlüğünü besler.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  d. Dijital pazarlama
                </h3>
                <p className="mt-2">
                  Arama motoru pazarlaması, görüntülü reklam, sosyal medya
                  reklamları, influencer iş birlikleri, programatik. Yüksek
                  hedefleme, hızlı optimizasyon, ölçülebilirlik. Performans
                  odaklı çalıştığında satışa yakın; marka odaklı
                  çalıştığında üst hunide işe yarar.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  e. Etkinlik ve sponsorluk
                </h3>
                <p className="mt-2">
                  Fiziksel veya dijital buluşmalarda marka deneyimi yaratma;
                  sektörel etkinlik sponsorlukları üzerinden hedef kitleye
                  temas. Derin etkileşim sağlar; erişim görece düşüktür ama
                  etki kalıcıdır.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  f. Doğrudan pazarlama ve CRM
                </h3>
                <p className="mt-2">
                  E-posta, SMS, bildirim, uygulama içi mesajlar üzerinden
                  mevcut müşteriyle birebir iletişim. Segmentasyon ve
                  kişiselleştirme temel güçtür. Sadakat ve tekrar alım
                  yaratmada en verimli kanal.
                </p>
              </div>
            </div>
          </section>

          <section id="kampanya">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              4. Kampanya kurulumu
            </h2>
            <ol
              className="mt-4 space-y-4 list-decimal pl-5"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <li>
                <strong>Hedef tanımı:</strong> Kampanya hangi sonucu üretmeli?
                Farkındalık, tercih, satış, sadakat veya imaj düzeltme
                olabilir. Belirsiz hedef; belirsiz kampanya demektir.
              </li>
              <li>
                <strong>Hedef kitle içgörüsü:</strong> Kitlenin şu anki
                davranışı, beklentisi, endişeleri ve medya alışkanlıkları
                keşfedilir. İçgörü; kampanyanın yaratıcı yakıtıdır.
              </li>
              <li>
                <strong>Merkezi mesaj:</strong> Kampanyanın tek cümlede
                söylenebilen özü. Bu cümle kanallara dağıldığında orijinal
                anlamı değişmez; sadece formu değişir.
              </li>
              <li>
                <strong>Kanal karması:</strong> Her kanala rol verilir. Hangi
                kanal farkındalık üretiyor, hangisi tercihi pekiştiriyor,
                hangisi satışa yakın? Bütçe dağılımı rollere göre kurulur.
              </li>
              <li>
                <strong>Yaratıcı yapı:</strong> Merkezi mesaj; görsel,
                metinsel ve sesli yaratıcı ifadelere dönüşür. Yaratıcı yapı
                kanallarda adapte edilir ama merkezi DNA korunur.
              </li>
              <li>
                <strong>Ölçüm çerçevesi:</strong> Her kanalın hedefe katkısı
                önceden tanımlanmış metriklerle ölçülür. Kampanya sonrası
                öğrenmeler sonraki kampanyaların girdisi olur.
              </li>
            </ol>
          </section>

          <section id="olcum">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              5. Ölçüm çerçevesi
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Pazarlama iletişimini tek bir metrikle ölçmek yanıltıcıdır.
                Farklı aşamalarda farklı metrikler gerçek resmi verir:
              </p>
              <ul className="space-y-3">
                <li>
                  <strong>Erişim metrikleri:</strong> Gösterim sayısı, tekil
                  kullanıcı sayısı, frekans. Mesajın kaç kişiye kaç kez
                  ulaştığını gösterir.
                </li>
                <li>
                  <strong>Dikkat metrikleri:</strong> İzleme süresi, tıklama
                  oranı, yardımsız hatırlama. Mesajın dikkate alınıp
                  alınmadığını ölçer.
                </li>
                <li>
                  <strong>İlgi ve etkileşim metrikleri:</strong> Yorum,
                  paylaşım, beğeni, site ziyareti, ziyaret süresi. Mesajın
                  ne kadar ilgi çektiğini gösterir.
                </li>
                <li>
                  <strong>Dönüşüm metrikleri:</strong> Satın alma, kayıt,
                  randevu talebi, doğrudan satış. Aksiyon ölçümleri.
                </li>
                <li>
                  <strong>Marka metrikleri:</strong> Marka farkındalığı,
                  hatırlanırlık, tercih edilme, net tavsiye puanı (NPS).
                  Uzun vadeli değer göstergeleri.
                </li>
              </ul>
              <p>
                İyi bir iletişim ölçümü; kısa vadeli dönüşüm metriklerini uzun
                vadeli marka metrikleriyle birlikte ele alır. Yalnız
                dönüşüme bakan ölçüm; marka değerini erozyona uğratan
                kararları gizleyebilir.
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
              <Link href="/dijital-markalasma" className="hover:underline">
                Dijital Markalaşma rehberi
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
          <h2 className="font-display mt-3 text-[26px] leading-[1.15] tracking-tight md:text-[30px]">
            Kanallarınız aynı şarkıyı söylüyor mu?
          </h2>
          <p
            className="mt-4 max-w-[58ch] text-[15.5px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 68%, transparent)' }}
          >
            Reklam bir şey, sosyal medya başka bir şey, PR farklı söylüyorsa;
            iletişim bütçesi kendisiyle çatışır. Ahmet Furkan Budak ile
            pazarlama iletişiminizin bütünleşik mimarisini kurabilirsiniz.
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
