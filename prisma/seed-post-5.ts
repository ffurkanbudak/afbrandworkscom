import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SLUG = 'bir-girisimci-ilk-parasini-nasil-kazanir';

const TITLE = 'Bir Girişimci İlk Parasını Nasıl Kazanır?';

const SUBTITLE =
  'Küçük bir satışın içinde saklı olan ilk iş modeli dersi.';

const EXCERPT =
  'İlk paranın büyüklüğü değil, varlığı önem taşır. Çocukluktaki bir CD satışından yola çıkarak bootstrapping, MVP, FFF çevresi ve referans oranı üzerine notlar.';

const CONTENT_HTML = `
<p>İlk paramı ilkokuldayken kazandım. Evimizde akşamları sürekli film izlenirdi ve bu yüzden etrafta çok fazla DVD vardı. Ancak rafları dolduranlar sadece filmler değildi; benim de hatırı sayılır bir PlayStation 2 oyun CD'si koleksiyonum vardı. Bir gün, bu CD'lerin rafta öylece beklemesinin anlamsız olduğunu düşündüm. Okulda bu oyunları oynamak veya bu filmleri izlemek isteyen çok fazla arkadaşım vardı ve onların bu içeriklere ulaşması zordu. Aradaki boşluğu benim doldurabileceğimi fark ettim.</p>

<p>Hemen işe koyuldum. Evden birkaç boş zarf buldum, üzerlerine tek tek oyunların adlarını yazdım ve küçük bir kağıda her birinin fiyatını not ettim. Ertesi gün okulda kermes vardı. İlk satışımı henüz 7 yaşındayken yaptım ve karşılığında 5 TL aldım. O parayı cebime koyduğumda, aslında küçük bir sorumluluğun da altına girmiştim. Bir söz vermiş ve o sözü tutmuştum. Bu, bana verilen harçlıktan çok daha farklı bir duruma işaret ediyordu.</p>

<p>Bugün geriye dönüp baktığımda, o anın içinde gizli olan dersi daha net görüyorum. Girişimcilikte ilk paranın büyüklüğü değil, varlığı önem taşır. Bu cümle ucuz bir motivasyon sözü gibi gelebilir ama içinde ciddi bir iş modeli gerçeği barındırır.</p>

<p>Yıllardır gördüğüm en yaygın hata şudur. İnsanlar iş kurmadan önce her şeyi kusursuzca oturtmaya çalışırlar. İsim bulunur, logo tasarlanır, web sitesi oluşturulur, şirket kurulur vb. Haftalar, bazen aylar böyle geçer. Bu süre boyunca kasaya tek kuruş para girmez. Çünkü ortada satılacak bir şey yoktur, yalnızca bir kurgu bulunur.</p>

<p>Bootstrapping dünyasında önemli bir prensip vardır. Şirketiniz ilk günden itibaren halka açıktır. Yatırımcınız da analistiniz de sizden rapor bekleyen ilk müşterinizdir. Braintree, Mailchimp, Atlassian gibi büyük şirketlerin hepsi bu mantıkla büyüdüler. Önce satış yaptılar, sonra yapıyı kurdular. Çünkü yapı kurmak pahalıya mal olur, satış ise size bedava gelir.</p>

<p>İlk gerçek müşterimi bulduğumda kartvizitim yoktu. İkincisinde de yoktu. Üçüncüsünde kartvizitim vardı. Zamanla şunu anladım; kartvizit iş kurmanın bir önkoşulu değil, iş yapmanın bir sonucudur. Bu sıralamayı ters çevirmek, girişimcilikte yapılan en pahalı hatalardan biridir.</p>

<p>İlk müşteriniz büyük ihtimalle tanımadığınız biri olmayacaktır. Araştırmalar defalarca göstermiştir ki, yeni bir müşteri kazanmanın maliyeti, mevcut bir ilişkiyi kullanmanın yaklaşık altı katıdır. Ben bunu çocukken farkında olmadan uygulamışım. Okulun koridorunda tanımadığım çocuklara gitmedim, tanıdıklarıma gittim. Çünkü elimdeki tek sermaye, onlarla kurduğum güvendi.</p>

<p>Anglo-Sakson dünyası bu ilk çevreye bir isim bile vermiştir. FFF (Friends, Family and Fools). Yani arkadaşlar, aile üyeleri ve size cesurca güvenen birkaç kişi. Eğer bu listede kimse yoksa, işinizden önce çevrenizi inşa etmeniz gerekir.</p>

<p>Burada çok önemli bir ince çizgi var. Yakınlarınıza sadece size iyilik olsun diye bir şey satmayın ve bu zaten kötü bir başlangıç olur. Onlara gerçekten işlerine yarayacak bir şey satın ve bunu yaparken piyasa fiyatının altına inmeyin. Çünkü birinin size dostluk için ödeme yapmasıyla, işi gerçekten beğendiği için ödeme yapması bambaşka şeylerdir. İkincisi, alabileceğiniz en değerli piyasa onayıdır.</p>

<p>Ürününüzün ilk versiyonu utandıracak kadar basit olmalıdır. Bu bir tercih değil, bir test kuralıdır. Silikon Vadisi buna MVP (Minimum Viable Product) der. Benim MVP'm, tükenmez kalemle üzerine oyun ismi yazılmış bir zarftı. Reid Hoffman'ın meşhur bir sözü vardır. "Eğer ürününüzün ilk versiyonundan utanmıyorsanız, onu piyasaya sürmekte çok geç kalmışsınızdır." Dünyanın en büyük profesyonel ağı olan LinkedIn'in kurucusu böyle söylüyorsa, dinlemekte fayda vardır.</p>

<p>İlk müşterinize verdiğiniz hizmetin mükemmel olması gerekmez. Sadece söz verdiğiniz şeyi teslim etmeniz yeterlidir. Üzerine bir iki tane beklenmedik iyilik eklerseniz, o kişi size ikinci işi de verir. Ticari literatür bunun adı traksiyon'dur. Okulda oyun CD'si sattığımı birkaç çocuk birbirine söyledi ve ertesi hafta bana kendileri geldiler. Referans dediğimiz şey tam olarak böyle bir süreci anlatır.</p>

<p>Yatırımcı dünyasının son zamanlardaki en büyük saplantısı CAC ile LTV oranıdır. Yani bir müşteri kazanmanın maliyetini, o müşterinin size ömür boyu getireceği paraya bölersiniz. Bu metrikler elbette önemlidir. Ancak ilk parasını kazanmaya yeni başlayan biri için unutulan üçüncü bir metrik vardır. O da referans oranı. Yani tek bir memnun müşteri size kaç yeni müşteri getiriyor? Eğer bu sayı birin altında kalıyorsa, her yeni müşteriyi sıfırdan bulmak zorunda kalırsınız ve bu da ölçeklenemeyen bir iş modeli anlamına gelir. Ne kadar pazarlama bütçesi harcarsanız harcayın, delik bir kovaya su doldurmuş olursunuz.</p>

<p>O beş liralık ilk satışımın, bugün kurduğum işle rakamsal bir bağlantısı kalmadı. Ama o satış yapılmamış olsaydı, geri kalanı da olmazdı. Çünkü o rakam sadece para anlamına gelmiyordu, piyasadan gelen bir sinyaldi. Geri kalan her şey sadece sabır ve küçük iyileştirmelerden ibaret oldu. Bugün kurduğum iş de hala aynı mantıkla yürüyor.</p>
`.trim();

const TAG_SLUGS = ['stratejik-disiplinler-yaklasimlar', 'davranissal-ekonomi'];

const COVER_URL: string | null = `/posts/${SLUG}.jpg`;
const COVER_ALT: string | null =
  'Çimenlik bir kıyıda göle doğru yürüyen küçük bir çocuk; arka planda yemyeşil orman.';

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
        readingMinutes: 5,
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
        readingMinutes: 5,
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
