import Image from "next/image";
import { BadgeCheck, HeartHandshake, Lightbulb, Users } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SITE } from "@/lib/site";
import { Section, SectionHeading } from "./section";

const POINTS = [
  {
    icon: BadgeCheck,
    label: "Geprüfte Sachkunde für Wärmepumpen – den Titel „Fachbetrieb“ muss man sich verdienen",
  },
  {
    icon: HeartHandshake,
    label: "Wir beraten geradeheraus – auch wenn die ehrliche Antwort mal „lieber nicht“ lautet",
  },
  {
    icon: Lightbulb,
    label: "Uns geht es um die richtige Lösung für Sie, nicht um den größten Auftrag",
  },
  {
    icon: Users,
    label: "Mehrere Generationen unter einem Dach – auf der Baustelle wie im Büro",
  },
];

export function UeberUns() {
  return (
    <Section id="ueber-uns" tone="sand">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-xl ring-1 ring-black/5">
            <Image
              src="/brand/photos/team-vater-sohn.jpg"
              alt={`Vater und Sohn von ${SITE.name} vor dem Firmenfahrzeug`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </div>
          <div className="absolute -bottom-7 -right-3 w-52 rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-black/5 sm:-right-7 sm:w-64">
            <Image
              src="/brand/fachbetrieb-waermepumpe.png"
              alt="Gütesiegel Fachbetrieb Wärmepumpe"
              width={856}
              height={234}
              className="h-auto w-full"
            />
          </div>
        </Reveal>

        <div>
          <SectionHeading
            eyebrow="Über uns · Familienbetrieb"
            title="Ein Familienbetrieb, hinter dem echte Menschen stehen."
            description={`Hinter ${SITE.name} steckt keine anonyme Firma, sondern eine Familie, die 2021 gemeinsam durchgestartet ist – vom Gründungsduo bis zu den Verwandten, die heute auf der Baustelle und im Büro mit anpacken. Wer bei uns anruft, spricht mit den Menschen, die später auch die Arbeit machen. Das bedeutet kurze Wege, klare Absprachen und ein Ergebnis, für das wir mit unserem Namen geradestehen.`}
          />
          <ul className="mt-6 flex flex-col gap-3">
            {POINTS.map((p) => (
              <Reveal as="li" key={p.label} className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <p.icon className="size-5" />
                </span>
                <span className="pt-1.5 text-sm font-medium">{p.label}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
