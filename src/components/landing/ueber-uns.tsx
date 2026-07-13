import Image from "next/image";
import { BadgeCheck, ShieldCheck, MapPin, Clock } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SITE } from "@/lib/site";
import { Section, SectionHeading } from "./section";

const POINTS = [
  { icon: BadgeCheck, label: "Zertifizierter Fachbetrieb Wärmepumpe" },
  { icon: ShieldCheck, label: "Meisterbetrieb mit echtem Handwerk" },
  { icon: MapPin, label: `Fest verwurzelt in ${SITE.city} & Umgebung` },
  { icon: Clock, label: "Termintreu & mit klarer Ansprechperson" },
];

export function UeberUns() {
  return (
    <Section id="ueber-uns" tone="sand">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-xl ring-1 ring-black/5">
            <Image
              src="/brand/photos/foto-17.jpg"
              alt={`${SITE.name} Firmenfahrzeug mit Logo`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute -bottom-7 -right-3 w-60 rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-black/5 sm:-right-7 sm:w-72">
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
            eyebrow="Über uns"
            title="Echte Handwerker, die anpacken und mitdenken."
            description="Bei uns reden Sie nicht mit einer Hotline, sondern mit Menschen, die Ihr Projekt selbst in die Hand nehmen. Wir reden Klartext, halten Termine und behandeln Ihr Zuhause, als wäre es unser eigenes."
          />
          <ul className="mt-6 flex flex-col gap-3">
            {POINTS.map((p) => (
              <Reveal as="li" key={p.label} className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <p.icon className="size-5" />
                </span>
                <span className="text-sm font-medium">{p.label}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
