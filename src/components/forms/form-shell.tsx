"use client";

import { CheckCircle2, AlertCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Erfolgsmeldung nach erfolgreichem Absenden. */
export function SuccessPanel({
  title = "Vielen Dank für deine Anfrage!",
  description = "Wir haben deine Angaben erhalten und melden uns zeitnah bei dir.",
  onReset,
  resetLabel = "Neue Anfrage",
}: {
  title?: string;
  description?: string;
  onReset?: () => void;
  resetLabel?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-brand/30 bg-brand-soft px-6 py-12 text-center">
      <CheckCircle2 className="size-12 text-brand" />
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <Phone className="size-4 text-brand" />
        Dringend? Ruf uns an:{" "}
        <a href="tel:+4943210000000" className="font-medium text-brand">
          04321 000000
        </a>
      </p>
      {onReset && (
        <Button type="button" variant="outline" onClick={onReset}>
          {resetLabel}
        </Button>
      )}
    </div>
  );
}

/** Fehlerbanner (Transport-/Serverfehler). */
export function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      <AlertCircle className="mt-0.5 size-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
