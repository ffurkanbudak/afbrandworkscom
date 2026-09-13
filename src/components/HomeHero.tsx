import Image from 'next/image';

/**
 * Ana sayfa açılış bölümü.
 *
 * Portre görseli hiçbir şekilde işlenmez: /hero-portrait.png orijinal
 * dosyanın birebir kopyasıdır. Yalnızca `object-fit`/`object-position` ile
 * çerçevelenir.
 *
 * Yerleşim tamamen globals.css'teki `.home-hero-*` kurallarıyla sürülür:
 * - Geniş (yatay) ekranlarda görsel tüm ekranı kaplar, portre sağda durur,
 *   tipografi soldaki siyah negatif alana oturur.
 * - Dar/dikey ekranlarda portre üst banda alınır, tipografi altındaki siyah
 *   zemine geçer. Böylece dikey tablet/telefonda kompozisyonu bozan agresif
 *   kırpma yapılmaz.
 */
export function HomeHero() {
  return (
    <section
      className="home-hero full-bleed"
      aria-label="Ahmet Furkan Budak — Stratejik Marka Danışmanı"
    >
      <div className="home-hero-media">
        <Image
          src="/hero-portrait.png"
          alt="Ahmet Furkan Budak portresi"
          fill
          priority
          sizes="100vw"
          quality={92}
          className="home-hero-img"
        />
      </div>

      {/* Dar ekranda görselin alt kenarını siyah zemine bağlayan geçiş.
          Görsele dokunulmaz; yalnızca üstüne binen ayrı bir katman. */}
      <div className="home-hero-fade" />

      <div className="home-hero-content">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="home-hero-col">
            {/* İsim ve unvan, referans imza görseliyle verilir; h1 metni alt'tan gelir. */}
            <h1 className="home-hero-imza">
              <Image
                src="/hero-imza.png"
                alt="Ahmet Furkan Budak — Stratejik Marka Danışmanı"
                width={1229}
                height={283}
                priority
                sizes="(min-width: 768px) 44vw, 90vw"
                className="home-hero-imza-img"
              />
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
