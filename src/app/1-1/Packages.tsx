import { Check, ChevronDown, Star } from 'lucide-react';
import { AvatarCircles } from '@/components/ui/avatar-circles';

const VURGU = '#DC2626';

const AVATARLAR = [1, 2, 3, 4].map((n) => ({
  imageUrl: `https://api.dicebear.com/9.x/notionists/svg?seed=danisan-${n}&backgroundColor=ffffff`,
  profileUrl: '#randevu',
}));

type Model = {
  rozet: string;
  baslikDuz: string;
  baslikVurgu: string;
  aciklama: string;
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
    fiyat: '₺34.900',
    eskiFiyat: '₺45.000',
    dahil: [
      'Ayda 8 saat birebir görüşme (haftada bir gün, iki saat)',
      'WhatsApp üzerinden öncelikli iletişim',
      'Her görüşme sonunda yazılı yol haritası',
      'Markalaşma e-kitabı, ücretsiz',
      'Görüşme öncesi hazırlık formu',
      'Görüşmeler arasında stratejik değerlendirmeler',
      'Marka, pazarlama ve büyüme süreçlerinin birlikte ele alınması',
      'İş modeli ve konumlandırma istişareleri',
      'Aylık öncelik takibi',
      'Meet ya da Zoom üzerinden görüşme',
    ],
    kimlerIcin: 'Girişimciler, KOBİ sahipleri, e-ticaret markaları',
  },
  {
    rozet: 'Yönetim masasında yer alan model',
    baslikDuz: 'Stratejik Büyüme',
    baslikVurgu: 'Partnerliği',
    aciklama:
      'Ölçeklenme sürecindeki şirketler, kurucu ortaklar ve üst düzey yöneticiler için karar süreçlerine yakın bir çalışma.',
    fiyat: '₺59.900',
    eskiFiyat: '₺69.900',
    dahil: [
      'Ayda 12 saat birebir görüşme (haftada üç gün, birer saat)',
      'Markanıza özel tek sayfalık analiz raporu',
      'Gerektiğinde hızlı karar görüşmeleri',
      'Markalaşma e-kitabı, ücretsiz',
      'Öncelikli WhatsApp iletişimi',
      'Yönetim kararlarında stratejik değerlendirme',
      'Ajans ve tedarikçi süreçlerinde görüş',
      'Sürekli geri bildirim ve gelişim takibi',
      'Düzenli aksiyon planı',
      'Yıllık marka yol haritası',
      'Uygun durumlarda yüz yüze görüşme',
    ],
    kimlerIcin: 'Ölçeklenen şirketler, kurucu ortaklar, üst düzey yöneticiler',
  },
];

/** Kartta ilk bakışta görünen madde sayısı; kalanı açılır pencerede. */
const GORUNUR = 4;

function MaddeSatiri({ metin }: { metin: string }) {
  return (
    <li className="flex items-start gap-2.5 text-[13.5px] leading-[1.5] text-[#0A0A0A]/70">
      <Check className="mt-[3px] h-[13px] w-[13px] shrink-0" strokeWidth={2.5} style={{ color: VURGU }} />
      {metin}
    </li>
  );
}

function Yildizlar() {
  return (
    <span className="flex items-center gap-0.5" aria-label="Beş üzerinden beş">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="h-[13px] w-[13px]" style={{ color: VURGU, fill: VURGU }} />
      ))}
    </span>
  );
}

function FiyatKarti({ model }: { model: Model }) {
  return (
    <div
      className="rounded-[18px] bg-white p-7 text-[#0A0A0A] md:p-8"
      style={{ boxShadow: '0 2px 6px rgba(0,0,0,.28), 0 40px 80px -32px rgba(0,0,0,.75)' }}
    >
      <span
        className="inline-flex h-[30px] items-center gap-2 rounded-full border px-3.5 text-[11.5px] font-medium"
        style={{ borderColor: 'rgba(10,10,10,0.12)', background: 'rgba(10,10,10,0.03)' }}
      >
        <span className="h-[6px] w-[6px] shrink-0 rounded-full" style={{ background: '#16A34A' }} aria-hidden />
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
          {model.dahil.slice(0, GORUNUR).map((d) => (
            <MaddeSatiri key={d} metin={d} />
          ))}
        </ul>

        {model.dahil.length > GORUNUR && (
          <details className="group mt-3">
            <summary
              className="flex cursor-pointer list-none items-center gap-1.5 text-[13px] font-semibold [&::-webkit-details-marker]:hidden"
              style={{ color: VURGU }}
            >
              <span className="group-open:hidden">
                Devamını göster ({model.dahil.length - GORUNUR})
              </span>
              <span className="hidden group-open:inline">Daha az göster</span>
              <ChevronDown
                className="h-[13px] w-[13px] transition-transform duration-200 group-open:rotate-180"
                strokeWidth={2.5}
              />
            </summary>
            <ul className="mt-3.5 flex flex-col gap-2.5">
              {model.dahil.slice(GORUNUR).map((d) => (
                <MaddeSatiri key={d} metin={d} />
              ))}
            </ul>
          </details>
        )}
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
          Her iş birliği, markanızı tanımaya yönelik 15 dakikalık ücretsiz ön görüşme
          ile başlar.
        </p>
      </div>

      <div className="relative mx-auto mt-14 grid max-w-[980px] items-start gap-6 md:grid-cols-2">
        {MODELLER.map((model) => (
          <FiyatKarti key={model.baslikVurgu} model={model} />
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
