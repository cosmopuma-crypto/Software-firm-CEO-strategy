import Script from "next/script";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "./section";

/** Farbe der Heizreport-Widgets – identisch zur Markenfarbe (--brand) der Website. */
const HEIZREPORT_COLOR = "#173074";
/** E-Mail-Adresse, an die die Widgets die Anfragen zustellen. */
const HEIZREPORT_USER = "info@st-haustechnik.de";

/**
 * Eingebettete Drittanbieter-Tools von heizreport.de:
 * - Wärmepumpen-Check (schnelle Eignungsprüfung)
 * - Förderrechner (mögliche Zuschüsse ermitteln)
 *
 * Die Skripte suchen ihre Mount-Container per id und rendern das Widget hinein.
 * Deshalb liegen die <div>-Container fest im Markup und die Skripte werden mit
 * `afterInteractive` erst nach der Hydration geladen.
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
          <div
            id="wp_check_script"
            className="heizreport"
            data-heizreport-ansprache="du"
            data-primary-color={HEIZREPORT_COLOR}
            data-heizreport-user={HEIZREPORT_USER}
          />
        </Card>

        <Card className="h-full border-brand/20 p-6 shadow-lg shadow-brand/5 sm:p-8">
          <h3 className="mb-4 text-lg font-semibold tracking-tight">
            Förderrechner
          </h3>
          <div
            id="heizreport-foerderrechner"
            data-foerder-farbe={HEIZREPORT_COLOR}
            data-foerder-user={HEIZREPORT_USER}
            data-foerder-agb="/agb"
            data-foerder-datenschutz="/datenschutz"
          />
        </Card>
      </div>

      <Script
        src="https://heizreport.de/js/heizreport_3.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://heizreport.de/js/foerderreport.js"
        strategy="afterInteractive"
      />
    </Section>
  );
}
