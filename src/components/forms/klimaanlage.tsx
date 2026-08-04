"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/ui/field";
import { Stepper } from "@/components/ui/stepper";
import { OptionCards } from "@/components/ui/option-cards";
import { ConsentNote, Honeypot } from "./consent-note";
import { SuccessPanel, ErrorBanner } from "./form-shell";
import { submitContact } from "@/lib/forms/client";
import {
  AC_PURPOSES,
  AC_PROPERTY_TYPES,
  AC_ROOM_COUNTS,
  AC_MOUNT_TYPES,
  TIMEFRAMES,
  type AcPurpose,
  type AcPropertyType,
  type AcRoomCount,
  type AcMountType,
  type Timeframe,
} from "@/domain/forms";

const STEPS = ["Nutzung", "Objekt", "Technik", "Zeitrahmen", "Kontakt"];

interface State {
  purpose?: AcPurpose;
  propertyType?: AcPropertyType;
  roomCount?: AcRoomCount;
  areaM2: string;
  mountType?: AcMountType;
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
  areaM2: "",
  addressZip: "",
  addressCity: "",
  name: "",
  email: "",
  phone: "",
  message: "",
  consent: false,
  website: "",
};

export function Klimaanlage() {
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
        if (!s.purpose) return fail("Bitte wählen Sie die gewünschte Nutzung.");
        break;
      case 1:
        if (!s.propertyType) return fail("Bitte wählen Sie den Objekttyp.");
        if (!s.roomCount) return fail("Bitte wählen Sie die Anzahl der Räume.");
        break;
      case 2:
        if (!s.areaM2 || Number(s.areaM2) < 5)
          return fail("Bitte geben Sie die Fläche an.");
        if (!s.mountType) return fail("Bitte wählen Sie die Montageart.");
        break;
      case 3:
        if (!s.timeframe) return fail("Bitte wählen Sie einen Zeitrahmen.");
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
      formType: "klimaanlage",
      purpose: s.purpose,
      propertyType: s.propertyType,
      roomCount: s.roomCount,
      areaM2: Number(s.areaM2),
      mountType: s.mountType,
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
        title="Danke! Ihre Klima-Anfrage ist eingegangen."
        description="Wir melden uns mit einer ersten Einschätzung und einem Vorschlag für einen kostenlosen Beratungstermin bei Ihnen."
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
          <Field
            label="Wofür soll die Anlage eingesetzt werden?"
            hint="Luft-Luft-Wärmepumpen kühlen im Sommer und heizen im Übergang."
            required
            error={stepError ?? undefined}
          >
            <OptionCards
              options={AC_PURPOSES}
              value={s.purpose}
              onChange={(v) => set("purpose", v)}
              columns={2}
            />
          </Field>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-4">
            <Field label="Um was für ein Objekt geht es?" required error={stepError ?? undefined}>
              <OptionCards
                options={AC_PROPERTY_TYPES}
                value={s.propertyType}
                onChange={(v) => set("propertyType", v)}
                columns={2}
              />
            </Field>
            <Field label="Wie viele Räume sollen klimatisiert werden?" required>
              <OptionCards
                options={AC_ROOM_COUNTS}
                value={s.roomCount}
                onChange={(v) => set("roomCount", v)}
              />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <Field
              label="Wie groß ist die Fläche insgesamt (ca. m²)?"
              htmlFor="ac-area"
              required
              error={stepError ?? undefined}
            >
              <Input
                id="ac-area"
                type="number"
                inputMode="numeric"
                min={5}
                placeholder="z. B. 40"
                value={s.areaM2}
                onChange={(e) => set("areaM2", e.target.value)}
              />
            </Field>
            <Field label="Welche Montageart bevorzugen Sie?" required>
              <OptionCards
                options={AC_MOUNT_TYPES}
                value={s.mountType}
                onChange={(v) => set("mountType", v)}
                columns={2}
              />
            </Field>
          </div>
        )}

        {step === 3 && (
          <Field label="Wann soll es losgehen?" required error={stepError ?? undefined}>
            <OptionCards
              options={TIMEFRAMES}
              value={s.timeframe}
              onChange={(v) => set("timeframe", v)}
            />
          </Field>
        )}

        {step === 4 && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Wohin dürfen wir Ihnen Ihr unverbindliches Klima-Angebot schicken?
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" htmlFor="ac-name" required error={errors.name}>
                <Input id="ac-name" value={s.name} onChange={(e) => set("name", e.target.value)} />
              </Field>
              <Field label="Telefon" htmlFor="ac-phone" required error={errors.phone}>
                <Input id="ac-phone" type="tel" value={s.phone} onChange={(e) => set("phone", e.target.value)} />
              </Field>
            </div>
            <Field label="E-Mail" htmlFor="ac-email" required error={errors.email}>
              <Input id="ac-email" type="email" value={s.email} onChange={(e) => set("email", e.target.value)} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
              <Field label="PLZ" htmlFor="ac-zip" required error={errors.addressZip}>
                <Input id="ac-zip" inputMode="numeric" value={s.addressZip} onChange={(e) => set("addressZip", e.target.value)} />
              </Field>
              <Field label="Ort" htmlFor="ac-city" required error={errors.addressCity}>
                <Input id="ac-city" value={s.addressCity} onChange={(e) => set("addressCity", e.target.value)} />
              </Field>
            </div>
            <Field label="Nachricht (optional)" htmlFor="ac-msg" error={errors.message}>
              <Textarea
                id="ac-msg"
                placeholder="Besondere Wünsche, Grundriss, Rückruf-Zeiten …"
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
