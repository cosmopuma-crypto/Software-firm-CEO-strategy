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

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-24 lg:px-8">
        <Reveal className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-ink">
            <BadgeCheck className="size-4" /> Zertifizierter Fachbetrieb Wärmepumpe
          </span>

          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
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
              href="#waermepumpe"
              className={cn(buttonVariants({ variant: "gold" }), "h-12 px-7 text-base")}
            >
              Wärmepumpe konfigurieren <ArrowRight className="size-4" />
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

        <Reveal delay={140} className="relative">
          <HeroSlideshow />

          {/* Gütesiegel – prominent */}
          <div className="absolute -bottom-6 -left-4 w-60 rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-black/5 sm:-left-8 sm:w-72">
            <Image
              src="/brand/fachbetrieb-waermepumpe.png"
              alt="Gütesiegel Fachbetrieb Wärmepumpe"
              width={856}
              height={234}
              className="h-auto w-full"
            />
          </div>

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
