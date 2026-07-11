import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { NewsTicker } from "@/components/landing/news-ticker";
import { Leistungen } from "@/components/landing/leistungen";
import { FoerderBanner } from "@/components/landing/foerder-banner";
import { UeberUns } from "@/components/landing/ueber-uns";
import { Referenzen } from "@/components/landing/referenzen";
import { Kundenstimmen } from "@/components/landing/kundenstimmen";
import { Fachbetrieb } from "@/components/landing/fachbetrieb";
import { KonfiguratorSection } from "@/components/landing/konfigurator-section";
import { HeizreportSection } from "@/components/landing/heizreport-section";
import { BadplanerSection } from "@/components/landing/badplaner-section";
import { KundendienstSection } from "@/components/landing/kundendienst-section";
import { Faq } from "@/components/landing/faq";
import { Kontakt } from "@/components/landing/kontakt";
import { CtaBand } from "@/components/landing/cta-band";
import { Footer } from "@/components/landing/footer";
import { StructuredData } from "@/components/landing/structured-data";

export default function Home() {
  return (
    <>
      <StructuredData />
      <Nav />
      <main>
        <NewsTicker />
        <Hero />
        <Leistungen />
        <FoerderBanner />
        <UeberUns />
        <Referenzen />
        <Kundenstimmen />
        <Fachbetrieb />
        <KonfiguratorSection />
        <HeizreportSection />
        <BadplanerSection />
        <KundendienstSection />
        <Faq />
        <Kontakt />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
