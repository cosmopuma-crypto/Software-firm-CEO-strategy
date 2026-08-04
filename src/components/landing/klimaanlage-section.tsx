import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "./section";
import { Klimaanlage } from "@/components/forms/klimaanlage";

export function KlimaanlageSection() {
  return (
    <Section id="konfigurator" tone="sand">
      <SectionHeading
        eyebrow="Klima-Konfigurator"
        title="Planen Sie Ihre Klimaanlage in wenigen Schritten"
        description="Ein paar Angaben zu Objekt, Räumen und Montageart genügen – wir melden uns mit einer passenden Einschätzung und einem unverbindlichen Angebot."
        centered
      />
      <Reveal className="mx-auto mt-10 max-w-3xl">
        <Card className="p-6 shadow-lg shadow-brand/5 sm:p-8">
          <Klimaanlage />
        </Card>
      </Reveal>
    </Section>
  );
}
