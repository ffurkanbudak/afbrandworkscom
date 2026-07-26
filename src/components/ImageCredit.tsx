import { ExternalLink } from 'lucide-react';
import type { ImageCredit as Kaynak } from '@/lib/image-credits';

type Props = { credit: Kaynak };

/**
 * Kapak görselinin sağ alt köşesine oturan kaynak rozeti.
 * Görselin üstünde durduğu için kendi koyu zeminini taşır; böylece açık ve
 * koyu fotoğraflarda da okunur kalır.
 */
export function ImageCreditBadge({ credit }: Props) {
  return (
    <a
      href={credit.url}
      target="_blank"
      rel="noreferrer nofollow"
      title={`${credit.sanatci} · ${credit.kaynak}`}
      className="absolute right-2.5 bottom-2.5 z-10 inline-flex max-w-[calc(100%-1.25rem)] items-center gap-1.5 rounded-[6px] px-2.5 py-1.5 text-[11px] font-medium text-white/90 backdrop-blur-sm transition hover:text-white"
      style={{ background: 'rgba(10,10,10,0.55)' }}
    >
      <span className="truncate">
        Görsel: {credit.sanatci} · {credit.kaynak}
      </span>
      <ExternalLink className="h-[11px] w-[11px] shrink-0 opacity-80" strokeWidth={2} aria-hidden />
    </a>
  );
}
