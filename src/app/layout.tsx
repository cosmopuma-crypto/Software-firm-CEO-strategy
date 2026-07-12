import type { Metadata } from "next";
import { Lexend, Source_Sans_3 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { IS_DEMO, SITE } from "@/lib/site";
import { AttributionTracker } from "@/components/tracking/attribution-tracker";
import { DemoBanner } from "@/components/landing/demo-banner";
import "./globals.css";

// Schrift-Pairing „Corporate Trust": Lexend (Headlines) + Source Sans 3 (Fließtext)
// – auf Lesbarkeit und Vertrauen ausgelegt.
const heading = Lexend({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});
const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const TITLE = `${SITE.name} · Fachbetrieb für Wärmepumpen, Heizung & Bad in ${SITE.city}`;
const DESCRIPTION =
  `${SITE.legalName} aus ${SITE.city} – zertifizierter Fachbetrieb Wärmepumpe (VDI 4645) ` +
  "und Meisterbetrieb für Sanitär, Heizung und Bad. Beratung, Planung, Förderservice und " +
  "Montage aus einer Hand. Wärmepumpe anfragen, Bad planen oder Kundendienst rufen.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: TITLE,
    template: `%s · ${SITE.name}`,
  },
  description: DESCRIPTION,
  applicationName: SITE.name,
  keywords: [
    `Wärmepumpe ${SITE.city}`,
    "Fachbetrieb Wärmepumpe",
    "VDI 4645",
    `Heizung ${SITE.city}`,
    `Heizungsbauer ${SITE.city}`,
    `Badsanierung ${SITE.city}`,
    `Sanitär ${SITE.city}`,
    "Kundendienst Heizung",
    `SHK ${SITE.city}`,
  ],
  authors: [{ name: SITE.legalName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE.url,
    siteName: SITE.name,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/brand/og-image.jpg", width: 1200, height: 630, alt: SITE.claim }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/brand/og-image.jpg"],
  },
  // Demo-Instanz darf nicht in Suchmaschinen auftauchen.
  robots: IS_DEMO ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport = {
  themeColor: "#173074",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${heading.variable} ${body.variable} antialiased`}>
        {IS_DEMO && <DemoBanner />}
        {children}
        {/* Cookie-lose Besucherstatistik (Vercel Web Analytics) + Quellen-Erfassung */}
        <Analytics />
        <SpeedInsights />
        <AttributionTracker />
      </body>
    </html>
  );
}
