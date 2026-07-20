"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Clock, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Stepper } from "@/components/ui/stepper";
import { OptionCards } from "@/components/ui/option-cards";
import { ConsentNote, Honeypot } from "./consent-note";
import { SuccessPanel, ErrorBanner } from "./form-shell";
import { submitContact } from "@/lib/forms/client";
import {
  HEATING_SYSTEMS,
  YEAR_BANDS,
  CONTACT_TIMES,
  type HeatingSystem,
  type YearBand,
  type ContactTime,
} from "@/domain/forms";

/**
 * Wärmepumpen-Schnellanfrage: der niedrigschwellige Weg.
 * Zwei kurze Schritte (Haus → Kontakt), Telefon ODER E-Mail genügt.
 * Bewusst ohne Verbrauchswerte o. Ä. – alles Weitere klärt der Betrieb
 * im persönlichen Gespräch.
 */

const STEPS = ["Ihr Haus", "Kontakt"];

interface State {
  currentHeating?: HeatingSystem;
  yearBand?: YearBand;
  addressZip: string;
  contactTime?: ContactTime;
  name: string;
  phone: string;
  email: string;
  consent: boolean;
  website: string; // Honeypot
}

const INITIAL: State = {
  addressZip: "",
  name: "",
  phone: "",
  email: "",
  consent: false,
  website: "",
};

export function WaermepumpeSchnellanfrage() {
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
    if (step === 0) {
      if (!s.currentHeating) return fail("Bitte wählen Sie Ihre aktuelle Heizung.");
      if (!s.yearBand) return fail("Bitte wählen Sie das Baujahr Ihres Hauses.");
      if (!/^\d{5}$/.test(s.addressZip.trim()))
        return fail("Bitte geben Sie Ihre Postleitzahl an (5 Ziffern).");
    }
    return true;
  }

  function next() {
    if (validateStep()) setStep(1);
  }
  function back() {
    setStepError(null);
    setStep(0);
  }

  async function handleSubmit() {
    setErrors({});
    setServerMessage("");
    setStatus("sending");
    const result = await submitContact({
      formType: "schnellanfrage",
      currentHeating: s.currentHeating,
      yearBand: s.yearBand,
      addressZip: s.addressZip.trim(),
      contactTime: s.contactTime,
      name: s.name.trim(),
      phone: s.phone.trim(),
      email: s.email.trim(),
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
        title="Vielen Dank! Ihre Anfrage ist eingegangen."
        description="Wir melden uns in der Regel innerhalb eines Werktags persönlich bei Ihnen – mit einer ehrlichen Ersteinschätzung, ob und wie eine Wärmepumpe zu Ihrem Haus passt."
        onReset={reset}
        resetLabel="Neue Anfrage"
        phoneNote="Dringend? Rufen Sie uns an:"
      />
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <Stepper steps={STEPS} current={step} />

      {step === 0 && (
        <div className="flex flex-col gap-4">
          <Field label="Womit heizen Sie aktuell?" required>
            <OptionCards
              options={HEATING_SYSTEMS}
              value={s.currentHeating}
              onChange={(v) => set("currentHeating", v)}
            />
          </Field>
          <Field label="Wann wurde Ihr Haus gebaut?" hint="Eine grobe Einordnung genügt." required>
            <OptionCards
              options={YEAR_BANDS}
              value={s.yearBand}
              onChange={(v) => set("yearBand", v)}
            />
          </Field>
          <Field
            label="Ihre Postleitzahl"
            htmlFor="sa-zip"
            hint="Damit wir wissen, ob Sie in unserem Einsatzgebiet liegen."
            required
            error={stepError ?? undefined}
          >
            <Input
              id="sa-zip"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              placeholder="z. B. 24536"
              value={s.addressZip}
              onChange={(e) => set("addressZip", e.target.value)}
              className="max-w-40"
            />
          </Field>
          <Button type="button" variant="gold" className="h-11 w-full" onClick={next}>
            Weiter zum letzten Schritt <ArrowRight className="size-4" />
          </Button>
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col gap-4">
          <Field label="Ihr Name" htmlFor="sa-name" required error={errors.name}>
            <Input
              id="sa-name"
              autoComplete="name"
              placeholder="Vor- und Nachname"
              value={s.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Telefonnummer"
              htmlFor="sa-phone"
              error={errors.phone}
            >
              <Input
                id="sa-phone"
                type="tel"
                autoComplete="tel"
                placeholder="für den schnellsten Weg"
                value={s.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </Field>
            <Field label="E-Mail-Adresse" htmlFor="sa-email" error={errors.email}>
              <Input
                id="sa-email"
                type="email"
                autoComplete="email"
                placeholder="oder lieber per E-Mail"
                value={s.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </Field>
          </div>
          <p className="-mt-2 text-xs text-muted-foreground">
            Telefonnummer <span className="font-medium">oder</span> E-Mail genügt –
            Sie entscheiden, wie wir uns melden dürfen.
          </p>

          <Field label="Wann erreichen wir Sie am besten? (optional)">
            <OptionCards
              options={CONTACT_TIMES}
              value={s.contactTime}
              onChange={(v) => set("contactTime", v)}
              columns={3}
            />
          </Field>

          <ConsentNote
            checked={s.consent}
            onChange={(v) => set("consent", v)}
            error={errors.consent}
            id="sa-consent"
          />

          {status === "error" && serverMessage && <ErrorBanner message={serverMessage} />}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" variant="outline" className="h-11" onClick={back}>
              <ArrowLeft className="size-4" /> Zurück
            </Button>
            <Button
              type="button"
              variant="gold"
              className="h-11 flex-1"
              disabled={status === "sending"}
              onClick={handleSubmit}
            >
              {status === "sending" ? (
                "Wird gesendet …"
              ) : (
                <>
                  Ersteinschätzung anfordern <Send className="size-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      <Honeypot value={s.website} onChange={(v) => set("website", v)} />

      <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="size-3.5 text-brand" /> Kostenlos &amp; unverbindlich
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="size-3.5 text-brand" /> Rückmeldung i. d. R. innerhalb
          eines Werktags
        </span>
      </p>
    </div>
  );
}
