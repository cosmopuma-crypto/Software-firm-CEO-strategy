import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { Leistungen } from "@/components/landing/leistungen";
import { Trust } from "@/components/landing/trust";
import { KonfiguratorSection } from "@/components/landing/konfigurator-section";
import { BadplanerSection } from "@/components/landing/badplaner-section";
import { KundendienstSection } from "@/components/landing/kundendienst-section";
import { Kontakt } from "@/components/landing/kontakt";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Leistungen />
        <Trust />
        <KonfiguratorSection />
        <BadplanerSection />
        <KundendienstSection />
        <Kontakt />
      </main>
      <Footer />
    </>
  );
}
