import { Check, ChevronDown, Star } from 'lucide-react';
import { AvatarCircles } from '@/components/ui/avatar-circles';

const VURGU = '#DC2626';

const TAKVIM_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1um6hda1soZolvF4yY1oTMwugah-W2o-rB-jGgcJ0_eIzeTL8qR5oKuRHr6TcU8YI7oAwmI2eH?gv=true';
const WHATSAPP_URL =
  'https://wa.me/905374349566?text=' +
  encodeURIComponent('Merhaba Ahmet Bey, 1:1 Marka Danışmanlığı hakkında bilgi almak istiyorum.');

/** Google Takvim markası: dört renkli çerçeve, beyaz gövde ve tarih rakamı. */
function GoogleCalendarLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden role="img">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#4285F4" />
      <path d="M22 5v14a3 3 0 0 1-3 3h-2V2h2a3 3 0 0 1 3 3Z" fill="#FBBC04" />
      <path d="M2 17h20v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-2Z" fill="#34A853" />
      <path d="M5 2h14a3 3 0 0 1 3 3v2H2V5a3 3 0 0 1 3-3Z" fill="#EA4335" />
      <rect x="6" y="7" width="12" height="10" fill="#FFFFFF" />
      <text
        x="12"
        y="15.4"
        textAnchor="middle"
        fontSize="8.5"
        fontWeight="700"
        fontFamily="Arial, Helvetica, sans-serif"
        fill="#4285F4"
      >
        31
      </text>
    </svg>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden role="img">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2c-5.523 0-10 4.477-10 10 0 1.765.462 3.489 1.34 5.007L2 22l5.11-1.34A9.96 9.96 0 0 0 12.004 22c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18.2a8.19 8.19 0 0 1-4.174-1.14l-.299-.177-3.03.795.81-2.955-.195-.303A8.2 8.2 0 1 1 12.004 20.2z" />
    </svg>
  );
}

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
