import type { Metadata } from 'next';
import { ArrowRight, Plus } from 'lucide-react';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

export const metadata: Metadata = {
  title: 'Künye · Afbrandworks',
  description:
    'afbrandworks sitesinin hakkımızda, misyon, yayın politikası, editoryal ilkeler, hedef kitle, işbirlikleri ve iletişim bilgileri.',
  alternates: { canonical: '/kunye' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/kunye`,
    title: 'Künye · Afbrandworks',
    description:
      'Yayın ilkeleri, editoryal çerçeve ve iletişim kanalları.',
  },
};

const SECTIONS: { title: string; paragraphs: string[] }[] = [
  {
    title: 'Hakkımızda',
    paragraphs: [
      'afbrandworks, Ahmet Furkan Budak’ın kişisel markasını temsil eden resmî web sitesidir. Marka, pazarlama ve girişimcilik alanlarındaki bilgi birikimini, düşüncelerini, analizlerini ve çalışmalarını bir araya getirir.',
      'İçerikler; marka inşası, stratejik konumlandırma, kurumsal iletişim, pazarlama ve sürdürülebilir büyüme ekseninde hazırlanır. Her yazı; araştırmaya, deneyime ve stratejik bakış açısına dayanarak editoryal bir anlayışla yayımlanır.',
      'Site; marka kurucuları, girişimciler, yöneticiler ve iletişim profesyonelleri için güvenilir bir başvuru kaynağı olmayı amaçlar. Güncel eğilimlerin ötesine geçerek, uzun vadeli marka değeri oluşturmaya katkı sağlayacak fikirler, değerlendirmeler ve özgün içerikler sunar.',
      'Burada yer alan tüm içerikler Ahmet Furkan Budak’ın kişisel görüşlerini, profesyonel deneyimlerini ve marka yaklaşımını yansıtmaktadır.',
    ],
  },
  {
    title: 'Misyon',
    paragraphs: [
      'Markalaşma, bir teknik ustalık alanı olarak ele alınmaktadır. Kurucuları ve ekipleri modaya kapılmadan, markalarının uzun vadeli sağlığını kuracak kararlara yönlendirmek temel hedeftir.',
      'Bu hedef iki yolla izlenir. Yazılı içerikler ve stratejik vaka analizleri yayımlanır; danışmanlık ve mentörlük kanalları açık tutulur. Başarı, etkileşim sayısıyla değil, okuyucunun marka kararlarında kazandığı netlikle ölçülmektedir.',
    ],
  },
  {
    title: 'Yayın Politikası',
    paragraphs: [
      'İçerikler üç ilke üzerine kurulur. Doğruluk, derinlik, somutluk. Yayımlanan her analiz sektör verileriyle ya da yazarın saha gözlemleriyle desteklenir. Spekülasyon bağımsız olarak etiketlenir. Pazarlama retoriğine indirgenmiş içerik yayımlanmaz.',
      'Marka vakaları incelenirken hem başarı faktörleri hem de görünür eksiklikler birlikte ele alınır. Sponsorlu içerikler her koşulda şeffaf biçimde işaretlenir. Yazarın pozisyon aldığı durumlar ayrıca belirtilir. Günlük siyaset, magazin ve kişisel tartışma gibi kapsam dışı konular yayımlanmaz; içeriğin ekseni markalaşma, girişimcilik ve iletişim stratejisi çerçevesinde tutulmaktadır.',
    ],
  },
  {
    title: 'Kurucu',
    paragraphs: [
      'Site, stratejik marka danışmanı Ahmet Furkan Budak tarafından kurulmuştur. İstinye Üniversitesi Uluslararası Ticaret ve İşletme mezunudur. IESE Business School, IE Business School ve University of Illinois gibi uluslararası kurumlarda marka yönetimi üzerine ek eğitim görmüştür.',
      'Kurumsal kariyerinde farklı sektörlerden markalara konumlandırma, marka kimliği ve iletişim stratejisi alanında danışmanlık sunmuştur. Toganworks\'ün kurucusu olarak, markalaşmanın yalnızca büyük ölçekli oyuncuların değil erken aşama girişimcilerin de erişmesi gereken bir disiplin olduğu inancıyla afbrandworks\'ü başlatmıştır. Sitenin editoryal yönünü ve içerik çerçevesini bizzat şekillendirmektedir.',
    ],
  },
  {
    title: 'Editoryal İlkeler',
    paragraphs: [
      'Her metin yayımlanmadan önce iç denetimden geçmektedir. Dört ölçüt uygulanır: argümanın doğruluğu, örneklerin güncelliği, kaynakların izlenebilirliği, dilin sadeliği.',
      'Bir metinde iddia varsa ya doğrudan veriyle ya da açık bir mantıksal akışla desteklenir. Kaynak gösterilemeyen iddialar yayımlanmaz. Abartılı nitelendirmeler, moda kavramlar ve anlamsızlaşmış jargon düzeltmeye tabi tutulur. Dil akademik değil çağdaş, ancak motivasyonel değil analitiktir. Okuyucunun zamanına saygı gösterilir.',
    ],
  },
  {
    title: 'Hedef Kitle',
    paragraphs: [
      'İçerikler öncelikli olarak dört kitle için hazırlanmaktadır. Markasını kuran veya yeniden konumlandıran kurucular, iletişim ve pazarlama ekipleri, marka stratejisine yatırım yapan kurumsal yöneticiler ve kadın girişimciler.',
      'Erken aşama girişimciler için marka kararlarının hangi sırayla verilmesi gerektiğine dair bir harita sunulur. Kurumsal ekiplere, mevcut markanın yeniden canlandırılması ya da piyasada yeniden konumlandırılması üzerine analizler aktarılır. Kadın girişimcilere, sektörel engellere rağmen görünür ve güvenilir bir marka kurmanın araçları sağlanır. İçerik teknik altyapıya ve pratik uygulamaya aynı ağırlıkta yer vermektedir.',
    ],
  },
  {
    title: 'İşbirlikleri',
    paragraphs: [
      'Site, seçili markalar, vakıflar ve eğitim kurumlarıyla uzun soluklu işbirliklerine açıktır. İşbirlikleri yazılı içerik, birlikte yürütülen vaka analizi, etkinlik ortaklığı veya sponsorluk biçiminde yürütülebilir.',
      'Her işbirliği şeffaflık çerçevesinde yürütülür. Sponsorlu içerikler her koşulda açık biçimde etiketlenir. Marka söyleminin editoryal dile etkisi reddedilir. Önerisi olan markalar iletişim kanalından başvurabilir.',
    ],
  },
  {
    title: 'İletişim',
    paragraphs: [
      'İletişim için aşağıdaki kanallar açıktır. Genel sorular, editoryal başvurular, sponsorluk ve işbirliği önerileri için: info@toganworks.com',
      'Danışmanlık ve mentörlük başvuruları da aynı e-posta üzerinden iletilebilir. Sosyal medya kanallarından gelen mesajlar da okunur; ancak resmi iletişim kanalı yukarıdaki e-posta adresidir.',
    ],
  },
];

export default function KunyePage() {
  return (
    <div className="fade-up mx-auto max-w-[860px] pt-10 md:pt-14">
      <header className="max-w-[640px]">
        <p className="eyebrow">Künye</p>
        <h1 className="font-display mt-4 text-[27px] leading-[1.05] tracking-tight md:text-[37px]">
          afbrandworks
        </h1>
        <p
          className="mt-4 max-w-[56ch] text-[15.5px] leading-[1.6]"
          style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
        >
          Yayın ilkeleri, editoryal çerçeve ve iletişim bilgileri bu sayfada
          toplanmıştır.
        </p>
      </header>

      <div className="mt-10 md:mt-12">
        {SECTIONS.map((s, i) => (
          <details key={s.title} className="acc" open={i === 0}>
            <summary>
              <span className="flex items-baseline gap-3">
                <span
                  className="font-mono text-[12px] tabular-nums"
                  style={{ color: 'color-mix(in oklab, var(--fg) 40%, transparent)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-[18px] tracking-tight md:text-[20px]">
                  {s.title}
                </span>
              </span>
              <Plus className="acc-icon h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
            </summary>
            <div
              className="acc-body max-w-[68ch] space-y-3.5 text-[15.5px] leading-[1.72] md:pl-[34px]"
              style={{ color: 'color-mix(in oklab, var(--fg) 78%, transparent)' }}
            >
              {s.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          </details>
        ))}
      </div>

      <div
        className="mt-12 flex flex-col items-start justify-between gap-4 rounded-[14px] border p-6 sm:flex-row sm:items-center"
        style={{ borderColor: 'var(--border)', background: '#FFFFFF' }}
      >
        <div>
          <p className="font-display text-[17px] tracking-tight">İletişime geçin</p>
          <p
            className="mt-1 text-[14px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 62%, transparent)' }}
          >
            Editoryal başvuru, sponsorluk ve işbirliği önerileri için.
          </p>
        </div>
        <a
          href="mailto:info@toganworks.com"
          className="inline-flex shrink-0 items-center gap-2 rounded-[8px] px-4 py-2.5 text-[13.5px] font-medium"
          style={{ background: 'var(--fg)', color: 'var(--bg)' }}
        >
          info@toganworks.com
          <ArrowRight className="h-[13px] w-[13px]" strokeWidth={2.25} />
        </a>
      </div>
    </div>
  );
}
