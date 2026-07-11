# Heizreport-Integration

Diese Website bindet **Heizreport** auf zwei Wegen ein:

1. **Eingebettete Widgets** (Wärmepumpen-Check + Förderrechner) als Skript-Embed
   in der Landing-Section – funktionieren ohne API-Key.
2. **REST API v2 + Webhook** (serverseitig) – liefert abgeschlossene Leads
   automatisch per E-Mail an das Team und ermöglicht Projektanlage/Vorbefüllung.

Ohne gesetzten API-Key bleibt Teil 2 inaktiv; die Widgets laufen unabhängig weiter.

---

## Zuordnung: Account-Felder ↔ Env-Vars ↔ Webhook-URL

Im Heizreport-Account unter **Einstellungen → API-Schnittstelle**:

| Heizreport-Account | Env-Var (Deployment) | Beschreibung |
| --- | --- | --- |
| **API-Key** (`hr_live_…`) | `HEIZREPORT_API_KEY` | Wird als `Authorization: Bearer <key>` an die API gesendet. |
| **Webhook Auth** (Bearer-Token, frei wählbar) | `HEIZREPORT_WEBHOOK_SECRET` | Muss auf **beiden** Seiten identisch sein. **Nicht** der API-Key! |
| **Webhook-Adresse** | – | Muss exakt auf die Route zeigen (siehe unten). |

> ⚠️ **API-Key und Webhook-Token sind zwei verschiedene Dinge.**
> Der API-Key (`hr_live_…`) authentifiziert **unsere** Requests an Heizreport.
> Der Webhook-Token ist ein frei wählbarer Wert, mit dem **Heizreport** seine
> eingehenden Webhook-Requests an uns signiert.

### Webhook-Adresse (exakt)

```
https://www.st-haustechnik.de/api/heizreport/webhook
```

Der Pfad muss vollständig auf `/api/heizreport/webhook` enden – sonst 404.
Die Domain muss **diese Next.js-App** ausliefern (nicht eine andere Live-Seite).

---

## Umgebungsvariablen

Siehe `.env.example`. Für die API-Anbindung relevant:

```bash
HEIZREPORT_API_KEY=hr_live_...            # API-Key aus dem Account
HEIZREPORT_WEBHOOK_SECRET=...             # frei gewählter Webhook-Bearer-Token
HEIZREPORT_API_URL=                       # optional, Default: https://heizreport.net/api/v2
```

Für den **E-Mail-Versand** der Lead-Benachrichtigung wird der bestehende Mailer
genutzt (`RESEND_API_KEY` **oder** SMTP; sonst Log-Fallback in der Konsole).
Zieladresse ist `CONTACT_TO_EMAIL` bzw. der Default `info@st-haustechnik.de`.

---

## Endpunkte in diesem Projekt

| Route | Zweck |
| --- | --- |
| `POST /api/heizreport/webhook` | Empfängt abgeschlossene Checks von Heizreport. Verifiziert den Bearer-Token, lädt bei Bedarf die PDF-URL nach und benachrichtigt das Team per E-Mail. |
| `POST /api/heizreport/project` | Legt (optional vorausgefüllt) ein Projekt an und liefert `projektKey` + Report-Link zurück – für eine spätere iFrame-Einbindung. |

### Webhook-Auth-Verifikation

Der Handler akzeptiert den Token aus (Priorität):

1. `Authorization: Bearer <token>` ← so sendet Heizreport
2. `x-heizreport-secret: <token>` (nur für manuelle Tests)
3. `?secret=<token>` (nur für manuelle Tests)

Ohne gesetztes `HEIZREPORT_WEBHOOK_SECRET` werden **alle** Webhooks abgelehnt
(fail closed, HTTP 401).

---

## Heizreport REST API v2 (Referenz)

- **Base URL:** `https://heizreport.net/api/v2`
- **Auth:** `Authorization: Bearer <API-Key>` (Token nur im Header, nie im Body)
- **Format:** JSON · **Rate Limit:** 5 Requests/Sekunde/Token
- **Doku:** <https://heiz.report/api/v2/docs.html>
- **projektKey:** 9 Kleinbuchstaben; steht in Antworten unter `projektHeader.key`

Genutzte Endpunkte (`src/lib/heizreport/`):

| Methode | Pfad | Zweck |
| --- | --- | --- |
| `POST` | `/reports` | Leeres Projekt anlegen |
| `POST` | `/reports/with-data` | Projekt anlegen + `{ projektData }` schreiben |
| `PATCH` | `/reports/{projektKey}` | Projektdaten aktualisieren (`{ projektData }`) |
| `GET` | `/reports/{projektKey}/pdf?type=check\|heizreport` | PDF-Link erzeugen |

Erlaubte `projektData`-Felder sind in
`src/lib/heizreport/types.ts` (`ALLOWED_PROJEKT_FIELDS`) zentral hinterlegt.

---

## Go-live-Checkliste

1. [ ] `HEIZREPORT_API_KEY` = `hr_live_…`-Key im Deployment setzen.
2. [ ] `HEIZREPORT_WEBHOOK_SECRET` frei wählen und im Deployment setzen.
3. [ ] Im Heizreport-Account **denselben** Token unter „Webhook Auth" eintragen.
4. [ ] Webhook-Adresse auf `https://www.st-haustechnik.de/api/heizreport/webhook` setzen.
5. [ ] Sicherstellen, dass die Domain diese Next.js-App ausliefert.
6. [ ] Für echten Mailversand `RESEND_API_KEY` **oder** SMTP konfigurieren.
7. [ ] Testlauf: einen Check über die Website abschließen → E-Mail an
       `info@st-haustechnik.de` prüfen.

---

## Offener Verifikationspunkt

Die Doku zeigt für `GET …/pdf` keinen konkreten Response-Body. Der Client liest
die PDF-URL deshalb defensiv über mehrere mögliche Felder
(`linkToDocument` / `link` / `url` / `pdf` / `projektHeader.link`). Sobald ein
echter Webhook-Payload bzw. eine echte PDF-Antwort vorliegt, kann das exakte
Feld in `src/lib/heizreport/client.ts` (`readDocumentLink`) final fixiert werden.
