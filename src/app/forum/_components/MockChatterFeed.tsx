import { MessageSquare } from 'lucide-react';

type MockPost = {
  tag: string;
  title: string;
  body: string;
  authorInitials: string;
  authorPlan: 'Ortak' | 'Mimari';
  timeAgo: string;
  replyCount: number;
};

const MOCK_POSTS: MockPost[] = [
  {
    tag: 'Markalaşma',
    title: 'Konumlandırma değiştirirken ekiple aynı dili kurmanın pratiği.',
    body: 'Geçen ay ekibin marka toplantılarında farklı bir terminoloji kullandığını fark ettim. Önce bir sözlük çıkardık, ardından strateji belgelerine yansıttık. Süreci paylaşmak istiyorum.',
    authorInitials: 'SG',
    authorPlan: 'Ortak',
    timeAgo: '3 saat önce',
    replyCount: 8,
  },
  {
    tag: 'Pazarlama',
    title: 'Dönüşüm oranını yükseltirken marka sesi nasıl korunur?',
    body: 'Bir yıl içinde üç farklı markada denedim. Kısa kampanyalarda ses tonunu gevşetmek ilk başta işe yarıyor gibi göründü, ancak uzun vadede güven aşınması yaşadık. Deneyim paylaşımı bekliyorum.',
    authorInitials: 'MD',
    authorPlan: 'Mimari',
    timeAgo: '6 saat önce',
    replyCount: 14,
  },
  {
    tag: 'Girişimcilik',
    title: 'İlk yatırımcı sunumunda değer önerisinin yeri.',
    body: 'Pitch deck üzerinde çalışırken en çok tıkandığım yer problem-çözüm anlatımının marka hikayesiyle örtüşmesini sağlamaktı. Konumlandırma netse sunum da netleşiyor gibi geldi.',
    authorInitials: 'ZA',
    authorPlan: 'Ortak',
    timeAgo: 'dün',
    replyCount: 11,
  },
  {
    tag: 'Startup',
    title: 'Ürün-pazar uyumunu gerçekten bulduğumuzu nasıl anlarız?',
    body: 'Kullanıcı görüşmelerinden gelen sinyaller aslında net ama biz büyümeye odaklanınca bu sinyalleri kaçırdık. Ertesi çeyrekte retention düştü. Tekrar başa dönüp retention kohortlarına baktık.',
    authorInitials: 'CO',
    authorPlan: 'Mimari',
    timeAgo: 'dün',
    replyCount: 19,
  },
  {
    tag: 'Satış',
    title: 'B2B satışta ilk 90 günde hangi metrikler izlenmeli?',
    body: 'Enterprise tarafına geçtiğimizde funnel tamamen değişti. İlk ay lead qualification, ikinci ay POC başarısı, üçüncü ay legal/procurement süresi üzerine düştük. Kendi çerçevemizi kuruyoruz.',
    authorInitials: 'SB',
    authorPlan: 'Ortak',
    timeAgo: '2 gün önce',
    replyCount: 6,
  },
  {
    tag: 'İletişim',
    title: 'Kriz anında marka iletişimi: üç temel ilke.',
    body: 'Geçen yıl bir vakada öğrendiklerimiz: (1) sessiz kalmamak (2) aşırı açıklama yapmamak (3) aynı tonu tüm kanallarda tutmak. Detaylı vaka analizini burada açıyorum.',
    authorInitials: 'BY',
    authorPlan: 'Mimari',
    timeAgo: '3 gün önce',
    replyCount: 22,
  },
  {
    tag: 'Kadın Girişimciliği',
    title: 'Yatırımcı görüşmesinde güven inşa etmenin pratik yolları.',
    body: 'İlk pitch\'imde fazla savunmaya geçtiğimi, sonraki görüşmelerde ise veriyle konuşmaya başladığımda tonun tamamen değiştiğini fark ettim. Pratik bir kontrol listesi paylaşıyorum.',
    authorInitials: 'EM',
    authorPlan: 'Ortak',
    timeAgo: '4 gün önce',
    replyCount: 9,
  },
  {
    tag: 'Finans',
    title: 'Erken aşama markalaşma bütçesi nasıl ayrılmalı?',
    body: 'Yıllık gelirin yüzde kaçı doğru soru değil bence. Asıl soru: marka kararı mı, kanal kararı mı? Deneyimim; marka kararlarını yılın ilk çeyreğinde, kanalları çeyrek bazında gözden geçirmek.',
    authorInitials: 'DT',
    authorPlan: 'Mimari',
    timeAgo: 'geçen hafta',
    replyCount: 13,
  },
];

export function MockChatterFeed() {
  return (
    <section aria-hidden>
      <div
        className="mb-4 flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase"
        style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
      >
        <MessageSquare className="h-[12px] w-[12px]" strokeWidth={1.75} />
        Topluluk nabzı
      </div>
      <div className="relative space-y-4">
        {MOCK_POSTS.map((p, i) => (
          <article
            key={i}
            className="pointer-events-none rounded-[12px] border p-5"
            style={{
              borderColor: 'var(--border)',
              opacity: 0.88,
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className="text-[10.5px] font-semibold tracking-[0.1em] uppercase"
                style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
              >
                #{p.tag}
              </span>
              <span
                className="text-[11px]"
                style={{ color: 'color-mix(in oklab, var(--fg) 50%, transparent)' }}
              >
                {p.timeAgo}
              </span>
            </div>
            <h3
              className="font-display mt-2 text-[18px] leading-[1.25] tracking-tight md:text-[20px]"
              style={{ filter: 'blur(3.5px)' }}
            >
              {p.title}
            </h3>
            <p
              className="mt-2 line-clamp-2 text-[13.5px] leading-[1.6]"
              style={{
                color: 'color-mix(in oklab, var(--fg) 70%, transparent)',
                filter: 'blur(4.5px)',
              }}
            >
              {p.body}
            </p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div
                  className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold"
                  style={{
                    background: 'color-mix(in oklab, var(--fg) 8%, transparent)',
                    color: 'var(--fg)',
                    filter: 'blur(2px)',
                  }}
                >
                  {p.authorInitials}
                </div>
                <span
                  className="text-[12px] font-semibold"
                  style={{ filter: 'blur(2.5px)' }}
                >
                  {p.authorInitials}
                </span>
                <span
                  className="rounded-[4px] border px-1.5 py-[1px] text-[10px] font-semibold tracking-[0.06em] uppercase"
                  style={{
                    borderColor: 'color-mix(in oklab, var(--fg) 25%, transparent)',
                    color: 'color-mix(in oklab, var(--fg) 85%, transparent)',
                  }}
                >
                  {p.authorPlan}
                </span>
              </div>
              <span
                className="inline-flex items-center gap-1 text-[11.5px]"
                style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
              >
                <MessageSquare className="h-[11px] w-[11px]" strokeWidth={2} />
                {p.replyCount}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
