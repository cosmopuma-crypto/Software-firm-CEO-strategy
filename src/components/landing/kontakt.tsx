import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "./section";
import { SITE } from "@/lib/site";

const mapQuery = encodeURIComponent(`${SITE.street}, ${SITE.zip} ${SITE.city}`);

export function Kontakt() {
  return (
    <Section id="kontakt">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch">
        <div>
          <SectionHeading
            eyebrow="Kontakt"
            title="Sprechen Sie uns an"
            description="Persönlich erreichbar – telefonisch, per E-Mail oder direkt vor Ort in Neumünster."
          />
          <Reveal className="mt-8 flex flex-col gap-5">
            <a href={SITE.phoneHref} className="flex items-start gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-brand text-brand-foreground">
                <Phone className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-muted-foreground">Telefon</span>
                <span className="font-semibold">{SITE.phone}</span>
              </span>
            </a>
            <a href={`mailto:${SITE.email}`} className="flex items-start gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-brand text-brand-foreground">
                <Mail className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-muted-foreground">E-Mail</span>
                <span className="font-semibold">{SITE.email}</span>
              </span>
            </a>
            <div className="flex items-start gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-brand text-brand-foreground">
                <MapPin className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-muted-foreground">Adresse</span>
                <span className="font-semibold">
                  {SITE.legalName}, {SITE.street}, {SITE.zip} {SITE.city}
                </span>
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-brand text-brand-foreground">
                <Clock className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-muted-foreground">Öffnungszeiten</span>
                <span className="font-semibold">{SITE.hours}</span>
                {/* TODO: Öffnungszeiten beim Inhaber bestätigen */}
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="min-h-72 overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5">
          <iframe
            title={`Standort ${SITE.legalName}`}
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-72 w-full border-0"
          />
        </Reveal>
      </div>
    </Section>
  );
}
