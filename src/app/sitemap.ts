import type { MetadataRoute } from "next";
import { IS_DEMO, SITE } from "@/lib/site";
import { ORTE } from "@/data/orte";
import { RATGEBER } from "@/data/ratgeber";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/waermepumpe", priority: 0.9 },
    { path: "/waermepumpe-foerderung-2026", priority: 0.9 },
    { path: "/badplaner", priority: 0.8 },
    { path: "/kundendienst", priority: 0.8 },
    { path: "/ratgeber", priority: 0.6 },
    ...RATGEBER.map((a) => ({ path: `/ratgeber/${a.slug}`, priority: 0.6 })),
    // Lokale Wärmepumpen-Seiten gibt es nur beim echten Betrieb.
    ...(IS_DEMO
      ? []
      : ORTE.map((o) => ({ path: `/waermepumpe/${o.slug}`, priority: 0.7 }))),
    { path: "/impressum", priority: 0.3 },
    { path: "/datenschutz", priority: 0.3 },
    { path: "/agb", priority: 0.3 },
  ];
  return routes.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
