import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Nav } from "@/components/landing/nav";
import { Section, SectionHeading } from "@/components/landing/section";
import { CtaBand } from "@/components/landing/cta-band";
import { Footer } from "@/components/landing/footer";
import { MobileCtaBar } from "@/components/landing/mobile-cta-bar";
import { RATGEBER } from "@/data/ratgeber";

const DESCRIPTION =
  "Ratgeber rund um Wärmepumpe, Förderung und Heizungstausch – ehrlich erklärt " +
  "vom zertifizierten Fachbetrieb: Förderhöhe, Altbau-Eignung, Heizkörper-Frage.";

export const metadata: Metadata = {
  title: "Ratgeber: Wärmepumpe, Förderung & Heizung",
  description: DESCRIPTION,
  alternates: { canonical: "/ratgeber" },
};

export default function RatgeberIndexPage() {
  return (
    <div className="pb-14 xl:pb-0">
      <Nav />
      <main>
        <Section>
          <SectionHeading
            eyebrow="Ratgeber"
            title="Wärmepumpe & Heizung – ehrlich erklärt"
            description={DESCRIPTION}
            centered
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6">
            {RATGEBER.map((a, i) => (
              <Reveal key={a.slug} delay={i * 80}>
                <Link
                  href={`/ratgeber/${a.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg sm:p-8"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <BookOpen className="size-5" />
                  </span>
                  <h2 className="text-xl font-semibold tracking-tight group-hover:text-brand">
                    {a.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">{a.description}</p>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Artikel lesen
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
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
