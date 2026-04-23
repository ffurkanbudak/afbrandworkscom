-- Manuel uygulanacak. Salt ekleme; veri kaybı yok.
-- Neon SQL editoründe ya da: psql $DATABASE_URL -f bu-dosya.sql

BEGIN;

-- 1) Yeni enum: ticari üyelik paketi (aktivite kademesinden ayrı)
CREATE TYPE "MembershipPlan" AS ENUM ('GOZLEMCI', 'ORTAK', 'MIMARI');

-- 2) Subscriber tablosuna plan kolonu (varsayılan: GOZLEMCI)
ALTER TABLE "Subscriber"
  ADD COLUMN "plan" "MembershipPlan" NOT NULL DEFAULT 'GOZLEMCI';

CREATE INDEX "Subscriber_plan_idx" ON "Subscriber"("plan");

-- 3) Ön kayıt tablosu: Ortak/Mimari açılınca bildirim için e-posta toplama
CREATE TABLE "WaitlistEntry" (
  "id"        TEXT NOT NULL,
  "email"     TEXT NOT NULL,
  "plan"      "MembershipPlan" NOT NULL,
  "source"    TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "WaitlistEntry_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "WaitlistEntry_email_plan_key" ON "WaitlistEntry"("email", "plan");
CREATE INDEX "WaitlistEntry_plan_idx" ON "WaitlistEntry"("plan");
CREATE INDEX "WaitlistEntry_createdAt_idx" ON "WaitlistEntry"("createdAt");

COMMIT;
