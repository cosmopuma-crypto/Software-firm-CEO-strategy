import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SITE } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-brand-deep">
      <Image
        src="/brand/photos/foto-18.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20"
      />
      <div aria-hidden className="absolute inset-0 bg-brand-deep/80" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-5">
          <span className="text-sm font-semibold uppercase tracking-wide text-gold-soft">
            Bereit loszulegen?
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Lassen Sie uns Ihr Projekt gemeinsam angehen.
          </h2>
          <p className="text-white/75">
            Ob neue Wärmepumpe, moderne Heizung oder Traumbad – fordern Sie jetzt
            unverbindlich Ihre persönliche Einschätzung an.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <a
              href="#waermepumpen-check"
              className={cn(buttonVariants({ variant: "gold" }), "h-12 px-7 text-base")}
            >
              Wärmepumpen-Check starten <ArrowRight className="size-4" />
            </a>
            <a
              href={SITE.phoneHref}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 border-white/30 bg-transparent px-7 text-base text-white hover:bg-white/10 hover:text-white",
              )}
            >
              <Phone className="size-4" /> {SITE.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
