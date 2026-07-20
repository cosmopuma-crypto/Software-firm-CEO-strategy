import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  ClipboardList,
  Gauge,
  MessageCircle,
  PhoneCall,
  Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { WaermepumpeSchnellanfrage } from "@/components/forms/waermepumpe-schnellanfrage";
import { Section, SectionHeading } from "./section";

/**
 * Zwei-Wege-Weiche zum Wärmepumpen-Angebot:
 * – Weg A (Schnellanfrage): in ~2 Minuten Interesse bekunden, wir melden uns.
 * – Weg B (Wärmepumpen-Check): selbst Daten erfassen und direkt eine
 *   Heizlast-Ersteinschätzung als Grundlage für ein belastbares Angebot.
 * Beide Wege werden ehrlich mit Aufwand und Gegenwert beschrieben –
 * bewusst ohne Lockpreise oder überzogene Versprechen.
 */

const WEG_A_PUNKTE = [
  {
    icon: Timer,
    text: "Drei kurze Angaben zu Ihrem Haus – ohne Verbrauchswerte heraussuchen zu müssen.",
  },
  {
    icon: PhoneCall,
    text: "Wir melden uns persönlich – in der Regel innerhalb eines Werktags.",
  },
  {
    icon: MessageCircle,
    text: "Sie erhalten eine ehrliche Ersteinschätzung. Auch, wenn eine Wärmepumpe (noch) nicht passt.",
  },
];

const WEG_B_PUNKTE = [
  {
    icon: Gauge,
    text: "Sofort-Ergebnis: erste Heizlast-Einschätzung direkt nach dem Check.",
  },
  {
    icon: ClipboardList,
    text: "Auf Wunsch anschließend geführte Datenaufnahme Ihres Gebäudes.",
  },
  {
    icon: CalendarClock,
    text: "Ihr Angebot entsteht auf belastbarer Datenbasis – das spart Zeit bis zum Vor-Ort-Termin.",
  },
];

export function AngebotsWege() {
  return (
    <Section id="schnellanfrage" tone="soft">
      <SectionHeading
        eyebrow="Ihr Weg zum Angebot"
        title="Zwei Wege zu Ihrer Wärmepumpe – Sie entscheiden"
        description="Manche möchten erst einmal unverbindlich anfragen, andere direkt loslegen. Beides ist bei uns richtig – kostenlos, unverbindlich und ohne versteckte Haken."
        centered
      />

      <div className="mx-auto mt-10 grid max-w-5xl items-start gap-6 lg:grid-cols-2">
        {/* Weg A: Schnellanfrage */}
        <Reveal>
          <Card className="relative h-full border-gold/50 p-6 shadow-lg shadow-gold/10 sm:p-8">
            <span className="absolute -top-3 left-6 rounded-full bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-foreground">
              Der schnelle Weg · ca. 2 Minuten
            </span>
            <div className="flex flex-col gap-4 pt-2">
              <h3 className="text-xl font-semibold tracking-tight">
                Interesse bekunden – wir übernehmen den Rest
              </h3>
              <ul className="flex flex-col gap-2.5">
                {WEG_A_PUNKTE.map((p) => (
                  <li key={p.text} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <p.icon className="mt-0.5 size-4 shrink-0 text-gold-ink" />
                    <span>{p.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 border-t pt-5">
                <WaermepumpeSchnellanfrage />
              </div>
            </div>
          </Card>
        </Reveal>

        {/* Weg B: Wärmepumpen-Check */}
        <Reveal delay={120}>
          <Card className="h-full border-brand/20 p-6 sm:p-8">
            <span className="inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
              Der gründliche Weg · ca. 15–30 Minuten
            </span>
            <div className="flex flex-col gap-4 pt-4">
              <h3 className="text-xl font-semibold tracking-tight">
                Selbst loslegen – mit Heizlast-Ersteinschätzung
              </h3>
              <p className="text-sm text-muted-foreground">
                Sie beantworten im Wärmepumpen-Check ein paar Fragen zu Gebäude und
                Verbrauch und sehen sofort eine erste Heizlast-Einschätzung. Wer
                mag, erfasst danach in der geführten Datenaufnahme die Details –
                die beste Grundlage für ein belastbares Angebot.
              </p>
              <ul className="flex flex-col gap-2.5">
                {WEG_B_PUNKTE.map((p) => (
                  <li key={p.text} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <p.icon className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span>{p.text}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="#waermepumpen-check"
                className={cn(buttonVariants({ variant: "default" }), "mt-2 h-11 w-full")}
              >
                Wärmepumpen-Check starten <ArrowRight className="size-4" />
              </Link>
              <p className="text-xs text-muted-foreground">
                Sie können jederzeit abbrechen und stattdessen die Schnellanfrage
                nutzen – nichts geht verloren.
              </p>
            </div>
          </Card>
        </Reveal>
      </div>

      <Reveal>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          Beide Wege führen zum gleichen Ziel: eine sauber ausgelegte Wärmepumpe
          vom zertifizierten Fachbetrieb. Der Unterschied ist nur, wie viel Sie
          vorab selbst erfassen möchten.
        </p>
      </Reveal>
    </Section>
  );
}
