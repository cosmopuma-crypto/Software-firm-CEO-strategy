import { ShieldCheck, MapPin, Wrench, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const TRUST = [
  { icon: ShieldCheck, label: "Meisterbetrieb" },
  { icon: MapPin, label: "Aus Neumünster" },
  { icon: Wrench, label: "Eigener Kundendienst" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* dezenter Marken-Verlauf im Hintergrund */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-soft via-background to-background"
      />
      <div
        aria-hidden
        className="absolute -right-24 -top-24 -z-10 size-96 rounded-full bg-brand/10 blur-3xl"
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-28">
        <Reveal className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/30 bg-background px-3 py-1 text-xs font-medium text-brand">
            Sanitär · Heizung · Wärmepumpen · Bad
          </span>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Sanitär, Heizung &amp; Wärmepumpen in{" "}
            <span className="text-brand">Neumünster</span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Ihr zuverlässiger Meisterbetrieb für moderne Heiztechnik, neue Bäder
            und schnellen Kundendienst. Planen Sie Ihr Projekt direkt online –
            persönlich, ehrlich, aus der Region.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#konfigurator" className={cn(buttonVariants({ size: "default" }), "h-11 px-6 text-base")}>
              Wärmepumpe konfigurieren <ArrowRight className="size-4" />
            </a>
            <a
              href="#kundendienst"
              className={cn(buttonVariants({ variant: "outline" }), "h-11 px-6 text-base")}
            >
              Kundendienst anfragen
            </a>
          </div>
          <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
            {TRUST.map((t) => (
              <li key={t.label} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <t.icon className="size-4 text-brand" /> {t.label}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="relative">
          <div className="rounded-2xl border bg-card p-6 shadow-xl shadow-brand/5">
            <div className="flex items-center justify-between border-b pb-4">
              <span className="font-semibold">Ihr Weg zur neuen Heizung</span>
              <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand">
                in 2 Minuten
              </span>
            </div>
            <ol className="flex flex-col gap-4 pt-4">
              {[
                "Gebäude & aktuelle Heizung angeben",
                "Ziele wählen (Kosten senken, Förderung …)",
                "Kostenlose Einschätzung & Vor-Ort-Termin erhalten",
              ].map((txt, i) => (
                <li key={txt} className="flex items-start gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-brand-foreground">
                    {i + 1}
                  </span>
                  <span className="text-sm text-muted-foreground">{txt}</span>
                </li>
              ))}
            </ol>
            <a
              href="#konfigurator"
              className={cn(buttonVariants(), "mt-6 w-full")}
            >
              Jetzt starten <ArrowRight className="size-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
