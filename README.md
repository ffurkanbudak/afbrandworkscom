# afbrandworks.com

Ahmet Furkan Budak'ın kişisel marka platformu. Strateji, markalaşma ve iletişim üzerine yazılar; küresel marka haberleri akışı (Gündem); topluluk, iletişim formları, sponsor/yazar başvuruları ve editör paneli ile uçtan uca yönetim.

## Teknoloji

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Dil:** TypeScript
- **UI:** Tailwind CSS 4, Lucide Icons, Tiptap (editör)
- **Veritabanı:** PostgreSQL (Neon) + Prisma ORM
- **Kimlik:** Clerk
- **E-posta:** Resend (inline CID attachments, bülten + kişisel mesaj şablonları)
- **Yapay zeka:** Google Gemini (gündem haberlerinin özet / çeviri üretimi)
- **Hosting:** Vercel

## Özellikler

- **Yazılar** — MDX/Tiptap tabanlı blog, kapak görselleri, konular, öneriler, yorumlar
- **Gündem** — Çoklu kaynaktan marka haberlerini çekme, Gemini ile TR çeviri + editör notu, admin onay akışı
- **Topluluk** — Abone kademeleri (Çırak / Kalfa / Usta / Pir), aktivite skoru, anasayfa topluluk akışı
- **Bülten** — Broadcast gönderimi, açıldı/tıklandı/bounce takibi, abonelik onay + hoş geldin akışı, otomatik yanıt
- **Yönetim paneli** — Yazılar, gündem, yorumlar, mesajlar, başvurular, aboneler; tarih aralığı filtresi ve aktivite timeline'ı
- **İletişim** — İletişim formu, sponsor talebi, yazar başvurusu; her birinde otomatik yanıt e-postası

## Geliştirme

### Ön koşullar
- Node.js 20+
- PostgreSQL (Neon önerilir)
- Clerk projesi
- Resend hesabı + doğrulanmış gönderim alan adı
- Google Gemini API anahtarı

### Kurulum

```bash
npm install
cp .env.local.example .env.local   # değerleri doldur
npm run prisma:generate
npm run prisma:migrate              # şemayı DB'ye uygula
npm run prisma:seed                 # örnek veri (opsiyonel)
npm run dev
```

### Ortam değişkenleri

`.env.local.example` dosyasına bak. Zorunlu anahtarlar:

- `DATABASE_URL`, `DIRECT_URL` — PostgreSQL bağlantı dizeleri
- `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `RESEND_API_KEY`, `EMAIL_FROM`, `OWNER_EMAIL`
- `GEMINI_API_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `CRON_SECRET` — cron endpoint'lerini korur

### Yararlı script'ler

```bash
npm run dev               # dev sunucu (Turbopack)
npm run build             # production build
npm run start             # production sunucu
npm run lint              # ESLint
npm run prisma:studio     # görsel DB tarayıcı
npm run prisma:seed-news  # gündem kaynaklarını besle
```

## Proje yapısı

```
src/
├── app/                  # App Router sayfaları
│   ├── admin/            # Yönetim paneli
│   ├── api/              # Route handlers (admin, public, cron)
│   ├── gundem/           # Marka haberleri
│   ├── hakkinda/         # Biyografi
│   ├── konular/          # Konu sayfaları
│   ├── posts/            # Blog yazıları
│   ├── profil/           # Abone profili
│   ├── sponsorluk/       # Sponsor talebi
│   └── yazar/            # Yazar başvurusu
├── components/           # Paylaşılan UI bileşenleri
├── lib/                  # db, email, format, yardımcılar
└── server/               # Sunucu tarafı iş mantığı
prisma/
├── schema.prisma         # Veri modeli
└── seed*.ts              # Tohumlama script'leri
public/
└── email/                # Mail inline attachment'ları (logo, sosyal ikonlar)
```

## Lisans

Tüm hakları Ahmet Furkan Budak'a aittir. Dış dağıtım / çoğaltma için izin alınmalıdır.
