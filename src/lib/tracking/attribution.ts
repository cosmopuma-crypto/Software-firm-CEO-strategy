// Quellen-Attribution für Formular-Anfragen.
//
// Beim ersten Seitenaufruf werden Referrer + UTM-Parameter erfasst und in
// sessionStorage gehalten (First-Touch, kein Cookie, keine personenbezogenen
// Daten). Beim Absenden eines Formulars wandert die Attribution mit zur
// API und von dort ins Lead-Log und in die Benachrichtigungs-E-Mail.

import { z } from "zod";

export interface Attribution {
  /** Abgeleitete Quelle, z. B. "google", "facebook", "direkt" oder ein Hostname. */
  readonly source: string;
  readonly referrer?: string;
  readonly utmSource?: string;
  readonly utmMedium?: string;
  readonly utmCampaign?: string;
  /** Pfad der Einstiegsseite, z. B. "/badplaner". */
  readonly landingPage?: string;
}

/** Server-seitige Validierung der vom Client mitgeschickten Attribution. */
export const attributionSchema = z.object({
  source: z.string().trim().min(1).max(120),
  referrer: z.string().trim().max(500).optional(),
  utmSource: z.string().trim().max(120).optional(),
  utmMedium: z.string().trim().max(120).optional(),
  utmCampaign: z.string().trim().max(120).optional(),
  landingPage: z.string().trim().max(500).optional(),
});

/**
 * Liest die Attribution aus einem unbekannten Wert (Objekt aus JSON-Bodys
 * oder JSON-String aus multipart/form-data). Ungültiges wird verworfen —
 * Attribution darf eine Anfrage niemals scheitern lassen.
 */
export function parseAttribution(raw: unknown): Attribution | undefined {
  let candidate: unknown = raw;
  if (typeof raw === "string") {
    try {
      candidate = JSON.parse(raw);
    } catch {
      return undefined;
    }
  }
  const result = attributionSchema.safeParse(candidate);
  return result.success ? result.data : undefined;
}

/** Bekannte Quellen anhand des Referrer-Hostnamens. */
const KNOWN_SOURCES: ReadonlyArray<readonly [pattern: string, source: string]> = [
  ["google.", "google"],
  ["bing.", "bing"],
  ["duckduckgo.", "duckduckgo"],
  ["ecosia.", "ecosia"],
  ["facebook.", "facebook"],
  ["instagram.", "instagram"],
  ["linkedin.", "linkedin"],
  ["youtube.", "youtube"],
];

function hostnameOf(url: string): string | undefined {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

/**
 * Leitet die Attribution aus Einstiegs-URL und Referrer ab (reine Funktion,
 * ohne Browser-Abhängigkeit — dadurch unit-testbar).
 */
export function deriveAttribution(input: {
  readonly url: string;
  readonly referrer: string;
}): Attribution {
  const pageUrl = new URL(input.url);
  const params = pageUrl.searchParams;
  const utmSource = params.get("utm_source")?.trim() || undefined;
  const utmMedium = params.get("utm_medium")?.trim() || undefined;
  const utmCampaign = params.get("utm_campaign")?.trim() || undefined;

  const refHost = hostnameOf(input.referrer);
  const ownHost = pageUrl.hostname.toLowerCase().replace(/^www\./, "");
  // Interne Navigation zählt nicht als Quelle.
  const externalReferrer =
    refHost && refHost !== ownHost ? input.referrer : undefined;

  let source = "direkt";
  if (utmSource) {
    source = utmSource.toLowerCase();
  } else if (externalReferrer && refHost) {
    source =
      KNOWN_SOURCES.find(([pattern]) => refHost.includes(pattern))?.[1] ??
      refHost;
  }

  return {
    source,
    referrer: externalReferrer,
    utmSource,
    utmMedium,
    utmCampaign,
    landingPage: pageUrl.pathname || "/",
  };
}

const STORAGE_KEY = "st-attribution";

/**
 * Erfasst die Attribution beim ersten Seitenaufruf der Sitzung (First-Touch).
 * Spätere Aufrufe überschreiben nichts. No-op außerhalb des Browsers.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;
    const attribution = deriveAttribution({
      url: window.location.href,
      referrer: document.referrer,
    });
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // sessionStorage kann blockiert sein (Privacy-Modus) — Attribution ist optional.
  }
}

/** Liest die gespeicherte Attribution; undefined, wenn nichts erfasst wurde. */
export function getStoredAttribution(): Attribution | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? parseAttribution(raw) : undefined;
  } catch {
    return undefined;
  }
}
