import Image from "next/image";
import { ShieldCheck, BadgeCheck, MapPin, Wrench, ArrowRight, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SITE } from "@/lib/site";
import { HeroSlideshow } from "./hero-slideshow";

const TRUST = [
  { icon: BadgeCheck, label: "Fachbetrieb Wärmepumpe" },
  { icon: ShieldCheck, label: "Meisterbetrieb" },
  { icon: Wrench, label: "Eigener Kundendienst" },
  { icon: MapPin, label: "Aus Neumünster" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-background">
      <div aria-hidden className="absolute -right-40 -top-40 -z-10 size-[36rem] rounded-full bg-brand/10 blur-3xl" />
      <div aria-hidden className="absolute -bottom-40 -left-40 -z-10 size-[32rem] rounded-full bg-gold/10 blur-3xl" />

      {/* Gütesiegel oben – prominent, direkt unter dem Logo/Header */}
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 pt-6 sm:px-6 lg:px-8">
        <span className="inline-flex items-center rounded-2xl bg-white p-2.5 shadow-md ring-1 ring-black/5">
          <Image
            src="/brand/fachbetrieb-waermepumpe.png"
            alt="Gütesiegel Fachbetrieb Wärmepumpe"
            width={856}
            height={234}
            className="h-10 w-auto sm:h-12"
          />
        </span>
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-16 lg:px-8">
        <Reveal className="order-2 flex flex-col gap-6 lg:order-1">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-ink">
            <BadgeCheck className="size-4" /> Zertifizierter Fachbetrieb Wärmepumpe
          </span>

          <h1 className="text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Heizkosten runter, Wohnkomfort rauf – mit Ihrer neuen{" "}
            <span className="relative whitespace-nowrap text-brand">
              Wärmepumpe
              <span className="absolute inset-x-0 -bottom-1 h-1.5 rounded-full bg-gold/70" />
            </span>
            .
          </h1>

          <p className="max-w-xl text-lg text-muted-foreground">
            Ihr Meisterbetrieb für Sanitär, Heizung und Bad in Neumünster – und
            zertifizierter Fachbetrieb Wärmepumpe. Wir planen, liefern und montieren
            persönlich und termintreu. Alles aus einer Hand, ohne Wenn und Aber.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#waermepumpen-check"
              className={cn(buttonVariants({ variant: "gold" }), "h-12 px-7 text-base")}
            >
              Wärmepumpen-Check starten <ArrowRight className="size-4" />
            </a>
            <a
              href={SITE.phoneHref}
              className={cn(buttonVariants({ variant: "outline" }), "h-12 px-7 text-base")}
            >
              <Phone className="size-4" /> {SITE.phone}
            </a>
          </div>

          <ul className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:flex sm:flex-wrap">
            {TRUST.map((t) => (
              <li key={t.label} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                <t.icon className="size-4 shrink-0 text-gold" /> {t.label}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={140} className="relative order-1 lg:order-2">
          <HeroSlideshow />

          {/* schwebende Stat-Karte */}
          <div className="absolute -right-3 top-6 rounded-2xl bg-white px-5 py-3 shadow-xl ring-1 ring-black/5 sm:-right-6">
            <p className="text-3xl font-bold text-brand">100%</p>
            <p className="text-xs text-muted-foreground">aus einer Hand</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
