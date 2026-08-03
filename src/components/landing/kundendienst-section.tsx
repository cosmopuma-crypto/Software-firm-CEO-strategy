import Link from "next/link";
import { CalendarCheck, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";
import { Section, SectionHeading } from "./section";
import { KundendienstForm } from "@/components/forms/kundendienst-form";

export function KundendienstSection() {
  return (
    <Section id="kundendienst" tone="sand">
      <SectionHeading
        eyebrow="Kundendienst"
        title="Wartungstermin buchen oder Störung melden"
        description="Für Wartung und Service buchen Sie direkt online einen freien Termin. Bei einer akuten Störung schildern Sie uns kurz das Problem – unser Serviceteam meldet sich zur Terminabstimmung."
        centered
      />

      <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-6">
        {SITE.bookingUrl && (
          <>
            <Reveal>
              <div className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-lg shadow-brand/5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <CalendarCheck className="size-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">
                      Wartungstermin online buchen
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Freien Termin selbst auswählen – Bestätigung sofort per
                      E-Mail. Wartungs- und Serviceeinsätze sind kostenpflichtig.
                    </p>
                  </div>
                </div>
                <Link
                  href="/kundendienst"
                  className={cn(
                    buttonVariants({ variant: "gold" }),
                    "h-11 shrink-0 px-5"
                  )}
                >
                  Termin buchen
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>

            <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              oder
              <span className="h-px flex-1 bg-border" />
            </div>
          </>
        )}

        <Reveal>
          <Card className="p-6 shadow-lg shadow-brand/5 sm:p-8">
            <div className="mb-6 flex flex-col gap-1">
              <h3 className="text-lg font-semibold">Akute Störung melden</h3>
              <p className="text-sm text-muted-foreground">
                Heizung kalt, Wasser läuft nicht, Fehlermeldung? Schildern Sie
                uns kurz das Problem.
              </p>
            </div>
            <KundendienstForm />
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
