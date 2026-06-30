import { Star, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "./section";
import { SITE } from "@/lib/site";
import { TrustindexWidget } from "./trustindex";

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

// Echte Plattform-Bewertungen (Stand der Inhaber-Angaben).
const PLATFORMS = [
  { name: "Google", rating: "4,9", count: "23 Rezensionen", href: SITE.google },
  { name: "MyHammer", rating: "5,0", count: "14 Bewertungen", href: SITE.myhammer },
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

      {/* Live-Bewertungen (Google + MyHammer) via Trustindex */}
      <div className="mt-10">
        <TrustindexWidget />
      </div>
    </Section>
  );
}
