import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "./section";
import { WaermepumpeKonfigurator } from "@/components/forms/waermepumpe-konfigurator";

export function KonfiguratorSection() {
  return (
    <Section id="konfigurator">
      <SectionHeading
        eyebrow="Wärmepumpenkonfigurator"
        title="Welche Wärmepumpe passt zu Ihrem Zuhause?"
        description="Beantworten Sie ein paar kurze Fragen – wir melden uns mit einer ersten Einschätzung, möglichen Förderungen und einem Vorschlag für einen kostenlosen Vor-Ort-Termin."
        centered
      />
      <Reveal className="mx-auto mt-10 max-w-3xl">
        <Card className="border-brand/20 p-6 shadow-lg shadow-brand/5 sm:p-8">
          <WaermepumpeKonfigurator />
        </Card>
      </Reveal>
    </Section>
  );
}
