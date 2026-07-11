# Code-Patterns (copy-paste)

Kern-Snippets für die Handwerker-Landingpage. Pfade relativ zu `src/`.

## 1. Design-Tokens (`app/globals.css`)
```css
@import "tailwindcss";
@plugin "tailwindcss-animate";
:root {
  --radius: 0.85rem;
  --brand: #173074;            /* Marken-Hex (EINE Quelle) */
  --brand-foreground: #ffffff;
  --brand-soft: oklch(0.95 0.03 256);
  --brand-deep: #101f49;       /* dunkle Sektionen */
  --gold: #2456c4;             /* Akzent (hier Blau; ggf. Bernstein) */
  --gold-foreground: #ffffff;
  --gold-ink: #1c4a9e;         /* Akzent-Text auf hell (AA) */
  --gold-soft: #9bb8ec;        /* Akzent auf dunkel */
  --sand: oklch(0.975 0.013 78);
  --background: oklch(0.995 0.004 95);
  --foreground: oklch(0.2 0.03 264);
  --primary: var(--brand); --primary-foreground: var(--brand-foreground);
  --accent: var(--brand-soft); --ring: var(--brand);
  /* + card/secondary/muted/border/input wie shadcn */
}
@theme inline {
  --color-brand: var(--brand); --color-brand-deep: var(--brand-deep);
  --color-gold: var(--gold); --color-gold-ink: var(--gold-ink);
  --color-gold-soft: var(--gold-soft); --color-sand: var(--sand);
  --font-sans: var(--font-body); --font-heading: var(--font-heading);
}
html { scroll-behavior: smooth; }
body { font-family: var(--font-sans), system-ui, sans-serif; font-size: 1.0625rem; line-height: 1.65; }
h1,h2,h3,h4 { font-family: var(--font-heading), system-ui, sans-serif; letter-spacing: -0.02em; }
[data-reveal]{opacity:0;transform:translateY(24px);transition:opacity .6s,transform .6s;transition-delay:var(--reveal-delay,0ms);}
[data-reveal="shown"]{opacity:1;transform:none;}
@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.animate-ticker{animation:ticker 45s linear infinite;}
@media (prefers-reduced-motion: reduce){[data-reveal]{opacity:1;transform:none;transition:none}.animate-ticker{animation:none}html{scroll-behavior:auto}}
```

## 2. Schriften (`app/layout.tsx`)
```ts
import { Lexend, Source_Sans_3 } from "next/font/google";
const heading = Lexend({ variable:"--font-heading", subsets:["latin"], weight:["500","600","700","800"], display:"swap" });
const body = Source_Sans_3({ variable:"--font-body", subsets:["latin"], weight:["400","500","600","700"], display:"swap" });
// <body className={`${heading.variable} ${body.variable} antialiased`}>
export const viewport = { themeColor: "#173074" };
```

## 3. zod-Schemas (`lib/forms/schemas.ts`)
```ts
function enumOf<T extends string>(vals: readonly T[]) { return z.enum(vals as unknown as [T, ...T[]]); }
const zipField = z.string().trim().regex(/^\d{5}$/, "Bitte gib eine gültige Postleitzahl an.");
const cityField = z.string().trim().min(2).max(120);
const contactShape = { name:z.string().trim().min(2).max(120), email:z.string().trim().email().max(160),
  phone:z.string().trim().min(6).max(40), message:z.string().trim().max(2000).optional(),
  consent:z.literal(true, { error:"Bitte stimme den Datenschutzhinweisen zu." }) };
export const waermepumpeSchema = z.object({ formType:z.literal("waermepumpe"),
  buildingType:enumOf(buildingTypeValues), livingAreaM2:z.coerce.number().min(20).max(2000),
  addressZip:zipField, addressCity:cityField, ...contactShape });
export const contactFormSchema = z.discriminatedUnion("formType", [waermepumpeSchema, badplanerSchema, kundendienstSchema]);
```

## 4. Pluggbarer Mailer (`lib/forms/mailer.ts`)
```ts
export async function sendContactEmail(input){
  try{
    if(process.env.RESEND_API_KEY){ const {Resend}=await import("resend"); /* send */ return {ok:true,transport:"resend"}; }
    if(process.env.SMTP_HOST){ const nm=await import("nodemailer"); /* send */ return {ok:true,transport:"smtp"}; }
    console.info("[Mailer LOG]", input.subject, "\n", input.text); return {ok:true,transport:"log"};
  }catch(e){ return {ok:false, error:e instanceof Error?e.message:"unknown"}; }
}
```

## 5. API-Route mit Rate-Limit + Honeypot (`app/api/contact/route.ts`)
```ts
export const runtime="nodejs";
const rateHits=new Map<string,{start:number;count:number}>();
function isRateLimited(ip:string){ const now=Date.now(); if(rateHits.size>5000)rateHits.clear();
  const e=rateHits.get(ip); if(!e||now-e.start>600000){rateHits.set(ip,{start:now,count:1});return false;}
  e.count++; return e.count>6; }
export async function POST(request:Request){
  const ip=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"unknown";
  if(isRateLimited(ip)) return NextResponse.json({ok:false},{status:429});
  // parse JSON oder multipart/form-data; Honeypot data.website nicht leer -> still 200;
  // contactFormSchema.safeParse; Dateien prüfen (≤3, ≤5MB, image/pdf); buildEmail; sendContactEmail
}
```

## 6. Reveal-Hook (`lib/hooks/use-reveal.ts`)
```ts
"use client";
export function useReveal<T extends HTMLElement=HTMLDivElement>(){ const ref=useRef<T>(null);
  useEffect(()=>{ const el=ref.current; if(!el)return;
    const o=new IntersectionObserver((es,ob)=>es.forEach(e=>{ if(e.isIntersecting){ (e.target as HTMLElement).dataset.reveal="shown"; ob.unobserve(e.target);} }),{threshold:.15,rootMargin:"0px 0px -10% 0px"});
    o.observe(el); return()=>o.disconnect(); },[]); return ref; }
```

## 7. Sticky-Header korrekt (Top-Strip + Header als Geschwister!)
```tsx
return (<>
  <div className="bg-brand-deep text-white"> {/* Top-Strip, scrollt weg */} </div>
  <header className="sticky top-0 z-50 ..."> {/* bleibt oben */} </header>
</>);
// NIEMALS beide in ein wrapper-<div> packen -> sticky bricht.
// Nav/Footer-Links home-relativ: href="/#leistungen", Logo href="/#top".
```

## 8. LocalBusiness-JSON-LD (`components/landing/structured-data.tsx`)
```tsx
const data={ "@context":"https://schema.org", "@type":["HVACBusiness","Plumber"], name:SITE.legalName,
  url:SITE.url, telephone:"+49...", address:{"@type":"PostalAddress",streetAddress:SITE.street,postalCode:SITE.zip,addressLocality:SITE.city},
  geo:{"@type":"GeoCoordinates",latitude:SITE.geo.lat,longitude:SITE.geo.lng},
  areaServed:SITE.areaServed.map(name=>({"@type":"City",name})),
  aggregateRating:{"@type":"AggregateRating",ratingValue:4.9,reviewCount:37,bestRating:5},
  sameAs:[SITE.google,SITE.myhammer].filter(Boolean) };
return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data)}} />;
// FAQ-Sektion analog mit "@type":"FAQPage". robots.ts + sitemap.ts via MetadataRoute.
```

## 9. Security-Header (`next.config.ts`)
```ts
const securityHeaders=[{key:"X-Content-Type-Options",value:"nosniff"},{key:"X-Frame-Options",value:"SAMEORIGIN"},
  {key:"Referrer-Policy",value:"strict-origin-when-cross-origin"},
  {key:"Permissions-Policy",value:"camera=(), microphone=(), geolocation=(), browsing-topics=()"}];
const nextConfig={ async headers(){ return [{source:"/:path*",headers:securityHeaders}]; } };
```

## 10. Click-to-load Karte (`components/landing/map-embed.tsx`)
```tsx
"use client";
export function MapEmbed({query,title}){ const [loaded,setLoaded]=useState(false);
  if(loaded) return <iframe title={title} src={`https://www.google.com/maps?q=${query}&output=embed`} loading="lazy" className="h-full min-h-72 w-full border-0"/>;
  return <button onClick={()=>setLoaded(true)} className="...">Karte laden <span>Beim Laden Daten an Google.</span></button>; }
```

## 11. Newsticker (`components/landing/news-ticker.tsx` + `data/news.json`)
JSON (von Automatisierung/n8n wöchentlich überschreibbar): `{ items:[{date,tag,title,text,url?}] }`.
Ticker: zwei identische Reihen nebeneinander in `<div className="flex w-max animate-ticker group-hover:[animation-play-state:paused]">{Row}{Row}</div>`.

## 12. Hero-Slideshow (`components/landing/hero-slideshow.tsx`)
Mehrere `<Image fill>` absolut übereinander, aktive `opacity-100` sonst `opacity-0`, `setInterval` 4.5s,
bei `prefers-reduced-motion` kein Wechsel; Indikator-Punkte zum Klicken.
