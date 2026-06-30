import Image from "next/image";
import { BadgeCheck, ShieldCheck, MapPin, Clock, ClipboardList, Handshake, Hammer } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "./section";

const POINTS = [
  { icon: BadgeCheck, label: "Zertifizierter Fachbetrieb Wärmepumpe" },
  { icon: ShieldCheck, label: "Meisterbetrieb mit echtem Handwerk" },
  { icon: MapPin, label: "Fest verwurzelt in Neumünster & Umgebung" },
  { icon: Clock, label: "Termintreu & mit klarer Ansprechperson" },
];

const STEPS = [
  { icon: ClipboardList, title: "Anfrage", text: "Online konfigurieren oder anrufen – unverbindlich." },
  { icon: Handshake, title: "Beratung vor Ort", text: "Ehrliche Einschätzung & transparentes Angebot." },
  { icon: Hammer, title: "Umsetzung", text: "Saubere, termintreue Ausführung durch unser Team." },
];

export function UeberUns() {
  return (
    <Section id="ueber-uns" tone="sand">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-xl ring-1 ring-black/5">
            <Image
              src="/brand/photos/foto-17.jpg"
              alt="ST-Haustechnik Firmenfahrzeug"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-3 w-52 rounded-2xl bg-white p-3 shadow-xl ring-1 ring-black/5 sm:-right-6">
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
            title="ST-Haustechnik steht für echte Handwerksleistung."
            description="Wir sind Ihr persönlicher Ansprechpartner für zuverlässige Antworten rund um Sanitär, Heizung und Wärmepumpen – bodenständig, fair und mit Blick fürs Detail."
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

      <div className="mt-16">
        <h3 className="text-center text-sm font-semibold uppercase tracking-wide text-gold">
          So läuft&apos;s ab
        </h3>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <div className="flex h-full flex-col gap-2 rounded-2xl border bg-card p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-brand text-brand-foreground">
                    <s.icon className="size-5" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Schritt {i + 1}
                  </span>
                </div>
                <h4 className="mt-1 text-lg font-semibold">{s.title}</h4>
                <p className="text-sm text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
