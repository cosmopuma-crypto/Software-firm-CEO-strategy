import Link from "next/link";
import { CalendarCheck, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { Section, SectionHeading } from "./section";

export function KundendienstSection() {
  return (
    <Section id="kundendienst" tone="sand">
      <SectionHeading
        eyebrow="Kundendienst & Wartung"
        title="Wartungstermin online buchen"
        description="Buchen Sie Ihren Kundendienst- oder Wartungstermin selbst: einfach einen freien Termin auswählen – die Bestätigung kommt sofort per E-Mail."
        centered
      />

      <div className="mx-auto mt-10 max-w-3xl">
        <Reveal>
          <div className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-lg shadow-brand/5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <CalendarCheck className="size-6" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">
                  Termin selbst online buchen
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Freien Termin auswählen – Bestätigung sofort per E-Mail.
                  Wartungs- und Serviceeinsätze sind kostenpflichtig.
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
      </div>
    </Section>
  );
}
