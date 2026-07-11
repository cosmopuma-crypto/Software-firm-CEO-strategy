import { catalogRepository } from "@/data/catalog";
import { CatalogView } from "@/components/catalog/catalog-view";

// Server Component: loads data via the repository abstraction,
// then hands plain data to the client view.
export default async function KatalogPage() {
  const items = await catalogRepository.getAll();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          KI-Mitgründer · Katalog
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Repositories &amp; Skills
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Durchsuche alle Repositories und Skills des Unternehmens. Filtere nach
          Typ und Tags, um schnell das Richtige zu finden.
        </p>
      </header>
      <CatalogView items={items} />
    </main>
  );
}
