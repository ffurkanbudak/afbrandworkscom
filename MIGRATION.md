# Vite → Next.js 16 Geçiş Notları

Bu repo Vite+React 19 olarak başlamıştı; `src/app/` altındaki yapı Next.js 16 App Router için hazırlandı.
Geçişi tamamlamak için:

## 1) Bağımlılıklar

```bash
npm uninstall vite @vitejs/plugin-react
npm install next@latest react@latest react-dom@latest \
  @prisma/client prisma \
  @clerk/nextjs \
  resend \
  lucide-react \
  @tiptap/react @tiptap/starter-kit @tiptap/extension-placeholder \
  zod
npm install -D tailwindcss @tailwindcss/postcss postcss @types/react @types/react-dom @types/node tsx
```

## 2) Scripts (package.json)

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "prisma:migrate": "prisma migrate dev",
    "prisma:seed": "tsx prisma/seed.ts",
    "prisma:studio": "prisma studio"
  }
}
```

## 3) Ortam Değişkenleri (.env.local)

```
DATABASE_URL="postgres://..."
DIRECT_URL="postgres://..."
RESEND_API_KEY="re_..."
EMAIL_FROM="Ahmet Furkan Budak <yazi@ahmetfurkanbudak.com>"
OWNER_EMAIL="merhaba@ahmetfurkanbudak.com"
NEXT_PUBLIC_SITE_URL="https://ahmetfurkanbudak.com"
CLERK_SECRET_KEY="sk_..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
```

## 4) Temizlik

- `index.html`, `index.tsx`, `vite.config.ts` kaldırılabilir.
- Mevcut `App.tsx` + `components/Hero.tsx` + `components/Biography.tsx` kaldırılabilir ya da `/portfolio` rotasına taşınabilir.

## 5) Altyapı (Vercel Marketplace)

- **Neon** — Postgres
- **Resend** — Transactional + Broadcast
- **Clerk** — Admin auth
- **Vercel Blob** — Cover görselleri
- (Opsiyonel) **Vercel AI Gateway** — Otomatik meta / ilgili yazı önerisi

## 6) Kurulum Sırası

```bash
npx prisma migrate dev --name init
npx tsx prisma/seed.ts   # taksonomiyi ekler
npm run dev
```

## 7) Admin Onboarding

İlk yönetici için Clerk'te hesap oluşturduktan sonra:

```sql
INSERT INTO "Admin" (id, "clerkId", email, name, role)
VALUES ('ownerid', 'user_xxx', 'merhaba@ahmetfurkanbudak.com', 'Ahmet', 'OWNER');
```

## 8) Otomatik Yayın Akışı

`POST /api/admin/posts` ile bir yazı `status: 'PUBLISHED'` olarak oluşturulduğunda
`src/server/broadcast.ts::triggerPostBroadcast` çağrılır:

1. Onaylı aboneler çekilir
2. Yazıyla etiket kesişimi olan 3 yazı `related` olarak seçilir
3. Resend `batch.send` ile 80'lik gruplar halinde gönderim
4. `BroadcastDelivery` kayıtları oluşturulur
5. Bültende alt kısma ilgili yazılar eklenir

Yüksek hacim için alternatif: **Vercel Workflow DevKit** — kalıcı, yeniden denemeli,
adım adım (render → batch → track) akış.
