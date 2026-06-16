import type { CatalogItem } from "./types";

/**
 * Abstraction over the data source (Dependency Inversion).
 * The UI depends on this interface, not on a concrete implementation,
 * so a mock can be swapped for an API/DB client without touching the UI.
 */
export interface CatalogRepository {
  getAll(): Promise<CatalogItem[]>;
}
