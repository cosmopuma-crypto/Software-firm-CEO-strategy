import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "./section";
import { Badplaner } from "@/components/forms/badplaner";

export function BadplanerSection() {
  return (
    <Section id="badplaner" tinted>
      <SectionHeading
        eyebrow="Badplaner"
        title="Planen Sie Ihr neues Bad"
        description="Erzählen Sie uns von Ihren Vorstellungen – wir entwickeln daraus ein Konzept, das zu Ihnen, Ihrem Raum und Ihrem Budget passt."
        centered
      />
      <Reveal className="mx-auto mt-10 max-w-3xl">
        <Card className="p-6 shadow-lg shadow-brand/5 sm:p-8">
          <Badplaner />
        </Card>
      </Reveal>
    </Section>
  );
}
