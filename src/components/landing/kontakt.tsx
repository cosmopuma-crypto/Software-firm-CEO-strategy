import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "./section";

export function Kontakt() {
  return (
    <Section id="kontakt" tinted>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Kontakt"
            title="Sprechen Sie uns an"
            description="Persönlich erreichbar – telefonisch, per E-Mail oder direkt vor Ort in Neumünster."
          />
          <Reveal className="mt-8 flex flex-col gap-5">
            <a href="tel:+4943210000000" className="flex items-start gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-brand text-brand-foreground">
                <Phone className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-muted-foreground">Telefon</span>
                <span className="font-medium">04321 000000</span>
                {/* TODO: echte Telefonnummer von der Live-Seite */}
              </span>
            </a>
            <a href="mailto:info@st-haustechnik.de" className="flex items-start gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-brand text-brand-foreground">
                <Mail className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-muted-foreground">E-Mail</span>
                <span className="font-medium">info@st-haustechnik.de</span>
              </span>
            </a>
            <div className="flex items-start gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-brand text-brand-foreground">
                <MapPin className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-muted-foreground">Adresse</span>
                <span className="font-medium">Musterstraße 1, 24534 Neumünster</span>
                {/* TODO: echte Anschrift von der Live-Seite */}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-brand text-brand-foreground">
                <Clock className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-muted-foreground">Öffnungszeiten</span>
                <span className="font-medium">Mo–Fr 08:00–17:00 Uhr</span>
                {/* TODO: echte Öffnungszeiten von der Live-Seite */}
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          {/* Karten-Platzhalter – später echte Karte/Anfahrt einbinden */}
          <div className="flex aspect-[4/3] w-full items-center justify-center rounded-xl border border-dashed border-brand/30 bg-background text-center text-sm text-muted-foreground">
            <span className="flex flex-col items-center gap-2">
              <MapPin className="size-8 text-brand/50" />
              Karte / Anfahrt
              <span className="text-xs">(wird noch eingebunden)</span>
            </span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
