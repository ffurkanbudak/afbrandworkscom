-- Manuel uygulanacak. Salt ekleme; veri kaybı yok.
-- psql $DATABASE_URL -v ON_ERROR_STOP=1 -f bu-dosya.sql

BEGIN;

-- === Blog yorumlarına thread desteği ===
ALTER TABLE "PostComment" ADD COLUMN "parentId" TEXT;
ALTER TABLE "PostComment"
  ADD CONSTRAINT "PostComment_parentId_fkey"
  FOREIGN KEY ("parentId") REFERENCES "PostComment"("id") ON DELETE CASCADE;
CREATE INDEX "PostComment_parentId_idx" ON "PostComment"("parentId");

-- === Forum ===
CREATE TYPE "ForumContentStatus" AS ENUM ('PENDING', 'PUBLISHED', 'HIDDEN');

CREATE TABLE "ForumTag" (
  "id"        TEXT    NOT NULL,
  "slug"      TEXT    NOT NULL,
  "label"     TEXT    NOT NULL,
  "order"     INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ForumTag_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "ForumTag_slug_key" UNIQUE ("slug")
);

CREATE TABLE "ForumPost" (
  "id"         TEXT    NOT NULL,
  "authorId"   TEXT    NOT NULL,
  "tagId"      TEXT    NOT NULL,
  "title"      TEXT    NOT NULL,
  "body"       TEXT    NOT NULL,
  "publishAt"  TIMESTAMP(3) NOT NULL,
  "status"     "ForumContentStatus" NOT NULL DEFAULT 'PENDING',
  "replyCount" INTEGER NOT NULL DEFAULT 0,
  "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ForumPost_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "ForumPost_authorId_fkey"
    FOREIGN KEY ("authorId") REFERENCES "Subscriber"("id") ON DELETE CASCADE,
  CONSTRAINT "ForumPost_tagId_fkey"
    FOREIGN KEY ("tagId") REFERENCES "ForumTag"("id") ON DELETE RESTRICT
);

CREATE INDEX "ForumPost_tagId_publishAt_idx" ON "ForumPost"("tagId", "publishAt" DESC);
CREATE INDEX "ForumPost_authorId_idx" ON "ForumPost"("authorId");
CREATE INDEX "ForumPost_status_publishAt_idx" ON "ForumPost"("status", "publishAt" DESC);

CREATE TABLE "ForumComment" (
  "id"        TEXT NOT NULL,
  "postId"    TEXT NOT NULL,
  "authorId"  TEXT NOT NULL,
  "parentId"  TEXT,
  "body"      TEXT NOT NULL,
  "publishAt" TIMESTAMP(3) NOT NULL,
  "status"    "ForumContentStatus" NOT NULL DEFAULT 'PENDING',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ForumComment_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "ForumComment_postId_fkey"
    FOREIGN KEY ("postId") REFERENCES "ForumPost"("id") ON DELETE CASCADE,
  CONSTRAINT "ForumComment_authorId_fkey"
    FOREIGN KEY ("authorId") REFERENCES "Subscriber"("id") ON DELETE CASCADE,
  CONSTRAINT "ForumComment_parentId_fkey"
    FOREIGN KEY ("parentId") REFERENCES "ForumComment"("id") ON DELETE CASCADE
);

CREATE INDEX "ForumComment_postId_publishAt_idx" ON "ForumComment"("postId", "publishAt" DESC);
CREATE INDEX "ForumComment_parentId_idx" ON "ForumComment"("parentId");

CREATE TABLE "ForumFlag" (
  "id"        TEXT NOT NULL,
  "postId"    TEXT,
  "commentId" TEXT,
  "reason"    TEXT NOT NULL,
  "resolved"  BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ForumFlag_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "ForumFlag_postId_fkey"
    FOREIGN KEY ("postId") REFERENCES "ForumPost"("id") ON DELETE CASCADE,
  CONSTRAINT "ForumFlag_commentId_fkey"
    FOREIGN KEY ("commentId") REFERENCES "ForumComment"("id") ON DELETE CASCADE
);

CREATE INDEX "ForumFlag_resolved_createdAt_idx" ON "ForumFlag"("resolved", "createdAt" DESC);

-- Sabit etiket havuzu (kullanıcı serbest etiket yazamaz)
INSERT INTO "ForumTag" ("id", "slug", "label", "order") VALUES
  ('ftag_markalasma',       'markalasma',          'Markalaşma',         1),
  ('ftag_pazarlama',        'pazarlama',           'Pazarlama',          2),
  ('ftag_girisimcilik',     'girisimcilik',        'Girişimcilik',       3),
  ('ftag_startup',          'startup',             'Startup',            4),
  ('ftag_satis',            'satis',               'Satış',              5),
  ('ftag_iletisim',         'iletisim',            'İletişim',           6),
  ('ftag_dijital_donusum',  'dijital-donusum',     'Dijital Dönüşüm',    7),
  ('ftag_kadin_girisimci',  'kadin-girisimciligi', 'Kadın Girişimciliği',8),
  ('ftag_finans',           'finans',              'Finans',             9);

-- === Hediye kodları ===
CREATE TYPE "GiftCodeStatus" AS ENUM ('ACTIVE', 'REDEEMED', 'EXPIRED', 'REVOKED');

CREATE TABLE "GiftCode" (
  "id"             TEXT NOT NULL,
  "code"           TEXT NOT NULL,
  "plan"           "MembershipPlan" NOT NULL,
  "status"         "GiftCodeStatus" NOT NULL DEFAULT 'ACTIVE',
  "senderEmail"    TEXT,
  "senderName"     TEXT,
  "recipientEmail" TEXT,
  "note"           TEXT,
  "redeemedById"   TEXT,
  "redeemedAt"     TIMESTAMP(3),
  "expiresAt"      TIMESTAMP(3) NOT NULL,
  "createdAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GiftCode_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "GiftCode_code_key" UNIQUE ("code"),
  CONSTRAINT "GiftCode_redeemedById_fkey"
    FOREIGN KEY ("redeemedById") REFERENCES "Subscriber"("id") ON DELETE SET NULL
);

CREATE INDEX "GiftCode_status_idx" ON "GiftCode"("status");
CREATE INDEX "GiftCode_expiresAt_idx" ON "GiftCode"("expiresAt");
CREATE INDEX "GiftCode_senderEmail_idx" ON "GiftCode"("senderEmail");

-- === Sponsorlar ===
CREATE TYPE "SponsorTier" AS ENUM ('DAILY', 'MONTHLY', 'QUARTERLY');

CREATE TABLE "Sponsor" (
  "id"           TEXT NOT NULL,
  "name"         TEXT NOT NULL,
  "logoUrl"      TEXT,
  "bio"          TEXT,
  "websiteUrl"   TEXT,
  "linkedinUrl"  TEXT,
  "instagramUrl" TEXT,
  "xUrl"         TEXT,
  "tier"         "SponsorTier" NOT NULL DEFAULT 'MONTHLY',
  "startDate"    TIMESTAMP(3) NOT NULL,
  "endDate"      TIMESTAMP(3) NOT NULL,
  "active"       BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Sponsor_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Sponsor_active_idx" ON "Sponsor"("active");
CREATE INDEX "Sponsor_endDate_idx" ON "Sponsor"("endDate");

COMMIT;
