import {
  FORM_LABELS,
  labelOf,
  labelsOf,
  BUILDING_TYPES,
  YEAR_BANDS,
  HEATING_SYSTEMS,
  HEATPUMP_GOALS,
  CONTACT_TIMES,
  RADIATOR_TYPES,
  BATH_CONDITIONS,
  BATH_ELEMENTS,
  BATH_STYLES,
  BATH_BUDGETS,
  TIMEFRAMES,
  DEVICE_TYPES,
  URGENCIES,
} from "@/domain/forms";
import type { ContactFormPayload } from "./schemas";
import type { Attribution } from "@/lib/tracking/attribution";

export interface BuiltEmail {
  readonly subject: string;
  readonly text: string;
  readonly html: string;
  /** Antwortadresse = E-Mail des Absenders (fehlt bei Telefon-only-Anfragen). */
  readonly replyTo?: string;
}

type Row = readonly [label: string, value: string];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Felder, die jedes Formular gemeinsam hat (Kontaktteil).
 *  E-Mail/Telefon können bei der Schnellanfrage einzeln fehlen. */
function contactRows(p: ContactFormPayload): Row[] {
  const rows: Row[] = [["Name", p.name]];
  if (p.email && p.email.trim().length > 0) rows.push(["E-Mail", p.email]);
  if (p.phone && p.phone.trim().length > 0) rows.push(["Telefon", p.phone]);
  if (p.message && p.message.trim().length > 0) {
    rows.push(["Nachricht", p.message.trim()]);
  }
  return rows;
}

/** Formularspezifische Felder als beschriftete Zeilen. */
function specificRows(p: ContactFormPayload): Row[] {
  switch (p.formType) {
    case "waermepumpe":
      return [
        ["Gebäudetyp", labelOf(BUILDING_TYPES, p.buildingType)],
        ["Baujahr", labelOf(YEAR_BANDS, p.yearBand)],
        ["Wohnfläche", `${p.livingAreaM2} m²`],
        ["Aktuelle Heizung", labelOf(HEATING_SYSTEMS, p.currentHeating)],
        ["Wärmeverteilung", labelOf(RADIATOR_TYPES, p.radiatorType)],
        ["Personen im Haushalt", String(p.occupants)],
        ["Ziele", labelsOf(HEATPUMP_GOALS, p.goals)],
        ["Ort", `${p.addressZip} ${p.addressCity}`],
      ];
    case "schnellanfrage": {
      const rows: Row[] = [
        ["Aktuelle Heizung", labelOf(HEATING_SYSTEMS, p.currentHeating)],
        ["Baujahr (Gebäude)", labelOf(YEAR_BANDS, p.yearBand)],
        ["PLZ", p.addressZip],
      ];
      if (p.contactTime) {
        rows.push(["Beste Erreichbarkeit", labelOf(CONTACT_TIMES, p.contactTime)]);
      }
      return rows;
    }
    case "badplaner":
      return [
        ["Raumgröße", `${p.roomSizeM2} m²`],
        ["Ist-Zustand", labelOf(BATH_CONDITIONS, p.condition)],
        ["Gewünschte Elemente", labelsOf(BATH_ELEMENTS, p.elements)],
        ["Stil", labelOf(BATH_STYLES, p.style)],
        ["Budget", labelOf(BATH_BUDGETS, p.budget)],
        ["Zeitrahmen", labelOf(TIMEFRAMES, p.timeframe)],
        ["Ort", `${p.addressZip} ${p.addressCity}`],
      ];
    case "kundendienst": {
      const rows: Row[] = [
        ["Adresse", `${p.addressStreet}, ${p.addressZip} ${p.addressCity}`],
        ["Anlagentyp", labelOf(DEVICE_TYPES, p.deviceType)],
      ];
      if (p.manufacturer && p.manufacturer.trim().length > 0) {
        rows.push(["Hersteller", p.manufacturer.trim()]);
      }
      rows.push(["Dringlichkeit", labelOf(URGENCIES, p.urgency)]);
      if (p.preferredDate && p.preferredDate.length > 0) {
        rows.push(["Wunschtermin", p.preferredDate]);
      }
      rows.push(["Problembeschreibung", p.problem]);
      return rows;
    }
  }
}

/** Quelle der Anfrage als beschriftete Zeilen (nur wenn Attribution vorliegt). */
function attributionRows(a: Attribution | undefined): Row[] {
  if (!a) return [];
  const rows: Row[] = [["Quelle", a.source]];
  if (a.utmCampaign) rows.push(["Kampagne", a.utmCampaign]);
  if (a.landingPage) rows.push(["Einstiegsseite", a.landingPage]);
  return rows;
}

/**
 * Baut Betreff, Text- und HTML-Body aus einer validierten Formular-Anfrage.
 */
export function buildEmail(
  p: ContactFormPayload,
  attribution?: Attribution,
): BuiltEmail {
  const formLabel = FORM_LABELS[p.formType];
  // CR/LF aus dem Namen entfernen (Header-Injection im Betreff vorbeugen).
  const safeName = p.name.replace(/[\r\n]+/g, " ").trim();
  const subject = `[${formLabel}] Neue Anfrage von ${safeName}`;

  const allRows: Row[] = [
    ...specificRows(p),
    ...contactRows(p),
    ...attributionRows(attribution),
  ];

  const text = [
    `Neue Anfrage über das ${formLabel}-Formular der Website.`,
    "",
    ...allRows.map(([label, value]) => `${label}: ${value}`),
    "",
    "— Automatisch von der Website gesendet.",
  ].join("\n");

  const htmlRows = allRows
    .map(
      ([label, value]) =>
        `<tr>` +
        `<td style="padding:6px 12px;font-weight:600;vertical-align:top;white-space:nowrap;">${escapeHtml(
          label,
        )}</td>` +
        `<td style="padding:6px 12px;">${escapeHtml(value).replace(/\n/g, "<br>")}</td>` +
        `</tr>`,
    )
    .join("");

  const html =
    `<div style="font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;">` +
    `<h2 style="color:#173074;margin:0 0 12px;">Neue Anfrage · ${escapeHtml(
      formLabel,
    )}</h2>` +
    `<table style="border-collapse:collapse;border:1px solid #e5e7eb;">${htmlRows}</table>` +
    `<p style="color:#6b7280;font-size:12px;margin-top:16px;">Automatisch von der Website gesendet.</p>` +
    `</div>`;

  const replyTo =
    p.email && p.email.trim().length > 0 ? p.email.trim() : undefined;
  return { subject, text, html, replyTo };
}
