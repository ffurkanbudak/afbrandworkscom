import Link from 'next/link';
import { ArrowRight, Check, Gift, Heart } from 'lucide-react';
import { requireSubscriber } from '@/lib/subscriber';
import { formatDateCaps } from '@/lib/format';
import { GiftCodeRedeem } from '@/components/GiftCodeRedeem';
import { RightRequestButton } from './_components/RightRequestButton';

type Benefit = { label: string; requestable?: boolean };

const PLAN_LABEL = {
  GOZLEMCI: 'Gözlemci',
  ORTAK: 'Ortak',
  MIMARI: 'Mimari',
} as const;

const PLAN_TAGLINE = {
  GOZLEMCI: 'İçeriğin tamamına ve topluluğa ilk adım.',
  ORTAK: 'Bir danışmanla çalışma ve topluluk içinde görülme.',
  MIMARI: 'Stratejik ortaklık, raporlama ve tanıtım.',
} as const;

const BENEFITS: Record<keyof typeof PLAN_LABEL, Benefit[]> = {
  GOZLEMCI: [
    { label: 'Tüm blog yazılarına sınırsız erişim' },
    { label: 'Yazılara yorum ve beğeni hakkı' },
    { label: 'Ekibe doğrudan mesaj' },
    { label: 'Danışmana doğrudan mesaj' },
    { label: '30 dakikalık keşif görüşmesi, bir kez', requestable: true },
    { label: 'Haftalık marka bülteni' },
    { label: 'Topluluk alanına katılım' },
  ],
  ORTAK: [
    { label: 'Tüm blog yazılarına sınırsız erişim' },
    { label: 'Yazılara yorum ve beğeni hakkı' },
    { label: 'Ekibe doğrudan mesaj' },
    { label: 'Danışmana öncelikli yanıt (24 saat içinde)' },
    { label: '1 saat birebir mentörlük', requestable: true },
    { label: 'Konumlandırma, kimlik ve iletişim sağlık analizi', requestable: true },
    { label: 'Kadın Girişimci Markalaşma Programı katılımı', requestable: true },
    { label: 'Uzman blog içerikleri ve vaka analizleri' },
    { label: 'Canlı Q&A oturumları' },
    { label: 'Hazır marka araçları seti' },
    { label: 'Kapalı topluluk grubu erişimi' },
  ],
  MIMARI: [
    { label: 'Tüm blog yazılarına sınırsız erişim' },
    { label: 'Yazılara yorum ve beğeni hakkı' },
    { label: 'Ekibe doğrudan mesaj' },
    { label: 'Danışmandan aynı gün yanıt' },
    { label: '2 saat birebir mentörlük', requestable: true },
    { label: 'Tekrarlayan marka sağlık taraması', requestable: true },
    { label: 'Kadın Girişimci Markalaşma Programı katılımı', requestable: true },
    { label: 'Marka İnşa Kontrol Listesi' },
    { label: 'Uzman danışmanlık erişimi (pazarlama, hukuk, finans, dijital)', requestable: true },
    { label: 'WhatsApp öncelik hattı' },
    { label: 'Yıllık bir günlük strateji atölyesi', requestable: true },
    { label: 'Yatırımcı ve medya ağına tanıtım (yılda 3 bağlantı)', requestable: true },
    { label: 'Derinlemesine sektör raporu', requestable: true },
    { label: 'Dijital üyelik rozeti (profil + LinkedIn)' },
    { label: 'Kitap, e-kitap ve eğitim içeriklerine erken erişim' },
    { label: 'Yıllık marka sağlık raporu (PDF)', requestable: true },
    { label: 'Canlı Q&A oturumları' },
    { label: 'Hazır marka araçları seti' },
    { label: 'Kapalı topluluk grubu erişimi' },
  ],
};

export default async function PaketimPage() {
  const sub = await requireSubscriber();
  const planLabel = PLAN_LABEL[sub.plan];
  const benefits = BENEFITS[sub.plan];
  const canUpgrade = sub.plan !== 'MIMARI';

  return (
    <div className="space-y-10">
      <section
        className="rounded-2xl border p-6 md:p-8"
        style={{ borderColor: 'var(--border)', background: 'var(--bg-soft)' }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p
              className="text-[11px] font-semibold tracking-[0.14em] uppercase"
              style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
            >
              Mevcut paket
            </p>
            <h1 className="font-display mt-2 text-[30px] leading-[1.05] tracking-tight md:text-[36px]">
              {planLabel}
            </h1>
            <p
              className="mt-3 max-w-[52ch] text-[14.5px] leading-[1.6]"
              style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
            >
              {PLAN_TAGLINE[sub.plan]}
            </p>
          </div>
          <span
            className="shrink-0 rounded-full border px-3 py-1.5 text-[11.5px] font-semibold tracking-[0.1em] uppercase"
            style={{
              borderColor: 'color-mix(in oklab, var(--fg) 30%, transparent)',
              color: 'var(--fg)',
            }}
          >
            {planLabel}
          </span>
        </div>
        {canUpgrade && (
          <Link
            href="/uyelik"
            className="btn-dark mt-6 inline-flex items-center gap-2 rounded-[8px] px-4 py-2.5 text-[13px] font-semibold"
          >
            Paketi yükselt
            <ArrowRight className="h-[13px] w-[13px]" strokeWidth={2.25} />
          </Link>
        )}
      </section>

      <section>
        <p className="eyebrow">Paketinizin hakları</p>
        <p
          className="mt-2 text-[12.5px] leading-[1.6]"
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        >
          Yıldızla işaretli haklar için "Hakkımı talep et" butonu yöneticiye
          doğrudan mesaj gönderir; yönetici uygun bir zamanda size dönüş yapar.
        </p>
        <ul className="mt-5 space-y-3">
          {benefits.map((b) => (
            <li
              key={b.label}
              className="flex flex-wrap items-start justify-between gap-3 rounded-[10px] border p-4"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex items-start gap-2.5 text-[14px] leading-[1.55]">
                <Check
                  className="mt-[3px] h-[13px] w-[13px] shrink-0"
                  strokeWidth={2.25}
                  style={{ color: 'color-mix(in oklab, var(--fg) 75%, transparent)' }}
                />
                <span>{b.label}</span>
              </div>
              {b.requestable && (
                <RightRequestButton rightLabel={b.label} planLabel={planLabel} />
              )}
            </li>
          ))}
        </ul>
      </section>

      {sub.plan === 'ORTAK' && (
        <section
          className="rounded-2xl border p-6"
          style={{
            borderColor: 'color-mix(in oklab, #16A34A 30%, transparent)',
            background: 'color-mix(in oklab, #16A34A 4%, transparent)',
          }}
        >
          <div className="flex items-center gap-2">
            <Heart
              className="h-[15px] w-[15px]"
              strokeWidth={1.75}
              style={{ color: '#16A34A' }}
            />
            <p className="eyebrow" style={{ color: '#16A34A' }}>
              Toplumsal katkınız
            </p>
          </div>
          <p
            className="mt-3 text-[14px] leading-[1.6]"
            style={{ color: 'color-mix(in oklab, var(--fg) 80%, transparent)' }}
          >
            Ortak paketinden elde edilen gelirin yüzde ellisi Mehmetçik Vakfı ve
            TEMA Vakfı gibi kurumlara aktarılır. Bu uygulama bir tanıtım değil,
            platformun temel bir ilkesidir.
          </p>
          <p
            className="mt-3 text-[13px] leading-[1.55]"
            style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
          >
            Yıllık aktarım raporu{' '}
            <Link href="/kunye#sosyal-sorumluluk" className="underline">
              Künye
            </Link>{' '}
            sayfasında, bağış alan kurumların geri bildirimleriyle birlikte
            kamuyla paylaşılır.
          </p>
        </section>
      )}

      <section
        className="rounded-2xl border p-6"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Üyelik bilgisi</p>
            <p
              className="mt-3 text-[13.5px]"
              style={{ color: 'color-mix(in oklab, var(--fg) 75%, transparent)' }}
            >
              Katılım tarihi: {formatDateCaps(sub.createdAt)}
            </p>
            {sub.confirmedAt && (
              <p
                className="mt-1 text-[13.5px]"
                style={{ color: 'color-mix(in oklab, var(--fg) 75%, transparent)' }}
              >
                Onay tarihi: {formatDateCaps(sub.confirmedAt)}
              </p>
            )}
          </div>
          <Link
            href="/hesap/profil"
            className="inline-flex items-center gap-1.5 rounded-[8px] border px-3 py-2 text-[12.5px] font-medium"
            style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
          >
            Profilimi düzenle
          </Link>
        </div>
      </section>

      <GiftCodeRedeem currentPlan={sub.plan} />

      <section
        className="rounded-2xl border p-6 text-[13px] leading-[1.6]"
        style={{
          borderColor: 'var(--border)',
          color: 'color-mix(in oklab, var(--fg) 60%, transparent)',
        }}
      >
        <Gift
          className="mb-2 h-[15px] w-[15px]"
          strokeWidth={1.75}
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        />
        Aboneliğe ilişkin tüm süreçler ve ödeme koordinasyonu admin tarafından
        manuel yürütülür. Ödeme sistemi aktifleştiğinde bu bölümde otomatik
        faturalandırma bilgileri yer alacak.
      </section>
    </div>
  );
}
