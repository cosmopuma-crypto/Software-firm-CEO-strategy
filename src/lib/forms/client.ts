// Client-seitiger Helfer zum Absenden der Formulare an /api/contact.

export interface SubmitResult {
  readonly ok: boolean;
  readonly errors?: Record<string, string>;
  readonly message?: string;
}

export async function submitContact(
  body: Record<string, unknown> | FormData,
): Promise<SubmitResult> {
  try {
    const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: isFormData ? undefined : { "Content-Type": "application/json" },
      body: isFormData ? body : JSON.stringify(body),
    });

    const json = (await res.json().catch(() => ({}))) as SubmitResult;
    if (!res.ok) {
      return {
        ok: false,
        errors: json.errors,
        message:
          json.message ??
          "Es ist ein Fehler aufgetreten. Bitte prüfe deine Eingaben.",
      };
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      message:
        "Verbindungsfehler. Bitte prüfe deine Internetverbindung und versuch es erneut.",
    };
  }
}
