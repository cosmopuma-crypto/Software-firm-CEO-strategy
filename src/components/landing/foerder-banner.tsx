import { ArrowRight, BadgeEuro } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function FoerderBanner() {
  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-[#2456c4] p-8 text-white shadow-xl sm:p-10">
            <div
              aria-hidden
              className="absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-2xl"
            />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-3">
                <span className="inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gold-soft">
                  <BadgeEuro className="size-4" /> Jetzt Förderung sichern
                </span>
                <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  Bis zu <span className="text-gold-soft">21.000&nbsp;€ Förderung</span> für Ihre Wärmepumpe
                </h2>
                <p className="max-w-xl text-white/80">
                  Über die Bundesförderung (BEG) sind bis zu 70 % Zuschuss möglich.
                  Wir übernehmen den kompletten Förderservice – von der Antragstellung
                  bis zur Auszahlung.
                </p>
              </div>
              <a
                href="#waermepumpe"
                className={cn(
                  buttonVariants(),
                  "h-12 shrink-0 bg-white px-7 text-base text-brand hover:bg-white/90",
                )}
              >
                Wärmepumpe konfigurieren <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
