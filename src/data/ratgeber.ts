// Ratgeber-Artikel für den organischen SEO-Ausbau (kaufnahe Long-Tail-Anfragen).
//
// Redaktionsregeln:
// - Ehrlich und konkret, keine Werbefloskeln; Zahlen nur, wenn belastbar.
// - Förderkonditionen ändern sich → immer mit Stand-Datum und Hinweis auf
//   tagesaktuelle Prüfung schreiben, nie als Garantie formulieren.
// - Jeder Artikel endet fachlich; der CTA kommt aus dem Seiten-Template.

export interface RatgeberSection {
  readonly heading: string;
  readonly paragraphs: readonly string[];
  /** Optionale Aufzählung unter den Absätzen. */
  readonly bullets?: readonly string[];
}

export interface RatgeberArtikel {
  readonly slug: string;
  readonly title: string;
  /** Kurzbeschreibung für Meta-Description und Index-Karte. */
  readonly description: string;
  /** Anreißer auf der Artikelseite (unter der H1). */
  readonly teaser: string;
  readonly datePublished: string;
  readonly stand: string;
  readonly sections: readonly RatgeberSection[];
}

export const RATGEBER: readonly RatgeberArtikel[] = [
  {
    slug: "kfw-foerderung-neu-2026",
    title: "KfW-Heizungsförderung: Diese neuen Regeln gelten seit dem 21. Juli 2026",
    description:
      "Seit dem 21. Juli 2026 gelten neue Regeln für die KfW-Heizungsförderung: Klima-Bonus sinkt, neuer Einkommensbonus. Was Hausbesitzer in Neumünster & Umgebung jetzt wissen müssen.",
    teaser:
      "Seit dem 21. Juli 2026 vergibt die KfW die Heizungsförderung nach neuen Regeln. Die wichtigste Nachricht für Hausbesitzer: Die Zuschüsse bleiben hoch, werden aber ab jetzt schrittweise gekürzt. Hier steht, was sich geändert hat und was das in Euro bedeutet.",
    datePublished: "2026-07-20",
    stand: "Juli 2026",
    sections: [
      {
        heading: "Das Wichtigste in Kürze",
        paragraphs: [
          "Die Grundförderung von 30 Prozent bleibt bestehen. Der Klimageschwindigkeits-Bonus für den Austausch alter Öl- und Gasheizungen wurde jedoch von 20 auf 16 Prozent gesenkt – und sinkt ab Februar 2027 alle sechs Monate um weitere 4 Prozentpunkte. Der bisherige Effizienzbonus von 5 Prozent ist entfallen. Neu ist ein gestaffelter Einkommensbonus von bis zu 40 Prozent für Haushalte mit niedrigem und mittlerem Einkommen, mit einem Zuschlag für Familien mit minderjährigen Kindern. Die förderfähigen Kosten für die erste Wohneinheit wurden von 30.000 auf 28.000 Euro abgesenkt und sinken 2027 weiter.",
        ],
      },
      {
        heading: "Was bedeutet das in Euro?",
        paragraphs: [
          "Ein Rechenbeispiel aus unserer täglichen Praxis in Neumünster: Eine Luft-Wasser-Wärmepumpe für ein Einfamilienhaus kostet komplett installiert häufig rund 32.000 Euro. Mit Grundförderung und Klimageschwindigkeits-Bonus (zusammen 46 Prozent auf die förderfähigen Kosten) ergibt das aktuell einen Zuschuss von rund 12.900 Euro. Haushalte, die zusätzlich den Einkommensbonus erhalten, kommen deutlich höher, in der Spitze auf bis zu 70 Prozent.",
          "Wer wartet, verliert Geld: Sinkt der Klima-Bonus im Februar 2027 auf 12 Prozent, schrumpft der Zuschuss im selben Beispiel um mehr als 1.100 Euro. Ein halbes Jahr später noch einmal.",
        ],
      },
      {
        heading: "Der neue Einkommensbonus: Für viele die größte Chance",
        paragraphs: [
          "Neu ist die soziale Staffelung: Haushalte mit einem zu versteuernden Jahreseinkommen bis etwa 30.000 Euro erhalten den vollen Einkommensbonus von 40 Prozent, darüber gelten abgestufte Sätze; für jedes minderjährige Kind verschiebt sich die Einkommensgrenze nach oben. Interessant ist das vor allem für Eigentümer mit abbezahltem Haus und überschaubarer Rente. Viele davon dachten bisher, eine Wärmepumpe sei für sie unbezahlbar. Gerade für diese Haushalte lohnt sich das Nachrechnen jetzt.",
        ],
      },
      {
        heading: "Was sollten Hausbesitzer jetzt tun?",
        paragraphs: [
          "Erstens: Prüfen lassen, ob das eigene Haus für eine Wärmepumpe geeignet ist – im Bestand geht das häufiger als gedacht, oft mit den vorhandenen Heizkörpern. Zweitens: den persönlichen Förderanspruch berechnen lassen, denn der hängt jetzt stark von Einkommen und Haushaltssituation ab. Drittens: nicht auf bessere Zeiten warten. Die Kürzungen sind beschlossen und terminiert.",
          "Wichtig zu wissen: Der Förderantrag muss vor Beginn des Vorhabens gestellt werden und setzt einen Vertrag mit einem Fachbetrieb voraus. Wir übernehmen die komplette Antragsstellung für unsere Kunden, von der Heizlastberechnung bis zum Verwendungsnachweis.",
        ],
      },
      {
        heading: "Häufige Fragen",
        paragraphs: [],
        bullets: [
          "Wie hoch ist die Förderung seit dem 21.07.2026? 30 % Grundförderung, 16 % Klimageschwindigkeits-Bonus (beim Austausch alter Öl-/Gasheizungen), dazu je nach Haushaltseinkommen bis zu 40 % Einkommensbonus. Die Boni sind insgesamt gedeckelt; förderfähig sind bis zu 28.000 € für die erste Wohneinheit.",
          "Sinkt die Förderung wirklich weiter? Ja. Der Klimageschwindigkeits-Bonus sinkt ab Februar 2027 planmäßig alle sechs Monate um 4 Prozentpunkte, auch die förderfähigen Kosten werden weiter abgesenkt.",
          "Wer bekommt den neuen Einkommensbonus? Haushalte mit niedrigem und mittlerem zu versteuernden Einkommen, gestaffelt bis ca. 50.000 € Jahreseinkommen; Familien mit minderjährigen Kindern profitieren von einer erhöhten Einkommensgrenze.",
          "Muss ich den Antrag selbst stellen? Nein. Als Fachbetrieb übernehmen wir die komplette Antragsabwicklung bei der KfW für Sie – inklusive aller Nachweise.",
        ],
      },
    ],
  },
  {
    slug: "waermepumpe-kosten",
    title: "Was kostet eine Wärmepumpe 2026 wirklich? Ehrliche Zahlen aus der Praxis",
    description:
      "Was kostet eine Wärmepumpe mit Einbau? Ehrliche Zahlen aus der Praxis: Anschaffung, Förderung, Eigenanteil und Betriebskosten – vom Fachbetrieb aus Neumünster.",
    teaser:
      "Die häufigste Frage in unseren Beratungsgesprächen ist zugleich die, auf die man online die wenigsten ehrlichen Antworten findet: Was kostet das Ganze? Hier sind die Zahlen, mit denen wir als Fachbetrieb in Neumünster täglich arbeiten, samt der Posten, die in vielen Angeboten fehlen.",
    datePublished: "2026-07-20",
    stand: "Juli 2026",
    sections: [
      {
        heading: "Die Gesamtkosten im Überblick",
        paragraphs: [
          "Für eine Luft-Wasser-Wärmepumpe im typischen Einfamilienhaus (120–160 m², Bestand) liegen die Gesamtkosten inklusive Einbau derzeit meist zwischen 27.000 und 38.000 Euro. Darin steckt deutlich mehr als nur das Gerät: die Wärmepumpe selbst (12.000–18.000 Euro je nach Leistung und Hersteller), ein Pufferspeicher und gegebenenfalls ein neuer Warmwasserspeicher (2.000–4.000 Euro), Demontage und Entsorgung der Altanlage, hydraulischer Abgleich, Elektroarbeiten inklusive eventueller Anpassung des Zählerschranks, Fundament und Schallschutz für die Außeneinheit sowie Inbetriebnahme und Einregulierung.",
          "Seriös ist eine Preisangabe erst nach einer Heizlastberechnung. Wenn Ihnen jemand am Telefon einen Festpreis nennt, ohne Ihr Haus zu kennen: Vorsicht.",
        ],
      },
      {
        heading: "Welche Kostentreiber gibt es?",
        paragraphs: [
          "Teurer wird es vor allem, wenn einzelne Heizkörper getauscht werden müssen (pro Stück einige hundert Euro), wenn die Elektroinstallation veraltet ist oder wenn Warmwasser für viele Personen bereitgestellt werden muss. Günstiger wird es, wenn Ihre Heizkörper bereits ausreichend dimensioniert sind – was häufiger der Fall ist, als viele denken.",
        ],
      },
      {
        heading: "Der entscheidende Posten: die Förderung",
        paragraphs: [
          "Von den Gesamtkosten geht die staatliche Förderung ab, und die ist auch nach den neuen KfW-Regeln vom 21. Juli 2026 erheblich: 30 Prozent Grundförderung, 16 Prozent Klimageschwindigkeits-Bonus beim Austausch einer alten Öl- oder Gasheizung und je nach Haushaltseinkommen bis zu 40 Prozent Einkommensbonus, gedeckelt auf förderfähige Kosten von 28.000 Euro.",
          "Rechenbeispiel: Anlage komplett 32.000 Euro, Förderung 46 Prozent auf 28.000 Euro = 12.880 Euro Zuschuss, Eigenanteil rund 19.100 Euro. Mit Einkommensbonus kann der Eigenanteil auf unter 12.000 Euro sinken.",
        ],
      },
      {
        heading: "Und die Betriebskosten?",
        paragraphs: [
          "Eine gut geplante Wärmepumpe erzeugt aus einer Kilowattstunde Strom drei bis vier Kilowattstunden Wärme (Jahresarbeitszahl 3–4). Bei einem Wärmebedarf von 18.000 kWh und einem Wärmepumpen-Stromtarif ergibt das typischerweise 1.200 bis 1.800 Euro Stromkosten pro Jahr. Eine alte Gas- oder Ölheizung liegt häufig bei 2.200 bis 3.000 Euro, und der Abstand wird durch den steigenden CO₂-Preis eher größer. Dazu kommt: Eine Wärmepumpe braucht keinen Schornsteinfeger für die Abgasmessung und deutlich weniger Wartung.",
        ],
      },
      {
        heading: "Unterm Strich",
        paragraphs: [
          "Wer nur den Anschaffungspreis vergleicht, rechnet an der Realität vorbei. Entscheidend ist die Rechnung über 15 bis 20 Jahre: Eigenanteil nach Förderung plus Betriebskosten. In den meisten Bestandshäusern unserer Region gewinnt dabei die Wärmepumpe. Nicht in allen. Deshalb beginnt bei uns jedes Projekt mit einer Prüfung und nicht mit einem Angebot.",
        ],
      },
      {
        heading: "Häufige Fragen",
        paragraphs: [],
        bullets: [
          "Was kostet eine Wärmepumpe im Einfamilienhaus komplett? Inklusive Einbau meist 27.000 bis 38.000 €. Nach Abzug der KfW-Förderung bleibt häufig ein Eigenanteil von 12.000 bis 20.000 €.",
          "Was kostet der Betrieb pro Jahr? Bei einer Jahresarbeitszahl von 3–4 typischerweise 1.200 bis 1.800 € Strom pro Jahr im Einfamilienhaus – meist deutlich weniger als eine alte Öl- oder Gasheizung.",
          "Lohnt sich eine Wärmepumpe finanziell? In den meisten Bestandsgebäuden ja, dank Förderung und niedrigerer Betriebskosten. Entscheidend ist die Gesamtrechnung über 15–20 Jahre – die sollte ein Fachbetrieb individuell erstellen.",
        ],
      },
    ],
  },
  {
    slug: "waermepumpe-lautstaerke",
    title: "Wie laut ist eine Wärmepumpe wirklich? Fakten statt Nachbarschafts-Mythen",
    description:
      "Wie laut ist eine Wärmepumpe? Echte Dezibel-Werte, die TA-Lärm-Grenzwerte und wie die richtige Aufstellung Lärmprobleme mit Nachbarn von vornherein vermeidet.",
    teaser:
      "„Und was sagen die Nachbarn dazu?“ Kaum ein Beratungsgespräch, in dem diese Frage nicht fällt. Die kurze Antwort: Bei richtiger Planung hören Ihre Nachbarn nichts. Die lange Antwort mit echten Zahlen lesen Sie hier.",
    datePublished: "2026-07-20",
    stand: "Juli 2026",
    sections: [
      {
        heading: "Die Zahlen im Vergleich",
        paragraphs: [
          "Moderne Luft-Wasser-Wärmepumpen erreichen in drei Metern Abstand typischerweise 30 bis 40 Dezibel. Zur Einordnung: Ein leises Schlafzimmer liegt bei etwa 30 dB, ein Kühlschrank bei 35–40 dB, normale Unterhaltung bei 60 dB. Viele aktuelle Geräte bieten zusätzlich einen „Silent Mode“ für die Nacht, der die Leistung leicht reduziert und den Schall weiter senkt.",
          "Ältere oder billige Geräte konnten deutlich lauter sein. Daher stammen die meisten Gruselgeschichten. Wer heute ein Qualitätsgerät fachgerecht aufstellt, bewegt sich weit unterhalb dessen, was im Alltag als störend empfunden wird.",
        ],
      },
      {
        heading: "Was gilt rechtlich?",
        paragraphs: [
          "Maßgeblich ist die TA Lärm: In reinen Wohngebieten dürfen nachts an den Fenstern der Nachbarn 35 dB(A) nicht überschritten werden, in allgemeinen Wohngebieten 40 dB(A). Dazu kommen je nach Bundesland Abstandsregeln. Klingt streng, ist mit heutiger Gerätetechnik und richtiger Aufstellung aber gut einzuhalten. Wichtig: Die Einhaltung nachzuweisen ist Aufgabe des Fachbetriebs, nicht Ihre.",
        ],
      },
      {
        heading: "So vermeiden wir Lärmprobleme von vornherein",
        paragraphs: [
          "Bei der Planung entscheiden vier Dinge über die Geräuschkulisse: der Aufstellort (nicht direkt vor Schlafzimmer- oder Nachbarfenster, nicht in schallreflektierende Ecken zwischen zwei Wänden), der Untergrund (schwingungsentkoppeltes Fundament statt Hauswand-Montage), die Geräteauswahl (der Schallleistungspegel steht in jedem Datenblatt) und die Einregulierung, denn eine korrekt dimensionierte Anlage taktet seltener und läuft leiser. Diese Punkte gehören bei uns zu jeder Planung nach VDI 4645.",
        ],
      },
      {
        heading: "Unser Rat",
        paragraphs: [
          "Nehmen Sie das Thema ernst, aber lassen Sie sich davon nicht abschrecken: Lautstärke ist heute ein Planungsthema, kein Ausschlusskriterium. Wenn Sie mögen, zeigen wir Ihnen bei einem Vor-Ort-Termin, wo die Außeneinheit bei Ihnen stehen würde und welche Werte dort realistisch ankommen.",
        ],
      },
      {
        heading: "Häufige Fragen",
        paragraphs: [],
        bullets: [
          "Wie viel Dezibel hat eine Wärmepumpe? Moderne Luft-Wasser-Wärmepumpen liegen in 3 m Abstand bei etwa 30–40 dB – vergleichbar mit einem Kühlschrank. Nachtmodi reduzieren den Schall zusätzlich.",
          "Kann sich mein Nachbar über die Wärmepumpe beschweren? Nur wenn die Grenzwerte der TA Lärm überschritten werden (35 dB(A) nachts im reinen Wohngebiet). Bei fachgerechter Planung und Aufstellung werden diese Werte sicher eingehalten.",
          "Wo sollte die Außeneinheit stehen? Mit Abstand zu Schlafzimmer- und Nachbarfenstern, auf schwingungsentkoppeltem Fundament und nicht in schallreflektierenden Ecken. Die Standortwahl ist Teil der Fachplanung.",
        ],
      },
    ],
  },
  {
    slug: "waermepumpe-foerderung",
    title: "Wärmepumpen-Förderung: So sichern Sie sich bis zu 70 % Zuschuss",
    description:
      "BEG-Förderung für die Wärmepumpe einfach erklärt: Grundförderung, Boni, Höchstbeträge, Antragsweg über die KfW – und die häufigsten Fehler, die Förderung kosten.",
    teaser:
      "Die staatliche Förderung ist der größte Kostenhebel beim Heizungstausch – richtig kombiniert übernimmt der Staat bis zu 70 % der förderfähigen Kosten. Hier erklären wir, wie sich der Zuschuss zusammensetzt, wie der Antrag läuft und welche Fehler Sie vermeiden sollten.",
    datePublished: "2026-07-12",
    stand: "Juli 2026",
    sections: [
      {
        heading: "So setzt sich die Förderung zusammen",
        paragraphs: [
          "Gefördert wird der Einbau einer Wärmepumpe über die Bundesförderung für effiziente Gebäude (BEG, „Heizungsförderung“ der KfW). Der Zuschuss besteht aus mehreren Bausteinen, die sich addieren lassen:",
        ],
        bullets: [
          "Grundförderung: 30 % der förderfähigen Kosten – für alle Antragsberechtigten.",
          "Klimageschwindigkeits-Bonus: +20 %, wenn Sie als selbstnutzende Eigentümer eine funktionierende alte Öl-, Gas-, Kohle- oder Nachtspeicherheizung austauschen (je nach Alter der Anlage).",
          "Einkommens-Bonus: +30 % für selbstnutzende Haushalte mit bis zu 40.000 € zu versteuerndem Jahreseinkommen.",
          "Effizienz-Bonus: +5 % z. B. für Wärmepumpen mit natürlichem Kältemittel oder Erdwärme als Wärmequelle.",
          "Gedeckelt ist die Summe bei 70 %. Förderfähig sind im Einfamilienhaus bis zu 30.000 € – der maximale Zuschuss liegt damit bei 21.000 €.",
        ],
      },
      {
        heading: "Wichtig: Konditionen ändern sich",
        paragraphs: [
          "Über die Höhe der Wärmepumpen-Förderung wird politisch immer wieder neu verhandelt – zuletzt wurde öffentlich über Kürzungen diskutiert. Was heute gilt, kann morgen anders aussehen. Zwei Dinge bleiben aber verlässlich: Erstens gilt für Ihren Antrag der Stand zum Zeitpunkt der Zusage. Zweitens lohnt es sich deshalb, nicht ewig zu warten, wenn der Heizungstausch ohnehin ansteht.",
          "Wir prüfen die aktuellen Konditionen bei jedem Projekt tagesaktuell und rechnen Ihnen im Angebot konkret vor, mit welchem Zuschuss Sie rechnen können.",
        ],
      },
      {
        heading: "So läuft der Antrag",
        paragraphs: [
          "Der Zuschuss wird vor Beginn des Vorhabens bei der KfW beantragt. Grundlage ist ein Liefer- oder Leistungsvertrag mit Ihrem Fachbetrieb, der eine aufschiebende Bedingung enthält – der Vertrag wird also erst wirksam, wenn die Förderzusage da ist. Dazu kommt eine Bestätigung zum Antrag (BzA), die wir gemeinsam mit einem Energieeffizienz-Experten erstellen.",
          "Klingt nach Papierkram? Ist es auch – deshalb übernehmen wir das als Förderservice komplett: von der BzA über den KfW-Antrag bis zum Verwendungsnachweis nach der Montage.",
        ],
      },
      {
        heading: "Die drei häufigsten Förder-Fehler",
        paragraphs: [],
        bullets: [
          "Zu früh beauftragt: Wer den Vertrag ohne aufschiebende Bedingung unterschreibt oder vor der Zusage mit dem Einbau beginnt, verliert den Anspruch.",
          "Boni verschenkt: Der Klimageschwindigkeits-Bonus setzt den Austausch einer alten fossilen Heizung voraus – wer die Altanlage vorschnell anders entsorgt oder falsch deklariert, lässt 20 % liegen.",
          "Falsche Anlagenwahl: Nur Wärmepumpen mit nachgewiesener Effizienz sind förderfähig. Eine korrekt nach VDI 4645 ausgelegte Anlage erfüllt die Anforderungen – ein Schnäppchen-Gerät aus dem Internet oft nicht.",
        ],
      },
    ],
  },
  {
    slug: "waermepumpe-altbau",
    title: "Wärmepumpe im Altbau: Voraussetzungen, Kosten und was wirklich zählt",
    description:
      "Funktioniert eine Wärmepumpe im Altbau? Meistens ja – wenn Heizlast und Heizflächen passen. Die Voraussetzungen, der 55-Grad-Test und realistische Kosten im Überblick.",
    teaser:
      "„Im Altbau lohnt sich eine Wärmepumpe nicht“ – dieser Satz hält sich hartnäckig, stimmt aber in dieser Pauschalität nicht. Entscheidend sind wenige, messbare Kriterien. Wir zeigen, worauf es ankommt und wie Sie es bei Ihrem Haus herausfinden.",
    datePublished: "2026-07-12",
    stand: "Juli 2026",
    sections: [
      {
        heading: "Worauf es wirklich ankommt",
        paragraphs: [
          "Eine Wärmepumpe arbeitet dann effizient, wenn sie mit möglichst niedriger Vorlauftemperatur auskommt. Ob das in Ihrem Altbau klappt, hängt nicht am Baujahr, sondern an zwei Größen: der Heizlast des Gebäudes (wie viel Wärme es an kalten Tagen braucht) und den Heizflächen (wie gut Heizkörper oder Fußbodenheizung diese Wärme in die Räume bringen).",
          "Viele Bestandsgebäude – auch unsanierte – kommen mit Vorlauftemperaturen von 50 bis 55 °C aus. In diesem Bereich läuft eine moderne Luft-Wasser-Wärmepumpe bereits wirtschaftlich.",
        ],
      },
      {
        heading: "Der einfache Selbsttest an einem kalten Tag",
        paragraphs: [
          "Sie können die Eignung grob selbst prüfen: Stellen Sie an einem richtig kalten Wintertag die Vorlauftemperatur Ihrer bestehenden Heizung auf maximal 55 °C und drehen Sie die Thermostate auf. Werden alle Räume noch warm, ist Ihr Haus ein guter Kandidat für die Wärmepumpe – ganz ohne Dämm-Großprojekt.",
          "Beim kostenlosen Vor-Ort-Termin machen wir daraus eine belastbare Rechnung: raumweise Heizlast, Prüfung der Heizkörper, hydraulischer Abgleich. Häufig genügt es, einzelne Heizkörper gegen größere oder Niedertemperatur-Modelle zu tauschen.",
        ],
      },
      {
        heading: "Was kostet das – realistisch?",
        paragraphs: [
          "Für ein typisches Einfamilienhaus liegt eine komplette Luft-Wasser-Wärmepumpen-Anlage inklusive Montage, Speicher, Hydraulik und Inbetriebnahme meist im mittleren fünfstelligen Bereich vor Förderung. Nach Abzug des BEG-Zuschusses (bis zu 70 %, gedeckelt bei 21.000 € im Einfamilienhaus) bleibt der Eigenanteil oft deutlich unter dem, was viele erwarten – und unter den Gesamtkosten eines neuen Gas-Systems über dessen Lebensdauer gerechnet.",
          "Seriös beziffern lässt sich das erst nach dem Vor-Ort-Termin. Misstrauen Sie Pauschalpreisen aus dem Internet – nach oben wie nach unten.",
        ],
      },
      {
        heading: "Wann wir ehrlich abraten",
        paragraphs: [
          "Es gibt Fälle, in denen wir (noch) abraten: sehr hohe Heizlast bei gleichzeitig kleinen Heizflächen, kein sinnvoller Aufstellort für die Außeneinheit oder ein ohnehin anstehender Umbau, den man besser zuerst erledigt. Auch das sagen wir klar – lieber ein ehrliches Nein als eine Anlage, die Sie im Betrieb ärgert.",
        ],
      },
    ],
  },
  {
    slug: "waermepumpe-heizkoerper",
    title: "Wärmepumpe mit normalen Heizkörpern – funktioniert das?",
    description:
      "Fußbodenheizung ist ideal, aber kein Muss: Wann eine Wärmepumpe mit klassischen Heizkörpern effizient läuft, was der hydraulische Abgleich bringt und wann sich ein Heizkörpertausch lohnt.",
    teaser:
      "Die häufigste Frage in unseren Beratungen: „Wir haben doch nur normale Heizkörper – geht das überhaupt?“ Die kurze Antwort: häufig ja. Die längere Antwort mit den technischen Hintergründen lesen Sie hier.",
    datePublished: "2026-07-12",
    stand: "Juli 2026",
    sections: [
      {
        heading: "Warum die Vorlauftemperatur entscheidet",
        paragraphs: [
          "Heizkörper und Fußbodenheizung machen das Gleiche – sie übertragen Wärme vom Heizwasser in den Raum. Der Unterschied ist die Fläche: Eine Fußbodenheizung hat viel Fläche und kommt deshalb mit sehr niedrigen Wassertemperaturen aus. Heizkörper haben weniger Fläche und brauchen wärmeres Wasser.",
          "Für die Wärmepumpe zählt genau diese Wassertemperatur (Vorlauftemperatur): Je niedriger, desto effizienter. Die gute Nachricht: Viele Heizkörper in Bestandsgebäuden sind großzügiger dimensioniert, als es der ursprüngliche Kessel je gebraucht hätte – und funktionieren deshalb auch bei 50 bis 55 °C.",
        ],
      },
      {
        heading: "Drei Stellschrauben, bevor getauscht wird",
        paragraphs: [],
        bullets: [
          "Hydraulischer Abgleich: Sorgt dafür, dass jeder Heizkörper genau die richtige Wassermenge bekommt. Senkt die nötige Vorlauftemperatur oft spürbar und ist ohnehin Fördervoraussetzung.",
          "Einzelne Heizkörper vergrößern: Meist reicht es, die zwei, drei knappsten Heizkörper (typisch: Bad, Wohnzimmer) gegen größere zu tauschen – kein Komplettumbau.",
          "Niedertemperatur-Heizkörper: Moderne Wärmepumpen-Heizkörper mit Lüfterunterstützung liefern bei niedrigen Temperaturen deutlich mehr Leistung auf gleicher Fläche.",
        ],
      },
      {
        heading: "So finden wir es für Ihr Haus heraus",
        paragraphs: [
          "Beim Vor-Ort-Termin berechnen wir die Heizlast Raum für Raum und gleichen sie mit den vorhandenen Heizkörpern ab. Das Ergebnis ist eine klare Aussage: welche Heizkörper bleiben, welche wir tauschen sollten, und mit welcher Vorlauftemperatur Ihre Wärmepumpe laufen wird. Erst daraus entsteht das Angebot – korrekt ausgelegt nach VDI 4645, ohne Sicherheitszuschläge ins Blaue.",
          "Übrigens: Eine überdimensionierte Wärmepumpe ist genauso ein Planungsfehler wie eine zu kleine. Sie taktet häufiger, verschleißt schneller und verbraucht mehr Strom. Die saubere Auslegung ist der eigentliche Schlüssel – nicht die Frage Heizkörper oder Fußbodenheizung.",
        ],
      },
    ],
  },
];

export function artikelBySlug(slug: string): RatgeberArtikel | undefined {
  return RATGEBER.find((a) => a.slug === slug);
}
