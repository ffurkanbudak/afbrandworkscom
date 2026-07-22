import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

const TITLE = 'Marka Sözlüğü — Markalaşma ve Pazarlama Terimleri';
const DESCRIPTION =
  'Markalaşma, pazarlama iletişimi ve stratejik yönetim kavramlarının tanımları. Konumlandırma, farklılaşma, marka mimarisi, marka sağlığı ve daha fazlası.';

export const metadata: Metadata = {
  title: 'Marka Sözlüğü',
  description: DESCRIPTION,
  keywords: [
    'marka sözlüğü',
    'markalaşma terimleri',
    'pazarlama sözlüğü',
    'marka nedir',
    'konumlandırma nedir',
    'marka mimarisi nedir',
    'değer önerisi nedir',
    'marka kimliği nedir',
    'marka stratejisi nedir',
  ],
  alternates: { canonical: '/sozluk' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/sozluk`,
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

type Term = {
  id: string;
  term: string;
  en?: string;
  definition: string;
  related?: { label: string; href: string }[];
};

const TERMS: Term[] = [
  {
    id: 'marka',
    term: 'Marka',
    en: 'Brand',
    definition:
      'Bir ürünün, hizmetin ya da kurumun hedef kitlenin zihninde tuttuğu yer ve bu yerin arkasındaki algısal, duygusal ve işlevsel birikim. Marka yalnızca isim veya logo değildir; kategoriye, rakiplere ve kullanıcıya kıyasla oluşan bütünsel bir izlenimdir.',
  },
  {
    id: 'marka-stratejisi',
    term: 'Marka Stratejisi',
    en: 'Brand Strategy',
    definition:
      'Markanın uzun vadede hangi konumu tutacağını, hangi farklılaşma ekseniyle hareket edeceğini ve hangi değer önerisiyle büyüyeceğini tanımlayan planlama çerçevesi. Günlük pazarlama kararlarının değil, o kararların üzerine oturduğu yapının kurulmasıdır.',
    related: [{ label: 'Marka stratejisi rehberi', href: '/marka-stratejisi' }],
  },
  {
    id: 'marka-yonetimi',
    term: 'Marka Yönetimi',
    en: 'Brand Management',
    definition:
      'Stratejinin günlük uygulamaya dönüştüğü disiplin. Marka tutarlılığının korunması, marka sağlığının ölçülmesi, iletişim mimarisinin yönetilmesi ve kriz anlarında tepkinin kurgulanması gibi işlevleri kapsar.',
    related: [{ label: 'Marka yönetimi rehberi', href: '/marka-yonetimi' }],
  },
  {
    id: 'marka-danismanligi',
    term: 'Marka Danışmanlığı',
    en: 'Brand Consulting',
    definition:
      'Kurumun marka kararlarını dışarıdan bir uzmanla birlikte aldığı stratejik hizmet. Konumlandırma, kimlik, iletişim stratejisi ve büyüme mimarisi gibi alanlarda iç ekibin kör noktasında kalan kararları görünür kılar.',
    related: [{ label: 'Marka danışmanlığı rehberi', href: '/marka-danismanligi' }],
  },
  {
    id: 'konumlandirma',
    term: 'Konumlandırma',
    en: 'Positioning',
    definition:
      'Markanın kategori içinde hangi rafı tuttuğunu, kimin için var olduğunu ve rakiplerden nasıl ayrıştığını tek cümlede ifade eden stratejik karar. Her marka kararı bu cümlenin gölgesinde alınır; güçlü konumlandırma uzun vadeli bir pusula işlevi görür.',
  },
  {
    id: 'farklilasma-ekseni',
    term: 'Farklılaşma Ekseni',
    en: 'Differentiation Axis',
    definition:
      'Markanın rakiplerden ayrıldığı somut eksen. Sadece "daha iyi" olmak değil, farklı bir boyutta olmaktır; fiyat, hız, kalite, deneyim veya kimlik ekseninde olabilir. Konumlandırmanın inşası bu eksen üzerinden yapılır.',
  },
  {
    id: 'deger-onerisi',
    term: 'Değer Önerisi',
    en: 'Value Proposition',
    definition:
      'Markanın hedef kitleye neden kendisini tercih etmesi gerektiğini açıklayan net vaat. Fayda, maliyet ve rakiplerden ayrışma ekseninin birleşimidir. Somut, ölçülebilir ve hedef kitle diliyle ifade edilmesi gerekir.',
  },
  {
    id: 'marka-kimligi',
    term: 'Marka Kimliği',
    en: 'Brand Identity',
    definition:
      'Markanın görünür ve işitilir yüzü: logo, renk paleti, tipografi, görsel sistem, ton, kullanılan dil. Kimlik stratejinin yansımasıdır; stratejiden bağımsız tasarlanan kimlik, dış yüzeyde güzel görünse bile iç tutarlılık kuramaz.',
  },
  {
    id: 'marka-mimarisi',
    term: 'Marka Mimarisi',
    en: 'Brand Architecture',
    definition:
      'Bir kurumun ana markası, alt markaları, ürün hatları ve uzantıları arasındaki ilişkinin yapısal tanımı. Tek isimli (branded house), çoklu markalı (house of brands) veya melez yapılar kurulabilir. Her model stratejik trade-off gerektirir.',
  },
  {
    id: 'marka-sagligi',
    term: 'Marka Sağlığı',
    en: 'Brand Health',
    definition:
      'Markanın tanınırlık, tercih edilme, hatırlanma ve güven gibi metrikler üzerinden ölçülen stratejik performansı. Satış rakamları değil; satışı besleyen zihinsel altyapının durumunu gösterir. Düzenli sağlık taraması marka yönetiminin temel pratiğidir.',
  },
  {
    id: 'marka-vaadi',
    term: 'Marka Vaadi',
    en: 'Brand Promise',
    definition:
      'Markanın her temasta tutması beklenen söz. Reklam diline indirgenen bir slogan değil, ürün, hizmet ve deneyimin hep birlikte kanıtladığı bir tutarlılıktır. Tutulamayan vaat marka güvenini doğrudan zayıflatır.',
  },
  {
    id: 'marka-sesi',
    term: 'Marka Sesi',
    en: 'Brand Voice',
    definition:
      'Markanın yazılı ve sözlü iletişimde tuttuğu tonlama: resmi, samimi, eğitici, meydan okuyucu veya ilham veren. Ses kimliğin ayrılmaz parçasıdır; kanal değişse bile korunması beklenir.',
  },
  {
    id: 'marka-tutarliligi',
    term: 'Marka Tutarlılığı',
    en: 'Brand Consistency',
    definition:
      'Markanın her temas noktasında aynı kimlik, ses ve vaat ile karşılaşılması. Tutarlılık güvenin ön koşuludur; tutarsız temas noktaları güven birikimini dağıtır.',
  },
  {
    id: 'marka-genislemesi',
    term: 'Marka Genişlemesi',
    en: 'Brand Extension',
    definition:
      'Mevcut bir markanın yeni bir ürün kategorisine, pazara veya hedef kitleye taşınması. Doğru yönetildiğinde büyüme sağlar; yanlış yönetildiğinde ana markanın anlamını sulandırır.',
  },
  {
    id: 'rebranding',
    term: 'Rebranding',
    en: 'Rebranding',
    definition:
      'Markanın konumlandırma, kimlik veya iletişim stratejisini bütünsel olarak yeniden ele alması. Yalnızca logo değişikliği değil; marka vaadinin, sesinin ve mimarisinin yeniden kurgulanmasıdır.',
  },
  {
    id: 'marka-sadakati',
    term: 'Marka Sadakati',
    en: 'Brand Loyalty',
    definition:
      'Tüketicinin başka seçeneklere rağmen tekrar aynı markayı tercih etmesi. Sadakat; tanınırlık, memnuniyet ve bağlılık katmanlarıyla inşa edilir. Gerçek sadakat fiyat hassasiyetini düşürür ve marka değerini güçlendirir.',
  },
  {
    id: 'hedef-kitle',
    term: 'Hedef Kitle',
    en: 'Target Audience',
    definition:
      'Markanın ürün veya hizmetini öncelikli olarak sunduğu tanımlı grup. Demografi, psikografi, davranış ve ihtiyaç ekseninde kurgulanır. Net bir hedef kitle tanımı, tüm iletişim ve ürün kararlarının filtresidir.',
  },
  {
    id: 'marka-degeri',
    term: 'Marka Değeri',
    en: 'Brand Equity',
    definition:
      'Bir markanın pazar fiyatının üzerinde taşıdığı algısal ve ekonomik fazla değer. Tanınırlık, sadakat, kalite algısı ve çağrışımların birleşimiyle oluşur; satın alma kararlarını doğrudan etkiler.',
  },
  {
    id: 'marka-arketipi',
    term: 'Marka Arketipi',
    en: 'Brand Archetype',
    definition:
      'Markanın karakterini temsil eden evrensel kişilik örüntüleri: kaşif, bilge, yaratıcı, kahraman, âşık gibi. Arketipler tüketicinin markayla hızlı duygusal bağ kurmasını sağlar; iletişimde ton ve hikâye üretimini kolaylaştırır.',
  },
  {
    id: 'pazarlama-iletisimi',
    term: 'Pazarlama İletişimi',
    en: 'Marketing Communications',
    definition:
      'Markanın hedef kitlesine ulaşmak için kullandığı tüm mesaj ve kanalların yönetimi. Reklam, halkla ilişkiler, içerik, dijital pazarlama, sponsorluk ve etkinlik iletişimini kapsar. Bütünleşik yaklaşım tutarlılığı güvence altına alır.',
  },
  {
    id: 'dijital-markalasma',
    term: 'Dijital Markalaşma',
    en: 'Digital Branding',
    definition:
      'Markanın kimlik, ses ve vaadinin dijital kanallarda tutarlı şekilde uygulanması. Dijital, stratejinin ikincil sahnesi değildir; çoğu tüketici markayla ilk dijitalde karşılaşır. Web sitesi, sosyal medya, arama sonuçları ve uygulamalar ortak bir marka deneyiminin parçasıdır.',
    related: [{ label: 'Dijital markalaşma rehberi', href: '/dijital-markalasma' }],
  },
  {
    id: 'marka-hikayesi',
    term: 'Marka Hikayesi',
    en: 'Brand Storytelling',
    definition:
      'Markanın kuruluş kökeni, amacı ve vaadini insan ölçeğinde anlatan hikâye yapısı. Rasyonel fayda listelerinin ötesine geçip duygusal bir çerçeve kurar. İyi hikâye markanın hatırlanmasını kolaylaştırır.',
  },
  {
    id: 'marka-krizi',
    term: 'Marka Krizi',
    en: 'Brand Crisis',
    definition:
      'Bir markanın itibarını kısa sürede zedeleyen beklenmedik olay: ürün arızası, iletişim hatası, etik ihlal veya dış etkenler. Kriz yönetimi; ilk saatlerdeki şeffaf iletişim, sorumluluk üstlenme ve düzeltici aksiyonlarla şekillenir.',
  },
  {
    id: 'marka-mesaji',
    term: 'Marka Mesajı',
    en: 'Brand Messaging',
    definition:
      'Markanın hedef kitleye iletmek istediği ana fikirlerin yazılı çerçevesi. Konumlandırmayı günlük iletişime çeviren köprüdür; başlık, alt başlık, ürün açıklamaları ve iletişim kampanyalarının omurgasıdır.',
  },
];

export default function SozlukPage() {
  const definedTermSet = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${SITE_URL}/sozluk#definedTermSet`,
    name: 'Afbrandworks Marka Sözlüğü',
    url: `${SITE_URL}/sozluk`,
    inLanguage: 'tr-TR',
    hasDefinedTerm: TERMS.map((t) => ({
      '@type': 'DefinedTerm',
      '@id': `${SITE_URL}/sozluk#${t.id}`,
      name: t.term,
      alternateName: t.en,
      description: t.definition,
      inDefinedTermSet: { '@id': `${SITE_URL}/sozluk#definedTermSet` },
      url: `${SITE_URL}/sozluk#${t.id}`,
    })),
  };

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/sozluk#webpage`,
    url: `${SITE_URL}/sozluk`,
    name: TITLE,
    description: DESCRIPTION,
    inLanguage: 'tr-TR',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntity: { '@id': `${SITE_URL}/sozluk#definedTermSet` },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Marka Sözlüğü', item: `${SITE_URL}/sozluk` },
    ],
  };

  const sorted = [...TERMS].sort((a, b) => a.term.localeCompare(b.term, 'tr'));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSet) }}
      />

      <div className="fade-up mx-auto max-w-[780px] pt-10 md:pt-16">
        <header>
          <p
            className="text-[11px] font-semibold tracking-[0.14em] uppercase"
            style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
          >
            Marka Sözlüğü
          </p>
          <h1 className="font-display mt-4 text-[33px] leading-[1.05] tracking-tight md:text-[45px]">
            Markalaşmanın temel kavramları, kısa ve net tanımlarla.
          </h1>
          <p
            className="mt-6 max-w-[58ch] text-[17px] leading-[1.65]"
            style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
          >
            Marka stratejisinden marka mimarisine, konumlandırmadan değer
            önerisine; markalaşma disiplininin temel terimleri. Her tanım
            editoryal ölçekte yazıldı; daha derin okumalar için ilgili pillar
            sayfalara ve yazı arşivine bağlantılar.
          </p>
        </header>

        <nav
          aria-label="Terim dizini"
          className="mt-10 border-t pt-6"
          style={{ borderColor: 'var(--border)' }}
        >
          <p
            className="text-[11px] font-semibold tracking-[0.14em] uppercase"
            style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
          >
            Dizin
          </p>
          <ul
            className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 text-[14px] sm:grid-cols-2"
            style={{ color: 'color-mix(in oklab, var(--fg) 78%, transparent)' }}
          >
            {sorted.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="hover:underline">
                  {t.term}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-14 space-y-10">
          {sorted.map((t) => (
            <article
              key={t.id}
              id={t.id}
              className="border-t pt-8 scroll-mt-24"
              style={{ borderColor: 'var(--border)' }}
            >
              <h2 className="font-display text-[24px] leading-[1.2] tracking-tight md:text-[28px]">
                {t.term}
                {t.en && (
                  <span
                    className="ml-3 text-[14px] font-normal tracking-normal"
                    style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                  >
                    ({t.en})
                  </span>
                )}
              </h2>
              <p
                className="mt-4 text-[16.5px] leading-[1.75]"
                style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
              >
                {t.definition}
              </p>
              {t.related && t.related.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-3 text-[13px]">
                  {t.related.map((r) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        className="inline-flex items-center gap-1.5 hover:underline"
                        style={{ color: 'var(--fg)' }}
                      >
                        {r.label}
                        <ArrowRight className="h-[12px] w-[12px]" strokeWidth={2.25} />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        <section
          className="mt-20 border-t pt-10"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="eyebrow">Rehberler</p>
          <h2 className="font-display mt-3 text-[22px] leading-[1.15] tracking-tight md:text-[26px]">
            Daha derin okumalar için
          </h2>
          <ul
            className="mt-6 grid grid-cols-1 gap-5 text-[15px] sm:grid-cols-2"
            style={{ color: 'var(--fg)' }}
          >
            <li>
              <Link href="/marka-danismanligi" className="hover:underline">
                Marka Danışmanlığı rehberi
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
              <Link href="/posts" className="hover:underline">
                Tüm yazılar
              </Link>
            </li>
            <li>
              <Link href="/hakkinda" className="hover:underline">
                Yazar hakkında
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
