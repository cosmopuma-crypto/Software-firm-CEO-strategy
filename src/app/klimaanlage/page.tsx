import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  ClipboardCheck,
  Handshake,
  MapPin,
  Phone,
  ShieldCheck,
  Snowflake,
  Star,
  ThermometerSun,
  Wind,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Nav } from "@/components/landing/nav";
import { Section, SectionHeading } from "@/components/landing/section";
import { KlimaanlageSection } from "@/components/landing/klimaanlage-section";
import { CtaBand } from "@/components/landing/cta-band";
import { Footer } from "@/components/landing/footer";
import { MobileCtaBar } from "@/components/landing/mobile-cta-bar";
import { SITE } from "@/lib/site";

const TITLE = `Klimaanlage ${SITE.city} – Split-Klima & Luft-Luft-Wärmepumpe`;
const DESCRIPTION =
  `Klimaanlage in ${SITE.city} & Umgebung: Fachbetrieb für Beratung, Planung und ` +
  "Montage von Split-Klimageräten und Luft-Luft-Wärmepumpen – kühlen im Sommer, " +
  "heizen im Übergang. Jetzt Klima-Konfigurator starten und Angebot anfordern.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/klimaanlage" },
  openGraph: {
    title: `${TITLE} · ${SITE.name}`,
    description: DESCRIPTION,
    url: `${SITE.url}/klimaanlage`,
  },
};

const VORTEILE = [
  {
    icon: Snowflake,
    title: "Angenehm kühl im Sommer",
    text: "Split-Klimageräte senken die Raumtemperatur schnell und leise – für erholsamen Schlaf und produktives Arbeiten auch an heißen Tagen.",
  },
  {
    icon: ThermometerSun,
    title: "Heizen im Übergang",
    text: "Als Luft-Luft-Wärmepumpe heizt die Anlage in der Übergangszeit effizient mit – so bleibt die klassische Heizung länger aus.",
  },
  {
    icon: Handshake,
    title: "Alles aus einer Hand",
    text: "Beratung, Auslegung, Montage von Innen- und Außeneinheit, Elektro und Inbetriebnahme – ein Ansprechpartner, saubere Ausführung.",
  },
  {
    icon: Wind,
    title: "Gesunde, gefilterte Luft",
    text: "Moderne Geräte filtern Staub und Pollen und entfeuchten die Luft – spürbar besseres Raumklima, nicht nur weniger Wärme.",
  },
  {
    icon: MapPin,
    title: "Aus der Region",
    text: `Kurze Wege aus ${SITE.city}: schnelle Termine, persönliche Betreuung und verlässlich erreichbar – auch nach der Montage.`,
  },
  {
    icon: Wrench,
    title: "Wartung & Service",
    text: "Regelmäßige Wartung übernehmen wir selbst. Das hält die Anlage effizient, hygienisch und langlebig.",
  },
];

const ABLAUF = [
  {
    icon: ClipboardCheck,
    title: "Konfigurator ausfüllen",
    text: "Ein paar Angaben zu Objekt, Räumen und Montageart – kostenlos und unverbindlich.",
  },
  {
    icon: CalendarCheck,
    title: "Vor-Ort-Termin & Auslegung",
    text: "Wir schauen uns die Räume an, klären Aufstellorte und legen Geräte und Leistung passend aus.",
  },
  {
    icon: BadgeCheck,
    title: "Transparentes Angebot",
    text: "Sie erhalten ein klares Festangebot – ohne versteckte Kosten und mit passender Gerätewahl.",
  },
  {
    icon: ShieldCheck,
    title: "Saubere Montage",
    text: "Innen- und Außeneinheit, Leitungen und Elektro – fachgerecht installiert und in Betrieb genommen.",
  },
  {
    icon: Wrench,
    title: "Wartung & Service",
    text: "Auf Wunsch übernehmen wir die regelmäßige Wartung – Jahr für Jahr aus einer Hand.",
  },
];

const FAQ_AC = [
  {
    q: "Was ist der Unterschied zwischen Klimaanlage und Luft-Luft-Wärmepumpe?",
    a: "Technisch ist es dieselbe Geräteart: Eine Split-Klimaanlage kann nicht nur kühlen, sondern über die Wärmepumpen-Funktion auch heizen. Man spricht dann von einer Luft-Luft-Wärmepumpe. Wir beraten Sie, welche Betriebsart für Ihre Räume sinnvoll ist.",
  },
  {
    q: "Wird eine Klimaanlage / Luft-Luft-Wärmepumpe gefördert?",
    a: "Split-Klimageräte und Luft-Luft-Wärmepumpen sind in der Regel nicht über die BEG-Heizungsförderung förderfähig – anders als eine Luft-Wasser-Wärmepumpe, die das gesamte Haus über die Heizung versorgt. Wir sagen Ihnen im Beratungsgespräch ehrlich, was für Ihr Vorhaben gilt.",
  },
  {
    q: "Wie viele Innengeräte brauche ich?",
    a: "Das hängt von Anzahl und Größe der zu klimatisierenden Räume ab. Ein einzelner Raum kommt mit einer Mono-Split-Anlage aus; für mehrere Räume gibt es Multi-Split-Systeme mit einer Außeneinheit und mehreren Innengeräten. Die genaue Auslegung machen wir vor Ort.",
  },
  {
    q: "Wie lange dauert die Montage?",
    a: "Eine einzelne Split-Anlage ist meist an einem Tag montiert. Bei mehreren Innengeräten oder aufwändiger Leitungsführung planen wir entsprechend mehr Zeit ein – den genauen Rahmen nennen wir im Angebot.",
  },
  {
    q: "In welchen Orten sind Sie unterwegs?",
    a: `Wir montieren Klimaanlagen in ${SITE.areaServed.join(", ")} und im weiteren Umland von ${SITE.city}.`,
  },
];

function ServiceJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Klimaanlage / Luft-Luft-Wärmepumpe: Beratung, Planung und Montage",
    serviceType: "Installation von Klimaanlagen und Luft-Luft-Wärmepumpen",
    description: DESCRIPTION,
    url: `${SITE.url}/klimaanlage`,
    provider: {
      "@type": ["HVACBusiness", "Plumber"],
      name: SITE.legalName,
      url: SITE.url,
      telephone: "+4943215399933",
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.street,
        postalCode: SITE.zip,
        addressLocality: SITE.city,
        addressRegion: SITE.region,
        addressCountry: SITE.country,
      },
    },
    areaServed: SITE.areaServed.map((name) => ({ "@type": "City", name })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function KlimaanlagePage() {
  return (
    <div className="pb-14 xl:pb-0">
      <ServiceJsonLd />
      <Nav />
      <main>
        {/* Kopfbereich */}
        <section className="relative overflow-hidden bg-background">
          <div aria-hidden className="absolute -right-40 -top-40 -z-10 size-[36rem] rounded-full bg-brand/10 blur-3xl" />
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
            <Reveal className="flex max-w-3xl flex-col gap-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-ink">
                <Snowflake className="size-4 shrink-0" /> Klimaanlage &amp; Kühlen
              </span>
              <h1 className="text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
                Klimaanlage in {SITE.city}{" "}&amp; Umgebung – kühlen im Sommer,
                heizen im Übergang.
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground">
                Beratung, Planung und Montage von Split-Klimageräten und
                Luft-Luft-Wärmepumpen aus einer Hand: Als Fachbetrieb aus {SITE.city}{" "}
                bringen wir angenehm kühle Räume im Sommer – und effizientes Heizen in
                der Übergangszeit. Sauber installiert, leise und wartungsarm.
              </p>
              <Link href="/#kundenstimmen" className="group flex w-fit items-center gap-2.5 text-sm">
                <span className="flex gap-0.5" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-gold text-gold" />
                  ))}
                </span>
                <span className="font-semibold text-foreground">
                  {String(SITE.rating.value).replace(".", ",")}/5
                </span>
                <span className="text-muted-foreground group-hover:text-brand group-hover:underline">
                  {`aus ${SITE.rating.count} Bewertungen bei Google & MyHammer`}
                </span>
              </Link>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#konfigurator"
                  className={cn(buttonVariants({ variant: "gold" }), "h-12 px-7 text-base")}
                >
                  Klima-Konfigurator starten <ArrowRight className="size-4" />
                </a>
                <a
                  href={SITE.phoneHref}
                  className={cn(buttonVariants({ variant: "outline" }), "h-12 px-7 text-base")}
                >
                  <Phone className="size-4" /> {SITE.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Warum wir */}
        <Section tone="sand">
          <SectionHeading
            eyebrow="Ihre Vorteile"
            title={`Warum ${SITE.name} für Ihre Klimaanlage?`}
            description="Ehrliche Beratung, saubere Montage und Service aus der Region: Wir sagen Ihnen auch, welche Lösung wirklich zu Ihren Räumen passt."
            centered
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VORTEILE.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 90}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border bg-card p-6 shadow-sm">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <v.icon className="size-5" />
                  </span>
                  <h3 className="text-lg font-semibold">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Ablauf */}
        <Section>
          <SectionHeading
            eyebrow="So läuft's ab"
            title="In fünf Schritten zur neuen Klimaanlage"
            description="Vom Online-Konfigurator bis zur laufenden Wartung – Sie haben durchgehend einen Ansprechpartner."
            centered
          />
          <ol className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {ABLAUF.map((s, i) => (
              <Reveal key={s.title} delay={i * 70}>
                <li className="flex h-full flex-col gap-2 text-center sm:text-left lg:text-center">
                  <span className="mx-auto flex size-11 items-center justify-center rounded-full bg-brand text-sm font-bold text-white sm:mx-0 lg:mx-auto">
                    {i + 1}
                  </span>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Section>

        <KlimaanlageSection />

        {/* Einzugsgebiet */}
        <Section>
          <SectionHeading
            eyebrow="Einzugsgebiet"
            title="Klimaanlagen-Montage in Ihrer Nähe"
            description={`Kurze Anfahrt, schnelle Termine: Wir sind in ${SITE.city} zuhause und im gesamten Umland für Sie unterwegs.`}
            centered
          />
          <Reveal className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5">
            {SITE.areaServed.map((ort) => (
              <span
                key={ort}
                className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-1.5 text-sm font-medium shadow-sm"
              >
                <MapPin className="size-3.5 text-gold" /> {ort}
              </span>
            ))}
          </Reveal>
        </Section>

        {/* FAQ */}
        <Section tone="sand">
          <SectionHeading
            eyebrow="Gut zu wissen"
            title="Häufige Fragen zur Klimaanlage"
            centered
          />
          <div className="mx-auto mt-10 max-w-3xl">
            {FAQ_AC.map((f) => (
              <details key={f.q} className="group border-b border-border py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 text-left font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ArrowRight className="size-5 shrink-0 rotate-90 text-brand transition-transform group-open:-rotate-90" />
                </summary>
                <p className="pb-3 pr-9 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </Section>

        <CtaBand anchor="#konfigurator" />
      </main>
      <Footer />
      <MobileCtaBar anchor="#konfigurator" />
    </div>
  );
}
