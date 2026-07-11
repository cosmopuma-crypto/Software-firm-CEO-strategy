// Zentrale Konfiguration für die Heizreport-API-Anbindung.
//
// Alle Secrets kommen aus Umgebungsvariablen – ohne sie bleibt die Anbindung
// inaktiv (die Widgets funktionieren unabhängig davon weiter). So laufen
// Build/Dev auch ohne Zugangsdaten.
//
// Quelle des API-Contracts: https://heizreport.com/hilfethemen/schnittstellen

/** Basis-URL der Heizreport-API (JSON per POST, Content-Type: application/json). */
export const HEIZREPORT_ENDPOINT =
  process.env.HEIZREPORT_API_URL?.trim() || "https://heizreport.de/api/";

/** API-Version laut Doku (aktuell 1). */
export const HEIZREPORT_VERSION = Number(process.env.HEIZREPORT_API_VERSION ?? 1);

/**
 * Action-Namen der Heizreport-API an einer Stelle gebündelt.
 * Falls Heizreport einen Namen anders benennt, hier zentral anpassbar.
 */
export const HEIZREPORT_ACTIONS = {
  /** Neues Projekt anlegen – Response enthält den 9-stelligen projektKey. */
  createProject: "createProject",
  /** Projektdaten setzen / Projekt vorausfüllen. */
  editReportData: "editReportData",
  /** wärmepumpenCHECK-PDF erzeugen/abrufen. */
  getCheckPdf: "getCheckPDF",
  /** heizreportKOMPLETT-PDF erzeugen/abrufen. */
  getHeizreportPdf: "getHeizreportPDF",
} as const;

/** API-Key aus dem Heizreport-Account (Einstellungen → Schnittstellen). */
export function heizreportApiKey(): string | undefined {
  return process.env.HEIZREPORT_API_KEY?.trim() || undefined;
}

/**
 * Gemeinsames Secret zur Verifikation eingehender Webhooks.
 * Wird als `x-heizreport-secret`-Header (oder `?secret=`-Query) erwartet.
 */
export function heizreportWebhookSecret(): string | undefined {
  return process.env.HEIZREPORT_WEBHOOK_SECRET?.trim() || undefined;
}

/** True, wenn ein API-Key hinterlegt ist und die Anbindung genutzt werden kann. */
export function isHeizreportConfigured(): boolean {
  return Boolean(heizreportApiKey());
}
