import { NextResponse } from "next/server";
import { contactFormSchema, flattenErrors, HONEYPOT_FIELD } from "@/lib/forms/schemas";
import { buildEmail } from "@/lib/forms/email-template";
import { sendContactEmail, type MailAttachment } from "@/lib/forms/mailer";
import { parseAttribution } from "@/lib/tracking/attribution";
import { logLeadEvent } from "@/lib/tracking/lead-log";

export const runtime = "nodejs";

const MAX_FILES = 3;
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

// Einfaches In-Memory-Rate-Limit (Best-Effort pro Instanz, gegen Spam/Missbrauch).
// Für mehrere Instanzen langfristig durch einen geteilten Store (z. B. Upstash) ersetzen.
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 Minuten
const RATE_MAX = 6; // max. Anfragen pro IP/Fenster
const rateHits = new Map<string, { start: number; count: number }>();

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  if (rateHits.size > 5000) rateHits.clear(); // unbegrenztes Wachstum verhindern
  const entry = rateHits.get(ip);
  if (!entry || now - entry.start > RATE_WINDOW_MS) {
    rateHits.set(ip, { start: now, count: 1 });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_MAX;
}

interface ParsedBody {
  data: Record<string, unknown>;
  files: File[];
}

/** Liest Body als JSON oder multipart/form-data und normalisiert ihn. */
async function parseBody(request: Request): Promise<ParsedBody> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    const data: Record<string, unknown> = {};
    const files: File[] = [];

    for (const [key, value] of form.entries()) {
      if (value instanceof File) {
        if (value.size > 0) files.push(value);
        continue;
      }
      if (key === "consent") {
        data[key] = value === "true" || value === "on" || value === "1";
      } else {
        data[key] = value;
      }
    }
    return { data, files };
  }

  const json = (await request.json()) as Record<string, unknown>;
  return { data: json, files: [] };
}

function validateFiles(files: File[]): string | null {
  if (files.length > MAX_FILES) {
    return `Bitte lade höchstens ${MAX_FILES} Dateien hoch.`;
  }
  for (const file of files) {
    if (file.size > MAX_FILE_BYTES) {
      return `„${file.name}" ist zu groß (max. 5 MB).`;
    }
    if (file.type && !ALLOWED_TYPES.includes(file.type)) {
      return `„${file.name}" hat ein nicht erlaubtes Format (nur JPG, PNG, WebP, PDF).`;
    }
  }
  return null;
}

export async function POST(request: Request) {
  // 0) Rate-Limit gegen Spam / Missbrauch des Mailversands
  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { ok: false, message: "Zu viele Anfragen. Bitte versuche es später erneut." },
      { status: 429 },
    );
  }

  let parsed: ParsedBody;
  try {
    parsed = await parseBody(request);
  } catch {
    return NextResponse.json(
      { ok: false, message: "Ungültige Anfrage." },
      { status: 400 },
    );
  }

  const { data, files } = parsed;

  // 1) Honeypot: gefülltes verstecktes Feld => stiller Erfolg, keine Mail.
  const honeypot = data[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // 2) Validierung
  const result = contactFormSchema.safeParse(data);
  if (!result.success) {
    return NextResponse.json(
      { ok: false, errors: flattenErrors(result.error) },
      { status: 400 },
    );
  }

  // 3) Datei-Prüfung (nur Kundendienst liefert Dateien)
  const fileError = validateFiles(files);
  if (fileError) {
    return NextResponse.json(
      { ok: false, errors: { files: fileError } },
      { status: 400 },
    );
  }

  // 4) E-Mail bauen + senden (inkl. Quellen-Attribution, falls mitgeschickt)
  const attribution = parseAttribution(data.attribution);
  const email = buildEmail(result.data, attribution);

  const attachments: MailAttachment[] = await Promise.all(
    files.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type || undefined,
    })),
  );

  const sent = await sendContactEmail({
    subject: email.subject,
    text: email.text,
    html: email.html,
    replyTo: email.replyTo,
    attachments: attachments.length ? attachments : undefined,
  });

  if (!sent.ok) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Die Anfrage konnte gerade nicht gesendet werden. Bitte versuche es später erneut oder ruf uns an.",
      },
      { status: 502 },
    );
  }

  // 5) Lead-Log (wirft nie — ein Log-Fehler lässt die Anfrage nicht scheitern)
  await logLeadEvent({ formType: result.data.formType, attribution });

  return NextResponse.json({ ok: true });
}
