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
    telephone: "+4943215399933",
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
    priceRange: "€€",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+4943215399933",
      contactType: "customer service",
      availableLanguage: "German",
    },
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Wärmepumpen-Beratung, -Planung und -Installation",
        url: `${SITE.url}/waermepumpe`,
      },
    },
    areaServed: SITE.areaServed.map((name) => ({ "@type": "City", name })),
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.rating.value,
      reviewCount: SITE.rating.count,
      bestRating: 5,
      worstRating: 1,
    },
    review: [
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
        author: { "@type": "Person", name: "Heiko L." },
        reviewBody:
          "Sind sehr zufrieden mit der Beratung und der Durchführung unseres Projektes Wärmepumpe. Absprachen und Termine wurden eingehalten, die Arbeiten sauber und ordentlich durchgeführt.",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
        author: { "@type": "Person", name: "Igor E." },
        reviewBody: "Sehr höfliches und professionelles Team. Gerne wieder!",
      },
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
