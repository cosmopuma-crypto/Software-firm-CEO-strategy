// Empfänger für Heizreport-Webhooks.
//
// Heizreport ruft diese Route auf, sobald ein Kunde den Wärmepumpen-Check /
// heizreportKOMPLETT abgeschlossen hat. Wir verifizieren ein gemeinsames
// Secret, holen bei Bedarf die PDF-URL nach und benachrichtigen das Team per
// E-Mail (info@st-haustechnik.de über den bestehenden Mailer).
//
// Laut Heizreport-Doku („Webhook einrichten") feuert der Webhook, sobald der
// Kunde im Widget „speichern" oder „check starten" klickt – ggf. mehrfach pro
// Projekt. Gesendet wird ein JSON der Form:
//   { "event": "webhooksave" | "webhookcheck",
//     "authenticate": "<Webhook-Auth-Key>",
//     "projektKey": "xxxxxxxxx" }
// Der Auth-Key steht also IM BODY (Feld `authenticate`); zusätzlich
// akzeptieren wir Bearer-/Header-/Query-Varianten. Im Heizreport-Account:
//   Webhook-Adresse: https://<domain>/api/heizreport/webhook
//   Webhook Auth:    <HEIZREPORT_WEBHOOK_SECRET>

import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/forms/mailer";
import { getCheckPdf, getHeizreportPdf } from "@/lib/heizreport/client";
import {
  heizreportWebhookSecret,
  isHeizreportConfigured,
} from "@/lib/heizreport/config";
import type { HeizreportWebhookPayload } from "@/lib/heizreport/types";
import { logLeadEvent } from "@/lib/tracking/lead-log";

export const runtime = "nodejs";

/**
 * Verifiziert den Webhook-Auth-Key. Heizreport sendet ihn laut Doku im
 * JSON-Body als Feld `authenticate`; zusätzlich akzeptieren wir einen
 * Bearer-Header, `x-heizreport-secret` und `?secret=` (manuelle Tests).
 */
function isAuthorized(
  request: Request,
  payload: HeizreportWebhookPayload,
): boolean {
  const expected = heizreportWebhookSecret();
  // Ohne konfiguriertes Secret akzeptieren wir keine Webhooks (fail closed).
  if (!expected) return false;
  const bearer = request.headers
    .get("authorization")
    ?.replace(/^Bearer\s+/i, "")
    .trim();
  const header = request.headers.get("x-heizreport-secret")?.trim();
  const query = new URL(request.url).searchParams.get("secret")?.trim();
  const body =
    typeof payload.authenticate === "string"
      ? payload.authenticate.trim()
      : undefined;
  return (
    bearer === expected ||
    header === expected ||
    query === expected ||
    body === expected
  );
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function readProjektKey(payload: HeizreportWebhookPayload): string | undefined {
  return (
    asString(payload.projektKey) ??
    asString(payload.projektHeader?.key) ??
    asString((payload as Record<string, unknown>).projectKey) ??
    asString((payload as Record<string, unknown>).key)
  );
}

/** Ermittelt die PDF-URL: direkt aus dem Payload oder per API nachgeladen. */
async function resolvePdfLink(
  payload: HeizreportWebhookPayload,
  projektKey: string | undefined,
): Promise<string | undefined> {
  const direct = asString(payload.linkToDocument);
  if (direct) return direct;
  if (!projektKey || !isHeizreportConfigured()) return undefined;

  const wantsKomplett = asString(payload.document)
    ?.toLowerCase()
    .includes("komplett");
  const result = wantsKomplett
    ? await getHeizreportPdf(projektKey)
    : await getCheckPdf(projektKey);
  return result.ok ? result.linkToDocument : undefined;
}

function buildNotification(
  payload: HeizreportWebhookPayload,
  projektKey: string | undefined,
  pdfLink: string | undefined,
) {
  // Kunde kann mehrfach speichern → Event mit ausweisen (webhooksave = nur
  // gespeichert, webhookcheck = Check erzeugt). Auth-Key nie in die Mail.
  const event = asString(payload.event);
  const sanitized: Record<string, unknown> = { ...payload };
  delete sanitized.authenticate;

  const subject = `Neuer Heizreport-Lead${projektKey ? ` (${projektKey})` : ""}${
    event === "webhooksave" ? " – Projekt gespeichert" : ""
  }`;
  const pretty = JSON.stringify(sanitized, null, 2);
  const text =
    `Ein Wärmepumpen-Check wurde über die Website abgeschlossen.\n\n` +
    (projektKey ? `Projekt-Key: ${projektKey}\n` : "") +
    (event ? `Event: ${event}\n` : "") +
    (pdfLink ? `PDF-Dokument: ${pdfLink}\n` : "") +
    `\nHinweis: Derselbe Projekt-Key kann mehrfach eintreffen, wenn der Kunde ` +
    `seine Angaben erneut speichert.\n` +
    `\nVollständige Daten:\n${pretty}\n`;
  const html =
    `<h2>Neuer Heizreport-Lead</h2>` +
    (projektKey ? `<p><strong>Projekt-Key:</strong> ${projektKey}</p>` : "") +
    (event ? `<p><strong>Event:</strong> ${event}</p>` : "") +
    (pdfLink
      ? `<p><strong>PDF-Dokument:</strong> <a href="${pdfLink}">${pdfLink}</a></p>`
      : "") +
    `<pre style="white-space:pre-wrap;font-family:monospace">${pretty
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")}</pre>`;
  return { subject, text, html };
}

export async function POST(request: Request) {
  // Body zuerst parsen – der Auth-Key steckt laut Heizreport-Doku im JSON.
  let payload: HeizreportWebhookPayload;
  try {
    payload = (await request.json()) as HeizreportWebhookPayload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Ungültiges JSON." },
      { status: 400 },
    );
  }

  if (!isAuthorized(request, payload)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const projektKey = readProjektKey(payload);
  const pdfLink = await resolvePdfLink(payload, projektKey);
  const mail = buildNotification(payload, projektKey, pdfLink);

  // Kunden-E-Mail steht top-level oder (v2) unter projektData.email.
  const projektData = payload.projektData as Record<string, unknown> | undefined;
  const customerEmail =
    asString(payload.email) ?? asString(projektData?.email);

  const sent = await sendContactEmail({
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
    replyTo: customerEmail,
  });

  // Webhook-Sender erwarten i. d. R. 2xx, sonst wird erneut zugestellt.
  // Selbst wenn die Mail scheitert, bestätigen wir den Empfang und loggen den Fehler.
  if (!sent.ok) {
    console.error("[heizreport-webhook] Mailversand fehlgeschlagen:", sent.error);
  }

  // Lead-Log: abgeschlossene Heizreport-Checks zählen mit (wirft nie).
  await logLeadEvent({ formType: "heizreport" });

  return NextResponse.json({ ok: true, projektKey: projektKey ?? null });
}
