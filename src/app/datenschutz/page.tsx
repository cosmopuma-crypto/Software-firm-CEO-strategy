import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/landing/legal-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutz · ST-Haustechnik",
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <LegalSection heading="1. Verantwortlicher">
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne
          der Datenschutz-Grundverordnung (DSGVO) ist:
          <br />
          <br />
          {SITE.legalName}
          <br />
          {SITE.street}
          <br />
          {SITE.zip} {SITE.city}
          <br />
          Telefon: {SITE.phone}
          <br />
          E-Mail: {SITE.email}
        </p>
      </LegalSection>

      <LegalSection heading="2. Ihre Rechte als betroffene Person">
        <p>
          Sie haben jederzeit das Recht auf Auskunft (Art. 15 DSGVO),
          Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der
          Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie ein
          Widerspruchsrecht gegen die Verarbeitung (Art. 21 DSGVO). Eine erteilte
          Einwilligung können Sie jederzeit mit Wirkung für die Zukunft
          widerrufen.
        </p>
        <p>
          Ihnen steht zudem ein Beschwerderecht bei einer Aufsichtsbehörde zu.
          Zuständig ist das Unabhängige Landeszentrum für Datenschutz
          Schleswig-Holstein (ULD), Holstenstraße 98, 24103 Kiel.
        </p>
      </LegalSection>

      <LegalSection heading="3. Hosting">
        <p>
          Diese Website wird bei der Vercel Inc. (USA) gehostet. Beim Aufruf der
          Website erhebt der Anbieter aus technischen Gründen automatisch
          Informationen (Server-Logfiles), die Ihr Browser übermittelt – etwa
          IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite,
          Browsertyp und Betriebssystem. Diese Daten dienen der sicheren und
          stabilen Bereitstellung der Website. Rechtsgrundlage ist unser
          berechtigtes Interesse an einem zuverlässigen Betrieb (Art. 6 Abs. 1
          lit. f DSGVO).
        </p>
        <p>
          Mit dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung (Art. 28
          DSGVO). Da eine Verarbeitung auch in den USA erfolgen kann, ist ein
          angemessenes Datenschutzniveau über die EU-Standardvertragsklauseln
          abgesichert.
        </p>
      </LegalSection>

      <LegalSection heading="4. SSL-/TLS-Verschlüsselung">
        <p>
          Diese Website nutzt aus Sicherheitsgründen eine
          SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
          am „https://“ in der Adresszeile Ihres Browsers.
        </p>
      </LegalSection>

      <LegalSection heading="5. Kontaktaufnahme und Online-Formulare">
        <p>
          Wenn Sie den Wärmepumpenkonfigurator, den Badplaner oder das
          Kundendienstformular nutzen bzw. uns per E-Mail oder Telefon
          kontaktieren, verarbeiten wir die von Ihnen gemachten Angaben (z. B.
          Anrede, Name, Kontaktdaten, Angaben zu Gebäude bzw. Anlage sowie ggf.
          hochgeladene Dateien) ausschließlich zur Bearbeitung Ihrer Anfrage und
          zur Vorbereitung eines möglichen Vertrags.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche
          Maßnahmen bzw. Vertragserfüllung) sowie unser berechtigtes Interesse an
          der Beantwortung von Anfragen (Art. 6 Abs. 1 lit. f DSGVO). Die über
          die Formulare übermittelten Angaben werden per E-Mail an {SITE.email}{" "}
          zugestellt. Der Versand und das zugehörige E-Mail-Postfach werden über
          die STRATO AG (Deutschland) betrieben.
        </p>
      </LegalSection>

      <LegalSection heading="6. Wärmepumpen-Check & Förderrechner (Heizreport)">
        <p>
          Auf unserer Website binden wir den Wärmepumpen-Check und den
          Förderrechner des Dienstes „Heizreport“ (heiz.report) ein. Beim Aufruf
          der entsprechenden Seite werden Programmbibliotheken von den Servern
          des Anbieters (heizreport.de bzw. heizreport.net) geladen; dabei kann
          Ihre IP-Adresse an den Anbieter übermittelt werden.
        </p>
        <p>
          Wenn Sie eines dieser Tools ausfüllen, werden die von Ihnen
          eingegebenen Angaben (z. B. zu Gebäude, Heizung und Ihre Kontaktdaten)
          an Heizreport übermittelt und dort verarbeitet, um die Auswertung bzw.
          das Ergebnisdokument zu erstellen. Das Ergebnis einer abgeschlossenen
          Abfrage wird uns zur Bearbeitung Ihrer Anfrage übermittelt.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Durchführung der von
          Ihnen angeforderten Auswertung) sowie unser berechtigtes Interesse an
          einer effizienten Angebotserstellung (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
      </LegalSection>

      <LegalSection heading="7. Kundenbewertungen (Trustindex)">
        <p>
          Zur Darstellung unserer Google- und MyHammer-Bewertungen nutzen wir das
          Widget des Dienstes Trustindex (Trustindex.io). Beim Aufruf der Seite
          wird Inhalt von den Servern von Trustindex geladen, wodurch Ihre
          IP-Adresse an den Anbieter übermittelt werden kann. Rechtsgrundlage ist
          unser berechtigtes Interesse an der Darstellung von Kundenbewertungen
          (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
      </LegalSection>

      <LegalSection heading="8. Karte (Google Maps)">
        <p>
          Unseren Standort zeigen wir über Google Maps (Google Ireland Ltd.). Die
          Karte wird aus Datenschutzgründen erst geladen, wenn Sie aktiv auf
          „Karte laden“ klicken. Erst dann werden Daten – insbesondere Ihre
          IP-Adresse – an Google übertragen. Rechtsgrundlage ist Ihre
          Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die Sie durch den Klick
          erteilen und jederzeit für die Zukunft widerrufen können.
        </p>
      </LegalSection>

      <LegalSection heading="9. Cookies">
        <p>
          Für den eigenen Betrieb dieser Website setzen wir keine Analyse- oder
          Marketing-Cookies ein und erstellen keine Nutzerprofile. Technisch
          notwendige Cookies sowie ggf. durch die vorstehend genannten
          Drittdienste gesetzte Cookies dienen der Funktion der jeweiligen
          Inhalte.
        </p>
      </LegalSection>

      <LegalSection heading="10. Speicherdauer">
        <p>
          Wir verarbeiten und speichern personenbezogene Daten nur so lange, wie
          es für die Erreichung des jeweiligen Zwecks erforderlich ist.
          Anfragedaten werden gelöscht, sobald sie für die Bearbeitung nicht mehr
          benötigt werden und keine gesetzlichen Aufbewahrungspflichten
          entgegenstehen. Kommt es zu einem Vertrag, gelten die gesetzlichen
          Aufbewahrungsfristen (insbesondere aus HGB und AO, i. d. R. 6 bzw. 10
          Jahre).
        </p>
      </LegalSection>

      <LegalSection heading="11. Aktualität und Änderung dieser Datenschutzerklärung">
        <p>
          Diese Datenschutzerklärung hat den Stand Juli 2026. Durch die
          Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher
          bzw. behördlicher Vorgaben kann es notwendig werden, diese
          Datenschutzerklärung anzupassen.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
