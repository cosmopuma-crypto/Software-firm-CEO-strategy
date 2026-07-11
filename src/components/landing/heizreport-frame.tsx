"use client";

import { useEffect, useRef } from "react";

interface HeizreportFrameProps {
  readonly src: string;
  readonly title: string;
}

/**
 * Bindet ein Heizreport-Widget aus einer statischen HTML-Seite (public/) per
 * iFrame ein. Der Fremd-Code läuft dort in einem normalen Dokument – ohne die
 * Hydration-/Timing-Eigenheiten einer SPA, die sonst die Interaktivität stören.
 *
 * Da das iFrame same-origin ist (eigene Domain), können wir die Höhe an den
 * Inhalt anpassen, damit kein interner Scrollbalken entsteht.
 */
export function HeizreportFrame({ src, title }: HeizreportFrameProps) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;

    const resize = () => {
      try {
        const doc = iframe.contentWindow?.document;
        if (!doc?.body) return;
        const height = Math.max(
          doc.body.scrollHeight,
          doc.documentElement.scrollHeight,
        );
        if (height > 0) iframe.style.height = `${height}px`;
      } catch {
        // contentWindow ggf. noch nicht bereit – nächster Tick greift.
      }
    };

    // Das Widget rendert asynchron und ändert die Höhe beim Durchklicken,
    // deshalb regelmäßig nachjustieren.
    const interval = setInterval(resize, 500);
    iframe.addEventListener("load", resize);
    return () => {
      clearInterval(interval);
      iframe.removeEventListener("load", resize);
    };
  }, []);

  return (
    <iframe
      ref={ref}
      src={src}
      title={title}
      loading="lazy"
      scrolling="no"
      className="w-full"
      style={{ width: "100%", border: 0, minHeight: 620 }}
    />
  );
}
