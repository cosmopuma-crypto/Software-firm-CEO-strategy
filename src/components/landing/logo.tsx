import Image from "next/image";
import Link from "next/link";
import { IS_DEMO, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Betriebs-Logo. Echtbetrieb: Bild-Logo (navy, freigestellt).
 * Demo-Instanz: neutrales Text-Logo, damit kein echtes Logo unter dem
 * Musterbetrieb-Namen erscheint.
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
  const img = IS_DEMO ? (
    <span
      className={cn(
        "flex w-auto items-center font-heading text-xl font-extrabold tracking-tight text-[#173074]",
        className ?? "h-12",
      )}
    >
      {SITE.name}
    </span>
  ) : (
    <Image
      src="/brand/logo.png"
      alt={`${SITE.name} – Sanitär, Heizung, Wärmepumpen`}
      width={600}
      height={188}
      priority={priority}
      className={cn("w-auto", className ?? "h-12")}
    />
  );
  return (
    <Link href={href} aria-label={`${SITE.name} Startseite`} className="inline-flex">
      {onDark ? (
        <span className="rounded-xl bg-white px-4 py-3 shadow-sm">{img}</span>
      ) : (
        img
      )}
    </Link>
  );
}
