import Link from "next/link";
import { ArrowRight, Phone, SearchX } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/landing/footer";
import { MobileCtaBar } from "@/components/landing/mobile-cta-bar";
import { SITE } from "@/lib/site";

/**
 * Gebrandete 404-Seite: Besucher von alten/vertippten URLs (z. B. Alt-Links
 * der Vorgänger-Website) landen nicht auf einer weißen Standardseite,
 * sondern behalten Nav, Kontaktweg und die wichtigsten Einstiege.
 */
export default function NotFound() {
  return (
    <div className="pb-14 xl:pb-0">
      <Nav />
      <main className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 lg:py-28">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
          <SearchX className="size-7" />
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Diese Seite gibt es nicht (mehr).
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Vielleicht kommen Sie über einen alten Link unserer früheren Website.
          Kein Problem – alles Wichtige finden Sie hier:
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "gold" }), "h-12 px-7 text-base")}
          >
            Zur Startseite <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/waermepumpe"
            className={cn(buttonVariants({ variant: "outline" }), "h-12 px-7 text-base")}
          >
            Wärmepumpe entdecken
          </Link>
        </div>
        <a
          href={SITE.phoneHref}
          className="flex items-center gap-2 text-sm font-semibold text-brand"
        >
          <Phone className="size-4" /> Oder rufen Sie uns an: {SITE.phone}
        </a>
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
