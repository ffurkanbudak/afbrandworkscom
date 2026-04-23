-- Manuel uygulanacak. Salt ekleme; veri kaybı yok.
-- psql $DATABASE_URL -v ON_ERROR_STOP=1 -f bu-dosya.sql

BEGIN;

-- === Hediye satış istekleri (ödeme akışı ayrı; burası intake) ===
CREATE TYPE "GiftRequestStatus" AS ENUM ('PENDING', 'AWAITING_PAYMENT', 'COMPLETED', 'CANCELLED');

CREATE TABLE "GiftRequest" (
  "id"             TEXT NOT NULL,
  "senderName"     TEXT NOT NULL,
  "senderEmail"    TEXT NOT NULL,
  "senderPhone"    TEXT,
  "recipientName"  TEXT,
  "recipientEmail" TEXT,
  "plan"           "MembershipPlan" NOT NULL,
  "note"           TEXT,
  "status"         "GiftRequestStatus" NOT NULL DEFAULT 'PENDING',
  "adminNote"      TEXT,
  "issuedCode"     TEXT,
  "createdAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GiftRequest_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "GiftRequest_status_createdAt_idx" ON "GiftRequest"("status", "createdAt" DESC);
CREATE INDEX "GiftRequest_senderEmail_idx" ON "GiftRequest"("senderEmail");

-- === ForumFlag: kullanıcı raporlarında raporlayan kaydı ===
ALTER TABLE "ForumFlag" ADD COLUMN "reporterId" TEXT;
ALTER TABLE "ForumFlag" ADD COLUMN "source" TEXT NOT NULL DEFAULT 'AUTO';
ALTER TABLE "ForumFlag"
  ADD CONSTRAINT "ForumFlag_reporterId_fkey"
  FOREIGN KEY ("reporterId") REFERENCES "Subscriber"("id") ON DELETE SET NULL;
CREATE INDEX "ForumFlag_reporterId_idx" ON "ForumFlag"("reporterId");
CREATE INDEX "ForumFlag_source_resolved_idx" ON "ForumFlag"("source", "resolved");

COMMIT;
