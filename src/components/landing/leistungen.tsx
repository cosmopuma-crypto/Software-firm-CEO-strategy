import { Droplets, Flame, Leaf, Bath, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "./section";

const SERVICES = [
  {
    icon: Droplets,
    title: "Sanitär",
    text: "Installation, Reparatur und Wartung rund um Wasser, Abwasser und Armaturen – sauber und zuverlässig.",
  },
  {
    icon: Flame,
    title: "Heizung",
    text: "Moderne, effiziente Heizungsanlagen – von der Planung über den Austausch bis zur regelmäßigen Wartung.",
  },
  {
    icon: Leaf,
    title: "Wärmepumpen",
    text: "Klimafreundlich heizen und Förderung nutzen. Wir beraten herstellerunabhängig und planen passgenau.",
  },
  {
    icon: Bath,
    title: "Bad & Sanierung",
    text: "Ihr Traumbad aus einer Hand – von der Idee über die 3D-Planung bis zur schlüsselfertigen Umsetzung.",
  },
  {
    icon: Wrench,
    title: "Kundendienst",
    text: "Schnelle Hilfe bei Störungen und Ausfällen – mit eigenem Serviceteam aus der Region.",
  },
];

export function Leistungen() {
  return (
    <Section id="leistungen">
      <SectionHeading
        eyebrow="Unsere Leistungen"
        title="Alles rund um Haustechnik – aus einer Hand"
        description="Ob neue Heizung, modernes Bad oder schneller Service: Wir begleiten Sie persönlich von der ersten Idee bis zur fertigen Umsetzung."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 80}>
            <Card className="h-full p-6 transition-shadow hover:shadow-md">
              <div className="flex size-12 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <s.icon className="size-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
