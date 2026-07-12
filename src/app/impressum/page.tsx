import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/landing/legal-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false },
};

// Strukturgerüst gemäß § 5 DDG. Inhalte gehören dem Inhaber und werden von
// der bestehenden Seite übernommen / vom Inhaber eingesetzt.
export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <LegalSection heading="Angaben gemäß § 5 DDG">
        <p>
          {SITE.legalName}
          <br />
          {SITE.street}
          <br />
          {SITE.zip} {SITE.city}
        </p>
      </LegalSection>

      <LegalSection heading="Vertreten durch">
        <p>
          {SITE.managingDirector}, Geschäftsführender Gesellschafter
          <br />
          Sachkundig für Wärmepumpensysteme nach VDI 4645
        </p>
      </LegalSection>

      <LegalSection heading="Fachliche Vertretung">
        <p>
          {SITE.technicalDirector}
          <br />
          Installations- und Heizungsbaumeister
        </p>
      </LegalSection>

      <LegalSection heading="Kontakt">
        <p>
          Telefon: {SITE.phone}
          <br />
          Mobil: {SITE.mobile}
          <br />
          E-Mail: {SITE.email}
        </p>
      </LegalSection>

      <LegalSection heading="Registereintrag">
        <p>
          Eingetragen im Handelsregister.
          <br />
          Registergericht: {SITE.register}
        </p>
      </LegalSection>

      <LegalSection heading="Steuernummer">
        <p>{SITE.taxNumber}</p>
      </LegalSection>

      <LegalSection heading="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <p>
          {SITE.managingDirector}
          <br />
          {SITE.street}, {SITE.zip} {SITE.city}
        </p>
      </LegalSection>

      <LegalSection heading="EU-Streitschlichtung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            className="text-brand underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          . Wir sind nicht verpflichtet und nicht bereit, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
