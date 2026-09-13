import type { CSSProperties } from 'react';

const GENISLIK = 'min(calc(100vw - 2rem), 1400px)';

/**
 * Footer'daki siyah kartla aynı çerçeve: ekran kenarlarından 1rem içeride,
 * en fazla 1400px, yuvarlak köşeli; ardışık kartlar arasında 1rem boşluk.
 * Hangi kapsayıcının içinde olursa olsun ekranda ortalanır. Satır içi stil
 * olarak verilir ki derlenmiş CSS'e bağlı kalmasın.
 */
export const KART_STILI: CSSProperties = {
  position: 'relative',
  width: GENISLIK,
  marginLeft: `calc((100% - ${GENISLIK}) / 2)`,
  marginRight: `calc((100% - ${GENISLIK}) / 2)`,
  marginTop: '1rem',
  marginBottom: '1rem',
  borderRadius: '1rem',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  overflow: 'hidden',
};
