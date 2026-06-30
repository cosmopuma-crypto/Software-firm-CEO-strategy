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
  BATH_CONDITIONS,
  BATH_ELEMENTS,
  BATH_STYLES,
  BATH_BUDGETS,
  TIMEFRAMES,
  type BathCondition,
  type BathElement,
  type BathStyle,
  type BathBudget,
  type Timeframe,
} from "@/domain/forms";

const STEPS = ["Raum", "Elemente", "Stil", "Budget", "Kontakt"];

interface State {
  roomSizeM2: string;
  condition?: BathCondition;
  elements: BathElement[];
  style?: BathStyle;
  budget?: BathBudget;
  timeframe?: Timeframe;
  addressZip: string;
  addressCity: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
  website: string;
}

const INITIAL: State = {
  roomSizeM2: "",
  elements: [],
  addressZip: "",
  addressCity: "",
  name: "",
  email: "",
  phone: "",
  message: "",
  consent: false,
  website: "",
};

export function Badplaner() {
  const [s, setS] = useState<State>(INITIAL);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stepError, setStepError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const set = <K extends keyof State>(key: K, value: State[K]) =>
    setS((p) => ({ ...p, [key]: value }));

  const fail = (msg: string) => {
    setStepError(msg);
    return false;
  };

  function validateStep(): boolean {
    setStepError(null);
    switch (step) {
      case 0:
        if (!s.roomSizeM2 || Number(s.roomSizeM2) < 1)
          return fail("Bitte gib die Raumgröße an.");
        if (!s.condition) return fail("Bitte wähle den Ist-Zustand.");
        break;
      case 1:
        if (s.elements.length === 0) return fail("Bitte wähle mindestens ein Element.");
        break;
      case 2:
        if (!s.style) return fail("Bitte wähle einen Stil.");
        break;
      case 3:
        if (!s.budget) return fail("Bitte wähle einen Budgetrahmen.");
        if (!s.timeframe) return fail("Bitte wähle einen Zeitrahmen.");
        break;
    }
    return true;
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
      formType: "badplaner",
      roomSizeM2: Number(s.roomSizeM2),
      condition: s.condition,
      elements: s.elements,
      style: s.style,
      budget: s.budget,
      timeframe: s.timeframe,
      addressZip: s.addressZip.trim(),
      addressCity: s.addressCity.trim(),
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
        title="Danke! Deine Bad-Anfrage ist eingegangen."
        description="Wir melden uns mit ersten Ideen und einem Vorschlag für einen kostenlosen Beratungstermin bei dir."
        onReset={reset}
        resetLabel="Neu planen"
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Stepper steps={STEPS} current={step} />

      <div className="min-h-[16rem]">
        {step === 0 && (
          <div className="flex flex-col gap-4">
            <Field label="Wie groß ist das Bad (ca. m²)?" htmlFor="bp-size" required error={stepError ?? undefined}>
              <Input
                id="bp-size"
                type="number"
                inputMode="numeric"
                min={1}
                placeholder="z. B. 8"
                value={s.roomSizeM2}
                onChange={(e) => set("roomSizeM2", e.target.value)}
              />
            </Field>
            <Field label="In welchem Zustand ist das Bad?" required>
              <OptionCards
                options={BATH_CONDITIONS}
                value={s.condition}
                onChange={(v) => set("condition", v)}
              />
            </Field>
          </div>
        )}

        {step === 1 && (
          <Field
            label="Was soll ins neue Bad?"
            hint="Mehrfachauswahl möglich."
            required
            error={stepError ?? undefined}
          >
            <MultiOptionCards
              options={BATH_ELEMENTS}
              value={s.elements}
              onChange={(v) => set("elements", v)}
              columns={3}
            />
          </Field>
        )}

        {step === 2 && (
          <Field label="Welcher Stil gefällt dir?" required error={stepError ?? undefined}>
            <OptionCards options={BATH_STYLES} value={s.style} onChange={(v) => set("style", v)} />
          </Field>
        )}

        {step === 3 && (
          <div className="grid gap-4">
            <Field label="Welches Budget hast du im Kopf?" required error={stepError ?? undefined}>
              <OptionCards options={BATH_BUDGETS} value={s.budget} onChange={(v) => set("budget", v)} />
            </Field>
            <Field label="Wann soll es losgehen?" required>
              <OptionCards options={TIMEFRAMES} value={s.timeframe} onChange={(v) => set("timeframe", v)} />
            </Field>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Wohin dürfen wir dir deine unverbindlichen Bad-Ideen schicken?
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" htmlFor="bp-name" required error={errors.name}>
                <Input id="bp-name" value={s.name} onChange={(e) => set("name", e.target.value)} />
              </Field>
              <Field label="Telefon" htmlFor="bp-phone" required error={errors.phone}>
                <Input id="bp-phone" type="tel" value={s.phone} onChange={(e) => set("phone", e.target.value)} />
              </Field>
            </div>
            <Field label="E-Mail" htmlFor="bp-email" required error={errors.email}>
              <Input id="bp-email" type="email" value={s.email} onChange={(e) => set("email", e.target.value)} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
              <Field label="PLZ" htmlFor="bp-zip" required error={errors.addressZip}>
                <Input id="bp-zip" inputMode="numeric" value={s.addressZip} onChange={(e) => set("addressZip", e.target.value)} />
              </Field>
              <Field label="Ort" htmlFor="bp-city" required error={errors.addressCity}>
                <Input id="bp-city" value={s.addressCity} onChange={(e) => set("addressCity", e.target.value)} />
              </Field>
            </div>
            <Field label="Nachricht (optional)" htmlFor="bp-msg" error={errors.message}>
              <Textarea
                id="bp-msg"
                placeholder="Besondere Wünsche, Inspiration, Rückruf-Zeiten …"
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
