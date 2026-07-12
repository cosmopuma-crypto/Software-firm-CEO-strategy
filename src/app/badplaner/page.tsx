import type { Metadata } from "next";
import { FormPage } from "@/components/landing/form-page";
import { Badplaner } from "@/components/forms/badplaner";

export const metadata: Metadata = {
  title: "Badplaner",
  description: "Planen Sie Ihr neues Bad – passend zu Raum, Stil und Budget.",
};

export default function BadplanerPage() {
  return (
    <FormPage
      eyebrow="Badplaner"
      title="Planen Sie Ihr neues Bad"
      description="Erzählen Sie uns von Ihren Vorstellungen – wir entwickeln daraus ein Konzept, das zu Ihnen, Ihrem Raum und Ihrem Budget passt."
    >
      <Badplaner />
    </FormPage>
  );
}
