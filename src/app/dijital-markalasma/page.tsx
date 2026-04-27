import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PillarJsonLd } from '@/components/PillarJsonLd';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

const TITLE = 'Dijital Markalaşma — Ahmet Furkan Budak';
const DESCRIPTION =
  'Dijital markalaşma; marka stratejisinin web, sosyal medya, arama, bülten ve uygulamalarda tutarlı biçimde uygulanmasıdır. Dijital kanallar markanın yansımasıdır, kendi başına strateji değildir.';

export const metadata: Metadata = {
  title: 'Dijital Markalaşma',
  description: DESCRIPTION,
  keywords: [
    'dijital markalaşma',
    'digital branding',
    'dijital marka',
    'dijital marka stratejisi',
    'sosyal medya markalaşma',
    'içerik pazarlama',
    'online marka',
    'Ahmet Furkan Budak',
  ],
  alternates: { canonical: '/dijital-markalasma' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/dijital-markalasma`,
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
    question: 'Dijital markalaşma nedir?',
    answer:
      'Dijital markalaşma; marka stratejisinin dijital kanallarda (web, sosyal medya, arama, bülten, uygulama) tutarlı biçimde uygulanmasıdır. Dijital kanallar markanın yansımasıdır; kendi başına strateji değil, stratejinin görünen yüzleridir.',
  },
  {
    question: 'Sosyal medyada aktif olmak markalaşma sağlar mı?',
    answer:
      'Tek başına sağlamaz. Sosyal medya yalnızca bir kanaldır; markanın kim olduğu ve ne vaat ettiği stratejik olarak netleşmeden sosyal medya hareketi ses gürültüsü üretir. Önce strateji, sonra kanal seçimi gelir.',
  },
  {
    question: 'Hangi dijital kanallarda olmak yeterli?',
    answer:
      'Yeterliliğin cevabı kanalın kendisinden değil hedef kitleden gelir. Hedef kitlenin zamanının büyük kısmını geçirdiği iki-üç kanalda derin olmak, sekiz kanalda yüzeysel olmaktan çok daha etkilidir. Kategorinizi, hedef kitlenizin yaş ve davranışını bilerek seçim yapın.',
  },
  {
    question: 'Dijital markalaşmada içerik mi tasarım mı önceliklidir?',
    answer:
      'İkisi de stratejinin kopyasıdır. Dışarıdan içerik ve tasarım ayrı görünse de ikisi birlikte marka sesi üretir. İçerik mesaj, tasarım sesin ton ve duruşudur; birbirinden bağımsız çalışmaz.',
  },
  {
    question: 'Dijital markalaşma bütçesi nasıl ayrılmalı?',
    answer:
      'Bütçeyi kanal değil karar yönlendirir. Marka kararı için yapılan yatırım (örneğin marka sayfası, rehber içerikler) ile kanal kararı için yapılan yatırım (reklam, kampanya) ayrı hesaplanır. İlki yılın başında belirlenir, ikincisi çeyrek bazında güncellenir.',
  },
];

export default function DijitalMarkalasmaPage() {
  return (
    <>
      <PillarJsonLd
        slug="dijital-markalasma"
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
            Dijital Markalaşma
          </p>
          <h1 className="font-display mt-4 text-[40px] leading-[1.05] tracking-tight md:text-[54px]">
            Dijital kanallar markanın yansımasıdır, kendi başına strateji değildir.
          </h1>
          <p
            className="mt-6 max-w-[58ch] text-[17px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
          >
            Dijital markalaşma; marka stratejisinin web, sosyal medya, arama,
            bülten ve uygulamalarda tutarlı biçimde uygulanmasıdır. Kanal
            başarısı değil marka tutarlılığı hedeflenir; takip ediliyor olmak
            markalaşmış olmak anlamına gelmez.
          </p>
        </header>

        <div className="mt-14 space-y-12 text-[16.5px] leading-[1.75]">
          <section>
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              Dijital markalaşma nedir?
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Dijital markalaşma, marka stratejisinin dijital kanallardaki
                görünür uzantısıdır. Web sitesi, sosyal medya hesapları, arama
                motorundaki görünürlük, e-posta bülteni, mobil uygulama ve
                dijital reklamlar; hepsi marka stratejisinin kendini gösterdiği
                yüzlerdir.
              </p>
              <p>
                Yaygın bir yanılgı, dijital kanallarda aktif olmayı
                markalaşma olarak görmektir. Takipçi sayısı, etkileşim
                oranı ya da içerik hacmi markalaşmanın göstergesi değildir;
                o kanalda var olmanın göstergesidir.
              </p>
              <p>
                Marka kararı kanal kararından önce verilir. Sosyal medya
                stratejisi, marka stratejisinin yokluğunda sadece içerik
                takvimi üretir; marka anlamı üretmez.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              Dijital kanalların marka rolü
            </h2>
            <div
              className="mt-4 space-y-5"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  Web sitesi
                </h3>
                <p className="mt-2">
                  Markanın dijital evi. Kontrol altında olan tek kanal;
                  tasarım, mesaj hiyerarşisi ve kullanıcı deneyimi tamamen
                  markanın elinde. Sosyal medyaya kıyasla sahibiyet
                  düzeyinde büyük fark yaratır.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  Sosyal medya
                </h3>
                <p className="mt-2">
                  Kiralanmış zemin. Platform değiştiğinde kitle ve erişim
                  kaybolabilir. Marka için vitrin değil, sohbet ve
                  görünürlük fonksiyonu üstlenir.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  Arama motoru
                </h3>
                <p className="mt-2">
                  Aktif niyet taşıyan kullanıcının markayı bulduğu yer.
                  Güçlü SEO, dijital markalaşmanın uzun vadeli
                  yatırımlarındandır; bugün yatırılan içerik üç yıl sonra
                  trafik üretir.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  E-posta bülteni
                </h3>
                <p className="mt-2">
                  Sahip olunan doğrudan iletişim kanalı. Algoritmaya bağımlı
                  değil; açma oranı kanal sağlığının belirgin göstergesidir.
                  Uzun vadede en sürdürülebilir dijital ilişki kurulma
                  zeminidir.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  Mobil uygulama
                </h3>
                <p className="mt-2">
                  Sadakat ve tekrar kullanımın en yüksek olduğu kanal. Ancak
                  kullanıcıya gerçek değer sunmayan bir uygulama kısa sürede
                  telefonun arka planına düşer; markanın değil ürünün
                  kanalıdır.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              Dijital markalaşma prensipleri
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <ol className="space-y-3 pl-5" style={{ listStyle: 'decimal' }}>
                <li>
                  <strong>Önce strateji, sonra kanal.</strong> Marka
                  stratejisi netleşmeden kanal seçimi yapılmaz.
                </li>
                <li>
                  <strong>Sahip olduğun kanallara öncelik.</strong> Web
                  sitesi ve e-posta bülteni platform bağımsızdır; bütçenin
                  önceliğini hak eder.
                </li>
                <li>
                  <strong>Ses tonunda tutarlılık.</strong> Aynı marka X'te
                  farklı, Instagram'da farklı, LinkedIn'de farklı konuşmaz.
                  Her kanalın gramerini kullanır ama aynı kişiliği korur.
                </li>
                <li>
                  <strong>Viralitye değil tekrara yatırım.</strong> Bir kez
                  patlayan içerik sadakatsizdir. İstikrarlı yayın markanın
                  güven birikimidir.
                </li>
                <li>
                  <strong>Performans ile marka ayrı bütçeler.</strong>{' '}
                  Reklam performansı çeyreklik hedefe bağlı, marka yatırımı
                  yıllık plana bağlıdır; ikisinin birbirini ezmemesi gerekir.
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
              <ul className="space-y-2 pl-5" style={{ listStyle: 'disc' }}>
                <li>
                  <strong>"Sosyal medyada olalım" yaklaşımı.</strong>{' '}
                  Bulunmanın kendisi strateji değil, maliyet kalemidir.
                </li>
                <li>
                  <strong>Platform trendlerinin marka önüne geçmesi.</strong>{' '}
                  Viral formatı taklit etmek, markayı trendin birinci
                  paragrafında kaybeder.
                </li>
                <li>
                  <strong>İçerik hacmi saplantısı.</strong> Haftada beş
                  post, ayda bir özenle yazılmış uzun formattan daha az
                  marka değeri üretebilir.
                </li>
                <li>
                  <strong>Performans pazarlamasına sığınma.</strong>{' '}
                  Ölçülebilir olan her şeye yatırım, ölçülmeyen marka
                  sermayesinin erimesine yol açar.
                </li>
                <li>
                  <strong>Ekip dağınıklığı.</strong> Sosyal medyayı bir
                  ekip, reklamı başka bir ekip, içeriği üçüncü bir ekip
                  yönetirken bütünleşik marka sesi kaybolur.
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
              <Link href="/marka-stratejisi" className="underline">
                marka stratejisi
              </Link>
              ,{' '}
              <Link href="/marka-yonetimi" className="underline">
                marka yönetimi
              </Link>{' '}
              ve{' '}
              <Link href="/marka-danismanligi" className="underline">
                marka danışmanlığı
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
          <p className="eyebrow">Dijital marka analizi</p>
          <h2 className="font-display mt-3 text-[26px] leading-[1.15] tracking-tight md:text-[30px]">
            Markanızın dijital yansımasının sağlığını birlikte değerlendirelim.
          </h2>
          <p
            className="mt-4 max-w-[54ch] text-[15.5px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 75%, transparent)' }}
          >
            Dijital marka sağlığı, web sitenizden sosyal medya tutarlılığınıza
            kadar her kanalda markanın nasıl göründüğünü inceler. Somut bir
            iyileştirme yol haritası çıkarılır.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
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
