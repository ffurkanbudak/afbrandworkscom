import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim · Ahmet Furkan Budak',
  description:
    'Ahmet Furkan Budak ile iletişim. Marka danışmanlığı, işbirliği, medya talepleri ve sorularınız için iletişim formu ve sosyal medya kanalları.',
  keywords: ['iletişim', 'ahmet furkan budak iletişim', 'marka danışmanı iletişim', 'marka danışmanlığı başvuru'],
  alternates: { canonical: '/iletisim' },
  openGraph: {
    type: 'website',
    url: '/iletisim',
    title: 'İletişim · Ahmet Furkan Budak',
    description: 'Marka danışmanlığı, işbirliği ve medya talepleri.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
