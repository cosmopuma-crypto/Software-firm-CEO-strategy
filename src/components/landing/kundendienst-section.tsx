import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "./section";
import { KundendienstForm } from "@/components/forms/kundendienst-form";

export function KundendienstSection() {
  return (
    <Section id="kundendienst">
      <SectionHeading
        eyebrow="Kundendienst"
        title="Störung melden – schnelle Hilfe anfragen"
        description="Heizung kalt, Wasser läuft nicht, Fehlermeldung? Schildern Sie uns kurz das Problem. Unser Serviceteam meldet sich zur Terminabstimmung."
        centered
      />
      <Reveal className="mx-auto mt-10 max-w-3xl">
        <Card className="p-6 shadow-lg shadow-brand/5 sm:p-8">
          <KundendienstForm />
        </Card>
      </Reveal>
    </Section>
  );
}
