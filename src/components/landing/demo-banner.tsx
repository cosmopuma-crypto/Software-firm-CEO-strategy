/**
 * Hinweis-Banner der Demo-Instanz („Musterbetrieb"). Stellt klar, dass es
 * sich um eine Produktvorführung handelt — kein echter Betrieb, Anfragen
 * werden nicht an einen Handwerksbetrieb übermittelt.
 */
export function DemoBanner() {
  return (
    <div
      role="note"
      className="sticky top-0 z-[60] bg-amber-400 px-4 py-2 text-center text-sm font-semibold text-amber-950"
    >
      Demo-Ansicht &bdquo;Musterbetrieb&ldquo; — so sieht Ihre Website aus.
      Alle Daten sind Beispieldaten; Anfragen werden nicht an einen echten
      Betrieb gesendet.
    </div>
  );
}
