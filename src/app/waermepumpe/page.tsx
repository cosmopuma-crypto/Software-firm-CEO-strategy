import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BadgeEuro,
  CalendarCheck,
  ClipboardCheck,
  HandCoins,
  Handshake,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Thermometer,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Nav } from "@/components/landing/nav";
import { Section, SectionHeading } from "@/components/landing/section";
import { HeizreportSection } from "@/components/landing/heizreport-section";
import { FoerderBanner } from "@/components/landing/foerder-banner";
import { CtaBand } from "@/components/landing/cta-band";
import { Footer } from "@/components/landing/footer";
import { MobileCtaBar } from "@/components/landing/mobile-cta-bar";
import { SITE } from "@/lib/site";

const TITLE = `Wärmepumpe ${SITE.city} – Beratung, Förderung & Einbau`;
const DESCRIPTION =
  `Wärmepumpe in ${SITE.city} & Umgebung: zertifizierter Fachbetrieb (VDI 4645) für Beratung, ` +
  "Planung, Förderservice (bis zu 70 % Zuschuss) und Montage – auch im Altbau. " +
  "Jetzt kostenlosen Wärmepumpen-Check starten.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/waermepumpe" },
  openGraph: {
    title: `${TITLE} · ${SITE.name}`,
    description: DESCRIPTION,
    url: `${SITE.url}/waermepumpe`,
  },
};

const VORTEILE = [
  {
    icon: BadgeCheck,
    title: "Zertifizierter Fachbetrieb",
    text: "Sachkunde nach VDI 4645 – Ihre Wärmepumpe wird fachgerecht ausgelegt statt überdimensioniert verkauft.",
  },
  {
    icon: HandCoins,
    title: "Förderservice inklusive",
    text: "Bis zu 70 % Zuschuss über die BEG. Wir übernehmen Antrag und Nachweise – Sie müssen sich um nichts kümmern.",
  },
  {
    icon: Handshake,
    title: "Alles aus einer Hand",
    text: "Beratung, Planung, Fundament, Installation, Inbetriebnahme – ein Ansprechpartner, keine Schnittstellen.",
  },
  {
    icon: Thermometer,
    title: "Auch im Altbau",
    text: "Wir prüfen Heizlast und Heizflächen ehrlich – oft reicht der Bestand mit normalen Heizkörpern.",
  },
  {
    icon: MapPin,
    title: "Aus der Region",
    text: `Kurze Wege aus ${SITE.city}: schnelle Termine, persönliche Betreuung, verlässlich auch nach der Montage.`,
  },
  {
    icon: Wrench,
    title: "Eigener Kundendienst",
    text: "Wartung und Service übernehmen wir selbst – Ihre Anlage bleibt dauerhaft in guten Händen.",
  },
];

const ABLAUF = [
  {
    icon: ClipboardCheck,
    title: "Wärmepumpen-Check online",
    text: "In wenigen Klicks prüfen, ob Ihr Haus geeignet ist – kostenlos und unverbindlich.",
  },
  {
    icon: CalendarCheck,
    title: "Vor-Ort-Termin & Auslegung",
    text: "Wir schauen uns Gebäude, Heizung und Heizflächen an und legen die Anlage korrekt aus.",
  },
  {
    icon: BadgeEuro,
    title: "Angebot & Förderung",
    text: "Transparentes Festangebot – und wir kümmern uns um den kompletten Förderantrag.",
  },
  {
    icon: ShieldCheck,
    title: "Montage & Inbetriebnahme",
    text: "Sauber, termintreu und aus einer Hand – inklusive Einweisung in Ihre neue Anlage.",
  },
  {
    icon: Wrench,
    title: "Wartung & Service",
    text: "Unser eigener Kundendienst hält Ihre Wärmepumpe effizient – Jahr für Jahr.",
  },
];

const FAQ_WP = [
  {
    q: `Lohnt sich eine Wärmepumpe in ${SITE.city} auch im Altbau?`,
    a: "In den allermeisten Fällen ja. Entscheidend sind Heizlast und Heizflächen – beides prüfen wir kostenlos vor Ort. Häufig funktioniert die Wärmepumpe mit den vorhandenen Heizkörpern; manchmal tauschen wir einzelne Heizkörper oder machen einen hydraulischen Abgleich.",
  },
  {
    q: "Wie viel Förderung bekomme ich?",
    a: "Über die Bundesförderung für effiziente Gebäude (BEG) sind bis zu 70 % Zuschuss möglich – Grundförderung plus mögliche Klimageschwindigkeits- und Einkommensboni. Den Antrag übernehmen wir komplett für Sie.",
  },
  {
    q: "Was kostet eine Wärmepumpe im Einfamilienhaus?",
    a: "Das hängt von Gebäude und Technik ab. Nach Abzug der Förderung liegt der Eigenanteil oft deutlich niedriger als gedacht – nach dem Vor-Ort-Termin bekommen Sie ein transparentes Angebot ohne versteckte Kosten.",
  },
  {
    q: "Wie lange dauert der Einbau?",
    a: "Die eigentliche Montage dauert in der Regel wenige Tage. Vorher planen wir sauber durch – inklusive Fundament, Hydraulik und Elektroanschluss –, damit beim Umbau alles reibungslos läuft.",
  },
  {
    q: "In welchen Orten sind Sie unterwegs?",
    a: `Wir installieren Wärmepumpen in ${SITE.areaServed.join(", ")} und im weiteren Umland von ${SITE.city}.`,
  },
];

function ServiceJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Wärmepumpen-Beratung, -Planung und -Installation",
    serviceType: "Installation von Wärmepumpen",
    description: DESCRIPTION,
    url: `${SITE.url}/waermepumpe`,
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

export default function WaermepumpePage() {
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
                <BadgeCheck className="size-4 shrink-0" /> Fachbetrieb Wärmepumpe · VDI 4645
              </span>
              <h1 className="text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
                Wärmepumpe in {SITE.city} &amp; Umgebung – vom zertifizierten
                Fachbetrieb.
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground">
                Beratung, Planung, Förderservice und Montage aus einer Hand: Als
                Meisterbetrieb aus {SITE.city} installieren wir Luft-Wasser-Wärmepumpen
                im Neubau und im Altbau – korrekt ausgelegt nach VDI 4645, mit bis zu
                70&nbsp;% staatlicher Förderung.
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
                  href="#waermepumpen-check"
                  className={cn(buttonVariants({ variant: "gold" }), "h-12 px-7 text-base")}
                >
                  Wärmepumpen-Check starten <ArrowRight className="size-4" />
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
            title={`Warum ${SITE.name} für Ihre Wärmepumpe?`}
            description="Zertifiziert, regional und ehrlich: Wir sagen Ihnen auch, wenn eine Wärmepumpe (noch) nicht die beste Lösung für Ihr Haus ist."
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
            title="In fünf Schritten zur neuen Wärmepumpe"
            description="Vom ersten Online-Check bis zur laufenden Wartung – Sie haben durchgehend einen Ansprechpartner."
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

        <FoerderBanner />

        {/* Altbau */}
        <Section tone="soft">
          <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
            <Reveal className="flex flex-col gap-4">
              <SectionHeading
                eyebrow="Altbau & Bestand"
                title="Wärmepumpe mit normalen Heizkörpern? Häufig ja."
              />
              <p className="text-muted-foreground">
                Eine Fußbodenheizung ist ideal, aber kein Muss. Entscheidend sind
                Heizlast und Heizflächen: Wir messen und rechnen ehrlich, tauschen
                bei Bedarf einzelne Heizkörper und führen den hydraulischen
                Abgleich durch. So läuft die Wärmepumpe auch im Bestand effizient –
                ohne teure Komplettsanierung.
              </p>
              <p className="text-muted-foreground">
                Beim kostenlosen Vor-Ort-Termin in {SITE.city} und Umgebung sagen wir
                Ihnen klar, was bei Ihrem Haus sinnvoll ist – und was nicht.
              </p>
            </Reveal>
            <Reveal delay={120} className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
              <h3 className="text-lg font-semibold">Das prüfen wir vor Ort</h3>
              <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
                {[
                  "Heizlast des Gebäudes (Baujahr, Dämmung, Wohnfläche)",
                  "Heizflächen: Heizkörper oder Fußbodenheizung",
                  "Aufstellort für Außen- und Inneneinheit",
                  "Warmwasserbedarf und vorhandene Anlage",
                  "Fördervoraussetzungen für den maximalen Zuschuss",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <BadgeCheck className="mt-0.5 size-4 shrink-0 text-gold" /> {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>

        <HeizreportSection />

        {/* Einzugsgebiet */}
        <Section tone="sand">
          <SectionHeading
            eyebrow="Einzugsgebiet"
            title="Wärmepumpen-Installation in Ihrer Nähe"
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

        {/* FAQ (Inhalt ohne FAQPage-Schema – das liegt auf der Startseite) */}
        <Section>
          <SectionHeading
            eyebrow="Gut zu wissen"
            title="Häufige Fragen zur Wärmepumpe"
            centered
          />
          <div className="mx-auto mt-10 max-w-3xl">
            {FAQ_WP.map((f) => (
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

        <CtaBand />
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
