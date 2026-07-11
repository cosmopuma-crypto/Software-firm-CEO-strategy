import { buildEmail } from "./email-template";
import type {
  WaermepumpePayload,
  BadplanerPayload,
  KundendienstPayload,
} from "./schemas";

const waermepumpe: WaermepumpePayload = {
  formType: "waermepumpe",
  buildingType: "einfamilienhaus",
  yearBand: "1979_1994",
  livingAreaM2: 140,
  currentHeating: "oel",
  radiatorType: "heizkoerper",
  occupants: 4,
  goals: ["heizung_ersetzen", "foerderung_nutzen"],
  addressZip: "24536",
  addressCity: "Neumünster",
  name: "Max Mustermann",
  email: "max@example.de",
  phone: "04321 123456",
  consent: true,
};

const badplaner: BadplanerPayload = {
  formType: "badplaner",
  roomSizeM2: 8,
  condition: "unrenoviert",
  elements: ["dusche", "wc"],
  style: "modern",
  budget: "10k_20k",
  timeframe: "6_monate",
  addressZip: "24536",
  addressCity: "Neumünster",
  name: "Erika Beispiel",
  email: "erika@example.de",
  phone: "04321 555",
  consent: true,
};

const kundendienst: KundendienstPayload = {
  formType: "kundendienst",
  addressStreet: "Hauptstr. 1",
  addressZip: "24534",
  addressCity: "Neumünster",
  deviceType: "heizung",
  manufacturer: "Viessmann",
  problem: "Die Heizung wird nicht mehr warm.",
  urgency: "notfall",
  name: "Klaus Kunde",
  email: "klaus@example.de",
  phone: "04321 999",
  consent: true,
};

describe("buildEmail", () => {
  it("setzt den Betreff-Präfix je Formulartyp", () => {
    expect(buildEmail(waermepumpe).subject).toMatch(/^\[Wärmepumpenkonfigurator\]/);
    expect(buildEmail(badplaner).subject).toMatch(/^\[Badplaner\]/);
    expect(buildEmail(kundendienst).subject).toMatch(/^\[Kundendienst\]/);
  });

  it("nutzt die Absender-E-Mail als replyTo", () => {
    expect(buildEmail(waermepumpe).replyTo).toBe("max@example.de");
  });

  it("übersetzt Werte in deutsche Labels", () => {
    const text = buildEmail(waermepumpe).text;
    expect(text).toContain("Einfamilienhaus");
    expect(text).toContain("Ölheizung");
    expect(text).toContain("Heizkörper");
    expect(text).toContain("Alte Heizung ersetzen, Förderung nutzen");
    expect(text).toContain("140 m²");
    expect(text).toContain("24536 Neumünster");
  });

  it("enthält alle Kontaktfelder im Text", () => {
    const text = buildEmail(kundendienst).text;
    expect(text).toContain("Klaus Kunde");
    expect(text).toContain("klaus@example.de");
    expect(text).toContain("04321 999");
    expect(text).toContain("Hauptstr. 1, 24534 Neumünster");
    expect(text).toContain("Viessmann");
    expect(text).toContain("Notfall");
  });

  it("escaped HTML-Sonderzeichen im HTML-Body", () => {
    const mail = buildEmail({
      ...kundendienst,
      name: "<script>alert(1)</script>",
    });
    expect(mail.html).not.toContain("<script>alert(1)</script>");
    expect(mail.html).toContain("&lt;script&gt;");
  });
});
