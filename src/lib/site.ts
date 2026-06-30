// Zentrale Stammdaten (echte Daten aus dem alten Quelltext / Inhaber-Angaben).
export const SITE = {
  name: "ST-Haustechnik",
  legalName: "ST-Haustechnik GmbH",
  claim: "Ihr Fachbetrieb für Sanitär, Heizung & Wärmepumpen in Neumünster",
  street: "Vichowstraße 7",
  zip: "24537",
  city: "Neumünster",
  region: "Schleswig-Holstein",
  country: "DE",
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
  // Bewertungsprofile. TODO: exakte Profil-URLs vom Inhaber eintragen.
  google: "https://www.google.com/maps/search/?api=1&query=ST+Haustechnik+GmbH+Neum%C3%BCnster",
  myhammer: "https://www.my-hammer.de/",
  rating: { value: 4.9, count: 37 }, // Google 4,9/23 + MyHammer 5,0/14
} as const;
