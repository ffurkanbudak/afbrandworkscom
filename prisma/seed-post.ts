import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SLUG = 'suruyu-takip-etmek-mi-fark-yaratmak-mi';

const TITLE = 'Sürüyü Takip Etmek Mi, Fark Yaratmak Mı?';

const SUBTITLE =
  'Markanızı sıradan olmanın konforunda bırakmak mı, yoksa sürünün dışına çıkarak gerçekten fark yaratmak mı istiyorsunuz?';

const EXCERPT =
  'Herkesin yürüdüğü yolu seçmek güvenli görünür ama markanızı orada bırakır. Sürüyü takip etmek ile cesurca farklılaşmak arasındaki çizgi üzerine bir yazı.';

const CONTENT_HTML = `
<p>Bir marka düşünün, her şeyin yolunda gittiğini sanıyor. Rakiplerinin yaptığını olduğu gibi taklit ediyor, tıpkı sürüdeki bir koyun gibi. &ldquo;Herkes bunu yapıyor, biz de yapalım.&rdquo; diye düşünüyor. Ama hiç durup, &ldquo;Bu yolda neden ilerliyoruz?&rdquo; diye sorgulamıyor. Yani başkaları ne yapıyorsa, o da onu yapıyor. Bir süre sonra fark ediyor ki; <strong>markası büyümemiş, güçlenmemiş, dün neyse bugün de aynı kalmış.</strong></p>

<p>Diğer tarafta ise daha cesur bir marka var. O, herkesin izlediği yolu takip etmiyor, biraz risk alıyor ve farklı bir şeyler denemek istiyor. Ama bunu dikkatli bir şekilde yapıyor. Çünkü diyor ki: &ldquo;Zaten herkes aynı yolu takip ediyor, ben biraz farklı hareket edeyim.&rdquo; O, kalabalıktan uzaklaşıyor, farklı yollara sapıyor. Farklı yollar, farklı insanlar ve farklı deneyimlerle karşılaşıyor. <strong>Gelişiyor, büyüyor, dikkat çekiyor.</strong></p>

<p>Peki, iki marka arasında ne fark var? Bir marka sıradan olmayı mı tercih etmeli, yoksa cesurca farklı olmayı mı? Eğer her zaman güvenli sularda kalmayı seçerseniz, sizi az kişi tanımaya devam eder. Elbette taklit edebilirsiniz, ama <strong>yeni ve özgün bir şey yaratamazsınız.</strong> Ancak cesur olup farklı bir yol izlerseniz, başkalarından sıyrılırsınız. Tercih edilen bir marka olabilirsiniz. Sadece &ldquo;biz de onu yapalım&rdquo; demekle, sizin bir markanız olmaz. Başkalarının yolunda gitmek size hiçbir şey kazandırmaz. <strong>Ama kendi yolunuzu çizdiğinizde, gerçekten fark yaratabilirsiniz.</strong></p>

<p>Biraz düşünün, ey marka sahipleri! Hangi yolu tercih edersiniz? Herkesin yürüdüğü yolu mu, yoksa cesur olup özgün olma cesareti gösterip farklı bir yoldan ilerlemeyi mi? <strong>Bu soruyu kendinize sorarak, sadece bugünü değil, geleceğinizi de şekillendirebilirsiniz.</strong></p>
`.trim();

const TAG_SLUGS = ['global-marka-konumlandirma', 'stratejik-disiplinler-yaklasimlar'];

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
        coverImageAlt: 'Çayırda otlayan koyun sürüsü',
        status: 'PUBLISHED',
        featured: true,
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
        coverImageAlt: 'Çayırda otlayan koyun sürüsü',
        status: 'PUBLISHED',
        featured: true,
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
