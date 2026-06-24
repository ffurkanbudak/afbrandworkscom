# afbrandworks.com

Ahmet Furkan Budak'ın kişisel marka platformu. Strateji, markalaşma ve iletişim üzerine yazılar; küresel marka haberleri akışı (Gündem); bülten aboneliği ve uçtan uca editör paneli.

## Teknoloji

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Dil:** TypeScript
- **UI:** Tailwind CSS 4, Lucide Icons, Tiptap (editör), **Inter** fontu
- **Veritabanı:** PostgreSQL + Prisma ORM
- **Admin kimlik:** Kendi e-posta + şifre oturumu (imzalı httpOnly çerez) — harici sağlayıcı yok
- **E-posta:** Resend (opsiyonel; bülten/mesaj şablonları)
- **Yapay zeka:** Google Gemini (opsiyonel; gündem haberlerinin TR çeviri/özet üretimi)
- **Görseller:** Cloudinary (opsiyonel; admin görsel yükleme)
- **Hosting:** Vercel

## Özellikler

- **Yazılar** — Tiptap tabanlı blog; kapak görselleri, konular, öneriler, paylaşım butonları (tam içerik, paywall yok)
- **Gündem** — Çoklu kaynaktan (RSS) marka haberleri; haberin kendi görseli (`og:image` yedeğiyle), Gemini ile opsiyonel TR çeviri + editör notu, admin onay akışı
- **Bülten aboneliği** — Ziyaretçi e-postasını bırakır; kayıt admin panelinde toplanır ve **Excel/CSV** olarak dışa aktarılır (manuel liste yönetimi). Çift onaylı akış yok.
- **Yönetim paneli** (`/admin`) — Yazılar, gündem, yorumlar, mesajlar, sponsorluk, aboneler; e-posta + şifre ile korumalı giriş
- **İletişim & sponsorluk** — İletişim ve sponsor talep formları

> Not: Bu sürümde forum, üyelik/paket, hediye ve son kullanıcı hesap paneli **kaldırılmıştır**. Site içeriği herkese açıktır; yalnızca yönetici girişi vardır.

## Geliştirme

### Ön koşullar
- Node.js 20+
- PostgreSQL
- (Opsiyonel) Resend, Google Gemini, Cloudinary hesapları

### Kurulum

```bash
npm install
cp .env.local.example .env.local   # değerleri doldur
npm run prisma:generate
npm run prisma:migrate              # şemayı DB'ye uygula
npm run prisma:seed                 # taksonomi (etiketler)
npm run dev
```

İçerik tohumlama (opsiyonel):

```bash
npx tsx prisma/seed-post.ts          # örnek yazılar (seed-post-2..5 de var)
npx tsx prisma/seed-news-sources.ts  # gündem kaynakları
npx tsx prisma/fetch-news-once.ts    # haberleri çek
npx tsx prisma/backfill-news-images.ts  # eksik haber görsellerini og:image ile doldur
```

### Ortam değişkenleri

`.env.local.example` dosyasına bak.

Zorunlu:
- `DATABASE_URL`, `DIRECT_URL` — PostgreSQL bağlantı dizeleri
- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_EMAIL`, `ADMIN_PASSWORD` — yönetici girişi
- `ADMIN_SESSION_SECRET` — oturum çerezini imzalar (uzun, rastgele bir değer)

Opsiyonel:
- `RESEND_API_KEY`, `EMAIL_FROM`, `OWNER_EMAIL` — e-posta gönderimi
- `GEMINI_API_KEY` — gündem çeviri/özet
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — görsel yükleme
- `CRON_SECRET` — cron endpoint'lerini korur
- `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, `YANDEX_SITE_VERIFICATION`

### Yönetici girişi

1. `/admin` adresine git → otomatik `/admin-login`'e yönlenir.
2. `ADMIN_EMAIL` + `ADMIN_PASSWORD` ile giriş yap.
3. İlk admin kaydı veritabanında `Admin` tablosunda tutulur (`clerkId = "afb-admin"`).

### Yararlı script'ler

```bash
npm run dev               # dev sunucu (Turbopack)
npm run build             # production build
npm run start             # production sunucu
npm run lint              # ESLint
npm run prisma:studio     # görsel DB tarayıcı
node scripts/gen-favicon.mjs   # logodan favicon/PNG/ICO üret
```

## Proje yapısı

```
src/
├── app/                  # App Router sayfaları
│   ├── admin/            # Yönetim paneli (e-posta+şifre korumalı)
│   ├── admin-login/      # Yönetici giriş ekranı
│   ├── api/              # Route handlers (admin, public, cron)
│   ├── gundem/           # Marka haberleri
│   ├── hakkinda/         # Kimdir (akordeon)
│   ├── konular/          # Konu sayfaları
│   ├── posts/            # Blog yazıları
│   └── sponsorluk/       # Sponsor talebi
├── components/           # Paylaşılan UI bileşenleri
├── lib/                  # db, admin-auth, email, format, haber RSS, yardımcılar
└── server/               # Sunucu tarafı iş mantığı
prisma/
├── schema.prisma         # Veri modeli
└── seed*.ts              # Tohumlama script'leri
public/
├── logo-black.svg / logo-white.svg   # Temaya duyarlı logo
├── favicon.svg           # Adaptif favicon (afb monogram)
└── email/                # Mail inline attachment'ları
```

## Lisans

Tüm hakları Ahmet Furkan Budak'a aittir. Dış dağıtım / çoğaltma için izin alınmalıdır.
