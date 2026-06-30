import type { Metadata } from "next";
import {
  LegalPage,
  LegalSection,
  TodoNote,
} from "@/components/landing/legal-page";

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
          ST-Haustechnik
          <br />
          {/* TODO: Inhaber / Rechtsform */}
          [Inhaber / Firmenname]
          <br />
          {/* TODO: Straße, Hausnummer */}
          [Straße Nr.]
          <br />
          {/* TODO: PLZ Ort */}
          [PLZ] Neumünster
        </p>
      </LegalSection>

      <LegalSection heading="Kontakt">
        <p>
          Telefon: [Telefonnummer]
          <br />
          E-Mail: info@st-haustechnik.de
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
