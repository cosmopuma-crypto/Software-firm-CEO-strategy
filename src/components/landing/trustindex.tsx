"use client";

import { useEffect, useRef } from "react";
import { IS_DEMO } from "@/lib/site";

const TRUSTINDEX_SRC =
  "https://cdn.trustindex.io/loader.js?9b0effb755fe486b5026f714280";

/** Demo-Instanz: Beispiel-Kacheln statt der echten Bewertungen des Betriebs. */
const DEMO_REVIEWS = [
  { name: "M. Beispiel", text: "Schnelle Terminvergabe, saubere Montage unserer Wärmepumpe. Sehr zu empfehlen!" },
  { name: "S. Muster", text: "Badsanierung von der Planung bis zur Übergabe top begleitet." },
  { name: "K. Demo", text: "Heizungsausfall am Freitag – samstags war das Team da. Danke!" },
] as const;

/**
 * Trustindex-Widget: zeigt die echten Google- & MyHammer-Bewertungen als Kacheln,
 * automatisch aktuell. Der Loader fügt das Widget direkt nach dem <script>-Tag ein,
 * deshalb hängen wir das Script gezielt in diesen Container.
 * In der Demo-Instanz erscheinen stattdessen statische Beispiel-Bewertungen.
 */
export function TrustindexWidget() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (IS_DEMO) return;
    const el = ref.current;
    if (!el || el.querySelector("script")) return;
    const script = document.createElement("script");
    script.src = TRUSTINDEX_SRC;
    script.defer = true;
    script.async = true;
    el.appendChild(script);
  }, []);

  if (IS_DEMO) {
    return (
      <div className="grid gap-4 sm:grid-cols-3">
        {DEMO_REVIEWS.map((r) => (
          <figure key={r.name} className="rounded-xl border bg-white p-4 shadow-sm">
            <div aria-hidden className="text-amber-500">★★★★★</div>
            <blockquote className="mt-2 text-sm">{r.text}</blockquote>
            <figcaption className="mt-2 text-sm font-semibold">
              {r.name} <span className="font-normal text-muted-foreground">(Beispiel)</span>
            </figcaption>
          </figure>
        ))}
        <p className="text-xs text-muted-foreground sm:col-span-3">
          In der echten Website erscheinen hier automatisch Ihre
          Google-Bewertungen.
        </p>
      </div>
    );
  }

  return <div ref={ref} className="ti-widget-container min-h-40" />;
}
