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
/** Logotype'ın kendi en-boy oranı (viewBox 568×42). Genişliği buradan türetiyoruz. */
const LOGO_RATIO = 568 / 42;

export function Logo({ className, title = 'Ahmet Furkan Budak', height = 30 }: Props) {
  const width = Math.round(height * LOGO_RATIO);

  return (
    <span
      className={`logo-swap inline-flex max-w-full items-center ${className ?? ''}`}
      style={{ height, maxWidth: width }}
      role="img"
      aria-label={title}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-black.svg"
        alt=""
        width={width}
        height={height}
        className="logo-on-light max-w-full object-contain object-left"
        style={{ height: '100%', width: 'auto' }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-white.svg"
        alt=""
        width={width}
        height={height}
        className="logo-on-dark max-w-full object-contain object-left"
        style={{ height: '100%', width: 'auto' }}
      />
    </span>
  );
}
