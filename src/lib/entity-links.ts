/**
 * Yazı gövdeleriyle varlık sayfaları arasındaki bağlantı katmanı.
 *
 * Yazılar tek tek elle bağlanmak yerine, gövde metni render edilirken bilinen
 * kavramların ilk geçişi ilgili pillar sayfasına ya da sözlük girdisine
 * bağlanır. Böylece her yeni yazı bu ağa kendiliğinden eklemlenir ve elle
 * bağlantı bakımı gerekmez.
 *
 * Bağlanan varlıklar aynı zamanda yapısal veriye `about` / `mentions` olarak
 * aktarılır; metindeki bağlantı ile makine tarafından okunan varlık referansı
 * böylece aynı kaynaktan üretilir.
 */

export type Varlik = {
  /** Metinde aranan kavram. */
  terim: string;
  /** Kavramın site içindeki adresi. */
  href: string;
  /** Yapısal veride kullanılacak ad. */
  ad: string;
};

/**
 * Uzun terimler önce gelir: "Marka Konumlandırma" eşleştiğinde
 * "Konumlandırma" tekrar eşleşmesin.
 */
const VARLIKLAR: Varlik[] = [
  { terim: 'Marka Danışmanlığı', href: '/marka-danismanligi', ad: 'Marka Danışmanlığı' },
  { terim: 'Marka Konumlandırma', href: '/konumlandirma', ad: 'Marka Konumlandırma' },
  { terim: 'Marka Farklılaşması', href: '/farklilasma', ad: 'Marka Farklılaşması' },
  { terim: 'Dijital Markalaşma', href: '/dijital-markalasma', ad: 'Dijital Markalaşma' },
  { terim: 'Pazarlama İletişimi', href: '/pazarlama-iletisimi', ad: 'Pazarlama İletişimi' },
  { terim: 'Marka Yenilemesi', href: '/marka-yenilemesi', ad: 'Marka Yenilemesi' },
  { terim: 'Marka Stratejisi', href: '/marka-stratejisi', ad: 'Marka Stratejisi' },
  { terim: 'Marka Mimarisi', href: '/marka-mimarisi', ad: 'Marka Mimarisi' },
  { terim: 'Marka Yönetimi', href: '/marka-yonetimi', ad: 'Marka Yönetimi' },
  { terim: 'Marka Kimliği', href: '/marka-kimligi', ad: 'Marka Kimliği' },
  { terim: 'Marka Sağlığı', href: '/marka-sagligi', ad: 'Marka Sağlığı' },
  { terim: 'Farklılaşma Ekseni', href: '/sozluk#farklilasma-ekseni', ad: 'Farklılaşma Ekseni' },
  { terim: 'Marka Tutarlılığı', href: '/sozluk#marka-tutarliligi', ad: 'Marka Tutarlılığı' },
  { terim: 'Marka Genişlemesi', href: '/sozluk#marka-genislemesi', ad: 'Marka Genişlemesi' },
  { terim: 'Tutarlı İletişim', href: '/sozluk#marka-tutarliligi', ad: 'Marka Tutarlılığı' },
  { terim: 'İletişim Dili', href: '/sozluk#marka-sesi', ad: 'Marka Sesi' },
  { terim: 'Marka Değeri', href: '/sozluk#marka-degeri', ad: 'Marka Değeri' },
  { terim: 'Hedef Kitle', href: '/sozluk#hedef-kitle', ad: 'Hedef Kitle' },
  { terim: 'Değer Önerisi', href: '/sozluk#deger-onerisi', ad: 'Değer Önerisi' },
  { terim: 'Marka Vaadi', href: '/sozluk#marka-vaadi', ad: 'Marka Vaadi' },
  { terim: 'Marka Sesi', href: '/sozluk#marka-sesi', ad: 'Marka Sesi' },
  { terim: 'Konumlandırma', href: '/konumlandirma', ad: 'Marka Konumlandırma' },
  { terim: 'Farklılaşma', href: '/farklilasma', ad: 'Marka Farklılaşması' },
];

/** Bir yazıda en fazla kaç kavramın bağlanacağı. Aşırı bağlantı okumayı bozar. */
const AZAMI_BAGLANTI = 3;

/** Türkçe harfler; sözcük sınırını bunlara göre belirliyoruz. */
const HARF = 'A-Za-zÇçĞğIıİiÖöŞşÜü';

/** Türkçede I/ı ve İ/i eşleşmesi standart `i` bayrağıyla bozulur; çiftleri elle kuruyoruz. */
const BUYUK_KUCUK: Record<string, string> = {
  I: 'ı', İ: 'i', Ç: 'ç', Ğ: 'ğ', Ö: 'ö', Ş: 'ş', Ü: 'ü',
  ı: 'I', i: 'İ', ç: 'Ç', ğ: 'Ğ', ö: 'Ö', ş: 'Ş', ü: 'Ü',
};

function kacis(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Her harf için büyük/küçük çiftini içeren bir karakter sınıfı üretir. */
function harfSinifi(harf: string): string {
  const es = BUYUK_KUCUK[harf] ?? (harf === harf.toLowerCase() ? harf.toUpperCase() : harf.toLowerCase());
  if (es === harf) return kacis(harf);
  return `[${kacis(harf)}${kacis(es)}]`;
}

function terimKalibi(terim: string): RegExp {
  const govde = [...terim].map((h) => (/\s/.test(h) ? '\\s+' : harfSinifi(h))).join('');
  // Terimden sonra gelen Türkçe eki de bağlantı metnine dahil ederiz: "konumlandırmayı" gibi.
  return new RegExp(`(^|[^${HARF}])(${govde}[a-zçğıöşü]{0,6})(?![${HARF}])`);
}

/** İçinde bağlantı kurulmayacak etiketler: mevcut bağlantılar, başlıklar ve kod. */
const ATLANAN = new Set(['a', 'h1', 'h2', 'h3', 'h4', 'code', 'pre']);

/**
 * Gövde metnindeki kavramların ilk geçişini varlık sayfalarına bağlar.
 * HTML etiketlerinin içine ve mevcut bağlantıların gövdesine dokunmaz.
 */
export function varlikBaglantilariniEkle(html: string): { html: string; varliklar: Varlik[] } {
  if (!html) return { html, varliklar: [] };

  const parcalar = html.split(/(<[^>]+>)/);
  const kalanlar = [...VARLIKLAR];
  const bulunanlar: Varlik[] = [];
  const acikEtiketler: string[] = [];

  const sonuc = parcalar.map((parca) => {
    if (parca.startsWith('<')) {
      const kapanis = /^<\/\s*([a-zA-Z0-9]+)/.exec(parca);
      if (kapanis) {
        const ad = kapanis[1].toLowerCase();
        const sira = acikEtiketler.lastIndexOf(ad);
        if (sira !== -1) acikEtiketler.splice(sira, 1);
        return parca;
      }
      const acilis = /^<\s*([a-zA-Z0-9]+)/.exec(parca);
      if (acilis && !parca.endsWith('/>')) acikEtiketler.push(acilis[1].toLowerCase());
      return parca;
    }

    if (!parca.trim()) return parca;
    if (acikEtiketler.some((e) => ATLANAN.has(e))) return parca;
    if (bulunanlar.length >= AZAMI_BAGLANTI) return parca;

    // Adaylar özgün metin üzerinde toplanır. Bağlantıyı eklenmiş metne göre
    // aramak, yeni <a> gövdesinin içinde tekrar eşleşmeye ve iç içe geçmiş
    // bağlantılara yol açıyordu.
    type Aday = { varlik: Varlik; bas: number; son: number; gorunen: string };
    const adaylar: Aday[] = [];

    for (const varlik of kalanlar) {
      const eslesme = terimKalibi(varlik.terim).exec(parca);
      if (!eslesme) continue;
      const bas = eslesme.index + eslesme[1].length;
      adaylar.push({ varlik, bas, son: bas + eslesme[2].length, gorunen: eslesme[2] });
    }

    // Belge sırasına göre; aynı noktada başlayanlarda uzun terim önce gelir.
    adaylar.sort((a, b) => a.bas - b.bas || b.son - b.bas - (a.son - a.bas));

    const secilenler: Aday[] = [];
    for (const aday of adaylar) {
      if (bulunanlar.length + secilenler.length >= AZAMI_BAGLANTI) break;
      if (secilenler.some((s) => aday.bas < s.son && s.bas < aday.son)) continue;
      secilenler.push(aday);
    }

    if (!secilenler.length) return parca;

    let sonucMetin = '';
    let imlec = 0;
    for (const s of secilenler) {
      sonucMetin += parca.slice(imlec, s.bas);
      sonucMetin += `<a href="${s.varlik.href}" class="entity-link">${s.gorunen}</a>`;
      imlec = s.son;
      bulunanlar.push(s.varlik);
      const sira = kalanlar.indexOf(s.varlik);
      if (sira !== -1) kalanlar.splice(sira, 1);
    }
    sonucMetin += parca.slice(imlec);
    return sonucMetin;
  });

  return { html: sonuc.join(''), varliklar: bulunanlar };
}
