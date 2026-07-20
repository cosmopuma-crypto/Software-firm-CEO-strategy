import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, Car, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Nav } from "@/components/landing/nav";
import { Section, SectionHeading } from "@/components/landing/section";
import { AngebotsWege } from "@/components/landing/angebots-wege";
import { HeizreportSection } from "@/components/landing/heizreport-section";
import { FoerderBanner } from "@/components/landing/foerder-banner";
import { CtaBand } from "@/components/landing/cta-band";
import { Footer } from "@/components/landing/footer";
import { MobileCtaBar } from "@/components/landing/mobile-cta-bar";
import { IS_DEMO, SITE } from "@/lib/site";
import { ORTE, ortBySlug } from "@/data/orte";

// Lokale Wärmepumpen-Seiten nur für den echten Betrieb – die Demo-Instanz
// (Musterbetrieb) rendert sie nicht.
export function generateStaticParams() {
  if (IS_DEMO) return [];
  return ORTE.map((o) => ({ ort: o.slug }));
}

export const dynamicParams = false;

interface Props {
  readonly params: Promise<{ ort: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ort: slug } = await params;
  const ort = ortBySlug(slug);
  if (!ort) return {};
  const title = `Wärmepumpe ${ort.name} – Fachbetrieb aus der Nähe`;
  const description =
    `Wärmepumpe in ${ort.name}: Beratung, Förderservice (bis zu 70 %) und Montage ` +
    `vom zertifizierten Fachbetrieb (VDI 4645) aus Neumünster – ${ort.anfahrt}. ` +
    "Jetzt kostenlosen Wärmepumpen-Check starten.";
  return {
    title,
    description,
    alternates: { canonical: `/waermepumpe/${ort.slug}` },
    openGraph: {
      title: `${title} · ${SITE.name}`,
      description,
      url: `${SITE.url}/waermepumpe/${ort.slug}`,
    },
  };
}

function OrtJsonLd({ name, slug }: { readonly name: string; readonly slug: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Wärmepumpen-Beratung, -Planung und -Installation in ${name}`,
    serviceType: "Installation von Wärmepumpen",
    url: `${SITE.url}/waermepumpe/${slug}`,
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
    areaServed: { "@type": "City", name },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function OrtPage({ params }: Props) {
  const { ort: slug } = await params;
  if (IS_DEMO) notFound();
  const ort = ortBySlug(slug);
  if (!ort) notFound();

  return (
    <div className="pb-14 xl:pb-0">
      <OrtJsonLd name={ort.name} slug={ort.slug} />
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
                Wärmepumpe in {ort.name} – Ihr Fachbetrieb aus der Nähe.
              </h1>
              {ort.intro.map((absatz) => (
                <p key={absatz.slice(0, 24)} className="max-w-2xl text-lg text-muted-foreground">
                  {absatz}
                </p>
              ))}
              <p className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                <Car className="size-4 shrink-0 text-gold" /> Anfahrt: {ort.anfahrt}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#schnellanfrage"
                  className={cn(buttonVariants({ variant: "gold" }), "h-12 px-7 text-base")}
                >
                  Kostenlose Ersteinschätzung anfordern <ArrowRight className="size-4" />
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

        {/* Lokale Punkte */}
        <Section tone="sand">
          <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-2">
            <Reveal className="flex flex-col gap-4">
              <SectionHeading
                eyebrow={`Für ${ort.name}`}
                title={`Was Sie in ${ort.name} von uns erwarten können`}
              />
              <ul className="flex flex-col gap-3 text-muted-foreground">
                {ort.punkte.map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <BadgeCheck className="mt-0.5 size-5 shrink-0 text-gold" /> {p}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground">
                Alles Weitere zu Ablauf, Kosten, Förderung und Altbau-Eignung
                finden Sie auf unserer{" "}
                <Link href="/waermepumpe" className="font-semibold text-brand underline underline-offset-2">
                  Wärmepumpen-Seite
                </Link>
                .
              </p>
            </Reveal>
            <Reveal delay={120} className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-semibold">So starten Sie</h2>
              <ol className="flex flex-col gap-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">1</span>
                  Wärmepumpen-Check online ausfüllen (2 Minuten, kostenlos)
                </li>
                <li className="flex gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">2</span>
                  {`Kostenloser Vor-Ort-Termin bei Ihnen in ${ort.name}`}
                </li>
                <li className="flex gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">3</span>
                  Transparentes Angebot inklusive Förderservice
                </li>
              </ol>
              <p className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                <MapPin className="size-4 shrink-0 text-gold" />
                {`${SITE.legalName}, ${SITE.street}, ${SITE.zip} ${SITE.city}`}
              </p>
            </Reveal>
          </div>
        </Section>

        <FoerderBanner />
        <AngebotsWege />
        <HeizreportSection />
        <CtaBand anchor="#schnellanfrage" />
      </main>
      <Footer />
      <MobileCtaBar anchor="#schnellanfrage" />
    </div>
  );
}
