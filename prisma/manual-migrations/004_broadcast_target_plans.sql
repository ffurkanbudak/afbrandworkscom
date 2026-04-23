-- Manuel uygulanacak. Salt ekleme; veri kaybı yok.
-- psql $DATABASE_URL -v ON_ERROR_STOP=1 -f bu-dosya.sql

BEGIN;

-- Broadcast'a paket hedefleme alanı.
-- Boş array = tüm onaylı abonelere gönder.
-- Dolu array = yalnızca listelenen paketlerdeki abonelere gönder.
ALTER TABLE "Broadcast"
  ADD COLUMN "targetPlans" "MembershipPlan"[] NOT NULL DEFAULT ARRAY[]::"MembershipPlan"[];

COMMIT;
