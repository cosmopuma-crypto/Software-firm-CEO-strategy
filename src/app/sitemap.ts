import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1 },
    { path: "/badplaner", priority: 0.8 },
    { path: "/kundendienst", priority: 0.8 },
    { path: "/impressum", priority: 0.3 },
    { path: "/datenschutz", priority: 0.3 },
    { path: "/agb", priority: 0.3 },
  ];
  return routes.map((r) => ({
    url: `${SITE.url}${r.path}`,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
