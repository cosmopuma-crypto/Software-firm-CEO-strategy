// Zentrale Stammdaten der Website.
//
// Zwei Profile: der echte Betrieb (Default) und der neutrale „Musterbetrieb"
// für die Demo-Instanz, die Interessenten gezeigt wird. Umgeschaltet wird per
// Env-Var NEXT_PUBLIC_SITE_PROFILE=demo (zweites Vercel-Projekt auf demselben
// Repo, siehe docs/demo-instanz.md). Gleichzeitig ist dieses Profil-Modell der
// erste Produktisierungs-Schritt: Kunde Nr. 1 wird ein weiteres Profil.

export interface SiteProfile {
  readonly name: string;
  readonly legalName: string;
  readonly claim: string;
  readonly street: string;
  readonly zip: string;
  readonly city: string;
  readonly region: string;
  readonly country: string;
  readonly managingDirector: string;
  /** Fachliche Vertretung (Meister) fürs Impressum. */
  readonly technicalDirector: string;
  readonly register: string;
  readonly taxNumber: string;
  readonly email: string;
  /** Primäre Nummer (Festnetz) – überall als Hauptnummer verwendet. */
  readonly phone: string;
  readonly phoneHref: string;
  /** Mobil – sekundär (z. B. Impressum/Kontakt zusätzlich angezeigt). */
  readonly mobile: string;
  readonly mobileHref: string;
  readonly hours: string;
  readonly url: string;
  readonly geo: { readonly lat: number; readonly lng: number };
  readonly areaServed: readonly string[];
  /** Bewertungsprofile. */
  readonly google: string;
  readonly myhammer: string;
  readonly rating: { readonly value: number; readonly count: number };
}

// Echte Daten aus dem alten Quelltext / Inhaber-Angaben.
const ST_HAUSTECHNIK: SiteProfile = {
  name: "ST-Haustechnik",
  legalName: "ST-Haustechnik GmbH",
  claim: "Ihr Fachbetrieb für Sanitär, Heizung & Wärmepumpen in Neumünster",
  street: "Virchowstraße 7",
  zip: "24536",
  city: "Neumünster",
  region: "Schleswig-Holstein",
  country: "DE",
  managingDirector: "Max-Peter Stürck",
  technicalDirector: "Jens Peter Stürck",
  register: "Amtsgericht Neumünster, HRB 23017 KI",
  taxNumber: "20/290/11999",
  email: "info@st-haustechnik.de",
  phone: "04321 5399933",
  phoneHref: "tel:+4943215399933",
  mobile: "0157 39596636",
  mobileHref: "tel:+4915739596636",
  hours: "Mo–Fr 08:00–17:00 Uhr",
  // TODO: finale Domain bestätigen (Platzhalter = bestehende Domain)
  url: "https://www.st-haustechnik.de",
  geo: { lat: 54.0743, lng: 9.9819 }, // Neumünster (ungefähr) – TODO: exakt
  areaServed: [
    "Neumünster",
    "Bad Bramstedt",
    "Bad Segeberg",
    "Bordesholm",
    "Wasbek",
    "Nortorf",
    "Boostedt",
  ],
  // Bewertungsprofile (echte Links vom Inhaber).
  google: "https://maps.app.goo.gl/QTS2g2YLB2BCMh366",
  myhammer: "https://www.my-hammer.de/auftragnehmer/st-haustechnik-gmbh",
  rating: { value: 4.9, count: 37 }, // Google 4,9/23 + MyHammer 5,0/14
};

// Neutrales Demo-Profil: erkennbar fiktiv (Musterstadt, 0123-Nummern),
// damit die Demo niemanden täuscht. Kein Register-/Personenbezug zu
// realen Firmen; die Demo-Instanz ist zusätzlich noindex + gebannert.
const MUSTERBETRIEB: SiteProfile = {
  name: "Musterbetrieb Haustechnik",
  legalName: "Musterbetrieb Haustechnik GmbH (Demo)",
  claim: "Ihr Fachbetrieb für Sanitär, Heizung & Wärmepumpen in Musterstadt",
  street: "Musterstraße 1",
  zip: "12345",
  city: "Musterstadt",
  region: "Musterland",
  country: "DE",
  managingDirector: "Max Mustermann",
  technicalDirector: "Erika Musterfrau",
  register: "Demo-Website – kein Handelsregistereintrag",
  taxNumber: "00/000/00000",
  email: "demo@example.com",
  phone: "01234 567890",
  phoneHref: "tel:+491234567890",
  mobile: "0123 4567890",
  mobileHref: "tel:+491234567890",
  hours: "Mo–Fr 08:00–17:00 Uhr",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://musterbetrieb-demo.vercel.app",
  geo: { lat: 52.52, lng: 13.405 },
  areaServed: ["Musterstadt", "Beispielhausen", "Demodorf", "Altfeld"],
  google: "#",
  myhammer: "#",
  rating: { value: 4.9, count: 37 },
};

/** true, wenn diese Instanz als Demo („Musterbetrieb") läuft. */
export const IS_DEMO = process.env.NEXT_PUBLIC_SITE_PROFILE === "demo";

export const SITE: SiteProfile = IS_DEMO ? MUSTERBETRIEB : ST_HAUSTECHNIK;
