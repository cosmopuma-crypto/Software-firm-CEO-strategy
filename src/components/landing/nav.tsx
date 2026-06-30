"use client";

import { useEffect, useState } from "react";
import { Phone, Menu, X, BadgeCheck, Clock } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";
import { Logo } from "./logo";

// Home-relative Anker, damit die Links auch auf Unterseiten (Formular-/Rechtsseiten) funktionieren.
const LINKS = [
  { href: "/#leistungen", label: "Leistungen" },
  { href: "/#waermepumpe", label: "Wärmepumpe" },
  { href: "/#bad", label: "Bad" },
  { href: "/#kundendienst", label: "Kundendienst" },
  { href: "/#kundenstimmen", label: "Bewertungen" },
  { href: "/#kontakt", label: "Kontakt" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top-Strip: prominenter Fachbetrieb-Hinweis + Kontakt */}
      <div className="bg-brand-deep text-white">
        <div className="mx-auto flex h-11 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide sm:text-sm">
            <BadgeCheck className="size-4 shrink-0 text-gold-soft" />
            <span className="text-gold-soft">Fachbetrieb Wärmepumpe</span>
            <span className="hidden text-white/70 sm:inline">· Sachkunde nach VDI 4645</span>
          </span>
          <span className="hidden items-center gap-4 text-sm text-white/80 md:flex">
            <a href={SITE.phoneHref} className="flex items-center gap-1.5 font-semibold text-white hover:text-gold-soft">
              <Phone className="size-4" /> {SITE.phone}
            </a>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" /> {SITE.hours}
            </span>
          </span>
        </div>
      </div>

      {/* Hauptleiste (sticky) */}
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <div className="mx-auto flex h-24 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Logo priority className="h-14 shrink-0 sm:h-16 xl:h-20" />

          <nav className="hidden items-center gap-5 xl:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors hover:text-brand"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center xl:flex">
            <a
              href="/#waermepumpe"
              className={cn(
                buttonVariants({ variant: "gold" }),
                "whitespace-nowrap transition-all duration-300",
                scrolled ? "opacity-100" : "pointer-events-none -translate-x-2 opacity-0",
              )}
            >
              Wärmepumpe konfigurieren
            </a>
          </div>

          <button className="xl:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menü">
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        <div
          className={cn(
            "overflow-hidden border-t border-border/70 transition-[max-height] duration-300 xl:hidden",
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
              href="/#waermepumpe"
              onClick={() => setOpen(false)}
              className={cn(buttonVariants({ variant: "gold" }), "mt-2")}
            >
              Wärmepumpe konfigurieren
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
