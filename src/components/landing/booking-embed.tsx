"use client";

import { useState } from "react";
import { CalendarClock, ExternalLink } from "lucide-react";

interface BookingEmbedProps {
  /** Kurz-Link der Google-Kalender-Buchungsseite (`calendar.app.google/…`). */
  readonly url: string;
  readonly title: string;
}

/**
 * Datenschutzfreundliche Einbindung der Google-Kalender-Terminplanung:
 * Das iFrame (Google) wird – wie bei der Karte – erst nach aktivem Klick
 * geladen. Vorher werden keine Daten an Google übertragen. Der Direkt-Link
 * bleibt immer als Fallback sichtbar, falls das Einbetten blockiert ist.
 */
export function BookingEmbed({ url, title }: BookingEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  // `gv=true` schaltet die Buchungsseite in den einbettbaren Ansichtsmodus.
  const embedSrc = `${url}?gv=true`;

  return (
    <div className="flex flex-col gap-3">
      {loaded ? (
        <iframe
          title={title}
          src={embedSrc}
          loading="lazy"
          className="w-full rounded-xl border border-border"
          style={{ minHeight: 640, border: 0 }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="flex min-h-72 w-full flex-col items-center justify-center gap-2 rounded-xl bg-brand-soft/40 p-6 text-center transition-colors hover:bg-brand-soft/60"
        >
          <CalendarClock className="size-8 text-brand" />
          <span className="font-semibold text-brand">Terminplaner laden</span>
          <span className="max-w-xs text-xs text-muted-foreground">
            Beim Laden des Terminplaners werden Daten an Google übertragen. Mit
            Klick stimmen Sie dem zu.
          </span>
        </button>
      )}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-brand hover:underline"
      >
        Buchungsseite in neuem Tab öffnen
        <ExternalLink className="size-3.5" />
      </a>
    </div>
  );
}
