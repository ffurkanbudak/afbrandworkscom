import type { Metadata } from 'next';
import { ActivePackageCard } from './_components/ActivePackageCard';
import { WaitlistPackageCard } from './_components/WaitlistPackageCard';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com';

export const metadata: Metadata = {
  title: 'Üyelik · Afbrandworks',
  description:
    'Üç farklı yakınlık seviyesi. Gözlemci ücretsizdir; Ortak ve Mimari paketleri için ön kayıt açıktır.',
  alternates: { canonical: '/uyelik' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/uyelik`,
    title: 'Üyelik · Afbrandworks',
    description:
      'İçeriğe, danışmanlığa ve topluluk alanına üç farklı yakınlık seviyesi.',
  },
};

const GOZLEMCI = {
  name: 'Gözlemci',
  subtitle: 'Giriş Paketi · Ücretsiz',
  tagline:
    'İçeriğin tamamına ve topluluğa ilk adım. Kapı açık, içeri buyurun.',
  features: [
    'Tüm blog yazılarına sınırsız erişim',
    'Yazılara yorum ve beğeni hakkı',
    'Ekibe doğrudan mesaj',
    'Danışmana doğrudan mesaj',
    '30 dakikalık keşif görüşmesi, bir kez',
    'Haftalık marka bülteni',
    'Topluluk alanına katılım',
  ],
};

const ORTAK = {
  name: 'Ortak',
  subtitle: 'Orta Paket',
  tagline:
    'Bir danışmanla çalışma ve topluluk içinde görülme seviyesi. Gelirin yarısı Mehmetçik Vakfı ve TEMA Vakfı gibi kurumlara aktarılır.',
  features: [
    'Tüm blog yazılarına sınırsız erişim',
    'Yazılara yorum ve beğeni hakkı',
    'Ekibe doğrudan mesaj',
    'Danışmana doğrudan mesaj, öncelikli yanıt 24 saat içinde',
    '1 saat birebir mentörlük',
    'Markanızın konumlandırma, kimlik ve iletişim sağlığının analizi',
    'Kadın Girişimci Markalaşma Programı\'na katılım hakkı',
    'Uzman blog içerikleri ve vaka analizleri',
    'Canlı Q&A oturumları',
    'Hazır marka araçları seti, konumlandırma, ses tonu ve mesaj çerçeveleri',
    'Kapalı topluluk grubuna erişim',
    'Toplumsal Katkı Taahhüdü. Bu paketin gelirinin %50\'si Mehmetçik Vakfı ve TEMA Vakfı gibi kurumlara aktarılır. Üyenin panelinde kaynağın izi şeffaf biçimde sunulur.',
  ],
};

const MIMARI = {
  name: 'Mimari',
  subtitle: 'Üst Paket',
  tagline:
    'Markasını stratejik ortaklıkla kuran, raporlanan ve tanıtılan kurucular için.',
  features: [
    'Tüm blog yazılarına sınırsız erişim',
    'Yazılara yorum ve beğeni hakkı',
    'Ekibe doğrudan mesaj',
    'Danışmana doğrudan mesaj, aynı gün yanıt',
    '2 saat birebir mentörlük',
    'Markanızın tekrarlayan sağlık taraması',
    'Kadın Girişimci Markalaşma Programı\'na katılım hakkı',
    'Marka İnşa Kontrol Listesi, aşama aşama ilerleme çerçevesi',
    'Farklı alanlardan uzmanlara erişim imkanı. Pazarlama, iletişim, hukuk, finans ve dijital dönüşüm danışmanlığı',
    'WhatsApp öncelik hattı',
    'Yıllık bir günlük strateji atölyesi',
    'Yatırımcı, medya ve marka ağına tanıtım hakkı, yılda üç bağlantı',
    'Derinlemesine sektör raporu',
    'Dijital üyelik rozeti, profil ve LinkedIn',
    'Kitap, e-kitap ve eğitim içeriklerine erken erişim',
    'Yıllık marka sağlık raporu, yatırımcı sunumlarında kullanılabilir PDF',
    'Uzman blog içerikleri ve vaka analizleri',
    'Canlı Q&A oturumları',
    'Hazır marka araçları seti',
    'Kapalı topluluk grubuna erişim',
  ],
};

export default function UyelikPage() {
  return (
    <div className="fade-up pt-10 md:pt-16">
      <header className="mx-auto max-w-[760px] text-center">
        <p
          className="text-[11px] font-semibold tracking-[0.14em] uppercase"
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          Üyelik
        </p>
        <h1 className="font-display mt-4 text-[40px] leading-[1.05] tracking-tight md:text-[52px]">
          Üç paket, üç farklı yakınlık seviyesi.
        </h1>
        <p
          className="mx-auto mt-5 max-w-[58ch] text-[16px] leading-[1.65]"
          style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
        >
          Gözlemci ücretsizdir ve içeriğin tamamına erişim sağlar. Ortak ve
          Mimari belirli anlarda açılır. Açıldığında haberdar olmak için ön
          kayıt listesine bırakacağınız e-posta yeterlidir.
        </p>
      </header>

      <div className="mx-auto mt-14 grid max-w-[1200px] grid-cols-1 gap-6 md:mt-20 md:grid-cols-3">
        <ActivePackageCard
          name={GOZLEMCI.name}
          subtitle={GOZLEMCI.subtitle}
          tagline={GOZLEMCI.tagline}
          features={GOZLEMCI.features}
        />
        <WaitlistPackageCard
          plan="ORTAK"
          name={ORTAK.name}
          subtitle={ORTAK.subtitle}
          tagline={ORTAK.tagline}
          features={ORTAK.features}
        />
        <WaitlistPackageCard
          plan="MIMARI"
          name={MIMARI.name}
          subtitle={MIMARI.subtitle}
          tagline={MIMARI.tagline}
          features={MIMARI.features}
        />
      </div>

      <p
        className="mx-auto mt-12 max-w-[60ch] text-center text-[12.5px] leading-[1.65]"
        style={{ color: 'color-mix(in oklab, var(--fg) 50%, transparent)' }}
      >
        Ortak ve Mimari paketleri için ön kayıt listesindekilere, paketler
        aktifleştiğinde öncelikli bildirim ulaştırılır ve ilk üyelere özel
        koşullar sunulur.
      </p>
    </div>
  );
}
