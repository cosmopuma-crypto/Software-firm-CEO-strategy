import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { FormPage } from "@/components/landing/form-page";
import { BookingEmbed } from "@/components/landing/booking-embed";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kundendienst & Wartung",
  description:
    "Wartungs- und Kundendiensttermin direkt online buchen – Sie wählen selbst einen freien Termin, die Bestätigung kommt sofort per E-Mail.",
};

export default function KundendienstPage() {
  return (
    <FormPage
      eyebrow="Kundendienst & Wartung"
      title="Wartungstermin online buchen"
      description="Wählen Sie selbst einen freien Termin für Kundendienst oder Wartung – die Bestätigung kommt sofort per E-Mail in Ihren Kalender."
    >
      <div className="flex flex-col gap-6">
        {SITE.bookingUrl ? (
          <BookingEmbed
            url={SITE.bookingUrl}
            title="Kundendienst- und Wartungstermin buchen"
            notice={
              <>
                <span className="font-semibold">
                  Kundendienst- und Wartungseinsätze sind kostenpflichtig.
                </span>{" "}
                Berechnet werden Anfahrt und Arbeitszeit nach Aufwand (zzgl.
                Material und gesetzl. USt.). Die genauen Konditionen nennen wir
                Ihnen bei der Terminbestätigung. Bitte sagen Sie einen Termin,
                den Sie nicht wahrnehmen können, mindestens 12 Stunden vorher ab.
                Bei nicht rechtzeitiger Absage berechnen wir zur Kompensation
                pauschal eine Stunde Kundendienst – Details regelt{" "}
                <Link
                  href="/agb#kundendienst-wartung"
                  className="font-medium text-brand underline underline-offset-2"
                >
                  § 5a unserer AGB
                </Link>
                .
              </>
            }
            terms={
              <>
                Ich habe die{" "}
                <Link
                  href="/agb"
                  target="_blank"
                  className="font-medium text-brand underline underline-offset-2"
                >
                  AGB
                </Link>{" "}
                gelesen und akzeptiere sie – insbesondere die Regelungen zu
                Kosten und Terminabsagen (§ 5a).
              </>
            }
          />
        ) : (
          <p className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Die Online-Terminbuchung ist gerade nicht verfügbar. Bitte rufen Sie
            uns an:{" "}
            <a
              href={SITE.phoneHref}
              className="font-medium text-brand underline underline-offset-2"
            >
              {SITE.phone}
            </a>
            .
          </p>
        )}

        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="size-4 shrink-0 text-brand" />
          Akuter Notfall (z. B. Heizungsausfall)? Rufen Sie uns direkt an:{" "}
          <a
            href={SITE.phoneHref}
            className="font-medium text-brand underline underline-offset-2"
          >
            {SITE.phone}
          </a>
          .
        </p>
      </div>
    </FormPage>
  );
}
