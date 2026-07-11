// Geteilte Optionslisten + Literal-Typen für alle Formulare.
// Eine Quelle der Wahrheit für UI-Labels, zod-Schemas und E-Mail-Texte.

export interface Option<T extends string> {
  readonly value: T;
  readonly label: string;
}

function values<T extends string>(opts: readonly Option<T>[]): readonly T[] {
  return opts.map((o) => o.value);
}

/** Hilfsfunktion: Wert → deutsches Label (für E-Mail/Anzeige). */
export function labelOf<T extends string>(
  opts: readonly Option<T>[],
  value: T,
): string {
  return opts.find((o) => o.value === value)?.label ?? value;
}

export function labelsOf<T extends string>(
  opts: readonly Option<T>[],
  vals: readonly T[],
): string {
  return vals.map((v) => labelOf(opts, v)).join(", ");
}

export const FORM_TYPES = ["waermepumpe", "badplaner", "kundendienst"] as const;
export type FormType = (typeof FORM_TYPES)[number];

/* ---------------- Wärmepumpenkonfigurator ---------------- */

export const BUILDING_TYPES = [
  { value: "einfamilienhaus", label: "Einfamilienhaus" },
  { value: "doppelhaus", label: "Doppelhaushälfte" },
  { value: "reihenhaus", label: "Reihenhaus" },
  { value: "mehrfamilienhaus", label: "Mehrfamilienhaus" },
  { value: "gewerbe", label: "Gewerbe / sonstiges" },
] as const;
export type BuildingType = (typeof BUILDING_TYPES)[number]["value"];

export const YEAR_BANDS = [
  { value: "vor1979", label: "vor 1979" },
  { value: "1979_1994", label: "1979 – 1994" },
  { value: "1995_2009", label: "1995 – 2009" },
  { value: "ab2010", label: "ab 2010" },
] as const;
export type YearBand = (typeof YEAR_BANDS)[number]["value"];

export const HEATING_SYSTEMS = [
  { value: "gas", label: "Gasheizung" },
  { value: "oel", label: "Ölheizung" },
  { value: "fernwaerme", label: "Fernwärme" },
  { value: "nachtspeicher", label: "Nachtspeicher / Strom" },
  { value: "holz_pellets", label: "Holz / Pellets" },
  { value: "waermepumpe_alt", label: "Wärmepumpe (alt)" },
  { value: "keine", label: "Noch keine / Neubau" },
] as const;
export type HeatingSystem = (typeof HEATING_SYSTEMS)[number]["value"];

export const HEATPUMP_GOALS = [
  { value: "heizung_ersetzen", label: "Alte Heizung ersetzen" },
  { value: "warmwasser", label: "Warmwasser erzeugen" },
  { value: "kosten_senken", label: "Heizkosten senken" },
  { value: "foerderung_nutzen", label: "Förderung nutzen" },
  { value: "klimafreundlich", label: "Klimafreundlich heizen" },
] as const;
export type HeatpumpGoal = (typeof HEATPUMP_GOALS)[number]["value"];

export const RADIATOR_TYPES = [
  { value: "heizkoerper", label: "Heizkörper" },
  { value: "fussboden", label: "Fußbodenheizung" },
  { value: "gemischt", label: "Beides (gemischt)" },
  { value: "unbekannt", label: "Weiß ich nicht" },
] as const;
export type RadiatorType = (typeof RADIATOR_TYPES)[number]["value"];

/* ---------------- Badplaner ---------------- */

export const BATH_CONDITIONS = [
  { value: "unrenoviert", label: "Unrenoviert / in die Jahre gekommen" },
  { value: "teilsaniert", label: "Teilsaniert" },
  { value: "neubau_rohbau", label: "Neubau / Rohbau" },
  { value: "modernisierung", label: "Modernisierung gewünscht" },
] as const;
export type BathCondition = (typeof BATH_CONDITIONS)[number]["value"];

export const BATH_ELEMENTS = [
  { value: "dusche", label: "Dusche" },
  { value: "badewanne", label: "Badewanne" },
  { value: "waschtisch", label: "Waschtisch" },
  { value: "wc", label: "WC" },
  { value: "fliesen", label: "Fliesen" },
  { value: "barrierefrei", label: "Barrierefrei / altersgerecht" },
] as const;
export type BathElement = (typeof BATH_ELEMENTS)[number]["value"];

export const BATH_STYLES = [
  { value: "modern", label: "Modern" },
  { value: "klassisch", label: "Klassisch" },
  { value: "natuerlich", label: "Natürlich / Holz & Stein" },
  { value: "minimalistisch", label: "Minimalistisch" },
  { value: "unentschlossen", label: "Noch unentschlossen" },
] as const;
export type BathStyle = (typeof BATH_STYLES)[number]["value"];

export const BATH_BUDGETS = [
  { value: "bis_10k", label: "bis 10.000 €" },
  { value: "10k_20k", label: "10.000 – 20.000 €" },
  { value: "20k_35k", label: "20.000 – 35.000 €" },
  { value: "ab_35k", label: "ab 35.000 €" },
  { value: "unklar", label: "Noch unklar" },
] as const;
export type BathBudget = (typeof BATH_BUDGETS)[number]["value"];

export const TIMEFRAMES = [
  { value: "sofort", label: "So schnell wie möglich" },
  { value: "3_monate", label: "In den nächsten 3 Monaten" },
  { value: "6_monate", label: "In den nächsten 6 Monaten" },
  { value: "12_monate", label: "Innerhalb eines Jahres" },
  { value: "planung", label: "Erst einmal nur planen" },
] as const;
export type Timeframe = (typeof TIMEFRAMES)[number]["value"];

/* ---------------- Kundendienst ---------------- */

export const DEVICE_TYPES = [
  { value: "heizung", label: "Heizung" },
  { value: "waermepumpe", label: "Wärmepumpe" },
  { value: "warmwasser", label: "Warmwasser / Boiler" },
  { value: "sanitaer", label: "Sanitär / Bad" },
  { value: "lueftung", label: "Lüftung" },
  { value: "sonstiges", label: "Sonstiges" },
] as const;
export type DeviceType = (typeof DEVICE_TYPES)[number]["value"];

export const URGENCIES = [
  { value: "normal", label: "Normal" },
  { value: "dringend", label: "Dringend" },
  { value: "notfall", label: "Notfall (z. B. Heizungsausfall)" },
] as const;
export type Urgency = (typeof URGENCIES)[number]["value"];

// Reine Wertelisten für zod-Enums.
export const buildingTypeValues = values(BUILDING_TYPES);
export const yearBandValues = values(YEAR_BANDS);
export const heatingSystemValues = values(HEATING_SYSTEMS);
export const heatpumpGoalValues = values(HEATPUMP_GOALS);
export const radiatorTypeValues = values(RADIATOR_TYPES);
export const bathConditionValues = values(BATH_CONDITIONS);
export const bathElementValues = values(BATH_ELEMENTS);
export const bathStyleValues = values(BATH_STYLES);
export const bathBudgetValues = values(BATH_BUDGETS);
export const timeframeValues = values(TIMEFRAMES);
export const deviceTypeValues = values(DEVICE_TYPES);
export const urgencyValues = values(URGENCIES);

// E-Mail-Betreff-Präfixe je Formulartyp.
export const FORM_LABELS: Record<FormType, string> = {
  waermepumpe: "Wärmepumpenkonfigurator",
  badplaner: "Badplaner",
  kundendienst: "Kundendienst",
};
