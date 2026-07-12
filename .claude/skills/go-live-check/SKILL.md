---
name: go-live-check
description: >-
  Systematische Pre-Launch-Prüfung ("Go-live-Check") für eine Kundensite – insbesondere
  Handwerker-/Local-Business-Landingpages mit Next.js, Formularen, E-Mail-Versand und
  externen Integrationen (z. B. Heizreport, Trustindex, Google Maps). Nutze diesen Skill,
  wenn eine Website live gehen soll, vor einem Domain-Umzug, oder wenn jemand fragt
  "sind wir bereit für den Launch?" / "Go-live-Checkliste" / "was fehlt noch vor
  Veröffentlichung?". Ergebnis ist ein Prüfbericht mit ✅/⚠️/❌ pro Punkt und einer
  klaren Restliste, was der Betreiber noch selbst erledigen muss.
---

# Go-live-Check – Pre-Launch-Prüfung

Ziel: **Nichts geht live, was peinlich, rechtlich riskant oder kaputt ist.** Der Check
läuft alle Bereiche systematisch durch und endet mit einem Bericht:

- ✅ geprüft und in Ordnung
- ⚠️ in Ordnung mit Einschränkung / vom Betreiber zu bestätigen
- ❌ blockiert den Go-live, mit konkretem Fix

Prüfe **im Code/Repo, was prüfbar ist** (nicht nur Doku lesen); markiere alles, was nur
der Betreiber verifizieren kann (Account-Einstellungen, DNS, Secrets im Deployment), als ⚠️
mit genauer Handlungsanweisung.

## 1. Code-Verifikation

- `npm run typecheck && npm run lint && npm test && npm run build` – alles grün, Build
  erzeugt alle erwarteten Routen.
- Dev-Server starten + Playwright-Screenshots der Kernsektionen (Chromium ist in der
  Remote-Umgebung vorinstalliert, `executablePath` nutzen – kein `playwright install`).
- CI (falls `.github/workflows/` vorhanden) auf dem Release-Stand grün.

## 2. Env-Vars & Secrets (Deployment)

- `.env.example` mit dem Deployment abgleichen: Ist **jede** produktiv nötige Variable im
  Hosting (z. B. Vercel) gesetzt? Typisch: `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`,
  `RESEND_API_KEY` **oder** SMTP-Variablen, Integrations-Keys (`HEIZREPORT_API_KEY`,
  `HEIZREPORT_WEBHOOK_SECRET`), optionale Feeds (`NEWS_RSS_URL`).
- **Fallback-Falle**: Läuft der Mailer noch im Log-Fallback (keine Secrets gesetzt), gehen
  Anfragen live **verloren** → ❌-Blocker, bis echter Versand konfiguriert und getestet ist.
- Keine Secrets im Repo/Client-Bundle (nur `NEXT_PUBLIC_*` darf in den Client).

## 3. Externe Integrationen & Webhooks

Pro Integration (Heizreport, CRM, …):

- **Beide Seiten** der Auth prüfen: unser Key für deren API **und** deren Token für unseren
  Webhook sind zwei verschiedene Werte – Webhook-Secret muss auf beiden Seiten identisch sein.
- Webhook-URL im Fremd-Account zeigt **exakt** auf die Route (Pfad + produktive Domain, die
  diese App ausliefert) – sonst 404.
- Fail-closed verifizieren: ohne konfiguriertes Secret werden Webhooks abgelehnt (401).
- **Ein echter Testlauf** über die Live-Strecke (z. B. Check auf der Website abschließen →
  kommt die Benachrichtigungs-Mail an?). Offene Verifikationspunkte aus der Doku (z. B.
  unklares Response-Feld) beim ersten echten Payload final fixieren.

## 4. Formulare Ende-zu-Ende (real, nicht nur lokal)

- Jedes Formular einmal produktiv absenden: Validierung blockiert leere Pflichtfelder,
  Erfolg sichtbar, **E-Mail kommt beim Empfänger an**, `replyTo` = Absender des Kunden,
  Datei-Upload (Anzahl/Größe/Typ) wird serverseitig geprüft.
- Honeypot: stiller 200, keine Mail. Rate-Limit greift.
- Formular-Routen (`/konfigurator` etc.) direkt aufrufbar und teilbar.

## 5. Rechtliches (DSGVO)

- `/impressum`: **echte** Pflichtangaben (Inhaber, Anschrift, Kontakt, ggf. Kammer/
  Handwerksrolle, USt-IdNr.) – keine Platzhalter mehr.
- `/datenschutz` deckt den **tatsächlichen** Stack ab: Hosting (inkl. AVV/Drittlandtransfer),
  jedes Formular, Mail-Versand, jede Dritt-Einbindung (Bewertungs-Widget, Maps click-to-load,
  eingebettete Widgets/APIs), Betroffenenrechte + Aufsichtsbehörde.
- `/agb`: vom Betreiber (idealerweise anwaltlich) freigegeben – als ⚠️ ausweisen, nie als ✅
  ohne Bestätigung.
- Rechtsseiten `robots: noindex`; Einwilligungen (Maps, Widgets) laden wirklich erst nach Klick.

## 6. SEO & Metadaten

- Title/Description/OG/Twitter/Canonical/`de_DE` gesetzt; `robots.ts`, `sitemap.ts`,
  Favicon/`icon.png` vorhanden.
- JSON-LD valide: LocalBusiness (+ AggregateRating nur, wenn nicht doppelt durch ein
  Widget-Schema) und FAQPage.
- Canonical/OG-URLs zeigen auf die **finale Domain** (nicht Preview-URL).

## 7. Domain, DNS & Hosting

- Produktive Domain liefert **diese** App aus (nicht die alte/fremdgehostete Seite);
  www/apex-Redirect konsistent; HTTPS ok.
- Security-Header (next.config) aktiv; 404-Verhalten geprüft.
- Alte Seite: Umzugsplan (was passiert mit bestehenden URLs/Backlinks?).

## 8. Mobile & Performance

- Kernbreiten prüfen (≈390/412 px Handy, ≈820 px Tablet, Desktop): Nav-Breakpoints
  konsistent, Hero-Proportionen, keine horizontalen Scroller.
- Bilder web-optimiert (≤ ~1600 px), Lighthouse-Schnellcheck (Performance/SEO/A11y).
- `prefers-reduced-motion` respektiert.

## 9. Monitoring & Betrieb

- Analytics/Fehler-Monitoring aktiv (z. B. Vercel Analytics) – datenschutzkonform erwähnt.
- Wer bekommt Formular-Mails, und ist das Postfach überwacht?
- Auto-Inhalte (News-Ticker/RSS) haben einen Fallback und sind nie leer.

## Bericht (immer als Abschluss)

Tabelle oder Liste: Bereich → Status (✅/⚠️/❌) → Befund → nächster Schritt + wer
(Claude / Betreiber). Darunter: **Blocker-Restliste** in Priorität – erst wenn sie leer
ist, Go-live empfehlen.
