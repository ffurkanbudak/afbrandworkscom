export type TestOption = {
  label: string;
  score: number; // 0-3
};

export type TestQuestion = {
  question: string;
  options: TestOption[];
};

export type TestResultBand = {
  min: number;
  max: number;
  title: string;
  summary: string;
  recommendations: string[];
};

export type BrandTest = {
  slug: string;
  level: string;
  title: string;
  shortTitle: string;
  description: string;
  audience: string;
  duration: string;
  icon: 'sprout' | 'gauge' | 'rocket';
  color: string;
  questions: TestQuestion[];
  bands: TestResultBand[];
};

export const BRAND_TESTS: BrandTest[] = [
  {
    slug: 'marka-kurma-hazirligi',
    level: 'Temel Düzey',
    title: 'Marka Kurma Hazırlık Testi',
    shortTitle: 'Marka Kurma',
    description:
      'Henüz bir markanız yok ve sıfırdan kurmayı düşünüyorsunuz. 10 kısa soruyla fikrinizin markaya dönüşmeye ne kadar hazır olduğunu birlikte görelim.',
    audience: 'Markasını sıfırdan kurmak isteyenler için',
    duration: 'Yaklaşık 1 dakika',
    icon: 'sprout',
    color: '#93C9A0',
    questions: [
      {
        question: 'Kurmak istediğiniz markanın hangi problemi çözdüğünü bir cümleyle anlatabilir misiniz?',
        options: [
          { label: 'Henüz net bir problem tanımım yok, sadece bir fikir var', score: 0 },
          { label: 'Aklımda birkaç problem var ama hangisine odaklanacağımı bilmiyorum', score: 1 },
          { label: 'Problemi biliyorum ama bir cümleye indirgemekte zorlanıyorum', score: 2 },
          { label: 'Evet, tek cümleyle net şekilde anlatabilirim', score: 3 },
        ],
      },
      {
        question: 'Hedef kitlenizi ne kadar tanıyorsunuz?',
        options: [
          { label: '"Herkes müşterim olabilir" diye düşünüyorum', score: 0 },
          { label: 'Genel bir fikrim var (yaş, şehir gibi) ama yüzeysel', score: 1 },
          { label: 'Kitlemin ihtiyaçlarını ve alışkanlıklarını kabaca biliyorum', score: 2 },
          { label: 'Net bir kitle tanımım var; kiminle konuşacağımı biliyorum', score: 3 },
        ],
      },
      {
        question: 'Gireceğiniz kategorideki rakipleri incelediniz mi?',
        options: [
          { label: 'Hayır, rakiplere hiç bakmadım', score: 0 },
          { label: 'Birkaç ismi biliyorum ama detaylı incelemedim', score: 1 },
          { label: 'Ana rakipleri inceledim, güçlü ve zayıf yanlarını kabaca biliyorum', score: 2 },
          { label: 'Kategoriyi haritaladım; kimin nerede durduğunu net görüyorum', score: 3 },
        ],
      },
      {
        question: 'Markanızı rakiplerden ayıracak farkınız ne olacak?',
        options: [
          { label: 'Fark üzerine henüz düşünmedim', score: 0 },
          { label: '"Daha kaliteli / daha ucuz" gibi genel bir fikrim var', score: 1 },
          { label: 'Bir farklılaşma fikrim var ama test etmedim', score: 2 },
          { label: 'Net ve savunulabilir bir farklılaşma eksenim var', score: 3 },
        ],
      },
      {
        question: 'Marka isminiz ve isim alternatifleri konusunda ne durumdasınız?',
        options: [
          { label: 'Henüz isim düşünmedim', score: 0 },
          { label: 'Aklımda isimler var ama uygunluk (tescil, domain) kontrolü yapmadım', score: 1 },
          { label: 'İsim adaylarım var, ön kontrolleri yapıyorum', score: 2 },
          { label: 'İsmim hazır; tescil ve domain kontrolleri tamam', score: 3 },
        ],
      },
      {
        question: 'Markanızın nasıl konuşacağını (ses tonu) ve nasıl görüneceğini düşündünüz mü?',
        options: [
          { label: 'Hayır, bunlar aklıma gelmedi', score: 0 },
          { label: 'Görsel tarafta beğendiğim örnekler biriktiriyorum', score: 1 },
          { label: 'Ses tonu ve görsel yön için kabaca bir çerçevem var', score: 2 },
          { label: 'Kimlik yönü net; brief verebilecek durumdayım', score: 3 },
        ],
      },
      {
        question: 'İlk müşterilerinize hangi kanallardan ulaşacağınızı biliyor musunuz?',
        options: [
          { label: 'Henüz kanal düşünmedim', score: 0 },
          { label: '"Sosyal medya açarım" düzeyinde bir fikrim var', score: 1 },
          { label: 'Kitlemin olduğu 1-2 kanalı belirledim', score: 2 },
          { label: 'Kanal planım ve ilk 90 gün için içerik fikirlerim hazır', score: 3 },
        ],
      },
      {
        question: 'Markanın para kazanma modeli (iş modeli) sizin için ne kadar net?',
        options: [
          { label: 'Gelir modelini henüz düşünmedim', score: 0 },
          { label: 'Ne satacağım belli ama fiyatlama ve maliyetler belirsiz', score: 1 },
          { label: 'Model kabaca belli; rakamları netleştiriyorum', score: 2 },
          { label: 'Gelir modeli, fiyatlama ve temel maliyetler net', score: 3 },
        ],
      },
      {
        question: 'Marka kurulumu için ayırabileceğiniz bütçe ve kaynak durumu nedir?',
        options: [
          { label: 'Bütçe ayırmadım, her şey belirsiz', score: 0 },
          { label: 'Küçük bir bütçem var ama neye harcayacağımı bilmiyorum', score: 1 },
          { label: 'Bütçem belli; öncelik sıralaması yapmaya çalışıyorum', score: 2 },
          { label: 'Bütçem ve harcama önceliklerim planlı', score: 3 },
        ],
      },
      {
        question: 'Bu markaya ne kadar zaman ayırmayı planlıyorsunuz?',
        options: [
          { label: 'Şimdilik sadece bir hayal; somut adım atmadım', score: 0 },
          { label: 'Boş zamanlarımda ilgilenmeyi düşünüyorum', score: 1 },
          { label: 'Düzenli zaman ayıracağım; yan proje olarak ciddiyim', score: 2 },
          { label: 'Ana işim olacak; tam zamanlı odaklanacağım', score: 3 },
        ],
      },
    ],
    bands: [
      {
        min: 0,
        max: 12,
        title: 'Fikir Aşamasındasınız',
        summary:
          'Elinizde değerli bir fikir var ama marka temelleri henüz atılmamış. Bu aşamada atılacak yanlış bir adım, ileride pahalıya mal olabilir. Önce problemi, kitleyi ve farkı netleştirmek gerekiyor.',
        recommendations: [
          'Markanızın çözdüğü problemi tek cümleye indirin',
          'Hedef kitlenizden en az 10 kişiyle birebir konuşun',
          'Kategorinizdeki 5 rakibi inceleyip bir rekabet haritası çıkarın',
        ],
      },
      {
        min: 13,
        max: 21,
        title: 'Temeller Şekilleniyor',
        summary:
          'Doğru sorular üzerine düşünmüşsünüz; ancak bazı kritik alanlar hâlâ belirsiz. Bu belirsizlikler netleşmeden kimlik ve iletişime para harcamak riskli olur.',
        recommendations: [
          'Farklılaşma ekseninizi yazıya dökün ve çevrenizde test edin',
          'İsim adaylarınız için tescil ve domain kontrollerini tamamlayın',
          'İlk 90 gün için basit bir kanal ve içerik planı hazırlayın',
        ],
      },
      {
        min: 22,
        max: 30,
        title: 'Lansmana Yakınsınız',
        summary:
          'Marka kurulumu için gereken zihinsel hazırlığın büyük kısmı tamam. Şimdi kritik olan; stratejiyi yazılı hale getirmek ve kimliği bu stratejiden türetmek. Bu aşamada profesyonel bir bakış, hataları lansmandan önce yakalar.',
        recommendations: [
          'Konumlandırma cümlenizi ve değer önerinizi tek sayfada yazın',
          'Kimlik çalışmasına stratejik bir brief ile başlayın',
          'Lansman öncesi birebir görüşmeyle stratejinizi doğrulatın',
        ],
      },
    ],
  },
  {
    slug: 'buyume-engeli',
    level: 'Orta Düzey',
    title: 'Marka Büyüme Engeli Testi',
    shortTitle: 'Büyüme Engeli',
    description:
      'Markanızı kurdunuz ama beklediğiniz gibi büyümüyor. 10 kısa soruyla büyümenin önünde duran asıl engelin nerede olduğunu birlikte teşhis edelim.',
    audience: 'Markası olan ama büyüyemeyenler için',
    duration: 'Yaklaşık 1 dakika',
    icon: 'gauge',
    color: '#E5BE7C',
    questions: [
      {
        question: 'Markanızın ne için var olduğunu ekibiniz ve müşterileriniz aynı şekilde mi anlatıyor?',
        options: [
          { label: 'Herkes farklı bir şey söylüyor; ortak bir anlatı yok', score: 0 },
          { label: 'Ekip içinde bile belirsiz', score: 1 },
          { label: 'Ekip aynı şeyi söylüyor ama müşteriler farklı algılıyor', score: 2 },
          { label: 'Evet, içeride ve dışarıda tutarlı bir algı var', score: 3 },
        ],
      },
      {
        question: 'Mevcut müşterileriniz sizi neden tercih ediyor, biliyor musunuz?',
        options: [
          { label: 'Hiç sormadım, bilmiyorum', score: 0 },
          { label: 'Tahminlerim var ama veriye dayanmıyor', score: 1 },
          { label: 'Ara sıra geri bildirim alıyorum, kabaca biliyorum', score: 2 },
          { label: 'Düzenli olarak soruyorum; tercih nedenlerini net biliyorum', score: 3 },
        ],
      },
      {
        question: 'Rakipleriniz fiyat kırdığında ne oluyor?',
        options: [
          { label: 'Müşteri kaybediyoruz; fiyat dışında tutunacak dalımız yok', score: 0 },
          { label: 'Biz de fiyat indirmek zorunda kalıyoruz', score: 1 },
          { label: 'Bir kısım müşteri kalıyor ama zorlanıyoruz', score: 2 },
          { label: 'Müşterilerimiz fiyattan bağımsız, marka için bizde kalıyor', score: 3 },
        ],
      },
      {
        question: 'Pazarlama ve iletişim çalışmalarınız bir stratejiye mi, o anki ihtiyaca mı göre ilerliyor?',
        options: [
          { label: 'Tamamen anlık; aklımıza gelince paylaşım yapıyoruz', score: 0 },
          { label: 'Düzenli üretiyoruz ama bir mesaj bütünlüğü yok', score: 1 },
          { label: 'Kabaca bir planımız var ama sık sapıyoruz', score: 2 },
          { label: 'Net bir mesaj çerçevesi ve takvimle ilerliyoruz', score: 3 },
        ],
      },
      {
        question: 'Yeni müşteri kazanma maliyetiniz son bir yılda nasıl değişti?',
        options: [
          { label: 'Ölçmüyoruz, bilmiyorum', score: 0 },
          { label: 'Sürekli artıyor; reklam kesilince satış duruyor', score: 1 },
          { label: 'Sabit gidiyor ama organik büyüme zayıf', score: 2 },
          { label: 'Tavsiye ve organik kanallar sayesinde düşüyor', score: 3 },
        ],
      },
      {
        question: 'Müşterileriniz tekrar satın alıyor ya da sizi başkalarına öneriyor mu?',
        options: [
          { label: 'Çoğu tek seferlik alışveriş yapıp kayboluyor', score: 0 },
          { label: 'Tekrar eden az sayıda müşteri var', score: 1 },
          { label: 'Sadık bir çekirdek kitle var ama büyümüyor', score: 2 },
          { label: 'Tekrar satın alma ve tavsiye oranımız güçlü', score: 3 },
        ],
      },
      {
        question: 'Markanızın görsel ve sözel kimliği tüm kanallarda tutarlı mı?',
        options: [
          { label: 'Her kanal başka telden çalıyor', score: 0 },
          { label: 'Logo aynı ama ton ve tasarım dili değişken', score: 1 },
          { label: 'Çoğunlukla tutarlı; ara sıra sapmalar oluyor', score: 2 },
          { label: 'Kılavuza bağlı, her kanalda tutarlı bir kimlik var', score: 3 },
        ],
      },
      {
        question: 'Hedef kitleniz kurulduğunuz günden bu yana değişti mi, kontrol ettiniz mi?',
        options: [
          { label: 'Hiç düşünmedim; ilk günkü varsayımlarla ilerliyoruz', score: 0 },
          { label: 'Değiştiğini hissediyorum ama incelemedim', score: 1 },
          { label: 'Gözden geçirdik ama stratejiye yansıtmadık', score: 2 },
          { label: 'Düzenli gözden geçiriyor ve stratejiyi güncelliyoruz', score: 3 },
        ],
      },
      {
        question: 'Büyüme için önünüzdeki en büyük engelin ne olduğu konusunda net misiniz?',
        options: [
          { label: 'Hayır; ne denediysek olmadı, nedenini bilmiyoruz', score: 0 },
          { label: 'Birden fazla şüphelim var ama kararsızım', score: 1 },
          { label: 'Ana engeli tahmin ediyorum ama doğrulamadım', score: 2 },
          { label: 'Engeli biliyorum; çözüm için kaynak arıyorum', score: 3 },
        ],
      },
      {
        question: 'Marka ile ilgili kararları (kampanya, fiyat, tasarım) neye göre veriyorsunuz?',
        options: [
          { label: 'İçgüdüsel; o an doğru geleni yapıyoruz', score: 0 },
          { label: 'Rakipler ne yapıyorsa ona bakıyoruz', score: 1 },
          { label: 'Kısmen veriye, kısmen sezgiye dayanıyoruz', score: 2 },
          { label: 'Yazılı bir strateji çerçevesine göre karar veriyoruz', score: 3 },
        ],
      },
    ],
    bands: [
      {
        min: 0,
        max: 12,
        title: 'Yapısal Sorunlar Var',
        summary:
          'Büyüyememenizin asıl nedeni, markanın stratejik temellerinin eksik olması. Konumlandırma, hedef kitle ve farklılaşma netleşmeden yapılan her yatırım, delikli kovaya su taşımaya benziyor.',
        recommendations: [
          'Önce mevcut müşterilerinizle konuşun: sizi neden tercih ediyorlar?',
          'Konumlandırmanızı sıfırdan gözden geçirin ve yazılı hale getirin',
          'İletişim yatırımlarını strateji netleşene kadar minimumda tutun',
        ],
      },
      {
        min: 13,
        max: 21,
        title: 'Büyüme Frenleri Devrede',
        summary:
          'Markanız çalışıyor ama el freni çekili gidiyorsunuz. Bazı alanlar sağlam, bazı kritik noktalar ise büyümeyi sessizce frenliyor. İyi haber: sorun teşhis edilebilir durumda.',
        recommendations: [
          'En düşük puan aldığınız alanları önceliklendirin',
          'Mesaj bütünlüğü için tek sayfalık bir iletişim çerçevesi oluşturun',
          'Müşteri kazanma maliyeti ve tekrar satın almayı düzenli ölçmeye başlayın',
        ],
      },
      {
        min: 22,
        max: 30,
        title: 'Temel Sağlam, İnce Ayar Gerekli',
        summary:
          'Markanızın temelleri büyük ölçüde yerinde; büyüme engeli muhtemelen birkaç spesifik noktada gizli. Bu aşamada dışarıdan bir gözün yapacağı teşhis, aylarca sürecek deneme yanılmadan daha hızlı sonuç verir.',
        recommendations: [
          'Zayıf kalan 1-2 alan için odaklı bir aksiyon planı çıkarın',
          'Marka sağlığı metriklerini (bilinirlik, tercih, tavsiye) takibe alın',
          'Birebir görüşmeyle büyüme engelinizi birlikte netleştirelim',
        ],
      },
    ],
  },
  {
    slug: 'olceklenme-hazirligi',
    level: 'İleri Düzey',
    title: 'Marka Ölçeklenme Testi',
    shortTitle: 'Ölçeklenme',
    description:
      'Markanız birkaç yıldır sahada ve sırada büyüme, yeni pazarlar ya da yeni ürünler var. 10 kısa soruyla markanızın ölçeklenmeye ne kadar hazır olduğunu görelim.',
    audience: 'Birkaç yıldır faaliyette olan markalar için',
    duration: 'Yaklaşık 1 dakika',
    icon: 'rocket',
    color: '#B3A6E3',
    questions: [
      {
        question: 'Marka stratejiniz yazılı bir doküman olarak var mı?',
        options: [
          { label: 'Hayır; strateji kurucunun zihninde yaşıyor', score: 0 },
          { label: 'Dağınık sunumlar ve notlar halinde var', score: 1 },
          { label: 'Yazılı ama güncelliğini yitirmiş', score: 2 },
          { label: 'Yazılı, güncel ve ekipçe biliniyor', score: 3 },
        ],
      },
      {
        question: 'Ekip büyüdükçe marka tutarlılığı nasıl korunuyor?',
        options: [
          { label: 'Korunamıyor; herkes kendi yorumunu katıyor', score: 0 },
          { label: 'Kurucu her işi tek tek kontrol ediyor (darboğaz)', score: 1 },
          { label: 'Kılavuzlarımız var ama uygulama denetimi zayıf', score: 2 },
          { label: 'Kılavuz, eğitim ve onay süreçleriyle sistematik korunuyor', score: 3 },
        ],
      },
      {
        question: 'Yeni ürün ya da alt marka çıkarırken nasıl karar veriyorsunuz?',
        options: [
          { label: 'Fırsat görünce çıkarıyoruz; bir mimari mantığı yok', score: 0 },
          { label: 'Her seferinde sıfırdan tartışıyoruz', score: 1 },
          { label: 'Kabaca bir mantığımız var ama yazıya dökülmedi', score: 2 },
          { label: 'Net bir marka mimarisi çerçevemiz var', score: 3 },
        ],
      },
      {
        question: 'Yeni bir pazara ya da segmente girme kararını neye dayandırıyorsunuz?',
        options: [
          { label: 'Sezgiye; cazip görüneni deniyoruz', score: 0 },
          { label: 'Rakipler girdiyse biz de giriyoruz', score: 1 },
          { label: 'Araştırıyoruz ama marka uyumunu sorgulamıyoruz', score: 2 },
          { label: 'Pazar verisi + marka stratejisi uyumuyla karar veriyoruz', score: 3 },
        ],
      },
      {
        question: 'Marka sağlığınızı (bilinirlik, algı, tercih) ölçüyor musunuz?',
        options: [
          { label: 'Hayır, hiç ölçmedik', score: 0 },
          { label: 'Sadece satış ve takipçi sayısına bakıyoruz', score: 1 },
          { label: 'Ara sıra anket / araştırma yapıyoruz', score: 2 },
          { label: 'Düzenli ölçüyor ve kararlara yansıtıyoruz', score: 3 },
        ],
      },
      {
        question: 'Markanız kurucusundan bağımsız ayakta durabilir mi?',
        options: [
          { label: 'Hayır; marka = kurucu, o olmadan hiçbir şey yürümez', score: 0 },
          { label: 'Kritik kararların tamamı hâlâ kurucuya bağlı', score: 1 },
          { label: 'Ekip çoğu alanı yürütüyor ama vizyon tek kişide', score: 2 },
          { label: 'Marka kurumsal bir sistem olarak kendi başına işliyor', score: 3 },
        ],
      },
      {
        question: 'Fiyatlandırmada premium konuma geçme ya da marj artırma gücünüz var mı?',
        options: [
          { label: 'Hayır; en ufak zamda müşteri kaybediyoruz', score: 0 },
          { label: 'Kategori ortalamasına mahkumuz', score: 1 },
          { label: 'Bazı ürünlerde fiyat gücümüz var', score: 2 },
          { label: 'Marka gücümüz sayesinde fiyat esnekliğimiz yüksek', score: 3 },
        ],
      },
      {
        question: 'İşveren markası tarafında durum ne? Yetenekler size gelmek istiyor mu?',
        options: [
          { label: 'İşe alım çok zor; markamız aday gözünde bilinmiyor', score: 0 },
          { label: 'İlan veriyoruz ama nitelikli başvuru az', score: 1 },
          { label: 'Sektörde iyi bir yerdeyiz ama bilinçli bir çalışmamız yok', score: 2 },
          { label: 'Güçlü bir işveren markamız var; yetenekler bizi buluyor', score: 3 },
        ],
      },
      {
        question: 'Bir kriz anında (sosyal medya krizi, ürün sorunu) markanız ne kadar hazırlıklı?',
        options: [
          { label: 'Hiç hazırlığımız yok; olursa o an düşünürüz', score: 0 },
          { label: 'Geçmişte kriz yaşadık ve zor toparladık', score: 1 },
          { label: 'Kabaca bir planımız var ama test edilmedi', score: 2 },
          { label: 'Kriz senaryolarımız ve iletişim planımız hazır', score: 3 },
        ],
      },
      {
        question: 'Önümüzdeki 3 yıl için markanın nereye gideceği konusunda net bir resim var mı?',
        options: [
          { label: 'Yok; günü kurtarmaya odaklıyız', score: 0 },
          { label: 'Ciro hedefi var ama marka vizyonu yok', score: 1 },
          { label: 'Vizyon var ama yol haritasına dönüşmedi', score: 2 },
          { label: 'Net bir vizyon ve buna bağlı yol haritamız var', score: 3 },
        ],
      },
    ],
    bands: [
      {
        min: 0,
        max: 12,
        title: 'Ölçeklenme İçin Erken',
        summary:
          'Markanız bugüne kadar büyümüş olabilir; ancak mevcut yapının ölçeklenmenin yükünü taşıması zor. Bu haliyle büyümek, çatlakları da büyütür. Önce sistemi kurmak gerekiyor.',
        recommendations: [
          'Marka stratejinizi yazılı ve ekipçe bilinen bir doküman haline getirin',
          'Kurucuya bağımlılığı azaltacak karar mekanizmaları kurun',
          'Yeni pazar/ürün kararlarını strateji netleşene kadar erteleyin',
        ],
      },
      {
        min: 13,
        max: 21,
        title: 'Büyüme Var, Sistem Eksik',
        summary:
          'Markanız sahada kendini kanıtlamış; ancak ölçeklenme disiplini kısmen eksik. Mimari, ölçüm ve kurumsallaşma tarafındaki boşluklar, büyüme hızlandıkça sorun çıkarmaya aday.',
        recommendations: [
          'Marka mimarisi çerçevenizi netleştirin: ne zaman alt marka, ne zaman ana marka?',
          'Marka sağlığı ölçümünü düzenli hale getirin',
          'Marka kılavuzlarını güncelleyip uygulama denetimi ekleyin',
        ],
      },
      {
        min: 22,
        max: 30,
        title: 'Ölçeklenmeye Hazırsınız',
        summary:
          'Markanız hem stratejik hem operasyonel olarak olgun bir noktada. Bundan sonraki soru artık "hangi yöne, hangi sırayla?" sorusu. Bu aşamada doğru büyüme mimarisi, yılları kazandırır.',
        recommendations: [
          'Büyüme senaryolarını (yeni pazar, yeni segment, yeni ürün) önceliklendirin',
          'Portföy genişledikçe marka mimarisini stres testinden geçirin',
          'Birebir görüşmeyle ölçeklenme yol haritanızı birlikte kurgulayalım',
        ],
      },
    ],
  },
];

export function getBrandTest(slug: string): BrandTest | undefined {
  return BRAND_TESTS.find((t) => t.slug === slug);
}

export function getMaxScore(test: BrandTest): number {
  return test.questions.reduce(
    (sum, q) => sum + Math.max(...q.options.map((o) => o.score)),
    0,
  );
}

export function getResultBand(test: BrandTest, score: number): TestResultBand {
  return (
    test.bands.find((b) => score >= b.min && score <= b.max) ??
    test.bands[test.bands.length - 1]
  );
}
