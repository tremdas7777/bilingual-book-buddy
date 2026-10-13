import { media } from "@/components/store/product-media";
import { money } from "@/lib/format";
import type { Bundle } from "@/lib/bundles";
import { cn } from "@/lib/utils";

export function StickyBuyBar({
  visible,
  kit,
  onBuy,
}: {
  visible: boolean;
  kit: Bundle;
  onBuy: () => void;
}) {
  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t bg-card/95 backdrop-blur transition-transform duration-300",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="mx-auto flex max-w-[1180px] items-center gap-3 px-4 py-3 sm:px-6">
        <img
          src={media.capa}
          alt=""
          className="hidden size-12 rounded-lg border bg-white object-contain sm:block"
        />
        <div className="min-w-0 flex-1">
          <p className="hidden truncate text-sm font-bold sm:block">Livro Interativo Bilíngue</p>
          <p className="text-xs text-muted-foreground line-through">
            {kit.compareAtPrice ? money(kit.compareAtPrice) : ""}
          </p>
          <p className="font-display text-xl font-black leading-none">{money(kit.price)}</p>
        </div>
        <button
          type="button"
          tabIndex={visible ? 0 : -1}
          onClick={onBuy}
          className="cta-btn min-h-[52px] px-6 text-base uppercase sm:px-10"
        >
          Comprar agora
        </button>
      </div>
    </div>
  );
}
