"use client";

import { useEffect, useRef } from "react";

interface HeizreportFrameProps {
  readonly src: string;
  readonly title: string;
  /** Start-/Mindesthöhe, bevor die Auto-Anpassung greift. */
  readonly minHeight?: number;
}

/**
 * Bindet ein Heizreport-Widget aus einer statischen HTML-Seite (public/) per
 * iFrame ein. Der Fremd-Code läuft dort in einem normalen Dokument – ohne die
 * Hydration-/Timing-Eigenheiten einer SPA, die sonst die Interaktivität stören.
 *
 * Da das iFrame same-origin ist (eigene Domain), passen wir die Höhe an den
 * Inhalt an. Das Widget wächst/schrumpft beim Durchklicken der Schritte, daher
 * beobachten wir Größenänderungen aktiv (ResizeObserver + MutationObserver) und
 * fallen zusätzlich auf ein Intervall zurück. Internes Scrollen bleibt als
 * Sicherheitsnetz erlaubt, damit nie Inhalt (z. B. der Absenden-Button)
 * unerreichbar abgeschnitten wird.
 */
export function HeizreportFrame({
  src,
  title,
  minHeight = 640,
}: HeizreportFrameProps) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;

    let ro: ResizeObserver | undefined;
    let mo: MutationObserver | undefined;

    const resize = () => {
      try {
        const doc = iframe.contentWindow?.document;
        if (!doc?.body) return;
        const height = Math.max(
          doc.body.scrollHeight,
          doc.documentElement.scrollHeight,
        );
        if (height > 0) {
          iframe.style.height = `${Math.max(height, minHeight)}px`;
        }
      } catch {
        // contentWindow ggf. noch nicht bereit – nächster Tick/Event greift.
      }
    };

    const observe = () => {
      try {
        const doc = iframe.contentWindow?.document;
        if (doc?.body) {
          ro = new ResizeObserver(resize);
          ro.observe(doc.body);
          mo = new MutationObserver(resize);
          mo.observe(doc.body, {
            childList: true,
            subtree: true,
            attributes: true,
          });
        }
      } catch {
        // same-origin nicht verfügbar – Intervall-Fallback greift.
      }
      resize();
    };

    // Fallback für Fälle, in denen die Observer nichts liefern.
    const interval = setInterval(resize, 500);
    iframe.addEventListener("load", observe);
    return () => {
      clearInterval(interval);
      iframe.removeEventListener("load", observe);
      ro?.disconnect();
      mo?.disconnect();
    };
  }, [minHeight]);

  return (
    <iframe
      ref={ref}
      src={src}
      title={title}
      loading="lazy"
      className="w-full"
      style={{ width: "100%", border: 0, minHeight }}
    />
  );
}
