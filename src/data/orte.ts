// Einzugsgebiets-Orte für die lokalen Wärmepumpen-Seiten (/waermepumpe/[ort]).
//
// WICHTIG (SEO): Jeder Ort bekommt ECHTE, unterscheidbare Inhalte (Lage,
// Anfahrt, typische Projekte) – keine austauschbaren Textbausteine. Sonst
// wertet Google die Seiten als Doorway-Pages ab. Neue Orte nur mit eigenem,
// inhaltlich gefülltem Eintrag ergänzen.
//
// Diese Inhalte gehören zum echten Betrieb (ST-Haustechnik, Neumünster).
// Die Demo-Instanz (IS_DEMO) rendert diese Seiten nicht.

export interface Ort {
  readonly slug: string;
  readonly name: string;
  /** Anfahrt ab Neumünster – bewusst als grobe, ehrliche Angabe. */
  readonly anfahrt: string;
  /** Individuelle Einleitung (2 Absätze). */
  readonly intro: readonly [string, string];
  /** Lokale Punkte (Lage/typische Projekte) – pro Ort unterschiedlich. */
  readonly punkte: readonly string[];
}

export const ORTE: readonly Ort[] = [
  {
    slug: "bad-bramstedt",
    name: "Bad Bramstedt",
    anfahrt: "ca. 20 Minuten ab Neumünster (über die A7/B206)",
    intro: [
      "Die Kurstadt Bad Bramstedt liegt gut 20 Autominuten südlich von Neumünster – für uns Alltag, nicht Ausnahme: Wärmepumpen-Projekte in Bad Bramstedt betreuen wir vom ersten Vor-Ort-Termin bis zur Wartung mit kurzen Wegen.",
      "Ob Einfamilienhaus am Stadtrand oder älteres Wohnhaus in Zentrumsnähe: Wir prüfen ehrlich, ob Ihr Gebäude bereit für eine Wärmepumpe ist, kümmern uns um die BEG-Förderung und montieren alles aus einer Hand.",
    ],
    punkte: [
      "Kurze Anfahrt über die A7 – schnelle Termine auch für Kundendienst und Wartung",
      "Erfahrung mit Bestandsgebäuden unterschiedlicher Baujahre, nicht nur Neubau",
      "Vor-Ort-Termin in Bad Bramstedt kostenlos und unverbindlich",
    ],
  },
  {
    slug: "bad-segeberg",
    name: "Bad Segeberg",
    anfahrt: "ca. 25 Minuten ab Neumünster (über die B205)",
    intro: [
      "Bad Segeberg, die Kreisstadt am Kalkberg, erreichen wir von Neumünster in rund 25 Minuten über die B205. Auch hier gilt: Beratung, Planung, Förderservice und Montage Ihrer Wärmepumpe kommen bei uns aus einer Hand.",
      "Gerade bei gewachsenen Wohngebieten mit Häusern aus verschiedenen Jahrzehnten lohnt der genaue Blick: Wir messen Heizlast und Heizflächen und sagen Ihnen klar, was sich bei Ihrem Haus rechnet – und was nicht.",
    ],
    punkte: [
      "Direkte Verbindung über die B205 – zuverlässig auch im Servicefall",
      "Ehrliche Bestandsaufnahme statt Standardangebot vom Reißbrett",
      "Förderservice inklusive: bis zu 70 % Zuschuss über die BEG",
    ],
  },
  {
    slug: "bordesholm",
    name: "Bordesholm",
    anfahrt: "ca. 15 Minuten ab Neumünster (Richtung Kiel, A7/B4)",
    intro: [
      "Bordesholm am Bordesholmer See liegt nur eine Viertelstunde nördlich von Neumünster – auf halbem Weg nach Kiel. Für Wärmepumpen-Interessenten aus Bordesholm und Umgebung sind wir der Fachbetrieb um die Ecke.",
      "Viele Häuser hier sind klassische Ein- und Zweifamilienhäuser mit Heizkörpern. Genau dafür sind wir da: Wir prüfen, ob die vorhandenen Heizflächen reichen, und legen die Anlage nach VDI 4645 korrekt aus – ohne teure Überdimensionierung.",
    ],
    punkte: [
      "Nur ca. 15 Minuten Anfahrt – schnelle Reaktionszeiten im Kundendienst",
      "Wärmepumpe mit vorhandenen Heizkörpern? Prüfen wir kostenlos vor Ort",
      "Komplettpaket inklusive Fundament, Hydraulik und Inbetriebnahme",
    ],
  },
  {
    slug: "wasbek",
    name: "Wasbek",
    anfahrt: "ca. 10 Minuten ab Neumünster (direkt angrenzend, B430)",
    intro: [
      "Wasbek grenzt direkt westlich an Neumünster – näher geht es kaum. Wärmepumpen-Kundinnen und -Kunden aus Wasbek profitieren von den kürzesten Wegen in unserem gesamten Einzugsgebiet.",
      "Vom schnellen Kundendienst-Einsatz bis zum kompletten Heizungstausch: Wir sind in wenigen Minuten bei Ihnen, kennen die Gegebenheiten vor Ort und begleiten Ihr Projekt persönlich von Anfang bis Ende.",
    ],
    punkte: [
      "Direkt angrenzend an Neumünster – Termine oft besonders kurzfristig möglich",
      "Ein Ansprechpartner für Wärmepumpe, Sanitär und Kundendienst",
      "Kostenlose Vor-Ort-Beratung inklusive Fördercheck",
    ],
  },
  {
    slug: "nortorf",
    name: "Nortorf",
    anfahrt: "ca. 15 Minuten ab Neumünster (über die B205/K-Straßen)",
    intro: [
      "Nortorf – die kleine Stadt im Herzen Schleswig-Holsteins – erreichen wir von Neumünster in etwa 15 Minuten. Auch hier installieren und warten wir Wärmepumpen als zertifizierter Fachbetrieb mit Sachkunde nach VDI 4645.",
      "Ob Modernisierung eines bestehenden Hauses oder Heizungstausch weg von Öl und Gas: Wir rechnen transparent vor, was Anlage und Betrieb kosten – und holen über den Förderservice den maximalen Zuschuss für Sie heraus.",
    ],
    punkte: [
      "Rund 15 Minuten Anfahrt – auch für Wartung und Störungsdienst",
      "Heizungstausch Öl/Gas → Wärmepumpe inklusive Demontage der Altanlage",
      "Transparentes Festangebot nach kostenlosem Vor-Ort-Termin",
    ],
  },
  {
    slug: "kaltenkirchen",
    name: "Kaltenkirchen",
    anfahrt: "ca. 25 Minuten ab Neumünster (über die A7)",
    intro: [
      "Kaltenkirchen wächst – und mit den vielen Bestandshäusern aus den 70er- bis 2000er-Jahren wächst auch die Zahl der Heizungen, die in den nächsten Jahren fällig werden. Über die A7 sind wir in rund 25 Minuten bei Ihnen.",
      "Für Eigentümerinnen und Eigentümer in Kaltenkirchen übernehmen wir alles aus einer Hand: von der ersten ehrlichen Einschätzung über Heizlastberechnung und Förderantrag bis zur Montage und späteren Wartung – ohne Subunternehmer.",
    ],
    punkte: [
      "Anfahrt über die A7 – Beratung, Montage und Kundendienst aus einer Hand",
      "Heizlastberechnung nach VDI 4645, oft mit den vorhandenen Heizkörpern",
      "Den kompletten KfW-Antrag samt Nachweisen übernehmen wir",
    ],
  },
  {
    slug: "wahlstedt",
    name: "Wahlstedt",
    anfahrt: "ca. 20 Minuten ab Neumünster (über die B205)",
    intro: [
      "Wahlstedt ist geprägt von Siedlungshäusern der 50er- bis 80er-Jahre. In den meisten davon läuft eine Wärmepumpe heute zuverlässig – oft ohne große Umbauten. Über die B205 sind wir in rund 20 Minuten vor Ort.",
      "Wir zeigen Ihnen ehrlich, was in Ihrem Haus geht: Erst prüfen wir Heizlast und Heizflächen, dann reden wir über ein Angebot. Falls sich eine Wärmepumpe bei Ihnen nicht rechnet, sagen wir Ihnen das.",
    ],
    punkte: [
      "Kurze Anfahrt über die B205 – auch für Wartung und Kundendienst",
      "Erfahrung mit Siedlungshäusern der 50er- bis 80er-Jahre",
      "Montage durch unser eigenes Team, Service danach ebenfalls",
    ],
  },
  {
    slug: "boostedt",
    name: "Boostedt",
    anfahrt: "ca. 10 Minuten ab Neumünster (direkt südlich, B4)",
    intro: [
      "Boostedt liegt direkt südlich von Neumünster an der B4 – für uns eine Anfahrt von etwa zehn Minuten. Wärmepumpen-Projekte in Boostedt betreuen wir genauso persönlich wie in Neumünster selbst.",
      "Wir schauen uns Ihr Haus vor Ort an, prüfen Heizlast, Heizflächen und Aufstellort und begleiten Sie durch Förderantrag, Montage und Inbetriebnahme – mit einem festen Ansprechpartner.",
    ],
    punkte: [
      "Ca. 10 Minuten Anfahrt – schnelle Hilfe auch bei Heizungsausfall",
      "Korrekte Auslegung nach VDI 4645 statt Anlage von der Stange",
      "Wartung und Service danach aus derselben Hand",
    ],
  },
];

export function ortBySlug(slug: string): Ort | undefined {
  return ORTE.find((o) => o.slug === slug);
}

export function ortByName(name: string): Ort | undefined {
  return ORTE.find((o) => o.name === name);
}
