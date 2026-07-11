// Legt serverseitig ein Heizreport-Projekt an (inkl. optionaler Vorbefüllung).
//
// Aufruf vom Frontend, wenn der Wärmepumpen-Check über den zurückgegebenen
// Report-Link / projektKey eingebunden werden soll. Der API-Key bleibt
// serverseitig – der Client erhält nur projektKey und Report-Link.

import { NextResponse } from "next/server";
import { createProject } from "@/lib/heizreport/client";
import { isHeizreportConfigured } from "@/lib/heizreport/config";
import {
  ALLOWED_PROJEKT_FIELDS,
  type HeizreportProjektData,
} from "@/lib/heizreport/types";

export const runtime = "nodejs";

const ALLOWED = new Set<string>(ALLOWED_PROJEKT_FIELDS);

/** Übernimmt nur die laut Doku erlaubten Projektfelder (Whitelist). */
function sanitize(input: unknown): HeizreportProjektData {
  const data: Record<string, string> = {};
  if (input && typeof input === "object") {
    const record = input as Record<string, unknown>;
    for (const [key, value] of Object.entries(record)) {
      if (!ALLOWED.has(key)) continue;
      if (value != null && `${value}`.trim().length > 0) {
        data[key] = `${value}`.trim().slice(0, 500);
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
  const created = await createProject(
    Object.keys(data).length > 0 ? data : undefined,
  );

  if (!created.ok || !created.projektKey) {
    return NextResponse.json(
      {
        ok: false,
        message: created.error ?? "Projekt konnte nicht angelegt werden.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    projektKey: created.projektKey,
    link: created.link ?? null,
  });
}
