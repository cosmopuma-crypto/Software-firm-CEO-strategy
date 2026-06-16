/** Domain models for the searchable catalog. Framework-agnostic. */

export type ItemKind = "repository" | "skill";

export interface CatalogItem {
  readonly id: string;
  readonly name: string;
  readonly kind: ItemKind;
  readonly description: string;
  readonly tags: readonly string[];
  /** Repos: stars. Skills: usage count. Used for sorting/relevance. */
  readonly popularity: number;
  readonly updatedAt: string; // ISO date
}

/** Active filter state for the catalog view. */
export interface CatalogFilter {
  readonly query: string;
  readonly kinds: readonly ItemKind[]; // empty = all
  readonly tags: readonly string[]; // empty = all
}

export const EMPTY_FILTER: CatalogFilter = { query: "", kinds: [], tags: [] };
