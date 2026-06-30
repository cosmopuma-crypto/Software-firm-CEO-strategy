import { Star, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "./section";

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} von 5 Sternen`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < count ? "fill-gold text-gold" : "fill-muted text-muted",
          )}
        />
      ))}
    </div>
  );
}

// Plattform-Bewertungen. TODO: echte Werte + Profil-Links vom Inhaber eintragen.
const PLATFORMS = [
  { name: "Google", rating: "5,0", count: "Bewertungen", href: "#" },
  { name: "MyHammer", rating: "Top", count: "Bewertungen", href: "#" },
];

// TODO: echte Kundenstimmen von Google / MyHammer eintragen.
const REVIEWS = [
  {
    quote:
      "Von der Beratung bis zur fertigen Wärmepumpe alles aus einer Hand – termintreu, sauber und fair. Sehr zu empfehlen!",
    name: "Kunde aus Neumünster",
    source: "Google",
  },
  {
    quote:
      "Neues Bad komplett umgesetzt. Top Handwerk, freundliches Team und immer ein verlässlicher Ansprechpartner.",
    name: "Kundin aus der Region",
    source: "MyHammer",
  },
  {
    quote:
      "Schnelle Hilfe beim Heizungsausfall – am selben Tag da. So stellt man sich Kundendienst vor.",
    name: "Stammkunde",
    source: "Google",
  },
];

export function Kundenstimmen() {
  return (
    <Section id="kundenstimmen" tone="sand">
      <SectionHeading
        eyebrow="Kundenstimmen"
        title="Das sagen Kunden über uns"
        description="Vertrauen entsteht durch Erfahrung. Lesen Sie, wie unsere Kundinnen und Kunden ihre Projekte mit uns erlebt haben."
        centered
      />

      <Reveal className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-4">
        {PLATFORMS.map((p) => (
          <a
            key={p.name}
            href={p.href}
            className="flex items-center gap-3 rounded-full border bg-card px-5 py-2.5 shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="font-semibold">{p.name}</span>
            <Stars />
            <span className="text-sm font-semibold text-brand">{p.rating}</span>
            <ExternalLink className="size-3.5 text-muted-foreground" />
          </a>
        ))}
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <Reveal key={i} delay={i * 90}>
            <figure className="flex h-full flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm">
              <Stars />
              <blockquote className="flex-1 text-sm leading-relaxed text-foreground/90">
                „{r.quote}"
              </blockquote>
              <figcaption className="flex items-center justify-between border-t pt-3 text-sm">
                <span className="font-medium">{r.name}</span>
                <span className="text-xs text-muted-foreground">via {r.source}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
