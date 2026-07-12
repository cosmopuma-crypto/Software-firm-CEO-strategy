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
