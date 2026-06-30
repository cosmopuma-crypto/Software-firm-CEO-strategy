import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "./section";
import { WaermepumpeKonfigurator } from "@/components/forms/waermepumpe-konfigurator";

export function KonfiguratorSection() {
  return (
    <Section id="waermepumpe" tone="soft">
      <SectionHeading
        eyebrow="Wärmepumpe anfragen"
        title="Welche Wärmepumpe passt zu Ihrem Zuhause?"
        description="Als zertifizierter Fachbetrieb Wärmepumpe geben wir Ihnen eine ehrliche Einschätzung. Beantworten Sie ein paar kurze Fragen – wir melden uns mit Vorschlag, möglichen Förderungen und einem kostenlosen Vor-Ort-Termin."
        centered
      />
      <Reveal className="mx-auto mt-10 max-w-3xl">
        <Card className="border-brand/15 p-6 shadow-xl shadow-brand/10 sm:p-8">
          <WaermepumpeKonfigurator />
        </Card>
      </Reveal>
    </Section>
  );
}
