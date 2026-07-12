// News-Quelle für den Ticker.
//
// Primär: ein RSS-Feed (serverseitig, stündlich revalidiert). Standard ist ein
// Google-News-Suchfeed zu „Wärmepumpe/Förderung/Heizung" – stabil erreichbar
// und aktuell. Über die Env-Var NEWS_RSS_URL lässt sich ein beliebiger anderer
// (z. B. reiner Fachpresse-)Feed setzen; mehrere URLs kommagetrennt.
//
// Fallback: die kuratierten Meldungen aus src/data/news.json – so zeigt der
// Ticker immer sinnvolle Inhalte, auch wenn ein Feed mal nicht erreichbar ist.

import fallback from "@/data/news.json";

export interface TickerItem {
  readonly tag: string;
  readonly title: string;
  readonly url?: string;
  readonly date?: string;
}

const DEFAULT_FEED =
  "https://news.google.com/rss/search?q=" +
  encodeURIComponent("Wärmepumpe Förderung Heizung when:30d") +
  "&hl=de&gl=DE&ceid=DE:de";

const REVALIDATE_SECONDS = 3600; // stündlich
const MAX_ITEMS = 6;

function feedUrls(): string[] {
  const env = process.env.NEWS_RSS_URL?.trim();
  if (!env) return [DEFAULT_FEED];
  return env
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function decode(input: string): string {
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstMatch(block: string, tag: string): string {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return m ? decode(m[1]) : "";
}

/** Parst RSS-2.0-<item>-Elemente (Titel + Link, optional Datum). */
function parseRss(xml: string): TickerItem[] {
  const items: TickerItem[] = [];
  const blocks = xml.split(/<item[\s>]/i).slice(1);
  for (const raw of blocks) {
    const block = raw.split(/<\/item>/i)[0];
    const title = firstMatch(block, "title");
    const link = firstMatch(block, "link");
    if (!title || !link) continue;
    const date = firstMatch(block, "pubDate");
    items.push({
      tag: "SHK-Welt",
      title: title.length > 130 ? `${title.slice(0, 127)}…` : title,
      url: link,
      date: date || undefined,
    });
    if (items.length >= MAX_ITEMS) break;
  }
  return items;
}

function fallbackItems(): TickerItem[] {
  return (fallback.items ?? []) as TickerItem[];
}

/** Liefert die Ticker-Meldungen (RSS-Feed mit Fallback auf kuratierte Liste). */
export async function getTickerItems(): Promise<TickerItem[]> {
  for (const url of feedUrls()) {
    try {
      const res = await fetch(url, {
        next: { revalidate: REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(6000),
        headers: { "User-Agent": "ST-Haustechnik-News/1.0" },
      });
      if (!res.ok) continue;
      const xml = await res.text();
      const items = parseRss(xml);
      if (items.length > 0) return items;
    } catch {
      // Nächste URL versuchen bzw. auf Fallback zurückfallen.
    }
  }
  return fallbackItems();
}
