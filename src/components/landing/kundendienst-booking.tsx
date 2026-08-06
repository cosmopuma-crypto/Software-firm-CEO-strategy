"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  Lightbulb,
  Phone,
  Wrench,
} from "lucide-react";
import { BookingEmbed } from "./booking-embed";
import { OptionCards } from "@/components/ui/option-cards";
import type { Option } from "@/domain/forms";

/* ----------------------------- Anliegen ----------------------------- */

type Anliegen = "wartung" | "beratung" | "stoerung";

interface AnliegenCard {
  readonly value: Anliegen;
  readonly label: string;
  readonly desc: string;
  readonly Icon: typeof Wrench;
}

const ANLIEGEN: readonly AnliegenCard[] = [
  {
    value: "wartung",
    label: "Wartung / Inspektion",
    desc: "Regelmäßige Wartung Ihrer Wärmepumpe, Heizung oder Sanitäranlage.",
    Icon: Wrench,
  },
  {
    value: "beratung",
    label: "Beratungstermin",
    desc: "Unverbindliches Gespräch – z. B. zu neuer Wärmepumpe, Bad oder Heizung.",
    Icon: Lightbulb,
  },
  {
    value: "stoerung",
    label: "Störung / Reparatur",
    desc: "Etwas funktioniert nicht – akuter Kundendienst nach Aufwand.",
    Icon: AlertTriangle,
  },
];

/** Anlagen-Auswahl für Wartung & Störung (deckt auch die Wärmepumpe ab). */
const ANLAGEN: readonly Option<string>[] = [
  { value: "waermepumpe", label: "Wärmepumpe" },
  { value: "heizung", label: "Heizung (Gas / Öl)" },
  { value: "warmwasser", label: "Warmwasser / Boiler" },
  { value: "sanitaer", label: "Sanitär / Bad" },
  { value: "lueftung", label: "Lüftung / Klima" },
  { value: "sonstiges", label: "Sonstiges" },
];

/** Themen-Auswahl für den Beratungstermin. */
const THEMEN: readonly Option<string>[] = [
  { value: "waermepumpe", label: "Neue Wärmepumpe" },
  { value: "bad", label: "Bad / Sanierung" },
  { value: "heizung", label: "Heizung modernisieren" },
  { value: "klima", label: "Klimaanlage" },
  { value: "sonstiges", label: "Sonstiges" },
];

interface KundendienstBookingProps {
  readonly bookingUrl: string;
  readonly phone: string;
  readonly phoneHref: string;
}

/**
 * Anliegen-gesteuerte Kundendienst-Buchung: Zuerst wählt der Kunde sein
 * Anliegen (Wartung / Beratung / Störung). Erst danach erscheinen der
 * passende Kosten-/Infoblock, die jeweilige Anlagen- bzw. Themenauswahl und
 * – je nach Anliegen – der Google-Terminplaner (Wartung/Beratung) oder der
 * direkte Rückruf-Hinweis (Störung, vgl. § 5a Abs. 4 AGB).
 */
export function KundendienstBooking({
  bookingUrl,
  phone,
  phoneHref,
}: KundendienstBookingProps) {
  const [anliegen, setAnliegen] = useState<Anliegen | null>(null);
  const [detail, setDetail] = useState<string>("");

  function choose(next: Anliegen) {
    setAnliegen(next);
    setDetail("");
  }

  // Schritt 1: Anliegen wählen.
  if (!anliegen) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm font-medium text-foreground">
          Worum geht es? Bitte wählen Sie Ihr Anliegen – danach zeigen wir Ihnen
          die passenden Angaben und Termine.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {ANLIEGEN.map(({ value, label, desc, Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => choose(value)}
              className="flex flex-col items-start gap-2 rounded-xl border border-input bg-background p-4 text-left transition-colors hover:border-brand/60 hover:bg-accent/40"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <Icon className="size-5" />
              </span>
              <span className="font-semibold text-foreground">{label}</span>
              <span className="text-sm text-muted-foreground">{desc}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const current = ANLIEGEN.find((a) => a.value === anliegen)!;

  return (
    <div className="flex flex-col gap-5">
      {/* Kopfzeile mit gewähltem Anliegen + Wechsel-Möglichkeit. */}
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-sm font-medium text-brand">
          <current.Icon className="size-4" />
          {current.label}
        </span>
        <button
          type="button"
          onClick={() => setAnliegen(null)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-brand"
        >
          <ArrowLeft className="size-4" /> Anliegen ändern
        </button>
      </div>

      {anliegen === "wartung" && (
        <WartungFlow
          bookingUrl={bookingUrl}
          phone={phone}
          phoneHref={phoneHref}
          detail={detail}
          onDetail={setDetail}
        />
      )}

      {anliegen === "beratung" && (
        <BeratungFlow
          bookingUrl={bookingUrl}
          phone={phone}
          phoneHref={phoneHref}
          detail={detail}
          onDetail={setDetail}
        />
      )}

      {anliegen === "stoerung" && (
        <StoerungFlow phone={phone} phoneHref={phoneHref} detail={detail} onDetail={setDetail} />
      )}
    </div>
  );
}

/* ----------------------------- Bausteine ----------------------------- */

interface FlowProps {
  readonly bookingUrl: string;
  readonly phone: string;
  readonly phoneHref: string;
  readonly detail: string;
  readonly onDetail: (value: string) => void;
}

function DetailPick({
  label,
  options,
  value,
  onChange,
}: {
  readonly label: string;
  readonly options: readonly Option<string>[];
  readonly value: string;
  readonly onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <OptionCards options={options} value={value || undefined} onChange={onChange} columns={3} />
    </div>
  );
}

function DescriptionHint({ children }: { readonly children: ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-input bg-muted/30 p-3 text-sm text-muted-foreground">
      {children}
    </p>
  );
}

const AgbLink = (
  <Link
    href="/agb#kundendienst-wartung"
    className="font-medium text-brand underline underline-offset-2"
  >
    § 5a unserer AGB
  </Link>
);

function AgbAccept({ costRelevant = true }: { readonly costRelevant?: boolean }) {
  return (
    <>
      Ich habe die{" "}
      <Link
        href="/agb"
        target="_blank"
        className="font-medium text-brand underline underline-offset-2"
      >
        AGB
      </Link>{" "}
      gelesen und akzeptiere sie
      {costRelevant ? " – insbesondere die Regelungen zu Kosten und Terminabsagen (§ 5a)." : "."}
    </>
  );
}

/** Wartung / Inspektion: kostenpflichtig nach Aufwand, Buchung über Terminplaner. */
function WartungFlow({ bookingUrl, phone, phoneHref, detail, onDetail }: FlowProps) {
  const label = ANLAGEN.find((a) => a.value === detail)?.label;

  return (
    <div className="flex flex-col gap-5">
      <DetailPick
        label="Um welche Anlage geht es?"
        options={ANLAGEN}
        value={detail}
        onChange={onDetail}
      />

      <DescriptionHint>
        Damit klar ist, worum es geht, tragen Sie im Terminplaner unter
        „Beschreibung“ bitte kurz ein:{" "}
        <span className="font-medium text-foreground">
          {label ? `Wartung ${label}` : "welche Anlage"}, Hersteller/Modell,
          Baujahr und – falls bekannt – die letzte Wartung.
        </span>
      </DescriptionHint>

      {bookingUrl ? (
        <BookingEmbed
          url={bookingUrl}
          title="Wartungstermin buchen"
          notice={
            <>
              <span className="font-semibold">
                Wartungs- und Kundendiensteinsätze sind kostenpflichtig.
              </span>{" "}
              Berechnet werden Anfahrt und Arbeitszeit nach Aufwand (zzgl.
              Material und gesetzl. USt.). Die genauen Konditionen nennen wir
              Ihnen bei der Terminbestätigung. Bitte sagen Sie einen Termin, den
              Sie nicht wahrnehmen können, mindestens 12 Stunden vorher ab. Bei
              nicht rechtzeitiger Absage berechnen wir zur Kompensation pauschal
              eine Stunde Kundendienst – Details regelt {AgbLink}.
            </>
          }
          terms={<AgbAccept />}
        />
      ) : (
        <NoBookingFallback phone={phone} phoneHref={phoneHref} />
      )}
    </div>
  );
}

/** Beratungstermin: unverbindlich und kostenfrei, Buchung über Terminplaner. */
function BeratungFlow({ bookingUrl, phone, phoneHref, detail, onDetail }: FlowProps) {
  const label = THEMEN.find((t) => t.value === detail)?.label;

  return (
    <div className="flex flex-col gap-5">
      <DetailPick label="Worüber möchten Sie sprechen?" options={THEMEN} value={detail} onChange={onDetail} />

      <DescriptionHint>
        Notieren Sie im Terminplaner unter „Beschreibung“ bitte kurz Ihr Thema
        {label ? (
          <>
            {" "}
            (<span className="font-medium text-foreground">{label}</span>)
          </>
        ) : null}{" "}
        und ob Sie den Termin vor Ort oder telefonisch wünschen.
      </DescriptionHint>

      {bookingUrl ? (
        <BookingEmbed
          url={bookingUrl}
          title="Beratungstermin buchen"
          notice={
            <>
              <span className="font-semibold">
                Das Erstberatungsgespräch ist unverbindlich und kostenfrei.
              </span>{" "}
              Es dient dazu, Ihren Bedarf zu klären und ein passendes Angebot
              vorzubereiten. Bitte sagen Sie einen Termin, den Sie nicht
              wahrnehmen können, rechtzeitig ab, damit wir ihn anderweitig
              vergeben können.
            </>
          }
          terms={<AgbAccept costRelevant={false} />}
        />
      ) : (
        <NoBookingFallback phone={phone} phoneHref={phoneHref} />
      )}
    </div>
  );
}

/**
 * Störung / Reparatur: kein fester Slot über den Planer (§ 5a Abs. 4 AGB) –
 * wir stimmen den Einsatz individuell und schnellstmöglich telefonisch ab.
 */
function StoerungFlow({
  phone,
  phoneHref,
  detail,
  onDetail,
}: {
  readonly phone: string;
  readonly phoneHref: string;
  readonly detail: string;
  readonly onDetail: (value: string) => void;
}) {
  const label = ANLAGEN.find((a) => a.value === detail)?.label;

  return (
    <div className="flex flex-col gap-5">
      <DetailPick
        label="Welche Anlage ist betroffen?"
        options={ANLAGEN}
        value={detail}
        onChange={onDetail}
      />

      <div className="flex items-start gap-2.5 rounded-xl border border-gold/30 bg-gold-soft/30 p-4 text-sm text-foreground">
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-gold-foreground/80" />
        <div>
          <span className="font-semibold">
            Bei akuten Störungen buchen wir keinen festen Termin über den Planer.
          </span>{" "}
          Wir stimmen den Einsatz individuell und schnellstmöglich mit Ihnen ab.
          Störungs- und Reparatureinsätze sind kostenpflichtig nach Aufwand
          (Anfahrt + Arbeitszeit, zzgl. Material und gesetzl. USt.) – Details
          regelt {AgbLink}.
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-sm text-muted-foreground">
          Am schnellsten geht es telefonisch. Halten Sie{" "}
          <span className="font-medium text-foreground">
            {label ? `zur ${label}` : "zur betroffenen Anlage"}
          </span>{" "}
          bitte bereit: Hersteller/Modell, ggf. den Fehlercode und seit wann das
          Problem besteht.
        </p>
        <a
          href={phoneHref}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 font-semibold text-brand-foreground transition-colors hover:bg-brand/90"
        >
          <Phone className="size-4" /> {phone} anrufen
        </a>
      </div>
    </div>
  );
}

function NoBookingFallback({
  phone,
  phoneHref,
}: {
  readonly phone: string;
  readonly phoneHref: string;
}) {
  return (
    <p className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
      Die Online-Terminbuchung ist gerade nicht verfügbar. Bitte rufen Sie uns
      an:{" "}
      <a href={phoneHref} className="font-medium text-brand underline underline-offset-2">
        {phone}
      </a>
      .
    </p>
  );
}
