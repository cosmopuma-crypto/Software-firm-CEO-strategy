import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepperProps {
  readonly steps: readonly string[];
  readonly current: number; // 0-basiert
  readonly className?: string;
}

/** Fortschrittsanzeige für die mehrstufigen Konfiguratoren. */
export function Stepper({ steps, current, className }: StepperProps) {
  return (
    <ol className={cn("flex w-full items-center gap-2", className)}>
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={step} className="flex flex-1 items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
                  done && "border-brand bg-brand text-brand-foreground",
                  active && "border-brand text-brand",
                  !done && !active && "border-input text-muted-foreground",
                )}
              >
                {done ? <Check className="size-4" /> : i + 1}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span
                className={cn(
                  "h-0.5 flex-1 rounded-full transition-colors",
                  i < current ? "bg-brand" : "bg-border",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
