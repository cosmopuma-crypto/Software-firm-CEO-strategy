import type { Metadata } from "next";
import { FormPage } from "@/components/landing/form-page";
import { KundendienstForm } from "@/components/forms/kundendienst-form";

export const metadata: Metadata = {
  title: "Kundendienst",
  description: "Störung melden und schnelle Hilfe vom Serviceteam anfragen.",
};

export default function KundendienstPage() {
  return (
    <FormPage
      eyebrow="Kundendienst"
      title="Störung melden – schnelle Hilfe anfragen"
      description="Heizung kalt, Wasser läuft nicht, Fehlermeldung? Schildern Sie uns kurz das Problem. Unser Serviceteam meldet sich zur Terminabstimmung."
    >
      <KundendienstForm />
    </FormPage>
  );
}
