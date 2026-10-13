import { useEffect, useState, type RefObject } from "react";
import {
  BatteryCharging,
  Check,
  Globe2,
  Hand,
  Lock,
  MonitorOff,
  RotateCcw,
  ShieldCheck,
  Truck,
  Volume2,
} from "lucide-react";
import { PixIcon } from "@/components/checkout/parts";
import { galleryFor } from "@/components/store/product-media";
import { discountPercent, money } from "@/lib/format";
import { brand } from "@/lib/brand";
import {
  availableBundles,
  bundleShippingLabel,
  COLORS,
  getBundle,
  type BundleId,
  type ColorId,
} from "@/lib/bundles";
import { cn } from "@/lib/utils";

interface Props {
  color: ColorId;
  bundleId: BundleId;
  onColor: (color: ColorId) => void;
  onBundle: (id: BundleId) => void;
  onBuy: () => void;
  ctaRef: RefObject<HTMLButtonElement | null>;
}

const highlights = [
  { icon: Volume2, text: "Toque na figura e ouça a palavra na hora" },
  { icon: Globe2, text: "Português e inglês com pronúncia clara" },
  { icon: MonitorOff, text: "Aprendizado sem telas, sem app e sem Wi-Fi" },
  { icon: Hand, text: "Páginas resistentes para mãos pequenas" },
];

export function ProductHero({ color, bundleId, onColor, onBundle, onBuy, ctaRef }: Props) {
  const [active, setActive] = useState(0);
  const bundle = getBundle(bundleId);
  const compareAt = bundle.compareAtPrice ?? 0;
  const off = discountPercent(bundle.price, compareAt);
  const gallery = galleryFor(color);
  const image = gallery[active] ?? gallery[0]!;
  // Trocou a cor: mostra a capa dessa cor.
  useEffect(() => setActive(0), [color]);

  return (
    <section id="comprar" className="wave-top scroll-mt-20">
      <div className="mx-auto grid max-w-[1180px] gap-8 px-4 pb-14 pt-6 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pt-10">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-square overflow-hidden rounded-[20px] border bg-card shop-shadow">
            {off > 0 && (
              <span className="absolute right-4 top-4 z-10 rounded-full bg-cta px-3 py-1 font-display text-sm font-black text-white">
                -{off}%
              </span>
            )}
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
              fetchPriority={active === 0 ? "high" : "auto"}
            />
          </div>
          <div className="mt-3 grid grid-cols-6 gap-2" role="tablist" aria-label="Fotos do produto">
            {gallery.map((g, i) => (
              <button
                key={g.src}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Foto ${i + 1}`}
                onClick={() => setActive(i)}
                className={cn(
                  "aspect-square overflow-hidden rounded-xl border-2 bg-card transition",
                  i === active
                    ? "border-primary"
                    : "border-transparent opacity-70 hover:opacity-100",
                )}
              >
                <img src={g.src} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <span className="rounded-full bg-sun-soft px-3 py-1 text-foreground">
              🇧🇷 Português + 🇺🇸 Inglês
            </span>
            <span className="rounded-full bg-mint-soft px-3 py-1 text-mint">
              A partir de 3 anos
            </span>
          </div>
          <h1 className="mt-3 font-display text-[30px] font-black leading-[1.1] sm:text-[40px]">
            {brand.productName}
          </h1>
          <p className="mt-3 text-[17px] leading-relaxed text-muted-foreground">
            Seu filho toca na figura e o livro <strong className="text-foreground">fala</strong> —
            em português e em inglês. Mais de 10 temas para aprender brincando, longe das telas.
          </p>

          <div className="mt-5 rounded-2xl border bg-card p-4">
            <div className="flex flex-wrap items-baseline gap-x-3">
              {compareAt > bundle.price && (
                <span className="text-base text-muted-foreground line-through">
                  {money(compareAt)}
                </span>
              )}
              <span className="font-display text-[38px] font-black leading-none text-foreground">
                {money(bundle.price)}
              </span>
              {compareAt > bundle.price && (
                <span className="rounded-md bg-mint-soft px-2 py-0.5 text-sm font-bold text-mint">
                  Economize {money(compareAt - bundle.price)}
                </span>
              )}
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <PixIcon className="h-4 w-4" /> À vista no Pix, com aprovação na hora
            </p>
          </div>

          <fieldset className="mt-6">
            <legend className="text-sm font-bold">
              Cor:{" "}
              <span className="font-normal text-muted-foreground">
                {COLORS.find((c) => c.id === color)?.label}
              </span>
            </legend>
            <div className="mt-2 flex gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={c.id === color}
                  onClick={() => onColor(c.id)}
                  className={cn(
                    "flex min-h-12 items-center gap-2 rounded-xl border-2 bg-card px-4 font-semibold transition",
                    c.id === color ? "border-primary" : "border-border hover:border-primary/50",
                  )}
                >
                  <span
                    className="size-5 rounded-full border border-black/10"
                    style={{ background: c.swatch }}
                  />
                  {c.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-sm font-bold">Escolha seu kit</legend>
            <div className="mt-2 grid gap-3">
              {availableBundles.map((b) => {
                const selected = b.id === bundleId;
                return (
                  <label
                    key={b.id}
                    className={cn(
                      "relative flex cursor-pointer items-center gap-3 rounded-xl border-2 bg-card p-4 transition",
                      selected
                        ? "border-primary bg-secondary/60"
                        : "border-border hover:border-primary/50",
                    )}
                  >
                    <input
                      type="radio"
                      name="kit"
                      value={b.id}
                      checked={selected}
                      onChange={() => onBundle(b.id)}
                      className="sr-only"
                    />
                    <span
                      className={cn(
                        "grid size-5 shrink-0 place-items-center rounded-full border-2",
                        selected ? "border-primary bg-primary" : "border-muted-foreground/40",
                      )}
                    >
                      {selected && <Check className="size-3 text-white" strokeWidth={4} />}
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-[17px] font-extrabold">
                        {b.name}
                      </span>
                      <span className="block text-xs text-muted-foreground">{b.priceNote}</span>
                      {b.units > 1 && (
                        <span className="block text-xs font-semibold text-mint">
                          {money(b.price / b.units)} cada
                        </span>
                      )}
                    </span>
                    <span className="text-right">
                      <span className="block font-display text-lg font-black">
                        {money(b.price)}
                      </span>
                      {b.compareAtPrice && b.compareAtPrice > b.price && (
                        <span className="block text-xs text-muted-foreground line-through">
                          {money(b.compareAtPrice)}
                        </span>
                      )}
                    </span>
                    {b.badge && (
                      <span className="absolute -top-2.5 right-3 rounded-full bg-sun px-2.5 py-0.5 text-[11px] font-black uppercase text-foreground">
                        {b.badge}
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <button
            ref={ctaRef}
            type="button"
            onClick={onBuy}
            className="cta-btn cta-pulse mt-6 flex min-h-[60px] w-full items-center justify-center gap-2 text-xl uppercase"
          >
            Comprar agora
          </button>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Lock className="size-3.5" /> Compra segura
            </span>
            <span className="flex items-center gap-1">
              <PixIcon className="size-3.5" /> Pagamento via Pix
            </span>
          </div>

          <ul className="mt-6 grid gap-2.5 rounded-2xl border bg-card p-4 text-sm">
            <li className="flex items-center gap-3">
              <Truck className="size-5 text-primary" />
              <span>
                <strong>{bundleShippingLabel(bundle)}</strong> para todo o Brasil
              </span>
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="size-5 text-primary" />
              <span>Enviado em até 1 dia útil após o pagamento, com rastreio</span>
            </li>
            <li className="flex items-center gap-3">
              <RotateCcw className="size-5 text-primary" />
              <span>
                <strong>7 dias</strong> para devolução, sem burocracia
              </span>
            </li>
            <li className="flex items-center gap-3">
              <BatteryCharging className="size-5 text-primary" />
              <span>Funciona com 3 pilhas AAA (não inclusas)</span>
            </li>
          </ul>

          <ul className="mt-6 grid gap-3">
            {highlights.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-[15px] font-medium">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                  <Icon className="size-[18px]" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
