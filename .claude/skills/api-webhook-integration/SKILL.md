---
name: api-webhook-integration
description: >-
  Binde einen externen Dienst (SaaS-API + eingehender Webhook) sicher und robust in eine
  Next.js-/Node-App ein – nach dem in diesem Repo erprobten Heizreport-Muster. Nutze diesen
  Skill, wenn eine REST-API mit Key-Auth angebunden werden soll, ein Webhook-Empfänger
  gebaut wird (z. B. Heizreport, HERO Software, 360dialog/WhatsApp, Sipgate, Zahlungs- oder
  CRM-Dienste), oder wenn jemand fragt "binde Dienst X an", "baue einen Webhook-Endpunkt",
  "verarbeite eingehende Events von X". Kernpunkte: fail-closed Auth, API-Key vs.
  Webhook-Token strikt trennen, Env-Var-Mapping dokumentieren, defensives Response-Parsing,
  App bleibt ohne Secrets baubar.
---

# Externe API + Webhook anbinden – Muster

Referenz-Implementierung in diesem Repo: `src/lib/heizreport/` (config/client/types + Tests),
`src/app/api/heizreport/` (Webhook + Projekt-Route), Doku `docs/heizreport-integration.md`.
Beim Anbinden eines neuen Dienstes dieselbe Struktur anlegen: `src/lib/<dienst>/` +
`src/app/api/<dienst>/` + `docs/<dienst>-integration.md`.

## Grundregeln (nicht verhandelbar)

1. **Zwei Secrets, zwei Richtungen – nie verwechseln.** Unser API-Key authentifiziert
   *unsere* Requests an den Dienst. Der Webhook-Token ist ein *separater* Wert, mit dem der
   Dienst *seine* Requests an uns signiert. Beide getrennt benennen
   (`<DIENST>_API_KEY` / `<DIENST>_WEBHOOK_SECRET`) und in der Doku als Tabelle
   Account-Feld ↔ Env-Var ↔ Zweck zuordnen.
2. **Fail closed.** Ohne konfiguriertes Webhook-Secret werden **alle** eingehenden Webhooks
   mit 401 abgelehnt – niemals „offen, solange nichts gesetzt ist".
3. **Secrets nur serverseitig.** Client-Code (`"use client"`) sieht keine Keys; Requests
   laufen durch API-Routes/Server-Components. Keys nur im Header, nie im Body oder in URLs
   (Ausnahme: dokumentierte Test-Query nur für manuelle Checks).
4. **App bleibt ohne Secrets baubar.** `isConfigured()`-Guard: ohne Key ist die Anbindung
   inaktiv statt kaputt (Build/Dev/CI laufen ohne `.env`).
5. **Timeouts + saubere Fehler.** `AbortController` (~15 s), Fehlermeldungen generisch nach
   außen (keine Stacktraces, keine Secrets in Logs).

## Struktur pro Dienst

```
src/lib/<dienst>/
├── config.ts    # Base-URL (+ Env-Override), Pfad-Templates, Key/Secret-Getter, isConfigured()
├── types.ts     # Payload-/Response-Typen; erlaubte Felder als const-Liste zentralisieren
├── client.ts    # request()-Helfer (Auth-Header, Timeout, JSON) + fachliche Funktionen
└── client.test.ts
src/app/api/<dienst>/
├── webhook/route.ts   # Eingehende Events (runtime "nodejs")
└── ...                # ggf. weitere Routen (Projekt anlegen, Status, …)
docs/<dienst>-integration.md
```

## Client-Muster (`client.ts`)

- Ein zentraler `request()`-Helfer: Bearer-Header, `Accept: application/json`,
  `cache: "no-store"`, Timeout, Fehler-JSON des Dienstes auslesen.
- Fachliche Funktionen geben **Result-Objekte** zurück (`{ ok: true, … } | { ok: false, error }`)
  statt zu werfen – Aufrufer (API-Routes) können sauber degradieren.
- **Defensives Response-Parsing**: Wenn die Fremd-Doku ein Feld nicht eindeutig zeigt,
  mehrere Kandidaten lesen (vgl. `readDocumentLink`: `linkToDocument ?? link ?? url ?? …`)
  und einen **„Offener Verifikationspunkt"-Abschnitt** in die Doku schreiben: beim ersten
  echten Payload das exakte Feld fixieren.
- Rate-Limits des Dienstes in `config.ts` als Kommentar festhalten.

## Webhook-Muster (`webhook/route.ts`)

- Auth-Prioritäten: `Authorization: Bearer <token>` (so sendet der Dienst) → optionale
  Test-Header/-Query nur für manuelle Checks, in der Doku als solche markiert.
- Ablauf: Token prüfen (fail closed, 401) → Payload mit zod validieren → idempotent
  verarbeiten (Webhooks kommen doppelt!) → Folgeaktion (z. B. Benachrichtigungs-Mail über
  den bestehenden pluggbaren Mailer) → knappes 2xx-JSON.
- Antworte auch bei fachlichen Fehlern zügig mit 2xx/4xx – niemals lange blockieren,
  sonst wiederholt der Dienst endlos.

## Doku pro Integration (`docs/<dienst>-integration.md`)

Pflichtinhalte (Vorlage: `docs/heizreport-integration.md`):

1. Tabelle **Account-Feld ↔ Env-Var ↔ Beschreibung** (inkl. Warnbox „API-Key ≠ Webhook-Token").
2. **Exakte Webhook-URL** (voller Pfad, produktive Domain, „Domain muss diese App ausliefern").
3. Genutzte Endpunkte als Tabelle (Methode/Pfad/Zweck) + Base-URL + Auth + Rate-Limit.
4. **Go-live-Checkliste** (Keys setzen, Token beidseitig, Testlauf über die echte Strecke).
5. Offene Verifikationspunkte.

Zusätzlich: alle neuen Env-Vars in `.env.example` mit Kommentar ergänzen (Default-Verhalten
ohne Wert beschreiben).

## Tests & Verifikation

- Unit-Tests für Client-Logik mit gemocktem `fetch` (ok / HTTP-Fehler / Timeout / Antwort
  ohne erwartetes Feld) und für die Webhook-Auth (kein Secret → 401, falscher Token → 401,
  korrekt → 2xx).
- `npm run typecheck && npm run lint && npm test && npm run build` vor „fertig".
- Echten Testlauf über die Live-Strecke in der Go-live-Checkliste verankern (gehört zum
  `go-live-check`-Skill).
