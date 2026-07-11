"use client";

import * as React from "react";
import { useReveal } from "@/lib/hooks/use-reveal";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Verzögerung in ms für gestaffelte Effekte. */
  readonly delay?: number;
  readonly as?: "div" | "li" | "section";
}

/** Wrapper, der seine Kinder beim Hereinscrollen sanft einblendet. */
export function Reveal({
  delay = 0,
  as = "div",
  style,
  children,
  ...props
}: RevealProps) {
  const ref = useReveal<HTMLDivElement>();
  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  );
}
