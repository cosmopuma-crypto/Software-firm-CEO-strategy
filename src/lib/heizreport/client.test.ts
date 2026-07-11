import {
  createProject,
  getCheckPdf,
  getHeizreportPdf,
  prefillProject,
} from "./client";

// Der Client spricht die Heizreport REST API v2 an. Diese Tests fixieren das
// dokumentierte Contract (Bearer-Header, Pfade, Body-Form) gegen einen
// gemockten fetch – ohne echten Netzwerkzugriff.

interface FetchCall {
  url: string;
  init: RequestInit;
}

let calls: FetchCall[] = [];

function mockFetch(status: number, json: unknown) {
  calls = [];
  global.fetch = jest.fn(async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init: init ?? {} });
    return {
      ok: status >= 200 && status < 300,
      status,
      text: async () => JSON.stringify(json),
    } as Response;
  }) as unknown as typeof fetch;
}

function lastBody(): unknown {
  const body = calls.at(-1)?.init.body;
  return typeof body === "string" ? JSON.parse(body) : undefined;
}

function header(name: string): string | undefined {
  const h = calls.at(-1)?.init.headers as Record<string, string> | undefined;
  return h?.[name];
}

const OK_HEADER = {
  status: 200,
  action: "createReport",
  projektHeader: {
    key: "abcdefghi",
    link: "https://heizreport.net/report/p=abcdefghi",
    id: 12345,
    status: 1,
  },
  projektData: { projektName: "Max Mustermann" },
};

beforeAll(() => {
  process.env.HEIZREPORT_API_KEY = "hr_live_testtoken";
});

describe("heizreport client (REST v2)", () => {
  it("legt ein leeres Projekt via POST /reports an und liest projektHeader.key", async () => {
    mockFetch(200, OK_HEADER);
    const res = await createProject();

    expect(res.ok).toBe(true);
    expect(res.projektKey).toBe("abcdefghi");
    expect(res.link).toBe("https://heizreport.net/report/p=abcdefghi");
    expect(calls[0].url).toBe("https://heizreport.net/api/v2/reports");
    expect(calls[0].init.method).toBe("POST");
    expect(header("Authorization")).toBe("Bearer hr_live_testtoken");
    expect(header("Accept")).toBe("application/json");
    // Leeres Projekt: kein Body.
    expect(calls[0].init.body).toBeUndefined();
  });

  it("nutzt /reports/with-data und verpackt Daten in projektData", async () => {
    mockFetch(200, OK_HEADER);
    await createProject({ vorname: "Max", plz: "10115" });

    expect(calls[0].url).toBe("https://heizreport.net/api/v2/reports/with-data");
    expect(calls[0].init.method).toBe("POST");
    expect(lastBody()).toEqual({ projektData: { vorname: "Max", plz: "10115" } });
  });

  it("aktualisiert per PATCH /reports/{key} mit projektData", async () => {
    mockFetch(200, { status: 200 });
    await prefillProject("abcdefghi", { projektName: "Neuer Name" });

    expect(calls[0].url).toBe("https://heizreport.net/api/v2/reports/abcdefghi");
    expect(calls[0].init.method).toBe("PATCH");
    expect(lastBody()).toEqual({ projektData: { projektName: "Neuer Name" } });
  });

  it("ruft PDFs mit korrektem ?type= ab", async () => {
    mockFetch(200, { link: "https://heizreport.net/pdf/check.pdf" });
    const check = await getCheckPdf("abcdefghi");
    expect(calls[0].url).toBe(
      "https://heizreport.net/api/v2/reports/abcdefghi/pdf?type=check",
    );
    expect(check.linkToDocument).toBe("https://heizreport.net/pdf/check.pdf");

    mockFetch(200, { link: "https://heizreport.net/pdf/full.pdf" });
    await getHeizreportPdf("abcdefghi");
    expect(calls[0].url).toBe(
      "https://heizreport.net/api/v2/reports/abcdefghi/pdf?type=heizreport",
    );
  });

  it("meldet API-Fehler mit der Fehlermeldung der Antwort", async () => {
    mockFetch(401, {
      status: 401,
      error: "Bearer-Token fehlt oder ist ungültig",
      details: { type: "authentication" },
    });
    const res = await createProject();
    expect(res.ok).toBe(false);
    expect(res.error).toBe("Bearer-Token fehlt oder ist ungültig");
  });
});
