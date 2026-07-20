import Link from "next/link";
import { IS_DEMO } from "@/lib/site";

/**
 * Aktueller Förder-Hinweis (KfW-Regeländerung 2026) mit CTA auf die
 * Kampagnen-Landingpage. Nur beim echten Betrieb – die Demo-Instanz
 * blendet ihn aus.
 */
export function FoerderNewsBanner() {
  if (IS_DEMO) return null;
  return (
    <div className="bg-amber-100 px-4 py-2 text-center text-sm font-medium text-amber-800">
      Neue KfW-Förderregeln seit 21. Juli 2026: Die Zuschüsse sinken
      schrittweise.{" "}
      <Link
        href="/waermepumpe-foerderung-2026#foerder-check"
        className="font-bold underline underline-offset-2"
      >
        Jetzt Anspruch prüfen →
      </Link>
    </div>
  );
}
