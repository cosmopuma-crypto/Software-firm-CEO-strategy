---
name: handwerk-landing
description: >-
  Baue eine moderne, conversion-starke One-Page-Marketingwebsite für einen lokalen
  Handwerks-/Dienstleistungsbetrieb (SHK/Heizung/Sanitär/Wärmepumpe, Elektro, Dachdecker,
  Bad, Garten-/Landschaftsbau usw.) mit Next.js App Router, TypeScript, Tailwind CSS v4 und
  shadcn-artigen UI-Primitives. Nutze diesen Skill, wenn jemand eine (meist deutschsprachige)
  Handwerker-/Local-Business-Landingpage will – inklusive mehrstufiger Konfigurator-/Anfrage-
  Formulare (z. B. Wärmepumpe, Bad, Kundendienst) mit E-Mail-Versand, Kundenbewertungen
  (Trustindex/Google/MyHammer), FAQ, lokalem SEO (LocalBusiness-JSON-LD) und DSGVO-freundlichen
  Dritt-Einbindungen. Stichwörter: Handwerker-Website, Wärmepumpen-Konfigurator, Anfrageformular,
  Meisterbetrieb, Fachbetrieb, Bad planen, Kundendienst, Förderung, Neumünster.
---

# Handwerker-Landingpage (One-Page) – Bau-Playbook

Erprobtes Rezept für eine bildstarke, vertrauensbildende One-Page-Website eines Handwerksbetriebs
mit interaktiven Anfrage-Konfiguratoren und E-Mail-Versand. Ziel: **Anfragen maximieren** (typisch
ein Leitprodukt wie „Wärmepumpe"), Vertrauen über echte Fotos + Bewertungen, sauberes lokales SEO.

Konkrete Code-Snippets: siehe `references/code-patterns.md`. Inhalts-Checkliste: `references/content-checklist.md`.

## Wann anwenden
- Lokaler Betrieb will eine eigene, unabhängige Website (oft weg von einer Fremdfirma).
- Es gibt 1–3 „Tools"/Anfragen (Konfigurator, Planer, Kundendienst) + Standardseiten.
- One-Page = **eine** durchgehend scrollende Seite; Formulare zusätzlich unter eigenen Routen.

## Tech-Stack & Konventionen
- **Next.js (App Router)**, React, **TypeScript strict**, **Tailwind CSS v4** (OKLch-Tokens in
  `src/app/globals.css`, `@theme inline`), shadcn-artige Primitives (`src/components/ui/*` mit
  `forwardRef` + `cva` + `cn()`), `lucide-react`, **Jest (ts-jest, testEnvironment node, nur *.test.ts)**.
- Muster: Server-Component lädt/komponiert → Client-Components (`"use client"`) für Interaktion;
  reine Logik in `src/lib/*` mit Unit-Tests; geteilte Domänen-/Option-Listen in `src/domain/*`.
- Pfad-Alias `@/* → src/*`. `lang="de"`.

## Build-Reihenfolge (bewährt)
1. **Design-Tokens** in `globals.css`: EINE Markenquelle `--brand` (Hex direkt ist ok), warmer Akzent
   (`--gold`/Akzentblau), `--gold-ink` (AA-Text auf hell), `--gold-soft` (auf dunkel), `--sand`,
   `--brand-deep` (dunkle Sektionen), warmes Off-White `--background`. `html{scroll-behavior:smooth}`,
   Reveal- + Ticker-Keyframes. Alle UI-Primitives konsumieren `--primary`/`--ring` → 1 Stelle umfärbt alles.
2. **Schrift-Pairing** via `next/font/google` (selbst-gehostet, DSGVO-konform!). Empfehlung „Corporate
   Trust": **Lexend** (Headlines) + **Source Sans 3** (Text). Base-Heading-Regel `h1..h4 { font-family }`.
3. **Layout-Metadaten** + `viewport.themeColor` (Brand-Hex).
4. **Domänen-Optionen** (`src/domain/forms.ts`): `{value,label}`-Listen + Literal-Typen + `labelOf`/`labelsOf`.
5. **zod-Schemas** (`src/lib/forms/schemas.ts`): pro Formular ein `z.object`, gemeinsame Kontakt-/Adress-
   felder als geteilte Bausteine, `z.discriminatedUnion("formType", [...])`. **zod v4:** Enum aus Liste via
   `z.enum(vals as unknown as [T,...T[]])`. `+ Tests`.
6. **E-Mail-Template** (`email-template.ts`): Payload → {subject,text,html}, Werte über `labelOf` ins
   Deutsche, `escapeHtml` im HTML, `replyTo = Absender-E-Mail`, **CR/LF aus Name im Betreff strippen**. `+ Tests`.
7. **Mailer** (`mailer.ts`): pluggbar `RESEND_API_KEY → Resend`, sonst `SMTP_HOST → nodemailer`, sonst
   **Log-Fallback** (Konsole). Optionale Pakete via dynamic `await import()`. Baut/läuft ohne Secrets.
8. **API-Route** (`app/api/contact/route.ts`, `runtime="nodejs"`): **Rate-Limit** (In-Memory pro IP) →
   Content-Type JSON/multipart → **Honeypot** (stiller 200) → zod → Datei-Prüfung (Anzahl/Größe/Typ) →
   Mail. Generische Fehlermeldungen (keine Stacktraces).
9. **UI-Primitives**: `input,textarea,label,select,checkbox,field,stepper,option-cards,reveal` (alle nativ,
   kein Radix). `field` = Label+Control+Fehler; `option-cards` = Klick-Kacheln (Single/Multi); `stepper`.
10. **Hooks**: `use-reveal` (IntersectionObserver → `data-reveal="shown"`, respektiert reduced-motion).
11. **Form-Shell** (`form-shell.tsx` SuccessPanel/ErrorBanner) + `consent-note.tsx` (Pflicht-Checkbox + Honeypot).
12. **Formulare**: Wizards (`*-konfigurator`, Mehrschritt mit Stepper + Pro-Schritt-Validierung) und
    einstufiges Kontaktformular (mit Datei-Upload via FormData). Wizard-Daten als JSON, Upload als FormData.
13. **Eigene Routen** je Formular (`/konfigurator`, `/badplaner`, `/kundendienst`) – gleiche Komponente,
    teilbare URLs, in `FormPage`-Shell.
14. **Landing-Sektionen** (siehe Katalog) + `page.tsx` komponiert die One-Page.
15. **Rechtsseiten** `/impressum`, `/datenschutz`, `/agb` als Gerüste (echte Daten vom Inhaber einsetzen).
16. **SEO**: Metadaten (OG/Twitter/Keywords/Canonical/`de_DE`), `StructuredData` (LocalBusiness/HVAC +
    AggregateRating + Review), `FAQPage`-JSON-LD im FAQ, `robots.ts`, `sitemap.ts`, `app/icon.png` (Favicon).
17. **Security/Privacy** (next.config Header, click-to-load Karte) + **Verifikation** (typecheck/lint/test/build,
    Dev-Server, Playwright-Screenshots, Formulare e2e).

## Sektions-Katalog (One-Page-Reihenfolge)
Nav (navy Top-Strip „Fachbetrieb/USP" + Hauptbar mit großem Logo + sticky) → **Hero (Bild-Slideshow** +
Eyebrow/USP + 2 CTAs + Trust-Badges + schwebendes Siegel/Stat) → **Newsticker** (async Server-Component,
lädt RSS-Feed(s) via Env `NEWS_RSS_URL`, stündlich revalidiert, Fallback: kuratiertes `src/data/news.json` –
Ticker ist nie leer) → **Leistungen** (Foto-Cards) → **Förder-/CTA-Banner** (z. B. „bis zu X € Förderung") →
**Über uns** (Team/Fahrzeug-Foto + Punkte + 3-Schritte-Ablauf) → **Referenzen** (Masonry-Galerie) →
**Kundenstimmen** (Trustindex-Widget + Rating-Badges Google/MyHammer) → **Fachbetrieb/USP-Band** (dunkel,
6-Schritte „alles aus einer Hand" + Zertifikat) → **Konfigurator/Anfrage-Formulare** → **FAQ** (Accordion +
FAQPage-Schema) → **Kontakt** (Daten + click-to-load Google Maps) → **dunkles CTA-Band** → **Footer** (navy,
Logo-Chip, Spalten, Rechtslinks). Hintergrund-Rhythmus: hell / sand / dunkel abwechseln.

## Wichtige Stolpersteine (real aufgetreten – unbedingt beachten)
- **Sticky-Header bricht**, wenn `<header class="sticky">` in einem kurzen Wrapper-`<div>` steckt
  (das wird zum Containing Block). Top-Strip + Header als **Geschwister/Fragment** rendern; `z-50` auf den Header.
- **Anker-Links auf Unterseiten tot**: Nav/Footer/Logo werden auch auf `/impressum`, `/konfigurator` etc.
  gerendert. Bare `#anchor` zeigt dort ins Leere → **home-relativ** `"/#leistungen"`, Logo `"/#top"`.
- **Bild-Logik prüfen**: richtiges Foto zur Leistung (z. B. WP-Innengerät ≠ „Heizung").
- **Foto-Ausrichtung**: Hochformat-Foto nicht in Querformat-Rahmen quetschen (object-cover crop).
- **next/font self-hostet** Google-Fonts → keine Google-Anfrage zur Laufzeit (DSGVO ok). Niemals `<link>`
  zu fonts.googleapis.
- **Karte/Trustindex** = Dritt-Ressourcen mit IP-Transfer → **Maps click-to-load** (Einwilligung),
  Datenschutzerklärung pflegen. Trustindex-Schema ggf. abschalten, um doppeltes AggregateRating zu vermeiden.
- **Bilder web-optimieren** (max ~1600px, q≈82) bevor sie ins Repo wandern.
- **zod v4** Enum-Cast (s. o.); JSON-Import braucht `resolveJsonModule` (Next-Default ok).
- **„Mobile-Skalierungsfehler" zuerst am echten Viewport verifizieren**, bevor Breakpoints
  oder Seitenverhältnisse umgebaut werden: Ein aktivierter **„Desktop-Website"-Modus im
  Handy-Browser** rendert breit und sieht aus wie ein Layout-Bug (real passiert: zwei
  „Fixes" gebaut und wieder zurückgenommen, PR #5/#7/#10 → revertiert in #11). Erst den
  User bitten, `window.innerWidth` bzw. den Browser-Modus zu prüfen / einen zweiten
  Browser zu testen – dann erst Code ändern.
- **Automatik als Pull, nicht als Push**: Auto-Inhalte (News-Ticker) zur Laufzeit aus einer
  Quelle ziehen (RSS, revalidiert) mit kuratiertem JSON-Fallback – NICHT als geplante
  KI-Routine, die Commits nach `main` pusht (unzuverlässig, zweimal real fehlgeschlagen).

## Formulare – Pflichtfelder & fachliche Vollständigkeit
- Validierung **zweistufig**: Wizard pro Schritt (Client) **und** zod auf dem Server.
- Geteilte Kontaktfelder: name/email/phone/message?/consent + Honeypot `website`.
- **Wärmepumpe** sollte erfassen: Gebäudetyp, Baujahr(-band), Wohnfläche, aktuelle Heizung,
  **Wärmeverteilung (Heizkörper/Fußboden)**, Personen, Ziele, **PLZ+Ort**. Optional: Warmwasser über Heizung,
  Eigentümer/Mieter, PV vorhanden, Zeitrahmen.
- **Bad**: Raumgröße, Ist-Zustand, Elemente (Mehrfach), Stil, Budget, Zeitrahmen, **PLZ+Ort**.
- **Kundendienst**: Name/Tel/Mail, **Adresse**, Anlagentyp, Hersteller?, Problem, Dringlichkeit,
  Wunschtermin?, Datei-Upload (≤3, ≤5 MB, Bild/PDF, serverseitig geprüft).

## Verifikation (immer vor „fertig")
`npm run typecheck && npm run lint && npm run test && npm run build`. Dann Dev-Server +
Playwright (pre-installed Chromium, `executablePath: /opt/pw-browsers/chromium-*/chrome-linux/chrome`,
`playwright-core --no-save`): Screenshots der Sektionen + **Formulare e2e** (leere Pflichtfelder blockiert,
Erfolg sichtbar – `locator.waitFor`, nicht `isVisible()`!). Drittanbieter-CDNs können in Sandbox geblockt sein.

## Was vom Kunden einsammeln
Siehe `references/content-checklist.md` (Marken-Farbe/Logo, Fotos, echte Bewertungen + Profil-Links,
Impressum-Pflichtangaben, Domain, Leistungen, Einzugsgebiet, E-Mail-Empfänger, USPs/Zertifikate).
