import { NextResponse, type NextRequest } from 'next/server';

/**
 * Yapay zekâ tarayıcılarının ziyaretlerini görünür kılar.
 *
 * robots.txt bu tarayıcılara açık izin veriyor, ancak gerçekten gelip
 * gelmedikleri ve hangi sayfaları çektikleri ölçülemiyordu. Burada yalnızca
 * bilinen tarayıcı imzaları için tek satırlık yapılandırılmış bir kayıt
 * düşülür; istek olduğu gibi devam eder.
 *
 * Kayıt çalışma zamanı günlüğüne yazılır; veritabanına dokunulmaz.
 */

const YAPAY_ZEKA_TARAYICI =
  /(GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|Claude-Web|anthropic-ai|PerplexityBot|Perplexity-User|Google-Extended|Applebot-Extended|Meta-ExternalAgent|Meta-ExternalFetcher|Bytespider|Amazonbot|cohere-ai|Diffbot|CCBot)/i;

export default function proxy(request: NextRequest) {
  const ua = request.headers.get('user-agent') ?? '';
  const eslesme = YAPAY_ZEKA_TARAYICI.exec(ua);

  if (eslesme) {
    console.log(
      JSON.stringify({
        olay: 'ai-tarayici',
        bot: eslesme[1],
        yol: request.nextUrl.pathname,
        zaman: new Date().toISOString(),
      }),
    );
  }

  return NextResponse.next();
}

export const config = {
  /*
   * Yalnızca sayfa istekleri izlenir. Statik dosyalar, görseller ve API uçları
   * dışarıda bırakılır; böylece hem gereksiz çalıştırma hem de gürültü olmaz.
   */
  matcher: ['/((?!_next/static|_next/image|api/|favicon|.*\\.(?:svg|png|jpg|jpeg|webp|avif|ico|txt|xml|webmanifest)$).*)'],
};
