import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Decision = { title: string; body: string };

type SeedBrand = {
  slug: string;
  name: string;
  sector: string;
  foundedYear: number;
  headquartersCity: string | null;
  headquartersCountry: string;
  origin: 'GLOBAL' | 'LOCAL';
  positioning: string;
  foundingStory: string;
  founderVision: string;
  strategicDecisions: Decision[];
  crisesAndTurningPoints: string;
  currentPosition: string;
  editorialNote: string;
  featured?: boolean;
};

const BRANDS: SeedBrand[] = [
  {
    slug: 'apple',
    name: 'Apple',
    sector: 'Teknoloji',
    foundedYear: 1976,
    headquartersCity: 'Cupertino',
    headquartersCountry: 'ABD',
    origin: 'GLOBAL',
    featured: true,
    positioning:
      'Apple, teknolojiyi mühendislikten öte bir tasarım disiplinine dönüştürerek bilgisayarı kişiselleştiren markadır.',
    foundingStory: `1976 yılında Steve Jobs, Steve Wozniak ve Ronald Wayne, Jobs\'un ailesinin California, Los Altos\'taki garajında Apple Computer adını verdikleri şirketi kurdu. İlk ürünleri olan Apple I, Wozniak tarafından tasarlanmış, kullanıcıya monte edilmiş bir anakart olarak satışa sunuldu. O dönemde kişisel bilgisayar kavramı yeni doğuyordu; ana oyuncular IBM, HP ve Commodore\'du.

Şirketin ilk sıçraması 1977\'de tanıtılan Apple II ile geldi. Standart bir klavye, renkli grafik arayüzü ve kullanıma hazır gövdesiyle Apple II, tüketici pazarına tasarım merkezli bir yaklaşım getirdi. Bilgisayarı teknik bir cihazdan ev eşyasına çevirmeyi amaçlayan bu bakış, şirketin sonraki kırk yılının çerçevesini belirleyecekti.

1984\'te Macintosh\'un piyasaya çıkışı, grafik kullanıcı arayüzünün ana akıma taşınmasına öncülük etti. Ancak büyümenin yönetimi yönetim kurulu ve kurucu arasında gerilime dönüştü. 1985\'te Jobs, kurduğu şirketten ayrıldı. Apple, Jobs\'suz geçen on iki yılda özgün çizgisini büyük ölçüde kaybetti.`,
    founderVision: `Steve Jobs\'un markaya kazandırdığı temel fikir, teknolojinin insan deneyiminin hizmetinde olması gerektiğiydi. Mühendisliğin tüketiciye kendini bir karmaşa olarak sunmaması, arkasında görünmez durması hedefleniyordu.

Bu vizyon iki pratik ilkeye indirgendi. Birincisi, donanım ile yazılımın aynı şirkette tasarlanması gerektiğiydi; bütünlüklü deneyim bu entegrasyondan doğar. İkincisi, tasarımın mühendislik kararlarının önünde durmasıydı. Bir ürün önce nasıl hissettirdiğiyle değerlendirilir, sonra teknik çözümü aranır.

Jobs 1997\'de geri döndüğünde bu iki ilkeyi Apple\'ın yönetim diline kurumsal düzeyde yerleştirdi. Bugüne kadar değişmeyen marka eksenini bu giriş oluşturur.`,
    strategicDecisions: [
      {
        title: '1997: Ürün yelpazesinin keskin daraltılması',
        body: 'Dönüşünde Jobs, kırk sekiz ürünlük katalogu dört ürünle değiştirdi: tüketici masaüstü, tüketici taşınabilir, profesyonel masaüstü, profesyonel taşınabilir. Bu karar, marka bütünlüğünü kaynak dağılımı düzeyinde geri kazandırdı.',
      },
      {
        title: '2001: Müzik zincirine iPod ile giriş',
        body: 'iPod bir donanım ürünü olarak değil, iTunes yazılımı + iTunes Store ile birlikte bir ekosistem olarak kurgulandı. Bu bakış, Apple\'ı tek ürün firması olmaktan çıkarıp servis-donanım-yazılım üçlüsünü yöneten bir ağ operatörüne dönüştürdü.',
      },
      {
        title: '2007: iPhone ile tüketici telefonunu yeniden tanımlama',
        body: 'Fiziksel tuş takımı yerine tam dokunmatik ekran, uygulama mağazası etrafında kurgulanan gelir modeli ve premium fiyatlama. Bu üç karar, telefon pazarını marka ekonomisiyle yeniden hiyerarşikleştirdi.',
      },
      {
        title: 'Perakende mağazalarının kurulması',
        body: '2001 itibarıyla doğrudan tüketiciye erişen Apple Store ağı, marka deneyiminin üçüncü taraf perakendecilerin kontrolünden çıkartılması anlamına geldi. Bugün global lüks markalarda benzeri görülen birebir deneyim pratiğinin referanslarından biridir.',
      },
    ],
    crisesAndTurningPoints: `Apple\'ın modern markasını tehdit eden iki temel kriz belirleyicidir.

Birincisi 1993-1997 arası yaşanan itibar ve finansal daralmadır. Ürün yelpazesi kontrolden çıkmış, pazar payı yüzde onun altına inmiş, zarar birikmişti. Microsoft\'tan alınan yüz elli milyon dolarlık yatırım ve Jobs\'un geri dönüşü olmasaydı, şirketin kapatılması masadaki seçeneklerdendi.

İkincisi 2011\'de Jobs\'un ölümüdür. Kurucu figürü kaybolan marka için ana soru, "Jobs olmadan Apple sürdürülebilir mi?" oldu. Tim Cook\'un operasyonel ustalığı ve Jony Ive\'ın tasarım direktörlüğü ilk beş yılı taşıdı. Bu dönemde servis gelirleri (App Store, iCloud, Apple Music, AppleCare) konsolide edildi; bu kalem bugün yıllık yüz milyar dolar bandında stratejik bir ikinci sütun haline geldi.

Son dönemin meydan okuması, yapay zeka yarışında Google, OpenAI ve Microsoft karşısında görünür bir gecikme. Apple Intelligence\'ın 2024\'teki tanıtımı, şirketin bu alanı donanım tabanlı, cihaz üstünde işlenen bir gizlilik vaadiyle yeniden konumlandırma girişimidir.`,
    currentPosition: `Apple bugün üç trilyon dolar civarında piyasa değeriyle dünyanın en değerli teknoloji markası. Gelir kompozisyonu iPhone ağırlıklı olmakla birlikte, hizmetler ve giyilebilir cihazlar payını her çeyrekte artırıyor. M serisi kendi çipleriyle donanım bağımsızlığı sağlandı; bu adım marjları ve performans anlatısını büyük ölçüde yeniden kurdu.

Markanın temel rakipleri Samsung (donanım), Google (yazılım ve servis), Microsoft (profesyonel yazılım) ve yükselen Çinli üreticiler. Pazar payı stratejisi değil, pazar premyumunu kontrol stratejisi öne çıkar.

Son dönemdeki en belirleyici atılım Vision Pro ile başlatılan "spatial computing" kategorisidir. Kategori henüz olgun değil; ancak Apple\'ın yeni bir tüketici arayüzü denemesinin test alanı olarak okunmalıdır.`,
    editorialNote: `Apple\'ın hikayesinden çıkan ilk ders, marka tutarlılığının ürün çeşitliliğiyle ters orantılı olabileceğidir. 1997\'deki dört ürünlük matris, pek çok erken aşama markanın "her müşteriye her ürünü" baskısı altında unuttuğu bir disiplindir: markayı güçlendiren şey, yapmadıklarıdır.

İkinci ders, deneyim tasarımının kanala kadar indirilmesidir. Perakende mağazaları Apple\'a sadece satış noktası değil, marka iletişiminin kontrollü bir yüzeyini kazandırdı. Büyüme eşiğindeki markalar için ürün vitrini ile marka vitrini arasındaki farkı netleştirmek, uzun vadeli değer inşasının temelidir.

Üçüncü ders, kurucu figürün yokluğunda marka sürekliliğinin operasyonel olgunlukla mümkün olabileceğidir. Jobs sonrası Cook döneminde dramatik atılımlar azaldı ama marka premyumu ve tüketici güveni istikrarlı şekilde korundu. Kurucu sonrası dönemlerde mucizevi atılım beklemek yerine, sistemin kendisini güçlendirmek daha güvenilir bir yoldur.`,
  },
  {
    slug: 'patagonia',
    name: 'Patagonia',
    sector: 'Tekstil',
    foundedYear: 1973,
    headquartersCity: 'Ventura',
    headquartersCountry: 'ABD',
    origin: 'GLOBAL',
    positioning:
      'Patagonia, ticari başarıyı çevresel sorumlulukla doğrudan eşleştirerek aktivizmi iş modelinin çekirdeğine yerleştiren markadır.',
    foundingStory: `Yvon Chouinard, dağcılık tutkusundan doğan bir ihtiyacı yanıtlamak için 1957\'de kendi tırmanış ekipmanlarını üretmeye başladı. Kaya yüzeylerine hasar vermeyen alüminyum kıskaçlar tasarladı ve bunları dağcı arkadaşlarına sattı. Chouinard Equipment adlı bu ilk girişim, sonradan Patagonia markasının ahlaki çerçevesinin temeli olacaktı.

1973\'te, daha dayanıklı ve teknik performans odaklı giyim eşyasına olan talebi fark ederek Patagonia\'yı kurdu. İsim, o yıllarda Chouinard\'ın dağcılık ekspedisyonlarında gittiği Güney Amerika bölgesinden alındı. İlk ürünler dağcılar için tasarlanmış rengarenk rüzgarlıklardı; dönemin baskın outdoor modasındaki kahverengi ve haki tonlarından bilinçli bir kopuş.

Şirketin erken büyümesi teknik üstünlük üzerine kuruldu. Ancak 1986\'da Chouinard, ürettikleri ürünlerin çevresel maliyetini ölçmeye karar verdi. Bu iç denetim, markanın kimliğini temelden yeniden şekillendirdi.`,
    founderVision: `Chouinard\'ın kurumsal felsefesi iki temel önerme üzerine kuruludur. Birincisi, bir şirketin başarısının kar ile değil, verdiği zararın azaltılmasıyla ölçülmesi gerektiğidir. İkincisi, çevresel sorumluluğun pazarlama söylemi değil, maliyet kalemi olarak kabul edilmesidir.

Bu felsefenin en somut ifadesi 1985\'te başlayan "1% for the Planet" uygulamasıdır: gelirlerin (kar değil, brüt gelir) yüzde biri doğrudan çevresel örgütlere aktarılır. Bu oran iyi geçen yıl iskontolu indirilmez, kötü geçen yıl hafifletilmez. Kurumsal cömertlik değil, operasyonel sabitdir.

Chouinard\'ın markasına yüklediği anlam, "tüketiciye daha az satın almayı öğretmek" gibi paradoksal bir konumdur. Bu paradoks, Patagonia\'nın sıradışı sadakat seviyesini açıklayan ilk unsurdur.`,
    strategicDecisions: [
      {
        title: '1996: Organik pamuğa geçiş',
        body: 'Konvansiyonel pamuğun çevresel maliyetini gören Chouinard, tüm pamuklu ürünlerini on sekiz ayda organik pamuğa çevirdi. Karar, kısa vadeli marjları düşürdü ama tedarik zinciri sertifikasyonunda bir endüstri standardı belirledi.',
      },
      {
        title: '2011: "Don\'t Buy This Jacket" kampanyası',
        body: 'New York Times\'ta yayımlanan sayfa tam bir kampanya, tam da alışveriş sezonunda tüketicileri kendi ürününü almamaya çağırdı. Kampanya yıllık gelirleri kısa vadede yüzde otuz artırdı; daha önemlisi, markanın "az ama uzun ömürlü" anlatısını küresel hâle getirdi.',
      },
      {
        title: '2013: Worn Wear programı',
        body: 'Kullanılmış Patagonia ürünlerini geri alıp onarım atölyelerinde yenileyerek tekrar satışa sunan program, döngüsel ekonomi iddiasının operasyonel karşılığıdır. Tek yönlü çevre söylemini çift yönlü bir tedarik döngüsüne çevirdi.',
      },
      {
        title: '2022: Şirketin Earth\'a devredilmesi',
        body: 'Chouinard ailesi, üç milyar dolar değerindeki Patagonia\'nın yüzde yüz hissesini Holdfast Collective ve Patagonia Purpose Trust\'a devretti. Tüm kar bundan böyle iklim krizine karşı örgütlere aktarılacak. Karar, aile serveti üretiminden vazgeçilmesi anlamına geliyor.',
      },
    ],
    crisesAndTurningPoints: `Patagonia\'nın krizi dışsal bir finansal şok değil, içsel bir ahlaki hesaplaşma olarak gelişmiştir. 1986\'daki ilk çevre denetimi, şirketin 2010\'a kadar sürdüreceği radikal yeniden yapılanma dizisini tetikledi.

Marka için en ciddi sınav 2011\'de yaşandı. "Don\'t Buy This Jacket" reklamı bazı yatırımcılar ve perakendeciler tarafından "absürt pazarlama" olarak eleştirildi. Sektör analistleri, kampanyanın satışları düşüreceğini öngördü. Sonuç tersini gösterdi; ancak asıl risk finansal değil, anlatı tutarlılığıydı. Eğer Patagonia bunun ardından tekrar standart büyüme reklamlarına dönseydi, marka itibarı kalıcı olarak çatlayacaktı.

2022\'deki şirket devri, geleneksel halka arz ya da özel sermaye yoluyla çıkış yapılmasını tercih eden kurucu ailelerin alışkın olmadığı bir yoldu. Finans basınında karar "romantik ama sürdürülemez" olarak tartışıldı. Patagonia bu kararı markanın son ahlaki sınavı olarak değil, iş modelinin mantıksal sonucu olarak sundu.`,
    currentPosition: `Patagonia bugün yılda bir buçuk milyar dolar civarında gelir üreten, büyüklük olarak North Face gibi rakiplerinin gerisinde ama marka gücü bakımından önlerinde konumlanmış bir outdoor giyim markası.

Gelirlerinin büyük kısmı kadın ve erkek giyim koleksiyonlarından gelirken, son on yılda yaşam tarzı segmentine doğru genişleme izlenmektedir. Provisions adıyla gıda ürünleri, Patagonia Films adıyla bağımsız yapım şirketi ve Patagonia Books gibi ek kollar, marka evreninin içerik ayakları olarak işliyor.

Rakiplerin çevre söylemine geçmesine karşın Patagonia\'nın en güçlü varlığı kırk yıllık süreklilik. "Greenwashing" şüphesinden uzak kalabilen sayılı global markadan biridir.`,
    editorialNote: `Patagonia\'dan çıkarılacak ilk ders, bir markanın farklılaştırıcı özelliğinin kendisine maliyet yükleyebileceğini kabul etmesidir. Organik pamuğa geçiş, gelirin yüzde biri bağış, "satın alma" reklamı — her biri rakipler üzerinde rekabet avantajı yaratmak yerine kendisine maliyet yükler. Ancak bu maliyetler zamanla markaya prim olarak geri döner. Erken aşama markaların düştüğü tuzak, ilkelerin maliyetsiz olması beklentisidir.

İkinci ders, iddia ile uygulama arasındaki mesafenin tüketici tarafından sürekli ölçüldüğüdür. Patagonia\'nın "satın almayın" demesi inandırıcıdır çünkü arkasında Worn Wear onarım atölyeleri, kırk yıllık bağış kayıtları ve organik pamuk yatırımı vardır. Söylem, operasyonla desteklenmediğinde çatlar.

Üçüncü ders, kurucunun çıkış biçiminin markaya miras olabileceğidir. Chouinard\'ın şirketi satmak yerine iklim örgütlerine devretmesi, Patagonia\'nın değer önerisini kurucu sonrası döneme taşıyan operasyonel bir güvencedir. Kurucu, markanın temel anlatısını ancak onu kendi iradesinden özgürleştirerek sürdürebilir hale getirebilir.`,
  },
  {
    slug: 'ikea',
    name: 'IKEA',
    sector: 'Mobilya ve Perakende',
    foundedYear: 1943,
    headquartersCity: 'Delft',
    headquartersCountry: 'Hollanda',
    origin: 'GLOBAL',
    featured: true,
    positioning:
      'IKEA, mobilyayı elit bir tüketim alanından kitlesel erişime indirerek "demokratik tasarım" kavramını bir iş modeline çeviren markadır.',
    foundingStory: `Ingvar Kamprad, on yedi yaşında, İsveç\'in Älmhult köyünde 1943\'te posta siparişi usulü küçük ev eşyaları satan bir şirket kurdu. İsim, kendi baş harfleri Ingvar Kamprad, büyüdüğü çiftlik Elmtaryd ve köyü Agunnaryd\'ın harflerinden oluşuyordu.

İlk ürünler kalem, cüzdan, naylon çorap gibi küçük tüketim malzemeleriydi. 1948\'de kataloğuna mobilya eklenince markanın istikameti belirlenmiş oldu. 1953\'te Älmhult\'ta açılan ilk showroom, müşterinin ürünü satın almadan önce görebilmesi ve test edebilmesi fikrini kitlesel mobilya satışına taşıyan ilk denemelerden biriydi.

1956\'da bir tasarımcı, IKEA ürününü arabasına sığdırmak için ayaklarını söktü. Bu pratik çözüm, tedarik zincirinin kaderini belirleyen "düz paket" sistemine dönüştü: mobilya fabrikadan kullanıcıya sökülmüş halde taşınır, montajı son kullanıcı yapar. Bu karar ürünün nakliye maliyetini, depolama maliyetini ve fiyat etiketini aşağı çekti.`,
    founderVision: `Kamprad\'ın markasına yüklediği anlam, "güzel tasarlanmış eşyanın sadece zenginlerin hakkı olmaması" idi. Bu demokratik tasarım fikri beş başlıkta operasyonel hale getirildi: biçim, işlev, kalite, sürdürülebilirlik ve düşük fiyat.

Düşük fiyatın vizyon listesinin içinde olması belirleyicidir. Çoğu markanın pazarlama sonrası düşündüğü fiyat, IKEA\'da tasarım sürecinin başında tanımlanır. Bir ürün önce fiyat etiketini belirler, sonra bu etikete uyacak şekilde tasarlanır, malzemesi seçilir, üretim süreci kurulur.

Kamprad\'ın ikinci temel ilkesi mütevazılıktı. Kişisel olarak ekonomi sınıfı uçuş kullanması, ikinci el araba kullanması, şirket içi toplantılarda kahve fişleriyle ödeme yapması kurumsal kültürün tasarruf felsefesini içeriden beslemek için tutulan tutumlardı.`,
    strategicDecisions: [
      {
        title: 'Düz paket ve müşteri montajı',
        body: 'Nakliye ve depolama maliyetini müşteriye yüklemeden aşağı çekmenin tek yolu, montajı da müşteriye devretmektir. Bu karar ürün tasarımının tüm çerçevesini belirler: her vida, her mafsal, kullanıcının bir saatte birleştirebileceği şekilde çözümlenir.',
      },
      {
        title: 'Katalog merkezli marka iletişimi',
        body: 'On yıllarca dünyanın en fazla basılan yayını olan IKEA kataloğu, bir reklam aracı değil bir davet aracıydı. Müşteri mağazaya gelmeden önce ürünün evindeki yerini katalog sayfasında kurardı. 2020\'de dijital dönüşümle basım sonlandırıldı.',
      },
      {
        title: 'Mağaza labirenti ve "IKEA etkisi"',
        body: 'Kurgulanmış bir tek yönlü mağaza akışı, müşteriyi tüm kategorilere maruz bırakır. Son çıkışta yer alan İsveç gıdası noktası, mağaza ziyaretini deneyim bütününe çevirir. Müşteri kendi monte ettiği ürüne daha çok değer verir; akademide bu "IKEA etkisi" olarak adlandırılır.',
      },
      {
        title: 'Stichting INGKA yapılanması',
        body: '1982\'de Kamprad, IKEA\'yı bir Hollanda vakfı olan INGKA altında yapılandırdı. Bu, şirketin halka arza gitmemesini, aile içi kalmasını ve vergi optimizasyonu yapabilmesini garanti etti. Tartışmalı ama kalıcı bir kararla uzun vadeli bağımsızlık satın alındı.',
      },
    ],
    crisesAndTurningPoints: `IKEA\'nın markasını sarsan kriz, 1994\'te İsveç basınında gündeme gelen Kamprad\'ın gençlik dönemindeki Nazi sempatizanı bağlantısıydı. Kamprad kamuoyu önünde bu dönemi "hayatımın en büyük hatası" olarak adlandırdı ve özür diledi. Krizin yönetimi şeffaflığa dayandı; şirket itibarı kalıcı hasar almadı ancak kurucu figürün masumiyet halesi değişti.

İkinci büyük mesele, büyüme yönetimidir. 2000\'lerin ortasında markanın bazı pazarlardaki hızlı genişlemesi, tedarikçi koşullarındaki çalışma standartları sorunlarını ve kereste tedarikinde çevresel eleştirileri beraberinde getirdi. IKEA yanıt olarak IWAY adıyla bir tedarikçi denetim kodu yayımladı ve kendi orman varlığı yatırımlarına başladı.

Üçüncü dönüm noktası 2020 pandemisidir. Mağaza merkezli model ciddi bir kırılma yaşadı. Şirket iki yıl içinde dijital kanal altyapısını hızlandırdı, kentsel küçük mağaza formatını genişletti ve montaj hizmetini platform haline getirdi. Kriz, markanın sonraki on yıllık dijital stratejisini öne çekti.`,
    currentPosition: `IKEA bugün elli iki ülkede yaklaşık dört yüz elli mağaza ile yılda kırk beş milyar Euro\'yu aşan gelir üretir. En büyük pazarları Almanya, ABD ve Fransa; en hızlı büyüyen pazarları Hindistan ve Güneydoğu Asya\'dır.

Markanın stratejik önceliği, mağaza odaklı deneyimi dijital kanalla birleştirmek ve kentsel küçük formatla erişimi derinleştirmektir. IKEA Studio uygulaması, artırılmış gerçeklikle evde ürün önizleme imkanı sunar. İkinci el ve yenilenmiş ürün satışı için geliştirilen IKEA Preowned platformu döngüsel ekonomi iddiasının operasyonel ayağıdır.

Rekabet cephesi genişlemiştir: Wayfair, West Elm gibi dijital doğumlu markalar, Mandarin Oriental\'in oteller için tasarladığı gibi özel yapım rakipler, yerel pazarlarda büyüyen formatlar. IKEA\'nın konumunu koruyan şey büyüklük değil, otuz yıllık tedarik zincirinin maliyet üstünlüğüdür.`,
    editorialNote: `IKEA\'nın öğrettiği ilk şey, fiyatın tasarım sürecinin girdisi olabileceğidir. Çoğu marka önce ürünü tasarlar, sonra pazarda fiyatını bulur. IKEA tersini yapar: etiketi önce koyar, ürünü o etikete uyacak biçimde tasarlar. Bu yaklaşım, "demokratik tasarım" söylemini romantik bir iddiadan operasyonel bir çerçeveye çevirir.

İkinci ders, müşterinin sürece ortak edilmesinin değer yaratımına dönüşebileceğidir. Düz paket sistemi maliyet düşürme aracı gibi görünse de asıl katkısı müşterinin ürünle girdiği ilişkide yatar. Tüketici, monte ettiği bir sehpaya başka bir mağazadan aldığı bir sehpadan daha çok sahiplik hisseder. Emek yatırımı, sadakat tohumudur.

Üçüncü ders, kurumsal tasarruf kültürünün kurucunun örnekliğiyle kurulduğu, söylemle sürdürülemeyeceğidir. Kamprad\'ın kendi yaşamındaki mütevazılık sembolleri — ikinci el araba, ekonomi sınıfı uçak — kurum kültürünün iç çerçevesini oluşturdu. Bir değer, kuruluş evresinde kurucunun davranışıyla yerleşmezse, sonradan iç iletişimle kurulamaz.`,
  },
  {
    slug: 'nike',
    name: 'Nike',
    sector: 'Spor Giyim',
    foundedYear: 1964,
    headquartersCity: 'Beaverton',
    headquartersCountry: 'ABD',
    origin: 'GLOBAL',
    positioning:
      'Nike, sporcu performansını pazarlama ekseni haline getirerek spor ayakkabısını kültürel bir statü nesnesine çeviren markadır.',
    foundingStory: `Phil Knight, 1962\'de Stanford MBA\'inde yazdığı tezde, Almanya\'nın Adidas tekelini kırmanın Japon üretim maliyetiyle mümkün olacağını öne sürdü. Mezuniyetin ardından Japonya\'ya uçtu, Onitsuka şirketiyle (bugünkü ASICS) distribütörlük anlaşması imzaladı. 1964\'te eski antrenörü Bill Bowerman ile birlikte Blue Ribbon Sports\'u kurdu. Başlangıç sermayesi toplam beş yüz dolardı.

İlk yıllar arabaların bagajından sporcu ayakkabısı satışıyla geçti. Bowerman, Oregon Üniversitesi atletizm takımının antrenörü olarak sporculara geri bildirim verip Knight\'ın temin ettiği ayakkabıları iyileştirdi. 1971\'de Onitsuka ile ilişki bozulunca Knight kendi markasını kurmaya karar verdi.

İsim, Yunan zafer tanrıçası Nike\'tan alındı. Logoyu tasarlayan öğrenci Carolyn Davidson otuz beş dolar aldı. 1972 Münih Olimpiyatları\'nda Nike ayakkabıları, Adidas karşısında ilk ciddi görünürlüğünü yakaladı.`,
    founderVision: `Knight\'ın kurduğu çerçeve, ayakkabıyı bir ürün olarak değil, bir performans anlatısının kanıtı olarak konumlandırmaktı. Bir sporcu Nike giydiğinde, sadece ayağına rahat bir kılıf takmıyor, kendini performans evrenine kaydediyordu.

Bu anlayış iki pratik ilke üretti. Birincisi, sporcu sözleşmeleriydi; ürün en çok seçkin sporcunun ayağında anlam kazanır. İkincisi, reklam olarak sunulan içeriğin ürün değil, değer anlatısı olmasıydı.

"Just Do It" sloganı 1988\'de devreye girdiğinde marka otuz milyar dolarlık bir spor ayakkabı pazarının geri kalanıyla farklılaşmanın dilini buldu. Slogan, bir pazarlama tekliği değil, Nike\'ın iç kültürünün dışa yansımasıdır.`,
    strategicDecisions: [
      {
        title: '1984: Michael Jordan sözleşmesi',
        body: 'Ligde ikinci seçim olan genç oyuncuyla, ona özel Air Jordan alt markası üzerinden yüzde yüz oyuncu imzalı bir ürün çizgisi kuruldu. Jordan markasının gelirleri bugün yıllık beş milyar doları aşar ve modern sporcu sözleşmelerinin referans şablonunu oluşturur.',
      },
      {
        title: '1988: "Just Do It" kampanyası',
        body: 'Marka iletişimi performans vaadinden psikolojik çağrıya geçti. Ayakkabının ne yaptığı değil, sahibinin ayakkabıyla ne yapabildiği anlatının merkezine alındı. Slogan otuz yılı aşkın süredir marka mimarisinin taşıyıcı direği.',
      },
      {
        title: 'Outsourcing tedarik zinciri',
        body: 'Nike kendi fabrikalarını kurmadı. Asya\'daki üretim ortaklarıyla genişleyen tedarik modeli, maliyet esnekliği kazandırdı ama 1990\'larda çalışma koşulları skandallarına yol açtı. Sonraki yirmi yılda tedarik denetimi markanın en ciddi iç yatırımı oldu.',
      },
      {
        title: '2018: Kaepernick kampanyası',
        body: 'ABD\'de polis şiddetine karşı diz çöken sporcu Colin Kaepernick ile imzalanan kampanya, markayı politik tartışmanın ortasına yerleştirdi. Kısa vadede boykot tehdidi, uzun vadede otuz yaş altı tüketicide rekor sadakat. Marka değeri altı milyar dolar civarında arttı.',
      },
    ],
    crisesAndTurningPoints: `Nike\'ı en çok sarsan kriz 1997-1998 arası "sweatshop" tartışmasıdır. Endonezya, Vietnam ve Çin\'deki tedarik fabrikalarında çocuk işçi, asgari ücret altı çalışma saatleri ve güvensiz çalışma koşulları belgelendi. New York Times ve sivil toplum örgütleri kampanyaları Nike\'ı bir insan hakları davasına dönüştürdü. Satışlar üç yıl içinde büyüme ivmesini kaybetti.

Knight 1998\'de bir konuşmada "Nike ürünleri çalışma koşulu istismarıyla eşanlamlı hale geldi" itirafını yaptı ve kurumsal sorumluluk çerçevesini yeniden kurmayı taahhüt etti. Sonraki yirmi yılda tedarik denetim kodları, bağımsız denetim, şeffaflık raporları ve fabrika isim listesinin yayımlanması kurumsal sorumluluk alanında endüstri standardı haline getirildi.

İkinci dönüm noktası 2020-2022 pandemi ve tedarik zinciri kriziydi. Vietnam fabrikalarının kapanması, Nike\'ı doğrudan tüketiciye satış kanallarına (DTC) daha hızlı itti. Bu geçiş, klasik perakende ortaklarıyla ilişkileri geren bir kayma yarattı.`,
    currentPosition: `Nike\'ın yıllık gelir dönmeli elli milyar dolar bandında. Pazar payı küresel spor ayakkabı ve giyim kategorisinin lideri. Adidas ve Puma klasik rakipler; son on yılda On Running, Hoka ve Lululemon gibi niş markalar segment segment pay kaparak baskı kuruyor.

Şirketin stratejik ekseni iki kolda ilerliyor. Birincisi doğrudan tüketici ilişkisi: Nike.com, Nike App, SNKRS uygulaması ve doğrudan işletilen mağazalar, üçüncü taraf perakendecilerin payını aşağı çekiyor. İkincisi, veri üzerinden kişiselleştirme: uygulama ekosistemi milyonlarca koşu ve antrenman verisi toplayarak ürün geliştirme ve pazarlama kararlarını besliyor.

Zayıflayan ayak: yenilik hızı. Hoka ve On gibi genç markaların teknik koşu segmentinde büyümesi, Nike\'ın reaktif kalmasına yol açtı. 2024\'te başlayan liderlik değişikliği, bu reaktif konumun düzeltilmesi üzerine kuruldu.`,
    editorialNote: `Nike\'tan çıkan ilk ders, ürünün anlatıdan daha kırılgan bir varlık olduğudur. Bir rakip daha iyi bir sole tasarımı getirebilir, daha iyi bir malzeme bulabilir. Ancak "Just Do It" gibi iç dünya hitabıyla kurulan bir marka çerçevesi, ürün düzleminde taklit edilemez. Genç markalar için ilk ayırt edici yatırım üründe değil, dil dünyasındadır.

İkinci ders, sözcünün stratejik bir tasarım kararı olduğudur. Air Jordan sözleşmesi sadece bir sporcuyla imza değil, markanın kültürel hiyerarşide alacağı konumun planlanmasıdır. Erken aşama markaların düştüğü tuzak, sözcüyü "tanıtım bütçesi" olarak ele almaktır; halbuki doğru sözcü, markanın üzerine inşa edileceği iskelettir.

Üçüncü ders, başarılı markaların en büyük düşmanı kendi tedarik zincirinin görünmezliğidir. Nike\'ın sweatshop krizi, markanın değer söylemiyle operasyonel gerçekliği arasındaki uçurumun tüketici tarafından her an ölçülebileceğini gösterdi. Büyüme planlarında maliyet üstünlüğü kadar, tedarik şeffaflığı da ileri yatırım kalemi olmalıdır.`,
  },
  {
    slug: 'airbnb',
    name: 'Airbnb',
    sector: 'Konaklama ve Teknoloji',
    foundedYear: 2008,
    headquartersCity: 'San Francisco',
    headquartersCountry: 'ABD',
    origin: 'GLOBAL',
    positioning:
      'Airbnb, konaklama sektörünün envanter temelli mantığını ters çevirerek binlerce küçük ev sahibini küresel bir markaya çevirme modelini kurdu.',
    foundingStory: `Brian Chesky ve Joe Gebbia, 2007\'de San Francisco\'da kiralarını ödemekte zorlanan iki tasarımcıydı. Şehirde gerçekleştirilen bir tasarım konferansında tüm otellerin dolmasını fırsata çevirip oturma odalarına hava yatağı serdiler. Üç konuğu misafir ettiler. Konsept çalıştı.

Ertesi yıl, Harvard mezunu yazılımcı Nathan Blecharczyk da ekibe katıldı ve 2008\'de Airbed & Breakfast adıyla siteyi başlattılar. İlk yıllar zor geçti; yatırımcılar modeli "romantik ama ölçeklenmez" buldu. Girişimciler 2008 ABD başkanlık seçimi sırasında seçim temalı tahıl kutuları ürettiler ve on binlerce dolar gelir sağlayarak şirketi ayakta tuttular.

2009\'da Y Combinator\'a kabul edildiler. Paul Graham\'ın önerisiyle New York\'taki ev sahiplerini tek tek ziyaret ederek ilanlarını profesyonel fotoğraflarla yeniden çektiler. Bu operasyonel müdahale, listelerin dönüşüm oranını iki katına çıkardı ve şirketin erken büyüme eğimini oluşturdu.`,
    founderVision: `Chesky\'nin Airbnb için tasarladığı çerçeve "otele alternatif" değil, "yer aidiyeti" olarak kurgulandı. Konuk bir otel odası tutmuyor, bir mahalleye, bir ev sahibine, bir yaşam biçimine kısa süreli misafir oluyordu.

Bu çerçeve iki pratik kararı doğurdu. Birincisi, ürünün fotoğraf ve hikaye üzerine kurulmasıydı; ilan sayfası bir otel listesi gibi değil, bir ev albümü gibi tasarlandı. İkincisi, "host" (ev sahibi) kavramının markanın yüzü haline getirilmesiydi; Airbnb müşteriye hizmet değil, ev sahibine altyapı satıyordu.

2014\'te tanıtılan "Belong Anywhere" sloganı ve yuvarlak Bélo logosu bu konumlanmayı görselleştirdi. Marka, bir aracı platform olmaktan çıkıp küresel bir aidiyet ağı olarak sunulmaya başlandı.`,
    strategicDecisions: [
      {
        title: 'Ev sahiplerini eğitime yatırım',
        body: 'Airbnb büyümesini ev sahibinin kalitesine bağladı. Profesyonel fotoğraf desteği, fiyatlama algoritması, konuk iletişim rehberleri, hizmet standartları. Arz kalitesini kontrol etmek arz hacmini kontrol etmekten daha belirleyici olduğu için bu yatırım sürekli öne çekildi.',
      },
      {
        title: 'Trust & Safety altyapısı',
        body: '2011\'de bir konuk ev sahibinin evini tahrip etti. Olay basına yansıdı. Airbnb\'nin tepkisi bir milyon dolarlık "Host Guarantee" sigortası, yirmi dört saat destek hattı ve kimlik doğrulama sistemiydi. Güven altyapısı, platformun market birincisi konumunu korumasının temeli oldu.',
      },
      {
        title: '2016: Deneyimler kategorisi',
        body: 'Platform sadece konaklama değil, şehir deneyimleri sunmaya başladı: yemek turu, fotoğrafçılık atölyesi, dağ yürüyüşü. Bu adım markanın kategori genişlemesi niyetini ortaya koydu; pandemi sırasında "Online Experiences"la dijital alana taşındı.',
      },
      {
        title: '2020: Halka arz öncesi kriz yönetimi',
        body: 'Pandemi ilk günlerinde Airbnb gelirinin yüzde sekseni buharlaştı. Chesky halka açık bir mektupta işçi çıkarmalar ve stratejik küçülmeyi açıkladı. Sonraki on sekiz ayda dijital göçerliği büyüyen uzun konaklama pazarında konumlandılar. 2020 sonu halka arzda piyasa değeri yüz milyar doların üzerinde oldu.',
      },
    ],
    crisesAndTurningPoints: `Airbnb\'nin markasını sarsan dört ayrı dalga belirleyicidir.

Birincisi 2011\'deki Trust & Safety krizidir. Müşteri hikayesinin medyaya yayılmasıyla şirket ilk kurumsal kriz iletişimi sınavını verdi. Yanıt zamanında ve kapsamlı olduğu için olay markanın zayıflayan değil güçlenen bir döneme girişi haline geldi.

İkincisi 2014-2017 arası kentlerle yaşanan yasal gerilimdir. New York, Berlin, Barselona ve Amsterdam gibi şehirler kısa süreli konaklamayı kira enflasyonu ve konut krizinin sebebi olarak işaretledi. Airbnb bu kentlerde lisans, konaklama vergisi ve gece sınırı gibi yükümlülüklerle uzlaştı. Bazı pazarlarda kalıcı düzenleme yapılırken, bazılarında faaliyet kısıtlandı.

Üçüncüsü pandemidir. İş modelinin seyahate bağlı olması nedeniyle gelir birkaç hafta içinde düştü. Chesky\'nin kriz iletişimi ("Unutmayın, bu şirketi kurarken de elimizde hiçbir şey yoktu") marka anlatısını korudu.

Dördüncüsü son iki yıldır sürmekte olan "Airbnb effect" eleştirisidir: turistik kent merkezlerinde kısa süreli konaklamanın uzun dönem kiracıları sürmesi. Airbnb 2023\'ten itibaren yerel yönetimlerle iş birliği, sınırlı envanter ve uzun vadeli konaklamaya öncelik verme politikalarını öne çekti.`,
    currentPosition: `Airbnb bugün iki yüz ülkede yedi milyondan fazla aktif ilan ve yıllık yaklaşık on milyar dolarlık gelir üreten bir platformdur. Piyasa değeri yetmiş beş ile yüz milyar dolar aralığında dalgalanıyor.

Stratejik öncelik iki başlıkta öne çıkıyor. Birincisi, "Airbnb Icons" gibi deneyim fonksiyonlarını markaya geri taşıyarak temel rezervasyon ürününü zenginleştirmek. İkincisi, sunulan konaklama tipolojisinin tahmin edilebilirliğini artırmak: "Guest Favorites" etiketi ve daha sıkı kalite denetimi, uzun süreli tüketici güven sorunlarına yanıt olarak tasarlandı.

Rekabet cephesi çeşitlenmektedir: Booking.com, Expedia gibi klasik oyuncular kısa süreli konaklamaya yatırım yapıyor; Vrbo özellikle aile ve grup segmentinde baskı uyguluyor. Airbnb\'nin avantajı hâlâ marka bilinirliği ve ev sahibi sadakatidir.`,
    editorialNote: `Airbnb\'den çıkan ilk ders, bir marka kategorisini yeniden tanımlarken, yeni kategorinin tüketici diline oturmasının gerekli olduğudur. "Airbed & Breakfast" adıyla başlayıp "Airbnb\'e dönüşen" süreç, kategorilerin kendi dilini kurmaları gerektiğinin özetidir. Tüketici "bir Airbnb tutmak" diyebildiği anda marka kategoriyi yutmuştur.

İkinci ders, iki taraflı platformlarda arz tarafının kalitesinin talep tarafının deneyiminden daha belirleyici olduğudur. Airbnb\'nin ev sahibi eğitim ve araçlara yatırımı, tüketici pazarlamasına yatırımdan daha yüksek getiri sağladı. Pazaryeri markaları için arz tarafının altyapısı, rakipler karşısında asıl hendektir.

Üçüncü ders, kriz iletişiminin marka için uzun vadeli bir değer yaratıcı olabileceğidir. 2011\'deki tahribat olayı ya da 2020 pandemisinde Chesky\'nin şeffaf yönetimi, krizleri birer anlatı kaybı değil, marka güven birikiminin parçası haline getirdi. Kriz anında söylenen söz, sonraki on yılın anlatı sermayesinin tohumudur.`,
  },
  {
    slug: 'netflix',
    name: 'Netflix',
    sector: 'Medya ve Teknoloji',
    foundedYear: 1997,
    headquartersCity: 'Los Gatos',
    headquartersCountry: 'ABD',
    origin: 'GLOBAL',
    positioning:
      'Netflix, DVD kiralama şirketi olarak doğup kendi teslimat kanalını yayın platformuna, ardından stüdyoya çevirerek işini üç kez yeniden kuran markadır.',
    foundingStory: `Reed Hastings 1997\'de Marc Randolph ile birlikte Netflix\'i kurdu. Efsane anlatıya göre Hastings, Blockbuster\'da geç iade ettiği bir kaset için kırk dolar gecikme cezası ödedikten sonra fikir doğdu. Hastings sonradan bu anlatının pazarlama kurgusu olduğunu kabul etse de tetikleyici ihtiyaç gerçekti: geciken iadeler, sınırlı stok, dar mağazalar.

İlk model posta yoluyla DVD kiralamaydı. Müşteri aylık ücret karşılığında listesindeki filmleri sırayla alıyor, izlediğinde iade ediyordu. Gecikme cezası yoktu. Kullanıcı deneyimi, dönemin perakende kiralama sektöründen keskin biçimde ayrıştı.

2000\'de Blockbuster, Netflix\'i elli milyon dolara satın alma teklifini reddetti. Hastings\'in gelip oturduğu toplantıda teklif "gülünç" bulundu. Dokuz yıl sonra Blockbuster iflas başvurusunda bulundu.`,
    founderVision: `Hastings\'in Netflix\'e yüklediği temel fikir, "tüketicinin zamanına saygı gösteren eğlence servisi" idi. Gecikme cezası yoktu, mağaza gezisi yoktu, filmi bulmak için algoritma vardı.

Bu vizyon bir kurumsal davranış kodu üretti: "çok çocuklu bir şirket yerine bir spor takımı ol". Hastings\'in "Rules" başlıklı iç belgesi, Netflix\'i yüksek performans beklentisiyle yönetilen, ortalamayı kaldırmayan, açık geri bildirim kültürüne sahip bir şirket olarak tanımlıyordu. Bu belge Silicon Valley kültüründe referans haline geldi.

Marka yüzündeki süreklilik ise "tüketiciye zaman tasarrufu"dur. Her teknolojik geçiş (DVD, streaming, özgün yapım) bu sürekliliği destekler.`,
    strategicDecisions: [
      {
        title: '2007: Streaming\'e geçiş',
        body: 'DVD\'den dijital akışa geçiş kararı, şirketin o ana kadarki tüm büyüme ivmesini riske atıyordu. Hastings bilinçli olarak DVD işini başka bir CEO\'ya bıraktı ve streaming tarafına yatırım yaptı. Kararın hızı, rakiplerin tepki vermesinden daha çabuk oldu.',
      },
      {
        title: '2011: Qwikster hatası ve düzeltme',
        body: 'Hastings DVD ile streaming\'i ayrı markalara ayırmayı denedi. Müşteri tepkisi ezici oldu, üç haftada geri adım atıldı. Bu kriz şirket içi kararların hızla kamuya açık hale getirilmesi pratiğini doğurdu.',
      },
      {
        title: '2013: Özgün yapımın ilk dalgası',
        body: 'House of Cards ile başlayan özgün dizi yatırımı, Netflix\'i lisanslı içerik dağıtıcısı olmaktan çıkarıp bir stüdyoya çevirdi. Bir sezonun tamamı aynı anda yayımlanması, tüketicinin izleme alışkanlığını yeniden şekillendirdi.',
      },
      {
        title: '2022-2023: Şifre paylaşımının ücretlendirilmesi ve reklamlı tier',
        body: 'Büyümenin yavaşlaması üzerine şirket iki klasik kararı aldı: ücretsiz şifre paylaşımını ücretlendirmek ve reklamlı abonelik tipini devreye almak. Kısa vadede üye kaybı tahmin edilirken, tersine net üye artışı yaşandı.',
      },
    ],
    crisesAndTurningPoints: `Netflix\'in markasını belirleyen üç kritik an vardır.

Birincisi 2011 Qwikster hatasıdır. Fiyatlamanın yeniden yapılandırılması ve DVD-streaming ayrımı, müşterilerin iki ayrı abonelik ücreti ödeyeceği anlamına geliyordu. Sekiz yüz binlik abone kaybı ve hisse değerinin yüzde yetmiş beş düşüşü, Hastings\'in kamuya açık özrüyle sonuçlandı. Karar geri alındı, stratejik ders olarak markanın kaynağı haline getirildi.

İkincisi 2020 pandemidir. Lockdown döneminde Netflix on altı milyon yeni abone kazandı, piyasa değeri neredeyse iki katına çıktı. Ancak 2022 ilk çeyreğinde iki yüz binlik abone kaybı, pandemi büyüme sonrası beklentilerin sürdürülemez olduğunu gösterdi. Marka anlatısı "sonsuz büyüyen servis" çerçevesinden "olgunlaşan medya şirketi" çerçevesine kaydı.

Üçüncüsü içerik harcamalarının sürdürülebilirlik sorunudur. Yıllık on yedi milyar dolar bandındaki yapım bütçesi, Disney\'in varlık zenginliğiyle, Amazon\'un cepiyle, Apple\'ın entegre sistemiyle yarışmak zorunda. Netflix\'in öne çıkması için harcamanın içerik kalitesine ve yerel pazara odaklanması gerektiği 2023 sonrasında belirleyici hale geldi.`,
    currentPosition: `Netflix\'in global abone sayısı iki yüz seksen milyon civarı, yıllık gelir otuz beş milyar dolar bandında. Abone başına ortalama gelir gelişmiş pazarlarda on beş dolar, gelişmekte olan pazarlarda üç ile sekiz dolar arası.

Stratejik çerçeve üç kolda ilerler. Birincisi, yerel yapımın ölçeklendirilmesi. Güney Kore, İspanya, Türkiye, Hindistan gibi pazarlarda üretilen diziler küresel pazara taşınıyor. Squid Game, La Casa de Papel ve Kara Tahta bu stratejinin referans yapımlarıdır.

İkincisi reklamlı abonelik katmanı. Düşük fiyatlı, reklam destekli plan 2022\'de devreye girdikten sonra marjin hesaplamalarının yeni sütunu haline geldi. 2024 itibarıyla Netflix\'in en hızlı büyüyen aboneliği bu kategoridir.

Üçüncüsü, oyun platformu denemesi. Henüz gelir üretmeyen ama marka evreninin genişletilmesi olarak konumlanan Netflix Games, dizilerden türeyen oyunlarla IP\'yi çoklu platforma yayma testidir.`,
    editorialNote: `Netflix\'in hikayesinden çıkarılan ilk ders, başarılı markaların kendi dağıtım kanalını kanıbalize etme cesaretine ihtiyaç duyduğudur. DVD iş modelindeki gelir hala güçlü akarken streaming\'e geçişte ısrar etmek, çoğu yönetim kurulunun onaylamayacağı bir risk aldı. Pazar geçişi sırasında kendini önce kendin yıkmak, rakibe yıktırmaktan ucuzdur.

İkinci ders, yanlış stratejinin hızla geri alınmasının marka değerini zayıflatmadığıdır. Qwikster hatasının üç haftada geri çekilmesi, şirketin güvenilirliğini artırdı. Büyük markalar için gerçek kırılganlık, hata yapmak değil, hatayı zamanında görmemek ve geri almamaktır.

Üçüncü ders, orijinal içerik üretiminin dağıtımcı ekonomisinden stüdyo ekonomisine geçişi zorunlu kıldığıdır. Netflix bir dağıtım platformu olarak başladı, ama lisans pazarlığı kontrolü üretici tarafında olduğu için aşağı yukarı öngörülen zamanda kendi içeriğini üretmek zorunda kaldı. Marka bağımsızlığı için tedarik bağımlılığı, erken aşamada çözülmesi gereken bir soru olarak masaya gelmelidir.`,
  },
  {
    slug: 'lego',
    name: 'LEGO',
    sector: 'Oyuncak',
    foundedYear: 1932,
    headquartersCity: 'Billund',
    headquartersCountry: 'Danimarka',
    origin: 'GLOBAL',
    positioning:
      'LEGO, bir oyuncak tuğlasını yüz yılı aşkın süre ayakta tutan kural sistemiyle, çocuğun yaratıcılığını kurumsal bir iş modeline dönüştürmüş markadır.',
    foundingStory: `Ole Kirk Christiansen, Danimarka\'nın Billund kasabasında marangoz olarak çalışırken 1929 büyük buhranı atölyesini zor duruma soktu. Yetişkin mobilyası satamaz hale gelince küçük ahşap oyuncaklar üretmeye başladı. İsim "leg godt" (iyi oyna) ifadesinden türetildi. Latince "topla" anlamına gelen "lego" ile örtüşmesi sonradan fark edildi.

1947\'de Ole Kirk, Danimarka\'nın ilk plastik enjeksiyon kalıp makinesini satın aldı. 1949\'da birbirine geçen tuğla prototipinin atası olan "Automatic Binding Brick" piyasaya sunuldu. İlk yıllarda ebeveynler "plastik oyuncak" fikrine soğuk baktı; ahşap güvendeydi, plastik "geçici" gibi görünüyordu. Satışlar zayıf seyretti.

1958\'de oğlu Godtfred, tuğlaların iç tüp sistemini patentledi. Bu dizayn, farklı yıllardaki tuğlaların birbirine uyum sağlamasını garanti etti. Bugün 1958\'de üretilen bir tuğla, 2025\'te üretilen bir tuğlayla birleşir. Bu uyum, markanın en güçlü kontratıdır.`,
    founderVision: `Ole Kirk\'ün kurduğu çerçeve, "yalnızca en iyisi yeterince iyidir" ilkesiydi. Bu cümle şirketin orijinal iç kodu olarak bugüne kadar aktarılır. Kalite, marka değerinden önce bir imalatçı gururuydu.

Godtfred, babasının ilkesini sistemli bir oyun felsefesine genişletti. "Sistem oyuncağı" fikri, tek bir ürünün değil, birbiriyle sonsuz kombine olabilen bir ekosistemin oyuncak olduğunu söylüyordu. Her yeni setin eskilere eklenebilmesi, müşteriye hayat boyu sadakat teklif ediyordu.

Üçüncü kuşak Kjeld Kirk Kristiansen, 1980\'lerde bu sistemi eğitim ve dijital alana genişletti. LEGO Education ve Mindstorms gibi yan kollar, markanın "çocuk oyuncağı"ndan "yaratıcı düşünce platformu"na dönüşmesinin kaldıraçlarıydı.`,
    strategicDecisions: [
      {
        title: '1958: Tuğla uyumunun patentlenmesi',
        body: 'Birbirine geçen tuğlaların iç tüplü dizaynı, LEGO\'yu bir ürün olmaktan çıkarıp bir standart haline getirdi. Her yeni üretim eski envanterle uyumludur. Bu karar hem müşteri sadakatinin hem de koleksiyon davranışının temelidir.',
      },
      {
        title: '1998: Lisanslı seriler dönemi',
        body: 'Star Wars lisansıyla başlayan dış IP serileri, LEGO\'yu yetişkin tüketiciye taşıdı. Harry Potter, Marvel, Batman gibi lisanslar marka evrenini büyütürken, "çocuk oyuncağı" dar sınıflandırmasından kurtardı.',
      },
      {
        title: '2004: İflas eşiğinden dönüş',
        body: 'Erken 2000\'lerde aşırı çeşitlenme (LEGOLAND park yatırımları, moda saatleri, video oyunları) şirketi iflas eşiğine getirdi. Jørgen Vig Knudstorp liderliğinde tuğlaya dönüş ve lisanslara yoğunlaşma stratejisi şirketi on sekiz ayda karlılığa çıkardı.',
      },
      {
        title: '2019+: Sürdürülebilir malzeme araştırması',
        body: 'Petrol tabanlı ABS plastiğinin karbon ayak izi büyüktür. LEGO 2030\'a kadar tüm tuğlalarını yenilenebilir malzemeden üretme hedefini açıkladı. Prototip bio-plastik ve geri dönüştürülmüş PET denemeleri sürüyor. Tuğla uyum standardı korunmak zorunda olduğu için bu geçiş teknik olarak zorlu.',
      },
    ],
    crisesAndTurningPoints: `LEGO\'nun markasını yakan en büyük ateş 1998-2003 arası aşırı çeşitlenme krizidir. Şirket tuğlanın dışına çıkarak moda aksesuarları, bilgisayar oyunları, temalı parklar ve televizyon şovları yatırımlarına girdi. 2003\'te yıllık kayıp üç yüz milyon dolara ulaştı. Sezon sonu stoklar dağıtım kanallarını tıkadı.

Kurtarma planı McKinsey danışmanı Jørgen Vig Knudstorp\'un CEO olarak atanmasıyla başladı. Knudstorp\'un ilk hamleleri belirleyicidir: LEGOLAND parkları yatırım fonuna satıldı, ürün yelpazesi yüzde otuz daraltıldı, tedarik zinciri yeniden yapılandırıldı. 2006\'dan itibaren büyüme geri döndü ve LEGO, 2014-2017 arası küresel oyuncak sektörünün en karlı markası haline geldi.

İkinci kriz 2017 sonrası dijital alışkanlıkların oyuncak sektörünü vurmasıdır. Mobil oyunlar ve tabletler çocukların dikkat bütçesini aşağı çekti. LEGO yanıt olarak fiziksel tuğlanın dijital deneyimle birleştiği LEGO Life platformunu ve LEGO Ideas kullanıcı katkı programını devreye aldı.`,
    currentPosition: `LEGO bugün yıllık sekiz milyar Euro civarında gelirle dünyanın en büyük oyuncak markası. Aile şirketi yapısı korunuyor; halka arz edilmedi. Kjeld Kirk Kristiansen\'in oğlu Thomas Kirk Kristiansen yönetim kurulu başkanı.

Stratejik öncelik üç başlıkta ilerliyor. Birincisi yetişkin tüketici segmenti: on sekiz yaş üstü (AFOL — Adult Fans of LEGO) topluluğu için tasarlanan karmaşık setler (Mimari, Teknik, Ideas) katalogun büyüyen payı. İkincisi uluslararasılaşma: Çin pazarı büyüyor ve Şanghay\'da ikinci merkez ofis açıldı. Üçüncüsü sürdürülebilir malzeme yatırımı.

Rakipler klasik oyuncak pazarında Hasbro, Mattel; koleksiyon segmentinde Funko, MEGA Construx; dijital oyun alanında Minecraft ve Roblox.`,
    editorialNote: `LEGO\'nun hikayesinden çıkan ilk ders, ürün standardının marka sürekliliğinin asıl tutkalı olabileceğidir. 1958\'deki tuğla patentinin altındaki teknik karar, marka pazarlamasının hiçbir kampanyasının sağlayamayacağı bir sadakat türü üretti. Müşteri çocuğuna aldığı bir seti kendi çocukluğundaki LEGO\'larla birleştirdiğinde, bir ürünle değil bir akrabalıkla karşılaşır. Markanın geleceğini düşünürken, ürünün standartlaşabilir bir fiziksel kuralını aramak stratejik değerdir.

İkinci ders, bir markanın yatırım disiplininin kimliğinden daha kırılgan olduğudur. LEGO, "tuğla" öz kimliğini kaybetmedi. Ancak kimliğine uygun olmayan işlere girince iflas eşiğine geldi. Kimlik, neyin yapıldığıyla değil, neyin yapılmadığıyla de korunur. Büyüyen markalar için "evet" kadar "hayır"ı disipline etmek, uzun vadeli sürdürülebilirliğin omurgasıdır.

Üçüncü ders, kurucu ailesinin kurumsal yapıdaki rolünün marka tutarlılığına katkı sağlayabileceğidir. LEGO\'nun üçüncü nesil aile yönetimi, finansal baskılara karşı uzun vadeli tercihleri savunabilecek bir karar mekanizması kurdu. Halka arz edilmeyen, aile kontrolünde kalan ve kurumsal yönetim disipliniyle çalışan hibrit model, LEGO\'nun derinden öğrendiği bir sermaye yapısıdır.`,
  },
  {
    slug: 'red-bull',
    name: 'Red Bull',
    sector: 'İçecek',
    foundedYear: 1987,
    headquartersCity: 'Fuschl am See',
    headquartersCountry: 'Avusturya',
    origin: 'GLOBAL',
    positioning:
      'Red Bull, bir enerji içeceği satmak yerine, enerji içeceğinin temsil ettiği zihin dünyasını içerikle kurarak medya şirketine dönüşmüş markadır.',
    foundingStory: `Dietrich Mateschitz, 1980\'lerin başında bir Avusturya markası için Asya pazarını geziyordu. Tayland\'da "Krating Daeng" adlı yerel bir tonik içtiğinde jet lag\'inin etkisinin azaldığını fark etti. İçeceğin sahibi Chaleo Yoovidhya ile 1984\'te bir ortaklık kurdu. Formüle gazlı bir doku eklendi, ambalaj Avrupa pazarına göre yeniden tasarlandı.

Red Bull 1987\'de Avusturya\'da piyasaya sürüldü. İlk üç yıl satışlar beklenenin altında seyretti. Mateschitz klasik bir içecek reklamı kampanyası yerine "gönüllü pazarlama" stratejisine yöneldi: ürünün tüketici anı spor salonlarında, gece kulüplerinde, üniversite partilerinde inşa edildi. Bu yaklaşımın temel fikri şuydu: Red Bull bir içecek değil, bir yaşam biçimidir.

1990\'lardan itibaren kayak, snowboard, motokros gibi ekstrem sporlarda sponsorluk anlaşmaları çoğaldı. 2000\'de Red Bull Air Race serisi başlatıldı. 2012\'de Felix Baumgartner\'ın stratosferden atlayışı (Red Bull Stratos) dünya genelinde on milyonlarca canlı izlenme topladı.`,
    founderVision: `Mateschitz\'in markasına yüklediği fikir, reklamın içeriğe dönüşmesiydi. Rakipler bütçesini televizyon spotlarına harcarken Red Bull, bütçesini kendi içerik stüdyosunu kurmaya aktardı.

Bu vizyon iki pratik karar doğurdu. Birincisi, şirketin bir medya kolunun kurulmasıydı. Red Bull Media House bugün televizyon kanalı, baskı dergisi, belgesel yapımı, dijital platform ve canlı yayın altyapısı işletir. İkincisi, sporcu-sözcü modelinin spor kulüplerine genişletilmesiydi. Red Bull kendi futbol takımlarını (Salzburg, Leipzig, New York) kurdu ya da satın aldı; Formula 1\'de iki ayrı takım sahibi oldu.

Marka, ürün satışından daha çok içerik üretimine zaman ve sermaye harcar. Bu tersine çevrilmiş pazarlama bütçesi, Red Bull\'u bir içecek markasından zihin pazarlamasının evrensel referansına çevirdi.`,
    strategicDecisions: [
      {
        title: 'Red Bull Media House kurulması',
        body: '2007\'de resmileştirilen medya yapısı, markaya televizyon, dijital ve baskı alanlarında içerik üretim yetkinliği kazandırdı. Red Bull TV, ROCKED dergisi, özgün belgesel üretim birimi ve dünya çapında yayın kapasitesi bu altyapının parçalarıdır.',
      },
      {
        title: 'Takım sahipliğine geçiş',
        body: 'Sponsorluk yetmez, kulübün kendisine sahip olunmalı. Red Bull 2005\'ten itibaren FC Red Bull Salzburg, RB Leipzig, Red Bull New York ve Red Bull Bragantino gibi futbol kulüplerine; Formula 1\'de Red Bull Racing ve Scuderia AlphaTauri\'ye sahip. Bu karar, marka görünürlüğünü sponsor rozetinden kurumsal mülkiyete taşıdı.',
      },
      {
        title: '2012: Stratos atlayışı',
        body: 'Felix Baumgartner\'ın otuz dokuz kilometreden atlayışı, canlı yayında sekiz milyon eşzamanlı izleyici topladı. Maliyeti elli ile yüz milyon dolar bandında tahmin edilen proje, pazarlama harcamasından çok "markanın kültürel olaya dönüştüğü an" olarak okundu.',
      },
      {
        title: 'Ürün yelpazesinde disiplin',
        body: 'Red Bull, kategori genişlemesine direnen az sayıda FMCG markasından biridir. Ürün ailesi temelde Red Bull Classic, Sugarfree ve Editions\'tan oluşur. Monster gibi rakipler ürün çeşitliliğine yönelirken Red Bull ana formülde kaldı.',
      },
    ],
    crisesAndTurningPoints: `Red Bull\'un markasının sınavları dört temel başlıkta gruplandırılabilir.

Birincisi sağlık endişeleriyle yaşanan hukuki davalar. 2000\'lerin başında Fransa ve Danimarka gibi bazı Avrupa ülkeleri Red Bull satışını geçici olarak yasakladı. Kafein ve taurin kombinasyonunun sağlık etkileri tartışıldı. Şirket bu süreci ülke bazında lobi, etiketleme güncellemeleri ve ulusal sağlık otoriteleriyle diyalog yoluyla çözdü.

İkincisi ekstrem spor kazalarıyla yaşanan itibar sınamaları. Red Bull sponsorlu sporcuların ölümle sonuçlanan kazaları (motokros, paraşüt, serbest dalış) marka iletişiminin en hassas alanlarından biri olageldi. Her vakada şirketin sponsorluk sorumluluğunun sınırı tartışmaya açıldı.

Üçüncüsü 2022\'de Dietrich Mateschitz\'in ölümüdür. Otuz beş yıl boyunca şirketi yöneten kurucunun ardından, 2023\'te yeni yönetim yapısı açıklandı. Oliver Mintzlaff\'ın CEO olarak atanması ile markanın kurucu sonrası dönemi başladı. Geçişin pürüzsüz olması, şirketin uzun vadeli yönetim mimarisine ne kadar yatırım yaptığının göstergesi oldu.

Dördüncüsü süregelen rekabet baskısıdır. Monster, Celsius, Alani Nu gibi rakipler özellikle genç kadın tüketici segmentinde pazar payı alıyor. Red Bull\'un cevabı daha fazla ürün çeşidine yönelmek değil, kültürel markayı derinleştirmek olageldi.`,
    currentPosition: `Red Bull dünyada on iki milyarın üzerinde kutu satışıyla yıllık on iki milyar Euro civarında gelir üreten özel bir şirkettir. Halka açık değil; Chaleo Yoovidhya ailesi ve Mateschitz mülkünün ortak kontrolünde kalıyor.

Marka pazarlama harcamasının büyük kısmını içerik üretimine ve spor kulübü sahipliğine ayırıyor. Formula 1\'de Red Bull Racing son yıllardaki dünya şampiyonlukları marka görünürlüğünü zirvede tuttu. 2024\'te Max Verstappen\'in takımdaki geleceğine dair tartışmalar, markanın sporla iç içe geçmiş kimliğinin kırılganlığını tekrar gündeme getirdi.

Rakiplerinden farkı, büyük pazar payı kaybetmeden kategori liderliğini kırk yıldır sürdürmesi. Global enerji içeceği pazarının yüzde otuzu civarına sahipken, Monster yüzde yirmi beş bandında.`,
    editorialNote: `Red Bull\'dan çıkan ilk ders, pazarlama bütçesinin reklamdan içeriğe kayabileceğidir. Rakip markaların televizyon spotlarına aktardığı bütçeyi Red Bull kendi stüdyolarını kurmaya yatırdı. Sonuç, şirketin bir içecek üreticisi olmasının ötesinde bir medya operatörü olmasıdır. Büyüyen markalar için pazarlama sorusu "nasıl reklam vereceğim" değil "hangi içeriği ben üreteceğim" biçimine dönüşebilir.

İkinci ders, ürün ailesinde disiplinin marka kıymetini koruduğu. Red Bull kategoriyi genişletme cazibesine kırk yıl boyunca direndi. Monster ürün yelpazesini çoğalttıkça Red Bull ana formülü savundu. Bu direnç, "her fırsata evet" kültüründe ender bir disiplindir.

Üçüncü ders, kurucu figürün planlı devrinin marka sürekliliği için kritik olduğudur. Mateschitz\'in ölümüyle şirketin çalkalanmaması, sonraki liderliğin seçiminin önceden hazırlandığının göstergesidir. Kurucu markaları için asıl sürdürülebilirlik, bir sonraki nesli ilk günden itibaren karar merkezine yerleştirmek ve kurucunun yerine koymamaktır.`,
  },
  // --- TÜRK MARKALARI ---
  {
    slug: 'turk-hava-yollari',
    name: 'Türk Hava Yolları',
    sector: 'Havacılık',
    foundedYear: 1933,
    headquartersCity: 'İstanbul',
    headquartersCountry: 'Türkiye',
    origin: 'LOCAL',
    featured: true,
    positioning:
      'Türk Hava Yolları, ulusal taşıyıcı kimliğinden küresel bir premium havayolu markasına geçişi, coğrafi avantajını pazarlama anlatısına dönüştürerek gerçekleştirmiştir.',
    foundingStory: `Devlet Hava Yolları İşletme Müdürlüğü, 1933\'te Ankara\'da, Milli Savunma Bakanlığına bağlı bir kurum olarak kuruldu. İlk filosu iki Junkers F13 uçağından oluşuyordu ve hizmetler Ankara, İstanbul, Eskişehir arasında sınırlıydı. Kuruluş yılları, genç Cumhuriyetin ulaşım altyapısını kurma çabasının bir parçasıydı.

1955\'te Devlet Hava Yolları, Türk Hava Yolları Anonim Ortaklığı adıyla ticari bir havayolu olarak yeniden yapılandırıldı. 1950\'ler ve 60\'larda Avrupa\'ya ilk tarifeli seferler başlatıldı. Ancak şirket 1990\'ların sonuna kadar zarar eden, dar filolu, ulusal taşıyıcı kimliğinde kalmış bir kurumdu.

Dönüm noktası 2003\'te başladı. Temel Kotil\'in genel müdürlük döneminde şirketin hedef pazarı yeniden tanımlandı: dünya nüfusunun yüzde yetmişinin dört saatlik uçuş mesafesinde olduğu coğrafi bir merkez olan İstanbul, aktarma pazarı için stratejik hub olarak konumlandırıldı. Bu tek cümlelik tez, sonraki yirmi yılın büyüme planını belirledi.`,
    founderVision: `THY\'nin modern dönemdeki çerçevesi kurucu tarafından değil, 2003 sonrası liderlik tarafından inşa edildi. Bu çerçevenin merkezindeki fikir, Türk Hava Yolları\'nı bir "ulusal havayolu" olmaktan çıkarıp "global ağ havayolu" yapmaktı.

Bu vizyon üç pratik karara dayandı. Birincisi, destinasyon sayısının hızla büyütülmesi; 2003\'te yetmiş beş olan destinasyon sayısı 2024\'te üç yüz otuzu aşmıştır. İkincisi, premium servis standardının Avrupa ve Körfez taşıyıcılarıyla aynı liga taşınmasıdır. Business class menüleri, Turkish Do & Co iş birliği, havaalanı lounge\'ları bu standartın somut ifadeleridir. Üçüncüsü, uluslararası pazarlama kampanyalarında tanınmış isimlerin kullanılmasıdır (Kobe Bryant-Messi Selfie, Drogba-Messi, Dr. Oz kampanyaları).

Marka 2010\'lu yıllarda "Widen Your World" sloganıyla küresel aktarma ağı kimliğini çerçeveledi.`,
    strategicDecisions: [
      {
        title: '2004: Star Alliance üyeliği',
        body: 'Küresel havayolu işbirliği ağına katılım, THY\'ye yüz elli ülkede yüzlerce havaalanına ortak kod paylaşımı imkanı kazandırdı. Ulusal taşıyıcı kimliğinden global marka kimliğine geçişin altyapısıdır.',
      },
      {
        title: 'Geniş gövdeli uçak yatırımı',
        body: '2010\'lu yıllarda B777, A330, A350 siparişleri filonun uzun mesafe kapasitesini genişletti. Bu adım ABD, Uzak Doğu ve Afrika\'ya direkt uçuşların açılmasının teknik temelidir.',
      },
      {
        title: '2016-2019: Terör ve darbe girişimi sonrası yeniden konumlandırma',
        body: 'Türkiye\'de yaşanan güvenlik krizleri turistik pazarı sarstı. THY, transit pazarına daha fazla yaslanarak krizi yönetti. İstanbul\'dan gelen-giden yolcu yerine İstanbul\'dan geçen yolcu önceliklendirildi.',
      },
      {
        title: '2019: İstanbul Havalimanı taşınması',
        body: 'Atatürk Havalimanı\'ndan yeni havalimanına taşınma, filo kapasitesini büyüten bir altyapı hamlesidir. Havalimanı dünyanın en büyükleri arasındadır ve THY\'nin aktarma modelinin fiziksel ölçeğini genişletir.',
      },
    ],
    crisesAndTurningPoints: `Türk Hava Yolları\'nın son yirmi yılındaki kırılma noktaları şöyle sıralanabilir.

2011-2014 arası yüksek büyüme dönemi sonrasında geleneksel taşıyıcı kimliğinden premium kimliğe geçiş sınandı. SkyTrax beş yıldız skoru, yemek kalitesi, üst sınıf hizmet deneyimi marka pozisyonunun sürdürülebilirliğini kanıtladı.

2016 darbe girişimi ve ardından gelen turizm daralması, THY\'nin ulusal pazara bağımlılığını azaltma zorunluluğunu dayattı. Aktarma pazarına yaslanma bu dönemde stratejik olarak belirleyici hale geldi.

2020 pandemisi global havacılık sektörünü sarstı. THY, rakiplerinin önemli kısmının yere indiği dönemde kargo operasyonunu devreye alarak gelir üretmeye devam etti. Turkish Cargo, pandemi döneminde dünyanın en büyük hava kargo taşıyıcısı olarak yükseldi.

2023 sonrasında Körfez taşıyıcılarıyla (Emirates, Qatar Airways) yaşanan rekabet baskısı ve Rus pazarında yarattığı boşlukların yönetimi marka için süregelen başlıklardır.`,
    currentPosition: `Türk Hava Yolları bugün dünyanın en çok ülkeye uçan havayolu markasıdır. Yaklaşık yüz otuz ülkede üç yüz otuz destinasyona hizmet verir. Filosu dört yüz elliyi aşan uçakla Avrupa\'nın en büyük tarifeli filolarından biridir.

2023 finansal yılında on iki milyar dolar net kar açıkladı; bu rakam tek yıl bazında dünya havacılık tarihinin en yüksek karlarından biridir. Operasyonel kar marjı Körfez taşıyıcılarıyla aynı bantta.

Stratejik önceliği üç kolda ilerler. Birincisi Afrika ve Latin Amerika\'daki uçuş ağının derinleştirilmesi. İkincisi Turkish Cargo\'nun dünya lideri konumunun korunması. Üçüncüsü "Turkish Airlines" ve "AJet" markaları arasındaki segment ayrımının netleştirilmesi; AJet ekonomik segmentin, Turkish Airlines premium segmentin taşıyıcısı olarak konumlanıyor.`,
    editorialNote: `Türk Hava Yolları\'ndan çıkan ilk ders, coğrafi konumun bir iş modeli tezine çevrilebileceğidir. İstanbul\'un dünya nüfusunun büyük kısmına dört saat mesafede olması, on yıllarca bir olgu olarak yaşandı ama stratejik teze 2003\'te dönüştürüldü. Bir olgu ancak bir cümleye indirgendiğinde stratejik bir karar merkezi kurar.

İkinci ders, ulusal taşıyıcı kimliğinin global marka kimliğine dönüştürülmesinin küresel spor ve kültür pazarlaması üzerinden yapılabileceğidir. Manchester United, Euroleague, Avrupa futbolu sponsorlukları, Messi ve Kobe kampanyaları, THY\'nin "Türkiye\'nin havayolu" kimliğinden "dünyada uçan marka" kimliğine geçişinin araçlarıydı. Yerel markaların global açılımında, kendi sınırlarını aşan kültürel evrenlerle temas stratejik önceliktir.

Üçüncü ders, devlet ortaklığı olan markaların da yönetim kurulu profesyonalitesiyle global rekabete çıkabileceğidir. THY hisselerinin yüzde kırk dokuzu Türkiye Varlık Fonu bünyesinde kalırken, operasyonel yönetimi bağımsız profesyonellere bırakıldı. Devlet sermayesi ve yönetim bağımsızlığı birbirinin zıttı değil, doğru kurgulandığında birbirinin tamamlayıcısıdır.`,
  },
  {
    slug: 'baykar',
    name: 'Baykar',
    sector: 'Savunma',
    foundedYear: 1984,
    headquartersCity: 'İstanbul',
    headquartersCountry: 'Türkiye',
    origin: 'LOCAL',
    featured: true,
    positioning:
      'Baykar, Türkiye\'nin yurt dışına savunma sanayi ürünü ihraç eden ilk özel sektör markası olarak, devlet kontratı mantığından özel sektör mühendislik kültürüne geçişin prototipidir.',
    foundingStory: `Özdemir Bayraktar, 1984\'te İstanbul\'da Kağıthane\'deki bir atölyede Baykar Makine\'yi kurdu. İlk yıllar otomotiv yan sanayine yönelik metal parça üretimi yapıldı. Şirketin savunmaya yönelmesi oğullarının mühendislik eğitimi almasından sonra şekillendi. Selçuk Bayraktar, MIT\'de havacılık mühendisliği yüksek lisansı yaptı ve 2006\'da insansız hava aracı geliştirme programını başlattı.

İlk prototip Bayraktar Mini İHA, 2007\'de TSK tarafından kullanılmaya başlandı. 2014\'te orta irtifa uzun dayanıklılık (MALE) sınıfında Bayraktar TB2 ilk uçuşunu gerçekleştirdi. Şirket bu aşamada küçük ölçekli bir mühendislik firmasıydı; savunma sanayiinde devlet kontratı olmadan bu kategoride prototip geliştiren az sayıdaki özel Türk şirketinden biri.

2019-2020 Libya ve Suriye operasyonlarında TB2\'nin sahaya çıkışı, şirketin uluslararası görünürlüğünü artırdı. 2020 Dağlık Karabağ çatışmasında Azerbaycan\'ın Ermenistan karşısındaki tank ve hava savunma üstünlüğü, TB2\'lerin saha etkisinin küresel olarak izlenmesine yol açtı. Talep patlaması bu dönemde başladı.`,
    founderVision: `Selçuk Bayraktar\'ın markaya yüklediği fikir, "mühendislik kültürünün kurumsal yapıya içselleştirilmesi" idi. Klasik savunma sanayii firmalarının kontrata bağımlı çalışması, ürün inisiyatifini ihaleye bağlar. Baykar tersini kurguladı: prototip önce geliştiriliyor, ardından alıcı aranıyor.

Bu yaklaşımın iki pratik uzantısı vardır. Birincisi Ar-Ge bütçesinin, rakip firmalarla kıyaslandığında orantısız yüksek tutulmasıdır. Gelirin büyük kısmı yeni model geliştirmeye ayrılır. İkincisi, dış pazarlama ekibinin devlet diplomasisinden bağımsız işlemesidir; satışlar diplomatik kanaldan değil doğrudan askeri satınalma komiteleriyle yürütülür.

Marka görünürlüğü kurucu ailenin halka açık profiliyle güçlendirildi. Selçuk Bayraktar\'ın kamusal imajı, markanın mühendislik iddiasıyla bireysel hikayenin birleştiği bir anlatı üretti.`,
    strategicDecisions: [
      {
        title: 'Prototip-önce yaklaşımı',
        body: 'Devlet ihalesi beklenmeden prototip geliştirme, sektördeki şirketlerin çoğunluğundan farklı bir operasyonel modeldi. Maliyet kurucu aile tarafından finanse edildi. Başarıdan sonra bu model rakiplerce taklit edildi.',
      },
      {
        title: 'İhracata erken odaklanma',
        body: 'Türk savunma sanayi şirketlerinin çoğu yurt içi TSK pazarını yeterli büyüklükte görürken Baykar ilk günden uluslararası pazarı hedefledi. 2020-2024 arası otuzdan fazla ülkeye ihracat gerçekleştirildi.',
      },
      {
        title: 'Sahadaki kanıtı pazarlama aracına çevirme',
        body: 'Libya, Suriye, Karabağ ve Ukrayna çatışmalarında TB2\'nin saha performansı askeri analiz yayınlarında ve uzman değerlendirmelerinde öne çıktı. Baykar bu kanıtı satış kanallarına ürün dokümantasyonunun merkezine yerleştirdi.',
      },
      {
        title: 'Ürün yelpazesinde dikey genişleme',
        body: 'TB2\'den sonra Akıncı orta sınıf taarruz İHA\'sı, Kızılelma insansız savaş uçağı (MIUS) ve DİHA (denizaltı) projeleri başlatıldı. Yelpaze, İHA\'dan savunma sisteminin diğer kollarına doğru genişleme iddiasını ortaya koyar.',
      },
    ],
    crisesAndTurningPoints: `Baykar\'ın en kritik dönemi 2019-2020 arasında yaşandı. Libya ve Suriye operasyonlarında sahaya çıkan TB2\'lerin uluslararası medyada öne çıkması, şirketi küresel radar ekranına yerleştirdi. Ancak bu görünürlük beraberinde diplomatik baskıları da getirdi; Kanada üretim zincirinin kritik bir bileşenini ihraç izninden kaldırdı.

Baykar bu krize tepki olarak bileşen yerlileştirmesini hızlandırdı. Motor, görüntüleme sistemleri ve aviyonik bileşenlerin yerli tedarikçilerden temin edilmesi iki yıl içinde büyük ölçüde tamamlandı. Bu adım, şirketin dış politik baskıya karşı operasyonel dayanıklılığını artırdı.

İkinci dönüm noktası 2022\'de Rusya-Ukrayna savaşının başlamasıydı. Ukrayna\'nın TB2 ile elde ettiği ilk dönem başarıları marka bilinirliğini küresel ölçekte zirveye taşıdı. Ancak savaşın ilerleyen aşamalarında Rus elektronik harp sistemlerinin etkisi arttı; bu durum TB2\'nin teknik sınırlarını da gündeme getirdi. Şirket yanıt olarak bir sonraki nesil ürün Kızılelma\'nın geliştirme sürecini hızlandırdı.

Üçüncüsü, 2024\'te hissedar ve yönetim yapısında yaşanan değişikliklerdir. Özdemir Bayraktar\'ın 2021\'de kaybedilmesinin ardından kurumsal yönetim yapısının profesyonelleşmesi süreci hızlandırıldı.`,
    currentPosition: `Baykar 2024 itibarıyla yıllık gelirinin önemli bir bölümünü ihracattan elde eden özel bir savunma sanayii şirketidir. TB2, Akıncı ve yeni nesil Kızılelma ürün yelpazesini oluşturur. Otuzdan fazla ülkeye ihracat yapılmış, TB2 dünyada en çok ihraç edilen silahlı İHA\'lardan biri haline gelmiştir.

Stratejik öncelik ikili. Birincisi Kızılelma\'nın (MIUS) küresel pazara girişi. İnsansız savaş uçağı kategorisinde yaklaşan on yılın büyüme alanı bu ürünün seri üretimine bağlı. İkincisi, insansız deniz platformu (DİHA) ve uydu iletişim sistemleri gibi yan alanlarda ürün çeşitlendirme.

Küresel rakipler arasında General Atomics (MQ-9 Reaper), İsrailli IAI ve Elbit, Çinli CASC ve Wing Loong yer alır. Baykar\'ın avantajı fiyat-performans dengesi ve operasyonel sadelik; dezavantajı ise jeopolitik konjonktüre yüksek bağımlılık.`,
    editorialNote: `Baykar\'dan çıkan ilk ders, prototip-önce yaklaşımının sektörün kurumsal ritminde bir ayrışma yaratabileceğidir. Savunma sanayii gibi devlet kontratına bağımlı sektörlerde özel sermayeyi prototipe yatırmak kabul edilen norm değildir. Ancak bu norm kabul edildiğinde, ürün inisiyatifi alıcı tarafında kalır. Bayraktar ailesi ürünü önce kendisi finanse ederek bu inisiyatifi geri aldı. Bu şablon, teknoloji yoğun sektörlerde devlete bağımlı ekosistemler için referans bir modeldir.

İkinci ders, sahadaki kanıtın markanın en değerli iletişim varlığı olduğudur. Reklam bütçesi olmadan, askeri analistlerin açık kaynak incelemelerinde TB2\'nin sahaya çıkma başarıları marka değerini küresel ölçekte kurdu. B2B satışlarda sahadaki kanıt, şirketin geleneksel pazarlamasından daha belirleyicidir.

Üçüncü ders, dış politik bağımlılığın yerlileştirme disipliniyle bir dayanıklılık hendeğine çevrilebileceğidir. Kanada kaynaklı bileşen krizi, Baykar\'ı krizi fırsata çevirmeye itti. Tedarik zincirinin yerlileştirilmesi hem maliyet hem strateji düzeyinde uzun vadeli bağımsızlık getirdi. Tedarik bağımlılığı, bir şirketin en sessiz fakat en önemli stratejik kırılganlığıdır.`,
  },
  {
    slug: 'togg',
    name: 'TOGG',
    sector: 'Otomotiv',
    foundedYear: 2018,
    headquartersCity: 'Bursa',
    headquartersCountry: 'Türkiye',
    origin: 'LOCAL',
    positioning:
      'TOGG, Türkiye\'nin ilk yerli seri üretim otomobili olarak elektrikli mobilite kategorisine geç ama doğrudan giriş yapan, geleneksel otomotiv sıralamasını atlamayı deneyen bir markadır.',
    foundingStory: `TOGG (Türkiye\'nin Otomobili Girişim Grubu), 2018\'de beş büyük Türk sanayi grubunun (Anadolu Grubu, BMC, Kök Grubu, Turkcell, Zorlu Holding) TOBB koordinasyonunda bir araya gelmesiyle kuruldu. Hedef, Türkiye\'nin ilk yerli seri üretim otomobilini geliştirmekti. Cumhurbaşkanı Erdoğan\'ın uzun yıllardır dile getirdiği "yerli otomobil" vizyonunun kurumsal karşılığıydı.

Kuruluş dönemi ortak karar mekanizmalarının kurulması, uluslararası otomotiv mühendislik iş birlikleri ve üretim tesisinin planlanması ile geçti. İlk konsept modeller 2019\'da kamuoyuna tanıtıldı. Gemlik\'te kurulan üretim tesisi yaklaşık bir milyar Euro yatırımla 2022\'de faaliyete geçti.

İlk seri ürün olan T10X SUV modeli 2023 Mart\'ında müşteri teslimatlarına başladı. 2024 sonuna kadar Türkiye\'de otuz binin üzerinde araç teslim edildi. Almanya\'ya ilk ihracat 2024\'te başladı.`,
    founderVision: `TOGG\'un vizyonu, geleneksel otomotiv üreticiliğinin içeri sızma stratejisinden farklı tasarlandı. Türkiye, tarihi olarak küresel otomotiv markalarının lisanslı üretim üssüdür; TOGG bu konumu değiştirmek yerine, tamamen yeni bir kategori (elektrikli mobilite) üzerinden doğrudan küresel oyuncu olma iddiasıyla kuruldu.

Çerçevenin üç temel ögesi vardır. Birincisi, ürünün değil servisin ön plana çıkarılmasıdır. TOGG, aracı "mobilite cihazı" olarak konumlandırır ve Trumore, Trugo gibi dijital hizmet markalarıyla araç ekosistemini genişletir. İkincisi, yazılımın üretim standardının merkezinde olmasıdır; araçların yazılım güncellemesi üzerinden işlevsel olarak gelişmesi Tesla modelinin Türkiye uyarlamasıdır. Üçüncüsü, üretim kapasitesinin esnek tasarlanmasıdır; aynı platform üzerinden SUV, sedan ve diğer formatların üretilmesi planlanmıştır.

Marka kimliği "mobility" ve "sustainability" eksenlerine yaslanır.`,
    strategicDecisions: [
      {
        title: 'Doğrudan elektrikli segmente giriş',
        body: 'İçten yanmalı motorlu araçla başlamadan doğrudan elektrikliye odaklanma kararı, küresel otomotiv geçiş dalgasıyla aynı dönemde piyasaya çıkmayı mümkün kıldı. Bu karar olmasaydı TOGG, olgun pazarlarda doymuş İYM segmentine geç bir rakip olarak girecekti.',
      },
      {
        title: 'Yazılım öncelikli mimari',
        body: 'Araçların işletim sistemi olan Trumore, otomotiv firmalarının çoğunun stratejik zayıflığını adresliyor. Üretim şeridi yazılıma entegre edildi; bu karar ileride özerk sürüş ve servis ekonomisine geçişi kolaylaştırabilir.',
      },
      {
        title: 'Ortaklık yapısının çoklu tutulması',
        body: 'Tek bir holding yerine beş büyük grubun ortaklığı, finansal yükün dağıtımı kadar siyasi ve ticari dayanıklılığı da sağladı. Herhangi bir ortağın çekilmesi şirketi kırmaz, ama karar hızını yavaşlatabilir.',
      },
      {
        title: 'Avrupa pazarına erken açılım',
        body: '2024 Almanya ve bazı Avrupa pazarlarına ihracat başlangıcı, Türkiye pazarına bağımlı büyüme modelinden çıkışın ilk adımıdır. Volkswagen, BMW ve VW-Skoda gibi yerli rakiplerin güçlü olduğu bir pazarda konumlanma, marka testinin en zor alanıdır.',
      },
    ],
    crisesAndTurningPoints: `TOGG\'un kısa tarihindeki kritik noktalar henüz tamamlanmamıştır. Ancak üç belirleyici sınav halihazırda yaşanmıştır.

Birincisi 2018-2022 arası kuruluş ve üretim öncesi dönemdir. Beş farklı şirket grubu arasındaki karar koordinasyonu, tedarikçi seçimi, mühendislik ekibinin kurulması ve ilk tesisin inşaatı birbiriyle paralel yürütüldü. Bu dönemde proje birden fazla kez "gerçekleşmeyecek" eleştirilerine maruz kaldı. 2022 üretim başlangıcı bu eleştirileri temelden cevapladı.

İkincisi fiyat-performans algısının yönetimidir. T10X\'in Türkiye\'deki fiyat seviyesi, aynı segmentte ithal edilen Avrupa markalarına göre daha uygun olmakla birlikte, eşdeğer Çinli markalara göre yüksektir. TOGG\'un rekabet hikayesi ucuzluk değil, "yerli + elektrikli + entegre dijital servis" üçlüsüne dayanır.

Üçüncüsü, Avrupa açılımının ilk tepkileridir. Almanya\'ya başlayan ihracat, markanın premium algısını sınayacaktır. Avrupa tüketicisi TOGG\'u "uygun fiyatlı Çinli elektrikli alternatif" olarak görürse konumlanma, "Türk mühendisliğinin küresel temsilcisi" çerçevesinden uzaklaşabilir.`,
    currentPosition: `TOGG 2024 sonu itibarıyla T10X SUV modelini Türkiye pazarına, T10F sedan modelini de 2025\'te Avrupa pazarına sunmaya hazırlanıyor. Pazar payı henüz küçük, ancak kendi kategorisi içinde lider konumda. Türkiye pazarında elektrikli segmentin yaklaşık dörtte birine sahip.

Stratejik öncelik Avrupa açılımının başarılı şekilde tamamlanması. İlk beş yıllık hedef yıllık üretim kapasitesini yüz yetmiş beş bin adede çıkarmak ve ihracat oranını yüzde ellinin üzerine taşımak.

Rakiplerin manzarası karmaşıktır. Avrupa\'da Volkswagen ID, BMW i, Renault gibi köklü oyuncularla rekabet edilirken; Çin menşeili BYD, NIO, Xpeng gibi agresif fiyatlı markaların Avrupa istilası ciddi bir baskı oluşturuyor. TOGG\'un konumu bu iki cephenin arasında bir "Avrupa standardı Türk üretimi" çerçevesini kurabilmesine bağlı.`,
    editorialNote: `TOGG\'un hikayesinden çıkarılabilecek ilk ders, teknoloji geçiş dönemlerinin geç gelen oyuncular için kısa fırsat pencereleri sunduğudur. Elektrikli mobiliteye geçiş, otomotiv sektörünün kategorilerini sıfırlar. TOGG, içten yanmalı motor segmentinde Avrupa ve Japon markalarının gerisinden başlayıp yüz yıl onları yakalamayı denemek yerine, kategorinin sıfırlandığı anı strateji zamanı olarak seçti. Yaşlı sektörlere geç girişler ancak kategorinin yeniden tanımlandığı anda mümkündür.

İkinci ders, çoklu ortaklık yapısının finansal güvenlik ile karar hızı arasında bir dengeyi sürekli yönetmek zorunda kalacağıdır. Beş büyük grubun ortaklığı sermaye tabanını güçlendirdi ama operasyonel çevikliği sınırladı. Benzeri bir yapı planlayan girişimler için, karar hızını koruyan mekanizmaları (ortak zeminde karar alma protokolü, profesyonel yönetim özerkliği) ilk günden netleştirmek belirleyicidir.

Üçüncü ders, ulusal marka pozisyonunun uluslararası pazarlarda sürdürülmesinin teknik bir soru olduğu. TOGG, Türkiye\'de "yerli otomobil" anlatısıyla prim yapar. Aynı anlatı Almanya\'da satın almaya motive edici değil, çekim gücünden yoksundur. Uluslararası pazarlara giren ulusal markaların her pazar için kendi anlatısını yeniden kurması gerekir. Tek bir ulusal anlatı kırk pazarı taşımaz.`,
  },
  {
    slug: 'mavi',
    name: 'Mavi',
    sector: 'Moda',
    foundedYear: 1991,
    headquartersCity: 'İstanbul',
    headquartersCountry: 'Türkiye',
    origin: 'LOCAL',
    positioning:
      'Mavi, Türkiye\'nin uluslararası pazara çıkabilmiş ilk bağımsız moda markası olarak, yerli üretim gücünü denim ürününün küresel standardına çıkarmıştır.',
    foundingStory: `Eti Gözlükçü ve ailesi, 1984\'te İstanbul\'da Er-Ay Tekstil adıyla denim pantolon üretimine başladı. Başlangıçta uluslararası markalar için fason üretim yapıldı; ürünler Levi\'s, Wrangler ve Lee etiketleriyle dünyaya satıldı.

1991\'de Gözlükçü, kendi markası Mavi\'yi kurdu. İsim, Türk denim kültürüne ve denim kumaşının tonuna gönderme yapıyordu. İlk koleksiyon İstanbul\'daki butiklerde satıldı; marka Türk tüketicisine "dünya kalitesinde Türk denim" vaadi olarak sunuldu.

1990\'lar boyunca Mavi Türkiye\'de perakende ağını genişletti. 1996\'da ilk uluslararası açılım New York\'a yapıldı. 1999\'da Amerika\'da ünlü film yapımcısı Adriano Goldschmied ile iş birliği içinde geliştirilen "Molly" modeli, Jessica Alba\'nın In Style dergisi kapağıyla fenomen haline geldi. Marka, "dünyada Türk denim" anlatısının küresel kanıtını elde etti.`,
    founderVision: `Ersin Akarlılar (Mavi\'nin 2001\'den itibaren genel müdürü ve sonradan CEO\'su), Mavi\'ye küresel bir denim markası kimliği kazandırmayı amaç edindi. Yerel bir markanın uluslararası pazarda tutunabilmesi için tek yol, ürünün kalitesinde Amerika ve Avrupa standartlarını yakalamaktı.

Bu çerçevenin üç pratik ayağı vardır. Birincisi fabrika kontrolü; Mavi ürettiği ürünlerin büyük kısmını kendi fabrikalarında yaptırır. Bu karar tedarik zinciri kontrolünü, tasarım ile üretim arasındaki mesafeyi ve kaliteyi güvenceye alır. İkincisi denim üzerinde kalma ısrarı; şirket genel moda pazarına yayılmak yerine denim üzerinde derinleşti. Üçüncüsü uluslararası pazarlamada yerel güçlerle iş birliği; New York\'ta kendi mağazalarıyla ama ABD\'li tasarımcılarla birlikte koleksiyon geliştirme stratejisi.

Marka dili, Türk kökenini saklamaz ama ön plana da çıkarmaz. "Iconic Turkish Denim" etiketi, ürün etiketinde yer alır ama iletişimin merkezine konmaz.`,
    strategicDecisions: [
      {
        title: 'Denim\'de derinleşme',
        body: 'Mavi, genel moda markası olmaya karşı uzun süre direndi. Gelirin yüzde yetmişten fazlası denim kategorisinden gelir. Bu odak, markayı denim kategorisinin ilk çağrışımı yapan markalardan biri haline getirdi.',
      },
      {
        title: '1996: ABD\'ye açılım',
        body: 'Yirmi yıl sonrasında bile az sayıda Türk markası ABD perakende pazarında kalıcı kalabilmişken, Mavi bu pazara 1996\'da girdi ve bugüne kadar sürdürdü. ABD\'deki varlık, global marka kimliği iddiasının kanıtıdır.',
      },
      {
        title: '2017: Halka arz',
        body: 'Borsa İstanbul\'da halka açılma, Mavi\'yi Türkiye\'nin ilk ve hala tek halka açık büyük denim markası yaptı. Halka arz ile gelen şeffaflık, kurumsal yönetim disiplininin artmasına yol açtı.',
      },
      {
        title: 'Son yıllarda dijital kanal yatırımı',
        body: '2020-2024 arası e-ticaret payının toplam gelirin yüzde yirmisinin üzerine çıkması, klasik perakende ağının yanına dijital altyapının konumlandırılmasının sonucu. Mavi.com global pazarlara açılım kolaylaştırıyor.',
      },
    ],
    crisesAndTurningPoints: `Mavi\'nin markasını sınayan önemli kırılma noktaları vardır.

Birincisi 2001 Türkiye ekonomik krizidir. Devalüasyon sonrası Türk tüketicisinin moda harcamaları keskin şekilde daralırken, Mavi Türk Lirası cinsinden zarar eden ama yurt dışı gelirleriyle ayakta kalan bir yapıya döndü. Bu kriz şirketin ihracat kasına olan ihtiyacını gösterdi; sonraki yıllarda ihracatın toplam gelirdeki payı sistematik olarak artırıldı.

İkincisi 2000\'lerin ikinci yarısında rekabet baskısının yoğunlaşmasıdır. H&M, Zara, Bershka gibi hızlı moda markalarının Türkiye pazarına girişi, Mavi\'nin fiyat-ürün döngüsünü yeniden düşünmesini gerektirdi. Marka bu dönemde premium denim segmentinde konumlanarak hızlı moda fiyat savaşlarının dışında kaldı.

Üçüncüsü 2020 pandemisidir. Perakende mağazalarının kapanması ciddi bir gelir düşüşü yarattı. Ancak dijital dönüşüm yatırımları sayesinde Mavi pandemi çıkışında rakiplerin çoğundan daha sağlam bir finansal profille çıktı. Halka açık olmanın disiplini, bu dönemde bir dayanıklılık kaynağı oldu.

Dördüncüsü, son iki yıldır enflasyonun ve Türk Lirası\'nın değer kaybının Türkiye içi marjları eritmesidir. Mavi\'nin ihracat gelirlerinin payını artırma zorunluluğu yeniden öne çıktı.`,
    currentPosition: `Mavi bugün yirminin üzerinde ülkede üç binin üzerinde satış noktasıyla yıllık yaklaşık on beş milyar TL gelir üreten bir moda markasıdır. Türkiye dışında en büyük pazarı ABD; Kanada, Avrupa ve Orta Doğu da önemli pazarlardır.

Stratejik öncelik iki cephededir. Birincisi uluslararası gelirin toplam içindeki payını yükseltmek; bu oran bugün yüzde otuz beş civarında, hedef yüzde ellidir. İkincisi dijital ve omnichannel altyapı; Mavi.com\'un teknolojik altyapısının global pazarlara hazırlanması.

Kategori olarak denim ağırlığı korunuyor ancak kadın giyim, triko, tişört gibi yan kategoriler büyüyen paylar alıyor.

Rakipleri Türkiye\'de LC Waikiki, Koton, Defacto; uluslararası arenada Levi\'s, Diesel, G-Star RAW gibi denim odaklı markalar.`,
    editorialNote: `Mavi\'den çıkarılacak ilk ders, odağın korunmasının uluslararası pazarlara açılmanın temel ön koşulu olduğudur. Mavi genel moda pazarına yayılmak yerine denim üzerinde kalmasaydı, ABD pazarında bir niş bulması imkansıza yakın olurdu. Global pazar, ne kadar büyük ve çeşitli olursa olsun, yeni gelen markaları bir kategori etiketiyle hatırlar. "Denim markası" olmak, "moda markası olmak"tan daha sindirilebilir bir giriş iddiasıdır.

İkinci ders, bir ulusal markanın kökenini iletişimin merkezine koymaktan çok ürün etiketine koymayı seçebileceğidir. Mavi\'nin "Iconic Turkish Denim" etiketi zarif bir imzadır; iletişim kampanyalarının hiyerarşisinde değil, ürünün içinde yer alır. Türkiye kökeni bir zayıflık olarak yönetilmiyor; bir detay olarak kalıyor. Bu orta yol, "Türk markası" etiketinin bazen ağır gelebildiği olgun Batı pazarlarında çalışan bir teknik çözümdür.

Üçüncü ders, fabrika kontrolünün marka kalitesi için operasyonel bir hendek oluşturduğudur. Mavi ürünlerinin büyük kısmını kendi fabrikalarında ürettirir. Bu karar, tasarım ile üretim arasındaki mesafeyi kısaltır, ürün kalitesinin tutarlılığını sağlar ve krizlerde tedarik dayanıklılığı verir. Moda markaları için tasarım ile üretim arasındaki mesafe stratejik bir değişkendir; uzaklık esneklik sağlar, yakınlık tutarlılık sağlar. Hangisinin öncelenmesi markanın konumlanmasına bağlıdır.`,
  },
  {
    slug: 'lc-waikiki',
    name: 'LC Waikiki',
    sector: 'Moda ve Perakende',
    foundedYear: 1988,
    headquartersCity: 'İstanbul',
    headquartersCountry: 'Türkiye',
    origin: 'LOCAL',
    positioning:
      'LC Waikiki, global hızlı moda zincirlerine karşı erişilebilir fiyat ve geniş ürün yelpazesi denklemini koruyarak Türkiye\'den çıkıp on ötesi Avrasya pazarında lider olmuş markadır.',
    foundingStory: `LC Waikiki, 1988\'de Fransa\'da Georges Amouyal tarafından kurulan bir giyim markasıydı. İsim, "Les Copains" (arkadaşlar) kelimelerinden ve Havai\'nin simge plajı Waikiki\'den türetildi. 1997\'de Taha Holding (LC Waikiki Mağazacılık Hizmetleri Ticaret A.Ş. kurucusu Vahap Küçük\'ün şirketi) Türkiye distribütörlüğünü devraldı. İki yıl sonra, 1999\'da marka hakları tamamen Türk grubuna geçti. LC Waikiki o günden itibaren Türkiye merkezli bir perakende markası olarak büyüdü.

2000\'li yılların başı konsolidasyon dönemidir. Vahap Küçük önderliğindeki yönetim, markayı bir Fransız markasının lisansından çıkarıp Türkiye\'de üretim, tasarım ve mağazacılık dikey ağına sahip bağımsız bir yapıya çevirdi. Başlangıçta kısa süreli bir markalama deneyi gibi görünen bu birleşme, Türkiye hızlı moda pazarının yirmi yılını belirleyen yapıyı kurdu.

2009\'dan itibaren uluslararası açılım hızlandı. Irak, Azerbaycan, Ukrayna, Rusya, Polonya ve Romanya gibi komşu pazarlarda mağaza sayısı üç yıl içinde üç katına çıktı. 2020\'ye gelindiğinde elli ülkede bin mağaza aşıldı.`,
    founderVision: `Vahap Küçük\'ün yönetim çerçevesi, "Everyone deserves to dress well" sloganında özetlenir. Bu vizyonun Türkçe karşılığı "Herkes iyi giyinmeyi hak eder"dir. İçindeki demokratik iddia, Inditex (Zara) veya H&M gibi global hızlı moda oyuncularına kıyasla daha erişilebilir fiyat seviyesinde konumlanarak somutlaştırıldı.

Yönetim üç pratik ilkeyi benimsedi. Birincisi, ürün yelpazesinin çok geniş tutulması: tek bir aile mağazada bebek, çocuk, kadın ve erkek tüm kategorilerini bulur. Bu aile kategorisinin gücü, ziyaret sıklığını artırır ve sepet değerini büyütür. İkincisi, fiyat seviyesinin rakiplerin altında konumlanması; Zara ve Mango ile H&M\'in arasında bir konum tutulmadı, açık biçimde daha uygun fiyat tercih edildi. Üçüncüsü, tedarik zincirinin Türkiye\'deki tekstil üretim kapasitesini verimli kullanacak şekilde tasarlanması.

Marka, Türkiye\'de erişilebilir moda kategorisinin en büyük oyuncusu haline geldi ve aynı anda yurtdışında "uygun fiyatlı Türk kalitesi" konumunu oluşturdu.`,
    strategicDecisions: [
      {
        title: 'Aile mağaza konsepti',
        body: 'Tek bir mağazada bebekten yetişkine tüm aileye hitap eden yapı, tüketicinin ziyaret sıklığını artırdı. Rakiplerin çoğu segmentlere göre ayrı markalar yaratırken LC Waikiki tek marka altında tüm aileyi birleştirdi.',
      },
      {
        title: 'Türkiye tedarik zinciri kaldıracı',
        body: 'Türkiye\'nin tekstil üretim kapasitesi, LC Waikiki\'ye hızlı koleksiyon yenileme ve rekabetçi fiyat sunma avantajı sağladı. Üretim büyük oranda Türkiye içindedir ya da yakın coğrafyadadır.',
      },
      {
        title: '2009 sonrası komşu coğrafya açılımı',
        body: 'Irak, Rusya, Kazakistan, Azerbaycan gibi Batılı perakende markalarının geç girdiği pazarlarda erken konumlanma. Bu pazarlarda LC Waikiki "batı ile doğunun arasında güvenilir bir köprü" olarak konumlandı.',
      },
      {
        title: 'Dijital dönüşüm ve mağaza ağı',
        body: 'Mağaza sayısı büyümeye devam ederken e-ticaret payı artıyor. Çok kanallı yaklaşım Türkiye pazarında rakiplerden bir adım önde, ancak uluslararası pazarlarda hızla geliştiriliyor.',
      },
    ],
    crisesAndTurningPoints: `LC Waikiki\'nin en büyük sınavları pazar başına kırılıyor.

Birincisi 2014\'te Rusya-Ukrayna gerginliğinin başlangıcında Ukrayna\'da mağazaların kapatılması gerekti. Bu olay uluslararası genişlemenin politik risk taşıdığının erken ikazıydı.

İkincisi 2016 Türkiye\'deki kriz ortamıdır. İç talep daralması karşısında marka yurtdışı büyümeye daha fazla yaslandı. Bu dönem, iç pazara bağımlılığın risk taşıdığını gösteren bir eğitim evresi oldu.

Üçüncüsü 2022-2024 arası Rusya pazarındaki politik risklerin yönetimidir. Rusya\'nın Ukrayna\'yı işgali sonrası Batılı markaların çoğunluğu Rusya\'dan çekilirken LC Waikiki faaliyetlerini sürdürdü. Bu karar bir taraftan finansal getiri sağlarken diğer taraftan Batı Avrupa\'daki marka algısına baskı kurdu.

Dördüncüsü pandemi döneminde mağaza kapanmaları ve tedarik zinciri kesintileridir. Şirket bu krizi dijital kanalın hızlandırılması, ürün yelpazesinin sadeleştirilmesi ve yerel tedarikin önceliklendirilmesiyle yönetti.`,
    currentPosition: `LC Waikiki bugün elli beş ülkede bin iki yüzden fazla mağazaya sahip; Türkiye\'nin dışında en büyük pazarları Rusya, Polonya, Romanya, Kazakistan, Irak ve Mısır\'dır. Yıllık gelir Türkiye içinde ve dışında birlikte iki yüz milyar TL bandında.

Stratejik öncelik iki kolda ilerliyor. Birincisi Avrupa Birliği pazarına daha derin giriş: Almanya, Fransa ve İtalya\'da yeni mağaza açılışları. İkincisi dijital ağın olgunlaştırılması ve kategori bazında uzmanlaşma (LCW Casual, LCW Modest, LCW Smart gibi alt markalar).

Rakipler cephesinde global hızlı moda oyuncularıyla (Inditex, H&M) olduğu kadar yerel rakiplerle (Koton, Defacto) de yoğun rekabet var. Markanın avantajı uluslararası ağ ve fiyat-kalite dengesi.`,
    editorialNote: `LC Waikiki\'den çıkan ilk ders, kategorinin alt segmentinde net bir pozisyon almanın büyümenin temel taşı olabileceğidir. Zara\'nın üstüne çıkmayı hedeflemek yerine Zara\'nın altında erişilebilir fiyat noktasında konumlanma kararı, markaya Avrasya\'nın en büyük perakende ağını oluşturma imkanı verdi. Rekabet, her zaman premium uca doğru gitmeyi gerektirmez. Alt uçta hacim üretilebilir, alt uçta marka kurulabilir.

İkinci ders, komşu coğrafyaların olgun Batı pazarlarından daha önce adreslenebileceği stratejik pencereler sunduğudur. Rusya, Kazakistan, Irak ve Romanya pazarlarına LC Waikiki Western Europe\'dan önce girdi ve Batılı markaların gecikmiş girişlerinde bu öncelik kalıcı bir hendek oluşturdu. Türk sanayi markaları için Avrupa\'dan önce Avrasya hattı düşünülmesi gereken bir açılım hattıdır.

Üçüncü ders, siyasi risklerin perakende markaları için ürün kararı değil varlık kararı olduğudur. Rusya\'da faaliyet sürdürme, Ukrayna\'da mağaza kapatma gibi kararlar doğrudan satış-maliyet hesabından çok markanın değer evreni ile hangi pazarın eşleştiği sorusuyla yönetilmelidir. Her pazar açılımı marka kimliğini test eden bir sınavdır; bazı pazarlar kısa vadede gelir getirirken uzun vadede marka hafızasına maliyet yükler.`,
  },
  {
    slug: 'eti',
    name: 'Eti',
    sector: 'Gıda',
    foundedYear: 1961,
    headquartersCity: 'Eskişehir',
    headquartersCountry: 'Türkiye',
    origin: 'LOCAL',
    positioning:
      'Eti, Türkiye\'de bisküvi ve çikolata kategorisini tanımlayan yerli marka olarak, kategori yaratma ve kategori koruma pratiğinin ülke ölçekli referansıdır.',
    foundingStory: `Firuz Kanatlı, 1961\'de Eskişehir\'de bir bisküvi fabrikası kurdu. Kanatlı bir tekstil işletmecisiydi; gıdaya geçiş, o dönem Türkiye\'de hızla büyüyen kentli tüketicinin atıştırmalık ihtiyacını görmesinden doğdu. Fabrikanın adı Hitit Uygarlığı\'na gönderme yapan "Eti" oldu. Logo olarak Hitit güneş kursu seçildi; bu yerel kültürel referans, markayı dönemin ithal bisküvi markalarından ayıran ilk sembol oldu.

İlk ürün Eti Bisküvisi klasiği, Türk tüketicisinin günlük atıştırmalık alışkanlığına yerleşti. 1970\'lerde ürün yelpazesi kek, çikolata ve şekerleme alanlarına genişledi. 1980\'lerde ve 90\'larda "Negro", "Canga", "Wanted", "Petitos" gibi ürünler çocuk ve genç segmentinde marka aşinalığını derinleştirdi.

Firuz Kanatlı 1990\'larda şirketin yönetimini oğulları Berk ve Tuğrul\'a devretti. İkinci kuşak yönetim, şirketin modernleşmesini ve uluslararasılaşmasını yönetti.`,
    founderVision: `Firuz Kanatlı\'nın markaya yüklediği fikir, "yerli üreticinin kalite algısında ithal markalarla yarışabileceği" idi. 1960\'larda Türkiye\'de yerli üretimin kalite algısı düşüktü; tüketici "ithal = iyi" denklemiyle şekillenmişti. Eti bu algıyı sistematik olarak değiştirmenin stratejik bir hedef olduğunu kabul etti.

İkinci kuşak yönetim altında bu çerçeve üç başlığa genişledi. Birincisi ürün yenilemesinin sürekli tutulması; her yıl portföye yeni ürünler ekleniyor. İkincisi dijital reklamcılığa erken yatırım; çocuk odaklı televizyon reklamlarında Eti Türkiye\'nin referans markalarından biri oldu. Üçüncüsü ihracatın öne çekilmesi; Eti ürünleri bugün elli beşin üzerinde ülkede satılıyor.

Marka Türk tüketicisinin duygusal ailesinin bir parçası olarak konumlandırıldı; "Eti", "yerli", "çocukluk", "aile" kelimeleriyle aynı cümlede yan yana gelir.`,
    strategicDecisions: [
      {
        title: 'Çoklu ürün markası mimarisi',
        body: 'Eti, tek bir ana marka altında yüzlerce alt ürün markası (Negro, Canga, Puf, Petitos, Tutku, Karam, Cin, Crax) işletir. Bu çoklu mimari, kategorilerin her birinde uzman bir rakibe karşı farklı ürün marka kimlikleriyle korunur.',
      },
      {
        title: 'Reklam yatırımının sürekliliği',
        body: 'Eti, Türkiye\'de televizyon ve dijital reklam yatırımını rekabetin çok üzerinde sürdürdü. Çocuk segmentinde reklamın tekrar sayısı, ürün aşinalığını kategori öncülüğüne çevirdi.',
      },
      {
        title: 'Eskişehir üretim tesisi',
        body: 'Markanın doğduğu şehir olan Eskişehir\'de kalan üretim tesisi, kurumsal tarihin bir kanıtı. Şehir ve marka arasındaki bağ, çalışan bağlılığından pazarlama anlatısına kadar birçok düzeyde kaldıraç oldu.',
      },
      {
        title: 'Avrupa ve Orta Doğu ihracatının çeşitlendirilmesi',
        body: 'Son yirmi yılda Eti ürünleri Avrupa süpermarketlerinde Türkiye dışı tüketiciye ulaştı. Rusya, Almanya, Irak gibi farklı pazarlar ürün yelpazesine farklı ürünlerle girdi.',
      },
    ],
    crisesAndTurningPoints: `Eti\'nin markasını sarsan kırılma noktaları ürün güvenliği, pazar rekabeti ve uluslararası genişleme eksenlerinde yoğunlaşır.

Birincisi 2000\'lerin başında global atıştırmalık markalarının (Mondelez, Nestle) Türkiye pazarında agresifleşmesidir. Oreo, KitKat, Snickers gibi markaların Türkiye\'de reklam bütçelerini artırması, Eti\'yi kategorideki tek referans konumundan savunma konumuna itti. Marka cevabı ürün çeşitlendirme ve uluslararasılaşma oldu.

İkincisi ürün güvenliği söylentilerinin sosyal medyada yayılmasıdır. 2010\'lardan itibaren bazı ürünlerde renklendirici, katkı maddesi ve sağlık endişesi tartışmaları dönem dönem gündeme geldi. Eti bu başlıkları şeffaflık ve içerik etiketi sadeleştirmesiyle yönetti.

Üçüncüsü Türk Lirası\'nın değer kaybı ve hammadde maliyet artışlarının marjları eritmesidir. Buğday, kakao, süt, ambalaj gibi girdi kalemlerinin enflasyonu Eti\'nin fiyatlama disiplinini zorladı. Eti geleneksel fiyatlama anlatısı olan "herkese ulaşılabilir" çerçevesini korumak için operasyonel verimlilik yatırımlarını öne çekti.`,
    currentPosition: `Eti bugün Türkiye\'nin en büyük özel sermayeli gıda şirketlerinden biri. Yıllık gelir otuz milyar TL bandında; on bin çalışan, üç yüz ürün çeşidi, elli beşten fazla ülkeye ihracat.

Stratejik öncelik üç başlıkta öne çıkıyor. Birincisi sağlıklı ürün portföyünün büyütülmesi; gluten serbest, şekersiz, tam buğday gibi alt segmentlerde yeni ürünler. İkincisi uluslararası ihracatın kategoriler arasında derinleştirilmesi; özellikle Avrupa organik tüketici segmentine giriş. Üçüncüsü kurumsal sürdürülebilirlik raporlaması; ambalaj geri dönüşümü ve tedarik şeffaflığı yatırımları.

Yurt içinde rakipler Ülker, Godiva gibi yerli oyuncular ve uluslararası Mondelez, Nestle, Ferrero gibi devlerdir.`,
    editorialNote: `Eti\'nin hikayesinden çıkarılacak ilk ders, yerli üretimin kalite algısını değiştirmek için mücadele edebileceği ve bu mücadelenin on yıllık bir yatırım gerektirdiğidir. 1960\'larda "ithal = iyi" denkleminin kurulu olduğu bir pazarda Eti, reklam, ürün yenilemesi ve dağıtım ağı yatırımlarını sürekli tutarak bu denklemi kendi lehine çevirdi. Yerli marka kuran girişimciler için, kalite algısının değişmesi ürünle değil, ürünün üzerine istikrarlı biçimde inşa edilen tüketici hafızasıyla ilgilidir.

İkinci ders, çoklu alt marka mimarisinin kategori içinde rekabeti yönetmenin güçlü bir aracı olabileceğidir. Eti\'nin ana marka altında Negro, Canga, Petitos gibi onlarca alt marka işletmesi, segment segment uzman rakiplere karşı ana marka prestijini korurken ürün düzeyinde çeviklik sağlıyor. Büyük markalar için alt marka mimarisi bir yönetim maliyetidir; ancak doğru kurgulandığında rakiplerin saldırılarını segmente hapseden bir savunma hattıdır.

Üçüncü ders, coğrafi kökene olan bağlılığın marka anlatısına dönüştürülebileceğidir. Eti\'nin Eskişehir\'deki kökleri, markanın bir metropolde kurumsallaşmış soğuk bir şirket olarak değil, taşralı ama iddialı bir yerel iddianın sürekliliği olarak algılanmasına yol açtı. Yerellik, kapsam geniştirme dönemlerinde bir yük değil bir ağırlık merkezidir; doğru anlatıldığında markaya bir ağırlık hissiyatı kazandırır.`,
  },
  {
    slug: 'arcelik',
    name: 'Arçelik',
    sector: 'Beyaz Eşya',
    foundedYear: 1955,
    headquartersCity: 'İstanbul',
    headquartersCountry: 'Türkiye',
    origin: 'LOCAL',
    positioning:
      'Arçelik, beyaz eşya üreticisinden çok markalı küresel dayanıklı tüketim grubuna dönüşerek Türk sanayisinin uluslararasılaşma referans modelini oluşturmuştur.',
    foundingStory: `Vehbi Koç, 1955\'te Sütlüce\'de Türkiye\'nin ilk buzdolabı fabrikasını açtı. Şirketin adı "Ar-Ka" (araştırma-kalite) kavramlarından üretildi; "Arçelik" markası Türkiye pazarında dayanıklı tüketim kavramının kendisiyle özdeşleşti.

1950\'lerin Türkiye\'si kentlileşmenin başlangıcındaydı. Buzdolabı, çamaşır makinesi, ocak gibi ürünler lüks olarak görülüyordu. Arçelik bu ürünleri ithal eden bir ülkeyi, üreten bir ülkeye dönüştürmeyi hedefledi.

1970 ve 80\'lerde ürün yelpazesi genişledi. 1990\'lardan itibaren Koç Holding bünyesinde Arçelik\'in uluslararası açılımı hızlandı. 2002\'de Beko markasını satın alınmasıyla birlikte Avrupa ve Asya pazarlarında marka portföyünün temel ayakları kuruldu.

2020\'li yıllarda Grundig, Blomberg, Elektra Bregenz, Altus, Defy, Dawlance ve Beko gibi onlarca markalı bir portföyü yöneten bir dayanıklı tüketim grubu haline geldi.`,
    founderVision: `Vehbi Koç\'un Arçelik\'e yüklediği fikir, "Türkiye\'nin modernleşmesine sanayi üretimiyle katkıda bulunmak" idi. Bu vizyon ekonomik bir iddia olduğu kadar kültürel bir iddiaydı: Türk mühendisi ve Türk işçisi, Avrupa\'nın üretim kalitesini Türkiye topraklarında tekrarlayabilir.

Bu çerçeve üç temel ilkeyi doğurdu. Birincisi, Ar-Ge yatırımına kesintisiz süreklilik. Arçelik yıllık cirosunun yüzde üç ile dördünü araştırmaya ayırır, bu oran Türkiye\'deki ortalama sanayinin çok üzerindedir. İkincisi, teknik bayi ağına yatırım; satış sonrası servis kanalının kalite güvencesini tüketiciye taşıması stratejik öncelikti. Üçüncüsü, uluslararası genişlemede yerel markaların korunarak satın alınması; bu stratejinin en güçlü örnekleri Beko ve Grundig\'dir.

Marka kimliği "güvenilir Türk sanayi" anlatısı üzerinden kurulurken, uluslararası arenada Grundig üzerinden Alman mühendisliği, Blomberg üzerinden İsveç tasarımı anlatısı sürdürüldü.`,
    strategicDecisions: [
      {
        title: '2002: Beko satın alımı',
        body: 'Beko, Arçelik\'in Avrupa genişlemesinin ana lokomotifi oldu. İngiltere, Fransa ve Almanya gibi olgun pazarlarda fiyat-performans segmentinde konumlanan Beko, son on yılda Avrupa\'da pazar payını sistematik olarak büyüttü.',
      },
      {
        title: 'Grundig ve Blomberg gibi premium markaların portföye katılması',
        body: 'Değişik segmentlere hitap eden bu markalar, Arçelik\'in tek marka ile yapamayacağı segmenter farklılaşmayı mümkün kıldı.',
      },
      {
        title: 'Hitachi ev aletleri birleşmesi (2023)',
        body: 'Arçelik ve Hitachi, beyaz eşyada ortaklık kurarak Asya\'da marka varlığını genişletti. Bu hamle Arçelik\'i dayanıklı tüketim sanayiinin global oyuncularından biri haline getirdi.',
      },
      {
        title: 'Sürdürülebilirlik liderliği',
        body: 'Arçelik, Avrupa beyaz eşya sektöründe enerji verimliliği liderlerinden biri olarak konumlandı. CDP ve Dow Jones Sustainability Index gibi uluslararası sürdürülebilirlik değerlendirmelerinde yıllardır üst sıralarda yer alıyor. Bu konum, Avrupa pazarındaki marka primini destekler.',
      },
    ],
    crisesAndTurningPoints: `Arçelik\'in küresel sınavları üç başlıkta yoğunlaşır.

Birincisi 2008 küresel finansal krizidir. Avrupa beyaz eşya tüketiciliği keskin biçimde daralırken Arçelik iç pazar satışlarına yaslanarak krizi yönetti. Bu dönem iç pazarın stratejik değerini yeniden hatırlattı; sonraki yıllarda uluslararasılaşmaya devam edilirken iç pazarda konum korundu.

İkincisi 2016-2020 arası Çinli rakiplerin (Haier, Midea, Hisense) Avrupa pazarına hızlı genişlemesidir. Bu markalar agresif fiyat ve dijital ürün yelpazesiyle Arçelik\'in Beko ile açtığı alanı sıkıştırdı. Arçelik cevabı Ar-Ge yatırımının hızlandırılması ve premium marka portföyünün güçlendirilmesi oldu.

Üçüncüsü son iki yıldır Türk Lirası\'nın değer kaybı ve hammadde maliyetleridir. Arçelik\'in üretim ağının büyük kısmı Türkiye\'de olmakla birlikte uluslararası satış, döviz çatışmasına bir tampon sağladı; yine de maliyet yönetimi şirketin stratejik odağı haline geldi.`,
    currentPosition: `Arçelik bugün otuzdan fazla ülkede üretim tesisi, kırkın üzerinde ülkede satış ağı ve on binin üzerinde çalışan ile yıllık iki yüz milyar TL civarında gelir üreten bir şirkettir. Hisseleri BIST\'de işlem görür; kurumsal yönetim skorları Türkiye\'nin en yüksekleri arasındadır.

Stratejik öncelik Avrupa pazarında Beko ile pazar payının büyütülmesi ve Hitachi ortaklığıyla Asya-Pasifik\'e derinleşme. Sürdürülebilirlik liderliği Avrupa pazarındaki prime destek olmaya devam ediyor.

Rakipleri Samsung, LG, Haier, Whirlpool, BSH (Bosch-Siemens), Electrolux gibi global oyunculardır.`,
    editorialNote: `Arçelik\'in hikayesinden çıkarılacak ilk ders, çok markalı mimarinin tek markanın taşıyamayacağı uluslararasılaşmayı mümkün kılabileceğidir. Arçelik ana markasıyla Avrupa pazarında erişilebilir olmadı; Beko, Grundig ve Blomberg gibi farklı markalar segmentlere özgü iletişim kurdu. Bir şirketin global potansiyeli, tek markayla yurt dışında dayatmak yerine, yerel marka satın almalarıyla katlanabilir. Bu model pahalıdır; ama doğru yapıldığında otuz yılda şirketi iki bölgeye bağlı bir üretici olmaktan çıkarıp global bir grupa çevirir.

İkinci ders, Ar-Ge yatırımının sektördeki rakiplerin üzerinde tutulmasının uzun vadede marka değerine nasıl bir hendek oluşturduğudur. Arçelik yıllık Ar-Ge harcaması, Türkiye\'deki ortalamayı katbekat aşar. Bu disiplin, teknoloji ömrünün kısaldığı bir sektörde ürün liderliğini korumanın tek güvencesidir.

Üçüncü ders, kurumsal yönetim skorlarının uluslararası pazarlarda bir aracı silah olabileceğidir. Arçelik\'in Dow Jones Sustainability Index, CDP ve benzeri endekslerdeki üst sıraları, Avrupa Birliği\'ndeki B2B satınalma kararlarında Çinli rakiplere karşı bir ayrım noktası haline geldi. Gelişen pazarlardan çıkıp olgun pazarlara giren markalar için kurumsal yönetim bir yük değil, bir strateji silahıdır.`,
  },
  {
    slug: 'getir',
    name: 'Getir',
    sector: 'Teknoloji',
    foundedYear: 2015,
    headquartersCity: 'İstanbul',
    headquartersCountry: 'Türkiye',
    origin: 'LOCAL',
    positioning:
      'Getir, hızlı teslimat kategorisini kuran markalardan biri olarak, on dakika vaadini küresel bir iş modeline çevirme denemesinin en ambisyöz örneğidir.',
    foundingStory: `Nazım Salur, Tuncay Tütek, Serkan Borançılı ve Mustafa Gültepe 2015\'te Getir\'i İstanbul\'da kurdu. Fikir, bir bakkalın teslimat hızını şehir merkezinde standartlaştırmaktı: müşteri siparişini verdikten sonra on dakikada kapıya ulaşacak. O dönem Türkiye\'de "instant delivery" kategorisi kurulmamıştı.

İlk yıllar İstanbul\'un seçili semtlerinde küçük mağazalar ("karanlık mağaza" / dark store) açıldı. Her mağaza belirli bir kilometrekarelik alana hizmet verdi. Ürün yelpazesi bilinçli olarak dar tutuldu: yaklaşık iki bin ürünlük bir liste, tüketicinin günlük ihtiyaçlarını karşılayacak kapsamda.

2019 sonrası büyüme hızlandı. 2020 pandemisi hızlı teslimatı lüks olmaktan çıkarıp zorunluluğa çevirince Getir küresel yatırımcıların radarına girdi. 2020-2022 arası şirket on iki milyar dolar değerleme ile yirmi birinci yüzyılın en hızlı büyüyen Türk girişimi haline geldi.`,
    founderVision: `Nazım Salur\'un Getir\'e yüklediği fikir, "bakkal ekonomisinin dijital yeniden inşası" idi. Geleneksel bakkal yakınlık avantajına sahipti ama ürün yelpazesi sınırlı, fiyat karşılaştırılamaz, ödeme sistemi modern değildi. Dijital bir bakkal, bu dezavantajları ortadan kaldırabilirdi.

Bu vizyonun üç pratik sonucu vardır. Birincisi "on dakika" gibi spesifik, ölçülebilir ve tekrar edilebilir bir vaat. İkincisi dar ürün yelpazesi; yüz binlerce üründen çok iki-üç bin ürünle işlerin operasyonel verimliliği yüksek tutulur. Üçüncüsü kendi kurye ağının kurulması (aksine restoran teslimatının üçüncü taraf kuryelerle yürütülmesi), hizmet kalitesinin kontrol altında tutulması.

Marka kimliği mor ve sarı renklerle güçlü, canlı ve tekrar edilebilir bir görsel dille kuruldu; "Getir-veren" gibi kelime oyunları marka diline girdi.`,
    strategicDecisions: [
      {
        title: 'Dark store modeli',
        body: 'Müşterinin ziyaret etmediği, sadece depo-teslimat fonksiyonu gören küçük mağazalar. Bu model geleneksel süpermarketin kira ve dekor maliyetlerini ortadan kaldırırken teslimat hızını optimize eder.',
      },
      {
        title: 'Kategoriler arası yatay genişleme',
        body: 'GetirFood, GetirMore, GetirDrive, GetirWater, GetirLocals gibi alt markalarla market ötesine geçildi. Yemek teslimatı, araç kiralama, su teslimatı ve yerel restoran agregasyonu tek uygulama altında birleştirildi.',
      },
      {
        title: '2021: Avrupa ve Kuzey Amerika açılımı',
        body: 'Londra, Amsterdam, Paris, Berlin, Madrid, New York gibi pazarlara girildi. İngiltere\'deki bir rakip olan Weezy 2022\'de satın alındı. Aynı yıl ABD\'de Gopuff\'a yakın bir rakip konumuna gelindi.',
      },
      {
        title: '2023: Uluslararası operasyonların çekilmesi',
        body: 'Avrupa ve ABD operasyonları tasfiye edildi. İngiltere ve Hollanda dışındaki pazarlardan çıkıldı. Şirket Türkiye\'ye çekildi. Global genişleme stratejisi, mali sürdürülebilirlik baskısıyla durduruldu.',
      },
    ],
    crisesAndTurningPoints: `Getir\'in hikayesi, hızlı yükseliş ve hızlı geri çekilmenin bir vaka çalışmasıdır.

2020-2022 dönemi pandemi büyümesinin tetiklediği yatırım balonuydu. Şirket iki yılda beş yüz milyon dolar bandında yatırım aldı. Değerleme on iki milyar dolara çıktı. Bu dönemde iş modeli sorgulanmadan hızla farklı pazarlara genişlendi.

2022 sonrası tablo keskin biçimde değişti. Hızlı teslimat kategorisinin birim ekonomi (unit economics) sorunu hissedilmeye başladı: her sipariş için kurye maliyeti, küçük mağaza işletim maliyeti ve ortalama sepet büyüklüğü, sürdürülebilir kâr marjını yakalayamadı. Rakipler Gorillas ve Jokr Avrupa\'dan çekildi. Getir\'in Avrupa operasyonları kapatıldı.

2023 Türkiye operasyonlarının yeniden yapılandırılması başladı: iş gücünde küçülme, ürün yelpazesinde daralma, Türkiye içi verimlilik odağı. Şirketin değerlemesi zirveden yaklaşık yüzde yetmiş düştü.

2024 itibarıyla Getir\'in hikayesi Türkiye pazarındaki sürdürülebilirlik sorusu etrafında dönüyor. Mali yeniden yapılanma sürüyor; iç pazardaki lider konum ise korunuyor.`,
    currentPosition: `Getir bugün Türkiye pazarında hızlı teslimat kategorisinin bir numaralı oyuncusu. İstanbul, Ankara, İzmir başta olmak üzere büyük şehirlerde güçlü kullanıcı tabanı var.

Stratejik öncelik karlılık. GetirFood gibi yan kategoriler konsolide edildi, ürün yelpazesi sadeleştirildi, operasyonel maliyetler düşürüldü. Uluslararası açılım planı rafa kaldırıldı.

Türkiye\'deki rakipleri Yemeksepeti ve Trendyol GO gibi daha büyük ana şirketlerin hızlı teslimat kolları. Fiyat savaşından kaçınarak servis kalitesi üzerinden farklılaşma stratejisi izleniyor.`,
    editorialNote: `Getir\'in hikayesinden çıkarılacak ilk ders, bir iş modelinin yatırım döneminde kanıtlanmamış olarak kalabileceği ve büyüme baskısının birim ekonomiyi test etmeyi geciktirebileceğidir. Pandemi döneminde Getir büyük yatırımlar aldı; bu yatırımlar "büyü, karlılığı sonra düşün" zihniyetini besledi. Oysa birim ekonomi olgun kategorilerde her zaman sorulmalıdır; erken sorulan bu soru, gereksiz coğrafya açılımlarını engelleyebilirdi. Hızlı büyüyen teknoloji girişimlerinde sermaye bolluğu iş modelinin test edilmesini geciktirir; bu geciktirme genellikle pahalıdır.

İkinci ders, global genişlemenin iç pazardaki başarıyla aynı şablonla yapılamayacağıdır. Getir\'in İstanbul\'da işe yarayan on dakika vaadi, Londra veya New York\'ta aynı ekonomiyle çalışmadı. Her pazar kendi teslimat ekonomisini (kurye maliyeti, sepet büyüklüğü, nüfus yoğunluğu) kurar; çıkış pazarının modelini başka pazara ihraç etmek stratejik bir yanılgıdır. Uluslararası açılım, her pazar için ayrı bir iş planı yazmayı gerektirir.

Üçüncü ders, geri çekilmenin bir başarısızlık değil bir olgunlaşma kararı olabileceğidir. Getir\'in 2023\'teki küçülme kararı, şirketin önceki dönemde yaptığı hatayı kabul ettiği anlamına gelir. Geri adım atmak, sermaye yöneticileri ve çalışanlar için psikolojik olarak zor; ancak uzun vadede marka değerini koruyan tek yoldur. Büyüme kararı cesaret gerektirirken, küçülme kararı olgunluk gerektirir.`,
  },
];

async function main() {
  let created = 0;
  let updated = 0;
  for (const b of BRANDS) {
    const existing = await prisma.brandStory.findUnique({ where: { slug: b.slug } });
    const data = {
      slug: b.slug,
      name: b.name,
      sector: b.sector,
      foundedYear: b.foundedYear,
      headquartersCity: b.headquartersCity,
      headquartersCountry: b.headquartersCountry,
      origin: b.origin,
      positioning: b.positioning,
      foundingStory: b.foundingStory,
      founderVision: b.founderVision,
      strategicDecisions: b.strategicDecisions,
      crisesAndTurningPoints: b.crisesAndTurningPoints,
      currentPosition: b.currentPosition,
      editorialNote: b.editorialNote,
      featured: b.featured ?? false,
      status: 'PUBLISHED' as const,
      publishedAt: new Date(),
    };
    if (existing) {
      await prisma.brandStory.update({ where: { id: existing.id }, data });
      updated += 1;
    } else {
      await prisma.brandStory.create({ data });
      created += 1;
    }
  }
  console.log(`Brand stories seeded: ${created} created, ${updated} updated.`);
}

main().finally(() => prisma.$disconnect());
