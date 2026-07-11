// Server-seitiger Client für die Heizreport-API.
//
// Alle Requests sind POST mit JSON-Body an HEIZREPORT_ENDPOINT. Jeder Body
// enthält mindestens `version`, `apikey` und `action`. Nur aus Server-Code
// (API-Routes) verwenden – der API-Key darf niemals in den Browser gelangen.

import {
  HEIZREPORT_ACTIONS,
  HEIZREPORT_ENDPOINT,
  HEIZREPORT_VERSION,
  heizreportApiKey,
} from "./config";
import type {
  CreateProjectResult,
  HeizreportProjektData,
  PdfResult,
} from "./types";

const TIMEOUT_MS = 15_000;

/** Sendet einen JSON-Request an die Heizreport-API und parst die Antwort. */
async function post(
  action: string,
  body: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const apikey = heizreportApiKey();
  if (!apikey) {
    throw new Error("HEIZREPORT_API_KEY ist nicht gesetzt.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(HEIZREPORT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        version: HEIZREPORT_VERSION,
        apikey,
        action,
        ...body,
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Heizreport-API antwortete mit HTTP ${response.status}.`);
    }
    return (await response.json()) as Record<string, unknown>;
  } finally {
    clearTimeout(timeout);
  }
}

function errorMessage(err: unknown): string {
  if (err instanceof DOMException && err.name === "AbortError") {
    return "Zeitüberschreitung bei der Heizreport-API.";
  }
  return err instanceof Error ? err.message : "Unbekannter Fehler.";
}

/** Extrahiert einen projektKey aus verschiedenen möglichen Antwortfeldern. */
function readProjektKey(res: Record<string, unknown>): string | undefined {
  const candidate = res.projektKey ?? res.projectKey ?? res.key;
  return typeof candidate === "string" && candidate.length > 0
    ? candidate
    : undefined;
}

/** Legt ein neues Heizreport-Projekt an und liefert den projektKey zurück. */
export async function createProject(
  data?: HeizreportProjektData,
): Promise<CreateProjectResult> {
  try {
    const res = await post(HEIZREPORT_ACTIONS.createProject, {
      projektData: data ?? {},
    });
    const projektKey = readProjektKey(res);
    if (!projektKey) {
      return { ok: false, error: "Antwort ohne projektKey." };
    }
    return { ok: true, projektKey };
  } catch (err) {
    return { ok: false, error: errorMessage(err) };
  }
}

/** Setzt bzw. füllt Projektdaten eines bestehenden Projektes voraus. */
export async function prefillProject(
  projektKey: string,
  data: HeizreportProjektData,
): Promise<{ ok: boolean; error?: string }> {
  try {
    await post(HEIZREPORT_ACTIONS.editReportData, {
      projektKey,
      projektData: data,
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: errorMessage(err) };
  }
}

/** Ruft die URL zum linkToDocument aus einer PDF-Antwort ab. */
function readDocumentLink(res: Record<string, unknown>): string | undefined {
  const candidate = res.linkToDocument ?? res.link ?? res.url;
  return typeof candidate === "string" && candidate.length > 0
    ? candidate
    : undefined;
}

/** Erzeugt/holt das wärmepumpenCHECK-PDF zu einem Projekt. */
export async function getCheckPdf(projektKey: string): Promise<PdfResult> {
  return getPdf(HEIZREPORT_ACTIONS.getCheckPdf, projektKey);
}

/** Erzeugt/holt das heizreportKOMPLETT-PDF zu einem Projekt. */
export async function getHeizreportPdf(projektKey: string): Promise<PdfResult> {
  return getPdf(HEIZREPORT_ACTIONS.getHeizreportPdf, projektKey);
}

async function getPdf(action: string, projektKey: string): Promise<PdfResult> {
  try {
    const res = await post(action, { projektKey });
    const linkToDocument = readDocumentLink(res);
    if (!linkToDocument) {
      return { ok: false, error: "Antwort ohne linkToDocument." };
    }
    return { ok: true, linkToDocument };
  } catch (err) {
    return { ok: false, error: errorMessage(err) };
  }
}
