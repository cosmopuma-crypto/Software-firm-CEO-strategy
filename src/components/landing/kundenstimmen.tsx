import { Star, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "./section";
import { SITE } from "@/lib/site";

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

// Echte Plattform-Bewertungen (Stand der Inhaber-Screenshots).
const PLATFORMS = [
  { name: "Google", rating: "4,9", count: "23 Rezensionen", href: SITE.google },
  { name: "MyHammer", rating: "5,0", count: "14 Bewertungen", href: SITE.myhammer },
];

// Echte Kundenstimmen von Google & MyHammer (Namen datenschutzfreundlich gekürzt).
const REVIEWS = [
  {
    quote:
      "Sind sehr zufrieden mit der Beratung und der Durchführung unseres Projektes Wärmepumpe. Absprachen und Termine wurden eingehalten, die Arbeiten sauber und ordentlich durchgeführt und die Baustelle immer sauber verlassen.",
    name: "Heiko L.",
    source: "Google",
  },
  {
    quote:
      "Durchführung und Planung waren super, wir waren sehr zufrieden mit dem Ergebnis.",
    name: "Ranika W.",
    source: "Google",
  },
  {
    quote:
      "Schnelle und unkomplizierte Hilfe – absolut empfehlenswert. Bei ST Haustechnik melde ich mich künftig gerne wieder.",
    name: "Nils Jona L.",
    source: "Google",
  },
  {
    quote:
      "Eine äußerst kompetente Firma. Die Arbeiten wurden sehr zügig und sehr korrekt ausgeführt. Die Mitarbeiter sind sehr freundlich.",
    name: "Thomas, Bad Segeberg",
    source: "MyHammer",
  },
  {
    quote: "Sehr höfliches und professionelles Team. Gerne wieder!",
    name: "Igor E.",
    source: "Google",
  },
  {
    quote: "Sehr schnell, freundlich und kompetent.",
    name: "Ritter (Duschkabine)",
    source: "MyHammer",
  },
];

export function Kundenstimmen() {
  return (
    <Section id="kundenstimmen" tone="sand">
      <SectionHeading
        eyebrow="Kundenstimmen"
        title="Das sagen Kunden über uns"
        description="Über 35 Bewertungen mit einem Schnitt von 4,9 von 5 Sternen auf Google und MyHammer – ehrliches Feedback echter Kundinnen und Kunden."
        centered
      />

      <Reveal className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-4">
        {PLATFORMS.map((p) => (
          <a
            key={p.name}
            href={p.href || "#"}
            target={p.href ? "_blank" : undefined}
            rel={p.href ? "noopener noreferrer" : undefined}
            className="flex items-center gap-3 rounded-full border bg-card px-5 py-2.5 shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="font-semibold">{p.name}</span>
            <Stars />
            <span className="text-sm font-semibold text-brand">{p.rating}</span>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              · {p.count}
            </span>
            <ExternalLink className="size-3.5 text-muted-foreground" />
          </a>
        ))}
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <Reveal key={i} delay={(i % 3) * 90}>
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
