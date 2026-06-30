// Pluggbarer E-Mail-Versand. Reihenfolge zur Laufzeit:
//   1. RESEND_API_KEY gesetzt  -> Resend
//   2. SMTP_HOST gesetzt       -> nodemailer (SMTP)
//   3. sonst                   -> Log-Fallback (Konsole)
// So bauen und laufen Build/Dev ohne jegliche Secrets.

export interface MailAttachment {
  readonly filename: string;
  readonly content: Buffer;
  readonly contentType?: string;
}

export interface SendMailInput {
  readonly subject: string;
  readonly text: string;
  readonly html: string;
  readonly replyTo?: string;
  readonly attachments?: readonly MailAttachment[];
}

export interface SendMailResult {
  readonly ok: boolean;
  readonly transport: "resend" | "smtp" | "log";
  readonly error?: string;
}

const DEFAULT_TO = "info@st-haustechnik.de";

function recipient(): string {
  return process.env.CONTACT_TO_EMAIL?.trim() || DEFAULT_TO;
}

function sender(): string {
  // Resend/SMTP brauchen eine verifizierte Absenderadresse.
  return process.env.CONTACT_FROM_EMAIL?.trim() || "website@st-haustechnik.de";
}

async function sendViaResend(input: SendMailInput): Promise<SendMailResult> {
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: sender(),
    to: recipient(),
    subject: input.subject,
    text: input.text,
    html: input.html,
    replyTo: input.replyTo,
    attachments: input.attachments?.map((a) => ({
      filename: a.filename,
      content: a.content,
    })),
  });
  if (error) return { ok: false, transport: "resend", error: error.message };
  return { ok: true, transport: "resend" };
}

async function sendViaSmtp(input: SendMailInput): Promise<SendMailResult> {
  // nodemailer ist optional – nur laden, wenn SMTP konfiguriert ist.
  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
  });
  await transporter.sendMail({
    from: sender(),
    to: recipient(),
    subject: input.subject,
    text: input.text,
    html: input.html,
    replyTo: input.replyTo,
    attachments: input.attachments?.map((a) => ({
      filename: a.filename,
      content: a.content,
      contentType: a.contentType,
    })),
  });
  return { ok: true, transport: "smtp" };
}

function sendViaLog(input: SendMailInput): SendMailResult {
  // Entwicklung ohne Secrets: E-Mail in der Konsole protokollieren.
  console.info(
    "\n──────── [Mailer: LOG-Fallback] ────────\n" +
      `An:       ${recipient()}\n` +
      `Von:      ${sender()}\n` +
      `Reply-To: ${input.replyTo ?? "-"}\n` +
      `Betreff:  ${input.subject}\n` +
      (input.attachments?.length
        ? `Anhänge:  ${input.attachments
            .map((a) => `${a.filename} (${a.content.length} B)`)
            .join(", ")}\n`
        : "") +
      `\n${input.text}\n` +
      "────────────────────────────────────────\n",
  );
  return { ok: true, transport: "log" };
}

export async function sendContactEmail(
  input: SendMailInput,
): Promise<SendMailResult> {
  try {
    if (process.env.RESEND_API_KEY) return await sendViaResend(input);
    if (process.env.SMTP_HOST) return await sendViaSmtp(input);
    return sendViaLog(input);
  } catch (err) {
    return {
      ok: false,
      transport: process.env.RESEND_API_KEY
        ? "resend"
        : process.env.SMTP_HOST
          ? "smtp"
          : "log",
      error: err instanceof Error ? err.message : "Unbekannter Fehler",
    };
  }
}
