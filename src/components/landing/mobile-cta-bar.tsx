import Link from "next/link";
import { Phone, ArrowRight, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

/**
 * Sticky CTA-Leiste am unteren Rand für Mobil/Tablet (< xl).
 * Handwerker-Leads kommen überwiegend vom Handy – Anruf, WhatsApp und die
 * Anfrage bleiben so beim Scrollen immer erreichbar. Ab xl übernimmt die Nav.
 *
 * Seiten, die die Leiste einbinden, brauchen unten Platz dafür:
 * `pb-16 xl:pb-0` auf dem Seiten-Wrapper (siehe page.tsx).
 */
interface MobileCtaBarProps {
  /** Ziel-Anker des rechten CTAs. Default: Schnellanfrage auf der Startseite. */
  readonly anchor?: string;
}

export function MobileCtaBar({ anchor = "/#schnellanfrage" }: MobileCtaBarProps) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-brand-deep/95 pb-[env(safe-area-inset-bottom)] backdrop-blur supports-[backdrop-filter]:bg-brand-deep/90 xl:hidden"
      aria-label="Schnellkontakt"
    >
      <div className="mx-auto grid h-14 max-w-6xl grid-cols-3 items-stretch">
        <a
          href={SITE.phoneHref}
          className="flex items-center justify-center gap-1.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          <Phone className="size-4 text-gold-soft" /> Anrufen
        </a>
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 border-x border-white/10 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          <MessageCircle className="size-4 text-[#25d366]" /> WhatsApp
        </a>
        <Link
          href={anchor}
          className="flex items-center justify-center gap-1 whitespace-nowrap bg-gold px-1 text-[13px] font-semibold text-gold-foreground transition-opacity hover:opacity-90 sm:text-sm"
        >
          Anfragen <ArrowRight className="size-4 shrink-0" />
        </Link>
      </div>
    </div>
  );
}
