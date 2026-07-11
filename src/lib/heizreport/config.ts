// Zentrale Konfiguration für die Heizreport-API-Anbindung (REST API v2).
//
// Base URL: https://heizreport.net/api/v2
// Auth:     Authorization: Bearer <API-Key>   (+ Accept: application/json)
// Format:   JSON
// Limit:    5 Requests / Sekunde / Token
//
// Alle Secrets kommen aus Umgebungsvariablen – ohne sie bleibt die Anbindung
// inaktiv (die eingebetteten Widgets funktionieren unabhängig davon weiter).
// Quelle: API-Anleitung im Heizreport-Account (heiz.report, /api/v2).

/** Basis-URL der Heizreport REST API v2 (ohne abschließenden Slash). */
export const HEIZREPORT_BASE_URL = (
  process.env.HEIZREPORT_API_URL?.trim() || "https://heizreport.net/api/v2"
).replace(/\/+$/, "");

/**
 * REST-Pfade der v2-API, relativ zur Base URL, an einer Stelle gebündelt.
 *
 * Hinweis: Die exakten Ressourcenpfade sind hier zentral anpassbar, falls die
 * API-Anleitung abweichende Namen verwendet. `{key}` wird durch den projektKey
 * ersetzt.
 */
export const HEIZREPORT_PATHS = {
  /** Neues Projekt anlegen (POST) – Response enthält den projektKey. */
  createProject: "/projects",
  /** Projektdaten setzen / vorausfüllen (PATCH /projects/{key}). */
  editProject: "/projects/{key}",
  /** wärmepumpenCHECK-PDF (GET /projects/{key}/check-pdf). */
  checkPdf: "/projects/{key}/check-pdf",
  /** heizreportKOMPLETT-PDF (GET /projects/{key}/report-pdf). */
  reportPdf: "/projects/{key}/report-pdf",
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
