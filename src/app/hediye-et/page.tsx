import type { Metadata } from 'next';
import { GiftRequestForm } from './_components/GiftRequestForm';

export const metadata: Metadata = {
  title: 'Hediye Edin · Afbrandworks',
  description:
    'Ortak veya Mimari üyeliğini sevdiklerinize armağan edin. Ödeme koordinasyonu sonrası tek kullanımlık kod iletilir.',
  alternates: { canonical: '/hediye-et' },
};

export default function HediyeEtPage() {
  return (
    <div className="fade-up mx-auto max-w-[860px] pt-10 md:pt-16">
      <header className="max-w-[620px]">
        <p
          className="text-[11px] font-semibold tracking-[0.14em] uppercase"
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          Hediye Edin
        </p>
        <h1 className="font-display mt-4 text-[36px] leading-[1.05] tracking-tight md:text-[48px]">
          Bir üyelik hediye edin.
        </h1>
        <p
          className="mt-5 max-w-[58ch] text-[16px] leading-[1.65]"
          style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
        >
          Ortak ve Mimari paketlerini sevdiklerinize armağan edebilirsiniz.
          Alıcı, kodu kayıt sırasında ya da üyelik panelinden girerek
          paketine kavuşur. Her kod tek kullanımlık olup üretim tarihinden
          itibaren altı ay geçerlidir.
        </p>
      </header>

      <div className="mt-12">
        <GiftRequestForm />
      </div>
    </div>
  );
}
