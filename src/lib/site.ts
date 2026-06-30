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
  // TODO: echte Profil-Links für sameAs/Bewertungen eintragen
  google: "",
  myhammer: "",
} as const;
