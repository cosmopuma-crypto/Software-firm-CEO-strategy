// Client-seitiger Helfer zum Absenden der Formulare an /api/contact.

import { getStoredAttribution } from "@/lib/tracking/attribution";

export interface SubmitResult {
  readonly ok: boolean;
  readonly errors?: Record<string, string>;
  readonly message?: string;
}

/** Hängt die erfasste Quellen-Attribution an den Request an (falls vorhanden). */
function withAttribution(
  body: Record<string, unknown> | FormData,
): Record<string, unknown> | FormData {
  const attribution = getStoredAttribution();
  if (!attribution) return body;
  if (typeof FormData !== "undefined" && body instanceof FormData) {
    body.set("attribution", JSON.stringify(attribution));
    return body;
  }
  return { ...body, attribution };
}

export async function submitContact(
  body: Record<string, unknown> | FormData,
): Promise<SubmitResult> {
  try {
    const enriched = withAttribution(body);
    const isFormData =
      typeof FormData !== "undefined" && enriched instanceof FormData;
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: isFormData ? undefined : { "Content-Type": "application/json" },
      body: isFormData ? enriched : JSON.stringify(enriched),
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
