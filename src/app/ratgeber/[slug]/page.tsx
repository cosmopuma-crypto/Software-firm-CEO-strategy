import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/landing/footer";
import { MobileCtaBar } from "@/components/landing/mobile-cta-bar";
import { SITE } from "@/lib/site";
import { RATGEBER, artikelBySlug } from "@/data/ratgeber";

export function generateStaticParams() {
  return RATGEBER.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

interface Props {
  readonly params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artikel = artikelBySlug(slug);
  if (!artikel) return {};
  return {
    title: artikel.title,
    description: artikel.description,
    alternates: { canonical: `/ratgeber/${artikel.slug}` },
    openGraph: {
      title: `${artikel.title} · ${SITE.name}`,
      description: artikel.description,
      url: `${SITE.url}/ratgeber/${artikel.slug}`,
      type: "article",
    },
  };
}

export default async function RatgeberArtikelPage({ params }: Props) {
  const { slug } = await params;
  const artikel = artikelBySlug(slug);
  if (!artikel) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: artikel.title,
    description: artikel.description,
    datePublished: artikel.datePublished,
    inLanguage: "de-DE",
    mainEntityOfPage: `${SITE.url}/ratgeber/${artikel.slug}`,
    author: { "@type": "Organization", name: SITE.legalName, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.legalName, url: SITE.url },
  };

  return (
    <div className="pb-14 xl:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/ratgeber"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-brand"
        >
          <ArrowLeft className="size-4" /> Alle Ratgeber-Artikel
        </Link>

        <article className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {artikel.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {`${SITE.name} · Stand: ${artikel.stand}`}
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {artikel.teaser}
          </p>

          {artikel.sections.map((s) => (
            <section key={s.heading} className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {s.heading}
              </h2>
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="flex list-disc flex-col gap-2 pl-5 text-muted-foreground">
                  {s.bullets.map((b) => (
                    <li key={b.slice(0, 24)} className="leading-relaxed">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Artikel-CTA */}
          <aside className="mt-4 flex flex-col gap-4 rounded-2xl border border-brand/20 bg-brand-soft/50 p-6 sm:p-8">
            <h2 className="text-lg font-semibold">
              Passt eine Wärmepumpe zu Ihrem Haus?
            </h2>
            <p className="text-sm text-muted-foreground">
              Finden Sie es in zwei Minuten heraus – kostenlos und unverbindlich.
              Oder rufen Sie uns direkt an, wir beraten Sie ehrlich.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/waermepumpe#waermepumpen-check"
                className={cn(buttonVariants({ variant: "gold" }), "h-11 px-6")}
              >
                Wärmepumpen-Check starten <ArrowRight className="size-4" />
              </Link>
              <a
                href={SITE.phoneHref}
                className={cn(buttonVariants({ variant: "outline" }), "h-11 px-6")}
              >
                <Phone className="size-4" /> {SITE.phone}
              </a>
            </div>
          </aside>
        </article>
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
