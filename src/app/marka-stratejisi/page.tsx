import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PillarJsonLd } from '@/components/PillarJsonLd';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

const TITLE = 'Marka Stratejisi — Ahmet Furkan Budak';
const DESCRIPTION =
  'Marka stratejisi; konumlandırma, farklılaşma ekseni, değer önerisi ve hedef kitle tanımından oluşan uzun vadeli planlama disiplinidir. Ahmet Furkan Budak marka stratejisi üzerine yazar ve danışmanlık sunar.';

export const metadata: Metadata = {
  title: 'Marka Stratejisi',
  description: DESCRIPTION,
  keywords: [
    'marka stratejisi',
    'brand strategy',
    'konumlandırma',
    'marka konumlandırma',
    'farklılaşma stratejisi',
    'değer önerisi',
    'marka stratejisi örneği',
    'marka stratejisi nasıl yapılır',
    'Ahmet Furkan Budak',
  ],
  alternates: { canonical: '/marka-stratejisi' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/marka-stratejisi`,
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
    question: 'Marka stratejisi nedir?',
    answer:
      'Marka stratejisi; bir markanın hedef kitlenin zihninde tuttuğu rafı tanımlayan, rakiplerden hangi eksende farklılaşacağını netleştiren ve uzun vadeli büyüme yönünü çizen planlama disiplinidir. Konumlandırma, farklılaşma ekseni, değer önerisi, hedef kitle ve marka mimarisi temel bileşenleridir.',
  },
  {
    question: 'Marka stratejisi ile pazarlama stratejisi aynı şey mi?',
    answer:
      'Değil. Marka stratejisi yönü çizer; markanın kim olduğunu ve ne vaat ettiğini tanımlar. Pazarlama stratejisi bu yönün kanal, kampanya ve mesaj düzeyinde uygulanmasıdır. Pazarlama, marka stratejisinin üzerine oturur; tersi olmaz.',
  },
  {
    question: 'Marka stratejisi nasıl yapılır?',
    answer:
      'Süreç dört adımdan oluşur. Birincisi kategori ve rakip haritasının çıkarılması. İkincisi hedef kitlenin derin içgörüsünün toplanması. Üçüncüsü konumlandırma cümlesinin ve farklılaşma ekseninin yazılması. Dördüncüsü değer önerisinin somut kanıtlarla desteklenmesi. Her adımın çıktısı yazılı belge halinde kalır.',
  },
  {
    question: 'Bir marka stratejisi ne kadar sürede kurulur?',
    answer:
      'Çalışma süresi markanın karmaşıklığına bağlıdır. Erken aşama bir girişim için dört haftada bir ilk strateji çerçevesi kurulabilir. Orta ölçekli bir kurum için sekiz-on iki hafta tipik süredir. Olgun bir kurumda yeniden konumlandırma altı aya kadar uzayabilir.',
  },
  {
    question: 'Marka stratejisinin ömrü ne kadardır?',
    answer:
      'Doğru kurulmuş bir marka stratejisi beş yıla kadar temel çerçeveyle çalışır. Yılda bir kez sağlık taraması, üç yılda bir kapsamlı inceleme yapılır. Radikal güncellemeler ancak kategori değişikliği, rekabet haritasının kırılması ya da ürün yapısının dönüşmesi halinde gereklidir.',
  },
];

export default function MarkaStratejisiPage() {
  return (
    <>
      <PillarJsonLd
        slug="marka-stratejisi"
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
            Marka Stratejisi
          </p>
          <h1 className="font-display mt-4 text-[40px] leading-[1.05] tracking-tight md:text-[54px]">
            Marka stratejisi, gürültünün üzerinde duran uzun vadeli karar zeminidir.
          </h1>
          <p
            className="mt-6 max-w-[58ch] text-[17px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
          >
            Marka stratejisi; bir markanın hedef kitlenin zihninde tuttuğu rafı
            tanımlayan, rakiplerden nasıl farklılaşacağını netleştiren ve
            uzun vadeli büyüme yönünü çizen planlama disiplinidir. Günlük
            pazarlama kararlarını değil, o kararların üzerine oturduğu
            yapıyı kurar.
          </p>
        </header>

        <div className="mt-14 space-y-12 text-[16.5px] leading-[1.75]">
          <section>
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              Strateji nedir, ne değildir?
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Marka stratejisi bir hedefler listesi değildir. Büyüme,
                tanınırlık ve sadakat gibi sonuçlar strateji değil; stratejik
                kararların tamamlanmasından doğan sonuçlardır. Bir belgede
                "hedeflerimiz şunlar" yazıyorsa bu strateji değil istek
                listesidir.
              </p>
              <p>
                Marka stratejisi aynı zamanda sadece bir konumlandırma cümlesi
                de değildir. Konumlandırma stratejinin omurgasıdır ama tek
                başına yeterli değildir. Farklılaşma ekseni, değer önerisi,
                hedef kitle ve marka mimarisi birlikte strateji çerçevesini
                oluşturur.
              </p>
              <p>
                Strateji, kararların anlaşılır biçimde yazılı olduğu bir
                çerçeve üretir. Ekip yeni bir kampanya planlarken, bir yatırım
                görüşmesinde marka sorulurken ya da bir rakibin hamlesine
                karşılık verirken bu çerçeveye dönülür.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              Temel bileşenler
            </h2>
            <div
              className="mt-4 space-y-5"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  Konumlandırma
                </h3>
                <p className="mt-2">
                  Markanın hangi kategoride, kime, hangi vaatle ve hangi
                  kanıtla hitap ettiğinin tek cümlelik ifadesi. Konumlandırma
                  dışarıdan değil zihin içinde gerçekleşir; onu fiziksel
                  olarak üretemezsiniz, ancak bütün iletişim kararlarınızla
                  işaret edersiniz.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  Farklılaşma ekseni
                </h3>
                <p className="mt-2">
                  Rakiplerin kümelendiği boyut değil, kümelenmedikleri boyut.
                  Fiyatta ya da hizmette değil; markanın kendisine özgü bir
                  zaviyede farklılaşır.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  Değer önerisi
                </h3>
                <p className="mt-2">
                  Hedef kitlenin markadan aldığı somut fayda ve ona eşlik
                  eden duygusal kazanç. Değer önerisi ne kadar somut olursa
                  hedef kitlenin zihninde o kadar tutunur.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  Hedef kitle
                </h3>
                <p className="mt-2">
                  Demografik tanımın ötesinde bir tutum tarifidir. Kimdir,
                  neyi istiyor, hangi engellerle karşılaşıyor, hangi dile
                  yanıt veriyor; bu dört soruya somut cevap üretilir.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  Marka mimarisi
                </h3>
                <p className="mt-2">
                  Bir kurum birden çok marka yönettiğinde aralarındaki
                  hiyerarşi ve ilişki yapısı. Ana marka ile alt markalar,
                  lisanslar ve iş birlikleri bu mimarinin parçalarıdır.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              Stratejinin kurulma süreci
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Süreç dört adımdan oluşur; atlanırsa sonuç eksik kalır.
              </p>
              <ol className="space-y-3 pl-5" style={{ listStyle: 'decimal' }}>
                <li>
                  <strong>Kategori ve rakip haritası.</strong> Kategoride
                  hangi oyuncular hangi eksende konumlanmış, boş alanlar
                  nerede; açık gözle haritalandırılır.
                </li>
                <li>
                  <strong>Hedef kitle içgörüsü.</strong> Anket, derinlemesine
                  görüşme ve gözlem yoluyla hedef kitlenin dili, beklentisi
                  ve engeli somut cümlelerle toplanır.
                </li>
                <li>
                  <strong>Konumlandırma ve farklılaşma.</strong> Kategori
                  haritası ile kitle içgörüsü kesiştirilerek markanın rafı
                  ve farklılaşma ekseni tanımlanır.
                </li>
                <li>
                  <strong>Değer önerisi ve kanıt.</strong> Farklılaşma iddiası
                  somut kanıtlarla desteklenir; iddia ile uygulama arasındaki
                  mesafe kontrol edilir.
                </li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              Yaygın hatalar
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Strateji çalışmalarında en çok karşılaşılan hatalar:
              </p>
              <ul className="space-y-2 pl-5" style={{ listStyle: 'disc' }}>
                <li>
                  <strong>"Herkese hitap edelim" reflexi.</strong> Geniş
                  hedef kitle konforlu görünür ama farklılaşma üretmez.
                </li>
                <li>
                  <strong>Soyut kavramlar.</strong> "Kalite", "yenilik",
                  "sürdürülebilirlik" gibi kelimeler rakiplerden ayrışmayı
                  sağlamaz; somut kanıt olmadan anlamsızdır.
                </li>
                <li>
                  <strong>Operasyonla kopukluk.</strong> Yazılı strateji
                  ile gerçek operasyon birbirinden uzaksa strateji yalnızca
                  sunum belgesinde kalır.
                </li>
                <li>
                  <strong>Kısa vadeli baskı.</strong> Stratejinin sonuçları
                  görünmeden önce kısa vadeli pazarlama hamleleri altında
                  ezilip unutulur.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              Sık sorulan sorular
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

          <section>
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              İlgili okumalar
            </h2>
            <p
              className="mt-4 text-[15.5px] leading-[1.65]"
              style={{ color: 'color-mix(in oklab, var(--fg) 80%, transparent)' }}
            >
              Bu sayfa{' '}
              <Link href="/marka-danismanligi" className="underline">
                marka danışmanlığı
              </Link>
              ,{' '}
              <Link href="/marka-yonetimi" className="underline">
                marka yönetimi
              </Link>{' '}
              ve{' '}
              <Link href="/dijital-markalasma" className="underline">
                dijital markalaşma
              </Link>{' '}
              sayfalarıyla birlikte okunmak üzere hazırlanmıştır. Günlük
              yazılar için{' '}
              <Link href="/posts" className="underline">
                blog arşivine
              </Link>{' '}
              göz atabilirsiniz.
            </p>
          </section>
        </div>

        <section
          className="mt-20 rounded-[14px] border p-7 md:p-10"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-soft)' }}
        >
          <p className="eyebrow">Çalışma fırsatı</p>
          <h2 className="font-display mt-3 text-[26px] leading-[1.15] tracking-tight md:text-[30px]">
            Markanızın stratejik çerçevesini birlikte kuralım.
          </h2>
          <p
            className="mt-4 max-w-[54ch] text-[15.5px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 75%, transparent)' }}
          >
            Marka stratejisi çalışması için iletişime geçebilirsiniz.
            Yeterli ön bilgi sağlandığında üç iş günü içinde format önerisi
            iletilir.
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
              href="/marka-danismanligi"
              className="inline-flex items-center gap-2 rounded-[8px] border px-5 py-3 text-[13.5px] font-medium"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
            >
              Marka danışmanlığını inceleyin
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
