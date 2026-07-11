import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/landing/legal-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "AGB · ST-Haustechnik",
  robots: { index: false },
};

export default function AgbPage() {
  return (
    <LegalPage title="Allgemeine Geschäftsbedingungen">
      <LegalSection heading="§ 1 Geltungsbereich und Allgemeines">
        <p>
          (1) Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB“) gelten
          für alle Verträge, Leistungen, Lieferungen und Angebote der{" "}
          {SITE.legalName}, {SITE.street}, {SITE.zip} {SITE.city} (nachfolgend
          „Auftragnehmer“) gegenüber ihren Kunden (nachfolgend „Auftraggeber“).
        </p>
        <p>
          (2) Diese AGB gelten sowohl gegenüber Verbrauchern (§ 13 BGB) als auch
          gegenüber Unternehmern (§ 14 BGB). Abweichende, entgegenstehende oder
          ergänzende Bedingungen des Auftraggebers werden nicht
          Vertragsbestandteil, es sei denn, der Auftragnehmer stimmt ihrer
          Geltung ausdrücklich schriftlich zu.
        </p>
      </LegalSection>

      <LegalSection heading="§ 2 Leistungsumfang („Alles aus einer Hand“)">
        <p>
          (1) Der Auftragnehmer bietet Komplettleistungen im Bereich der
          Haustechnik an, insbesondere die Planung, Auslegung, Lieferung,
          Installation und Inbetriebnahme von Wärmepumpensystemen sowie die
          Übernahme des Förderservices.
        </p>
        <p>
          (2) Die Planung und Auslegung der Wärmepumpensysteme erfolgt fachgerecht
          nach den anerkannten Regeln der Technik, insbesondere unter
          Berücksichtigung der Richtlinie VDI 4645.
        </p>
        <p>
          (3) Soweit die Unterstützung bei der Beantragung von Fördermitteln
          (Förderservice) vereinbart ist, schuldet der Auftragnehmer die
          ordnungsgemäße, den Richtlinien entsprechende Einreichung und
          Aufbereitung der Unterlagen. Eine Garantie für die tatsächliche
          Bewilligung oder Auszahlung durch die Förderstellen (z. B. BAFA, KfW)
          kann nicht übernommen werden, da diese im Ermessen der jeweiligen
          Behörde liegt.
        </p>
      </LegalSection>

      <LegalSection heading="§ 3 Angebot und Vertragsabschluss">
        <p>
          (1) Angebote des Auftragnehmers sind freibleibend und unverbindlich,
          sofern sie nicht ausdrücklich als verbindlich gekennzeichnet sind.
        </p>
        <p>
          (2) Der Vertrag kommt durch die schriftliche Auftragsbestätigung des
          Auftragnehmers oder durch den Beginn der Ausführung der Leistung
          zustande.
        </p>
      </LegalSection>

      <LegalSection heading="§ 4 Preise, Zahlungsbedingungen und Anzahlung">
        <p>
          (1) Alle Preise verstehen sich in Euro (€) zuzüglich der jeweils am Tag
          der Leistungsausführung gültigen gesetzlichen Umsatzsteuer.
        </p>
        <p>
          (2) Besondere Zahlungsvereinbarung für Wärmepumpensysteme und
          Großkomponenten: Aufgrund der hohen Material- und Bereitstellungskosten
          ist der Auftragnehmer berechtigt, direkt nach Vertragsschluss und vor
          Beginn der Materialbestellung bzw. Ausführung eine Anzahlung in Höhe von
          60 % der Brutto-Auftragssumme in Rechnung zu stellen. Der Auftragnehmer
          ist nicht verpflichtet, vor Eingang dieser Anzahlung Materialbestellungen
          oder Ausführungsleistungen vorzunehmen.
        </p>
        <p>
          (3) Der Auftragnehmer ist darüber hinaus berechtigt, angemessene
          Abschlagszahlungen für in sich abgeschlossene Teile des Werkes oder für
          weitere bereitgestellte Materialien zu verlangen (§ 632a BGB).
        </p>
        <p>
          (4) Schluss- und Abschlagsrechnungen sind sofort nach Rechnungsstellung
          ohne Abzug zur Zahlung fällig. Nach Ablauf von 14 Tagen nach Fälligkeit
          und Zugang der Rechnung kommt der Auftraggeber in Verzug.
        </p>
      </LegalSection>

      <LegalSection heading="§ 5 Ausführung, Termine und Mitwirkungspflichten des Auftraggebers">
        <p>
          (1) Vereinbarte Ausführungstermine sind nur dann verbindlich, wenn sie
          ausdrücklich schriftlich als „verbindlicher Fertigstellungstermin“
          bestätigt wurden.
        </p>
        <p>
          (2) Der Auftraggeber hat dafür zu sorgen, dass die Arbeiten zum
          vereinbarten Zeitpunkt ungehindert begonnen und durchgeführt werden
          können. Dazu gehört insbesondere der freie, barrierefreie Zugang zur
          Baustelle (Aufstellorte der Innen- und Außeneinheiten der Wärmepumpe),
          die Bereitstellung erforderlicher Anschlüsse sowie das Vorhandensein von
          Baustrom und Wasser auf Kosten des Auftraggebers.
        </p>
        <p>
          (3) Verzögerungen, die der Auftraggeber zu vertreten hat (z. B. fehlende
          Vorleistungen anderer Gewerke, verspätete Beibringung von Gebäudedaten,
          mangelnde Zugänglichkeit), verlängern die Ausführungsfristen
          entsprechend. Dadurch entstehende Wartezeiten oder zusätzliche
          Anfahrten werden dem Auftraggeber gesondert in Rechnung gestellt.
        </p>
      </LegalSection>

      <LegalSection heading="§ 6 Abnahme und Inbetriebnahme">
        <p>
          (1) Nach Fertigstellung der Montage und erfolgreicher Inbetriebnahme der
          Anlage ist der Auftraggeber zur Abnahme verpflichtet. Die Abnahme darf
          nicht wegen unwesentlicher Mängel verweigert werden.
        </p>
        <p>
          (2) Der Abnahme steht es gleich, wenn der Auftraggeber das Werk nicht
          innerhalb einer ihm vom Auftragnehmer gesetzten angemessenen Frist
          (mindestens 12 Werktage) abnimmt, obwohl er dazu verpflichtet ist.
        </p>
        <p>
          (3) Nimmt der Auftraggeber die Anlage vorzeitig in Betrieb (z. B. zur
          Beheizung des Gebäudes während der Bauphase oder zur regulären Nutzung),
          gilt die Anlage nach Ablauf von 6 Werktagen der Nutzung als abgenommen.
        </p>
      </LegalSection>

      <LegalSection heading="§ 7 Gewährleistung (Mängelhaftung)">
        <p>
          (1) Für Mängel des Werkes haftet der Auftragnehmer nach den
          gesetzlichen Vorschriften des Werkvertragsrechts (§§ 633 ff. BGB).
        </p>
        <p>
          (2) Gegenüber Unternehmern beträgt die Gewährleistungsfrist für
          Werkleistungen und verbaute Neuwaren ein Jahr ab Abnahme. Bei Verträgen
          mit Verbrauchern gelten die gesetzlichen Verjährungsfristen (zwei Jahre;
          bei Bauwerken sowie bei Sachen, die entsprechend ihrer üblichen
          Verwendungsweise für ein Bauwerk verwendet worden sind und dessen
          Mangelhaftigkeit verursacht haben, fünf Jahre).
        </p>
        <p>
          (3) Gewährleistungsansprüche sind ausgeschlossen, wenn der Mangel auf
          fehlerhaften Angaben des Auftraggebers (z. B. falsche Angaben zur
          Gebäudeisolierung, Heizlast o. Ä., sofern nicht durch den Auftragnehmer
          geprüft) oder auf nachträglichen, unbefugten Eingriffen Dritter in die
          Anlagensteuerung beruht.
        </p>
      </LegalSection>

      <LegalSection heading="§ 8 Eigentumsvorbehalt und Pfandrecht">
        <p>
          (1) Der Auftragnehmer behält sich das Eigentum an allen gelieferten und
          eingebauten Materialien, Bauteilen und Geräten (insbesondere
          Wärmepumpen, Speicher, Regelungen) bis zur vollständigen Bezahlung aller
          Forderungen aus dem jeweiligen Vertrag vor.
        </p>
        <p>
          (2) Dem Auftragnehmer steht wegen seiner Forderung aus dem Vertrag ein
          vertragliches Pfandrecht an den in seinen Besitz gelangten Sachen des
          Auftraggebers zu.
        </p>
      </LegalSection>

      <LegalSection heading="§ 9 Haftungsbeschränkung">
        <p>
          (1) Der Auftragnehmer haftet unbeschränkt für Schäden aus der Verletzung
          des Lebens, des Körpers oder der Gesundheit, die auf einer vorsätzlichen
          oder fahrlässigen Pflichtverletzung beruhen.
        </p>
        <p>
          (2) Für sonstige Schäden haftet der Auftragnehmer nur bei Vorsatz oder
          grober Fahrlässigkeit. Bei leicht fahrlässiger Verletzung einer
          wesentlichen Vertragspflicht (Kardinalpflicht) ist die Haftung auf den
          vertragstypischen, vorhersehbaren Schaden begrenzt. Zwingende
          gesetzliche Haftungsregelungen (z. B. nach dem Produkthaftungsgesetz)
          bleiben unberührt.
        </p>
      </LegalSection>

      <LegalSection heading="§ 10 Widerrufsbelehrung für Verbraucher">
        <p className="font-semibold text-foreground">Widerrufsrecht</p>
        <p>
          Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
          diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage
          ab dem Tag des Vertragsabschlusses.
        </p>
        <p>
          Um Ihr Widerrufsrecht auszuüben, müssen Sie uns ({SITE.legalName},{" "}
          {SITE.street}, {SITE.zip} {SITE.city}, Tel.: {SITE.phone}, E-Mail:{" "}
          {SITE.email}) mittels einer eindeutigen Erklärung (z. B. ein mit der
          Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen
          Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte
          Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
        </p>
        <p>
          Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung
          über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist
          absenden.
        </p>

        <p className="mt-2 font-semibold text-foreground">Folgen des Widerrufs</p>
        <p>
          Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die
          wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit
          Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine
          andere Art der Lieferung als die von uns angebotene, günstigste
          Standardlieferung gewählt haben), unverzüglich und spätestens binnen
          vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über
          Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese
          Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der
          ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen
          wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen
          wegen dieser Rückzahlung Entgelte berechnet.
        </p>
        <p>
          Haben Sie verlangt, dass die Dienstleistungen während der Widerrufsfrist
          beginnen sollen, so haben Sie uns einen angemessenen Betrag zu zahlen,
          der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns von der Ausübung
          des Widerrufsrechts hinsichtlich dieses Vertrags unterrichten, bereits
          erbrachten Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag
          vorgesehenen Dienstleistungen entspricht.
        </p>

        <p className="mt-2 font-semibold text-foreground">
          Muster-Widerrufsformular
        </p>
        <p>
          (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses
          Formular aus und senden Sie es zurück.)
        </p>
        <div className="rounded-md border border-border bg-muted/40 p-4 text-sm">
          <p>
            An
            <br />
            {SITE.legalName}
            <br />
            {SITE.street}
            <br />
            {SITE.zip} {SITE.city}
            <br />
            E-Mail: {SITE.email}
          </p>
          <p className="mt-3">
            Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen
            Vertrag über den Kauf der folgenden Waren (*)/die Erbringung der
            folgenden Dienstleistung (*)
          </p>
          <p className="mt-3">— Bestellt am (*)/erhalten am (*)</p>
          <p>— Name des/der Verbraucher(s)</p>
          <p>— Anschrift des/der Verbraucher(s)</p>
          <p>
            — Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)
          </p>
          <p>— Datum</p>
          <p className="mt-3 text-muted-foreground">
            (*) Unzutreffendes streichen.
          </p>
        </div>
      </LegalSection>

      <LegalSection heading="§ 11 Verbraucherstreitbeilegung (Pflichtangabe nach § 36 VSBG)">
        <p>
          (1) Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit, zu finden unter:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            className="text-brand underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          .
        </p>
        <p>
          (2) Die {SITE.legalName} ist weder bereit noch verpflichtet, an einem
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </LegalSection>

      <LegalSection heading="§ 12 Schlussbestimmungen, Gerichtsstand">
        <p>
          (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss
          des UN-Kaufrechts (CISG). Gegenüber Verbrauchern gilt diese Rechtswahl
          nur, soweit dadurch zwingende Verbraucherschutzvorschriften des
          Aufenthaltsstaates nicht eingeschränkt werden.
        </p>
        <p>
          (2) Ist der Auftraggeber Kaufmann, juristische Person des öffentlichen
          Rechts oder öffentlich-rechtliches Sondervermögen, ist der
          ausschließliche Gerichtsstand für alle Streitigkeiten aus diesem Vertrag
          der Geschäftssitz des Auftragnehmers ({SITE.city}).
        </p>
        <p>
          (3) Sollten einzelne Bestimmungen dieser AGB unwirksam oder
          undurchführbar sein oder werden, bleibt die Wirksamkeit der übrigen
          Bestimmungen davon unberührt.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
