/**
 * Stok görsellerin kaynak bilgisi.
 *
 * Anahtar, yazının `coverImageUrl` alanıyla birebir aynı olmalıdır. Bir kapak
 * görselinin burada karşılığı varsa görselin üzerinde kaynak rozeti belirir;
 * karşılığı olmayan görseller rozetsiz görünür. Ücretsiz lisanslar genellikle
 * sanatçı adının ve kaynağın görünür biçimde anılmasını şart koştuğu için
 * rozet, görselin kendisiyle birlikte taşınır.
 */
export type ImageCredit = {
  /** Fotoğrafı çeken kişi ya da stüdyo. */
  sanatci: string;
  /** Görselin alındığı platform. */
  kaynak: string;
  /** Görselin platformdaki sayfası. */
  url: string;
};

export const IMAGE_CREDITS: Record<string, ImageCredit> = {
  // Örnek biçim; yeni bir stok görsel eklendiğinde buraya bir satır yazılır.
  // '/uploads/ornek.jpg': {
  //   sanatci: 'Fotoğrafçının adı',
  //   kaynak: 'Magnific',
  //   url: 'https://www.magnific.com/...',
  // },
};

export function getImageCredit(coverImageUrl?: string | null): ImageCredit | null {
  if (!coverImageUrl) return null;
  return IMAGE_CREDITS[coverImageUrl] ?? null;
}
