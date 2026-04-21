import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SLUG = 'herkesin-sevgisini-kazanamazsiniz';

const TITLE = 'Herkesin Sevgisini Kazanamazsınız!';

const SUBTITLE =
  'Markanızı oluştururken en büyük hayaliniz nedir? Herkesin sizi sevmesi, takdir etmesi, düşünmeden satın alması mı? Durun bir dakika! Gerçek dünyada böyle bir şey yok. Eğer böyle bir beklentiniz varsa, bu rüyadan uyanın!';

const EXCERPT =
  'Herkese hitap etmeye çalışan marka, kimseye hitap edemez. Sevilmek ile nefret edilmek arasındaki gerilim, güçlü markaların olmazsa olmazıdır.';

const CONTENT_HTML = `
<p>Gerçek şu ki, <strong>markanızın her zaman herkes tarafından sevilecek diye bir kural yok.</strong> Belki bazıları sizi sever, hayranlıkla takip eder, ama unutmayın ki bazıları da nefret eder. İkisi de normaldir çünkü bir marka ne kadar güçlü ve etkileyici olursa, etrafında o kadar sevgi ve nefret yaratır.</p>

<p>Herkesin sizin markanızı anlamasını beklemeyin. Bunu yapmak, <strong>markanızı gri ve sıradan yapar.</strong> Ne istediğinizi ve kim olduğunuzu bilmeyen bir markanın peşinden kimse gitmez. Güçlü markalar, keskin hatlarla tanınır. Bazen sevilirsiniz, bazen nefret edilir ama bu, sizin markanızın ne kadar net ve kararlı bir duruş sergilediğini gösterir.</p>

<p>Herkesin markanızı sevmesini bekliyorsanız, <strong>aslında markanızı hiçbir şekilde seviyorsunuz demektir.</strong> Çünkü markanızı herkesin beğenmesi demek, herkese hitap etmeye çalışmak demektir. Bu da sizi standart ve sıradan bir hale getirir. Güçlü bir marka, bazı insanları kendine çeker, ama bazılarını da itebilir. İkisini de kabul edin. Herkes sizin markanızı anlamayacak ve sevemeyecek. <strong>Bu da markanızın hayatındaki doğal bir durum aslında.</strong></p>

<p>Sadık müşterilerinizle ilişkilerinizin ne kadar güçlü olduğunu düşünün. Onlar sizi her zaman canlı tutar ama bunu sadece sevgiyle değil, aynı zamanda sizden bekledikleri gerçekten somut bir şeyler olduğunu gösterir. Eğer markanızda bir tartışma yaratacak bir şeyler yoksa, o zaman insanlar sizi düşünmezler. Onlar size ya bayılırlar, ya da yerden yere vururlar. <strong>Arada bir yerde olmak, bir markanın kimliksiz hale gelmesidir.</strong></p>

<p>Marka olmanın özü, keskin bir duruş sergilemektir. Kimi sever, kimi nefret eder. Ama <strong>herkesin sizin markanızı sevmeyeceğini kabul etmek, markanızın güçlü ve tutarlı olmasını sağlar.</strong> Bunu bilmek size güven verecek ve markanızı daha cesur bir şekilde yaratmanızı sağlayacaktır.</p>

<p>Sadık bir müşteri kitlesi oluşturun ama onların yanına, yeni bir bakış açısı getirecek ve sizi zorlayacak yeni müşteriler ekleyin. Hem sevilen hem de nefret edilen bir marka olmak, daha geniş bir kitleye ulaşmanızı sağlar. Herkesin sizi anlamasını beklemeyin. <strong>İyi bir marka, tartışılabilir bir marka olur.</strong></p>
`.trim();

const TAG_SLUGS = ['global-marka-konumlandirma', 'noropazarlama-tuketici-psikolojisi'];

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
        coverImageUrl: `/posts/${SLUG}.webp`,
        coverImageAlt: 'Neşeyle kahkaha atan yaşlı adam',
        status: 'PUBLISHED',
        featured: false,
        readingMinutes: 3,
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
        coverImageUrl: `/posts/${SLUG}.webp`,
        coverImageAlt: 'Neşeyle kahkaha atan yaşlı adam',
        status: 'PUBLISHED',
        featured: false,
        readingMinutes: 3,
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
