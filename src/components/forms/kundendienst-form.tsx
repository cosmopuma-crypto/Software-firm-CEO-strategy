"use client";

import { useRef, useState } from "react";
import { Send, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Field } from "@/components/ui/field";
import { OptionCards } from "@/components/ui/option-cards";
import { ConsentNote, Honeypot } from "./consent-note";
import { SuccessPanel, ErrorBanner } from "./form-shell";
import { submitContact } from "@/lib/forms/client";
import { DEVICE_TYPES, URGENCIES, type DeviceType, type Urgency } from "@/domain/forms";

const MAX_FILES = 3;
const MAX_BYTES = 5 * 1024 * 1024;

interface State {
  name: string;
  email: string;
  phone: string;
  addressStreet: string;
  addressZip: string;
  addressCity: string;
  deviceType: DeviceType | "";
  manufacturer: string;
  problem: string;
  urgency: Urgency;
  preferredDate: string;
  consent: boolean;
  website: string;
}

const INITIAL: State = {
  name: "",
  email: "",
  phone: "",
  addressStreet: "",
  addressZip: "",
  addressCity: "",
  deviceType: "",
  manufacturer: "",
  problem: "",
  urgency: "normal",
  preferredDate: "",
  consent: false,
  website: "",
};

export function KundendienstForm() {
  const [s, setS] = useState<State>(INITIAL);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof State>(key: K, value: State[K]) =>
    setS((p) => ({ ...p, [key]: value }));

  function addFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list);
    const tooBig = incoming.find((f) => f.size > MAX_BYTES);
    if (tooBig) {
      setErrors((e) => ({ ...e, files: `„${tooBig.name}" ist zu groß (max. 5 MB).` }));
      return;
    }
    setErrors((e) => {
      const { files: _removed, ...rest } = e;
      void _removed;
      return rest;
    });
    setFiles((prev) => [...prev, ...incoming].slice(0, MAX_FILES));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeFile(idx: number) {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setStatus("sending");

    const fd = new FormData();
    fd.set("formType", "kundendienst");
    fd.set("name", s.name.trim());
    fd.set("email", s.email.trim());
    fd.set("phone", s.phone.trim());
    fd.set("addressStreet", s.addressStreet.trim());
    fd.set("addressZip", s.addressZip.trim());
    fd.set("addressCity", s.addressCity.trim());
    fd.set("deviceType", s.deviceType);
    if (s.manufacturer.trim()) fd.set("manufacturer", s.manufacturer.trim());
    fd.set("problem", s.problem.trim());
    fd.set("urgency", s.urgency);
    if (s.preferredDate) fd.set("preferredDate", s.preferredDate);
    fd.set("consent", s.consent ? "true" : "false");
    fd.set("website", s.website);
    for (const f of files) fd.append("files", f);

    const result = await submitContact(fd);
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
    setFiles([]);
    setErrors({});
    setStatus("idle");
  }

  if (status === "ok") {
    return (
      <SuccessPanel
        title="Danke! Deine Kundendienst-Anfrage ist da."
        description="Wir kümmern uns schnellstmöglich darum und melden uns zur Terminabstimmung bei dir."
        onReset={reset}
        resetLabel="Neue Anfrage"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="kd-name" required error={errors.name}>
          <Input id="kd-name" value={s.name} onChange={(e) => set("name", e.target.value)} />
        </Field>
        <Field label="Telefon" htmlFor="kd-phone" required error={errors.phone}>
          <Input id="kd-phone" type="tel" value={s.phone} onChange={(e) => set("phone", e.target.value)} />
        </Field>
      </div>

      <Field label="E-Mail" htmlFor="kd-email" required error={errors.email}>
        <Input id="kd-email" type="email" value={s.email} onChange={(e) => set("email", e.target.value)} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-[1fr_140px_1fr]">
        <Field label="Straße & Hausnr." htmlFor="kd-street" required error={errors.addressStreet}>
          <Input id="kd-street" value={s.addressStreet} onChange={(e) => set("addressStreet", e.target.value)} />
        </Field>
        <Field label="PLZ" htmlFor="kd-zip" required error={errors.addressZip}>
          <Input id="kd-zip" inputMode="numeric" value={s.addressZip} onChange={(e) => set("addressZip", e.target.value)} />
        </Field>
        <Field label="Ort" htmlFor="kd-city" required error={errors.addressCity}>
          <Input id="kd-city" value={s.addressCity} onChange={(e) => set("addressCity", e.target.value)} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Um welche Anlage geht es?" htmlFor="kd-device" required error={errors.deviceType}>
          <Select
            id="kd-device"
            value={s.deviceType}
            onChange={(e) => set("deviceType", e.target.value as DeviceType)}
          >
            <option value="" disabled>
              Bitte wählen …
            </option>
            {DEVICE_TYPES.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Hersteller (optional)" htmlFor="kd-man" error={errors.manufacturer}>
          <Input
            id="kd-man"
            placeholder="z. B. Viessmann, Vaillant …"
            value={s.manufacturer}
            onChange={(e) => set("manufacturer", e.target.value)}
          />
        </Field>
      </div>

      <Field label="Was ist das Problem?" htmlFor="kd-problem" required error={errors.problem}>
        <Textarea
          id="kd-problem"
          placeholder="Beschreibe kurz, was nicht funktioniert (z. B. Heizung bleibt kalt, Fehlercode …)."
          value={s.problem}
          onChange={(e) => set("problem", e.target.value)}
        />
      </Field>

      <Field label="Wie dringend ist es?" required error={errors.urgency}>
        <OptionCards options={URGENCIES} value={s.urgency} onChange={(v) => set("urgency", v)} columns={3} />
      </Field>

      <Field label="Wunschtermin (optional)" htmlFor="kd-date" hint="Wir versuchen, deinen Wunsch zu berücksichtigen.">
        <Input
          id="kd-date"
          type="date"
          value={s.preferredDate}
          onChange={(e) => set("preferredDate", e.target.value)}
        />
      </Field>

      <Field
        label="Fotos / Dokumente (optional)"
        error={errors.files}
        hint="Bis zu 3 Dateien, max. 5 MB (JPG, PNG, WebP, PDF)."
      >
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 rounded-md border border-dashed border-input bg-background px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-brand/60 hover:text-foreground"
          >
            <Upload className="size-4" /> Dateien auswählen
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            multiple
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />
          {files.length > 0 && (
            <ul className="flex flex-col gap-1.5">
              {files.map((f, i) => (
                <li
                  key={`${f.name}-${i}`}
                  className="flex items-center justify-between gap-2 rounded-md border border-input bg-muted/40 px-3 py-1.5 text-sm"
                >
                  <span className="truncate">{f.name}</span>
                  <button type="button" onClick={() => removeFile(i)} aria-label="Datei entfernen">
                    <X className="size-4 text-muted-foreground hover:text-foreground" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Field>

      <ConsentNote checked={s.consent} onChange={(v) => set("consent", v)} error={errors.consent} />
      {status === "error" && serverMessage && <ErrorBanner message={serverMessage} />}

      <Honeypot value={s.website} onChange={(v) => set("website", v)} />

      <div className="flex justify-end">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Wird gesendet …" : "Anfrage absenden"}
          <Send className="size-4" />
        </Button>
      </div>
    </form>
  );
}
