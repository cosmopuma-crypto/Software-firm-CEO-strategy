import type { Metadata } from "next";
import { Lexend, Source_Sans_3 } from "next/font/google";
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

export const metadata: Metadata = {
  title: "ST-Haustechnik · Fachbetrieb für Wärmepumpen, Heizung & Bad in Neumünster",
  description:
    "ST-Haustechnik GmbH aus Neumünster – zertifizierter Fachbetrieb Wärmepumpe sowie " +
    "Meisterbetrieb für Sanitär, Heizung und Bad. Wärmepumpe anfragen, Bad planen oder " +
    "Kundendienst rufen – direkt online.",
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
      </body>
    </html>
  );
}
