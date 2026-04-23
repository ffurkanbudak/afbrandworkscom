import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com';

export const metadata: Metadata = {
  title: 'Künye · Afbrandworks',
  description:
    'afbrandworks platformunun hakkımızda, misyon, yayın politikası, editoryal ilkeler, topluluk kuralları, sosyal sorumluluk ve iletişim bilgileri.',
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
      'afbrandworks, marka inşası ve konumlandırma üzerine yazan, tartışan ve öğreten bir topluluk alanıdır. Toganworks\'ün içerik ve topluluk kolu olarak kurulmuştur. Marka kuran kurucular, erken aşama girişimciler, iletişim ve pazarlama ekipleri ile strateji üzerine düşünen kurumsal okuyucular için güvenilir bir başvuru noktası olmak temel amaçtır.',
      'Yayıncılık, günlük akımlar üzerine değil, sürdürülebilir marka mimarisi üzerine kuruludur. Konumlandırma, marka kimliği, iletişim dili, satış psikolojisi ve sürdürülebilir büyüme ana eksenleri oluşturur. Kısa vadeli pazarlama hareketleri yerine, markanın uzun ömürlü kararlarına odaklanılır.',
      'Platform, bir yayın organının editoryal ciddiyetini bir topluluğun canlılığıyla birleştirmeyi amaçlar. Her içerik editoryal denetimden geçer. Her tartışma belirli bir çerçeveyi korur. Üye olmak rastgele bir listeye eklenmek değil, aynı konuları ciddiye alan bir çemberin içine girmektir.',
    ],
  },
  {
    title: 'Misyon',
    paragraphs: [
      'Markalaşmayı bir teknik ustalık alanı olarak ele alıyoruz. Kurucuları ve ekipleri, modaya kapılmadan, markalarının uzun vadeli sağlığını kuracak kararları verme noktasına götürmek temel hedeftir.',
      'Bunu üç yoldan yaparız. Yazılı içerikler ve stratejik vaka analizleri paylaşırız. Danışmanlık ve mentörlük kanalları açık tutarız. Topluluk alanında kurucuların birbirinden öğrenmesini mümkün kılarız. Platformun başarısını etkileşim sayısıyla değil, okuyucunun marka kararlarında kazandığı netlikle ölçeriz.',
    ],
  },
  {
    title: 'Yayın Politikası',
    paragraphs: [
      'İçerikler üç ilke üzerine kurulur. Doğruluk, derinlik, somutluk. Yayımlanan her analiz sektör verileriyle ya da yazarın saha gözlemleriyle desteklenir. Spekülasyon bağımsız olarak etiketlenir. Pazarlama retoriğine indirgenmiş içerik yayımlanmaz.',
      'Marka vakaları incelenirken hem başarı faktörleri hem de görünür eksiklikler birlikte ele alınır. Sponsorlu içerikler her koşulda şeffaf biçimde işaretlenir. Editoryal ekibin pozisyon aldığı durumlar ayrıca belirtilir. Günlük siyaset, magazin ve kişisel tartışma gibi kapsam dışı konular yayımlanmaz; platformun ekseni markalaşma, girişimcilik ve iletişim stratejisi çerçevesinde tutulur.',
    ],
  },
  {
    title: 'Kurucu',
    paragraphs: [
      'Platform, stratejik marka danışmanı Ahmet Furkan Budak tarafından kurulmuştur. İstinye Üniversitesi Uluslararası Ticaret ve İşletme mezunudur. IESE Business School, IE Business School ve University of Illinois gibi uluslararası kurumlarda marka yönetimi üzerine ek eğitim görmüştür.',
      'Kurumsal kariyerinde farklı sektörlerden markalara konumlandırma, marka kimliği ve iletişim stratejisi alanında danışmanlık sunmuştur. Toganworks\'ün kurucusu olarak, markalaşmanın yalnızca büyük ölçekli oyuncuların değil erken aşama girişimcilerin de erişmesi gereken bir disiplin olduğu inancıyla afbrandworks\'ü başlatmıştır. Platformun editoryal yönünü ve içerik çerçevesini bizzat şekillendirir.',
    ],
  },
  {
    title: 'Editoryal İlkeler',
    paragraphs: [
      'Her metin yayımlanmadan önce iç denetimden geçer. Editoryal ekip dört ölçüt uygular. Argümanın doğruluğu, örneklerin güncelliği, kaynakların izlenebilirliği, dilin sadeliği.',
      'Bir metinde iddia varsa ya doğrudan veriyle ya da açık bir mantıksal akışla desteklenir. Kaynak gösterilemeyen iddialar yayımlanmaz. Abartılı nitelendirmeler, moda kavramlar ve anlamsızlaşmış jargon düzeltmeye tabi tutulur. Dil akademik değil çağdaş, ancak motivasyonel değil analitiktir. Okuyucunun zamanına saygı gösterilir.',
    ],
  },
  {
    title: 'Hedef Kitle',
    paragraphs: [
      'Platform öncelikli olarak dört kitle için içerik üretir. Markasını kuran veya yeniden konumlandıran kurucular, iletişim ve pazarlama ekipleri, marka stratejisine yatırım yapan kurumsal yöneticiler ve kadın girişimciler.',
      'Erken aşama girişimciler için marka kararlarının hangi sırayla verilmesi gerektiğine dair bir harita sunulur. Kurumsal ekiplere, mevcut markanın yeniden canlandırılması ya da piyasada yeniden konumlandırılması üzerine analizler aktarılır. Kadın girişimcilere, sektörel engellere rağmen görünür ve güvenilir bir marka kurmanın araçları sağlanır. İçerik teknik altyapıya ve pratik uygulamaya aynı ağırlıkta yer verir.',
    ],
  },
  {
    title: 'Topluluk Kuralları',
    paragraphs: [
      'Platform üzerindeki her etkileşim belirli bir çerçevede yürütülür. Kurallar kısıtlama olarak değil, niteliği koruyan bir zemin olarak ele alınmalıdır.',
      'Her kullanıcı gerçek kimliğiyle katılır. Anonim paylaşım kabul edilmez. Profil bilgilerinde doğru bilgiler beklenir. Yorumlar ve forum paylaşımları markalaşma, pazarlama, girişimcilik ve iletişim eksenleri içinde kalır. Kapsam dışı konular, kişisel saldırılar, küfür ve aşağılayıcı dil kabul edilmez.',
      'Eleştirinin önüne engel konmaz. Eleştiri argümanlı olduğu ve somut bir noktaya dokunduğu sürece teşvik edilir. Tekrarlayan ihlallerde kullanıcının erişimi geçici olarak askıya alınır. Yönetici denetimi şeffaf biçimde uygulanır.',
    ],
  },
  {
    title: 'Sosyal Sorumluluk',
    paragraphs: [
      'Platformun Ortak paketinden elde edilen gelirin yüzde ellisi Mehmetçik Vakfı ve TEMA Vakfı gibi kurumlara aktarılır. Bu uygulama bir tanıtım stratejisi olarak değil, platformun temel bir ilkesi olarak tasarlanmıştır.',
      'Her üyenin profil panelinde o ay aktarılan tutarın şeffaf izi sunulur. Yıl sonunda toplam aktarım raporu yayımlanır. Rapor, bağış alan kurumların geri bildirimleriyle birlikte kamuyla paylaşılır. Markalaşmanın bir kazanç alanı olduğu kadar bir sorumluluk alanı olduğuna inanılır.',
    ],
  },
  {
    title: 'İşbirlikleri',
    paragraphs: [
      'Platform, seçili markalar, vakıflar ve eğitim kurumlarıyla uzun soluklu işbirliklerine açıktır. İşbirlikleri yazılı içerik, birlikte yürütülen vaka analizi, etkinlik ortaklığı veya sponsorluk biçiminde yürütülebilir.',
      'Her işbirliği editoryal ekip tarafından şeffaflık çerçevesine alınır. Sponsorlu içerikler her koşulda açık biçimde etiketlenir. Marka söyleminin editoryal dile etkisi reddedilir. Sponsorluk tarafında üç seviyeli bir yapı uygulanır: günlük, aylık ve üç aylık. Önerisi olan markalar iletişim kanalından başvurabilir.',
    ],
  },
  {
    title: 'İletişim',
    paragraphs: [
      'Platform ile iletişim için aşağıdaki kanallar açıktır. Genel sorular, editoryal başvurular, sponsorluk ve işbirliği önerileri için: iletisim@afbrandworks.com',
      'Danışmanlık ve mentörlük başvuruları için üyelik panelindeki doğrudan mesaj hattı kullanılabilir. Sosyal medya kanallarından gelen mesajlar da okunur; ancak resmi iletişim kanalı yukarıdaki e-posta adresidir.',
      'Yanıt süresi paket seviyesine göre değişir. Gözlemci için beş iş günü, Ortak için yirmi dört saat, Mimari için aynı gün yanıt verilir.',
    ],
  },
];

export default function KunyePage() {
  return (
    <div className="fade-up mx-auto max-w-[780px] pt-10 md:pt-16">
      <header>
        <p
          className="text-[11px] font-semibold tracking-[0.14em] uppercase"
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          Künye
        </p>
        <h1 className="font-display mt-4 text-[40px] leading-[1.05] tracking-tight md:text-[52px]">
          afbrandworks
        </h1>
        <p
          className="mt-5 max-w-[58ch] text-[16px] leading-[1.65]"
          style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
        >
          Yayın ilkeleri, editoryal çerçeve, topluluk kuralları ve iletişim
          bilgileri bu sayfada toplanmıştır.
        </p>
      </header>

      <div className="mt-14 space-y-14 md:mt-20 md:space-y-16">
        {SECTIONS.map((s) => (
          <section key={s.title}>
            <h2
              className="font-display text-[22px] leading-[1.2] tracking-tight md:text-[26px]"
            >
              {s.title}
            </h2>
            <div
              className="mt-4 space-y-4 text-[16px] leading-[1.75]"
              style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
            >
              {s.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
