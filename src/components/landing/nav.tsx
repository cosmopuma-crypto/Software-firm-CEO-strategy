"use client";

import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";
import { Logo } from "./logo";

const LINKS = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#waermepumpe", label: "Wärmepumpe" },
  { href: "#bad", label: "Bad" },
  { href: "#ueber-uns", label: "Über uns" },
  { href: "#kundendienst", label: "Kundendienst" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-1.5 text-sm font-semibold text-brand"
          >
            <Phone className="size-4" /> {SITE.phone}
          </a>
          <a href="#waermepumpe" className={cn(buttonVariants({ variant: "gold" }))}>
            Wärmepumpe anfragen
          </a>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menü"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border/70 transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-3">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-brand"
            >
              {l.label}
            </a>
          ))}
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-1.5 px-2 py-2 text-sm font-semibold text-brand"
          >
            <Phone className="size-4" /> {SITE.phone}
          </a>
          <a
            href="#waermepumpe"
            onClick={() => setOpen(false)}
            className={cn(buttonVariants({ variant: "gold" }), "mt-2")}
          >
            Wärmepumpe anfragen
          </a>
        </nav>
      </div>
    </header>
  );
}
