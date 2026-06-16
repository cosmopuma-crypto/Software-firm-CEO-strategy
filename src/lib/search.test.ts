import { filterItems, collectTags } from "./search";
import type { CatalogItem } from "@/domain/types";

const items: CatalogItem[] = [
  { id: "1", name: "core-api", kind: "repository", description: "REST API", tags: ["typescript", "backend"], popularity: 10, updatedAt: "2026-01-01" },
  { id: "2", name: "PDF Generator", kind: "skill", description: "Make PDFs", tags: ["documents"], popularity: 20, updatedAt: "2026-01-02" },
  { id: "3", name: "web-ui", kind: "repository", description: "Frontend", tags: ["frontend", "typescript"], popularity: 5, updatedAt: "2026-01-03" },
];

describe("filterItems", () => {
  it("returns all items for an empty filter", () => {
    expect(filterItems(items, { query: "", kinds: [], tags: [] })).toHaveLength(3);
  });

  it("matches query against name, description and tags (case-insensitive)", () => {
    expect(filterItems(items, { query: "PDF", kinds: [], tags: [] })).toHaveLength(1);
    expect(filterItems(items, { query: "frontend", kinds: [], tags: [] })[0].id).toBe("3");
    expect(filterItems(items, { query: "TYPESCRIPT", kinds: [], tags: [] })).toHaveLength(2);
  });

  it("filters by kind", () => {
    const res = filterItems(items, { query: "", kinds: ["skill"], tags: [] });
    expect(res).toHaveLength(1);
    expect(res[0].kind).toBe("skill");
  });

  it("filters by tag (OR semantics) and combines with query", () => {
    expect(filterItems(items, { query: "", kinds: [], tags: ["typescript"] })).toHaveLength(2);
    expect(
      filterItems(items, { query: "core", kinds: ["repository"], tags: ["typescript"] })
    ).toHaveLength(1);
  });

  it("returns no items when nothing matches", () => {
    expect(filterItems(items, { query: "nonexistent", kinds: [], tags: [] })).toHaveLength(0);
  });
});

describe("collectTags", () => {
  it("returns a distinct sorted tag list", () => {
    expect(collectTags(items)).toEqual(["backend", "documents", "frontend", "typescript"]);
  });
});
