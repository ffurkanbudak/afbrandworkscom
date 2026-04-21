import { TagGroup } from '@prisma/client';

export type TaxonomyEntry = {
  slug: string;
  labelTr: string;
  labelEn?: string;
  group: TagGroup;
};

export const TAXONOMY: TaxonomyEntry[] = [
  { slug: 'e-ticaret-dijital-perakende', labelTr: 'E-Ticaret ve Dijital Perakende', labelEn: 'E-Commerce', group: 'SECTOR' },
  { slug: 'otomotiv-mobilite', labelTr: 'Otomotiv ve Mobilite', labelEn: 'Automobile', group: 'SECTOR' },
  { slug: 'mimarlik-yapi', labelTr: 'Mimarlık ve Yapı', labelEn: 'Architecture', group: 'SECTOR' },
  { slug: 'havacilik-uzay', labelTr: 'Havacılık ve Uzay', labelEn: 'Aviation', group: 'SECTOR' },
  { slug: 'tuketici-urunleri-fmcg', labelTr: 'Tüketici Ürünleri / FMCG', labelEn: 'Consumer Products', group: 'SECTOR' },
  { slug: 'kurumsal-sirketler', labelTr: 'Kurumsal Şirketler', labelEn: 'Corporate', group: 'SECTOR' },
  { slug: 'kultur-sanat', labelTr: 'Kültür ve Sanat', labelEn: 'Culture', group: 'SECTOR' },
  { slug: 'destinasyon-sehir-markalasmasi', labelTr: 'Destinasyon ve Şehir Markalaşması', labelEn: 'Destinations', group: 'SECTOR' },
  { slug: 'egitim', labelTr: 'Eğitim', labelEn: 'Education', group: 'SECTOR' },
  { slug: 'eglence', labelTr: 'Eğlence', labelEn: 'Entertainment', group: 'SECTOR' },
  { slug: 'moda-tekstil', labelTr: 'Moda ve Tekstil', labelEn: 'Fashion', group: 'SECTOR' },
  { slug: 'finans-fintech', labelTr: 'Finans ve Fintech', labelEn: 'Finance', group: 'SECTOR' },
  { slug: 'gida-icecek', labelTr: 'Gıda ve İçecek', labelEn: 'Food / Nutrition', group: 'SECTOR' },
  { slug: 'kamu-yerel-yonetimler', labelTr: 'Kamu ve Yerel Yönetimler', labelEn: 'Government', group: 'SECTOR' },
  { slug: 'saglik-medikal', labelTr: 'Sağlık ve Medikal', labelEn: 'Health', group: 'SECTOR' },
  { slug: 'turizm-konaklama', labelTr: 'Turizm ve Konaklama', labelEn: 'Hospitality / Travel', group: 'SECTOR' },
  { slug: 'yasam-tarzi', labelTr: 'Yaşam Tarzı', labelEn: 'Lifestyle', group: 'SECTOR' },
  { slug: 'lojistik-tedarik-zinciri', labelTr: 'Lojistik ve Tedarik Zinciri', labelEn: 'Logistics', group: 'SECTOR' },
  { slug: 'medya-yayincilik', labelTr: 'Medya ve Yayıncılık', labelEn: 'Media / Publishing', group: 'SECTOR' },
  { slug: 'sivil-toplum-vakiflar', labelTr: 'Sivil Toplum ve Vakıflar', labelEn: 'Non-Profit / Charity', group: 'SECTOR' },
  { slug: 'gayrimenkul-yatirim', labelTr: 'Gayrimenkul ve Yatırım', labelEn: 'Real Estate', group: 'SECTOR' },
  { slug: 'perakende', labelTr: 'Perakende', labelEn: 'Retailers', group: 'SECTOR' },
  { slug: 'yazilim-teknoloji', labelTr: 'Yazılım ve Teknoloji', labelEn: 'Software / Technology', group: 'SECTOR' },
  { slug: 'spor-e-spor', labelTr: 'Spor ve E-Spor', labelEn: 'Sports', group: 'SECTOR' },
  { slug: 'telekomunikasyon', labelTr: 'Telekomünikasyon', labelEn: 'Telecom', group: 'SECTOR' },

  { slug: 'stratejik-disiplinler-yaklasimlar', labelTr: 'Stratejik Disiplinler ve Yaklaşımlar', group: 'DISCIPLINE' },
  { slug: 'noropazarlama-tuketici-psikolojisi', labelTr: 'Nöropazarlama ve Tüketici Psikolojisi', group: 'DISCIPLINE' },
  { slug: 'davranissal-ekonomi', labelTr: 'Davranışsal Ekonomi', group: 'DISCIPLINE' },
  { slug: 'global-marka-konumlandirma', labelTr: 'Global Marka Konumlandırma', group: 'DISCIPLINE' },
  { slug: 'yapay-zeka-pazarlama-otomasyonu', labelTr: 'Yapay Zeka (AI) ve Pazarlama Otomasyonu', group: 'DISCIPLINE' },
  { slug: 'dijital-donusum-stratejileri', labelTr: 'Dijital Dönüşüm Stratejileri', group: 'DISCIPLINE' },
  { slug: 'b2b-marka-stratejisi', labelTr: 'B2B Marka Stratejisi', group: 'DISCIPLINE' },
  { slug: 'kurumsal-kimlik-marka-mimarisi', labelTr: 'Kurumsal Kimlik ve Marka Mimarisi', group: 'DISCIPLINE' },
  { slug: 'oncesi-sonrasi-yeniden-markalasma', labelTr: 'Öncesi ve Sonrası (Before-After / Yeniden Markalaşma)', group: 'DISCIPLINE' },
  { slug: 'ambalaj-tasarimi', labelTr: 'Ambalaj Tasarımı', labelEn: 'Packaging', group: 'DISCIPLINE' },
  { slug: 'logo-monogram-sistemleri', labelTr: 'Logo ve Monogram Sistemleri', group: 'DISCIPLINE' },
  { slug: 'tipografi-sistemleri', labelTr: 'Tipografi Sistemleri (Sans Serif, Serif)', group: 'DISCIPLINE' },
  { slug: 'ikonografi', labelTr: 'İkonografi', labelEn: 'Icon', group: 'DISCIPLINE' },

  { slug: 'sektorel-incelemeler-vaka-calismalari', labelTr: 'Sektörel İncelemeler ve Vaka Çalışmaları', labelEn: 'Reviewed / Noted', group: 'CASE_STUDY' },
];

export const GROUP_LABELS: Record<TagGroup, string> = {
  SECTOR: 'Sektörler',
  DISCIPLINE: 'Stratejik Disiplinler',
  CASE_STUDY: 'Vaka Çalışmaları',
};
