import { Check, ChevronDown, Star } from 'lucide-react';
import { AvatarCircles } from '@/components/ui/avatar-circles';
import { GoogleCalendarLogo, WhatsAppGlyph } from '@/components/ui/brand-icons';

const VURGU = '#DC2626';

const TAKVIM_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1um6hda1soZolvF4yY1oTMwugah-W2o-rB-jGgcJ0_eIzeTL8qR5oKuRHr6TcU8YI7oAwmI2eH?gv=true';
const WHATSAPP_URL =
  'https://wa.me/905374349566?text=' +
  encodeURIComponent('Merhaba Ahmet Bey, 1:1 Marka Danışmanlığı hakkında bilgi almak istiyorum.');

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
      'Markasını büyütmek isteyen girişimciler, KOBİ sahipleri ve e-ticaret markaları için düzenli bir çalışma programı.',
    fiyat: '₺34.900',
    eskiFiyat: '₺45.000',
    dahil: [
      'Aylık 8 saat birebir stratejik görüşme',
      'Görüşme dışı dönemlerde öncelikli iletişim kanalı',
      'Her oturum sonunda yazılı aksiyon planı',
      'Markalaşma e-kitabına erişim',
      'Oturum öncesi hazırlık dokümanı',
      'Görüşmeler arasında stratejik değerlendirme',
      'Marka, pazarlama ve büyüme süreçlerinin bütüncül ele alınması',
      'İş modeli ve konumlandırma danışmanlığı',
      'Aylık öncelik ve ilerleme takibi',
      'Çevrim içi görüşme altyapısı (Meet / Zoom)',
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
      'Aylık 12 saat birebir stratejik görüşme',
      'Markaya özel tek sayfalık marka analiz raporu',
      'Kritik kararlarda hızlı erişim ve değerlendirme',
      'Markalaşma e-kitabına erişim',
      'Görüşme dışı dönemlerde öncelikli iletişim kanalı',
      'Yönetim kararlarında stratejik değerlendirme',
      'Ajans ve tedarikçi süreçlerinde denetim desteği',
      'Düzenli geri bildirim ve performans takibi',
      'Aylık aksiyon planı ve ilerleme raporlaması',
      'Yıllık marka yol haritası',
      'Talep hâlinde yüz yüze görüşme',
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
      {/* Çerçeve, hero'daki "Nasıl İlerliyor?" butonuyla aynı dilde:
          köşeli 8px yarıçap, %25 opak ince çizgi, dolgusuz. */}
      <span
        className="inline-flex items-center gap-2 rounded-[8px] border px-3.5 py-2 text-[12px] font-medium"
        style={{ borderColor: 'rgba(10,10,10,0.25)' }}
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
        <p className="text-[13px] font-semibold">Bu pakete neler dahil?</p>
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

      <div className="mt-7 flex items-center gap-3">
        <a
          href={TAKVIM_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Google Takvim üzerinden ücretsiz ön görüşme planlayın"
          title="Ücretsiz ön görüşme planlayın"
          className="flex h-[52px] flex-1 items-center justify-center rounded-[10px] border transition hover:bg-black/[0.04]"
          style={{ borderColor: 'rgba(10,10,10,0.15)' }}
        >
          <GoogleCalendarLogo className="h-[26px] w-[26px]" />
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp üzerinden iletişime geçin"
          title="WhatsApp"
          className="flex h-[52px] flex-1 items-center justify-center rounded-[10px] text-white transition hover:opacity-90"
          style={{ background: '#25D366' }}
        >
          <WhatsAppGlyph className="h-[24px] w-[24px]" />
        </a>
      </div>
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
          Birlikte nasıl çalışabiliriz?
        </h2>
      </div>

      <div className="relative mx-auto mt-14 grid max-w-[980px] items-start gap-6 md:grid-cols-2">
        {MODELLER.map((model) => (
          <FiyatKarti key={model.baslikVurgu} model={model} />
        ))}
      </div>

    </div>
  );
}
