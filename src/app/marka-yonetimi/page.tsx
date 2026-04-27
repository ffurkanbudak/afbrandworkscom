import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PillarJsonLd } from '@/components/PillarJsonLd';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

const TITLE = 'Marka Yönetimi — Ahmet Furkan Budak';
const DESCRIPTION =
  'Marka yönetimi; marka stratejisinin günlük operasyonda disiplinli biçimde uygulanmasıdır. Marka tutarlılığı, marka sağlığı ve marka genişlemesi üzerine yazılar, rehberler ve danışmanlık.';

export const metadata: Metadata = {
  title: 'Marka Yönetimi',
  description: DESCRIPTION,
  keywords: [
    'marka yönetimi',
    'brand management',
    'marka tutarlılığı',
    'marka sağlığı',
    'marka mimarisi',
    'marka genişletme',
    'marka rehberi',
    'Ahmet Furkan Budak',
  ],
  alternates: { canonical: '/marka-yonetimi' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/marka-yonetimi`,
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
    question: 'Marka yönetimi nedir?',
    answer:
      'Marka yönetimi; marka stratejisinin günlük operasyonda disiplinli biçimde uygulanmasıdır. Kanal bazlı iletişim tutarlılığı, marka sağlığının ölçümü, marka mimarisinin korunması ve yeni ürün/pazar genişlemelerinde marka kimliğinin taşınması temel bileşenleridir.',
  },
  {
    question: 'Marka yönetimi ile marka stratejisi arasındaki fark nedir?',
    answer:
      'Marka stratejisi yönü tanımlar; marka yönetimi o yönü korur. Strateji kurucu bir karar, yönetim sürekli bir disiplindir. Strateji beş yıllık bir belge, yönetim günlük bir pratiktir.',
  },
  {
    question: 'Marka sağlığı nasıl ölçülür?',
    answer:
      'Marka sağlığı dört katmanda ölçülür. Tanınırlık (yardımsız ve yardımlı), çağrışım (hangi kavramlarla birlikte hatırlanıyor), tercih (aynı fiyat-performansta seçilme oranı) ve sadakat (tekrar kullanım ve tavsiye niyeti). Bu dört katman düzenli aralıklarla aynı metodolojiyle ölçülmelidir.',
  },
  {
    question: 'Marka genişlemesi ne zaman yapılmalı?',
    answer:
      'Marka genişlemesi (yeni ürün kategorisi, yeni coğrafya, yeni segment) ana markanın mevcut kategorideki konumunun sağlam olduğu dönemlerde gündeme alınmalıdır. Zayıf bir çekirdekten yapılan genişleme hem genişlemeyi hem de ana markayı zedeler.',
  },
  {
    question: 'Kim marka yönetimi yapar?',
    answer:
      'Küçük şirketlerde kurucu ya da pazarlama direktörü, orta ölçekli şirketlerde brand manager pozisyonu, büyük şirketlerde marka yönetim ekibi tarafından yürütülür. Düzenli dış denetim için marka danışmanı ile çalışılması sağlığı iyileştirir.',
  },
];

export default function MarkaYonetimiPage() {
  return (
    <>
      <PillarJsonLd
        slug="marka-yonetimi"
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
            Marka Yönetimi
          </p>
          <h1 className="font-display mt-4 text-[40px] leading-[1.05] tracking-tight md:text-[54px]">
            Marka yönetimi, stratejinin günlük operasyonda kaybolmadığı disiplindir.
          </h1>
          <p
            className="mt-6 max-w-[58ch] text-[17px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
          >
            Bir marka stratejisi ne kadar iyi yazılmış olursa olsun, onu
            sürdürecek yönetim disiplini olmazsa bir sene içinde aşınır. Marka
            yönetimi stratejinin korunması, ölçülmesi ve gerektiğinde
            yenilenmesi için işleyen yapıdır.
          </p>
        </header>

        <div className="mt-14 space-y-12 text-[16.5px] leading-[1.75]">
          <section>
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              Strateji ile yönetim arasındaki fark
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Marka stratejisi kurucu bir karar alma anıdır. Hangi kategoride,
                kime, hangi farklılaşma ile yer alacağımız belirlenir.
                Stratejinin doğal ömrü üç ile beş yıldır.
              </p>
              <p>
                Marka yönetimi ise stratejinin her gün uygulanmasıdır. Bir
                sosyal medya postu, bir müşteri hizmetleri yanıtı, bir yeni
                ürün kararı, bir mağaza vitrini; hepsi marka stratejisiyle
                tutarlı mı diye kontrol edilir.
              </p>
              <p>
                İyi bir yönetim olmadan iyi bir strateji kendi kendini taşımaz.
                Uygulama disiplini strateji kadar önemlidir.
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
                  Marka tutarlılığı
                </h3>
                <p className="mt-2">
                  Tüm kanallarda ses tonu, görsel kimlik ve vaat aynı kalır.
                  Tutarlılık zenginliği önler değil, aksine aidiyet üretir.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  Marka sağlığı ölçümü
                </h3>
                <p className="mt-2">
                  Yılda bir ya da iki kez; tanınırlık, çağrışım, tercih ve
                  sadakat dört katmanında ölçüm yapılır. Aynı metodolojiyle
                  tekrarlanır ki yıllar arası karşılaştırma mümkün olsun.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  Marka mimarisi
                </h3>
                <p className="mt-2">
                  Ana marka ile alt markalar, ürün markaları ve iş
                  birlikleri arasındaki hiyerarşik ilişki. Mimarinin
                  şeffaflığı, yeni ürün lansmanlarında kararların hızlı
                  alınmasını sağlar.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  Marka genişlemesi
                </h3>
                <p className="mt-2">
                  Yeni ürün, yeni coğrafya ya da yeni segment dâhil olmak
                  üzere genişleme kararları. Her genişleme ana markanın
                  konumlandırmasını doğrular ya da zayıflatır; yönetim bu
                  etkiyi önceden tartar.
                </p>
              </div>
              <div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-tight">
                  Marka krizi yönetimi
                </h3>
                <p className="mt-2">
                  Kriz anında ilk yirmi dört saat en belirleyicidir. Yönetim,
                  krizi tanıma, iletişim tonu ve geri bildirim döngüsünü
                  önceden hazır tutar; tepki değil yanıt üretir.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              Günlük pratikler
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Marka yönetimi dokümanda değil, alışkanlıklarda yaşar. Pratik
                rutinler:
              </p>
              <ul className="space-y-2 pl-5" style={{ listStyle: 'disc' }}>
                <li>
                  <strong>Aylık içerik denetimi.</strong> Yayınlanan tüm
                  içerikler marka sesiyle tutarlı mı; rastgele bir örneklem
                  üzerinde kontrol edilir.
                </li>
                <li>
                  <strong>Çeyreklik sağlık taraması.</strong> Marka sağlığı
                  göstergeleri hızlı bir dashboard üzerinden gözden geçirilir;
                  büyük sapma varsa kök neden aranır.
                </li>
                <li>
                  <strong>Yıllık stratejik inceleme.</strong> Marka
                  stratejisinin hâlâ geçerli olup olmadığı sorgulanır;
                  gerekirse güncelleme gündeme alınır.
                </li>
                <li>
                  <strong>Rakip haritasının güncellenmesi.</strong>{' '}
                  Kategorideki yeni oyuncuların, hamlelerin ve boş alanların
                  gözden geçirilmesi.
                </li>
                <li>
                  <strong>İç ekip eğitimi.</strong> Yeni katılanların marka
                  çerçevesine hızla uyum sağlaması için özetli bir onboarding
                  dokümanı.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
              Yönetim sinyalleri
            </h2>
            <div
              className="mt-4 space-y-4"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              <p>
                Markanın yönetim ihtiyacı olduğunu gösteren sinyaller:
              </p>
              <ul className="space-y-2 pl-5" style={{ listStyle: 'disc' }}>
                <li>
                  Aynı kurumun farklı kanallarından çıkan içeriklerde ton ve
                  mesaj uyumsuzluğu.
                </li>
                <li>
                  Hedef kitlenin markayı tanımlarken kullandığı kelimelerle
                  kurumun kendini tanımlarken kullandığı kelimelerin açılması.
                </li>
                <li>
                  Rakiplerle ayrışma hissinin kaybolması; müşterinin
                  "kategori farksız" değerlendirmesine geçişi.
                </li>
                <li>
                  Yeni ürün lansmanlarında marka mimarisi tartışmalarının
                  sürekli tekrar etmesi.
                </li>
                <li>
                  Yeni çalışanların markayı anlamak için harcadığı sürenin
                  uzaması.
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
              <Link href="/marka-stratejisi" className="underline">
                Marka stratejisi
              </Link>
              ,{' '}
              <Link href="/marka-danismanligi" className="underline">
                marka danışmanlığı
              </Link>{' '}
              ve{' '}
              <Link href="/dijital-markalasma" className="underline">
                dijital markalaşma
              </Link>{' '}
              sayfaları bu konunun tamamlayıcı çerçevelerini sunar. Günlük
              yazılar için{' '}
              <Link href="/posts" className="underline">
                blog arşivine
              </Link>{' '}
              bakabilirsiniz.
            </p>
          </section>
        </div>

        <section
          className="mt-20 rounded-[14px] border p-7 md:p-10"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-soft)' }}
        >
          <p className="eyebrow">Sağlık analizi</p>
          <h2 className="font-display mt-3 text-[26px] leading-[1.15] tracking-tight md:text-[30px]">
            Markanızın yönetim sağlığını birlikte gözden geçirelim.
          </h2>
          <p
            className="mt-4 max-w-[54ch] text-[15.5px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 75%, transparent)' }}
          >
            Marka sağlık analizi, mevcut yönetim pratiklerinizi ve sağlık
            göstergelerinizi uzman bir bakışla değerlendirir. Sonuç
            somut bir iyileştirme haritasıdır.
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
