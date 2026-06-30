import Link from "next/link";

const LEGAL = [
  { href: "/impressum", label: "Impressum" },
  { href: "/agb", label: "AGB" },
  { href: "/datenschutz", label: "Datenschutz" },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <Link href="#top" className="flex items-center gap-2 font-bold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-md bg-brand text-brand-foreground">
              ST
            </span>
            <span className="text-lg">
              ST-<span className="text-brand">Haustechnik</span>
            </span>
          </Link>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-brand"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="text-xs text-muted-foreground">
          © {/* Jahr */} ST-Haustechnik · Sanitär, Heizung &amp; Wärmepumpen in
          Neumünster. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
