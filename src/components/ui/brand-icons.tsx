type IkonProps = { className?: string };

/** Google Takvim: dört renkli çerçeve, beyaz gövde ve tarih rakamı. */
export function GoogleCalendarLogo({ className }: IkonProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden role="img">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#4285F4" />
      <path d="M22 5v14a3 3 0 0 1-3 3h-2V2h2a3 3 0 0 1 3 3Z" fill="#FBBC04" />
      <path d="M2 17h20v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-2Z" fill="#34A853" />
      <path d="M5 2h14a3 3 0 0 1 3 3v2H2V5a3 3 0 0 1 3-3Z" fill="#EA4335" />
      <rect x="6" y="7" width="12" height="10" fill="#FFFFFF" />
      <text
        x="12"
        y="15.4"
        textAnchor="middle"
        fontSize="8.5"
        fontWeight="700"
        fontFamily="Arial, Helvetica, sans-serif"
        fill="#4285F4"
      >
        31
      </text>
    </svg>
  );
}

/** Gmail: beyaz zarf, kırmızı kapak ve iki yanda mavi/yeşil kanatlar. */
export function GmailLogo({ className }: IkonProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden role="img">
      <path
        d="M3.2 5.4h17.6c1.05 0 1.9.85 1.9 1.9v9.4c0 1.05-.85 1.9-1.9 1.9H3.2a1.9 1.9 0 0 1-1.9-1.9V7.3c0-1.05.85-1.9 1.9-1.9Z"
        fill="#FFFFFF"
      />
      <path d="M1.3 7.3c0-1.05.85-1.9 1.9-1.9h.9l6.9 5.2v7.9H3.2a1.9 1.9 0 0 1-1.9-1.9V7.3Z" fill="#4285F4" />
      <path d="M22.7 7.3c0-1.05-.85-1.9-1.9-1.9h-.9L13 10.6v7.9h7.8c1.05 0 1.9-.85 1.9-1.9V7.3Z" fill="#34A853" />
      <path d="M1.3 7.3c0-1.6 1.83-2.5 3.1-1.53L12 11.4l7.6-5.63c1.27-.97 3.1-.07 3.1 1.53l-1.9 1.4L12 15.2 3.2 8.7 1.3 7.3Z" fill="#EA4335" />
    </svg>
  );
}

/** WhatsApp: tek renk, üzerine uygulanan renkle boyanır. */
export function WhatsAppGlyph({ className }: IkonProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden role="img">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2c-5.523 0-10 4.477-10 10 0 1.765.462 3.489 1.34 5.007L2 22l5.11-1.34A9.96 9.96 0 0 0 12.004 22c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18.2a8.19 8.19 0 0 1-4.174-1.14l-.299-.177-3.03.795.81-2.955-.195-.303A8.2 8.2 0 1 1 12.004 20.2z" />
    </svg>
  );
}
