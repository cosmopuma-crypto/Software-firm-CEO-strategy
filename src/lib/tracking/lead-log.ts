// Server-seitiges Lead-Log: zählt erfolgreiche Anfragen dauerhaft mit.
//
// Sink ist eine Supabase-Tabelle `lead_events` (per REST, ohne zusätzliche
// Abhängigkeit). Ohne konfigurierte Env-Vars fällt das Log auf die Konsole
// zurück — gleiches Muster wie der Mailer, damit Build/Dev ohne Secrets
// funktionieren. Ein Fehler im Log darf eine Anfrage niemals scheitern lassen.
//
// Tabellen-Setup: siehe docs/tracking.md

import type { Attribution } from "./attribution";

export interface LeadEvent {
  /** z. B. "waermepumpe", "badplaner", "kundendienst", "heizreport" */
  readonly formType: string;
  readonly attribution?: Attribution;
}

interface LeadRow {
  readonly form_type: string;
  readonly source: string | null;
  readonly referrer: string | null;
  readonly utm_source: string | null;
  readonly utm_medium: string | null;
  readonly utm_campaign: string | null;
  readonly landing_page: string | null;
}

/** Baut die Datenbank-Zeile aus einem Lead-Event (reine Funktion, testbar). */
export function buildLeadRow(event: LeadEvent): LeadRow {
  const a = event.attribution;
  return {
    form_type: event.formType,
    source: a?.source ?? null,
    referrer: a?.referrer ?? null,
    utm_source: a?.utmSource ?? null,
    utm_medium: a?.utmMedium ?? null,
    utm_campaign: a?.utmCampaign ?? null,
    landing_page: a?.landingPage ?? null,
  };
}

function supabaseConfig(): { url: string; key: string } | undefined {
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  return url && key ? { url: url.replace(/\/+$/, ""), key } : undefined;
}

/**
 * Schreibt ein Lead-Event ins Log. Wirft nie — Fehler werden nur geloggt,
 * damit der Anfrage-Flow (Mailversand, Response) unberührt bleibt.
 */
export async function logLeadEvent(event: LeadEvent): Promise<void> {
  const row = buildLeadRow(event);
  const config = supabaseConfig();

  if (!config) {
    console.info("[lead-log] (Fallback, kein Supabase konfiguriert)", row);
    return;
  }

  try {
    const res = await fetch(`${config.url}/rest/v1/lead_events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) {
      console.error(
        `[lead-log] Supabase-Insert fehlgeschlagen (${res.status}):`,
        await res.text().catch(() => ""),
      );
    }
  } catch (error) {
    console.error("[lead-log] Supabase nicht erreichbar:", error);
  }
}
