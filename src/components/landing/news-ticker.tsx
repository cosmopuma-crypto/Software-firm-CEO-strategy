import { Megaphone } from "lucide-react";
import news from "@/data/news.json";

interface NewsItem {
  date: string;
  tag: string;
  title: string;
  text?: string;
  url?: string;
}

export function NewsTicker() {
  const items = (news.items ?? []) as NewsItem[];
  if (items.length === 0) return null;

  const Row = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((it, i) => {
        const inner = (
          <span className="flex items-center gap-2 whitespace-nowrap text-sm">
            <span className="rounded-full bg-gold/15 px-2 py-0.5 text-xs font-semibold text-gold-ink">
              {it.tag}
            </span>
            <span className="font-medium text-foreground/90 group-hover/item:text-brand group-hover/item:underline">
              {it.title}
            </span>
          </span>
        );
        return it.url ? (
          <a
            key={i}
            href={it.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/item cursor-pointer"
          >
            {inner}
          </a>
        ) : (
          <span key={i}>{inner}</span>
        );
      })}
    </div>
  );

  return (
    <div className="border-y bg-sand">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <span className="flex shrink-0 items-center gap-1.5 py-3 text-sm font-bold uppercase tracking-wide text-brand">
          <Megaphone className="size-4" /> Aktuelles
        </span>
        <div className="group relative flex-1 overflow-hidden py-3" aria-label="Aktuelle Meldungen">
          {/* Verlauf an den Rändern */}
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-sand to-transparent" />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-sand to-transparent" />
          <div className="flex w-max animate-ticker group-hover:[animation-play-state:paused]">
            {Row}
            {Row}
          </div>
        </div>
      </div>
    </div>
  );
}
