import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ST-Haustechnik · Sanitär, Heizung & Wärmepumpen in Neumünster",
  description:
    "ST-Haustechnik aus Neumünster: Sanitär, Heizung, Wärmepumpen, Bad und Kundendienst. " +
    "Wärmepumpe konfigurieren, Bad planen oder Kundendienst anfragen – direkt online.",
};

export const viewport = {
  themeColor: "#0A5BA6",
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
