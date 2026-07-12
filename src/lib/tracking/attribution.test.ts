import { deriveAttribution, parseAttribution } from "./attribution";
import { buildLeadRow } from "./lead-log";

describe("deriveAttribution", () => {
  it("erkennt Google als Quelle aus dem Referrer", () => {
    const a = deriveAttribution({
      url: "https://www.st-haustechnik.de/badplaner",
      referrer: "https://www.google.com/",
    });
    expect(a.source).toBe("google");
    expect(a.referrer).toBe("https://www.google.com/");
    expect(a.landingPage).toBe("/badplaner");
  });

  it("liefert 'direkt' ohne Referrer", () => {
    const a = deriveAttribution({
      url: "https://www.st-haustechnik.de/",
      referrer: "",
    });
    expect(a.source).toBe("direkt");
    expect(a.referrer).toBeUndefined();
  });

  it("ignoriert interne Navigation als Referrer", () => {
    const a = deriveAttribution({
      url: "https://www.st-haustechnik.de/kundendienst",
      referrer: "https://st-haustechnik.de/",
    });
    expect(a.source).toBe("direkt");
    expect(a.referrer).toBeUndefined();
  });

  it("lässt utm_source vor dem Referrer gewinnen", () => {
    const a = deriveAttribution({
      url: "https://www.st-haustechnik.de/?utm_source=Flyer&utm_campaign=fruehjahr",
      referrer: "https://www.google.com/",
    });
    expect(a.source).toBe("flyer");
    expect(a.utmCampaign).toBe("fruehjahr");
  });

  it("nutzt unbekannte Referrer-Hosts als Quelle", () => {
    const a = deriveAttribution({
      url: "https://www.st-haustechnik.de/",
      referrer: "https://www.innung-shk.example.org/mitglieder",
    });
    expect(a.source).toBe("innung-shk.example.org");
  });
});

describe("parseAttribution", () => {
  it("akzeptiert Objekte und JSON-Strings", () => {
    const obj = { source: "google", landingPage: "/" };
    expect(parseAttribution(obj)?.source).toBe("google");
    expect(parseAttribution(JSON.stringify(obj))?.source).toBe("google");
  });

  it("verwirft Ungültiges statt zu werfen", () => {
    expect(parseAttribution("kein json")).toBeUndefined();
    expect(parseAttribution({ source: "" })).toBeUndefined();
    expect(parseAttribution(undefined)).toBeUndefined();
    expect(parseAttribution(42)).toBeUndefined();
  });
});

describe("buildLeadRow", () => {
  it("bildet Event + Attribution auf die Tabellen-Zeile ab", () => {
    const row = buildLeadRow({
      formType: "badplaner",
      attribution: {
        source: "google",
        referrer: "https://www.google.com/",
        utmCampaign: "fruehjahr",
        landingPage: "/badplaner",
      },
    });
    expect(row).toEqual({
      form_type: "badplaner",
      source: "google",
      referrer: "https://www.google.com/",
      utm_source: null,
      utm_medium: null,
      utm_campaign: "fruehjahr",
      landing_page: "/badplaner",
    });
  });

  it("kommt ohne Attribution aus", () => {
    const row = buildLeadRow({ formType: "heizreport" });
    expect(row.form_type).toBe("heizreport");
    expect(row.source).toBeNull();
  });
});
