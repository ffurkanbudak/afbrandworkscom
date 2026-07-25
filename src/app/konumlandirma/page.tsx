import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PillarJsonLd } from '@/components/PillarJsonLd';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

const TITLE = 'Marka Konumlandırma — Rehber';
const DESCRIPTION =
  'Marka konumlandırma nedir, nasıl yapılır, hangi yöntemler işler? Konumlandırma ekseninin kurulması, değer önerisiyle ilişkisi ve yaygın hatalar. Ahmet Furkan Budak rehberi.';

export const metadata: Metadata = {
  title: 'Marka Konumlandırma',
  description: DESCRIPTION,
  keywords: [
    'marka konumlandırma',
    'konumlandırma nedir',
    'brand positioning',
    'konumlandırma stratejisi',
    'konumlandırma örnekleri',
    'konumlandırma haritası',
    'pazar konumlandırma',
    'marka konumlandırma nasıl yapılır',
  ],
  alternates: { canonical: '/konumlandirma' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/konumlandirma`,
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
    question: 'Marka konumlandırma nedir?',
    answer:
      'Marka konumlandırma; bir markanın kategori içinde hangi rafı tuttuğunu, kimin için var olduğunu ve rakiplerden nasıl ayrıştığını tek cümlede netleştiren stratejik karardır. Her marka kararı bu cümlenin gölgesinde alınır; güçlü bir konumlandırma uzun vadeli bir pusula işlevi görür.',
  },
  {
    question: 'Marka konumlandırma nasıl yapılır?',
    answer:
      'Süreç dört adımlıdır. Birincisi kategori ve rekabet haritasının çıkarılması; kimin hangi rafı tuttuğunu görürsünüz. İkincisi hedef kitlenin işinin ve çözülmemiş ihtiyacının tanımlanması. Üçüncüsü farklılaşma ekseninin seçilmesi ve değer önerisine bağlanması. Dördüncüsü konumlandırma cümlesinin yazılması ve iletişim kararlarına rehber kılınması.',
  },
  {
    question: 'Konumlandırma cümlesi nasıl yazılır?',
    answer:
      'Klasik kalıp şudur: "[Hedef kitle] için, [kategori] içinde, [farklılaşma ekseni] sayesinde [temel fayda] sunan marka." Cümle tek bir rafı işaret etmeli; "herkes için her şey" iddiası konumlandırma değildir. İyi bir konumlandırma cümlesi fiyatlandırmadan paketlemeye, reklamdan ürün yol haritasına kadar her kararı etkiler.',
  },
  {
    question: 'Konumlandırma ve değer önerisi aynı şey mi?',
    answer:
      'Hayır. Konumlandırma stratejik bir seçimdir; markanın kategoride ve zihinlerde hangi yeri tuttuğunu tanımlar. Değer önerisi ise bu konumun hedef kitleye somut vaadidir. Konumlandırma çerçeveyi kurar, değer önerisi o çerçeveye anlam verir. İkisi birlikte çalıştığında marka mesajı netleşir.',
  },
  {
    question: 'Konumlandırma yapılırken en sık yapılan hatalar nelerdir?',
    answer:
      'Dört yaygın hata: Birincisi herkese hitap etme isteği; net hedef kitlesi olmayan konumlandırma bulanık kalır. İkincisi rakibe tepki olarak konumlanma; özgün eksen kuramazsınız. Üçüncüsü iç ekibin jargonunu konumlandırma sanmak; hedef kitlenin dilini kullanmak gerekir. Dördüncüsü konumlandırma cümlesini dosyada bırakıp günlük kararlara taşımamak.',
  },
  {
    question: 'Konumlandırma ne zaman yenilenmeli?',
    answer:
      'Kategori değiştiğinde, rekabet yapısı dönüştüğünde, hedef kitle genişlediğinde, marka mimarisi yeniden kurulurken, satış performansı beklentinin altına düştüğünde ve yeni bir yatırım turu öncesinde yenileme gerekebilir. Ancak konumlandırma sık sık değişen bir şey değildir; tutarlılık gücün kaynağıdır.',
  },
];

export default function KonumlandirmaPage() {
  return (
    <>
      <PillarJsonLd
        slug="konumlandirma"
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
            Marka Konumlandırma
          </p>
          <h1 className="font-display mt-4 text-[33px] leading-[1.05] tracking-tight md:text-[45px]">
            Konumlandırma, markanın hangi zihinsel rafı tuttuğunu netleştiren karardır.
          </h1>
          <p
            className="mt-6 max-w-[58ch] text-[17px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
          >
            Marka konumlandırma; pazarlama iletişiminin süs cümlesi değil,
            stratejinin omurgasıdır. Hedef kitlenin zihninde tuttuğunuz yer;
            fiyatlandırmadan ürün tasarımına, iletişimden dağıtım kanallarına
            kadar her kararı etkiler. Bu rehberde konumlandırmanın tanımı,
            kurulma süreci, klasik formülü ve yaygın hataları yer alıyor.
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
            <li><a href="#tanim" className="hover:underline">1. Konumlandırma nedir?</a></li>
            <li><a href="#onem" className="hover:underline">2. Neden önemlidir?</a></li>
            <li><a href="#surec" className="hover:underline">3. Kurulma süreci</a></li>
            <li><a href="#formul" className="hover:underline">4. Konumlandırma formülü</a></li>
            <li><a href="#hatalar" className="hover:underline">5. Yaygın hatalar</a></li>
            <li><a href="#sss" className="hover:underline">6. Sık sorulan sorular</a></li>
          </ul>
        </nav>

        <div className="mt-14 space-y-12 text-[16.5px] leading-[1.75]">
          <section id="tanim">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              1. Konumlandırma nedir?
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Konumlandırma, Al Ries ve Jack Trout'un 1972'de formüle ettiği ve
                bugün hâlâ pazarlama düşüncesinin temel taşlarından biri olan
                kavramdır. Temel soru şudur: Markanız tüketicinin zihninde hangi
                rafta duruyor? Bu raf kategori, fayda veya kullanım anı etrafında
                şekillenebilir; ama net olmalıdır.
              </p>
              <p>
                Konumlandırma bir reklam cümlesi değildir. Markanın varlık nedeni,
                kime hitap ettiği ve neyin karşılığını sunduğuna dair stratejik
                seçimdir. Bu seçim iletişimden önce yapılır; iletişim onun
                yansımasıdır.
              </p>
              <p>
                İyi bir konumlandırma hem dışlayıcıdır hem de sahiplenicidir.
                Dışlayıcıdır çünkü "biz şu değiliz" demeyi gerektirir; hedef
                kitlenin dışındaki segmentleri gönüllü olarak bırakır.
                Sahiplenicidir çünkü seçilen rafı zamanla markanın rafı haline
                getirir.
              </p>
            </div>
          </section>

          <section id="onem">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              2. Neden önemlidir?
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Konumlandırması belirsiz bir markanın iç ekibinde her karar
                tartışma zeminine döner. "Şu kampanya bize uygun mu?", "Bu ürün
                hattına girmeli miyiz?", "Bu fiyatlandırma stratejisi ne kadar
                agresif olmalı?" gibi sorular konumlandırma berrak olduğunda
                dakikalar içinde yanıtlanır. Bulanık olduğunda ise her karar
                politik bir süreç haline gelir.
              </p>
              <p>
                Konumlandırma aynı zamanda iletişim verimliliğini belirler.
                Hedef kitlenin zihninde net bir yer tutan marka; aynı bütçeyle
                daha fazla iş yapar, çünkü iletişimleri ekleme yerine
                pekiştirme olarak çalışır. Bulanık markalar her kampanyada
                sıfırdan başlar.
              </p>
              <p>
                Uzun vadede konumlandırma, marka değerinin temelidir. Fiyat
                hassasiyetini azaltan, sadakati pekiştiren ve rakiplerin
                benzetme girişimlerini zorlaştıran unsur; markanın kategoride
                tuttuğu net zihinsel yerdir.
              </p>
            </div>
          </section>

          <section id="surec">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              3. Kurulma süreci
            </h2>
            <div
              className="mt-4 space-y-6"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  a. Kategori ve rekabet haritası
                </h3>
                <p className="mt-2">
                  Markanın hangi kategoride yer aldığı ve o kategoride kimin
                  hangi rafı tuttuğu haritalanır. "Rakiplerimiz kim" sorusu
                  rakiplerin hangi vaatle geldiğinin analizine dönüşür. Boş
                  raflar ve yoğun raflar görünür hale getirilir.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  b. Hedef kitlenin işi ve ihtiyacı
                </h3>
                <p className="mt-2">
                  Hedef kitle yaş veya gelir grubu değildir; çözmek istedikleri
                  somut bir işi olan insanlardır (Clayton Christensen'ın "Jobs
                  to be Done" çerçevesi). İşin ne olduğu, mevcut çözümlerin
                  nerelerde aksadığı ve karar anında hangi değişkenlerin
                  belirleyici olduğu netleştirilir.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  c. Farklılaşma ekseni
                </h3>
                <p className="mt-2">
                  Markanın hangi eksende ayrışacağı seçilir: fiyat, hız, kalite,
                  deneyim, kimlik, uzmanlık, sıradışılık. Tek bir eksen seçmek
                  gerekir; çünkü zihinsel raflar tek boyutludur. Ekseni seçtikten
                  sonra o eksende kanıt üretmek marka yönetiminin günlük
                  pratiğine dönüşür.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  d. Konumlandırma cümlesi
                </h3>
                <p className="mt-2">
                  Seçilen eksen ve hedef kitle tek bir cümlede birleşir. Cümle,
                  ekip içinde hiçbir açıklamaya gerek kalmadan anlaşılabilir
                  olmalı; yoruma açık ifadeler netleştirilmelidir. Bu cümle
                  günlük karar toplantılarında "bu hamle konumlandırmamıza uyar
                  mı?" sorusunun yanıtı olur.
                </p>
              </div>
            </div>
          </section>

          <section id="formul">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              4. Konumlandırma formülü
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Klasik konumlandırma cümlesi şu kalıbı takip eder:
              </p>
              <p
                className="rounded-[10px] border p-5 text-[15px] leading-[1.65]"
                style={{
                  borderColor: 'var(--border)',
                  background: 'color-mix(in oklab, var(--fg) 3%, transparent)',
                }}
              >
                [Hedef kitle] için, [kategori] içinde, [farklılaşma ekseni]
                sayesinde [temel fayda] sunan [marka adı].
              </p>
              <p>
                Örneğin: "Sürdürülebilirliği önemseyen şehirli 25-40 yaş
                tüketiciler için, kahve kategorisinde, menşei şeffaf tek
                kaynakları öne çıkararak, etik tüketim ve lezzet kalitesini
                birlikte sunan kahve markası." Bu cümle; mağaza tasarımından
                paket üstündeki metne, ekip iletişiminden ortaklık seçimine
                kadar pek çok kararı etkiler.
              </p>
              <p>
                Formüle uyan her cümle iyi değildir; ancak iyi her cümle bu
                soruları yanıtlamış olur. Cümle uzun veya kısa olabilir; önemli
                olan her kelimenin sınanmış olması.
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
                <strong>Herkese hitap etme isteği:</strong> "Hedef kitlemiz
                herkes" cümlesi, hedef kitle tanımlanmamış anlamına gelir.
                Konumlandırma tercih gerektirir; tercih kalabalığı dışarıda
                bırakır.
              </li>
              <li>
                <strong>Rakibe tepki olarak konumlanma:</strong> "Biz
                X markasının yapmadığı Y'yi yapıyoruz" cümlesi kendi
                eksenini kurmak yerine rakibin ekseninde kalmaktır. Özgün
                eksen daha dayanıklıdır.
              </li>
              <li>
                <strong>İç jargon kullanmak:</strong> "Sinerjik, holistik,
                360 derece çözümler" gibi iç ekip dili hedef kitlenin
                zihninde iz bırakmaz. Konumlandırma müşterinin kendi
                diliyle yazılır.
              </li>
              <li>
                <strong>Konumlandırmayı dosyada bırakmak:</strong> Stratejik
                dokümanın içinde unutulan konumlandırma iş görmez. Günlük
                karar toplantılarında başvurulan, ekip eğitiminde anlatılan,
                iletişim briefine yazılan konumlandırma canlı olur.
              </li>
              <li>
                <strong>Çok sık değiştirmek:</strong> Her yeni pazarlama
                yöneticisinde konumlandırmayı yenilemek; birikmiş zihinsel
                yatırımı sıfırlamak demektir. Tutarlılık, konumlandırmanın
                en büyük dostlarından biridir.
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
              <Link href="/marka-danismanligi" className="hover:underline">
                Marka Danışmanlığı rehberi
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
            Markanızın konumlandırma cümlesi hazır mı?
          </h2>
          <p
            className="mt-4 max-w-[58ch] text-[15.5px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 68%, transparent)' }}
          >
            Konumlandırma çalışması, marka stratejisinin merkezidir. Mevcut
            konumunuzu sınamak veya yeni bir konumlandırma kurmak için Ahmet
            Furkan Budak ile görüşmeye başlayabilirsiniz.
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
      </div>
    </>
  );
}
