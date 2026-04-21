import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SLUG = 'bir-dukkan-kuresel-lezzet-markasina-donusebilir';

const TITLE = 'Bir Dükkan, Küresel Lezzet Markasına Dönüşebilir';

const SUBTITLE = 'Bir dükkânla başlar, dünyaya yayılan bir hikâyeye dönüşür.';

const EXCERPT =
  'Doğru strateji, özgün kimlik ve tutarlı bir markalaşma süreciyle küçük bir tatlıcı dükkanı, dünya çapında tanınan bir lezzet markasına dönüşebilir.';

const CONTENT_HTML = `
<p>Bir tatlıcı dükkanı, sadece mahallede tanınan küçük bir işletme olmaktan çok daha fazlası olabilir. Doğru strateji, özgün kimlik ve tutarlılıkla yürütülen bir markalaşma süreciyle bu dükkan, <strong>dünya çapında tanınan bir tatlı markasına</strong> dönüşebilir. Dünyada bunun örneklerini görmek hiç de zor değil. Başlangıçta lokal bir esnaf olan ama zamanla hem kültürel bir sembol haline gelen hem de ticari bir dev olan markaların hikâyeleri, bu iddianın en güçlü kanıtıdır.</p>

<p>Markalaşma, <strong>bir fikri sahiplenmek, bu fikri her adımda tutarlı şekilde yaşatmak ve insanların zihninde belirli bir algı oluşturmak</strong> demektir. Tatlı sektörü de tam bu noktada harika bir örnek sunar. Çünkü tatlı, yalnızca lezzet değil, aynı zamanda duygu, anı ve kültürle de yakından ilgilidir. Doğru hikâye ile yola çıkan bir tatlıcı dükkanı, sınırları aşan bir markaya dönüşebilir.</p>

<p><strong>İlk adım, markanın kimliğini net bir şekilde tanımlamaktır.</strong> Ne tür tatlılar satılıyor, bu tatlılar hangi kültürü yansıtıyor, kullanılan malzemeler ne kadar özgün ve işin arkasındaki felsefe nedir? Bu sorulara samimi ve net cevaplar, markanın temelini oluşturur. Sonra bu kimlik, ambalajdan menüye, mağaza atmosferinden dijital dünyaya kadar her alanda tutarlı bir şekilde yansıtılmalıdır.</p>

<p>Mesela, geleneksel Türk tatlıları satan bir işletme, sadece tatlılarıyla değil, kullanılan görseller, mekan tasarımı ve hatta çalışanlarının iletişim diliyle de <strong>bu kültürel zenginliği müşterilerine sunmalıdır.</strong></p>

<p><strong>İkinci adım, müşteri deneyimini ön plana çıkarmaktır.</strong> Global markaların en önemli ortak özelliği, sundukları deneyimi her yerde tanınabilir ve tekrar edilebilir hale getirebilmeleridir. Bir tatlıcı dükkanında yaşanan deneyim, hangi ülkede olursanız olun, benzer duygular uyandırmalıdır. Bunun için kalite standartları, hizmet şekli, sunum biçimi ve müşteriyle kurulan ilişki gibi detaylara dikkat edilmelidir.</p>

<p>Her adımda, markanın kalıcı ve güçlü bir şekilde iz bırakması sağlanmalıdır. Marka, sadece satış yapmayı değil, <strong>bir kültür yaratmayı</strong> da hedeflemelidir. Tatlı bir dükkan, doğru vizyon ve stratejiyle, yerel bir işletmeden uluslararası bir markaya dönüşebilir. Kısacası, tatlı bir hikaye oluşturulabilir ve dünya çapında takdir görebilecek bir markaya dönüştürülebilir.</p>
`.trim();

const TAG_SLUGS = ['gida-icecek', 'global-marka-konumlandirma'];

const COVER_URL: string | null = `/posts/${SLUG}.webp`;
const COVER_ALT: string | null =
  'Vitrinde rengarenk tatlılarla dolu butik bir pastane; deneyimli usta ve yeni nesil pastacı tezgah arkasında.';

async function main() {
  let admin = await prisma.admin.findFirst();
  if (!admin) {
    admin = await prisma.admin.create({
      data: {
        clerkId: 'seed-admin',
        email: 'ffurkanbudak@gmail.com',
        name: 'Ahmet Furkan Budak',
        role: 'OWNER',
      },
    });
  }

  const tags = await prisma.tag.findMany({ where: { slug: { in: TAG_SLUGS } } });
  if (tags.length === 0) {
    throw new Error('Etiketler bulunamadı. Önce `npm run prisma:seed` çalıştırın.');
  }

  const existing = await prisma.post.findUnique({ where: { slug: SLUG } });

  if (existing) {
    await prisma.post.update({
      where: { slug: SLUG },
      data: {
        title: TITLE,
        subtitle: SUBTITLE,
        excerpt: EXCERPT,
        contentHtml: CONTENT_HTML,
        coverImageUrl: COVER_URL,
        coverImageAlt: COVER_ALT,
        status: 'PUBLISHED',
        featured: false,
        readingMinutes: 4,
        publishedAt: existing.publishedAt ?? new Date(),
        tags: {
          deleteMany: {},
          create: tags.map((t) => ({ tagId: t.id })),
        },
      },
    });
  } else {
    await prisma.post.create({
      data: {
        slug: SLUG,
        title: TITLE,
        subtitle: SUBTITLE,
        excerpt: EXCERPT,
        contentHtml: CONTENT_HTML,
        coverImageUrl: COVER_URL,
        coverImageAlt: COVER_ALT,
        status: 'PUBLISHED',
        featured: false,
        readingMinutes: 4,
        publishedAt: new Date(),
        authorId: admin.id,
        tags: { create: tags.map((t) => ({ tagId: t.id })) },
      },
    });
  }

  console.log(`Post upserted: ${SLUG}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
