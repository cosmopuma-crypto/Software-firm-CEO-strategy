import type { Metadata } from "next";
import Link from "next/link";
import { FormPage } from "@/components/landing/form-page";
import { KundendienstForm } from "@/components/forms/kundendienst-form";
import { BookingEmbed } from "@/components/landing/booking-embed";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kundendienst & Wartung",
  description:
    "Wartungstermin direkt online buchen oder eine Störung melden – schnelle Hilfe vom Serviceteam.",
};

export default function KundendienstPage() {
  return (
    <FormPage
      eyebrow="Kundendienst & Wartung"
      title="Termin buchen oder Störung melden"
      description="Für Wartung und Service buchen Sie unten direkt einen freien Termin. Bei einer akuten Störung schildern Sie uns kurz das Problem – unser Serviceteam meldet sich zur Terminabstimmung."
    >
      <div className="flex flex-col gap-10">
        {SITE.bookingUrl && (
          <>
            <section className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold tracking-tight">
                  Wartungstermin online buchen
                </h2>
                <p className="text-sm text-muted-foreground">
                  Freien Termin auswählen – die Bestätigung kommt sofort per
                  E-Mail in Ihren Kalender.
                </p>
              </div>
              <BookingEmbed
                url={SITE.bookingUrl}
                title="Kundendienst- und Wartungstermin buchen"
                notice={
                  <>
                    <span className="font-semibold">
                      Kundendienst- und Wartungseinsätze sind kostenpflichtig.
                    </span>{" "}
                    Berechnet werden Anfahrt und Arbeitszeit nach Aufwand (zzgl.
                    Material und gesetzl. USt.). Die genauen Konditionen nennen
                    wir Ihnen bei der Terminbestätigung. Bitte sagen Sie einen
                    Termin, den Sie nicht wahrnehmen können, rechtzeitig ab –
                    Details regelt{" "}
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
            </section>

            <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              oder
              <span className="h-px flex-1 bg-border" />
            </div>
          </>
        )}

        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold tracking-tight">
              Akute Störung melden
            </h2>
            <p className="text-sm text-muted-foreground">
              Heizung kalt, Wasser läuft nicht, Fehlermeldung? Schildern Sie uns
              kurz das Problem.
            </p>
          </div>
          <KundendienstForm />
        </section>
      </div>
    </FormPage>
  );
}
