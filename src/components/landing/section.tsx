import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

interface SectionProps {
  readonly id?: string;
  readonly className?: string;
  readonly children: React.ReactNode;
  /** dezenter Blauschleier als Hintergrund */
  readonly tinted?: boolean;
}

/** Standard-Abschnitt der One-Page mit Anker-Offset für die Sticky-Nav. */
export function Section({ id, className, children, tinted }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 py-16 sm:py-24",
        tinted && "bg-brand-soft/50",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
  readonly centered?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("flex flex-col gap-3", centered && "items-center text-center")}>
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-wide text-brand">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && (
        <p className="max-w-2xl text-muted-foreground">{description}</p>
      )}
    </Reveal>
  );
}
