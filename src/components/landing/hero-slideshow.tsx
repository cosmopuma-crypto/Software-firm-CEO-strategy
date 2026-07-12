"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Kuratierte Hero-Bilder – ausschließlich Wärmepumpe & Heizungsbau (Kerngeschäft).
const IMAGES = [
  { src: "/brand/photos/wp-daikin-grau-hochkant.jpg", alt: "Fertig installierte Daikin-Wärmepumpe an einem Wohnhaus" },
  { src: "/brand/photos/wp-stiebel-klinker.jpg", alt: "Wärmepumpe (Stiebel Eltron) an einem Klinkerhaus in Neumünster" },
  { src: "/brand/photos/monteur-elektro-wp.jpg", alt: "Elektrischer Anschluss der Wärmepumpe durch unseren Monteur" },
  { src: "/brand/photos/heizungskeller-wp.jpg", alt: "Wärmepumpen-Technik mit Speicher im Heizungsraum" },
  { src: "/brand/photos/foto-16.jpg", alt: "Monteur bei der Installation einer Wärmepumpe" },
];

const INTERVAL = 4500;

export function HeroSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return; // kein automatischer Wechsel bei reduzierter Bewegung
    }
    const t = setInterval(() => setActive((i) => (i + 1) % IMAGES.length), INTERVAL);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-2xl shadow-brand/20 ring-1 ring-black/5">
      {IMAGES.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          priority={i === 0}
          sizes="(max-width: 1024px) 100vw, 45vw"
          className={cn(
            "object-cover transition-opacity duration-1000",
            i === active ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand/55 via-brand/0 to-brand/0" />

      {/* Indikator-Punkte */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {IMAGES.map((img, i) => (
          <button
            key={img.src}
            type="button"
            aria-label={`Bild ${i + 1} anzeigen`}
            onClick={() => setActive(i)}
            className={cn(
              "size-2.5 rounded-full transition-all",
              i === active ? "w-6 bg-white" : "bg-white/60 hover:bg-white/80",
            )}
          />
        ))}
      </div>
    </div>
  );
}
