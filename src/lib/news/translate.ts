const GEMINI_MODEL = 'gemini-2.5-flash';

export type TranslationResult = {
  titleTr: string;
  summaryTr: string;
  editorialNote: string;
};

type GeminiResponse = {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> };
  }>;
};

const PROMPT = `Sen Türkiye'de bir markalaşma / pazarlama bülteninin Türkçe editörüsün. Sana İngilizce ya da Türkçe bir haber başlığı ve kısa metni vereceğim. Görevin:

1) Başlığı Türkçeye akıcı, habercilik tonunda çevir (gerekirse biraz uyarla; kelime kelime değil). Maksimum 90 karakter. Büyük/küçük harf kuralını Türkçeye uygun yap. Emoji kullanma.
2) 2 kısa cümlelik Türkçe özet yaz. Haberin önemini ve okuyucuya ne söylediğini özetle. Toplam 260 karakteri geçme. Asla orijinal metnin tümünü kopyalama; kendi cümlelerinle özetle.
3) Editör notu (tek cümle) yaz: Bu haber Türkiye'deki bir marka danışmanının okurları için neden ilginç? Maksimum 140 karakter. Klişe kaçınma.

Şu kurallara mutlaka uy:
- Türkçeye "brand / branding" → "marka / markalaşma", "marketing" → "pazarlama" gibi yerel karşılıklar seç.
- Tırnak içindeki özel marka isimlerini çevirme.
- Abartılı reklam dili kullanma; gazetecilik tonu.
- Çıktın mutlaka geçerli JSON olsun. Başka hiçbir şey yazma.

Çıktı formatı:
{"titleTr":"...","summaryTr":"...","editorialNote":"..."}

Haber:
Başlık: {{TITLE}}
Metin: {{EXCERPT}}`;

export async function translateNews(input: {
  title: string;
  excerpt: string | null;
  language: 'EN' | 'TR';
}): Promise<TranslationResult> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY yok');

  const prompt = PROMPT
    .replace('{{TITLE}}', input.title)
    .replace('{{EXCERPT}}', input.excerpt ?? '(özet yok)');

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.35,
          responseMimeType: 'application/json',
        },
      }),
    }
  );

  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`gemini ${res.status}: ${txt.slice(0, 200)}`);
  }

  const json = (await res.json()) as GeminiResponse;
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('gemini boş yanıt');

  const cleaned = text
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  const parsed = JSON.parse(cleaned) as Partial<TranslationResult>;
  if (!parsed.titleTr || !parsed.summaryTr || !parsed.editorialNote) {
    throw new Error('gemini eksik alan');
  }

  return {
    titleTr: parsed.titleTr.trim(),
    summaryTr: parsed.summaryTr.trim(),
    editorialNote: parsed.editorialNote.trim(),
  };
}
