import type { Metadata } from "next";
import {
  LegalPage,
  LegalSection,
  TodoNote,
} from "@/components/landing/legal-page";

export const metadata: Metadata = {
  title: "Datenschutz · ST-Haustechnik",
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <TodoNote>
        Eigene Datenschutzerklärung der bestehenden Seite übernehmen bzw.
        anpassen. Die folgenden Abschnitte sind ein Gerüst.
      </TodoNote>

      <LegalSection heading="1. Verantwortlicher">
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          <br />
          ST-Haustechnik, [Anschrift], info@st-haustechnik.de
        </p>
      </LegalSection>

      <LegalSection heading="2. Verarbeitung über die Online-Formulare">
        <p>
          Wenn Sie den Wärmepumpenkonfigurator, den Badplaner oder das
          Kundendienstformular nutzen, verarbeiten wir die von Ihnen
          eingegebenen Angaben (z. B. Name, Kontaktdaten, Angaben zu Gebäude
          bzw. Anlage und ggf. hochgeladene Dateien) ausschließlich zur
          Bearbeitung Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
          und f DSGVO. Die Übermittlung erfolgt per E-Mail an
          info@st-haustechnik.de.
        </p>
      </LegalSection>

      <LegalSection heading="3. Keine Tracking-Cookies">
        <p>
          Diese Website setzt keine Tracking- oder Marketing-Cookies ein. Es
          werden keine Analyse-Dienste zur Erstellung von Nutzerprofilen
          verwendet.
        </p>
      </LegalSection>

      <LegalSection heading="4. Speicherdauer">
        <p>
          [Angabe zur Speicherdauer der Anfragedaten einsetzen.]
        </p>
      </LegalSection>

      <LegalSection heading="5. Ihre Rechte">
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
          Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch
          sowie ein Beschwerderecht bei einer Aufsichtsbehörde.
        </p>
      </LegalSection>

      <LegalSection heading="6. Hosting">
        <p>[Angaben zum eingesetzten Hosting-/Server-Dienstleister einsetzen.]</p>
      </LegalSection>
    </LegalPage>
  );
}
