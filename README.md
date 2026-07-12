# ST-Haustechnik – Website & Anfrage-Tools

One-Page-Marketingwebsite für ST-Haustechnik (SHK-Fachbetrieb, Neumünster) mit
interaktiven Anfrage-Formularen und Heizreport-Anbindung. Gebaut mit Next.js
(App Router), TypeScript (strict), Tailwind CSS v4 und shadcn-artigen
UI-Primitives.

## Schnellstart (lokal)

```bash
npm install        # einmalig
npm run dev        # Dev-Server auf http://localhost:3000
```

Weitere Befehle:

```bash
npm run build      # Produktions-Build
npm run start      # Produktions-Server (nach build)
npm run lint       # ESLint (0 Fehler, 0 Warnungen erwartet)
npm run typecheck  # tsc --noEmit
npm test           # Jest Unit-Tests
```

Dieselben vier Prüfschritte laufen als CI auf jedem Pull Request
(`.github/workflows/ci.yml`). In Claude-Code-Remote-Sessions installiert ein
SessionStart-Hook (`.claude/hooks/session-start.sh`) die Dependencies
automatisch.

## Seiten & Routen

| Route | Inhalt |
| --- | --- |
| `/` | One-Page-Landing: Hero, News-Ticker (RSS), Leistungen, Referenzen, Kundenstimmen, Formulare, FAQ, Kontakt |
| `/konfigurator` | Wärmepumpen-Konfigurator (mehrstufiger Wizard) |
| `/badplaner` | Badplaner (mehrstufiger Wizard) |
| `/kundendienst` | Kundendienst-Formular (einstufig, mit Datei-Upload) |
| `/impressum`, `/datenschutz`, `/agb` | Rechtsseiten (`noindex`) |
| `/katalog` | Interner Repositories-&-Skills-Katalog (ursprüngliches Projekt) |

## E-Mail & Konfiguration

Alle Formulare senden an `POST /api/contact` (Rate-Limit, Honeypot,
zod-Validierung, Datei-Prüfung). Der Mailer ist pluggbar: `RESEND_API_KEY` →
Resend, sonst `SMTP_HOST` → nodemailer, sonst Log-Fallback – Build und Dev
laufen ohne Secrets. Alle Variablen: siehe [`.env.example`](.env.example).

> ⚠️ Ohne konfigurierten Mail-Versand landen Anfragen nur im Server-Log –
> vor Go-live Resend/SMTP einrichten (siehe Go-live-Checkliste).

## Integrationen

- **Heizreport** (Wärmepumpen-Check, Förderrechner, REST API v2 + Webhook):
  siehe [`docs/heizreport-integration.md`](docs/heizreport-integration.md)
  mit Env-Var-Zuordnung, Webhook-Einrichtung und Go-live-Checkliste.
- **News-Ticker**: lädt RSS-Feeds (`NEWS_RSS_URL`, stündlich revalidiert) mit
  Fallback auf kuratierte Meldungen in `src/data/news.json`.

## Architektur

```
src/
├── domain/        # Framework-agnostische Modelle & Options-Listen
├── data/          # Datenquellen (Katalog, news.json)
├── lib/
│   ├── forms/     # zod-Schemas, E-Mail-Templates, pluggbarer Mailer (+ Tests)
│   ├── heizreport/# API-Client, Webhook-Config, Typen (+ Tests)
│   ├── hooks/     # z. B. use-reveal (IntersectionObserver)
│   └── site.ts    # Zentrale Stammdaten (Name, Adresse, Kontakt) für alle Seiten
├── components/
│   ├── ui/        # Primitives (Button, Field, Stepper, OptionCards, …)
│   ├── forms/     # Konfigurator-/Badplaner-/Kundendienst-Formulare
│   ├── landing/   # Sektionen der One-Page + LegalPage
│   └── catalog/   # Komponenten des Katalogs (/katalog)
└── app/           # App Router: Seiten, API-Routes, robots, sitemap
```

Prinzipien: Server-Components laden/komponieren, Client-Components nur für
Interaktion; reine Logik in `src/lib/*` mit Unit-Tests; Stammdaten und
Options-Listen zentral statt dupliziert.

## Claude-Code-Skills (`.claude/skills/`)

| Skill | Zweck |
| --- | --- |
| `handwerk-landing` | Playbook: Handwerker-Landingpage bauen (Stack, Reihenfolge, Stolpersteine) |
| `go-live-check` | Pre-Launch-Prüfung in 9 Bereichen mit ✅/⚠️/❌-Bericht |
| `api-webhook-integration` | Externe API + Webhook sicher anbinden (Heizreport-Muster) |
| `impressum-agb-datenschutz` | Deutsche Rechtsseiten stack-genau erstellen/aktualisieren |
