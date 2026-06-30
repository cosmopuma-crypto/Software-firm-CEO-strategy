import {
  contactFormSchema,
  waermepumpeSchema,
  badplanerSchema,
  kundendienstSchema,
  flattenErrors,
} from "./schemas";

const validContact = {
  name: "Max Mustermann",
  email: "max@example.de",
  phone: "04321 123456",
  consent: true,
};

const validWaermepumpe = {
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
  ...validContact,
};

const validBadplaner = {
  formType: "badplaner",
  roomSizeM2: 8,
  condition: "unrenoviert",
  elements: ["dusche", "waschtisch", "wc"],
  style: "modern",
  budget: "10k_20k",
  timeframe: "6_monate",
  addressZip: "24536",
  addressCity: "Neumünster",
  ...validContact,
};

const validKundendienst = {
  formType: "kundendienst",
  addressStreet: "Hauptstr. 1",
  addressZip: "24534",
  addressCity: "Neumünster",
  deviceType: "heizung",
  problem: "Die Heizung wird nicht mehr warm.",
  urgency: "dringend",
  ...validContact,
};

describe("waermepumpeSchema", () => {
  it("akzeptiert eine gültige Anfrage", () => {
    expect(waermepumpeSchema.safeParse(validWaermepumpe).success).toBe(true);
  });

  it("erzwingt mindestens ein Ziel", () => {
    const r = waermepumpeSchema.safeParse({ ...validWaermepumpe, goals: [] });
    expect(r.success).toBe(false);
  });

  it("lehnt zu kleine Wohnfläche ab", () => {
    const r = waermepumpeSchema.safeParse({
      ...validWaermepumpe,
      livingAreaM2: 5,
    });
    expect(r.success).toBe(false);
  });

  it("wandelt numerische Strings um (coerce)", () => {
    const r = waermepumpeSchema.safeParse({
      ...validWaermepumpe,
      livingAreaM2: "140",
      occupants: "4",
    });
    expect(r.success).toBe(true);
  });

  it("verlangt Wärmeverteilung und Ort (PLZ/Stadt)", () => {
    const { radiatorType: _r, ...ohneVerteilung } = validWaermepumpe;
    void _r;
    expect(waermepumpeSchema.safeParse(ohneVerteilung).success).toBe(false);

    const r = waermepumpeSchema.safeParse({ ...validWaermepumpe, addressZip: "24" });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(flattenErrors(r.error).addressZip).toMatch(/Postleitzahl/);
    }
  });
});

describe("badplanerSchema", () => {
  it("akzeptiert eine gültige Anfrage", () => {
    expect(badplanerSchema.safeParse(validBadplaner).success).toBe(true);
  });

  it("erzwingt mindestens ein Element", () => {
    const r = badplanerSchema.safeParse({ ...validBadplaner, elements: [] });
    expect(r.success).toBe(false);
  });
});

describe("kundendienstSchema", () => {
  it("akzeptiert eine gültige Anfrage", () => {
    expect(kundendienstSchema.safeParse(validKundendienst).success).toBe(true);
  });

  it("lehnt ungültige PLZ ab", () => {
    const r = kundendienstSchema.safeParse({
      ...validKundendienst,
      addressZip: "245",
    });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(flattenErrors(r.error).addressZip).toMatch(/Postleitzahl/);
    }
  });

  it("verlangt eine ausreichend lange Problembeschreibung", () => {
    const r = kundendienstSchema.safeParse({
      ...validKundendienst,
      problem: "kaputt",
    });
    expect(r.success).toBe(false);
  });
});

describe("gemeinsame Kontaktfelder", () => {
  it("verlangt consent === true", () => {
    const r = waermepumpeSchema.safeParse({
      ...validWaermepumpe,
      consent: false,
    });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(flattenErrors(r.error).consent).toMatch(/Datenschutz/);
    }
  });

  it("lehnt ungültige E-Mail ab", () => {
    const r = waermepumpeSchema.safeParse({
      ...validWaermepumpe,
      email: "keine-email",
    });
    expect(r.success).toBe(false);
  });
});

describe("contactFormSchema (diskriminierte Union)", () => {
  it("routet per formType korrekt", () => {
    expect(contactFormSchema.safeParse(validWaermepumpe).success).toBe(true);
    expect(contactFormSchema.safeParse(validBadplaner).success).toBe(true);
    expect(contactFormSchema.safeParse(validKundendienst).success).toBe(true);
  });

  it("lehnt unbekannten formType ab", () => {
    const r = contactFormSchema.safeParse({
      ...validWaermepumpe,
      formType: "unbekannt",
    });
    expect(r.success).toBe(false);
  });
});
