type Props = {
  className?: string;
  title?: string;
  /** Logo yüksekliği (px). Genişlik orana göre otomatik. */
  height?: number;
};

/**
 * Temaya duyarlı logo.
 * - Açık (beyaz) sayfa → siyah logo
 * - Koyu (siyah) sayfa → beyaz logo
 * İki görsel de render edilir; görünürlük CSS ile `html[data-theme]`e göre seçilir.
 * Yükseklik inline style ile sabitlenir; SVG'nin gömülü boyutları header'ı bozamaz.
 */
export function Logo({ className, title = 'Ahmet Furkan Budak', height = 30 }: Props) {
  return (
    <span
      className={`logo-swap inline-flex items-center ${className ?? ''}`}
      style={{ height }}
      role="img"
      aria-label={title}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-black.svg"
        alt={title}
        className="logo-on-light"
        style={{ height: '100%', width: 'auto' }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-white.svg"
        alt={title}
        className="logo-on-dark"
        style={{ height: '100%', width: 'auto' }}
      />
    </span>
  );
}
