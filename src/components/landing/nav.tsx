"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#konfigurator", label: "Wärmepumpe" },
  { href: "#badplaner", label: "Bad" },
  { href: "#kundendienst", label: "Kundendienst" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="#top" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-md bg-brand text-brand-foreground">
            ST
          </span>
          <span className="text-lg">
            ST-<span className="text-brand">Haustechnik</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
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

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="tel:+4943210000000"
            className="flex items-center gap-1.5 text-sm font-medium text-brand"
          >
            <Phone className="size-4" /> 04321 000000
          </a>
          <a href="#konfigurator" className={cn(buttonVariants())}>
            Wärmepumpe konfigurieren
          </a>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menü"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t transition-[max-height] duration-300 md:hidden",
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
            href="#konfigurator"
            onClick={() => setOpen(false)}
            className={cn(buttonVariants(), "mt-2")}
          >
            Wärmepumpe konfigurieren
          </a>
        </nav>
      </div>
    </header>
  );
}
