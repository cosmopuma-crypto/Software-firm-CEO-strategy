import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock, Camera, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/landing/footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Danke – Ihre Anfrage ist eingegangen",
  // Bestätigungsseite gehört nicht in den Index.
  robots: { index: false, follow: false },
};

export default function DankePage() {
  return (
    <div>
      <Nav />
      <main className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 lg:py-28">
        <span className="flex size-16 items-center justify-center rounded-full bg-brand-soft text-brand">
          <CheckCircle2 className="size-9" />
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Vielen Dank! Ihre Anfrage ist bei uns.
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Wir melden uns <strong className="text-foreground">in unter 4 Arbeitsstunden</strong> persönlich
          bei Ihnen (Mo–Fr) – mit einer ehrlichen Ersteinschätzung, ob und wie
          eine Wärmepumpe zu Ihrem Haus passt.
        </p>

        <div className="mt-2 flex w-full flex-col gap-4 rounded-2xl border bg-card p-6 text-left shadow-sm sm:p-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Camera className="size-5 text-brand" /> Ein Tipp, damit es schneller geht
          </h2>
          <p className="text-sm text-muted-foreground">
            Legen Sie schon einmal ein paar Fotos von Ihrem Heizungsraum bereit –
            aktuelle Heizung, Warmwasserspeicher und der Platz, wo die Außeneinheit
            stehen könnte. Damit können wir Ihre Ersteinschätzung deutlich
            genauer machen.
          </p>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="size-4 shrink-0 text-brand" /> Erreichbar {SITE.hours}
          </p>
        </div>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <a href={SITE.phoneHref} className={cn(buttonVariants({ variant: "gold" }), "h-12 px-7 text-base")}>
            <Phone className="size-4" /> Lieber gleich anrufen: {SITE.phone}
          </a>
          <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "h-12 px-7 text-base")}>
            Zurück zur Startseite
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
