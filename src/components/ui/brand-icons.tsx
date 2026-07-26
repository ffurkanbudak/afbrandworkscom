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

/** Gmail: dört renkli zarf. Zarfın iç yüzeyi saydam, açık zeminde kullanılır. */
export function GmailLogo({ className }: IkonProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden role="img">
      <path fill="#4285F4" d="M1.636 21h3.819V11.73L0 7.909v11.455C0 20.269.732 21 1.636 21Z" />
      <path fill="#34A853" d="M18.545 21h3.819A1.636 1.636 0 0 0 24 19.364V7.909l-5.455 3.821V21Z" />
      <path fill="#FBBC04" d="M18.545 4.636v7.094L24 7.909V5.455c0-2.024-2.31-3.178-3.927-1.964l-1.528 1.145Z" />
      <path fill="#EA4335" d="M5.455 11.73V4.636L12 9.545l6.545-4.909v7.094L12 16.64l-6.545-4.91Z" />
      <path fill="#C5221F" d="M0 5.455v2.454l5.455 3.821V4.636L3.927 3.491C2.309 2.277 0 3.431 0 5.455Z" />
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
