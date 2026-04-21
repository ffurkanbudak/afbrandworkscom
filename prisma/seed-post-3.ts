import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SLUG = 'markani-ayakta-tutanlar-ve-uzaga-tasiyanlar';

const TITLE = 'Markanı Ayakta Tutanlar ve Uzağa Taşıyanlar';

const SUBTITLE =
  'Mevcut müşteriyi elde tutmak bir başarıdır; ama markanızı büyüten, sizi henüz tanımayanlardır.';

const EXCERPT =
  'Sadık müşteri markanızı yaşatır, yeni müşteri ise büyütür. Bu dengeyi kuramayan markalar ya küçülür ya da kaybolur.';

const CONTENT_HTML = `
<p>Bir markanın sadık müşterileri, onu canlı tutar. Ama bir marka büyümek istiyorsa, yeni müşterilere ihtiyaç duyar. Durun, önce şu sadık müşteri klişesini bir kenara bırakın. Evet, onlar bugüne kadar sizi sırtlarında taşımış olabilir, hatalarınıza rağmen hep orada durmuş olabilirler. Onlar sayesinde biraz daha sabır, biraz daha umut bulmuş olabilirsiniz. Ama gerçek şu ki, <strong>sadakat markanızı asla sonsuza kadar ayakta tutmaz.</strong></p>

<p>Sadık müşteri ilişkisi, <strong>sürekli aynı yere takılıp kalmanıza neden olur.</strong> O güvenli, tanıdık alanda durduğunuz sürece, büyümek bir yana, geriye gitmeye başlarsınız. Bu kısır döngüde, gelişim diye bir şey yoktur. Sadık müşteri kitlesine bel bağlamak, sadece durağanlaşmak demektir. Siz değişmeden onlar değişemez. Peki ya markanız? O da sabırla bekler.</p>

<p>Yeni müşteriler edinmek ise tamamen başka bir hikaye. Yeni müşteriler sizi test eder, size yeni sorular sorar, sizi yeniden düşünmeye zorlar. Onlar, markanızın bir adım daha ileri gitmesini sağlar. <strong>Her yeni müşteri, bir fırsat, bir yenilik, bir kalkış noktasıdır.</strong> Onlarla birlikte markanızın sınırlarını genişletirsiniz. Ve büyümek... Büyümek işte tam burada başlar.</p>

<p>Sadakat önemli, evet. Ama gerçekçi olalım: Sadık müşteri kitlesini artırmak her zaman ölçeklenebilir değildir. Her marka sadece sadakatle büyümez. İşte burada <strong>yeni müşteri kazanımı devreye girer.</strong> Ona strateji eklediğinizde, büyüme gerçekten başlar. Sadakat bir kısım, büyüme ise tamamen başka bir oyun.</p>

<p>Evet, sadık müşteri ilişkileri samimi ve içten olabilir, ama bir noktadan sonra bu ilişkiyi yeniden canlandırmanız gerekir. Her dostluk bir noktada durağanlaşır. Oysa <strong>yeni müşteri ilişkileri her zaman taze bir soluk getirir.</strong> Her yeni müşteri, yeni bir başlangıçtır. Yeni başlangıçlar, yeni potansiyellerdir. Kapanan her yeni kapı, açılan bir başka fırsat olabilir.</p>

<p>Sadakati korumak önemli, elbette. Ama tüm kaynaklarınızı sadece sadık müşteri kitlesine odaklarsanız, <strong>markanızı geriye götürürsünüz.</strong> Yeni müşteriler, keşfedilmemiş alanlardır. Onlarla gelişir ve büyürsünüz. Onlar sayesinde, hem siz hem de markanız yeniden şekillenir.</p>

<p><strong>Sadık müşteriler sizi yaşatır, yeni müşteriler ise sizi büyütür.</strong> Bu dengeyi kuramazsanız, ya küçülürsünüz ya da kaybolursunuz. Markanızı canlı tutmak, sadece sadakatle değil, aynı zamanda yeni müşterilerin yenilikçi enerjisiyle mümkündür. Ne mevcut müşterilerinizi gereğinden fazla savunun, ne de yenileri elinizin tersiyle itin. <strong>İki tarafa da kucak açın, çünkü her iki tarafa da ihtiyaç duyuyorsunuz.</strong></p>
`.trim();

const TAG_SLUGS = ['stratejik-disiplinler-yaklasimlar', 'global-marka-konumlandirma'];

const COVER_URL = `/posts/${SLUG}.jpg`;
const COVER_ALT = 'Buzul manzarasına bakan, kırmızı montlu dağcı';

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
