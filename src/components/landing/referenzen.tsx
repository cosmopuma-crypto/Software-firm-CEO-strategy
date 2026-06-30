import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "./section";

// Kuratiertes Best-of der echten Projektfotos (Bad · Heizung · Wärmepumpe).
const PHOTOS: { src: string; w: number; h: number; alt: string }[] = [
  { src: "/brand/photos/foto-02.jpg", w: 1600, h: 900, alt: "Modernes Bad mit Dusche und Waschtisch" },
  { src: "/brand/photos/foto-07.jpg", w: 900, h: 1600, alt: "Bodengleiche Dusche, grau gefliest" },
  { src: "/brand/photos/foto-04.jpg", w: 900, h: 1600, alt: "Installierte Wärmepumpe im Garten" },
  { src: "/brand/photos/foto-11.jpg", w: 900, h: 1600, alt: "Wärmepumpen-Innengerät mit Speicher und Verteiler" },
  { src: "/brand/photos/foto-06.jpg", w: 1600, h: 900, alt: "Wärmepumpe an der Hauswand" },
  { src: "/brand/photos/foto-15.jpg", w: 900, h: 1600, alt: "Bad mit Waschtisch und LED-Spiegel" },
  { src: "/brand/photos/foto-03.jpg", w: 1600, h: 900, alt: "Heizungsraum mit Rohrleitungen" },
  { src: "/brand/photos/foto-13.jpg", w: 900, h: 1600, alt: "Geflieste Dusche mit Armatur" },
  { src: "/brand/photos/foto-14.jpg", w: 1600, h: 900, alt: "Gäste-WC mit Waschbecken" },
];

export function Referenzen() {
  return (
    <Section id="referenzen">
      <SectionHeading
        eyebrow="Referenzen"
        title="Unsere Arbeit spricht für uns."
        description="Ein Einblick in Bäder, Heizungen und Wärmepumpen, die wir für unsere Kundinnen und Kunden in und um Neumünster umgesetzt haben."
        centered
      />
      <div className="mt-12 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3">
        {PHOTOS.map((p, i) => (
          <Reveal key={p.src} delay={(i % 3) * 80} className="mb-4 break-inside-avoid">
            <div className="group relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5">
              <Image
                src={p.src}
                alt={p.alt}
                width={p.w}
                height={p.h}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        {/* TODO: weitere Referenzfotos vom Inhaber ergänzen */}
        Gerne zeigen wir Ihnen weitere Projekte bei einem persönlichen Beratungstermin.
      </p>
    </Section>
  );
}
