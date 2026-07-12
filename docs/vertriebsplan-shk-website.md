# Vertriebsplan: SHK-Website-Lösung an Handwerksbetriebe verkaufen

> Stand: Juli 2026 · Status: Entwurf zur Diskussion
> Grundlage: die für ST-Haustechnik gebaute Next.js-Website (Badplaner,
> Kundendienst-Formular, Wärmepumpen-Check + Förderrechner via Heizreport,
> Trustindex-Bewertungen, lokales SEO, Lead-Zustellung per E-Mail/Webhook).

---

## 1. Kurzfassung (TL;DR)

**Ja, es gibt einen Markt — aber nicht für „eine Website", sondern für
„planbare Anfragen".** SHK-Betriebe kaufen keine Technik, sie kaufen
Wärmepumpen-Leads, Bad-Anfragen und weniger Telefonchaos. Der Markt ist
gleichzeitig **voll mit Anbietern** (Baukästen ab ~20 €/Monat, Freelancer
1.000–4.000 €, Agenturen 2.000–10.000 €+, Lead-Portale, SHK-Marketing-Agenturen
mit 500–1.500 €/Monat SEO-Retainern). Eine weitere „Website-Agentur" hat
keine Chance — ein **produktisiertes Lead-System speziell für SHK** schon.

**Empfehlung:** Hybrid-Modell (einmalige Einrichtung + monatliches Abo),
positioniert als „SHK-Lead-Website in 14 Tagen", validiert mit 3–5
Pilotkunden in 90 Tagen, bevor irgendetwas skaliert wird.

**Kritischster Punkt:** Du hast aktuell **ein Projekt, kein Produkt**. Ohne
(a) messbare Ergebnisse der Referenzseite und (b) einen wiederholbaren
Auslieferungsprozess ist jeder Verkauf ein neues Agenturprojekt mit
Agentur-Aufwand.

---

## 2. Ausgangslage: Was vorhanden ist — und was fehlt

### Vorhanden (Stärken)

| Baustein | Verkaufsargument |
| --- | --- |
| Mehrstufige Anfrage-Funnels (Badplaner, Kundendienst) | Qualifizierte statt „Rückruf bitte"-Anfragen |
| Wärmepumpen-Check + Förderrechner (Heizreport) | Das Thema, für das SHK-Betriebe gerade Geld ausgeben |
| Lead-Zustellung per E-Mail + Webhook/API | Anfragen landen direkt beim Betrieb, kein Portal-Login |
| Google-Bewertungen (Trustindex), FAQ, Referenzen | Vertrauensaufbau, den Betriebe verstehen |
| LocalBusiness-JSON-LD, saubere Technik (Next.js, Tests) | Lokales Google-Ranking; niedrige Betriebskosten |
| DSGVO-Basics (Datenschutz, AGB, Consent-Hinweise) | Reales Kaufkriterium bei Betrieben/Innungen |

### Fehlt (kritisch, ehrlich)

1. **Belegbare Ergebnisse.** „Schöne Website" verkauft nicht. Du brauchst
   Zahlen der Referenzseite: Besucher/Monat, Anfragen/Monat, Kosten pro
   Anfrage. Ohne Tracking (z. B. serverseitige Events + einfaches Dashboard)
   gibt es nichts zu verkaufen außer Optik.
2. **Produktisierung.** Die Seite ist auf ST-Haustechnik zugeschnitten
   (Texte, Bilder, Domain, E-Mail-Ziele hart verdrahtet in Env/Code). Kunde
   Nr. 2 bedeutet heute: Repo klonen, alles anfassen. Nötig: Inhalte aus
   einer Konfiguration (ein `site.config.ts`/CMS pro Kunde), Theming,
   Deployment-Checkliste.
3. **Wiederholbarer Vertriebs- und Onboarding-Prozess.** Angebots-PDF,
   Demo-Instanz mit Musterbetrieb, Onboarding-Fragebogen (Logo, Leistungen,
   Einzugsgebiet, Bewertungslinks), Vertragsvorlage (Laufzeit, Kündigung,
   wem gehört die Domain/Inhalte).
4. **Eigene Verkaufs-Website.** Wer Websites verkauft, wird an der eigenen
   gemessen. Eine Produktseite mit Demo, Preisen und Referenz ist Pflicht.
5. **Abhängigkeit Heizreport.** Der stärkste Differenzierer hängt an einem
   Drittanbieter (Preise, API-Änderungen, Exklusivität). Plan B nötig
   (eigener einfacher WP-Vorcheck als Fallback).

---

## 3. Markt & Wettbewerb (kritisch)

**Nachfrageseite:** SHK ist eine der zahlungskräftigsten Handwerksbranchen
(Stundensätze 95–140 € netto in Ballungsräumen laut
[Handwerker-Kostenindex 2026](https://www.handwerkerjobkit.de/handwerker-kosten/shk)),
mit vollem Auftragsbuch im Service, aber hartem Wettbewerb um
**Wärmepumpen-Projekte** — genau dort wird Marketing gekauft.

**Angebotsseite (deine Konkurrenz):**

| Segment | Typische Preise | Deine Abgrenzung |
| --- | --- | --- |
| Baukästen (Jimdo, IONOS, Wix) | ~10–40 €/Monat, DIY | Kein Funnel, kein SHK-Fachbezug, Betrieb muss selbst bauen |
| Freelancer/Web-Agenturen | 1.000–4.000 € bzw. 2.000–10.000 €+ einmalig ([Preisvergleich 2026](https://webentwicklung-rottweil.de/blog/was-kostet-eine-website-fuer-handwerker/), [websitewissen.com](https://websitewissen.com/handwerker-website)) | Generalisten; kein Wärmepumpen-Check, keine Förderlogik, kein Branchen-Wording |
| SHK-/Handwerks-Marketing-Agenturen (z. B. [Marketing & Meer](https://marketing-meer.de/seo-agentur-shk-betriebe/), [digimax](https://digimax.de/branchen/shk-handwerk), [WerkPlusMedia](https://werkplusmedia.de/leadgenerierung/)) | SEO-Retainer ~500–1.500 €/Monat | Teurer, dienstleistungslastig; du bist das günstigere Produkt statt Beratungsprojekt |
| Lead-Portale/Lead-Kauf | ~50–75 €+ pro Lead, oft mehrfach verkauft ([marketingexperten.de](https://www.marketingexperten.de/blog/waermepumpen-leads-generieren), [Leadsagentur](https://leadsagentur.de/branchen/handwerker-leads/shk/)) | Dein Pitch: „Exklusive Anfragen über die eigene Website statt gekaufte Sammel-Leads" |
| Handwerkersoftware mit Web-Modulen (Meisterwerk, Hero u. a., vgl. [Anbietervergleich](https://blog.meisterwerk.app/handwerksunternehmer/handwerker-software-vergleich-6-anbieter)) | Bundle im Software-Abo | Die ernsteste langfristige Bedrohung: Website „gratis" zur Bürosoftware |

**Kritisches Fazit:** Der Markt ist **nicht leer, aber unscharf besetzt**.
Kaum jemand verkauft genau: *fertige SHK-Lead-Website mit Wärmepumpen-Check,
Förderrechner und Bad-Funnel, live in 14 Tagen, zum Fixpreis*. Diese Lücke
ist real — aber klein genug, dass sie Positionierung und Tempo verlangt,
nicht Perfektion.

---

## 4. Geschäftsmodell-Optionen (Vergleich + Empfehlung)

### Option A — Einmalprojekt (klassische Agentur)
3.000–6.000 € pro Betrieb, Übergabe, ggf. Wartungsvertrag.
**Pro:** Sofort Cashflow, kein Dauer-Support-Versprechen.
**Contra:** Kein wiederkehrender Umsatz, jeder Kunde = neues Projekt,
du konkurrierst mit jeder Web-Agentur. *Nur sinnvoll als Einstieg über
die ersten 1–2 Piloten.*

### Option B — Reines Abo (Website-as-a-Service)
149–299 €/Monat inkl. Hosting, Pflege, Updates, 12 Monate Mindestlaufzeit.
**Pro:** Planbarer MRR, niedrige Einstiegshürde für Betriebe (Vergleich:
allein Wartung wird 2026 mit ~75 €+/Monat bepreist, realistische
Gesamtkosten klassischer Websites liegen bei ~220 €/Monat über 3 Jahre,
vgl. [BlackForest-WebCraft](https://blackforest-webcraft.de/blog/handwerker-website-kosten-2026/)).
**Contra:** Onboarding-Aufwand wird erst nach 6–12 Monaten verdient;
Churn tut weh; du finanzierst die Akquise vor.

### Option C — Hybrid: Setup + Abo ⭐ Empfehlung
**990–1.990 € Einrichtung + 149–249 €/Monat.**
Setup deckt den Onboarding-Aufwand, das Abo baut MRR auf. Marktüblich,
für Betriebe nachvollziehbar („Einrichtung + laufender Betrieb"), und es
filtert Schnäppchenjäger heraus, die später die teuersten Kunden sind.

### Option D — White-Label an Agenturen/Softwareanbieter
Lizenz pro Instanz an Web-Agenturen ohne SHK-Kompetenz oder an
Handwerkersoftware-Anbieter.
**Pro:** Skaliert ohne eigenen Endkunden-Vertrieb.
**Contra:** Ohne nachgewiesene Endkunden-Erfolge kauft das niemand;
Margen niedriger; du wirst austauschbarer Zulieferer. *Als Phase 2 (ab
~10 Endkunden) attraktiv, nicht als Start.*

**Preisanker fürs Verkaufsgespräch:** 1 gewonnener Wärmepumpen-Auftrag
(Marge oft 3.000–8.000 €) bezahlt das Abo für Jahre; gekaufte Leads kosten
50–75 € pro Stück und sind nicht exklusiv. Das Abo muss sich an *einer*
zusätzlichen Anfrage pro Monat messen lassen — das ist die ganze Rechnung.

---

## 5. Zielgruppe & Positionierung

**Idealer Erstkunde (ICP):**
- SHK-Betrieb, 5–50 Mitarbeiter, Inhaber 30–55 Jahre
- macht bereits Wärmepumpen/Badsanierung (nicht reiner Notdienst)
- hat Google-Bewertungen ≥ 4,0, aber eine veraltete/keine Website
- Einzugsgebiet mit Wettbewerb (Speckgürtel, Mittelstädte)

**Nicht-Kunden (bewusst ablehnen):** 1-Mann-Betriebe ohne Wachstumsabsicht,
Betriebe ohne Kapazität für neue Aufträge, Preisfeilscher unter 100 €/Monat.

**Positionierungssatz:**
> „Die Anfragen-Website für SHK-Betriebe: Wärmepumpen-Check, Förderrechner
> und Bad-Konfigurator — live in 14 Tagen, exklusive Anfragen direkt in
> dein Postfach. Vom Team hinter [Referenzseite]."

---

## 6. Vertriebswege (priorisiert nach Aufwand/Ertrag)

1. **Referenz + Empfehlung (sofort):** ST-Haustechnik-Ergebnisse als
   Fallstudie aufbereiten; Inhaber um 2–3 Intros zu befreundeten Betrieben
   bitten (SHK-Inhaber kennen einander über Großhandel und Innung).
   Empfehlungsprämie anbieten (z. B. 1 Monat gratis je geworbenem Betrieb).
2. **Heizreport-Partnerschaft (hoher Hebel):** Du bist zahlender
   API-Nutzer und Integrations-Showcase. Frage nach Listung als
   Integrations-/Umsetzungspartner — deren Kundenbasis ist exakt deine
   Zielgruppe.
3. **Großhandel & Hersteller:** SHK-Großhändler (GC, Pietsch, Richter+Frenzel)
   und WP-Hersteller machen Händler-Marketing-Programme; ein Vortrag bei
   einer Hausmesse erreicht 50 Inhaber an einem Tag.
4. **Innung/Kreishandwerkerschaft:** Kurzvortrag „Wärmepumpen-Anfragen über
   die eigene Website" bei Innungsversammlungen — Vertrauenskanal, langsam
   aber hochwertig.
5. **Gezielte Direktansprache (statt Kaltakquise-Masse):** 20 Betriebe im
   Umkreis identifizieren, deren Website messbar schwach ist; individuelles
   3-Minuten-Video („So sieht Ihre Seite aus, so sähe sie mit
   Wärmepumpen-Check aus") per E-Mail. Aufwändig, aber Abschlussquoten
   weit über Massenmails.
6. **Content/Inbound (ab Monat 3):** 1 Fallstudie + 2–3 Fachartikel
   („Was kostet eine SHK-Website 2026", „Leads kaufen vs. selbst
   generieren") — die Suchanfragen existieren nachweislich (siehe Quellen).

**Bewusst NICHT am Anfang:** bezahlte Ads auf das eigene Angebot, Messen
mit Standkosten, Kaltakquise-Callcenter — alles Geldvernichtung ohne
Referenz-Fallstudie.

---

## 7. 90-Tage-Validierungsplan

### Phase 1 — Beweis sichern (Woche 1–4)
- [ ] Tracking auf Referenzseite: Anfragen/Monat, Quellen, ggf. einfaches
      Conversion-Dashboard (DSGVO-konform, z. B. serverseitig/Plausible)
- [ ] Fallstudie schreiben (Zahlen, Zitat des Inhabers, Screenshots)
- [ ] Demo-Instanz „Musterbetrieb Mustermann GmbH" deployen
- [ ] Einseitiges Angebot: Leistungsumfang, Preis, 14-Tage-Lieferversprechen
- [ ] Vertragsvorlage klären (Laufzeit, Kündigung, Eigentum an Domain/Inhalten,
      AV-Vertrag) — einmalig Anwalt/Vorlagen-Dienst nutzen

### Phase 2 — 3–5 Pilotkunden (Woche 5–12)
- [ ] Pilotpreis: z. B. 990 € Setup + 149 €/Monat (offen als Pilotpreis
      deklarieren, +Testimonial-Pflicht) — **nicht gratis**: wer nichts
      zahlt, gibt kein echtes Kaufsignal
- [ ] Kanäle 1–3 (Empfehlung, Heizreport, Großhandel) bespielen,
      Ziel: 15 Gespräche → 3–5 Abschlüsse
- [ ] Jedes Onboarding dokumentieren → wird zur Checkliste/Automatisierung

### Phase 3 — Entscheiden (Woche 13)
Harte Kriterien, vorher festgelegt:
- **Weiter & produktisieren**, wenn ≥ 3 zahlende Kunden UND Onboarding ≤ 3
  Arbeitstage pro Kunde erreichbar scheint.
- **Pivot zu White-Label/Agentur-Zulieferer**, wenn Gespräche gut laufen,
  aber Betriebe nicht direkt kaufen.
- **Stopp/Hobby**, wenn < 2 Abschlüsse aus ≥ 15 echten Gesprächen — dann
  ist die Zahlungsbereitschaft nicht da, und mehr Feature-Bau ändert das nicht.

---

## 8. Produktisierungs-Roadmap (nur nach erfolgreicher Validierung)

1. **Konfigurations-getriebene Inhalte:** alle betriebsspezifischen Daten
   (Name, Farben, Leistungen, Texte, Bewertungs-Widget-ID, Zieladressen)
   in eine Config/ein leichtes CMS; Kern-Repo bleibt eins für alle Kunden.
2. **Multi-Deployment:** 1 Repo → n Deployments (z. B. Vercel-Projekte pro
   Kunde) mit Env-basierter Konfiguration; Update einmal bauen, alle Kunden
   profitieren.
3. **Lead-Dashboard light:** monatlicher automatischer Report per E-Mail
   („12 Anfragen im Juni") — das ist das Churn-Gegenmittel Nr. 1: der
   Betrieb muss jeden Monat *sehen*, wofür er zahlt.
4. **Zweites Gewerk erst ab ~15 SHK-Kunden** (Elektro/PV liegt nahe) —
   vorher verwässert es die Positionierung.

---

## 9. Wirtschaftlichkeit (Grobrechnung, konservativ)

Annahmen: 990 € Setup, 179 €/Monat, Hosting/Tools ~20 €/Monat/Kunde,
Onboarding ~3 Personentage, Support ~1 h/Monat/Kunde.

| Kunden | MRR | Jahresumsatz (inkl. Setups) | Aufwand/Woche (grob) |
| --- | --- | --- | --- |
| 5 | ~900 € | ~16.000 € | 3–5 h |
| 15 | ~2.700 € | ~45.000 € | 8–12 h |
| 40 | ~7.200 € | ~110.000 € | Vollzeit bzw. Hilfe nötig |

**Kritische Wahrheit:** Bis ~15 Kunden ist das ein solides Nebeneinkommen,
kein Unternehmen. Der Sprung auf 40+ verlangt Vertriebszeit, die ein
Techniker-Solo-Gründer meist nicht hat → dann Partner (Vertrieb) oder
White-Label-Route.

---

## 10. Risiken & kritische Einwände (die dir Betriebe und die Realität entgegenhalten)

| Risiko / Einwand | Antwort / Gegenmaßnahme |
| --- | --- |
| „Ich habe genug Aufträge." | Zielgruppe schärfen: Betriebe, die *wachsen* oder von Notdienst auf WP/Bad umsteigen wollen. Nicht jeden überzeugen wollen. |
| „Mein Neffe macht das mit Wix." | Nicht Design verkaufen, sondern Funnel + Förderrechner + exklusive Leads. Gegen DIY gewinnt man über Ergebnis, nicht Optik. |
| Software-Anbieter bündeln Websites ins Abo | Geschwindigkeit + Spezialisierung; langfristig Integrationspartner statt Konkurrent werden (offene Lead-Schnittstellen). |
| Heizreport-Abhängigkeit | Fallback-Formular für WP-Anfragen im Produkt behalten; Konditionen/Partnerstatus früh schriftlich klären. |
| Solo-Betreiber-Risiko (Urlaub, Krankheit, Bus-Faktor) | Betriebe kaufen Verlässlichkeit: dokumentierter Notfallprozess, ggf. Backup-Freelancer; ehrlich in den Vertrag. |
| Churn nach Jahr 1 („wofür zahle ich noch?") | Monatlicher Lead-Report (s. o.), jährlicher „Website-TÜV", laufende Förder-Updates als sichtbarer Mehrwert. |
| Rechtliches (Fernabsatz, DSGVO/AVV, Gewährleistung) | Einmalig saubere Vorlagen (Anwalt/IT-Recht-Vorlagendienst) — vor Kunde Nr. 1, nicht danach. |
| Fördermarkt-Abhängigkeit: bricht die WP-Förderung ein, bricht das Hauptargument | Produkt trägt drei Funnels (WP, Bad, Kundendienst) — Positionierung nie nur auf Wärmepumpe bauen. |

---

## 11. Interview: offene Fragen (bitte beantworten)

Die Antworten verändern den Plan konkret — pro Frage steht dabei, was sich ändert.

**F1 · Geschäftsmodell:** Einmalprojekt, reines Abo, Hybrid oder White-Label?
→ *Ohne Antwort gehe ich von der Empfehlung Hybrid (Option C) aus.*

**F2 · Deine Kapazität & Rolle:** Wie viele Stunden/Woche, und siehst du dich
im Vertrieb (Telefon, Innung, Vorträge) oder nur in der Technik?
→ *„Nur Technik" verschiebt den Plan Richtung Empfehlungs-/Partnerkanäle
und mittelfristig White-Label; „Vertrieb ok" erlaubt Direktansprache und
schnellere Skalierung.*

**F3 · Referenz-Status:** Ist die ST-Haustechnik-Seite live, und gibt es
schon messbare Anfragen? Darfst du Zahlen + Testimonial verwenden?
→ *Falls nein: Phase 1 (Beweis sichern) wird zum alleinigen Fokus der
ersten 4–8 Wochen; Verkauf vorher ist Zeitverschwendung.*

**F4 · 12-Monats-Ziel:** Validierung, Nebeneinkommen (~1–3k €/Monat MRR)
oder Haupterwerb?
→ *Haupterwerb erfordert ab Tag 1 Vertriebspartner-Suche und höhere Preise;
Nebeneinkommen erlaubt den ruhigeren Empfehlungs-Weg.*

**F5 · Region & Exklusivität:** Willst du Gebietsschutz anbieten („nur 1
Betrieb pro Landkreis")? Das ist ein starkes Verkaufsargument in dieser
Branche, begrenzt aber die Skalierung pro Region.

**F6 · Heizreport-Verhältnis:** Gibt es Kontakt zu Heizreport? Wärst du
bereit, eine Partnerschaft aktiv anzufragen (Listung, Konditionen)?

---

## 12. KPIs (ab Woche 1 messen)

- Gespräche geführt / Angebote gestellt / Abschlüsse (Ziel Q1: 15 / 8 / 3)
- Onboarding-Zeit pro Kunde in Arbeitstagen (Ziel: ≤ 3)
- MRR und Churn (ab Kunde 1)
- Anfragen/Monat pro Kundenseite (das Produktversprechen selbst)

---

## Quellen

- [Was kostet eine Website für Handwerker? (2026)](https://webentwicklung-rottweil.de/blog/was-kostet-eine-website-fuer-handwerker/)
- [Handwerker-Website: Anbieter, Kosten & Tipps (websitewissen.com)](https://websitewissen.com/handwerker-website)
- [Handwerker-Website Kosten 2026 (BlackForest-WebCraft)](https://blackforest-webcraft.de/blog/handwerker-website-kosten-2026/)
- [SHK-Stundensätze 2026 (handwerkerjobkit.de)](https://www.handwerkerjobkit.de/handwerker-kosten/shk)
- [Wärmepumpen-Leads generieren, Lead-Kosten (marketingexperten.de)](https://www.marketingexperten.de/blog/waermepumpen-leads-generieren)
- [SHK-Leads / Lead-Portale (leadsagentur.de)](https://leadsagentur.de/branchen/handwerker-leads/shk/)
- [SEO-Agentur für SHK-Betriebe (marketing-meer.de)](https://marketing-meer.de/seo-agentur-shk-betriebe/)
- [Handwerker-Software-Vergleich (blog.meisterwerk.app)](https://blog.meisterwerk.app/handwerksunternehmer/handwerker-software-vergleich-6-anbieter)
