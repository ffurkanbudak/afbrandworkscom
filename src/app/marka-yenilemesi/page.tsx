import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PillarJsonLd } from '@/components/PillarJsonLd';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

const TITLE = 'Marka Yenilemesi (Rebranding) — Rehber';
const DESCRIPTION =
  'Marka yenilemesi (rebranding) nedir, ne zaman yapılmalı, nasıl yürütülür? Sıçramalı ve evrimsel yenileme, risk yönetimi, lansman ve iletişim stratejisi. Ahmet Furkan Budak rehberi.';

export const metadata: Metadata = {
  title: 'Marka Yenilemesi',
  description: DESCRIPTION,
  keywords: [
    'marka yenilemesi',
    'rebranding',
    'marka yenileme',
    'marka yenileme süreci',
    'logo yenileme',
    'kimlik yenilemesi',
    'rebranding nedir',
    'rebranding nasıl yapılır',
    'kurumsal kimlik yenileme',
  ],
  alternates: { canonical: '/marka-yenilemesi' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/marka-yenilemesi`,
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
    question: 'Marka yenilemesi (rebranding) nedir?',
    answer:
      'Marka yenilemesi; markanın konumlandırma, kimlik veya iletişim stratejisini bütünsel olarak yeniden ele almasıdır. Logo değişikliğinden ibaret değildir; marka vaadi, sesi, mimarisi ve deneyim kurgusu dahil olabilir. Stratejik bir eylem olduğu için estetik tatminsizlikten değil, ticari gerekçeden başlamalıdır.',
  },
  {
    question: 'Ne zaman marka yenilemesi yapılmalı?',
    answer:
      'Altı tipik tetikleyici vardır: (1) konumlandırma değişimi, (2) kategori dönüşümü, (3) hedef kitle genişlemesi, (4) birleşme veya satın alma, (5) itibar krizi sonrası toparlanma, (6) dijital çağa uyum ihtiyacı. Her biri farklı yenileme kapsamı gerektirir; gereksiz yenileme birikmiş marka değerini yitirir.',
  },
  {
    question: 'Sıçramalı mı evrimsel mi yenileme yapılmalı?',
    answer:
      'Sıçramalı yenileme radikal kopuştur; yeni kimlik, yeni ses, yeni vaat. Riski yüksek, gerekçesi güçlü olmalı. Evrimsel yenileme mevcut kimliği modernleştirir; birikmiş değer korunur. Kural: strateji gerçekten değiştiyse sıçramalı; sadece güncelleme gerekiyorsa evrimsel yaklaşım tercih edilir.',
  },
  {
    question: 'Rebranding süreci kaç aşamadan oluşur?',
    answer:
      'Genellikle beş aşamadır: (1) stratejik teşhis ve gerekçe, (2) konumlandırma ve kimlik tasarımı, (3) kanal uygulamaları ve marka kitabı, (4) iç ekip eğitimi, (5) lansman ve dış iletişim. Küçük-orta markalarda 4-8 ay, büyük kurumlarda 12-24 ay sürebilir.',
  },
  {
    question: 'Yenileme lansmanında neye dikkat edilmeli?',
    answer:
      'Üç noktaya: (1) iç ekip dışarıdan önce hazırlanmalı; çalışanlar markayı savunabilmeli, (2) iletişim hikayesi neden değişikliğin yapıldığını netleştirmeli, (3) mevcut müşterilere özel haberleşme yapılmalı. Sessizce başlayan yenileme müşterinin güvenini sarsabilir.',
  },
  {
    question: 'Rebranding başarısını nasıl ölçeriz?',
    answer:
      'İki eksende ölçülür: Marka sağlığı (farkındalık, tercih, çağrışım, NPS metrikleri lansman öncesi ve sonrası karşılaştırılır) ve ticari performans (satış, tekrar alım, fiyat elastikiyeti, yeni müşteri kazanım maliyeti). Marka yenilemesi etkisinin tam okunması genellikle 6-12 ay sürer.',
  },
];

export default function MarkaYenilemesiPage() {
  return (
    <>
      <PillarJsonLd
        slug="marka-yenilemesi"
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
            Marka Yenilemesi
          </p>
          <h1 className="font-display mt-4 text-[40px] leading-[1.05] tracking-tight md:text-[54px]">
            Rebranding, logoyu değil stratejinin yansımasını yeniden kurar.
          </h1>
          <p
            className="mt-6 max-w-[58ch] text-[17px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
          >
            Marka yenilemesi büyük bir karardır. Birikmiş marka değerini risk
            altına sokar; doğru yönetilirse büyümeye yeni bir yön açar. Bu
            rehberde yenileme türleri, tetikleyiciler, süreç, lansman ve
            ölçüm çerçevesi işleniyor.
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
            <li><a href="#tanim" className="hover:underline">1. Rebranding nedir?</a></li>
            <li><a href="#tetikleyici" className="hover:underline">2. Tetikleyiciler</a></li>
            <li><a href="#turler" className="hover:underline">3. Yenileme türleri</a></li>
            <li><a href="#surec" className="hover:underline">4. Süreç</a></li>
            <li><a href="#lansman" className="hover:underline">5. Lansman ve ölçüm</a></li>
            <li><a href="#sss" className="hover:underline">6. Sık sorulan sorular</a></li>
          </ul>
        </nav>

        <div className="mt-14 space-y-12 text-[16.5px] leading-[1.75]">
          <section id="tanim">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              1. Rebranding nedir?
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Marka yenilemesi (rebranding); markanın konumlandırma, kimlik
                ya da iletişim stratejisini bütünsel olarak yeniden ele
                almasıdır. Sıklıkla logo değişikliği ile karıştırılır ama
                logo yenileme; rebranding'in yalnızca bir parçası olabilir,
                tamamı değildir.
              </p>
              <p>
                Gerçek bir rebranding; marka vaadini, sesini, mimarisini ve
                deneyim kurgusunu da yeniden ele alır. Bu nedenle teknik
                değil stratejik bir süreçtir. Pazarlama ekibiyle sınırlı
                kalmaz; ürün, operasyon, müşteri hizmetleri ve insan
                kaynakları kararlarını da etkiler.
              </p>
              <p>
                Rebranding; birikmiş marka değerini risk altına sokan bir
                karardır. Aynı zamanda dönüşüm için açık bir fırsattır.
                Karardaki denge; neyin korunacağı ile neyin değiştirileceği
                arasında kurulur.
              </p>
            </div>
          </section>

          <section id="tetikleyici">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              2. Tetikleyiciler
            </h2>
            <ul
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <li>
                <strong>Konumlandırma değişimi:</strong> Marka yeni bir hedef
                kitleye, yeni bir rafa ya da yeni bir kategoriye geçiyorsa;
                mevcut kimlik yeni konumu taşıyamayabilir.
              </li>
              <li>
                <strong>Kategori dönüşümü:</strong> Kategori değerleri
                değişmişse (örneğin sürdürülebilirlik, dijital dönüşüm,
                deneyim ekonomisi); marka kategoride yeni anlamla yer
                tutmalı.
              </li>
              <li>
                <strong>Hedef kitle genişlemesi:</strong> Mevcut kimlik yeni
                kitle için yabancı kalıyorsa; mevcut kitleyi kaybetmeden yeni
                kitleyi dahil edecek yeniden yapılandırma gerekir.
              </li>
              <li>
                <strong>Birleşme veya satın alma:</strong> İki marka tek
                portföye girdiğinde mimari kararı alınır; füzyon, bağımsız
                devam veya emdirme modeli seçilir.
              </li>
              <li>
                <strong>İtibar krizi sonrası:</strong> Ciddi bir itibar
                hasarı sonrası yenileme; kopuş anlamı taşır. Ancak tek başına
                yenileme sorun çözmez; sorunun kökü değişmeli.
              </li>
              <li>
                <strong>Dijital çağa uyum:</strong> Eski kimlik dijital
                kanallarda okunmuyor, küçük ekranda çalışmıyor veya ses/video
                dilinde temsil edilemiyorsa evrimsel yenileme gerekebilir.
              </li>
            </ul>
          </section>

          <section id="turler">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              3. Yenileme türleri
            </h2>
            <div
              className="mt-4 space-y-6"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  a. Sıçramalı yenileme (radical rebranding)
                </h3>
                <p className="mt-2">
                  Marka radikal biçimde kopar; yeni isim, yeni kimlik, yeni
                  vaat. Konumlandırma gerçekten değiştiyse gereklidir ama
                  mevcut birikmiş değer büyük ölçüde yok sayılır. Riski
                  yüksek; gerekçesi güçlü olmalı.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  b. Evrimsel yenileme (evolutionary rebranding)
                </h3>
                <p className="mt-2">
                  Mevcut kimlik modernleştirilir, güncellenir, tutarlılığı
                  güçlendirilir. Birikmiş marka değeri korunur; hedef kitle
                  için tanınabilirlik bozulmaz. Büyük kurumların tercih ettiği
                  yaklaşım.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  c. Kısmi yenileme (partial rebranding)
                </h3>
                <p className="mt-2">
                  Sadece kimliğin belirli bir katmanı yenilenir: sadece ses
                  tonu, sadece ambalaj, sadece dijital deneyim. Dikkatli
                  yönetilirse cerrahi odak sağlar; yönetilmezse parçalı
                  kimlik yaratır.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  d. Mimari yenileme (architecture rebranding)
                </h3>
                <p className="mt-2">
                  Markanın kendisi değil; ana marka-alt marka ilişkisi
                  yeniden kurulur. Branded House'a geçiş, endorsed brand
                  yaklaşımının kaldırılması gibi kararlar buraya girer.
                  Tüketici tarafında net bir harita yaratır.
                </p>
              </div>
            </div>
          </section>

          <section id="surec">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              4. Süreç
            </h2>
            <ol
              className="mt-4 space-y-4 list-decimal pl-5"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <li>
                <strong>Stratejik teşhis:</strong> Mevcut marka sağlığı,
                pazar konumu, rekabet hareketleri ve hedef kitle beklentileri
                analiz edilir. Yenileme gerekçesi netleştirilir.
              </li>
              <li>
                <strong>Konumlandırma ve kimlik tasarımı:</strong> Yeni
                konumlandırma cümlesi yazılır; yeni kimlik (logo, tipografi,
                renk, ses tonu, görsel sistem) kurulur; marka kişiliği
                netleştirilir.
              </li>
              <li>
                <strong>Kanal uygulamaları ve marka kitabı:</strong> Yeni
                kimliğin web sitesi, sosyal medya, ambalaj, sunum, reklam
                gibi kanallarda uygulamaları hazırlanır; marka kitabı
                yazılır.
              </li>
              <li>
                <strong>İç ekip eğitimi:</strong> Çalışanlar yeni markayı
                önce öğrenir; neden değiştiğini anlar; yeni ses tonunu
                kullanmaya hazırlanır. İç eğitim lansmandan önce bitirilir.
              </li>
              <li>
                <strong>Lansman ve iletişim:</strong> Yeni markanın dış
                dünyaya açılışı. Mevcut müşterilere haberleşme, medya
                bildirimi, kanal güncellemeleri, kampanya açılışı bir takvim
                üzerinden yürütülür.
              </li>
              <li>
                <strong>İzleme ve ayar:</strong> Lansmandan sonra ilk 3-6 ay
                sağlık metrikleri ve sahadan gelen geri bildirimler izlenir;
                gerekirse ince ayarlar yapılır.
              </li>
            </ol>
          </section>

          <section id="lansman">
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              5. Lansman ve ölçüm
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Lansman; rebranding sürecinin en görünür ama en kırılgan
                aşamasıdır. Yanlış kurgulanmış bir lansman; doğru yapılmış
                bir stratejiyi bile değersizleştirebilir. Üç kritik ilke:
              </p>
              <ul className="space-y-3">
                <li>
                  <strong>İçeriden dışarı:</strong> Çalışanlar yeni markayı
                  kamuoyundan önce tanımalı; soruları yanıtlayabilmeli.
                  İçerideki belirsizlik dışarıya da yansır.
                </li>
                <li>
                  <strong>Hikaye odaklı:</strong> "Neden değiştik?" sorusunun
                  açık bir yanıtı olmalı. Mevcut müşteri için güveni koruyacak;
                  yeni kitle için kapı açacak bir hikaye kurulur.
                </li>
                <li>
                  <strong>Kanal tutarlılığı:</strong> Lansman günü web
                  sitesi, sosyal medya, ambalaj, mağaza, reklam tamamı yeni
                  kimlikle olmalı. Yarım kalmış lansman; profesyonellik
                  algısını zedeler.
                </li>
              </ul>
              <p>
                Ölçüm iki eksende yapılır. Marka metrikleri (sağlık
                taraması); farkındalık, tercih, çağrışım ve NPS'de lansman
                öncesi-sonrası karşılaştırması. Ticari metrikler; satış,
                tekrar alım, yeni müşteri maliyeti ve fiyat duyarlılığında
                değişim. İki eksen birlikte okunmadan rebranding'in gerçek
                etkisi anlaşılmaz; tam okuma genellikle 6-12 ay alır.
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
              <Link href="/marka-kimligi" className="hover:underline">
                Marka Kimliği rehberi
              </Link>
            </li>
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
              <Link href="/marka-mimarisi" className="hover:underline">
                Marka Mimarisi rehberi
              </Link>
            </li>
            <li>
              <Link href="/marka-sagligi" className="hover:underline">
                Marka Sağlığı rehberi
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
            Markanız yenilemeye mi hazırlanıyor?
          </h2>
          <p
            className="mt-4 max-w-[58ch] text-[15.5px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 68%, transparent)' }}
          >
            Doğru yenileme doğru zamanda başlar. Teşhisten lansmana kadar
            tüm süreci Ahmet Furkan Budak ile birlikte yürütebilirsiniz.
            Birikmiş marka değerini koruyan ama yeni bir yön açan bir
            rebranding planı kurarız.
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
