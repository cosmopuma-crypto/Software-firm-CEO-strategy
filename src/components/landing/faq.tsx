import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "./section";

// Häufige Fragen – Schwerpunkt Wärmepumpe (Hauptziel), plus allgemein.
const FAQS = [
  {
    q: "Lohnt sich eine Wärmepumpe in meinem Haus?",
    a: "In den allermeisten Fällen ja – auch im Bestand. Entscheidend sind Heizlast und Heizflächen. Als zertifizierter Fachbetrieb mit Sachkunde nach VDI 4645 prüfen wir das kostenlos bei Ihnen vor Ort und legen die Anlage korrekt aus.",
  },
  {
    q: "Welche Förderung gibt es für die Wärmepumpe?",
    a: "Über die Bundesförderung für effiziente Gebäude (BEG) sind aktuell bis zu 70 % Zuschuss möglich (Grundförderung plus mögliche Klimageschwindigkeits- und Einkommensboni). Wir übernehmen den Förderservice und kümmern uns um die Anträge.",
  },
  {
    q: "Was kostet eine Wärmepumpe ungefähr?",
    a: "Das hängt von Gebäude und gewählter Technik ab – nach Abzug der Förderung ist es oft deutlich günstiger als gedacht. Nach dem Vor-Ort-Termin erhalten Sie von uns ein transparentes, nachvollziehbares Angebot ohne versteckte Kosten.",
  },
  {
    q: "Funktioniert eine Wärmepumpe auch mit normalen Heizkörpern?",
    a: "Häufig ja. Manchmal tauschen wir einzelne Heizkörper oder führen einen hydraulischen Abgleich durch. Eine Fußbodenheizung ist ideal, aber kein Muss – wir sagen Ihnen ehrlich, was bei Ihnen sinnvoll ist.",
  },
  {
    q: "Wie läuft ein Projekt bei Ihnen ab?",
    a: "Alles aus einer Hand: Beratung, Planung, Förderservice, Fundament, Installation und Inbetriebnahme. Sie haben durchgehend einen Ansprechpartner, wir halten Termine und übergeben sauber.",
  },
  {
    q: "Welche Gebiete bedienen Sie?",
    a: "Wir sind in Neumünster und Umgebung für Sie da – unter anderem Bad Bramstedt, Bad Segeberg, Bordesholm, Wasbek, Nortorf und Boostedt.",
  },
  {
    q: "Machen Sie auch Bäder und Kundendienst?",
    a: "Ja. Neben Wärmepumpen und Heizungen planen und bauen wir komplette Bäder und bieten einen eigenen Kundendienst aus der Region – auch bei Störungen.",
  },
];

export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <Section id="faq">
      <SectionHeading
        eyebrow="Gut zu wissen"
        title="Häufige Fragen"
        description="Die wichtigsten Antworten rund um Wärmepumpe, Förderung, Kosten und Ablauf – ehrlich und verständlich."
        centered
      />
      <div className="mx-auto mt-10 max-w-3xl">
        {FAQS.map((f, i) => (
          <Reveal key={i} delay={(i % 4) * 60}>
            <details className="group border-b border-border py-2">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 text-left font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown className="size-5 shrink-0 text-brand transition-transform group-open:rotate-180" />
              </summary>
              <p className="pb-3 pr-9 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </details>
          </Reveal>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Section>
  );
}
