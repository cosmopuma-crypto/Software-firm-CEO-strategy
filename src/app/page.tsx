import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { Leistungen } from "@/components/landing/leistungen";
import { UeberUns } from "@/components/landing/ueber-uns";
import { Referenzen } from "@/components/landing/referenzen";
import { KonfiguratorSection } from "@/components/landing/konfigurator-section";
import { BadplanerSection } from "@/components/landing/badplaner-section";
import { KundendienstSection } from "@/components/landing/kundendienst-section";
import { Kontakt } from "@/components/landing/kontakt";
import { CtaBand } from "@/components/landing/cta-band";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Leistungen />
        <UeberUns />
        <Referenzen />
        <KonfiguratorSection />
        <BadplanerSection />
        <KundendienstSection />
        <Kontakt />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
