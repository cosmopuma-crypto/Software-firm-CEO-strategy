# Vertriebsplan: SHK-Website-Lösung an Handwerksbetriebe verkaufen

> Stand: Juli 2026 · Status: **abgestimmt** (Interview-Antworten eingearbeitet, siehe Abschnitt 11)
> Grundlage: die für ST-Haustechnik gebaute Next.js-Website (Badplaner,
> Kundendienst-Formular, Wärmepumpen-Check + Förderrechner via Heizreport,
> Trustindex-Bewertungen, lokales SEO, Lead-Zustellung per E-Mail/Webhook).
>
> **Rahmenbedingungen laut Interview:** Hybrid-Modell (Setup + Abo) ·
> solo, nebenbei mit **< 10 h/Woche** · ST-Haustechnik ist der **eigene
> Betrieb/Familie** (Referenz voll nutzbar) · Ziel: **Validierung mit 3–5
> zahlenden Kunden in 12 Monaten**.

---

## 1. Kurzfassung (TL;DR)

**Ja, es gibt einen Markt — aber nicht für „eine Website", sondern für
„planbare Anfragen".** SHK-Betriebe kaufen keine Technik, sie kaufen
Wärmepumpen-Leads, Bad-Anfragen und weniger Telefonchaos. Der Markt ist
gleichzeitig **voll mit Anbietern** (Baukästen ab ~20 €/Monat, Freelancer
1.000–4.000 €, Agenturen 2.000–10.000 €+, Lead-Portale, SHK-Marketing-Agenturen
mit 500–1.500 €/Monat SEO-Retainern). Eine weitere „Website-Agentur" hat
keine Chance — ein **produktisiertes Lead-System speziell für SHK** schon.

**Entschieden:** Hybrid-Modell (einmalige Einrichtung + monatliches Abo),
positioniert als **„Vom SHK-Betrieb für SHK-Betriebe"** — die stärkste
Story im Markt, weil du selbst aus der Branche kommst und die eigene Seite
der Beweis ist. Validierung mit 3–5 Pilotkunden, bevor irgendetwas
skaliert wird. Bei < 10 h/Woche ist der realistische Zeithorizont dafür
**4–6 Monate, nicht 90 Tage** — der Plan unten ist darauf ausgelegt.

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
5. **Abhängigkeit Heizreport — entschärft:** Für Kunden ohne eigenen
   Heizreport-Account wird der Wärmepumpen-Check durch den **eigenen
   Konfigurator** ersetzt. Damit ist das Produkt ohne Drittanbieter
   verkaufbar; Heizreport wird zum optionalen Premium-Baustein für
   Betriebe, die es ohnehin nutzen.

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

### Option C — Hybrid: Setup + Abo ✅ GEWÄHLT (Interview F1)
**990–1.990 € Einrichtung + 149–249 €/Monat.**
Setup deckt den Onboarding-Aufwand, das Abo baut MRR auf. Marktüblich,
für Betriebe nachvollziehbar („Einrichtung + laufender Betrieb"), und es
filtert Schnäppchenjäger heraus, die später die teuersten Kunden sind.

**Konkreter Pilotpreis (bei < 10 h/Woche bewusst nicht zu billig):**
990 € Setup + 179 €/Monat, 12 Monate Laufzeit, als Pilotkondition
deklariert mit Testimonial-Vereinbarung. Wenige, gut zahlende Kunden
schlagen viele billige — dein Zeitbudget ist der Engpass, nicht die
Nachfrage.

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

**Positionierungssatz (angepasst an „eigener Betrieb" aus dem Interview):**
> „Wir sind selbst ein SHK-Betrieb. Diese Website bringt uns unsere
> Wärmepumpen- und Bad-Anfragen — jetzt bekommst du dieselbe Lösung:
> Wärmepumpen-Check, Förderrechner und Bad-Konfigurator, live in 14 Tagen,
> exklusive Anfragen direkt in dein Postfach."

Das ist glaubwürdiger als jede Agentur-Botschaft: Du verkaufst nichts,
was du nicht selbst benutzt. Diese Story konsequent überall führen
(Angebot, Website, Gespräch).

**Wichtig wegen Eigenbetrieb:** Betriebe im eigenen Einzugsgebiet sind
Wettbewerber von ST-Haustechnik. Entweder außerhalb des eigenen
Kerngebiets verkaufen oder Gebietsschutz als Feature einpreisen
(„1 Betrieb pro Gebiet — wir machen das selbst genauso"). Das löst den
Interessenkonflikt und ist zugleich ein Verkaufsargument.

---

## 6. Vertriebswege (zugeschnitten auf solo + < 10 h/Woche)

Bei deinem Zeitbudget zählt nur, was **pro investierter Stunde** die
meisten warmen Gespräche bringt. Dein unfairer Vorteil: Als eigener
Betrieb hast du bereits echte Beziehungen zu Großhandel, Innung und
Kollegenbetrieben — nutze die, statt kalte Kanäle aufzubauen.

1. **Eigenes Netzwerk (Kanal Nr. 1, sofort):** Als SHK-Betrieb kennst du
   Kollegen aus Nachbarregionen persönlich — über Großhandel, Innung,
   Hersteller-Schulungen. 5–10 direkte Ansprachen („Schau, was unsere
   Seite uns bringt — willst du das auch?") sind der schnellste Weg zu
   den ersten 3 Piloten. Kein Kanal schlägt das bei deinem Zeitbudget.
   Empfehlungsprämie für Weiterempfehlungen (z. B. 1 Monat gratis).
2. **Heizreport-Partnerschaft (hoher Hebel, geringer Zeitaufwand):** Du
   bist zahlender API-Nutzer und Integrations-Showcase. Eine E-Mail mit
   der Bitte um Listung als Umsetzungspartner kostet 30 Minuten — deren
   Kundenbasis ist exakt deine Zielgruppe.
3. **Großhandels-Außendienst als Multiplikator:** Deinem
   Großhandels-Vertreter (GC, Pietsch, Richter+Frenzel …) die Referenz
   zeigen — der sitzt jede Woche bei 20 anderen Inhabern am Tisch und
   empfiehlt gern etwas, das seine Kunden erfolgreicher macht. Ein
   Gespräch, dauerhafte Reichweite.
4. **Innung/Kreishandwerkerschaft (passiv halten):** Kein eigener Vortrag
   (zu zeitintensiv) — aber die Fallstudie beim Obermeister/Newsletter
   platzieren und bei ohnehin stattfindenden Versammlungen erwähnen.

**Bewusst NICHT (bei < 10 h/Woche erst recht):** bezahlte Ads, Messen
mit Standkosten, Kaltakquise, individuelle Video-Audits, Content-Marketing
— alles frisst dein Zeitbudget, bevor es wirkt. Erst ab Kunde 5+ und
nur, wenn du dann mehr Zeit investieren willst.

---

## 7. Validierungsplan (angepasst: < 10 h/Woche → ~5 Monate statt 90 Tage)

Budgetrealität: < 10 h/Woche ≈ **~40 h/Monat**. Ein Onboarding kostet
anfangs ~3 Personentage (~24 h) — d. h. **maximal 1 Neukunde pro Monat**
neben Vertrieb und Support. Der Plan rechnet damit, statt es zu ignorieren.

### Phase 1 — Beweis sichern (Monat 1, ~30–40 h)
- [ ] Tracking auf der eigenen Seite: Anfragen/Monat, Quellen, einfaches
      Conversion-Dashboard (DSGVO-konform, z. B. serverseitig/Plausible)
- [ ] Fallstudie schreiben — als eigener Betrieb brauchst du niemanden zu
      fragen: Zahlen, eigenes Zitat, Screenshots („Diese Seite bringt uns
      X Anfragen im Monat")
- [ ] Demo-Instanz „Musterbetrieb Mustermann GmbH" deployen
- [ ] Einseitiges Angebot: Leistungsumfang, Preis, 14-Tage-Lieferversprechen,
      Gebietsschutz-Regelung
- [ ] Vertragsvorlage klären (Laufzeit, Kündigung, Eigentum an Domain/Inhalten,
      AV-Vertrag) — einmalig Anwalt/Vorlagen-Dienst nutzen

### Phase 2 — Erste 3 Pilotkunden (Monat 2–5, je ~1 Kunde/Monat)
- [ ] Pilotpreis: 990 € Setup + 179 €/Monat, offen als Pilotkondition
      deklariert, mit Testimonial-Vereinbarung — **nicht gratis**: wer
      nichts zahlt, gibt kein echtes Kaufsignal
- [ ] Kanäle 1–3 (eigenes Netzwerk, Heizreport, Großhandels-Außendienst),
      Ziel: 10–15 Gespräche → 3 Abschlüsse
- [ ] Jedes Onboarding dokumentieren und nach jedem Kunden 1–2 Schritte
      automatisieren → Ziel: Onboarding-Zeit halbieren bis Kunde 3

### Phase 3 — Entscheiden (nach Kunde 3 bzw. spätestens Monat 6)
Harte Kriterien, jetzt festgelegt:
- **Weiter & produktisieren**, wenn ≥ 3 zahlende Kunden UND Onboarding auf
  ≤ 1,5 Arbeitstage pro Kunde gesunken ist (sonst frisst jeder weitere
  Kunde dein gesamtes Zeitbudget).
- **Pivot zu White-Label/Agentur-Zulieferer**, wenn Gespräche gut laufen,
  aber Betriebe nicht direkt kaufen.
- **Stopp/Hobby**, wenn < 2 Abschlüsse aus ≥ 10 echten Gesprächen — dann
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
kein Unternehmen. Mit deinem Zeitbudget (< 10 h/Woche) liegt die
realistische Obergrenze bei **~10–15 Kunden** — und auch das nur, wenn
das Onboarding bis dahin auf ≤ 1,5 Tage automatisiert ist. Das passt zum
Validierungsziel (3–5 Kunden ≈ 900–1.100 € MRR + Setups). Alles darüber
verlangt eine bewusste neue Entscheidung: mehr eigene Zeit, ein Partner
für Vertrieb/Umsetzung oder die White-Label-Route.

---

## 10. Risiken & kritische Einwände (die dir Betriebe und die Realität entgegenhalten)

| Risiko / Einwand | Antwort / Gegenmaßnahme |
| --- | --- |
| „Ich habe genug Aufträge." | Zielgruppe schärfen: Betriebe, die *wachsen* oder von Notdienst auf WP/Bad umsteigen wollen. Nicht jeden überzeugen wollen. |
| „Mein Neffe macht das mit Wix." | Nicht Design verkaufen, sondern Funnel + Förderrechner + exklusive Leads. Gegen DIY gewinnt man über Ergebnis, nicht Optik. |
| Software-Anbieter bündeln Websites ins Abo | Geschwindigkeit + Spezialisierung; langfristig Integrationspartner statt Konkurrent werden (offene Lead-Schnittstellen). |
| Heizreport-Abhängigkeit | **Entschärft:** eigener WP-Konfigurator ersetzt den Check bei Kunden ohne Heizreport-Account; Heizreport ist optionaler Baustein. Partnerstatus trotzdem anfragen (Vertriebskanal). |
| Solo-Betreiber-Risiko (Urlaub, Krankheit, Bus-Faktor) | Betriebe kaufen Verlässlichkeit: dokumentierter Notfallprozess, ggf. Backup-Freelancer; ehrlich in den Vertrag. |
| Churn nach Jahr 1 („wofür zahle ich noch?") | Monatlicher Lead-Report (s. o.), jährlicher „Website-TÜV", laufende Förder-Updates als sichtbarer Mehrwert. |
| Rechtliches (Fernabsatz, DSGVO/AVV, Gewährleistung) | Einmalig saubere Vorlagen (Anwalt/IT-Recht-Vorlagendienst) — vor Kunde Nr. 1, nicht danach. |
| Interessenkonflikt: Kunden im eigenen Einzugsgebiet stärken den Wettbewerber von ST-Haustechnik | Außerhalb des Kerngebiets verkaufen und/oder Gebietsschutz anbieten — löst den Konflikt und ist zugleich Verkaufsargument. |
| Zeitbudget: < 10 h/Woche — ein anspruchsvoller Kunde oder eine Störung frisst den ganzen Monat | Support-Erwartung vertraglich definieren (Reaktionszeit „werktags binnen 48 h"), Standardprodukt ohne Sonderwünsche, Sonderwünsche nur gegen Aufpreis oder gar nicht. |
| Fördermarkt-Abhängigkeit: bricht die WP-Förderung ein, bricht das Hauptargument | Produkt trägt drei Funnels (WP, Bad, Kundendienst) — Positionierung nie nur auf Wärmepumpe bauen. |

---

## 11. Interview: Ergebnisse & verbleibende offene Fragen

### Beantwortet (Juli 2026)

| Frage | Antwort | Konsequenz im Plan |
| --- | --- | --- |
| F1 · Geschäftsmodell | **Hybrid: Setup + Abo** | Option C fixiert; Pilotpreis 990 € + 179 €/Monat (Abschnitt 4). |
| F2 · Kapazität | **Nebenbei, solo, < 10 h/Woche** | Zeitplan auf ~5 Monate gestreckt, max. 1 Onboarding/Monat, nur zeiteffiziente Kanäle (Abschnitte 6–7), Kundenobergrenze ~10–15 (Abschnitt 9). |
| F3 · Referenz | **Eigener Betrieb / Familie** | Stärkste Positionierung „Vom SHK-Betrieb für SHK-Betriebe"; Fallstudie ohne Freigabe-Hürden; eigenes Branchennetzwerk = Vertriebskanal Nr. 1; neuer Risikopunkt Interessenkonflikt im eigenen Gebiet (Abschnitte 5, 6, 10). |
| F4 · 12-Monats-Ziel | **Validieren: 3–5 zahlende Kunden** | Kein Skalierungsdruck; harte Weiter/Pivot/Stopp-Kriterien nach Kunde 3 bzw. Monat 6 (Abschnitt 7). |

### Noch offen (für die nächste Runde)

**F5 · Gebietsschutz:** Bietest du Exklusivität an („nur 1 Betrieb pro
Gebiet")? Empfehlung: **ja** — es löst deinen Interessenkonflikt als
Betriebsinhaber und ist in dieser Branche ein starkes Verkaufsargument.
Offen ist nur der Zuschnitt (Landkreis? PLZ-Radius?).

**F6 · Heizreport-Verhältnis:** Gibt es persönlichen Kontakt zu Heizreport?
Die Partner-Anfrage (Listung als Umsetzungspartner) kostet 30 Minuten und
ist der günstigste Hebel im ganzen Plan.

**F7 · Messdaten der eigenen Seite — beantwortet:** **ca. 3–5 Anfragen/
Monat**, nachvollziehbar über die eingehenden Anfrage-E-Mails. Das reicht
als Fallstudien-Basis (1 gewonnener WP- oder Bad-Auftrag pro Quartal
rechtfertigt das Abo um ein Vielfaches). Was fürs Tracking noch fehlt:

1. **Strukturiertes Lead-Log statt Postfach-Zählen:** kleines
   Server-Event in den Formular-Routen (`/api/contact` u. a.): Zeitpunkt,
   Formular-Typ (WP-Konfigurator / Badplaner / Kundendienst / Kontakt),
   Quelle — z. B. in eine Supabase-Tabelle. ~0,5 Arbeitstage. Basis für
   den späteren monatlichen Lead-Report an Kunden (Churn-Gegenmittel).
2. **Besucherzahlen für die Conversion-Rate:** DSGVO-freundliche,
   Cookie-lose Analytics (Plausible, Umami o. Vercel Analytics).
   „X Besucher → Y Anfragen" macht die Fallstudie erst belastbar und
   liefert das Argument gegen „mein Neffe macht das mit Wix".
3. **Quellen-Attribution:** Referrer + UTM-Parameter beim Absenden als
   verstecktes Feld mitschicken und ins Lead-Log schreiben — dann weißt
   du, ob Anfragen über Google, Maps oder direkt kommen.
4. Optional: Google-Business-Profil-Statistiken (Anrufe, Routen-Klicks)
   monatlich notieren — kostenlos, ergänzt das Bild.

---

## 12. KPIs (ab Woche 1 messen)

- Gespräche geführt / Angebote gestellt / Abschlüsse (Ziel bis Monat 5: 10–15 / 6 / 3)
- Onboarding-Zeit pro Kunde in Arbeitstagen (Start ~3, Ziel bis Kunde 3: ≤ 1,5)
- Eigene investierte Stunden/Woche (Budget: < 10 — ehrlich mitschreiben)
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
