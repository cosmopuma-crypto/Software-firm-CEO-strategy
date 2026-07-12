---
name: impressum-agb-datenschutz
description: >-
  Erstelle oder aktualisiere die deutschen Rechtsseiten (Impressum, Datenschutzerklärung,
  AGB) einer Website – zugeschnitten auf den TATSÄCHLICH eingesetzten Tech-Stack, nach dem
  in diesem Repo erprobten Muster (PR #3, ST-Haustechnik). Nutze diesen Skill, wenn
  Rechtsseiten befüllt werden sollen ("Impressum ausfüllen", "Datenschutzerklärung
  schreiben", "AGB vor Go-live"), wenn sich der Stack ändert (neue Dritt-Einbindung,
  neuer Hoster, neues Formular → Datenschutzerklärung anpassen) oder für neue
  Handwerker-/Local-Business-Kundensites. Immer mit Prüf-Hinweisen: Vorlagen, keine
  Rechtsberatung.
---

# Rechtsseiten für deutsche Websites (Impressum / Datenschutz / AGB)

Referenz in diesem Repo: `src/app/impressum|datenschutz|agb/page.tsx` mit den Komponenten
`LegalPage`/`LegalSection` und zentralen Stammdaten in `src/lib/site.ts` (`SITE`).

## Grundregeln

1. **Stammdaten zentral, nie hart in Texte.** Name, Rechtsform, Anschrift, Kontakt,
   Kammer/Handwerksrolle, USt-IdNr. kommen aus einer Quelle (`SITE` in `src/lib/site.ts`) –
   Rechtsseiten interpolieren sie. Eine Änderung pflegt alle Seiten.
2. **Datenschutzerklärung folgt dem Stack, nicht umgekehrt.** Vor dem Schreiben den
   tatsächlichen Stack inventarisieren: Hoster, Formulare + Mail-Versandweg, jede
   Dritt-Einbindung (Widgets, APIs, Karten, Fonts, Analytics). Für **jeden** Punkt ein
   eigener Abschnitt mit: was passiert, welche Daten, Rechtsgrundlage (Art. 6 Abs. 1
   lit. a/b/f DSGVO), ggf. AVV/Drittlandtransfer (EU-Standardvertragsklauseln).
3. **Immer als Vorlage kennzeichnen – keine Rechtsberatung.** Im PR/Bericht explizit:
   „Standard-Vorlagen, vor Veröffentlichung anwaltlich oder per Generator prüfen lassen."
   Geschäftsspezifische Punkte (Widerrufsbelehrung nach EGBGB-Muster, Zahlungsziele,
   VOB/B, exakte Firmierung von Dienstleistern) als **Prüf-Hinweis** markieren, nicht
   erfinden.
4. **`robots: { index: false }`** auf allen Rechtsseiten; Links in Footer + Formular-Consent.
5. **Einwilligungs-Konsistenz:** Was die Datenschutzerklärung als „Click-to-load mit
   Einwilligung" beschreibt, muss die Website technisch genauso tun (und umgekehrt).

## Inventar-Checkliste (vor dem Schreiben abfragen/ermitteln)

- Betreiber: Rechtsform, Inhaber, Anschrift, Telefon, E-Mail, Handwerksrolle/Kammer,
  USt-IdNr., Aufsichtsbehörde-Zuständigkeit (Bundesland → z. B. ULD Schleswig-Holstein).
- Hosting (z. B. Vercel: Server-Logfiles, AVV, USA-Transfer über SCCs).
- Formulare: welche, welche Felder, Datei-Upload? Versandweg (Resend/SMTP/Provider,
  Sitz des Providers), Empfänger-Postfach.
- Dritt-Dienste: Bewertungs-Widgets (Trustindex), Karten (Google Maps click-to-load),
  eingebettete Tools/APIs (z. B. Heizreport: Skript-Embed + Datenfluss der Eingaben),
  Analytics, Fonts (next/font = self-hosted → KEIN Google-Fonts-Abschnitt nötig).
- Cookies: eigene? nur technisch notwendige / durch Dritt-Dienste?

## Impressum (§ 5 DDG, § 18 MStV)

Pflichtangaben aus `SITE`: Name/Rechtsform, Anschrift, Kontakt (Telefon + E-Mail),
bei Handwerksbetrieben: zuständige Handwerkskammer, Eintragung Handwerksrolle,
gesetzliche Berufsbezeichnung + Verleihungsstaat, USt-IdNr. (falls vorhanden),
inhaltlich Verantwortlicher. Platzhalter sichtbar markieren, bis echte Daten vorliegen.

## Datenschutzerklärung – bewährte Gliederung

1. Verantwortlicher (aus `SITE`)
2. Betroffenenrechte (Art. 15–21, Widerruf, Beschwerderecht + konkrete Aufsichtsbehörde)
3. Hosting (Logfiles, Rechtsgrundlage lit. f, AVV, Drittland)
4. SSL/TLS
5. Kontakt & Online-Formulare (Zweck, lit. b + f, Versandweg/Postfach-Provider)
6. Ein Abschnitt **pro Dritt-Dienst/Integration** (Datenfluss, Rechtsgrundlage;
   bei Click-to-load: Einwilligung lit. a, Widerruf)
7. Cookies (ehrlich: keine Analyse-/Marketing-Cookies, falls zutreffend)
8. Speicherdauer (Zweckbindung + HGB/AO 6/10 Jahre)
9. Stand/Änderungsvorbehalt (Monat + Jahr)

## AGB (Handwerk/Werkvertrag, konservativ)

§1 Geltungsbereich · §2 Angebot/Vertragsschluss (Bindefrist) · §3 Preise/Zahlung ·
§4 Termine/Mitwirkung · §5 Abnahme/Gewährleistung (BGB-Fristen) · §6 Haftung
(Kardinalpflichten-Formel) · §7 Widerrufsrecht für Verbraucher (außerhalb von
Geschäftsräumen geschlossene Verträge; formelle Muster-Widerrufsbelehrung als
Prüf-Hinweis) · §8 Schlussbestimmungen. Nah an der gesetzlichen Lage bleiben,
nichts Exotisches – und die anwaltliche Prüfung immer als offenen Punkt ausweisen.

## Abschluss

- `typecheck/lint/build` grün; Seiten unter `/impressum`, `/datenschutz`, `/agb` erreichbar,
  `noindex` gesetzt, Footer-Links vorhanden.
- Im Bericht: Liste der Prüf-Hinweise, die der Betreiber/Anwalt bestätigen muss –
  diese Liste fließt in den `go-live-check`.
