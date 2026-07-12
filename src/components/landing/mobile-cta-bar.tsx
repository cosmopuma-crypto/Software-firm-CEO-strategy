import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";

/**
 * Sticky CTA-Leiste am unteren Rand für Mobil/Tablet (< xl).
 * Handwerker-Leads kommen überwiegend vom Handy – Anruf und Wärmepumpen-Check
 * bleiben so beim Scrollen immer erreichbar. Ab xl übernimmt die Desktop-Nav.
 *
 * Seiten, die die Leiste einbinden, brauchen unten Platz dafür:
 * `pb-16 xl:pb-0` auf dem Seiten-Wrapper (siehe page.tsx).
 */
export function MobileCtaBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-brand-deep/95 pb-[env(safe-area-inset-bottom)] backdrop-blur supports-[backdrop-filter]:bg-brand-deep/90 xl:hidden"
      aria-label="Schnellkontakt"
    >
      <div className="mx-auto grid h-14 max-w-6xl grid-cols-2 items-stretch">
        <a
          href={SITE.phoneHref}
          className="flex items-center justify-center gap-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          <Phone className="size-4 text-gold-soft" /> Anrufen
        </a>
        <Link
          href="/#waermepumpen-check"
          className="flex items-center justify-center gap-1.5 whitespace-nowrap bg-gold px-2 text-[13px] font-semibold text-gold-foreground transition-opacity hover:opacity-90 sm:gap-2 sm:text-sm"
        >
          Wärmepumpen-Check <ArrowRight className="size-4 shrink-0" />
        </Link>
      </div>
    </div>
  );
}
