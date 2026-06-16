import { GitBranch, Sparkles, Star } from "lucide-react";
import type { CatalogItem } from "@/domain/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ItemCardProps {
  item: CatalogItem;
}

export function ItemCard({ item }: ItemCardProps) {
  const Icon = item.kind === "repository" ? GitBranch : Sparkles;
  return (
    <Card className="flex flex-col transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wide">
              {item.kind === "repository" ? "Repository" : "Skill"}
            </span>
          </div>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5" />
            {item.popularity}
          </span>
        </div>
        <CardTitle className="mt-1 text-lg">{item.name}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
