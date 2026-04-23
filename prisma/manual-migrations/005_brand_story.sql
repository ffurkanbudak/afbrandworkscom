-- Manuel uygulanacak. Salt ekleme; veri kaybı yok.
-- psql $DATABASE_URL -v ON_ERROR_STOP=1 -f bu-dosya.sql

BEGIN;

CREATE TYPE "BrandOrigin" AS ENUM ('GLOBAL', 'LOCAL');

CREATE TABLE "BrandStory" (
  "id"                     TEXT NOT NULL,
  "slug"                   TEXT NOT NULL,
  "name"                   TEXT NOT NULL,
  "sector"                 TEXT NOT NULL,
  "foundedYear"            INTEGER NOT NULL,
  "headquartersCity"       TEXT,
  "headquartersCountry"    TEXT NOT NULL,
  "origin"                 "BrandOrigin" NOT NULL,

  "logoUrl"                TEXT,
  "coverImageUrl"          TEXT,
  "founderImageUrl"        TEXT,

  "positioning"            TEXT NOT NULL,
  "foundingStory"          TEXT NOT NULL,
  "founderVision"          TEXT NOT NULL,
  "strategicDecisions"     JSONB NOT NULL DEFAULT '[]',
  "crisesAndTurningPoints" TEXT NOT NULL DEFAULT '',
  "currentPosition"        TEXT NOT NULL,
  "editorialNote"          TEXT NOT NULL,

  "status"                 "PostStatus" NOT NULL DEFAULT 'DRAFT',
  "featured"               BOOLEAN NOT NULL DEFAULT FALSE,
  "publishedAt"            TIMESTAMP(3),
  "viewCount"              INTEGER NOT NULL DEFAULT 0,

  "metaTitle"              TEXT,
  "metaDescription"        TEXT,

  "createdAt"              TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"              TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "BrandStory_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "BrandStory_slug_key" UNIQUE ("slug")
);

CREATE INDEX "BrandStory_status_publishedAt_idx" ON "BrandStory"("status", "publishedAt" DESC);
CREATE INDEX "BrandStory_origin_sector_idx" ON "BrandStory"("origin", "sector");
CREATE INDEX "BrandStory_featured_publishedAt_idx" ON "BrandStory"("featured", "publishedAt" DESC);

COMMIT;
