"use client";

import { useEffect, useRef } from "react";

const TRUSTINDEX_SRC =
  "https://cdn.trustindex.io/loader.js?9b0effb755fe486b5026f714280";

/**
 * Trustindex-Widget: zeigt die echten Google- & MyHammer-Bewertungen als Kacheln,
 * automatisch aktuell. Der Loader fügt das Widget direkt nach dem <script>-Tag ein,
 * deshalb hängen wir das Script gezielt in diesen Container.
 */
export function TrustindexWidget() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.querySelector("script")) return;
    const script = document.createElement("script");
    script.src = TRUSTINDEX_SRC;
    script.defer = true;
    script.async = true;
    el.appendChild(script);
  }, []);

  return <div ref={ref} className="ti-widget-container min-h-40" />;
}
