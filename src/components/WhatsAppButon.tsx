import { WhatsAppGlyph } from '@/components/ui/brand-icons';

const WHATSAPP_URL =
  'https://wa.me/905374349566?text=' +
  encodeURIComponent('Merhaba Ahmet Bey, markanız hakkında konuşmak istiyorum.');

/** Her sayfanın sağ alt köşesinde sabit duran WhatsApp düğmesi. */
export function WhatsAppButon() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp ile yazın: +90 537 434 95 66"
      title="WhatsApp ile yazın"
      className="fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition hover:scale-105 hover:opacity-95"
      style={{
        background: '#25D366',
        marginRight: 'env(safe-area-inset-right)',
        marginBottom: 'env(safe-area-inset-bottom)',
        boxShadow: '0 10px 30px -8px rgba(0,0,0,0.45)',
      }}
    >
      <WhatsAppGlyph className="h-7 w-7" />
    </a>
  );
}
