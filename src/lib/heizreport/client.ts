// Server-seitiger Client für die Heizreport REST API v2.
//
// Auth über Bearer-Token im HTTP-Header. Nur aus Server-Code (API-Routes)
// verwenden – der API-Key darf niemals in den Browser gelangen.
// Doku: https://heiz.report/api/v2/docs.html

import {
  HEIZREPORT_PATHS,
  heizreportApiKey,
  heizreportUrl,
} from "./config";
import type {
  CreateProjectResult,
  HeizreportDocumentType,
  HeizreportProjektData,
  HeizreportProjektHeader,
  PdfResult,
} from "./types";

// Muss deutlich unter dem Vercel-Function-Limit (10 s auf Hobby) bleiben,
// da der Webhook-Handler dieses Timeout synchron abwartet (PDF-Nachladen).
const TIMEOUT_MS = 7_000;

interface RequestOptions {
  readonly method: "GET" | "POST" | "PATCH" | "PUT";
  readonly url: string;
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
    const response = await fetch(opts.url, {
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

    // Fehler kommen laut Doku als JSON mit { status, error, details }.
    const text = await response.text();
    const json = text ? (JSON.parse(text) as Record<string, unknown>) : {};
    if (!response.ok) {
      const message =
        typeof json.error === "string"
          ? json.error
          : `Heizreport-API antwortete mit HTTP ${response.status}.`;
      throw new Error(message);
    }
    return json;
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

/** Liest den projektHeader aus einer Antwort. */
function readHeader(res: Record<string, unknown>): HeizreportProjektHeader {
  const header = res.projektHeader;
  return header && typeof header === "object"
    ? (header as HeizreportProjektHeader)
    : {};
}

/**
 * Legt ein neues Heizreport-Projekt an und liefert projektKey + Report-Link.
 * Sind bereits Daten vorhanden, wird direkt /reports/with-data genutzt.
 */
export async function createProject(
  data?: HeizreportProjektData,
): Promise<CreateProjectResult> {
  const hasData = data != null && Object.keys(data).length > 0;
  try {
    const res = await request({
      method: "POST",
      url: heizreportUrl(
        hasData
          ? HEIZREPORT_PATHS.createReportWithData
          : HEIZREPORT_PATHS.createReport,
      ),
      body: hasData ? { projektData: data } : undefined,
    });
    const header = readHeader(res);
    if (!header.key) {
      return { ok: false, error: "Antwort ohne projektHeader.key." };
    }
    return { ok: true, projektKey: header.key, link: header.link };
  } catch (err) {
    return { ok: false, error: errorMessage(err) };
  }
}

/** Aktualisiert bzw. füllt Projektdaten eines bestehenden Projektes. */
export async function prefillProject(
  projektKey: string,
  data: HeizreportProjektData,
): Promise<{ ok: boolean; error?: string }> {
  try {
    await request({
      method: "PATCH",
      url: heizreportUrl(HEIZREPORT_PATHS.editReport, projektKey),
      body: { projektData: data },
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: errorMessage(err) };
  }
}

/** Liest die Dokument-URL aus einer PDF-Antwort (defensiv über mehrere Felder). */
function readDocumentLink(res: Record<string, unknown>): string | undefined {
  const header = readHeader(res);
  const candidate =
    res.linkToDocument ?? res.link ?? res.url ?? res.pdf ?? header.link;
  return typeof candidate === "string" && candidate.length > 0
    ? candidate
    : undefined;
}

/** Erzeugt/holt das wärmepumpenCHECK-PDF zu einem Projekt. */
export async function getCheckPdf(projektKey: string): Promise<PdfResult> {
  return getPdf(projektKey, "check");
}

/** Erzeugt/holt das heizreportKOMPLETT-PDF zu einem Projekt. */
export async function getHeizreportPdf(projektKey: string): Promise<PdfResult> {
  return getPdf(projektKey, "heizreport");
}

async function getPdf(
  projektKey: string,
  type: HeizreportDocumentType,
): Promise<PdfResult> {
  try {
    const url = `${heizreportUrl(HEIZREPORT_PATHS.pdf, projektKey)}?type=${type}`;
    const res = await request({ method: "GET", url });
    const linkToDocument = readDocumentLink(res);
    if (!linkToDocument) {
      return { ok: false, error: "Antwort ohne PDF-Link." };
    }
    return { ok: true, linkToDocument };
  } catch (err) {
    return { ok: false, error: errorMessage(err) };
  }
}
