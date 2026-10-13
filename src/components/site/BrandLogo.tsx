import { cn } from "@/lib/utils";
import { brand } from "@/lib/brand";

/** Logo em texto da loja (troque por uma imagem quando houver o arquivo do logo). */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display font-black leading-none whitespace-nowrap text-foreground",
        className,
      )}
      aria-label={brand.name}
    >
      <span
        className="grid h-[1.1em] w-[1.1em] place-items-center rounded-[0.25em] bg-primary text-[0.65em]"
        aria-hidden
      >
        📖
      </span>
      {brand.name}
    </span>
  );
}
