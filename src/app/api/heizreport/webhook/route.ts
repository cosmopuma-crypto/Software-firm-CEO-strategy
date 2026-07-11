// Empfänger für Heizreport-Webhooks.
//
// Heizreport ruft diese Route auf, sobald ein Kunde den Wärmepumpen-Check /
// heizreportKOMPLETT abgeschlossen hat. Wir verifizieren ein gemeinsames
// Secret, holen bei Bedarf die PDF-URL nach und benachrichtigen das Team per
// E-Mail (info@st-haustechnik.de über den bestehenden Mailer).
//
// Heizreport signiert ausgehende Webhooks mit einem Bearer-Token
// (Einstellungen → Webhook Auth). Im Heizreport-Account hinterlegen:
//   Webhook-Adresse: https://<domain>/api/heizreport/webhook
//   Webhook Auth:    Bearer <HEIZREPORT_WEBHOOK_SECRET>

import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/forms/mailer";
import { getCheckPdf, getHeizreportPdf } from "@/lib/heizreport/client";
import {
  heizreportWebhookSecret,
  isHeizreportConfigured,
} from "@/lib/heizreport/config";
import type { HeizreportWebhookPayload } from "@/lib/heizreport/types";

export const runtime = "nodejs";

/**
 * Verifiziert den von Heizreport gesendeten Bearer-Token.
 * Zusätzlich werden ein `x-heizreport-secret`-Header und ein `?secret=`-Query
 * akzeptiert (praktisch für manuelle Tests), primär ist aber der Bearer-Token.
 */
function isAuthorized(request: Request): boolean {
  const expected = heizreportWebhookSecret();
  // Ohne konfiguriertes Secret akzeptieren wir keine Webhooks (fail closed).
  if (!expected) return false;
  const bearer = request.headers
    .get("authorization")
    ?.replace(/^Bearer\s+/i, "")
    .trim();
  const header = request.headers.get("x-heizreport-secret")?.trim();
  const query = new URL(request.url).searchParams.get("secret")?.trim();
  return bearer === expected || header === expected || query === expected;
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function readProjektKey(payload: HeizreportWebhookPayload): string | undefined {
  return (
    asString(payload.projektKey) ??
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
  const subject = `Neuer Heizreport-Lead${projektKey ? ` (${projektKey})` : ""}`;
  const pretty = JSON.stringify(payload, null, 2);
  const text =
    `Ein Wärmepumpen-Check wurde über die Website abgeschlossen.\n\n` +
    (projektKey ? `Projekt-Key: ${projektKey}\n` : "") +
    (pdfLink ? `PDF-Dokument: ${pdfLink}\n` : "") +
    `\nVollständige Daten:\n${pretty}\n`;
  const html =
    `<h2>Neuer Heizreport-Lead</h2>` +
    (projektKey ? `<p><strong>Projekt-Key:</strong> ${projektKey}</p>` : "") +
    (pdfLink
      ? `<p><strong>PDF-Dokument:</strong> <a href="${pdfLink}">${pdfLink}</a></p>`
      : "") +
    `<pre style="white-space:pre-wrap;font-family:monospace">${pretty
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")}</pre>`;
  return { subject, text, html };
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let payload: HeizreportWebhookPayload;
  try {
    payload = (await request.json()) as HeizreportWebhookPayload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Ungültiges JSON." },
      { status: 400 },
    );
  }

  const projektKey = readProjektKey(payload);
  const pdfLink = await resolvePdfLink(payload, projektKey);
  const mail = buildNotification(payload, projektKey, pdfLink);

  const sent = await sendContactEmail({
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
    replyTo: asString(payload.email as unknown),
  });

  // Webhook-Sender erwarten i. d. R. 2xx, sonst wird erneut zugestellt.
  // Selbst wenn die Mail scheitert, bestätigen wir den Empfang und loggen den Fehler.
  if (!sent.ok) {
    console.error("[heizreport-webhook] Mailversand fehlgeschlagen:", sent.error);
  }

  return NextResponse.json({ ok: true, projektKey: projektKey ?? null });
}
