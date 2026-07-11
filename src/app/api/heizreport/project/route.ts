// Legt serverseitig ein Heizreport-Projekt an und füllt es optional voraus.
//
// Aufruf vom Frontend, wenn der Wärmepumpen-Check über ein per projektKey
// gesteuertes iFrame eingebunden werden soll (statt des Widget-Skripts).
// Der API-Key bleibt serverseitig – der Client erhält nur den projektKey.

import { NextResponse } from "next/server";
import { createProject, prefillProject } from "@/lib/heizreport/client";
import { isHeizreportConfigured } from "@/lib/heizreport/config";
import type { HeizreportProjektData } from "@/lib/heizreport/types";

export const runtime = "nodejs";

// Nur bekannte, unkritische Felder aus dem Request übernehmen (Whitelist),
// damit keine beliebigen API-Felder von außen gesetzt werden können.
const ALLOWED_FIELDS: readonly (keyof HeizreportProjektData)[] = [
  "vorname",
  "name",
  "email",
  "telefon",
  "projektName",
  "projektStrasse",
  "projektPostleitzahl",
  "projektOrt",
  "projektBaujahr",
  "projektBewohner",
];

function sanitize(input: unknown): HeizreportProjektData {
  const data: Record<string, string> = {};
  if (input && typeof input === "object") {
    const record = input as Record<string, unknown>;
    for (const field of ALLOWED_FIELDS) {
      const value = record[field as string];
      if (value != null && `${value}`.trim().length > 0) {
        data[field as string] = `${value}`.trim().slice(0, 200);
      }
    }
  }
  return data;
}

export async function POST(request: Request) {
  if (!isHeizreportConfigured()) {
    return NextResponse.json(
      { ok: false, message: "Heizreport-Anbindung ist nicht konfiguriert." },
      { status: 503 },
    );
  }

  let body: unknown = {};
  try {
    // Body ist optional – ein leerer Request legt ein leeres Projekt an.
    const text = await request.text();
    body = text ? JSON.parse(text) : {};
  } catch {
    return NextResponse.json(
      { ok: false, message: "Ungültiges JSON." },
      { status: 400 },
    );
  }

  const data = sanitize(body);

  const created = await createProject(data);
  if (!created.ok || !created.projektKey) {
    return NextResponse.json(
      { ok: false, message: created.error ?? "Projekt konnte nicht angelegt werden." },
      { status: 502 },
    );
  }

  // Falls bereits Daten vorliegen, das Projekt direkt vorausfüllen.
  if (Object.keys(data).length > 0) {
    const filled = await prefillProject(created.projektKey, data);
    if (!filled.ok) {
      console.error("[heizreport-project] Vorausfüllen fehlgeschlagen:", filled.error);
    }
  }

  return NextResponse.json({ ok: true, projektKey: created.projektKey });
}
