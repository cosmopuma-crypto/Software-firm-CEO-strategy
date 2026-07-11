import type { Metadata } from "next";
import { FormPage } from "@/components/landing/form-page";
import { WaermepumpeKonfigurator } from "@/components/forms/waermepumpe-konfigurator";

export const metadata: Metadata = {
  title: "Wärmepumpenkonfigurator · ST-Haustechnik",
  description:
    "Finden Sie in wenigen Schritten heraus, welche Wärmepumpe zu Ihrem Zuhause passt.",
};

export default function KonfiguratorPage() {
  return (
    <FormPage
      eyebrow="Wärmepumpenkonfigurator"
      title="Welche Wärmepumpe passt zu Ihrem Zuhause?"
      description="Beantworten Sie ein paar kurze Fragen – wir melden uns mit einer ersten Einschätzung und einem Vorschlag für einen kostenlosen Vor-Ort-Termin."
    >
      <WaermepumpeKonfigurator />
    </FormPage>
  );
}
