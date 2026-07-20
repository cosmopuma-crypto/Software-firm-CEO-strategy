import { Home, BadgeEuro, MessageSquareText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "./section";
import { HeizreportFrame } from "./heizreport-frame";

/**
 * Eingebettete Drittanbieter-Tools von heizreport.de:
 * - Wärmepumpen-Check (schnelle Eignungsprüfung)
 * - Förderrechner (mögliche Zuschüsse ermitteln)
 *
 * Die Widgets werden per iFrame aus statischen HTML-Seiten (public/heizreport/)
 * geladen. So läuft der Fremd-Code in einem normalen Dokument – ohne die
 * SPA-/Hydration-Eigenheiten, die sonst die Interaktivität blockieren.
 */
const NUTZEN = [
  {
    icon: Home,
    title: "Passt es zu Ihrem Haus?",
    text: "Sie erfahren, ob eine Wärmepumpe für Ihr Gebäude sinnvoll ist – auch im Bestand mit vorhandenen Heizkörpern.",
  },
  {
    icon: BadgeEuro,
    title: "Wie hoch ist Ihre Förderung?",
    text: "Der Förderrechner zeigt, mit welchem Zuschuss Sie über die BEG rechnen können – bis zu 70 %.",
  },
  {
    icon: MessageSquareText,
    title: "Ehrliche Einschätzung",
    text: "Auf Wunsch melden wir uns persönlich mit einer klaren, unverbindlichen Einschätzung vom Fachbetrieb.",
  },
];

export function HeizreportSection() {
  return (
    <Section id="waermepumpen-check">
      <SectionHeading
        eyebrow="Wärmepumpe & Förderung"
        title="Wärmepumpen-Check & Förderrechner"
        description="Der Check dauert nur wenige Minuten und zeigt sofort eine erste Heizlast-Einschätzung. Ganz ohne Verpflichtung: Prüfen Sie, ob eine Wärmepumpe zu Ihrem Zuhause passt, und ermitteln Sie mögliche staatliche Förderungen."
        centered
      />

      <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
        {NUTZEN.map((n, i) => (
          <Reveal key={n.title} delay={i * 80}>
            <div className="flex h-full flex-col gap-2 rounded-2xl border bg-card p-5 text-center sm:text-left">
              <span className="mx-auto flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand sm:mx-0">
                <n.icon className="size-5" />
              </span>
              <h3 className="text-base font-semibold">{n.title}</h3>
              <p className="text-sm text-muted-foreground">{n.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm font-medium text-gold-ink">
          Eignungsprüfung, Förderhöhe und persönliche Einschätzung aus einer Hand
          – in dieser Ausführlichkeit bekommen Sie das in der Region nur bei uns.
        </p>
      </Reveal>

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">
        <Card className="h-full border-brand/20 p-6 shadow-lg shadow-brand/5 sm:p-8">
          <h3 className="mb-4 text-lg font-semibold tracking-tight">
            Wärmepumpen-Check
          </h3>
          <HeizreportFrame
            src="/heizreport/wp-check.html"
            title="Wärmepumpen-Check"
            minHeight={680}
          />
        </Card>

        <Card className="h-full border-brand/20 p-6 shadow-lg shadow-brand/5 sm:p-8">
          <h3 className="mb-4 text-lg font-semibold tracking-tight">
            Förderrechner
          </h3>
          <HeizreportFrame
            src="/heizreport/foerderrechner.html"
            title="Förderrechner"
            minHeight={860}
          />
        </Card>
      </div>

      <Reveal>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          Gerade keine Verbrauchswerte zur Hand – oder lieber gleich persönlich
          sprechen?{" "}
          <a
            href="#schnellanfrage"
            className="font-medium text-brand underline underline-offset-4"
          >
            Zur 2-Minuten-Anfrage
          </a>{" "}
          – wir melden uns mit einer ehrlichen Ersteinschätzung.
        </p>
      </Reveal>
    </Section>
  );
}
