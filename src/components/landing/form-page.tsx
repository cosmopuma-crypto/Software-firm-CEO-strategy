import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Nav } from "./nav";
import { Footer } from "./footer";

interface FormPageProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly children: React.ReactNode;
}

/** Minimaler Seiten-Rahmen für die eigenständigen Formular-Routen. */
export function FormPage({ eyebrow, title, description, children }: FormPageProps) {
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
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand">
            {eyebrow}
          </span>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Card className="mt-8 p-6 shadow-lg shadow-brand/5 sm:p-8">{children}</Card>
      </main>
      <Footer />
    </>
  );
}
