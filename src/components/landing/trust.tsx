import { ClipboardList, Handshake, Hammer } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "./section";

const STEPS = [
  {
    icon: ClipboardList,
    title: "1 · Anfrage",
    text: "Sie konfigurieren online oder schildern uns Ihr Anliegen. Unverbindlich und in wenigen Minuten.",
  },
  {
    icon: Handshake,
    title: "2 · Beratung vor Ort",
    text: "Wir schauen uns alles persönlich an, beraten ehrlich und erstellen ein transparentes Angebot.",
  },
  {
    icon: Hammer,
    title: "3 · Umsetzung",
    text: "Termintreue Ausführung durch unser eigenes Team – sauber, fachgerecht und mit klarer Ansprechperson.",
  },
];

export function Trust() {
  return (
    <Section id="ablauf" tinted>
      <SectionHeading
        eyebrow="So läuft's ab"
        title="In drei Schritten zum Ziel"
        description="Kein Fachchinesisch, keine bösen Überraschungen – sondern ein klarer, verlässlicher Ablauf."
        centered
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 100}>
            <div className="flex h-full flex-col items-center gap-3 rounded-xl border bg-card p-6 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-brand text-brand-foreground">
                <s.icon className="size-6" />
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
