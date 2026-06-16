import type { CatalogRepository } from "@/domain/catalog-repository";
import { MockCatalogRepository } from "./mock-catalog-repository";

/**
 * Single composition point. Swap the concrete repository here
 * (e.g. an ApiCatalogRepository) without changing any consumer.
 */
export const catalogRepository: CatalogRepository = new MockCatalogRepository();
