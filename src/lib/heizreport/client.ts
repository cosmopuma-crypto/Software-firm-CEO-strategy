// Server-seitiger Client für die Heizreport REST API v2.
//
// Auth über Bearer-Token im HTTP-Header. Nur aus Server-Code (API-Routes)
// verwenden – der API-Key darf niemals in den Browser gelangen.

import {
  HEIZREPORT_PATHS,
  heizreportApiKey,
  heizreportUrl,
} from "./config";
import type {
  CreateProjectResult,
  HeizreportProjektData,
  PdfResult,
} from "./types";

const TIMEOUT_MS = 15_000;

interface RequestOptions {
  readonly method: "GET" | "POST" | "PATCH";
  readonly path: string;
  readonly projektKey?: string;
  readonly body?: unknown;
}

/** Führt einen authentifizierten JSON-Request gegen die v2-API aus. */
async function request(opts: RequestOptions): Promise<Record<string, unknown>> {
  const apiKey = heizreportApiKey();
  if (!apiKey) {
    throw new Error("HEIZREPORT_API_KEY ist nicht gesetzt.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(heizreportUrl(opts.path, opts.projektKey), {
      method: opts.method,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
        ...(opts.body != null ? { "Content-Type": "application/json" } : {}),
      },
      body: opts.body != null ? JSON.stringify(opts.body) : undefined,
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Heizreport-API antwortete mit HTTP ${response.status}.`);
    }
    // Manche Endpunkte antworten mit leerem Body (z. B. 204).
    const text = await response.text();
    return text ? (JSON.parse(text) as Record<string, unknown>) : {};
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
  const candidate = res.projektKey ?? res.projectKey ?? res.key ?? res.id;
  return candidate != null && `${candidate}`.length > 0
    ? `${candidate}`
    : undefined;
}

/** Legt ein neues Heizreport-Projekt an und liefert den projektKey zurück. */
export async function createProject(
  data?: HeizreportProjektData,
): Promise<CreateProjectResult> {
  try {
    const res = await request({
      method: "POST",
      path: HEIZREPORT_PATHS.createProject,
      body: data && Object.keys(data).length > 0 ? data : {},
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
    await request({
      method: "PATCH",
      path: HEIZREPORT_PATHS.editProject,
      projektKey,
      body: data,
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: errorMessage(err) };
  }
}

/** Liest die Dokument-URL (linkToDocument) aus einer PDF-Antwort. */
function readDocumentLink(res: Record<string, unknown>): string | undefined {
  const candidate = res.linkToDocument ?? res.link ?? res.url ?? res.pdfUrl;
  return typeof candidate === "string" && candidate.length > 0
    ? candidate
    : undefined;
}

/** Erzeugt/holt das wärmepumpenCHECK-PDF zu einem Projekt. */
export async function getCheckPdf(projektKey: string): Promise<PdfResult> {
  return getPdf(HEIZREPORT_PATHS.checkPdf, projektKey);
}

/** Erzeugt/holt das heizreportKOMPLETT-PDF zu einem Projekt. */
export async function getHeizreportPdf(projektKey: string): Promise<PdfResult> {
  return getPdf(HEIZREPORT_PATHS.reportPdf, projektKey);
}

async function getPdf(path: string, projektKey: string): Promise<PdfResult> {
  try {
    const res = await request({ method: "GET", path, projektKey });
    const linkToDocument = readDocumentLink(res);
    if (!linkToDocument) {
      return { ok: false, error: "Antwort ohne linkToDocument." };
    }
    return { ok: true, linkToDocument };
  } catch (err) {
    return { ok: false, error: errorMessage(err) };
  }
}
