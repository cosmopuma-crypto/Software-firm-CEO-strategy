import type { CatalogRepository } from "@/domain/catalog-repository";
import type { CatalogItem } from "@/domain/types";

const ITEMS: CatalogItem[] = [
  { id: "r1", name: "core-api", kind: "repository", description: "TypeScript REST API with Clean Architecture and Jest coverage.", tags: ["typescript", "backend", "api"], popularity: 412, updatedAt: "2026-06-10" },
  { id: "r2", name: "web-dashboard", kind: "repository", description: "Next.js admin dashboard with shadcn/ui and role-based access.", tags: ["nextjs", "frontend", "ui"], popularity: 278, updatedAt: "2026-06-12" },
  { id: "r3", name: "billing-service", kind: "repository", description: "Stripe-backed billing microservice with webhook handling.", tags: ["typescript", "backend", "stripe"], popularity: 156, updatedAt: "2026-05-29" },
  { id: "r4", name: "design-tokens", kind: "repository", description: "Shared design system tokens for Tailwind across all products.", tags: ["frontend", "ui", "design"], popularity: 94, updatedAt: "2026-06-01" },
  { id: "s1", name: "PDF Generator", kind: "skill", description: "Generate clean, branded PDF invoices and reports from data.", tags: ["documents", "automation"], popularity: 320, updatedAt: "2026-06-14" },
  { id: "s2", name: "Code Review", kind: "skill", description: "Review diffs for security, performance and correctness issues.", tags: ["engineering", "quality"], popularity: 510, updatedAt: "2026-06-15" },
  { id: "s3", name: "Market Research", kind: "skill", description: "Multi-source web research compiled into a sourced report.", tags: ["research", "strategy"], popularity: 233, updatedAt: "2026-06-09" },
  { id: "s4", name: "Contract Review", kind: "skill", description: "Flag risky clauses in contracts and give a sign/no-sign call.", tags: ["legal", "quality"], popularity: 187, updatedAt: "2026-06-07" },
];

/** In-memory implementation. Replace with an API/DB client later. */
export class MockCatalogRepository implements CatalogRepository {
  async getAll(): Promise<CatalogItem[]> {
    // Simulates async I/O; returns a copy to keep the source immutable.
    return ITEMS.map((i) => ({ ...i }));
  }
}
