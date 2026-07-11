import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * ST-Haustechnik Logo (echtes Logo, navy, freigestellt).
 * `onDark` legt es auf einen weißen Chip für dunkle Hintergründe (Footer/CTA).
 */
export function Logo({
  onDark = false,
  priority = false,
  className,
  href = "/#top",
}: {
  onDark?: boolean;
  priority?: boolean;
  className?: string;
  href?: string;
}) {
  const img = (
    <Image
      src="/brand/logo.png"
      alt="ST-Haustechnik – Sanitär, Heizung, Wärmepumpen"
      width={600}
      height={188}
      priority={priority}
      className={cn("w-auto", className ?? "h-12")}
    />
  );
  return (
    <Link href={href} aria-label="ST-Haustechnik Startseite" className="inline-flex">
      {onDark ? (
        <span className="rounded-xl bg-white px-4 py-3 shadow-sm">{img}</span>
      ) : (
        img
      )}
    </Link>
  );
}
