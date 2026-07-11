import type { Metadata } from "next";
import {
  LegalPage,
  LegalSection,
  TodoNote,
} from "@/components/landing/legal-page";
import { SITE } from "@/lib/site";

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
          {SITE.legalName}, {SITE.street}, {SITE.zip} {SITE.city}, {SITE.email}
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

      <LegalSection heading="3. Cookies & Tracking">
        <p>
          Diese Website setzt keine eigenen Tracking- oder Marketing-Cookies ein
          und verwendet keine Analyse-Dienste zur Erstellung von Nutzerprofilen.
          Eingebundene Drittinhalte sind nachfolgend beschrieben (Bewertungen,
          Karte) – die Karte wird erst nach aktivem Klick geladen.
        </p>
      </LegalSection>

      <LegalSection heading="4. Bewertungen (Trustindex)">
        <p>
          Zur Darstellung unserer Google- und MyHammer-Bewertungen nutzen wir das
          Widget des Dienstes Trustindex (Trustindex.io). Dabei wird beim Aufruf
          der Seite Inhalt von den Servern von Trustindex geladen, wodurch Ihre
          IP-Adresse an den Anbieter übermittelt werden kann. Rechtsgrundlage ist
          unser berechtigtes Interesse an der Darstellung von Kundenbewertungen
          (Art. 6 Abs. 1 lit. f DSGVO). [Bei Bedarf: Hinweis/Verlinkung auf die
          Datenschutzerklärung von Trustindex ergänzen.]
        </p>
      </LegalSection>

      <LegalSection heading="5. Karte (Google Maps)">
        <p>
          Unseren Standort zeigen wir über Google Maps (Google Ireland Ltd.). Die
          Karte wird aus Datenschutzgründen erst geladen, wenn Sie aktiv auf
          „Karte laden" klicken. Erst dann werden Daten – insbesondere Ihre
          IP-Adresse – an Google übertragen. Rechtsgrundlage ist Ihre
          Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die Sie durch den Klick
          erteilen.
        </p>
      </LegalSection>

      <LegalSection heading="6. Speicherdauer">
        <p>
          [Angabe zur Speicherdauer der Anfragedaten einsetzen.]
        </p>
      </LegalSection>

      <LegalSection heading="7. Ihre Rechte">
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
          Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch
          sowie ein Beschwerderecht bei einer Aufsichtsbehörde.
        </p>
      </LegalSection>

      <LegalSection heading="8. Hosting">
        <p>[Angaben zum eingesetzten Hosting-/Server-Dienstleister einsetzen.]</p>
      </LegalSection>
    </LegalPage>
  );
}
