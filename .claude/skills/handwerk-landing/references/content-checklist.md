# Inhalts-Checkliste (vom Kunden einsammeln)

Vor/while dem Bau diese Angaben besorgen. Fehlt etwas → mit klar markierten Platzhaltern/TODOs bauen
und nachziehen. Nichts vom alten Fremd-Hoster übernehmen außer den **eigenen** Inhalten des Kunden.

## Marke & Design
- [ ] Exakte **Marken-Farbe(n)** (Hex) – aus altem Logo/Seite ableitbar (häufigste Nicht-Grau-Farbe).
- [ ] **Logo** (möglichst transparent/PNG); sonst freistellen. Für dunkle Flächen weißen Chip nutzen.
- [ ] Akzent-Wunsch (warm/Bernstein vs. monochrom Blau) – Kunde mag oft keine Orange+Blau-Mischung.
- [ ] Look-Richtung: bild-getrieben/modern/bodenständig?

## Bilder
- [ ] **Echte Projektfotos** (Bäder, Technik, Außengeräte, **Team/Fahrzeug**). Web-optimieren (≤1600px).
- [ ] Hersteller-Marketingbilder vermeiden (Urheberrecht).

## Bewertungen / Social Proof
- [ ] **Google-Profil-Link** (Maps „Teilen" → Link, oder g.page/r/…), Note + Anzahl.
- [ ] **MyHammer-/Plattform-Profil-Link**, Note + Anzahl.
- [ ] Trustindex-Widget-Snippet (falls genutzt) ODER 2–4 echte Zitate (Namen datenschutzfreundlich kürzen).

## Impressum / Recht (Pflicht!)
- [ ] Firmenname/Rechtsform, **Geschäftsführer**, Anschrift (PLZ/Ort exakt prüfen!), Telefon, E-Mail.
- [ ] **Handelsregister** (Amtsgericht + HRB), **USt-IdNr.** oder **Steuernummer**.
- [ ] Berufs-/Kammerangaben, Zertifikate (z. B. „Sachkunde nach VDI 4645").
- [ ] Datenschutz-Volltext + Speicherdauer; Hinweise zu Karte/Trustindex.

## Geschäft & SEO
- [ ] **Leistungen** (Reihenfolge nach Priorität, Leitprodukt zuerst).
- [ ] **Einzugsgebiet** (Stadt + Umlandorte) → `areaServed` + Keywords.
- [ ] **Hauptziel** (welche Anfrage maximieren) → Hierarchie/CTAs.
- [ ] USPs/Siegel (Meisterbetrieb, Fachbetrieb, „alles aus einer Hand").
- [ ] **Förder-Aussage** (z. B. „bis zu X € Förderung") für CTA-Banner.

## Technik / Go-live
- [ ] **E-Mail-Empfänger** der Formulare; Versand: Resend (API-Key) oder SMTP.
- [ ] **Finale Domain** (gleiche behalten = beste SEO-Kontinuität; sonst 301-Weiterleitungen).
- [ ] Optional: Captcha (Turnstile/hCaptcha), CSP, dauerhafter Rate-Limit-Store (Upstash).
- [ ] Optional: n8n-Flow, der `src/data/news.json` für den Newsticker wöchentlich aktualisiert.
