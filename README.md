# KI-Mitgründer · Repositories & Skills

Durchsuchbarer Katalog für Repositories und Skills. Erster Entwurf des Frontends
mit Next.js (App Router), TypeScript (strict) und Tailwind CSS v4. UI-Komponenten
im shadcn/ui-Stil.

## Schnellstart (lokal)

```bash
cd ki-app
npm install        # einmalig
npm run dev        # Dev-Server auf http://localhost:3000
```

Weitere Befehle:

```bash
npm run build      # Produktions-Build
npm run start      # Produktions-Server (nach build)
npm run lint       # ESLint (0 Warnungen erwartet)
npm run typecheck  # tsc --noEmit
npm test           # Jest Unit-Tests
```

## Architektur (SOLID / Clean Architecture)

Die Schichten sind klar getrennt; die UI hängt von Abstraktionen ab, nicht von
konkreten Datenquellen (Dependency Inversion).

```
src/
├── domain/                      # Reine Geschäftslogik, framework-agnostisch
│   ├── types.ts                 #   Modelle: CatalogItem, ItemKind, CatalogFilter
│   └── catalog-repository.ts    #   Interface (Abstraktion der Datenquelle)
├── data/                        # Konkrete Implementierungen
│   ├── mock-catalog-repository.ts  #   In-Memory-Daten (austauschbar)
│   └── catalog.ts               #   Composition Root (hier Quelle tauschen)
├── lib/
│   ├── search.ts                # Reine, getestete Filterlogik (keine Seiteneffekte)
│   ├── search.test.ts           # Jest Unit-Tests dazu
│   └── utils.ts                 # cn() Helper (Tailwind-Merge)
├── components/
│   ├── ui/                      # Wiederverwendbare Primitives (Button, Card, Input, Badge)
│   └── catalog/                 # Feature-Komponenten (Suche, Filter, Karten, Grid)
└── app/                         # Next.js App Router (layout, page, globals.css)
```

### Designprinzipien

- **Single Responsibility:** Jede Komponente/Modul hat genau eine Aufgabe.
- **Dependency Inversion:** `page.tsx` (Server Component) lädt Daten über das
  `CatalogRepository`-Interface. Für eine echte API/DB genügt eine neue
  Implementierung und eine Zeile in `src/data/catalog.ts` — kein UI-Code ändert sich.
- **Testbarkeit:** Die Suchlogik (`lib/search.ts`) ist eine reine Funktion ohne
  React-Abhängigkeit und vollständig unit-getestet.

## Integrationen

- **Heizreport** (Wärmepumpen-Check, Förderrechner, REST API v2 + Webhook):
  siehe [`docs/heizreport-integration.md`](docs/heizreport-integration.md)
  für die Zuordnung Account-Felder ↔ Env-Vars ↔ Webhook-URL und die
  Go-live-Checkliste.

## Nächste sinnvolle Schritte

1. `ApiCatalogRepository` gegen ein echtes Backend (z. B. Supabase) implementieren.
2. Dark-Mode-Umschalter (Tokens sind in `globals.css` bereits vorbereitet).
3. URL-synchronisierte Filter (Such-/Filterzustand in Query-Params).
4. Server-seitige Suche & Pagination bei großen Datenmengen.
