"use client";

import { useMemo, useState } from "react";
import type { CatalogItem, ItemKind } from "@/domain/types";
import { EMPTY_FILTER } from "@/domain/types";
import { collectTags, filterItems } from "@/lib/search";
import { SearchBar } from "./search-bar";
import { FilterBar } from "./filter-bar";
import { ItemCard } from "./item-card";
import { EmptyState } from "./empty-state";

interface CatalogViewProps {
  items: CatalogItem[];
}

const toggle = <T,>(list: readonly T[], value: T): T[] =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

export function CatalogView({ items }: CatalogViewProps) {
  const [query, setQuery] = useState(EMPTY_FILTER.query);
  const [kinds, setKinds] = useState<ItemKind[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const allTags = useMemo(() => collectTags(items), [items]);
  const allKinds = useMemo(
    () => Array.from(new Set(items.map((i) => i.kind))) as ItemKind[],
    [items]
  );

  const results = useMemo(
    () => filterItems(items, { query, kinds, tags }),
    [items, query, kinds, tags]
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <SearchBar value={query} onChange={setQuery} />
        <FilterBar
          kinds={allKinds}
          activeKinds={kinds}
          onToggleKind={(k) => setKinds((p) => toggle(p, k))}
          tags={allTags}
          activeTags={tags}
          onToggleTag={(t) => setTags((p) => toggle(p, t))}
        />
      </div>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        {results.length} von {items.length} Einträgen
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.length === 0 ? (
          <EmptyState />
        ) : (
          results.map((item) => <ItemCard key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
}
