"use client";

import { useId, useState, type ReactNode } from "react";
import { CalendarClock, ExternalLink, Info } from "lucide-react";

interface BookingEmbedProps {
  /** Kurz-Link der Google-Kalender-Buchungsseite (`calendar.app.google/…`). */
  readonly url: string;
  readonly title: string;
  /** Optionaler Hinweis (z. B. Kosten), der über dem Terminplaner erscheint. */
  readonly notice?: ReactNode;
  /**
   * Optionales Zustimmungs-Label (z. B. AGB). Ist es gesetzt, muss die
   * zugehörige Pflicht-Checkbox aktiviert werden, bevor der Terminplaner
   * geladen werden kann.
   */
  readonly terms?: ReactNode;
}

/**
 * Datenschutzfreundliche Einbindung der Google-Kalender-Terminplanung:
 * Das iFrame (Google) wird – wie bei der Karte – erst nach aktivem Klick
 * geladen. Vorher werden keine Daten an Google übertragen. Der Direkt-Link
 * bleibt immer als Fallback sichtbar, falls das Einbetten blockiert ist.
 *
 * Über `notice` lässt sich ein Kostenhinweis anzeigen, über `terms` eine
 * verpflichtende AGB-Zustimmung erzwingen, bevor gebucht werden kann.
 */
export function BookingEmbed({ url, title, notice, terms }: BookingEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const termsId = useId();
  // `gv=true` schaltet die Buchungsseite in den einbettbaren Ansichtsmodus.
  const embedSrc = `${url}?gv=true`;
  const canLoad = terms ? accepted : true;

  return (
    <div className="flex flex-col gap-3">
      {notice && (
        <div className="flex items-start gap-2.5 rounded-xl border border-gold/30 bg-gold-soft/30 p-4 text-sm text-foreground">
          <Info className="mt-0.5 size-4 shrink-0 text-gold-foreground/80" />
          <div>{notice}</div>
        </div>
      )}

      {loaded ? (
        <iframe
          title={title}
          src={embedSrc}
          loading="lazy"
          className="w-full rounded-xl border border-border"
          style={{ minHeight: 640, border: 0 }}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {terms && (
            <label
              htmlFor={termsId}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background p-4 text-sm"
            >
              <input
                id={termsId}
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-0.5 size-4 shrink-0 accent-brand"
              />
              <span className="text-muted-foreground">{terms}</span>
            </label>
          )}
          <button
            type="button"
            onClick={() => canLoad && setLoaded(true)}
            disabled={!canLoad}
            className="flex min-h-72 w-full flex-col items-center justify-center gap-2 rounded-xl bg-brand-soft/40 p-6 text-center transition-colors hover:bg-brand-soft/60 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-brand-soft/40"
          >
            <CalendarClock className="size-8 text-brand" />
            <span className="font-semibold text-brand">Terminplaner laden</span>
            <span className="max-w-xs text-xs text-muted-foreground">
              {terms && !accepted
                ? "Bitte bestätigen Sie zuerst die AGB, um den Terminplaner zu laden."
                : "Beim Laden des Terminplaners werden Daten an Google übertragen. Mit Klick stimmen Sie dem zu."}
            </span>
          </button>
        </div>
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
