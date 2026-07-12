# Demo-Instanz „Musterbetrieb" (Vertriebs-Demo)

Die Website kann als neutrale Demo laufen: gleiche Codebasis, aber mit dem
fiktiven Profil **Musterbetrieb Haustechnik GmbH, Musterstadt** — für
Verkaufsgespräche („so sähe Ihre Website aus").

## Wie es funktioniert

- `src/lib/site.ts` enthält zwei Profile (`ST_HAUSTECHNIK`, `MUSTERBETRIEB`).
  Die Env-Var **`NEXT_PUBLIC_SITE_PROFILE=demo`** schaltet zur Build-Zeit um.
- Im Demo-Modus zusätzlich:
  - **Gelbes Hinweis-Banner** oben („Demo-Ansicht — Anfragen werden nicht an
    einen echten Betrieb gesendet")
  - **noindex** (Meta-Robots + robots.txt komplett gesperrt)
  - **kein JSON-LD** (keine strukturierten Daten für einen fiktiven Betrieb)
  - **Text-Logo** statt des echten ST-Logos
  - **statische Beispiel-Bewertungen** statt des Trustindex-Widgets
- Ohne die Env-Var ändert sich nichts — die Produktions-Site läuft exakt
  wie bisher.

Dieses Profil-Modell ist zugleich der erste Produktisierungs-Schritt:
Für Kunde Nr. 1 wird ein weiteres Profil angelegt (oder das Modell auf
Env-/CMS-basierte Inhalte erweitert).

## Deployment (einmalig, ~10 Minuten, Vercel-Dashboard)

1. Vercel → **Add New → Project** → dasselbe GitHub-Repo
   (`Software-firm-CEO-strategy`) noch einmal importieren.
   Projektname z. B. `musterbetrieb-demo`.
2. Unter **Environment Variables** vor dem ersten Deploy setzen:

   | Variable | Wert |
   | --- | --- |
   | `NEXT_PUBLIC_SITE_PROFILE` | `demo` |
   | `NEXT_PUBLIC_SITE_URL` | `https://<projektname>.vercel.app` |
   | `CONTACT_TO_EMAIL` | eigene Adresse (Demo-Anfragen landen bei dir) |

   **Nicht setzen:** `SUPABASE_*` (Demo-Anfragen sollen die echte
   Lead-Statistik nicht verfälschen), `HEIZREPORT_*`, `RESEND_API_KEY`/SMTP
   (ohne Mailer läuft der Log-Fallback — für Demos ausreichend; wer echte
   Demo-Mails will, setzt den Mailer).
3. Deploy. Die Demo ist dann dauerhaft unter der Projekt-URL erreichbar
   und aktualisiert sich bei jedem Push auf `main` automatisch mit.

## Verwendung im Verkauf

- Link im Gespräch teilen oder am Tablet zeigen; das Banner stellt klar,
  dass es eine Demo ist.
- Stärkster Ablauf: erst die **echte** ST-Seite mit echten Zahlen zeigen
  (Fallstudie), dann die Demo („und so sieht es mit Ihrem Namen aus").
