import { SITE } from "@/lib/site";

/**
 * JSON-LD strukturierte Daten (LocalBusiness / HVACBusiness) für lokale SEO.
 * Hilft Google, Firmenname, Standort, Leistungen und Kontakt korrekt zu verstehen.
 */
export function StructuredData() {
  const sameAs = [SITE.google, SITE.myhammer].filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@type": ["HVACBusiness", "Plumber"],
    name: SITE.legalName,
    description:
      "Zertifizierter Fachbetrieb Wärmepumpe (VDI 4645) und Meisterbetrieb für Sanitär, Heizung und Bad in Neumünster.",
    url: SITE.url,
    telephone: "+4915739596636",
    email: SITE.email,
    image: `${SITE.url}/brand/photos/foto-16.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.street,
      postalCode: SITE.zip,
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    areaServed: { "@type": "City", name: SITE.city },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    knowsAbout: [
      "Wärmepumpe",
      "Heizung",
      "Sanitär",
      "Badsanierung",
      "Fußbodenheizung",
      "Kundendienst",
      "VDI 4645",
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
