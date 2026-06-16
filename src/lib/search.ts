import type { CatalogItem, CatalogFilter } from "@/domain/types";

const matchesQuery = (item: CatalogItem, q: string): boolean => {
  if (!q) return true;
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  const haystack = [item.name, item.description, ...item.tags]
    .join(" ")
    .toLowerCase();
  return haystack.includes(needle);
};

/**
 * Pure, side-effect-free filtering of catalog items.
 * Isolated from React so it is trivially unit-testable (see search.test.ts).
 */
export function filterItems(
  items: readonly CatalogItem[],
  filter: CatalogFilter
): CatalogItem[] {
  return items.filter((item) => {
    if (!matchesQuery(item, filter.query)) return false;
    if (filter.kinds.length > 0 && !filter.kinds.includes(item.kind)) return false;
    if (
      filter.tags.length > 0 &&
      !filter.tags.some((t) => item.tags.includes(t))
    ) {
      return false;
    }
    return true;
  });
}

/** Distinct, sorted tag list across all items — for building filter chips. */
export function collectTags(items: readonly CatalogItem[]): string[] {
  return Array.from(new Set(items.flatMap((i) => i.tags))).sort();
}
