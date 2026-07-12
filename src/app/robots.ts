import type { MetadataRoute } from "next";
import { IS_DEMO, SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Demo-Instanz komplett von Suchmaschinen ausschließen.
  if (IS_DEMO) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/katalog"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
