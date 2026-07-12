import type { NextConfig } from "next";

// Basis-Security-Header (Härtung gegen Clickjacking, MIME-Sniffing, Referrer-Leaks).
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Alt-URLs der Vorgänger-Website (ASP.NET, *.aspx) stecken noch in Google &
  // Bookmarks (real beobachtet: /home.aspx). Statt 404 dauerhaft umleiten.
  async redirects() {
    return [
      { source: "/home.aspx", destination: "/", permanent: true },
      { source: "/index.aspx", destination: "/", permanent: true },
      { source: "/default.aspx", destination: "/", permanent: true },
      { source: "/kontakt.aspx", destination: "/#kontakt", permanent: true },
      { source: "/leistungen.aspx", destination: "/#leistungen", permanent: true },
      { source: "/impressum.aspx", destination: "/impressum", permanent: true },
      { source: "/datenschutz.aspx", destination: "/datenschutz", permanent: true },
      // Catch-all: jede sonstige .aspx-URL (auch verschachtelt) auf die Startseite.
      { source: "/:path(.*\\.aspx)", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
