import type { Metadata } from "next";
import {
  LegalPage,
  LegalSection,
  TodoNote,
} from "@/components/landing/legal-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum · ST-Haustechnik",
  robots: { index: false },
};

// Strukturgerüst gemäß § 5 DDG. Inhalte gehören dem Inhaber und werden von
// der bestehenden Seite übernommen / vom Inhaber eingesetzt.
export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <TodoNote>
        Eigene Impressums-Angaben der bestehenden Seite einsetzen. Keine Inhalte
        der bisherigen Hosting-/Fremdfirma übernehmen.
      </TodoNote>

      <LegalSection heading="Angaben gemäß § 5 DDG">
        <p>
          {SITE.legalName}
          <br />
          {SITE.street}
          <br />
          {SITE.zip} {SITE.city}
        </p>
      </LegalSection>

      <LegalSection heading="Kontakt">
        <p>
          Telefon: {SITE.phone}
          <br />
          E-Mail: {SITE.email}
        </p>
      </LegalSection>

      <LegalSection heading="Vertreten durch">
        <p>[Geschäftsführer/in – bitte ergänzen]</p>
      </LegalSection>

      <LegalSection heading="Registereintrag">
        <p>
          [Eintragung im Handelsregister · Registergericht: Amtsgericht … ·
          Registernummer: HRB … – bitte ergänzen]
        </p>
      </LegalSection>

      <LegalSection heading="Umsatzsteuer-ID">
        <p>[USt-IdNr. gemäß § 27 a UStG, falls vorhanden]</p>
      </LegalSection>

      <LegalSection heading="Berufsrechtliche Angaben">
        <p>
          [Handwerkskammer, Kammerzugehörigkeit, Berufsbezeichnung und
          verleihender Staat – falls zutreffend.]
        </p>
      </LegalSection>

      <LegalSection heading="Verantwortlich für den Inhalt">
        <p>[Name und Anschrift der verantwortlichen Person]</p>
      </LegalSection>

      <LegalSection heading="Streitschlichtung">
        <p>
          [Hinweis zur Verbraucherschlichtung / EU-Streitschlichtungsplattform
          nach Bedarf.]
        </p>
      </LegalSection>
    </LegalPage>
  );
}
