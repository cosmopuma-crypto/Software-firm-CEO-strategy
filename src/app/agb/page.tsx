import type { Metadata } from "next";
import {
  LegalPage,
  LegalSection,
  TodoNote,
} from "@/components/landing/legal-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "AGB · ST-Haustechnik",
  robots: { index: false },
};

export default function AgbPage() {
  return (
    <LegalPage title="Allgemeine Geschäftsbedingungen">
      <TodoNote>
        Diese AGB sind eine konservative Standard-Vorlage für einen
        SHK-/Handwerksbetrieb und orientieren sich weitgehend an der gesetzlichen
        Regelung. Geschäftsspezifische Punkte (z. B. Zahlungsziele,
        Abschlagszahlungen, Gerichtsstand, ggf. Geltung der VOB/B bei
        Bauleistungen) sowie die Widerrufsbelehrung bitte vor der Nutzung prüfen
        (lassen) – idealerweise anwaltlich oder per AGB-/Widerrufs-Generator.
      </TodoNote>

      <LegalSection heading="§ 1 Geltungsbereich">
        <p>
          (1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle
          Verträge über Lieferungen und Leistungen zwischen der {SITE.legalName}
          {" "}(nachfolgend „Auftragnehmer“) und ihren Kundinnen und Kunden
          (nachfolgend „Auftraggeber“).
        </p>
        <p>
          (2) Abweichende, entgegenstehende oder ergänzende Bedingungen des
          Auftraggebers werden nur dann Vertragsbestandteil, wenn der
          Auftragnehmer ihrer Geltung ausdrücklich schriftlich zugestimmt hat.
        </p>
      </LegalSection>

      <LegalSection heading="§ 2 Angebot und Vertragsschluss">
        <p>
          (1) Angebote des Auftragnehmers sind freibleibend und unverbindlich,
          sofern sie nicht ausdrücklich als verbindlich bezeichnet sind.
        </p>
        <p>
          (2) Der Vertrag kommt durch die Auftragsbestätigung des Auftragnehmers
          oder durch Beginn der Ausführung zustande. Kostenvoranschläge sind,
          soweit nicht anders vereinbart, unverbindlich.
        </p>
      </LegalSection>

      <LegalSection heading="§ 3 Preise und Zahlung">
        <p>
          (1) Es gelten die vereinbarten Preise zuzüglich der jeweils
          gesetzlichen Umsatzsteuer. Materialkosten, Anfahrt und Arbeitszeit
          werden nach Aufwand oder zum vereinbarten Festpreis berechnet.
        </p>
        <p>
          (2) Rechnungen sind, sofern nicht anders vereinbart, innerhalb von 14
          Tagen nach Zugang ohne Abzug zur Zahlung fällig. Bei umfangreicheren
          Aufträgen können angemessene Abschlagszahlungen entsprechend dem
          Leistungsfortschritt verlangt werden.
        </p>
        <p>
          (3) Gerät der Auftraggeber in Zahlungsverzug, gelten die gesetzlichen
          Regelungen.
        </p>
      </LegalSection>

      <LegalSection heading="§ 4 Leistungserbringung und Termine">
        <p>
          (1) Termin- und Fristangaben sind nur verbindlich, wenn sie
          ausdrücklich schriftlich als verbindlich bestätigt wurden.
        </p>
        <p>
          (2) Der Auftraggeber stellt sicher, dass die für die Ausführung
          erforderlichen Voraussetzungen rechtzeitig und unentgeltlich vorliegen
          (z. B. Zugang zu den Räumlichkeiten sowie erforderliche Strom- und
          Wasseranschlüsse).
        </p>
        <p>
          (3) Ereignisse höherer Gewalt sowie sonstige vom Auftragnehmer nicht zu
          vertretende Umstände verlängern Ausführungsfristen angemessen.
        </p>
      </LegalSection>

      <LegalSection heading="§ 5 Gewährleistung / Mängel">
        <p>
          (1) Es gelten die gesetzlichen Mängelrechte. Der Auftragnehmer leistet
          bei berechtigten Mängelrügen Nacherfüllung.
        </p>
        <p>
          (2) Die Verjährungsfrist für Mängelansprüche beträgt bei Arbeiten an
          einem Bauwerk fünf Jahre, im Übrigen zwei Jahre ab Abnahme (§ 634a
          BGB), soweit nicht zwingende gesetzliche Vorschriften eine längere
          Frist vorsehen.
        </p>
      </LegalSection>

      <LegalSection heading="§ 6 Haftung">
        <p>
          (1) Der Auftragnehmer haftet unbeschränkt bei Vorsatz und grober
          Fahrlässigkeit sowie für Schäden aus der Verletzung des Lebens, des
          Körpers oder der Gesundheit.
        </p>
        <p>
          (2) Bei einfacher Fahrlässigkeit haftet der Auftragnehmer nur bei
          Verletzung einer wesentlichen Vertragspflicht (Kardinalpflicht) und der
          Höhe nach begrenzt auf den vertragstypischen, vorhersehbaren Schaden.
          Eine weitergehende Haftung ist ausgeschlossen. Zwingende gesetzliche
          Haftungsregelungen (z. B. nach dem Produkthaftungsgesetz) bleiben
          unberührt.
        </p>
      </LegalSection>

      <LegalSection heading="§ 7 Widerrufsrecht für Verbraucher">
        <p>
          (1) Verbrauchern steht bei Verträgen, die im Fernabsatz oder außerhalb
          von Geschäftsräumen geschlossen werden, ein gesetzliches
          Widerrufsrecht von 14 Tagen zu. Die Frist beginnt mit dem
          Vertragsschluss.
        </p>
        <p>
          (2) Zur Ausübung des Widerrufs genügt eine eindeutige Erklärung (z. B.
          per Brief oder E-Mail) an: {SITE.legalName}, {SITE.street},{" "}
          {SITE.zip} {SITE.city}, {SITE.email}. Zur Wahrung der Frist reicht die
          rechtzeitige Absendung des Widerrufs.
        </p>
        <p>
          (3) Wünscht der Verbraucher, dass die Dienstleistung bereits während
          der Widerrufsfrist beginnt, kann er hierzu ausdrücklich zustimmen. Das
          Widerrufsrecht erlischt bei einer Dienstleistung, wenn diese
          vollständig erbracht wurde und der Verbraucher vor Beginn ausdrücklich
          zugestimmt und seine Kenntnis vom Erlöschen des Widerrufsrechts bei
          vollständiger Erfüllung bestätigt hat.
        </p>
        <TodoNote>
          Formell korrekte Muster-Widerrufsbelehrung und
          Muster-Widerrufsformular gemäß EGBGB ergänzen (z. B. per
          Widerrufs-Generator).
        </TodoNote>
      </LegalSection>

      <LegalSection heading="§ 8 Schlussbestimmungen">
        <p>
          (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss
          des UN-Kaufrechts. Gegenüber Verbrauchern gilt diese Rechtswahl nur,
          soweit dadurch zwingende Verbraucherschutzvorschriften des
          Aufenthaltsstaates nicht eingeschränkt werden.
        </p>
        <p>
          (2) Ist der Auftraggeber Kaufmann, juristische Person des öffentlichen
          Rechts oder öffentlich-rechtliches Sondervermögen, ist Gerichtsstand
          der Sitz des Auftragnehmers.
        </p>
        <p>
          (3) Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder
          werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
