"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

/**
 * Datenschutzfreundliche Karte: Die Google-Maps-Einbindung wird erst nach
 * aktivem Klick geladen. Vorher werden keine Daten an Google übertragen.
 */
export function MapEmbed({ query, title }: { query: string; title: string }) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title={title}
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full min-h-72 w-full border-0"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="flex h-full min-h-72 w-full flex-col items-center justify-center gap-2 bg-brand-soft/40 p-6 text-center transition-colors hover:bg-brand-soft/60"
    >
      <MapPin className="size-8 text-brand" />
      <span className="font-semibold text-brand">Karte laden</span>
      <span className="max-w-xs text-xs text-muted-foreground">
        Beim Laden der Karte werden Daten an Google übertragen. Mit Klick stimmst du
        dem zu.
      </span>
    </button>
  );
}
