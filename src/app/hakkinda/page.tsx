import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react';

import type { Metadata } from 'next';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

export const metadata: Metadata = {
  title: 'Ahmet Furkan Budak Kimdir · Stratejik Marka Danışmanı',
  description:
    'Ahmet Furkan Budak; stratejik marka danışmanı, Toganworks ve Marka İnisiyatifi kurucusu. Biyografi, eğitim, sertifikalar, uzmanlık alanları ve iletişim.',
  keywords: [
    'Ahmet Furkan Budak',
    'Ahmet Furkan Budak kimdir',
    'Ahmet Furkan Budak biyografi',
    'Ahmet Furkan Budak hakkında',
    'marka danışmanı',
    'stratejik marka danışmanı',
    'Toganworks kurucusu',
    'Marka İnisiyatifi',
    'Afbrandworks',
  ],
  alternates: { canonical: '/hakkinda' },
  openGraph: {
    type: 'profile',
    url: `${SITE_URL}/hakkinda`,
    title: 'Ahmet Furkan Budak · Stratejik Marka Danışmanı',
    description:
      'Stratejik marka danışmanı, Toganworks kurucusu. Konumlandırma, marka kimliği ve sürdürülebilir büyüme üzerine yazar.',
    images: [
      {
        url: '/ahmetfurkanbudak.jpeg',
        width: 1200,
        height: 1200,
        alt: 'Ahmet Furkan Budak',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmet Furkan Budak · Stratejik Marka Danışmanı',
    description: 'Stratejik marka danışmanı, Toganworks kurucusu.',
    images: ['/ahmetfurkanbudak.jpeg'],
  },
};

const PROFILE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/hakkinda#profilepage`,
  mainEntity: { '@id': `${SITE_URL}/#person` },
  url: `${SITE_URL}/hakkinda`,
  name: 'Ahmet Furkan Budak · Hakkında',
  inLanguage: 'tr-TR',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Hakkında', item: `${SITE_URL}/hakkinda` },
    ],
  },
};

const EDUCATION = [
  ['Lisans', 'İstinye Üniversitesi · Uluslararası Ticaret ve İşletme · 2018–2022'],
  ['Hazırlık', 'Piri Reis Üniversitesi · English Preparatory · 2018'],
];

const CERTIFICATIONS = [
  {
    title: 'Marketing: Customer Needs and Wants',
    issuer: 'IESE Business School',
    date: 'Ağustos 2023',
  },
  {
    title: 'Brand and Product Management',
    issuer: 'IE Business School',
    date: 'Ocak 2023',
  },
  {
    title: 'Global Marketing: Building Iconic Brands',
    issuer: 'University of Illinois Urbana-Champaign · Coursera',
    date: 'Kasım 2022',
  },
  {
    title: 'Brand Management',
    issuer: 'Ankara Bilim Üniversitesi',
    date: 'Ekim 2022',
  },
  {
    title: 'Certified Associate Project Management (CAPM)',
    issuer: 'PMI Türkiye Chapter',
    date: 'Ekim 2022',
  },
  {
    title: 'Online World Marketing Summit',
    issuer: 'Kotler Impact Inc.',
    date: 'Aralık 2022',
  },
  {
    title: 'Innovation Arising From the User',
    issuer: 'Massachusetts Institute of Technology · edX',
    date: 'Mart 2020',
  },
  {
    title: 'Entrepreneur: Get to Know Your Customer',
    issuer: 'Massachusetts Institute of Technology · edX',
    date: 'Ocak 2020',
  },
];

const ROLES = [
  {
    title: 'Toganworks',
    meta: 'Kurucu · Mart 2025 · Devam ediyor · İstanbul',
    body: 'Toganworks, markaların hem dijital hem de geleneksel alanlarda güçlü bir varlık oluşturmasına yardımcı olan stratejik çözümler sunar. Marka tasarımından dijital pazarlamaya kadar geniş bir yelpazede hedeflerinize ulaşmanızda size eşlik eder. Her adımda etkin yönetim ve yaratıcı çözümlerle markanızın başarısını ve büyümesini güvence altına alırız.',
  },
  {
    title: 'Marka İnisiyatifi',
    meta: 'Kurucu · Haziran 2024 · Devam ediyor · İstanbul',
    body: 'İnisiyatifi al, değişime öncülük et. Markalaşma kültürünü yaygınlaştırmak için kurulan topluluk; üniversite zirveleri, geniş katılımlı organizasyonlar ve akademi ile iş dünyası arasında etkileşim zemini oluşturuyor.',
  },
  {
    title: 'İstinye Garage Incubation Hub',
    meta: 'Startup Mentoru · Ocak 2025 · Devam ediyor · İstanbul',
    body: 'Ocak 2025’ten bu yana İstinye Garage Incubation Hub’da startup mentoru olarak erken aşama girişimcilere danışmanlık veriyorum. Bu rolde; markalaşma, kimlik oluşturma, pazarlama stratejileri ve büyüme süreçleri konularında rehberlik sağlıyorum. Girişimcilerin hedef kitlelerini belirlemelerine, etkili konumlanmalarına ve sürdürülebilir marka stratejileri geliştirmelerine destek oluyorum. Ayrıca iş modellerini güçlendirme ve pazara giriş stratejileri oluşturma süreçlerinde kendilerine yol gösteriyorum.',
  },
  {
    title: 'THK & Orion TEKMER',
    meta: 'Startup Mentoru · Haziran 2025 · Devam ediyor · Ankara',
    body: 'Haziran 2025’ten bu yana THK & ORION TEKMER bünyesinde startup mentoru olarak erken aşama girişimcilere destek veriyorum. Bu rolde; markalaşma, kimlik oluşturma, pazarlama stratejileri ve büyüme planlaması konularında stratejik rehberlik sunuyorum. Girişimcilerin hedef kitlelerini tanımlamalarına, etkili konumlanmalarına ve sürdürülebilir marka stratejileri inşa etmelerine yardımcı oluyorum. Ayrıca iş modellerini güçlendirme ve go-to-market stratejileri geliştirme süreçlerinde onlara eşlik ediyorum.',
  },
  {
    title: 'Stratejik İşler',
    meta: 'Stajyer · Şubat 2022 · Eylül 2022 · İstanbul',
    body: 'Proje yönetimi asistanlığı ve proje asistanlığı süreçlerinde görev aldım. Pazar analizi ve raporlama, B2B pazar araştırması, sektör araştırması, dış ticaret için ülke matrisi hazırlama, SWOT analizi, sosyal medya stratejisi oluşturma, benchmarking ve iş modeli tasarımı çalışmalarına katkı sağladım. Ayrıca iş vakası incelemeleri, yönetim danışmanlığı sunumları ve sosyal sorumluluk projesi geliştirme süreçlerinde yer aldım.',
  },
];

const FOCUS: string[] = [
  'Konumlandırma',
  'Farklılaşma',
  'Marka mimarisi',
  'Büyüme mimarisi',
  'Rekabet stratejisi',
  'Marka iletişimi',
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: 'Ahmet Furkan Budak kimdir?',
    answer:
      'Ahmet Furkan Budak; stratejik marka danışmanı, Toganworks Marka Ofisi ve Marka İnisiyatifi kurucusudur. Marka konumlandırma, kimlik, iletişim stratejisi ve sürdürülebilir büyüme alanlarında ulusal ve uluslararası markalara danışmanlık yapar; Afbrandworks platformunda markalaşma üzerine yayın yapar.',
  },
  {
    question: 'Hangi alanlarda uzmandır?',
    answer:
      'Marka stratejisi, marka yönetimi, marka danışmanlığı, dijital markalaşma, marka mimarisi, konumlandırma, farklılaşma, pazarlama iletişimi ve startup markalaşması temel uzmanlık alanlarıdır. Ayrıca kadın girişimciliği ve satış psikolojisi üzerine çalışmaları vardır.',
  },
  {
    question: 'Hangi eğitim ve sertifikalara sahiptir?',
    answer:
      'İstinye Üniversitesi Uluslararası Ticaret ve İşletme lisans mezunudur. IESE Business School, IE Business School, University of Illinois Urbana-Champaign, MIT gibi kurumlardan marka yönetimi, pazarlama ve inovasyon alanlarında sertifikalara sahiptir. Ayrıca PMI Türkiye onaylı CAPM sertifikalıdır.',
  },
  {
    question: 'Hangi kurumların kurucusudur?',
    answer:
      'Mart 2025’te kurduğu Toganworks Marka Ofisi’nde stratejik marka danışmanlığı hizmeti verir. Haziran 2024’te kurduğu Marka İnisiyatifi aracılığıyla markalaşma kültürünü yaygınlaştıran topluluk çalışmaları yürütür.',
  },
  {
    question: 'Nerelerde mentörlük yapar?',
    answer:
      'İstinye Garage Incubation Hub (Ocak 2025’ten beri, İstanbul) ve THK & Orion TEKMER (Haziran 2025’ten beri, Ankara) programlarında erken aşama girişimcilere markalaşma, konumlandırma, pazarlama ve büyüme stratejileri üzerine mentörlük verir.',
  },
  {
    question: 'Nerede yazar?',
    answer:
      'Afbrandworks platformunda markalaşma, pazarlama iletişimi ve marka yönetimi üzerine kendi yazı ve analizlerini yayımlar.',
  },
  {
    question: 'Kendisiyle nasıl iletişime geçilir?',
    answer:
      'afbrandworks.com/iletisim sayfası üzerinden veya info@afbrandworks.com adresinden danışmanlık, konuşma, mentörlük ve iş birliği talepleri için ulaşılabilir.',
  },
];

const FAQ_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/hakkinda#faq`,
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
};

function AccIcon() {
  return <Plus className="acc-icon h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />;
}

export default function AboutPage() {
  return (
    <div className="fade-up pt-10 md:pt-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PROFILE_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />

      <section className="max-w-[820px]">
        <p className="eyebrow">Hakkımda</p>
        <div className="mt-7 flex items-start gap-5 sm:gap-7">
          <div
            className="relative aspect-[4/5] w-[104px] shrink-0 overflow-hidden rounded-[6px] border sm:w-[128px]"
            style={{ borderColor: 'var(--border)' }}
          >
            <Image
              src="/ahmetfurkanbudak.jpeg"
              alt="Ahmet Furkan Budak"
              fill
              sizes="128px"
              className="object-cover grayscale"
              priority
            />
          </div>
          <div>
            <h1 className="font-display text-[28px] leading-[1.05] tracking-tight sm:text-[36px] md:text-[42px]">
              Ahmet Furkan Budak
            </h1>
            <p
              className="mt-2 text-[13px] font-semibold tracking-[0.04em]"
              style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
            >
              Stratejik Marka Danışmanı · Toganworks Kurucusu
            </p>
            <p
              className="mt-4 max-w-[56ch] text-[15.5px] leading-[1.6]"
              style={{ color: 'color-mix(in oklab, var(--fg) 72%, transparent)' }}
            >
              Stratejik marka danışmanı, mentör, eğitmen ve yayıncı. Markalaşma,
              bütünleşik pazarlama ve kurumsal iletişimi bir bütün olarak ele
              alıyor; markaların konumlandırma ve büyüme süreçlerini uçtan uca
              yönetiyor.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 max-w-[820px]">
        <details className="acc">
          <summary>
            <span className="font-display text-[18px] tracking-tight md:text-[20px]">Biyografi</span>
            <AccIcon />
          </summary>
          <div className="acc-body space-y-4">
            <p
              className="max-w-[64ch] text-[15.5px] leading-[1.7]"
              style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
            >
              Vizyonumun temelinde, Türk dünyasının küresel potansiyelini
              harekete geçirmek ve markaların gücüyle kültürel, ekonomik
              diplomasiye alan açmak yer alıyor. Bağımsız danışmanlık sürecimde
              ulusal ve global markalar için kurguladığım stratejik modelleri,
              Mart 2025&rsquo;te kurduğum Toganworks Marka Ofisi&rsquo;ne taşıdım.
            </p>
            <p
              className="max-w-[64ch] text-[15.5px] leading-[1.7]"
              style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
            >
              Danışmanlık ve strateji üretiminin yanı sıra Afbrandworks
              platformuyla yayıncı kimliğimi sürdürüyorum; sektörel deneyimlerimi
              ve dünyadan güncel marka haberlerini paylaşıyorum.
            </p>
          </div>
        </details>

        <details className="acc">
          <summary>
            <span className="font-display text-[18px] tracking-tight md:text-[20px]">Eğitim</span>
            <AccIcon />
          </summary>
          <dl className="acc-body space-y-4">
            {EDUCATION.map(([label, value]) => (
              <div key={label} className="grid grid-cols-1 gap-1 sm:grid-cols-[160px_1fr] sm:gap-6">
                <dt
                  className="text-[12px] font-semibold tracking-[0.12em] uppercase"
                  style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                >
                  {label}
                </dt>
                <dd className="text-[15px] leading-[1.55]" style={{ color: 'var(--fg)' }}>
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </details>

        <details className="acc">
          <summary>
            <span className="font-display text-[18px] tracking-tight md:text-[20px]">
              Lisans ve Sertifikalar
            </span>
            <AccIcon />
          </summary>
          <ul className="acc-body grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {CERTIFICATIONS.map((c) => (
              <li key={c.title}>
                <h3 className="text-[15px] font-semibold leading-[1.3] tracking-tight">
                  {c.title}
                </h3>
                <p
                  className="mt-1 text-[11.5px] font-semibold tracking-[0.1em] uppercase"
                  style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                >
                  {c.issuer} · {c.date}
                </p>
              </li>
            ))}
          </ul>
        </details>

        <details className="acc">
          <summary>
            <span className="font-display text-[18px] tracking-tight md:text-[20px]">Deneyim</span>
            <AccIcon />
          </summary>
          <ul className="acc-body space-y-7">
            {ROLES.map((r) => (
              <li key={r.title}>
                <h3 className="text-[16px] font-semibold leading-[1.25] tracking-tight">
                  {r.title}
                </h3>
                <p
                  className="mt-1 text-[11.5px] font-semibold tracking-[0.1em] uppercase"
                  style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                >
                  {r.meta}
                </p>
                <p
                  className="mt-2.5 max-w-[64ch] text-[15px] leading-[1.65]"
                  style={{ color: 'color-mix(in oklab, var(--fg) 68%, transparent)' }}
                >
                  {r.body}
                </p>
              </li>
            ))}
          </ul>
        </details>

        <details className="acc">
          <summary>
            <span className="font-display text-[18px] tracking-tight md:text-[20px]">
              Çalışma Alanları
            </span>
            <AccIcon />
          </summary>
          <div className="acc-body">
            <ul
              className="flex flex-wrap gap-x-5 gap-y-2 text-[15px]"
              style={{ color: 'color-mix(in oklab, var(--fg) 78%, transparent)' }}
            >
              {FOCUS.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          </div>
        </details>

        <details className="acc">
          <summary>
            <span className="font-display text-[18px] tracking-tight md:text-[20px]">
              Sık Sorulan Sorular
            </span>
            <AccIcon />
          </summary>
          <dl className="acc-body space-y-5">
            {FAQS.map((f) => (
              <div key={f.question}>
                <dt className="text-[15px] font-semibold leading-[1.3] tracking-tight">
                  {f.question}
                </dt>
                <dd
                  className="mt-1.5 max-w-[64ch] text-[15px] leading-[1.65]"
                  style={{ color: 'color-mix(in oklab, var(--fg) 68%, transparent)' }}
                >
                  {f.answer}
                </dd>
              </div>
            ))}
          </dl>
        </details>

        <div className="acc" style={{ borderTop: '1px solid var(--border)' }} />

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/iletisim"
            className="btn-red inline-flex items-center gap-2 rounded-[6px] px-4 py-2.5 text-[13px] font-medium"
          >
            Merhaba De
            <ArrowRight className="h-[13px] w-[13px]" strokeWidth={2.25} />
          </Link>
          <Link
            href="https://toganworks.com"
            className="inline-flex items-center gap-1.5 text-[15px] font-medium"
            style={{ color: 'var(--fg)' }}
          >
            Toganworks
            <ArrowUpRight className="h-[14px] w-[14px]" strokeWidth={1.75} />
          </Link>
        </div>
      </section>
    </div>
  );
}
