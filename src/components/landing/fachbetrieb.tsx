import Image from "next/image";
import {
  PhoneCall,
  PencilRuler,
  PiggyBank,
  Shovel,
  Wrench,
  CircleCheckBig,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const STEPS = [
  { icon: PhoneCall, title: "Beratung", text: "Ehrliche Erstberatung – telefonisch und bei Ihnen vor Ort." },
  { icon: PencilRuler, title: "Planung", text: "Korrekte Auslegung mit nachgewiesener Sachkunde nach VDI 4645." },
  { icon: PiggyBank, title: "Förderservice", text: "Wir übernehmen die Anträge und holen die maximale Förderung raus." },
  { icon: Shovel, title: "Fundament", text: "Vom Fundament bis zum Aufstellort bereiten wir alles fachgerecht vor." },
  { icon: Wrench, title: "Installation", text: "Saubere Montage von Außen- und Innengerät, hydraulisch abgeglichen." },
  { icon: CircleCheckBig, title: "Inbetriebnahme & Service", text: "Inbetriebnahme, Einweisung und Wartung – alles aus einer Hand." },
];

export function Fachbetrieb() {
  return (
    <section id="fachbetrieb" className="relative scroll-mt-28 overflow-hidden bg-brand-deep py-20 text-white sm:py-28">
      <div aria-hidden className="absolute -left-32 top-0 size-96 rounded-full bg-white/5 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <Reveal className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gold-soft">
              <span className="h-px w-6 bg-gold-soft/70" />
              Fachbetrieb Wärmepumpe · VDI 4645
            </span>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]">
              Ihre Wärmepumpe – alles aus einer Hand
            </h2>
            <p className="max-w-2xl text-white/75">
              Als zertifizierter Fachbetrieb mit nachgewiesener Sachkunde nach
              VDI 4645 übernehmen wir Ihr komplettes Wärmepumpen-Projekt. Sie
              haben nur einen Ansprechpartner – von der ersten Beratung bis zur
              fertigen, laufenden Anlage.
            </p>
          </Reveal>
          <Reveal delay={120} className="w-56 rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-black/5">
            <Image
              src="/brand/fachbetrieb-waermepumpe.png"
              alt="Gütesiegel Fachbetrieb Wärmepumpe"
              width={856}
              height={234}
              className="h-auto w-full"
            />
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 90}>
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-gold text-gold-foreground">
                    <s.icon className="size-5" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wide text-white/50">
                    Schritt {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                <p className="text-sm text-white/70">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
