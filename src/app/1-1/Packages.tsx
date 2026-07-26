import { Check, ChevronDown, Star } from 'lucide-react';
import { AvatarCircles } from '@/components/ui/avatar-circles';

const VURGU = '#DC2626';
const CARD_LINE = 'rgba(255,255,255,0.09)';
const CARD_BG = '#121212';

const AVATARLAR = [1, 2, 3, 4].map((n) => ({
  imageUrl: `https://api.dicebear.com/9.x/notionists/svg?seed=danisan-${n}&backgroundColor=ffffff`,
  profileUrl: '#randevu',
}));

type AkordeonBolum = { baslik: string; sure: string; maddeler: string[] };

type Model = {
  rozet: string;
  baslikDuz: string;
  baslikVurgu: string;
  aciklama: string;
  toplamSure: string;
  bolumler: AkordeonBolum[];
  fiyat: string;
  eskiFiyat: string;
  dahil: string[];
  kimlerIcin: string;
};

const MODELLER: Model[] = [
  {
    rozet: 'Aynı dönemde sınırlı sayıda marka',
    baslikDuz: 'Stratejik Marka',
    baslikVurgu: 'Mentörlüğü',
    aciklama:
      'Markasını büyütmek isteyen girişimciler, KOBİ sahipleri ve e-ticaret markaları için düzenli bir ritim.',
    toplamSure: 'Aylık toplam süre: 8 saat',
    bolumler: [
      {
        baslik: 'Görüşme ritmi',
        sure: '8 saat / ay',
        maddeler: [
          'Haftada bir gün',
          'Haftalık iki saat birebir görüşme',
          'Meet ya da Zoom üzerinden',
        ],
      },
      {
        baslik: 'Görüşmeler arasındaki destek',
        sure: 'Süreklilik',
        maddeler: [
          'WhatsApp üzerinden öncelikli iletişim',
          'Görüşmeler arasında stratejik değerlendirmeler',
          'Karşılaşılan sorunlara çözüm önerileri',
        ],
      },
      {
        baslik: 'Birlikte ele aldıklarımız',
        sure: 'Her görüşme',
        maddeler: [
          'Marka, pazarlama ve büyüme süreçleri',
          'İş modeli ve konumlandırma istişareleri',
          'Öncelikli aksiyonların belirlenmesi',
        ],
      },
      {
        baslik: 'Elinizde kalanlar',
        sure: 'Yazılı çıktı',
        maddeler: [
          'Her görüşme sonunda uygulanabilir yol haritası',
          'Aylık öncelik takibi',
        ],
      },
    ],
    fiyat: '₺34.900',
    eskiFiyat: '₺45.000',
    dahil: [
      'Ayda 8 saat birebir görüşme',
      'WhatsApp üzerinden öncelikli iletişim',
      'Her görüşme sonunda yazılı yol haritası',
      'Aylık öncelik takibi',
    ],
    kimlerIcin: 'Girişimciler, KOBİ sahipleri, e-ticaret markaları',
  },
  {
    rozet: 'Yönetim masasında yer alan model',
    baslikDuz: 'Stratejik Büyüme',
    baslikVurgu: 'Partnerliği',
    aciklama:
      'Ölçeklenme sürecindeki şirketler, kurucu ortaklar ve üst düzey yöneticiler için karar süreçlerine yakın bir çalışma.',
    toplamSure: 'Aylık toplam süre: 12 saat',
    bolumler: [
      {
        baslik: 'Görüşme ritmi',
        sure: '12 saat / ay',
        maddeler: [
          'Haftada üç gün',
          'Her görüşme bir saat',
          'Gerektiğinde hızlı karar görüşmeleri',
        ],
      },
      {
        baslik: 'Karar süreçlerinde konum',
        sure: 'Aktif katılım',
        maddeler: [
          'Şirket yönetimiyle yakın çalışma',
          'Yönetim kararlarında stratejik değerlendirme',
          'Ajans ve tedarikçi süreçlerinde görüş',
        ],
      },
      {
        baslik: 'Takip ve ölçüm',
        sure: 'Sürekli',
        maddeler: [
          'Sürekli geri bildirim ve gelişim takibi',
          'Düzenli aksiyon planı',
          'Öncelikli WhatsApp iletişimi',
        ],
      },
      {
        baslik: 'Elinizde kalanlar',
        sure: 'Yazılı çıktı',
        maddeler: ['Yıllık marka yol haritası', 'Düzenli aksiyon planı'],
      },
    ],
    fiyat: '₺59.900',
    eskiFiyat: '₺69.900',
    dahil: [
      'Ayda 12 saat birebir görüşme',
      'Gerektiğinde hızlı karar görüşmeleri',
      'Yönetim kararlarında stratejik değerlendirme',
      'Yıllık marka yol haritası',
    ],
    kimlerIcin: 'Ölçeklenen şirketler, kurucu ortaklar, üst düzey yöneticiler',
  },
];

function Yildizlar() {
  return (
    <span className="flex items-center gap-0.5" aria-label="Beş üzerinden beş">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="h-[13px] w-[13px]" style={{ color: VURGU, fill: VURGU }} />
      ))}
    </span>
  );
}

function Akordeon({ bolumler }: { bolumler: AkordeonBolum[] }) {
  return (
    <div className="mt-6 flex flex-col gap-2.5">
      {bolumler.map((b) => (
        <details
          key={b.baslik}
          className="group rounded-[12px] border px-5 py-4"
          style={{ background: CARD_BG, borderColor: CARD_LINE }}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
            <span className="text-[14.5px] font-medium text-white">{b.baslik}</span>
            <span className="flex shrink-0 items-center gap-3">
              <span className="text-[12.5px] text-white/40">{b.sure}</span>
              <ChevronDown
                className="h-4 w-4 text-white/40 transition-transform duration-200 group-open:rotate-180"
                strokeWidth={2}
              />
            </span>
          </summary>
          <ul className="mt-4 flex flex-col gap-2.5 border-t pt-4" style={{ borderColor: CARD_LINE }}>
            {b.maddeler.map((m) => (
              <li key={m} className="flex items-start gap-2.5 text-[13.5px] leading-[1.5] text-white/65">
                <Check className="mt-[3px] h-[13px] w-[13px] shrink-0" strokeWidth={2.5} style={{ color: VURGU }} />
                {m}
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}

function FiyatKarti({ model }: { model: Model }) {
  return (
    <div
      className="rounded-[18px] bg-white p-7 text-[#0A0A0A] md:p-8"
      style={{ boxShadow: '0 2px 6px rgba(0,0,0,.28), 0 40px 80px -32px rgba(0,0,0,.75)' }}
    >
      <span className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0A]/[0.05] px-3 py-1.5 text-[11.5px] font-medium">
        <span className="h-[6px] w-[6px] rounded-full" style={{ background: '#16A34A' }} aria-hidden />
        {model.rozet}
      </span>

      <h3 className="font-display mt-5 text-[23px] leading-[1.2] tracking-tight md:text-[26px]" style={{ fontWeight: 700 }}>
        {model.baslikDuz}{' '}
        <span className="italic" style={{ color: VURGU }}>
          {model.baslikVurgu}
        </span>
      </h3>

      <p className="mt-3.5 text-[13.5px] leading-[1.65] text-[#0A0A0A]/65">{model.aciklama}</p>

      <div className="mt-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[12px] text-[#0A0A0A]/50">Aylık çalışma bedeli</p>
          <p className="font-display mt-1 text-[30px] leading-none tracking-tight" style={{ fontWeight: 800 }}>
            {model.fiyat}
          </p>
          <p className="mt-1.5 text-[12.5px] text-[#0A0A0A]/45">
            Liste fiyatı <s>{model.eskiFiyat}</s>
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <Yildizlar />
          <p className="text-[12px] text-[#0A0A0A]/55">{model.kimlerIcin.split(',')[0]} ve fazlası</p>
          <AvatarCircles avatarUrls={AVATARLAR} className="-space-x-3 [&_img]:h-7 [&_img]:w-7" />
        </div>
      </div>

      <div className="mt-7 border-t pt-6" style={{ borderColor: 'rgba(10,10,10,0.1)' }}>
        <p className="text-[13px] font-semibold">Neler dahil:</p>
        <ul className="mt-3.5 flex flex-col gap-2.5">
          {model.dahil.map((d) => (
            <li key={d} className="flex items-start gap-2.5 text-[13.5px] leading-[1.5] text-[#0A0A0A]/70">
              <Check className="mt-[3px] h-[13px] w-[13px] shrink-0" strokeWidth={2.5} style={{ color: VURGU }} />
              {d}
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#randevu"
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-[10px] px-6 py-3.5 text-[14px] font-semibold text-white transition hover:opacity-90"
        style={{ background: VURGU }}
      >
        Ücretsiz ön görüşme planlayın
      </a>
    </div>
  );
}

export function Packages() {
  return (
    <div className="relative mx-auto w-full max-w-[1180px] px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 h-[420px]"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(220,38,38,0.15), transparent 70%)',
        }}
      />

      <div className="relative text-center">
        <h2
          className="font-display text-[26px] leading-[1.15] tracking-tight text-white md:whitespace-nowrap md:text-[34px]"
          style={{ fontWeight: 700 }}
        >
          Birlikte çalışma{' '}
          <span className="italic" style={{ color: VURGU }}>
            modelleri ve yatırım
          </span>
        </h2>
        <p className="mx-auto mt-5 max-w-[46ch] text-[14px] leading-[1.65] text-white/60">
          Markanızın bulunduğu aşamaya göre iki farklı ritim. İlk adım her zaman
          15 dakikalık ücretsiz ön görüşme.
        </p>
      </div>

      <div className="relative mt-14 flex flex-col gap-16">
        {MODELLER.map((model) => (
          <div key={model.baslikVurgu} className="grid items-start gap-8 lg:grid-cols-[1fr_440px] lg:gap-10">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.14em] text-white/40 uppercase">
                Kapsam
              </p>
              <p className="mt-2 text-[13px] text-white/45">{model.toplamSure}</p>
              <Akordeon bolumler={model.bolumler} />
            </div>
            <FiyatKarti model={model} />
          </div>
        ))}
      </div>

      <p className="relative mx-auto mt-16 max-w-[62ch] text-center text-[13.5px] leading-[1.7] text-white/50">
        Kapsam, markanın ihtiyacına ve sürecin yoğunluğuna göre değişebiliyor.
        İhtiyacınız bu iki modelin dışında kalıyorsa markanıza özel bir teklif
        hazırlıyorum; detayları ücretsiz ön görüşmede birlikte konuşabiliriz.
      </p>
    </div>
  );
}
