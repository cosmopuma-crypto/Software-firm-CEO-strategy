import Image from "next/image";
import { Leaf, Flame, Bath, Wrench, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "./section";

const SERVICES = [
  {
    icon: Leaf,
    title: "Wärmepumpen",
    text: "Zukunftssicher heizen und kräftig Heizkosten sparen: Als zertifizierter Fachbetrieb planen wir Ihre Wärmepumpe, sichern die Förderung und montieren herstellerunabhängig.",
    img: "/brand/photos/foto-20.jpg",
    href: "/waermepumpe",
  },
  {
    icon: Flame,
    title: "Heizung",
    text: "Verlässliche Wärme, Winter für Winter: ob neue Brennwerttechnik, Austausch oder Wartung – inklusive Heizungscheck und hydraulischem Abgleich.",
    img: "/brand/photos/foto-05.jpg",
    href: "#faq",
  },
  {
    icon: Bath,
    title: "Bad & Sanierung",
    text: "Vom ersten Entwurf bis zur letzten Fuge: Wir machen aus Ihrem Bad einen Ort zum Wohlfühlen – schlüsselfertig und auf Wunsch barrierefrei.",
    img: "/brand/photos/foto-07.jpg",
    href: "#bad",
  },
  {
    icon: Wrench,
    title: "Kundendienst",
    text: "Heizung streikt? Wir lassen Sie nicht im Kalten stehen – schnelle Hilfe vom eigenen Serviceteam aus der Region.",
    img: "/brand/photos/foto-01.jpg",
    href: "#kundendienst",
  },
];

export function Leistungen() {
  return (
    <Section id="leistungen">
      <SectionHeading
        eyebrow="Unsere Leistungen"
        title="Ein Ansprechpartner. Alle Gewerke."
        description="Von der Wärmepumpe über die Heizung bis zum Traumbad: Wir koordinieren alles selbst, halten Termine und liefern Qualität, auf die Sie sich verlassen können."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 90}>
            <a
              href={s.href}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                <span className="absolute left-4 top-4 flex size-10 items-center justify-center rounded-xl bg-white/95 text-brand shadow-sm">
                  <s.icon className="size-5" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.text}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Mehr erfahren
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
