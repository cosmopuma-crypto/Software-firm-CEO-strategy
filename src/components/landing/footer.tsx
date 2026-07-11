import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { SITE } from "@/lib/site";
import { Logo } from "./logo";

const NAV = [
  { href: "/#leistungen", label: "Leistungen" },
  { href: "/#waermepumpen-check", label: "Wärmepumpe" },
  { href: "/#bad", label: "Bad" },
  { href: "/#referenzen", label: "Referenzen" },
  { href: "/#kundendienst", label: "Kundendienst" },
];

const LEGAL = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
];

export function Footer() {
  return (
    <footer className="bg-brand-deep text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="flex flex-col gap-4">
          <Logo onDark href="/#top" />
          <p className="max-w-sm text-sm text-white/70">
            Ihr Fachbetrieb für Sanitär, Heizung und Wärmepumpen in Neumünster –
            persönlich, ehrlich und aus der Region.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
            Navigation
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            {NAV.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
            Kontakt
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold-soft" />
              <span>
                {SITE.legalName}
                <br />
                {SITE.street}, {SITE.zip} {SITE.city}
              </span>
            </li>
            <li>
              <a href={SITE.phoneHref} className="flex items-center gap-2 hover:text-white">
                <Phone className="size-4 text-gold-soft" /> {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-white">
                <Mail className="size-4 text-gold-soft" /> {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/60 sm:flex-row sm:px-6 lg:px-8">
          <p>© {SITE.legalName} · Alle Rechte vorbehalten.</p>
          <nav className="flex flex-wrap gap-x-5 gap-y-1">
            {LEGAL.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-white">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
