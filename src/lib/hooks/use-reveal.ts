"use client";

import { useEffect, useRef } from "react";

/**
 * Setzt `data-reveal="shown"`, sobald das Element in den Viewport scrollt.
 * Die eigentliche Animation kommt aus globals.css ([data-reveal]).
 * Respektiert prefers-reduced-motion (CSS deaktiviert dann die Transition).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Kein IntersectionObserver (z. B. SSR-Edgecases) -> direkt zeigen.
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.reveal = "shown";
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.reveal = "shown";
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px", ...options },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}
