"use client";

import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

interface ConsentNoteProps {
  readonly checked: boolean;
  readonly onChange: (checked: boolean) => void;
  readonly error?: string;
  readonly id?: string;
}

/** Pflicht-Datenschutz-Checkbox für alle Formulare. */
export function ConsentNote({
  checked,
  onChange,
  error,
  id = "consent",
}: ConsentNoteProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex items-start gap-2.5 text-sm text-muted-foreground">
        <Checkbox
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5"
        />
        <span>
          Ich habe die{" "}
          <Link href="/datenschutz" className="font-medium text-brand underline underline-offset-2">
            Datenschutzhinweise
          </Link>{" "}
          gelesen und bin mit der Verarbeitung meiner Daten zur Bearbeitung der
          Anfrage einverstanden.
        </span>
      </label>
      {error && (
        <p className="text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Verstecktes Honeypot-Feld gegen Spam (nicht von Menschen ausfüllbar).
 * Mit value/onChange = kontrolliert (für JSON-Formulare); ohne = nativ (für FormData).
 */
export function Honeypot({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="website">Website (bitte leer lassen)</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      />
    </div>
  );
}
