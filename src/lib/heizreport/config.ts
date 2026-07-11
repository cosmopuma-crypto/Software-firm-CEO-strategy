// Zentrale Konfiguration für die Heizreport REST API v2.
//
// Base URL: https://heizreport.net/api/v2
// Auth:     Authorization: Bearer <API-Key>   (+ Accept: application/json)
// Format:   JSON
// Limit:    5 Requests / Sekunde / Token
// Doku:     https://heiz.report/api/v2/docs.html
//
// Alle Secrets kommen aus Umgebungsvariablen – ohne sie bleibt die Anbindung
// inaktiv (die eingebetteten Widgets funktionieren unabhängig davon weiter).

/** Basis-URL der Heizreport REST API v2 (ohne abschließenden Slash). */
export const HEIZREPORT_BASE_URL = (
  process.env.HEIZREPORT_API_URL?.trim() || "https://heizreport.net/api/v2"
).replace(/\/+$/, "");

/** REST-Pfade der v2-API, relativ zur Base URL. `{key}` = 9-stelliger projektKey. */
export const HEIZREPORT_PATHS = {
  /** Healthcheck (ohne Auth). */
  health: "/health",
  /** Leeres Projekt anlegen (POST). */
  createReport: "/reports",
  /** Projekt anlegen und direkt Daten schreiben (POST, Body: { projektData }). */
  createReportWithData: "/reports/with-data",
  /** Projektdaten aktualisieren (PATCH, Body: { projektData }). */
  editReport: "/reports/{key}",
  /** PDF-Link erzeugen (GET, Query ?type=heizreport|check). */
  pdf: "/reports/{key}/pdf",
} as const;

/** Baut eine absolute URL aus Base URL, Pfad-Template und projektKey. */
export function heizreportUrl(pathTemplate: string, projektKey?: string): string {
  const path = projektKey
    ? pathTemplate.replace("{key}", encodeURIComponent(projektKey))
    : pathTemplate;
  return `${HEIZREPORT_BASE_URL}${path}`;
}

/** API-Key aus dem Heizreport-Account (Einstellungen → API-Schnittstelle). */
export function heizreportApiKey(): string | undefined {
  return process.env.HEIZREPORT_API_KEY?.trim() || undefined;
}

/**
 * Bearer-Token, mit dem Heizreport ausgehende Webhooks signiert
 * (Einstellungen → Webhook Auth). Wird im `Authorization: Bearer …`-Header
 * des eingehenden Webhook-Requests erwartet.
 */
export function heizreportWebhookSecret(): string | undefined {
  return process.env.HEIZREPORT_WEBHOOK_SECRET?.trim() || undefined;
}

/** True, wenn ein API-Key hinterlegt ist und die Anbindung genutzt werden kann. */
export function isHeizreportConfigured(): boolean {
  return Boolean(heizreportApiKey());
}
