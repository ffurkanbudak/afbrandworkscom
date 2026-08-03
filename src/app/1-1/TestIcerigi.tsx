import { BRAND_TESTS } from '@/lib/brand-tests';

/**
 * Testlerin soruları ve sonuç yorumları, sunucu tarafında üretilen içerik olarak.
 *
 * Etkileşimli test istemcide çalıştığı için sorular ve sonuç yorumları yalnızca
 * kullanıcı bir teste dokunduktan sonra oluşuyordu; sayfanın sunucu HTML'inde
 * yalnızca test başlıkları yer alıyordu. Sitedeki en özgün içerik böylece arama
 * ve erişim sistemlerine görünmüyordu.
 *
 * Bu bölüm aynı içeriği katlanabilir biçimde sayfaya taşır: kullanıcı için
 * testi çözmeden önce içeriği görme imkânı, makineler için taranabilir metin.
 */
export function TestIcerigi() {
  return (
    <section
      className="mx-auto max-w-[1000px] border-t px-6 py-14 md:py-16"
      style={{ borderColor: 'var(--border)' }}
      aria-labelledby="test-icerigi-baslik"
    >
      <h2
        id="test-icerigi-baslik"
        className="font-display text-[22px] leading-tight tracking-tight md:text-[26px]"
      >
        Testlerde hangi sorular var, sonuçlar ne anlama geliyor?
      </h2>
      <p
        className="mt-3 text-[15px] leading-[1.6]"
        style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)', fontWeight: 300 }}
      >
        Üç testin soruları ve puan aralıklarına göre çıkan yorumlar aşağıda açık biçimde yer alıyor.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {BRAND_TESTS.map((test) => (
          <details
            key={test.slug}
            className="rounded-[10px] border px-5 py-4"
            style={{ borderColor: 'var(--border)' }}
          >
            <summary className="cursor-pointer list-none text-[15.5px] font-semibold tracking-tight">
              {test.title}
              <span
                className="ml-2 text-[12.5px] font-normal"
                style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
              >
                {test.level} · {test.questions.length} soru
              </span>
            </summary>

            <p
              className="mt-3 text-[14px] leading-[1.6]"
              style={{ color: 'color-mix(in oklab, var(--fg) 68%, transparent)' }}
            >
              {test.description}
            </p>

            <h3 className="mt-6 text-[13px] font-semibold tracking-[0.08em] uppercase">
              Sorular
            </h3>
            <ol className="mt-3 flex list-decimal flex-col gap-2 pl-5 text-[14px] leading-[1.55]">
              {test.questions.map((s) => (
                <li key={s.question}>{s.question}</li>
              ))}
            </ol>

            <h3 className="mt-6 text-[13px] font-semibold tracking-[0.08em] uppercase">
              Sonuç yorumları
            </h3>
            <div className="mt-3 flex flex-col gap-4">
              {test.bands.map((band) => (
                <div key={band.title}>
                  <p className="text-[14.5px] font-semibold tracking-tight">
                    {band.title}
                    <span
                      className="ml-2 text-[12.5px] font-normal"
                      style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                    >
                      {band.min}–{band.max} puan
                    </span>
                  </p>
                  <p
                    className="mt-1 text-[14px] leading-[1.6]"
                    style={{ color: 'color-mix(in oklab, var(--fg) 68%, transparent)' }}
                  >
                    {band.summary}
                  </p>
                  <ul className="mt-2 flex list-disc flex-col gap-1 pl-5 text-[13.5px] leading-[1.55]">
                    {band.recommendations.map((o) => (
                      <li key={o}>{o}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
