import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "./nav";
import { Footer } from "./footer";

interface LegalPageProps {
  readonly title: string;
  readonly children: React.ReactNode;
}

/** Rahmen für die rechtlichen Seiten (Impressum/AGB/Datenschutz). */
export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-brand"
        >
          <ArrowLeft className="size-4" /> Zur Startseite
        </Link>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        <div className="prose-legal mt-8 flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}

/** Hinweisbox: dieser Inhalt muss noch mit den eigenen Texten gefüllt werden. */
export function TodoNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-md border border-dashed border-brand/40 bg-brand-soft/60 px-4 py-3 text-foreground">
      <strong className="font-semibold">Noch zu ergänzen:</strong> {children}
    </p>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold text-foreground">{heading}</h2>
      {children}
    </section>
  );
}
