"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { ConsentNote, Honeypot } from "./consent-note";
import { ErrorBanner } from "./form-shell";
import { submitContact } from "@/lib/forms/client";
import { HEATING_SYSTEMS, YEAR_BANDS } from "@/domain/forms";

/**
 * Förder-Check-Formular der Kampagnen-Landingpage (Google Ads).
 * Single-Screen, Telefon UND E-Mail (für das Förder-PDF). Läuft über die
 * bestehende, getestete /api/contact-Pipeline (formType „schnellanfrage").
 * Nach Erfolg Weiterleitung auf /danke – dort greift auch das Conversion-Event.
 */
const selectClass =
  "h-11 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function FoerderCheck() {
  const router = useRouter();
  const [heating, setHeating] = useState("");
  const [year, setYear] = useState("");
  const [zip, setZip] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // Honeypot
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const localErrors: Record<string, string> = {};
    if (!heating) localErrors.currentHeating = "Bitte wählen Sie Ihre aktuelle Heizung.";
    if (!year) localErrors.yearBand = "Bitte wählen Sie das Baujahr.";
    if (!/^\d{5}$/.test(zip.trim())) localErrors.addressZip = "Bitte 5-stellige PLZ angeben.";
    if (name.trim().length < 2) localErrors.name = "Bitte geben Sie Ihren Namen an.";
    if (phone.trim().length < 6) localErrors.phone = "Bitte geben Sie eine Telefonnummer an.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim()))
      localErrors.email = "Bitte geben Sie eine gültige E-Mail an.";
    if (!consent) localErrors.consent = "Bitte stimmen Sie den Datenschutzhinweisen zu.";
    setErrors(localErrors);
    if (Object.keys(localErrors).length > 0) return;

    setStatus("sending");
    setMessage("");
    const result = await submitContact({
      formType: "schnellanfrage",
      currentHeating: heating,
      yearBand: year,
      addressZip: zip.trim(),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      message: "Über den Förder-Check der Landingpage /waermepumpe-foerderung-2026",
      consent,
      website,
    });

    if (result.ok) {
      // Conversion-Signal für GA4 / Google Ads.
      if (typeof window !== "undefined") {
        (window as unknown as { dataLayer?: unknown[] }).dataLayer ??= [];
        (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
          event: "generate_lead",
          form: "foerder-check",
        });
      }
      router.push("/danke");
    } else {
      setStatus("error");
      setErrors(result.errors ?? {});
      setMessage(result.message ?? "");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="Ihre aktuelle Heizung" htmlFor="fc-heating" required error={errors.currentHeating}>
        <select
          id="fc-heating"
          className={selectClass}
          value={heating}
          onChange={(e) => setHeating(e.target.value)}
        >
          <option value="">Bitte wählen …</option>
          {HEATING_SYSTEMS.map((h) => (
            <option key={h.value} value={h.value}>
              {h.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Baujahr des Hauses (ungefähr)" htmlFor="fc-year" required error={errors.yearBand}>
        <select
          id="fc-year"
          className={selectClass}
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">Bitte wählen …</option>
          {YEAR_BANDS.map((y) => (
            <option key={y.value} value={y.value}>
              {y.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Postleitzahl" htmlFor="fc-zip" required error={errors.addressZip}>
        <Input
          id="fc-zip"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={5}
          placeholder="z. B. 24536"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
      </Field>

      <Field label="Ihr Name" htmlFor="fc-name" required error={errors.name}>
        <Input
          id="fc-name"
          autoComplete="name"
          placeholder="Vor- und Nachname"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Telefon (für die Ersteinschätzung)" htmlFor="fc-phone" required error={errors.phone}>
          <Input
            id="fc-phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Field>
        <Field label="E-Mail (für Ihr Förder-PDF)" htmlFor="fc-email" required error={errors.email}>
          <Input
            id="fc-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
      </div>

      <ConsentNote checked={consent} onChange={setConsent} error={errors.consent} id="fc-consent" />

      {status === "error" && message && <ErrorBanner message={message} />}

      <Honeypot value={website} onChange={setWebsite} />

      <Button type="submit" variant="gold" className="h-12 w-full text-base" disabled={status === "sending"}>
        {status === "sending" ? (
          "Wird gesendet …"
        ) : (
          <>
            Jetzt kostenlos prüfen lassen <Send className="size-4" />
          </>
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Keine Werbung, keine Weitergabe Ihrer Daten. Rückmeldung Mo–Fr innerhalb
        von 4 Arbeitsstunden.
      </p>
    </form>
  );
}
