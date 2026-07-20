import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, Phone, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/landing/footer";
import { MobileCtaBar } from "@/components/landing/mobile-cta-bar";
import { FoerderCheck } from "@/components/forms/foerder-check";
import { SITE } from "@/lib/site";

const TITLE = "Wärmepumpen-Förderung 2026 in Neumünster sichern";
const DESCRIPTION =
  "Neue KfW-Förderregeln seit 21.07.2026: Die Zuschüsse sinken schrittweise. Wir rechnen kostenlos aus, wie viel Förderung Ihnen noch zusteht. Meisterbetrieb aus Neumünster, VDI 4645 zertifiziert.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/waermepumpe-foerderung-2026" },
  openGraph: {
    title: `${TITLE} · ${SITE.name}`,
    description: DESCRIPTION,
    url: `${SITE.url}/waermepumpe-foerderung-2026`,
  },
};

// Echte Rezensionen (Stand Inhaber-Angaben) statt Platzhalter.
const REVIEWS = [
  {
    body: "Sind sehr zufrieden mit der Beratung und der Durchführung unseres Projektes Wärmepumpe. Absprachen und Termine wurden eingehalten, die Arbeiten sauber und ordentlich durchgeführt.",
    who: "Heiko L. · Google",
  },
  {
    body: "Sehr höfliches und professionelles Team. Gerne wieder!",
    who: "Igor E. · Google",
  },
];

const STEPS = [
  { n: 1, t: "Förder-Check", d: "Zwei Minuten ausfüllen oder anrufen. Wir melden uns Mo–Fr innerhalb von vier Arbeitsstunden zurück." },
  { n: 2, t: "Erst prüfen, dann reden", d: "Wir rechnen nach, ob sich eine Wärmepumpe in Ihrem Haus trägt. Falls nicht, hören Sie das von uns zuerst." },
  { n: 3, t: "Antrag und Angebot", d: "Heizlastberechnung, Festangebot, KfW-Antrag samt Nachweisen. Den Papierkram übernehmen wir." },
  { n: 4, t: "Einbau und danach", d: "Montage durch unser eigenes Team. Gewartet wird die Anlage später auch von uns, aus der Virchowstraße in Neumünster." },
];

const FAQS = [
  { q: "Funktioniert eine Wärmepumpe auch in meinem Altbau?", a: "Meistens ja, oft mit den vorhandenen Heizkörpern. Entscheidend ist die Heizlast, nicht das Baujahr. Genau das prüfen wir, bevor wir irgendetwas anbieten." },
  { q: "Wie viel Förderung bekomme ich konkret?", a: "Seit dem 21.07.2026: 30 % Grundförderung, plus 16 % Klimageschwindigkeits-Bonus beim Austausch einer alten Öl- oder Gasheizung, plus je nach Haushaltseinkommen bis zu 40 % Einkommensbonus (insgesamt gedeckelt). Ihren genauen Anspruch rechnen wir aus und stellen den Antrag für Sie." },
  { q: "Was kostet eine Wärmepumpe mit Einbau?", a: "Für ein typisches Einfamilienhaus meist zwischen 27.000 und 38.000 €. Nach Abzug der Förderung bleiben oft 12.000 bis 20.000 € Eigenanteil. Nach dem Check bekommen Sie ein Festangebot mit Ihren Zahlen." },
  { q: "Wie laut ist eine Wärmepumpe?", a: "Moderne Geräte liegen in wenigen Metern Abstand bei 30 bis 40 dB, etwa auf Kühlschrank-Niveau. Den Aufstellort planen wir so, dass weder Sie noch Ihre Nachbarn etwas davon haben." },
  { q: "Warum ST-Haustechnik und kein großer Online-Anbieter?", a: "Wir sitzen in der Virchowstraße in Neumünster. Die Anlagen, die wir einbauen, warten wir auch selbst. Wenn Sie anrufen, ist direkt einer von uns dran." },
  { q: "Kostet die Beratung etwas?", a: "Nein. Förder-Check, Ersteinschätzung und Angebot sind kostenlos und unverbindlich." },
];

function JsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Wärmepumpen-Förderung & Installation",
      serviceType: "Installation von Wärmepumpen inkl. Förderservice",
      description: DESCRIPTION,
      url: `${SITE.url}/waermepumpe-foerderung-2026`,
      areaServed: SITE.areaServed.map((name) => ({ "@type": "City", name })),
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
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function FoerderungLandingpage() {
  return (
    <div className="pb-14 xl:pb-0">
      <JsonLd />
      <Nav />

      {/* Dringlichkeits-Hinweis */}
      <div className="bg-amber-100 px-4 py-2 text-center text-sm font-semibold text-amber-800">
        Neue KfW-Förderregeln seit 21. Juli 2026: Die Zuschüsse sinken
        schrittweise.{" "}
        <a href="#foerder-check" className="underline">
          Jetzt Anspruch prüfen →
        </a>
      </div>

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-brand to-brand-deep text-white">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm">
              <BadgeCheck className="size-4" /> Fachbetrieb Wärmepumpe (VDI 4645) · Meisterbetrieb aus {SITE.city}
            </span>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Die Wärmepumpen-Förderung sinkt. Wer 2026 baut, bekommt noch{" "}
              <span className="text-gold-soft">bis zu 70 % Zuschuss</span>.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/90">
              Seit dem 21. Juli gelten neue KfW-Regeln, ab 2027 werden die Boni
              alle sechs Monate gekürzt. Wir rechnen Ihnen aus, was Ihrem Haus
              jetzt noch zusteht. Kostenlos. Und falls sich eine Wärmepumpe bei
              Ihnen nicht lohnt, sagen wir Ihnen auch das.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#foerder-check" className={cn(buttonVariants({ variant: "gold" }), "h-12 px-7 text-base")}>
                Kostenlosen Förder-Check starten <ArrowRight className="size-4" />
              </a>
              <a
                href={SITE.phoneHref}
                className={cn(buttonVariants({ variant: "outline" }), "h-12 border-white/40 bg-transparent px-7 text-base text-white hover:bg-white/10 hover:text-white")}
              >
                <Phone className="size-4" /> {SITE.phone}
              </a>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/90">
              <li>✓ Google {String(SITE.rating.value).replace(".", ",")} von 5 ({SITE.rating.count} Bewertungen)</li>
              <li>✓ Wir stellen den KfW-Antrag für Sie</li>
              <li>✓ Rückmeldung in unter 4 Arbeitsstunden</li>
            </ul>
          </div>
        </section>

        {/* Was sich geändert hat + Tabelle */}
        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-brand sm:text-3xl">
            Was sich bei der Förderung geändert hat
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Die Bundesförderung wird seit dem 21. Juli 2026 umgebaut. Kurz
            gesagt: Wer früher beantragt, bekommt mehr.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border bg-card p-4 shadow-sm sm:p-6">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="border-b py-2.5 pr-3">Baustein</th>
                  <th className="border-b py-2.5 pr-3">Bis 20.07.2026</th>
                  <th className="border-b py-2.5 pr-3">Jetzt</th>
                  <th className="border-b py-2.5">Ab 2027</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Grundförderung", "30 %", "30 %", "30 %*"],
                  ["Klimageschwindigkeits-Bonus", "20 %", "16 %", "sinkt alle 6 Monate um 4 Punkte"],
                  ["Effizienzbonus", "5 %", "entfällt", "neuer Wertschöpfungsbonus (EU-Geräte)"],
                  ["Einkommensbonus", "30 % (bis 40.000 €)", "bis 40 % (gestaffelt)", "gestaffelt"],
                  ["Förderfähige Kosten", "30.000 €", "28.000 €", "weiter sinkend"],
                ].map((row) => (
                  <tr key={row[0]}>
                    <td className="border-b py-2.5 pr-3 font-semibold text-brand">{row[0]}</td>
                    <td className="border-b py-2.5 pr-3">{row[1]}</td>
                    <td className="border-b py-2.5 pr-3 font-medium text-[#c2410c]">{row[2]}</td>
                    <td className="border-b py-2.5 text-muted-foreground">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-muted-foreground">
              *Stand Juli 2026, vereinfacht dargestellt, ohne Gewähr. Was in
              Ihrem Fall gilt, hängt von Haus, Heizung und Einkommen ab. Das
              rechnen wir für Sie durch und stellen den Antrag gleich mit.
              Quelle: KfW/BEG.
            </p>
          </div>
        </section>

        {/* Rechenbeispiel */}
        <section className="mx-auto max-w-5xl px-4 pb-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-brand sm:text-3xl">
            Rechenbeispiel aus unserer Region
          </h2>
          <div className="mt-5 rounded-r-2xl border-l-4 border-brand bg-card p-6 shadow-sm">
            <strong className="text-foreground">
              Einfamilienhaus in Bad Segeberg, Baujahr 1989, Gasheizung von 2003,
              normale Heizkörper:
            </strong>
            <div className="mt-4 max-w-md space-y-1.5 text-sm">
              <div className="flex justify-between gap-6">
                <span>Luft-Wasser-Wärmepumpe komplett installiert</span>
                <span>ca. 32.000 €</span>
              </div>
              <div className="flex justify-between gap-6">
                <span>KfW-Zuschuss (46 % auf förderfähige Kosten)</span>
                <span>− ca. 12.900 €</span>
              </div>
              <div className="flex justify-between gap-6 border-t-2 border-brand pt-2 text-base font-bold text-brand">
                <span>Eigenanteil</span>
                <span>ca. 19.100 €</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Zur Orientierung. Mit Einkommensbonus liegt der Eigenanteil zum
              Teil deutlich darunter.
            </p>
          </div>
        </section>

        {/* Ablauf */}
        <section className="bg-sand">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-brand sm:text-3xl">So läuft es ab</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s) => (
                <div key={s.n} className="flex h-full flex-col gap-2 rounded-2xl border bg-card p-6">
                  <span className="flex size-9 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">{s.n}</span>
                  <h3 className="font-semibold text-brand">{s.t}</h3>
                  <p className="text-sm text-muted-foreground">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bewertungen */}
        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-brand sm:text-3xl">Das sagen Ihre Nachbarn</h2>
          <p className="mt-2 text-muted-foreground">
            Google {String(SITE.rating.value).replace(".", ",")} von 5 (23 Bewertungen) · MyHammer 5,0 von 5 (14 Bewertungen)
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {REVIEWS.map((r) => (
              <div key={r.who} className="rounded-2xl border bg-card p-6 text-sm">
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-gold" />
                  ))}
                </div>
                <p className="mt-2 text-foreground">„{r.body}“</p>
                <p className="mt-3 text-xs text-muted-foreground">– {r.who}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Formular */}
        <section id="foerder-check" className="scroll-mt-24 bg-gradient-to-br from-brand to-brand-deep">
          <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-card p-6 shadow-2xl sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-brand">Kostenloser Förder-Check</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Dauert zwei Minuten. Sie bekommen Ihre Förder-Einschätzung und
                einen Rückruf vom Meister, nicht von einer Hotline.
              </p>
              <div className="mt-6">
                <FoerderCheck />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-brand sm:text-3xl">Häufige Fragen</h2>
          <div className="mt-6">
            {FAQS.map((f) => (
              <details key={f.q} className="group border-b border-border py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 text-left font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-brand transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pb-3 pr-8 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <MobileCtaBar anchor="#foerder-check" />
    </div>
  );
}
