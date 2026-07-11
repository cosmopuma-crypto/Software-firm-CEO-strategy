import { z } from "zod";
import {
  buildingTypeValues,
  yearBandValues,
  heatingSystemValues,
  heatpumpGoalValues,
  radiatorTypeValues,
  bathConditionValues,
  bathElementValues,
  bathStyleValues,
  bathBudgetValues,
  timeframeValues,
  deviceTypeValues,
  urgencyValues,
  type BuildingType,
  type YearBand,
  type HeatingSystem,
  type HeatpumpGoal,
  type RadiatorType,
  type BathCondition,
  type BathElement,
  type BathStyle,
  type BathBudget,
  type Timeframe,
  type DeviceType,
  type Urgency,
} from "@/domain/forms";

// Kleiner Helfer: zod-Enum aus einer (readonly) Werteliste bauen.
function enumOf<T extends string>(vals: readonly T[]) {
  return z.enum(vals as unknown as [T, ...T[]]);
}

// Geteilte Adressfelder (von mehreren Formularen genutzt).
const zipField = z
  .string()
  .trim()
  .regex(/^\d{5}$/, "Bitte gib eine gültige Postleitzahl (5 Ziffern) an.");
const cityField = z.string().trim().min(2, "Bitte gib den Ort an.").max(120);

// Gemeinsame Kontakt-/Anti-Spam-Felder für alle Formulare.
const contactShape = {
  name: z
    .string()
    .trim()
    .min(2, "Bitte gib deinen Namen an.")
    .max(120, "Der Name ist zu lang."),
  email: z
    .string()
    .trim()
    .min(1, "Bitte gib deine E-Mail-Adresse an.")
    .email("Bitte gib eine gültige E-Mail-Adresse an.")
    .max(160, "Die E-Mail-Adresse ist zu lang."),
  phone: z
    .string()
    .trim()
    .min(6, "Bitte gib eine Telefonnummer an.")
    .max(40, "Die Telefonnummer ist zu lang."),
  message: z
    .string()
    .trim()
    .max(2000, "Die Nachricht ist zu lang (max. 2000 Zeichen).")
    .optional(),
  consent: z.literal(true, {
    error: "Bitte stimme den Datenschutzhinweisen zu.",
  }),
};

/* ---------------- Wärmepumpenkonfigurator ---------------- */
export const waermepumpeSchema = z.object({
  formType: z.literal("waermepumpe"),
  buildingType: enumOf<BuildingType>(buildingTypeValues),
  yearBand: enumOf<YearBand>(yearBandValues),
  livingAreaM2: z.coerce
    .number({ error: "Bitte gib die Wohnfläche an." })
    .min(20, "Mindestens 20 m².")
    .max(2000, "Bitte prüfe die Wohnfläche."),
  currentHeating: enumOf<HeatingSystem>(heatingSystemValues),
  radiatorType: enumOf<RadiatorType>(radiatorTypeValues),
  occupants: z.coerce
    .number({ error: "Bitte gib die Personenzahl an." })
    .int("Bitte eine ganze Zahl angeben.")
    .min(1, "Mindestens 1 Person.")
    .max(20, "Bitte prüfe die Personenzahl."),
  goals: z
    .array(enumOf<HeatpumpGoal>(heatpumpGoalValues))
    .min(1, "Bitte wähle mindestens ein Ziel."),
  addressZip: zipField,
  addressCity: cityField,
  ...contactShape,
});

/* ---------------- Badplaner ---------------- */
export const badplanerSchema = z.object({
  formType: z.literal("badplaner"),
  roomSizeM2: z.coerce
    .number({ error: "Bitte gib die Raumgröße an." })
    .min(1, "Mindestens 1 m².")
    .max(100, "Bitte prüfe die Raumgröße."),
  condition: enumOf<BathCondition>(bathConditionValues),
  elements: z
    .array(enumOf<BathElement>(bathElementValues))
    .min(1, "Bitte wähle mindestens ein Element."),
  style: enumOf<BathStyle>(bathStyleValues),
  budget: enumOf<BathBudget>(bathBudgetValues),
  timeframe: enumOf<Timeframe>(timeframeValues),
  addressZip: zipField,
  addressCity: cityField,
  ...contactShape,
});

/* ---------------- Kundendienst ---------------- */
export const kundendienstSchema = z.object({
  formType: z.literal("kundendienst"),
  addressStreet: z
    .string()
    .trim()
    .min(3, "Bitte gib Straße und Hausnummer an.")
    .max(160),
  addressZip: zipField,
  addressCity: cityField,
  deviceType: enumOf<DeviceType>(deviceTypeValues),
  manufacturer: z.string().trim().max(120).optional(),
  problem: z
    .string()
    .trim()
    .min(10, "Bitte beschreibe das Problem etwas genauer.")
    .max(2000, "Die Beschreibung ist zu lang (max. 2000 Zeichen)."),
  urgency: enumOf<Urgency>(urgencyValues),
  preferredDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Bitte gib ein gültiges Datum an.")
    .optional()
    .or(z.literal("")),
  ...contactShape,
});

/** Diskriminierte Union über alle drei Formulare. */
export const contactFormSchema = z.discriminatedUnion("formType", [
  waermepumpeSchema,
  badplanerSchema,
  kundendienstSchema,
]);

export type WaermepumpePayload = z.infer<typeof waermepumpeSchema>;
export type BadplanerPayload = z.infer<typeof badplanerSchema>;
export type KundendienstPayload = z.infer<typeof kundendienstSchema>;
export type ContactFormPayload = z.infer<typeof contactFormSchema>;

/** Name des versteckten Honeypot-Feldes (nicht im Schema – im Route-Handler geprüft). */
export const HONEYPOT_FIELD = "website";

/**
 * Flacht zod-Fehler zu einem Feld→Meldung-Objekt ab (deutsche Meldungen).
 */
export function flattenErrors(
  error: z.ZodError,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
