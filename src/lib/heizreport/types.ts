// Typen für die Heizreport REST API v2.
//
// Feldnamen laut offizieller Doku (https://heiz.report/api/v2/docs.html).

/**
 * Über `projektData` setzbare Projektfelder (laut Doku, Abschnitt
 * "Erlaubte Projektfelder"). Die gebräuchlichsten sind explizit typisiert;
 * die Index-Signatur lässt die restlichen zu, ohne sie zu verlieren.
 */
export interface HeizreportProjektData {
  readonly anrede?: string;
  readonly vorname?: string;
  readonly name?: string;
  readonly email?: string;
  readonly telefon?: string;
  readonly strasse?: string;
  readonly hausnummer?: string;
  readonly plz?: string;
  readonly ort?: string;
  readonly bemerkungen?: string;
  readonly projektName?: string;
  readonly projektPostleitzahl?: string;
  readonly projektArtHeizung?: string;
  readonly projektAlterHeizung?: string | number;
  readonly projektBewohner?: string | number;
  readonly projektJahresverbrauch?: string | number;
  readonly projektBaujahr?: string | number;
  readonly projektTrinkwasser?: string;
  readonly [key: string]: string | number | boolean | undefined;
}

/** Vollständige Liste der laut Doku über `projektData` erlaubten Felder. */
export const ALLOWED_PROJEKT_FIELDS = [
  "projektName",
  "projektPostleitzahl",
  "projektArtHeizung",
  "projektAlterHeizung",
  "projektBewohner",
  "projektJahresverbrauch",
  "projektBaujahr",
  "projektTrinkwasser",
  "projektWaermeerzeugerSolarStatus",
  "projektWaermeerzeugerSolarArt",
  "projektKollektorflaecheSolar",
  "projektWaermeerzeugerHolzStatus",
  "projektJahresverbrauchHolz",
  "projektWaermeerzeugerHolzArt",
  "email",
  "anrede",
  "vorname",
  "name",
  "strasse",
  "hausnummer",
  "plz",
  "ort",
  "telefon",
  "bemerkungen",
] as const;

/** Antwort-Header eines Projektes (projektHeader). */
export interface HeizreportProjektHeader {
  readonly key?: string;
  readonly link?: string;
  readonly id?: number;
  readonly status?: number;
}

/** Erfolgreiches Anlegen eines Projektes. */
export interface CreateProjectResult {
  readonly ok: boolean;
  readonly projektKey?: string;
  /** Direkter Report-Link (projektHeader.link), z. B. für iFrame-Einbindung. */
  readonly link?: string;
  readonly error?: string;
}

/** Ergebnis eines PDF-Abrufs (?type=check | heizreport). */
export interface PdfResult {
  readonly ok: boolean;
  /** URL zum erzeugten PDF-Dokument. */
  readonly linkToDocument?: string;
  readonly error?: string;
}

/** Welches Dokument abgerufen werden soll (Query-Wert für ?type=). */
export type HeizreportDocumentType = "check" | "heizreport";

/**
 * Eingehende Webhook-Nutzlast von Heizreport. Laut Doku („Webhook einrichten"):
 * { event: "webhooksave" | "webhookcheck", authenticate: "<Key>", projektKey }.
 * Der Feedsatz kann variieren, deshalb offen typisiert – der Handler liest die
 * relevanten Felder defensiv aus.
 */
export interface HeizreportWebhookPayload {
  /** "webhooksave" (Projekt gespeichert) oder "webhookcheck" (Check erzeugt). */
  readonly event?: string;
  /** Webhook-Auth-Key aus dem Heizreport-Account (Body-Authentifizierung). */
  readonly authenticate?: string;
  readonly projektKey?: string;
  readonly projektHeader?: HeizreportProjektHeader;
  readonly document?: string;
  readonly linkToDocument?: string;
  readonly [key: string]: unknown;
}
