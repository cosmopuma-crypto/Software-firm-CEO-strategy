import { Card } from "@/components/ui/card";
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
export function HeizreportSection() {
  return (
    <Section id="waermepumpen-check">
      <SectionHeading
        eyebrow="Wärmepumpe & Förderung"
        title="Wärmepumpen-Check & Förderrechner"
        description="Prüfen Sie in wenigen Klicks, ob eine Wärmepumpe zu Ihrem Zuhause passt, und ermitteln Sie mögliche staatliche Förderungen – kostenlos und unverbindlich."
        centered
      />

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">
        <Card className="h-full border-brand/20 p-6 shadow-lg shadow-brand/5 sm:p-8">
          <h3 className="mb-4 text-lg font-semibold tracking-tight">
            Wärmepumpen-Check
          </h3>
          <HeizreportFrame
            src="/heizreport/wp-check.html"
            title="Wärmepumpen-Check"
          />
        </Card>

        <Card className="h-full border-brand/20 p-6 shadow-lg shadow-brand/5 sm:p-8">
          <h3 className="mb-4 text-lg font-semibold tracking-tight">
            Förderrechner
          </h3>
          <HeizreportFrame
            src="/heizreport/foerderrechner.html"
            title="Förderrechner"
          />
        </Card>
      </div>
    </Section>
  );
}
