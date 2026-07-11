"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Option } from "@/domain/forms";

interface SingleProps<T extends string> {
  readonly options: readonly Option<T>[];
  readonly value: T | undefined;
  readonly onChange: (value: T) => void;
  readonly columns?: 1 | 2 | 3;
  readonly name?: string;
}

interface MultiProps<T extends string> {
  readonly options: readonly Option<T>[];
  readonly value: readonly T[];
  readonly onChange: (value: T[]) => void;
  readonly columns?: 1 | 2 | 3;
}

const COLS: Record<1 | 2 | 3, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
};

/** Auswahl-Karten für Einfachauswahl (wie Radio, aber als anklickbare Kacheln). */
export function OptionCards<T extends string>({
  options,
  value,
  onChange,
  columns = 2,
}: SingleProps<T>) {
  return (
    <div className={cn("grid gap-2.5", COLS[columns])}>
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={selected}
            className={cn(
              "flex items-center justify-between gap-2 rounded-lg border px-4 py-3 text-left text-sm transition-colors",
              selected
                ? "border-brand bg-brand-soft font-medium text-foreground ring-1 ring-brand"
                : "border-input bg-background hover:border-brand/50 hover:bg-accent/40",
            )}
          >
            <span>{opt.label}</span>
            {selected && <Check className="size-4 shrink-0 text-brand" />}
          </button>
        );
      })}
    </div>
  );
}

/** Auswahl-Karten für Mehrfachauswahl. */
export function MultiOptionCards<T extends string>({
  options,
  value,
  onChange,
  columns = 2,
}: MultiProps<T>) {
  const toggle = (v: T) =>
    value.includes(v)
      ? onChange(value.filter((x) => x !== v))
      : onChange([...value, v]);

  return (
    <div className={cn("grid gap-2.5", COLS[columns])}>
      {options.map((opt) => {
        const selected = value.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => toggle(opt.value)}
            aria-pressed={selected}
            className={cn(
              "flex items-center justify-between gap-2 rounded-lg border px-4 py-3 text-left text-sm transition-colors",
              selected
                ? "border-brand bg-brand-soft font-medium text-foreground ring-1 ring-brand"
                : "border-input bg-background hover:border-brand/50 hover:bg-accent/40",
            )}
          >
            <span>{opt.label}</span>
            <span
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded border",
                selected ? "border-brand bg-brand text-brand-foreground" : "border-input",
              )}
            >
              {selected && <Check className="size-3.5" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}
