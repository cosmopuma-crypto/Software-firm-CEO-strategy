// Diagnose-Endpunkt für den Betreiber (per Browser aufrufbar).
//
// Zweck: E-Mail-/Integrations-Konfiguration in Produktion prüfen, ohne im
// Vercel-Dashboard graben zu müssen.
//
//   GET /api/diagnose?key=<HEIZREPORT_WEBHOOK_SECRET>          → Konfig-Status
//   GET /api/diagnose?key=<HEIZREPORT_WEBHOOK_SECRET>&send=1   → sendet Test-Mail
//
// Sicherheit: fail closed – ohne gesetztes HEIZREPORT_WEBHOOK_SECRET oder mit
// falschem key immer 401. Es werden nur Booleans/Hinweise zurückgegeben,
// niemals Secret-Werte. Antwortet 401 obwohl der key stimmt? Dann ist das
// Secret in dieser Deployment-Umgebung nicht (mehr) gesetzt → redeployen.

import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/forms/mailer";
import { heizreportWebhookSecret } from "@/lib/heizreport/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isSet(name: string): boolean {
  return Boolean(process.env[name]?.trim());
}

// Diagnose-Antworten dürfen nie aus dem (Browser-)Cache kommen.
const NO_STORE = { "Cache-Control": "no-store, max-age=0" };

export async function GET(request: Request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key")?.trim();
  const expected = heizreportWebhookSecret();
  if (!expected || !key || key !== expected) {
    return NextResponse.json(
      {
        ok: false,
        hinweis:
          "Nicht autorisiert. Wenn der key sicher stimmt: HEIZREPORT_WEBHOOK_SECRET ist in diesem Deployment nicht aktiv → Env-Var prüfen und redeployen.",
      },
      { status: 401, headers: NO_STORE },
    );
  }

  const transport = isSet("RESEND_API_KEY")
    ? "resend"
    : isSet("SMTP_HOST")
      ? "smtp"
      : "log";

  const config = {
    mailTransport: transport,
    resendKeyGesetzt: isSet("RESEND_API_KEY"),
    smtp: {
      hostGesetzt: isSet("SMTP_HOST"),
      portWert: process.env.SMTP_PORT ?? "(leer → 587)",
      userGesetzt: isSet("SMTP_USER"),
      passGesetzt: isSet("SMTP_PASS"),
      secureWert: process.env.SMTP_SECURE ?? "(leer → false)",
    },
    empfaenger: process.env.CONTACT_TO_EMAIL ?? "(leer → info@st-haustechnik.de)",
    absender: process.env.CONTACT_FROM_EMAIL ?? "(leer → website@st-haustechnik.de)",
    heizreportApiKeyGesetzt: isSet("HEIZREPORT_API_KEY"),
    webhookSecretGesetzt: true, // sonst wären wir nicht hier
    hinweis:
      transport === "log"
        ? "ACHTUNG: Kein Mail-Transport konfiguriert – Anfragen landen nur im Server-Log!"
        : `Mail-Versand läuft über ${transport}.`,
  };

  if (url.searchParams.get("send") !== "1") {
    return NextResponse.json(
      { ok: true, zeitpunkt: new Date().toISOString(), ...config },
      { headers: NO_STORE },
    );
  }

  // Test-Mail wirklich senden – Ergebnis (inkl. echter Fehlermeldung) zurückgeben.
  const sent = await sendContactEmail({
    subject: "Diagnose: Test-Mail der Website",
    text: "Dies ist eine Test-Mail vom Diagnose-Endpunkt. Kommt sie an, funktioniert der Mail-Versand.",
    html: "<p>Dies ist eine <strong>Test-Mail</strong> vom Diagnose-Endpunkt. Kommt sie an, funktioniert der Mail-Versand.</p>",
  });

  return NextResponse.json(
    {
      ok: sent.ok,
      zeitpunkt: new Date().toISOString(),
      testMail: {
        gesendetUeber: sent.transport,
        erfolgreich: sent.ok,
        fehler: sent.error ?? null,
      },
      ...config,
    },
    { status: sent.ok ? 200 : 502, headers: NO_STORE },
  );
}
