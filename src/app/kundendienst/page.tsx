import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { FormPage } from "@/components/landing/form-page";
import { KundendienstBooking } from "@/components/landing/kundendienst-booking";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kundendienst, Wartung & Beratung",
  description:
    "Wartung, Beratungstermin oder Störung – wählen Sie Ihr Anliegen und buchen Sie den passenden Termin direkt online. Bestätigung sofort per E-Mail.",
};

export default function KundendienstPage() {
  return (
    <FormPage
      eyebrow="Kundendienst, Wartung & Beratung"
      title="Termin online buchen"
      description="Wählen Sie zuerst Ihr Anliegen – Wartung, Beratung oder Störung. Wir zeigen Ihnen dann die passenden Angaben und freien Termine; die Bestätigung kommt sofort per E-Mail in Ihren Kalender."
    >
      <div className="flex flex-col gap-6">
        <KundendienstBooking
          bookingUrl={SITE.bookingUrl}
          phone={SITE.phone}
          phoneHref={SITE.phoneHref}
        />

        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="size-4 shrink-0 text-brand" />
          Akuter Notfall (z. B. Heizungsausfall)? Rufen Sie uns direkt an:{" "}
          <a
            href={SITE.phoneHref}
            className="font-medium text-brand underline underline-offset-2"
          >
            {SITE.phone}
          </a>
          .
        </p>
      </div>
    </FormPage>
  );
}
