import { Check } from 'lucide-react';
import { ShineBorder } from '@/components/ui/shine-border';

const LINE = 'rgba(255,255,255,0.12)';
const MUTED = 'rgba(255,255,255,0.66)';
const FAINT = 'rgba(255,255,255,0.45)';
const RED = '#DC2626';

/* Model kartları beyaz zeminli: koyu bölüm içinde okunurluk için ters palet. */
const KART_BG = '#FFFFFF';
const KART_FG = '#0A0A0A';
const KART_MUTED = 'rgba(10,10,10,0.68)';
const KART_FAINT = 'rgba(10,10,10,0.48)';
const KART_LINE = 'rgba(10,10,10,0.12)';

type Paket = {
  etiket: string;
  baslik: string;
  fiyat: string;
  fiyatNot?: string;
  aciklama: string;
  kapsam: string[];
  kimlerIcin?: string[];
  dipnot?: string;
};

const ON_GORUSME: Paket = {
  etiket: 'Ücretsiz Tanışma Görüşmesi',
  baslik: 'Stratejik Ön Görüşme',
  fiyat: 'Ücretsiz',
  fiyatNot: '15 Dakika',
  aciklama:
    'Bu görüşme; karşılıklı tanışmak, markanın mevcut durumunu anlamak ve birlikte çalışmanın uygun olup olmadığını değerlendirmek amacıyla gerçekleştirilir.',
  kapsam: [
    'Mevcut durumun kısa analizi',
    'Temel ihtiyaçların belirlenmesi',
    'Hedeflerin değerlendirilmesi',
    'Uygun danışmanlık modelinin önerilmesi',
  ],
  dipnot: 'Bu görüşmede detaylı danışmanlık veya stratejik yol haritası sunulmaz.',
};

const PAKETLER: Paket[] = [
  {
    etiket: 'Paket I',
    baslik: 'Stratejik Marka Mentörlüğü',
    fiyat: '₺34.900',
    fiyatNot: '/ Ay',
    aciklama:
      'Markasını büyütmek isteyen girişimciler, şirket sahipleri ve yöneticiler için düzenli stratejik danışmanlık programı.',
    kapsam: [
      'Haftada 1 gün',
      'Haftalık 2 saat birebir görüşme',
      'Aylık toplam 8 saat danışmanlık',
      'WhatsApp üzerinden öncelikli iletişim',
      'Görüşmeler arasında stratejik değerlendirmeler',
      'Karşılaşılan sorunlara yönelik çözüm önerileri',
      'Marka, pazarlama ve büyüme süreçlerinin birlikte değerlendirilmesi',
      'İş modeli ve konumlandırma üzerine istişareler',
      'Öncelikli aksiyonların belirlenmesi',
      'Her görüşme sonunda uygulanabilir yol haritası',
    ],
    kimlerIcin: [
      'Marka oluşturan girişimciler',
      'KOBİ sahipleri',
      'E-ticaret markaları',
      'Yeni büyüme dönemine hazırlanan şirketler',
    ],
  },
  {
    etiket: 'Paket II',
    baslik: 'Stratejik Büyüme Partnerliği',
    fiyat: '₺59.900',
    fiyatNot: '/ Ay',
    aciklama:
      'Şirket yönetimiyle daha yakın çalışan, karar süreçlerine aktif şekilde dahil olunan üst düzey danışmanlık modeli.',
    kapsam: [
      'Haftada 3 gün',
      'Her görüşme 1 saat',
      'Aylık toplam 12 saat danışmanlık',
      'Öncelikli WhatsApp iletişimi',
      'Gerektiğinde hızlı karar görüşmeleri',
      'Yönetim kararlarında stratejik değerlendirme',
      'Sürekli geri bildirim ve gelişim takibi',
      'Düzenli aksiyon planı',
    ],
    kimlerIcin: [
      'Ölçeklenme sürecindeki şirketler',
      'Kurucu ortaklar',
      "CEO'lar",
      'Üst düzey yöneticiler',
      'Yüksek büyüme hedefleyen markalar',
    ],
  },
];

const CALISMA_MODELI = [
  'Danışmanlık süreci hazır şablonlar üzerinden ilerlemez. Her marka; sektörü, hedefleri, rekabet ortamı ve büyüme potansiyeli doğrultusunda ayrı değerlendirilir.',
  'Görüşmeler yalnızca sorun çözmeye odaklanmaz; uzun vadeli marka değeri oluşturacak stratejik kararların birlikte değerlendirilmesini kapsar.',
  'İlk adım, ücretsiz 15 dakikalık stratejik ön görüşmedir. Bu görüşmenin ardından ihtiyaç duyulan çalışma modeli belirlenerek danışmanlık süreci başlatılır.',
];

function Baslik({ children, koyu = false }: { children: React.ReactNode; koyu?: boolean }) {
  return (
    <p
      className="text-[10.5px] font-semibold tracking-[0.14em] uppercase"
      style={{ color: koyu ? KART_FAINT : FAINT }}
    >
      {children}
    </p>
  );
}

function Liste({ maddeler }: { maddeler: string[] }) {
  return (
    <ul className="mt-3.5 flex flex-col gap-2.5">
      {maddeler.map((m) => (
        <li key={m} className="flex items-start gap-2.5 text-[13.5px] leading-[1.5]">
          <span
            className="mt-[3px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full"
            style={{ background: RED }}
          >
            <Check className="h-[9px] w-[9px]" strokeWidth={3} style={{ color: '#FFFFFF' }} />
          </span>
          <span style={{ color: KART_MUTED, fontWeight: 400 }}>{m}</span>
        </li>
      ))}
    </ul>
  );
}

function Kart({ paket }: { paket: Paket }) {
  return (
    <div
      className="relative flex h-full flex-col overflow-hidden rounded-[14px] p-7"
      style={{ background: KART_BG, color: KART_FG }}
    >
      <ShineBorder borderWidth={2} duration={12} shineColor={[RED, '#F87171', RED]} />

      <Baslik koyu>{paket.etiket}</Baslik>

      <h3 className="font-display mt-3 text-[19px] leading-[1.2] tracking-tight md:text-[21px]" style={{ fontWeight: 700 }}>
        {paket.baslik}
      </h3>

      <p className="mt-4 flex items-baseline gap-2">
        <span className="font-display text-[26px] leading-none tracking-tight" style={{ fontWeight: 800 }}>
          {paket.fiyat}
        </span>
        {paket.fiyatNot && (
          <span className="text-[13px]" style={{ color: KART_MUTED, fontWeight: 400 }}>
            {paket.fiyatNot}
          </span>
        )}
      </p>

      <p className="mt-4 text-[13.5px] leading-[1.65]" style={{ color: KART_MUTED, fontWeight: 400 }}>
        {paket.aciklama}
      </p>

      <div className="my-6 h-px w-full" style={{ background: KART_LINE }} />

      <Baslik koyu>Kapsam</Baslik>
      <Liste maddeler={paket.kapsam} />

      {paket.kimlerIcin && (
        <>
          <div className="my-6 h-px w-full" style={{ background: KART_LINE }} />
          <Baslik koyu>Kimler İçin?</Baslik>
          <ul className="mt-3.5 flex flex-wrap gap-2">
            {paket.kimlerIcin.map((k) => (
              <li
                key={k}
                className="rounded-[6px] border px-2.5 py-1 text-[12.5px]"
                style={{ borderColor: KART_LINE, color: KART_MUTED, fontWeight: 400 }}
              >
                {k}
              </li>
            ))}
          </ul>
        </>
      )}

      {paket.dipnot && (
        <p className="mt-6 text-[12.5px] leading-[1.6]" style={{ color: KART_FAINT, fontWeight: 400 }}>
          {paket.dipnot}
        </p>
      )}
    </div>
  );
}

export function Packages() {
  return (
    <div className="mx-auto w-full max-w-[1240px] px-6">
      <h2
        className="font-display text-center text-[24px] tracking-tight text-white md:text-[28px]"
        style={{ fontWeight: 700 }}
      >
        Çalışma modelleri ve yatırım
      </h2>
      <p
        className="mx-auto mt-4 text-center text-[15px] leading-[1.65] md:whitespace-nowrap"
        style={{ color: MUTED, fontWeight: 300 }}
      >
        İlk adım ücretsiz ön görüşme; ardından markanıza uygun model birlikte belirlenir.
      </p>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        <Kart paket={ON_GORUSME} />
        {PAKETLER.map((p) => (
          <Kart key={p.etiket} paket={p} />
        ))}
      </div>

      <div
        className="mt-10 rounded-[14px] border p-7 md:p-8"
        style={{ background: '#141414', borderColor: LINE }}
      >
        <Baslik>Çalışma Modeli</Baslik>
        <div className="mt-4 flex flex-col gap-3.5">
          {CALISMA_MODELI.map((p) => (
            <p key={p} className="text-[14px] leading-[1.7]" style={{ color: MUTED, fontWeight: 300 }}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
