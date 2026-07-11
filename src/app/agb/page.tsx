import type { Metadata } from "next";
import {
  LegalPage,
  LegalSection,
  TodoNote,
} from "@/components/landing/legal-page";

export const metadata: Metadata = {
  title: "AGB · ST-Haustechnik",
  robots: { index: false },
};

export default function AgbPage() {
  return (
    <LegalPage title="Allgemeine Geschäftsbedingungen">
      <TodoNote>
        Eigene AGB der bestehenden Seite einsetzen bzw. vom Anwalt/Inhaber
        bereitstellen lassen. Keine AGB der bisherigen Fremdfirma übernehmen.
      </TodoNote>

      <LegalSection heading="§ 1 Geltungsbereich">
        <p>[Text einsetzen]</p>
      </LegalSection>
      <LegalSection heading="§ 2 Angebot und Vertragsschluss">
        <p>[Text einsetzen]</p>
      </LegalSection>
      <LegalSection heading="§ 3 Preise und Zahlung">
        <p>[Text einsetzen]</p>
      </LegalSection>
      <LegalSection heading="§ 4 Leistungserbringung und Termine">
        <p>[Text einsetzen]</p>
      </LegalSection>
      <LegalSection heading="§ 5 Gewährleistung">
        <p>[Text einsetzen]</p>
      </LegalSection>
      <LegalSection heading="§ 6 Haftung">
        <p>[Text einsetzen]</p>
      </LegalSection>
      <LegalSection heading="§ 7 Widerrufsrecht für Verbraucher">
        <p>[Text einsetzen]</p>
      </LegalSection>
      <LegalSection heading="§ 8 Schlussbestimmungen">
        <p>[Text einsetzen]</p>
      </LegalSection>
    </LegalPage>
  );
}
