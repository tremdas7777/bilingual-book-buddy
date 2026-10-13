import { useState, type RefObject } from "react";
import {
  BatteryCharging,
  Check,
  CreditCard,
  Globe2,
  Hand,
  Lock,
  MonitorOff,
  RotateCcw,
  ShieldCheck,
  Truck,
  Volume2,
} from "lucide-react";
import { gallery } from "@/components/store/product-media";
import { discountPercent, installment, money } from "@/lib/format";
import { findKit, store, type ColorId, type KitId } from "@/lib/store-config";
import { cn } from "@/lib/utils";

interface Props {
  color: ColorId;
  kit: KitId;
  onColor: (color: ColorId) => void;
  onKit: (kit: KitId) => void;
  onBuy: () => void;
  buyError: string;
  ctaRef: RefObject<HTMLButtonElement | null>;
}

const highlights = [
  { icon: Volume2, text: "Toque na figura e ouça a palavra na hora" },
  { icon: Globe2, text: "Português e inglês com pronúncia clara" },
  { icon: MonitorOff, text: "Aprendizado sem telas, sem app e sem Wi-Fi" },
  { icon: Hand, text: "Páginas resistentes para mãos pequenas" },
];

export function ProductHero({ color, kit, onColor, onKit, onBuy, buyError, ctaRef }: Props) {
  const [active, setActive] = useState(0);
  const selectedKit = findKit(kit);
  const off = discountPercent(selectedKit.price, selectedKit.compareAt);
  const pix = selectedKit.price * (1 - store.pixDiscount);
  const image = gallery[active] ?? gallery[0]!;

  return (
    <section id="comprar" className="wave-top">
      <div className="mx-auto grid max-w-[1180px] gap-8 px-4 pb-14 pt-6 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pt-10">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-square overflow-hidden rounded-[20px] border bg-card shop-shadow">
            {off > 0 && (
              <span className="absolute left-4 top-4 z-10 rounded-full bg-cta px-3 py-1 font-display text-sm font-black text-white">
                -{off}%
              </span>
            )}
            <img
              src={image.src}
              alt={image.alt}
              className={cn(
                "h-full w-full",
                image.fit === "cover" ? "object-cover" : "object-contain p-4",
              )}
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
            {store.productName}
          </h1>
          <p className="mt-3 text-[17px] leading-relaxed text-muted-foreground">
            Seu filho toca na figura e o livro <strong className="text-foreground">fala</strong> —
            em português e em inglês. Mais de 10 temas para aprender brincando, longe das telas.
          </p>

          <div className="mt-5 rounded-2xl border bg-card p-4">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <span className="text-base text-muted-foreground line-through">
                {money(selectedKit.compareAt)}
              </span>
              <span className="font-display text-[38px] font-black leading-none text-foreground">
                {money(selectedKit.price)}
              </span>
              {off > 0 && (
                <span className="rounded-md bg-mint-soft px-2 py-0.5 text-sm font-bold text-mint">
                  Economize {money(selectedKit.compareAt - selectedKit.price)}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm">
              <strong className="text-mint">{money(pix)} no Pix</strong>{" "}
              <span className="text-muted-foreground">
                ({Math.round(store.pixDiscount * 100)}% de desconto)
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              ou {store.installmentsNoInterest}x de{" "}
              {installment(selectedKit.price, store.installmentsNoInterest)} sem juros no cartão
            </p>
          </div>

          <fieldset className="mt-6">
            <legend className="text-sm font-bold">
              Cor:{" "}
              <span className="font-normal text-muted-foreground">
                {store.colors.find((c) => c.id === color)?.label}
              </span>
            </legend>
            <div className="mt-2 flex gap-3">
              {store.colors.map((c) => (
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
              {store.kits.map((k) => {
                const selected = k.id === kit;
                return (
                  <label
                    key={k.id}
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
                      value={k.id}
                      checked={selected}
                      onChange={() => onKit(k.id)}
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
                        {k.label}
                      </span>
                      {k.note && (
                        <span className="block text-xs text-muted-foreground">{k.note}</span>
                      )}
                      {k.units > 1 && (
                        <span className="block text-xs font-semibold text-mint">
                          {money(k.price / k.units)} cada
                        </span>
                      )}
                    </span>
                    <span className="text-right">
                      <span className="block font-display text-lg font-black">
                        {money(k.price)}
                      </span>
                      <span className="block text-xs text-muted-foreground line-through">
                        {money(k.compareAt)}
                      </span>
                    </span>
                    {k.badge && (
                      <span className="absolute -top-2.5 right-3 rounded-full bg-sun px-2.5 py-0.5 text-[11px] font-black uppercase text-foreground">
                        {k.badge}
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
          {buyError && (
            <p role="alert" className="mt-2 text-center text-sm font-semibold text-destructive">
              {buyError}
            </p>
          )}
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Lock className="size-3.5" /> Compra segura
            </span>
            <span className="flex items-center gap-1">
              <CreditCard className="size-3.5" /> Pix, cartão e boleto
            </span>
          </div>

          <ul className="mt-6 grid gap-2.5 rounded-2xl border bg-card p-4 text-sm">
            {store.shipping.freeShipping && (
              <li className="flex items-center gap-3">
                <Truck className="size-5 text-primary" />
                <span>
                  <strong>Frete grátis</strong> para todo o Brasil
                </span>
              </li>
            )}
            <li className="flex items-center gap-3">
              <ShieldCheck className="size-5 text-primary" />
              <span>
                {store.shipping.dispatch} · {store.shipping.delivery}
              </span>
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
