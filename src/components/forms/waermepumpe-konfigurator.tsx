"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/ui/field";
import { Stepper } from "@/components/ui/stepper";
import { OptionCards, MultiOptionCards } from "@/components/ui/option-cards";
import { ConsentNote, Honeypot } from "./consent-note";
import { SuccessPanel, ErrorBanner } from "./form-shell";
import { submitContact } from "@/lib/forms/client";
import {
  BUILDING_TYPES,
  YEAR_BANDS,
  HEATING_SYSTEMS,
  HEATPUMP_GOALS,
  type BuildingType,
  type YearBand,
  type HeatingSystem,
  type HeatpumpGoal,
} from "@/domain/forms";

const STEPS = ["Gebäude", "Baujahr", "Fläche", "Heizung", "Ziele", "Kontakt"];

interface State {
  buildingType?: BuildingType;
  yearBand?: YearBand;
  livingAreaM2: string;
  occupants: string;
  currentHeating?: HeatingSystem;
  goals: HeatpumpGoal[];
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
  website: string;
}

const INITIAL: State = {
  livingAreaM2: "",
  occupants: "",
  goals: [],
  name: "",
  email: "",
  phone: "",
  message: "",
  consent: false,
  website: "",
};

export function WaermepumpeKonfigurator() {
  const [s, setS] = useState<State>(INITIAL);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stepError, setStepError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const set = <K extends keyof State>(key: K, value: State[K]) =>
    setS((p) => ({ ...p, [key]: value }));

  function validateStep(): boolean {
    setStepError(null);
    switch (step) {
      case 0:
        if (!s.buildingType) return fail("Bitte wähle einen Gebäudetyp.");
        break;
      case 1:
        if (!s.yearBand) return fail("Bitte wähle das Baujahr.");
        break;
      case 2:
        if (!s.livingAreaM2 || Number(s.livingAreaM2) < 20)
          return fail("Bitte gib eine Wohnfläche von mindestens 20 m² an.");
        if (!s.occupants || Number(s.occupants) < 1)
          return fail("Bitte gib die Anzahl der Personen an.");
        break;
      case 3:
        if (!s.currentHeating) return fail("Bitte wähle deine aktuelle Heizung.");
        break;
      case 4:
        if (s.goals.length === 0) return fail("Bitte wähle mindestens ein Ziel.");
        break;
    }
    return true;
  }

  function fail(msg: string): boolean {
    setStepError(msg);
    return false;
  }

  function next() {
    if (validateStep()) setStep((x) => Math.min(x + 1, STEPS.length - 1));
  }
  function back() {
    setStepError(null);
    setStep((x) => Math.max(x - 1, 0));
  }

  async function handleSubmit() {
    setErrors({});
    setStatus("sending");
    const result = await submitContact({
      formType: "waermepumpe",
      buildingType: s.buildingType,
      yearBand: s.yearBand,
      livingAreaM2: Number(s.livingAreaM2),
      occupants: Number(s.occupants),
      currentHeating: s.currentHeating,
      goals: s.goals,
      name: s.name.trim(),
      email: s.email.trim(),
      phone: s.phone.trim(),
      message: s.message.trim() || undefined,
      consent: s.consent,
      website: s.website,
    });
    if (result.ok) {
      setStatus("ok");
    } else {
      setStatus("error");
      setErrors(result.errors ?? {});
      setServerMessage(result.message ?? "");
    }
  }

  function reset() {
    setS(INITIAL);
    setStep(0);
    setErrors({});
    setStepError(null);
    setStatus("idle");
  }

  if (status === "ok") {
    return (
      <SuccessPanel
        title="Danke! Deine Wärmepumpen-Anfrage ist da."
        description="Wir prüfen deine Angaben und melden uns mit einer ersten Einschätzung und einem Vorschlag für einen kostenlosen Vor-Ort-Termin."
        onReset={reset}
        resetLabel="Neu konfigurieren"
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Stepper steps={STEPS} current={step} />

      <div className="min-h-[16rem]">
        {step === 0 && (
          <Field label="Um welches Gebäude geht es?" required error={stepError ?? undefined}>
            <OptionCards
              options={BUILDING_TYPES}
              value={s.buildingType}
              onChange={(v) => set("buildingType", v)}
            />
          </Field>
        )}

        {step === 1 && (
          <Field label="Baujahr des Gebäudes" required error={stepError ?? undefined}>
            <OptionCards
              options={YEAR_BANDS}
              value={s.yearBand}
              onChange={(v) => set("yearBand", v)}
            />
          </Field>
        )}

        {step === 2 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Beheizte Wohnfläche (m²)"
              htmlFor="wp-area"
              required
              error={stepError ?? undefined}
            >
              <Input
                id="wp-area"
                type="number"
                inputMode="numeric"
                min={20}
                placeholder="z. B. 140"
                value={s.livingAreaM2}
                onChange={(e) => set("livingAreaM2", e.target.value)}
              />
            </Field>
            <Field label="Personen im Haushalt" htmlFor="wp-occ" required>
              <Input
                id="wp-occ"
                type="number"
                inputMode="numeric"
                min={1}
                placeholder="z. B. 4"
                value={s.occupants}
                onChange={(e) => set("occupants", e.target.value)}
              />
            </Field>
          </div>
        )}

        {step === 3 && (
          <Field label="Womit heizt du aktuell?" required error={stepError ?? undefined}>
            <OptionCards
              options={HEATING_SYSTEMS}
              value={s.currentHeating}
              onChange={(v) => set("currentHeating", v)}
              columns={3}
            />
          </Field>
        )}

        {step === 4 && (
          <Field
            label="Was möchtest du erreichen?"
            hint="Mehrfachauswahl möglich."
            required
            error={stepError ?? undefined}
          >
            <MultiOptionCards
              options={HEATPUMP_GOALS}
              value={s.goals}
              onChange={(v) => set("goals", v)}
            />
          </Field>
        )}

        {step === 5 && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Fast geschafft! Wohin dürfen wir dir deine persönliche Einschätzung schicken?
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" htmlFor="wp-name" required error={errors.name}>
                <Input id="wp-name" value={s.name} onChange={(e) => set("name", e.target.value)} />
              </Field>
              <Field label="Telefon" htmlFor="wp-phone" required error={errors.phone}>
                <Input id="wp-phone" type="tel" value={s.phone} onChange={(e) => set("phone", e.target.value)} />
              </Field>
            </div>
            <Field label="E-Mail" htmlFor="wp-email" required error={errors.email}>
              <Input id="wp-email" type="email" value={s.email} onChange={(e) => set("email", e.target.value)} />
            </Field>
            <Field label="Nachricht (optional)" htmlFor="wp-msg" error={errors.message}>
              <Textarea
                id="wp-msg"
                placeholder="Anmerkungen, Wünsche, Rückruf-Zeiten …"
                value={s.message}
                onChange={(e) => set("message", e.target.value)}
              />
            </Field>
            <ConsentNote checked={s.consent} onChange={(v) => set("consent", v)} error={errors.consent} />
            {status === "error" && serverMessage && <ErrorBanner message={serverMessage} />}
          </div>
        )}
      </div>

      <Honeypot value={s.website} onChange={(v) => set("website", v)} />

      <div className="flex items-center justify-between gap-3">
        <Button type="button" variant="ghost" onClick={back} disabled={step === 0}>
          <ArrowLeft className="size-4" /> Zurück
        </Button>
        {step < STEPS.length - 1 ? (
          <Button type="button" onClick={next}>
            Weiter <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button type="button" onClick={handleSubmit} disabled={status === "sending"}>
            {status === "sending" ? "Wird gesendet …" : "Anfrage absenden"}
            <Send className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
