import type { Metadata } from "next";
import { Lexend, Source_Sans_3 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE } from "@/lib/site";
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

const TITLE =
  "ST-Haustechnik · Fachbetrieb für Wärmepumpen, Heizung & Bad in Neumünster";
const DESCRIPTION =
  "ST-Haustechnik GmbH aus Neumünster – zertifizierter Fachbetrieb Wärmepumpe (VDI 4645) " +
  "und Meisterbetrieb für Sanitär, Heizung und Bad. Beratung, Planung, Förderservice und " +
  "Montage aus einer Hand. Wärmepumpe anfragen, Bad planen oder Kundendienst rufen.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: TITLE,
    template: "%s · ST-Haustechnik",
  },
  description: DESCRIPTION,
  applicationName: SITE.name,
  keywords: [
    "Wärmepumpe Neumünster",
    "Fachbetrieb Wärmepumpe",
    "VDI 4645",
    "Heizung Neumünster",
    "Heizungsbauer Neumünster",
    "Badsanierung Neumünster",
    "Sanitär Neumünster",
    "Kundendienst Heizung",
    "SHK Neumünster",
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
    images: [{ url: "/brand/photos/foto-16.jpg", width: 900, height: 1600, alt: SITE.claim }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/brand/photos/foto-16.jpg"],
  },
  robots: { index: true, follow: true },
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
