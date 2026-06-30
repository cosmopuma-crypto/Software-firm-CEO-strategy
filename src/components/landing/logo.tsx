import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * ST-Haustechnik Logo (echtes Logo, navy auf hell).
 * `onDark` legt es auf einen weißen Chip für dunkle Hintergründe (Footer/CTA).
 */
export function Logo({
  onDark = false,
  className,
  href = "#top",
}: {
  onDark?: boolean;
  className?: string;
  href?: string;
}) {
  const img = (
    <Image
      src="/brand/logo.png"
      alt="ST-Haustechnik – Sanitär, Heizung, Wärmepumpen"
      width={600}
      height={188}
      priority
      className={cn("h-9 w-auto", className)}
    />
  );
  return (
    <Link href={href} aria-label="ST-Haustechnik Startseite" className="inline-flex">
      {onDark ? (
        <span className="rounded-lg bg-white px-3 py-2 shadow-sm">{img}</span>
      ) : (
        img
      )}
    </Link>
  );
}
