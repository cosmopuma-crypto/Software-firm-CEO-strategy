import { SearchX } from "lucide-react";

export function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed py-16 text-center">
      <SearchX className="h-8 w-8 text-muted-foreground" />
      <p className="font-medium">Keine Treffer</p>
      <p className="text-sm text-muted-foreground">
        Passe Suche oder Filter an, um mehr Ergebnisse zu sehen.
      </p>
    </div>
  );
}
