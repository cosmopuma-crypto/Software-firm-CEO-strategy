"use client";

import type { ItemKind } from "@/domain/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  kinds: ItemKind[];
  activeKinds: ItemKind[];
  onToggleKind: (kind: ItemKind) => void;
  tags: string[];
  activeTags: string[];
  onToggleTag: (tag: string) => void;
}

const KIND_LABEL: Record<ItemKind, string> = {
  repository: "Repositories",
  skill: "Skills",
};

export function FilterBar({
  kinds,
  activeKinds,
  onToggleKind,
  tags,
  activeTags,
  onToggleTag,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {kinds.map((kind) => {
          const active = activeKinds.includes(kind);
          return (
            <Button
              key={kind}
              size="sm"
              variant={active ? "default" : "outline"}
              onClick={() => onToggleKind(kind)}
              aria-pressed={active}
            >
              {KIND_LABEL[kind]}
            </Button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => {
          const active = activeTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => onToggleTag(tag)}
              aria-pressed={active}
              className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            >
              <Badge
                variant={active ? "default" : "outline"}
                className={cn("transition-colors", !active && "hover:bg-accent")}
              >
                {tag}
              </Badge>
            </button>
          );
        })}
      </div>
    </div>
  );
}
