// Zentrale Stammdaten (echte Daten aus dem alten Quelltext / Inhaber-Angaben).
export const SITE = {
  name: "ST-Haustechnik",
  legalName: "ST-Haustechnik GmbH",
  claim: "Ihr Fachbetrieb für Sanitär, Heizung & Wärmepumpen in Neumünster",
  street: "Virchowstraße 7",
  zip: "24536",
  city: "Neumünster",
  region: "Schleswig-Holstein",
  country: "DE",
  managingDirector: "Max-Peter Stürck",
  register: "Amtsgericht Neumünster, HRB 23017 KI",
  taxNumber: "20/290/11999",
  email: "info@st-haustechnik.de",
  phone: "0157 39596636",
  phoneHref: "tel:+4915739596636",
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
} as const;
