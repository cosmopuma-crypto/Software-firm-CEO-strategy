// Typen für die Heizreport-API-Anbindung.
//
// Die Feldnamen folgen der Heizreport-Doku
// (https://heizreport.com/hilfethemen/schnittstellen). Optionale Felder sind
// bewusst großzügig gehalten, damit unbekannte Zusatzfelder nicht verloren gehen.

/** Bekannte Adress-/Projektdaten, mit denen ein Projekt vorausgefüllt wird. */
export interface HeizreportProjektData {
  readonly vorname?: string;
  readonly name?: string;
  readonly email?: string;
  readonly telefon?: string;
  readonly projektName?: string;
  readonly projektStrasse?: string;
  readonly projektPostleitzahl?: string;
  readonly projektOrt?: string;
  readonly projektBaujahr?: string | number;
  readonly projektBewohner?: string | number;
  /** Weitere von Heizreport unterstützte Felder (z. B. Heizungstyp, Verbrauch). */
  readonly [key: string]: string | number | boolean | undefined;
}

/** Erfolgreiches Anlegen eines Projektes. */
export interface CreateProjectResult {
  readonly ok: boolean;
  readonly projektKey?: string;
  readonly error?: string;
}

/** Ergebnis eines PDF-Abrufs (getCheckPDF / getHeizreportPDF). */
export interface PdfResult {
  readonly ok: boolean;
  /** Direkte URL zum erzeugten PDF-Dokument (linkToDocument). */
  readonly linkToDocument?: string;
  readonly error?: string;
}

/** Welches Dokument die Anbindung abrufen soll. */
export type HeizreportDocument = "check" | "komplett";

/**
 * Eingehende Webhook-Nutzlast von Heizreport.
 *
 * Heizreport sendet beim Abschluss des Formulars ein JSON-Event. Der genaue
 * Feldsatz kann je nach Formular variieren, deshalb ist das Objekt offen
 * typisiert – der Handler liest die relevanten Felder defensiv aus.
 */
export interface HeizreportWebhookPayload {
  readonly projektKey?: string;
  readonly document?: string;
  readonly linkToDocument?: string;
  readonly [key: string]: unknown;
}
