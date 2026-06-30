import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
