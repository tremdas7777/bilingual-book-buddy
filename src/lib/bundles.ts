import { brand } from "@/lib/brand";

/** Kits: 1, 2 ou 3 livros. */
export type BundleId = "1" | "2" | "3";

export const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/** Valor mínimo (produtos + order bump, sem frete) para liberar o frete grátis. */
export const FREE_SHIPPING_MIN = 90;
export const FREE_SHIPPING_LABEL = `Frete grátis acima de ${brl(FREE_SHIPPING_MIN)}`;

export const isFreeShippingEligible = (subtotal: number) => subtotal >= FREE_SHIPPING_MIN;

/** Selo de frete por kit: grátis quando o próprio kit já passa do mínimo. */
export const bundleShippingLabel = (b: { price: number }) =>
  isFreeShippingEligible(b.price) ? "Frete grátis" : FREE_SHIPPING_LABEL;

/** Cores do livro. A cor escolhida vai no nome do pedido (aparece no /admin). */
export const COLORS = [
  { id: "azul", label: "Azul", swatch: "oklch(0.66 0.14 235)" },
  { id: "rosa", label: "Rosa", swatch: "oklch(0.76 0.13 355)" },
] as const;
export type ColorId = (typeof COLORS)[number]["id"];
export const DEFAULT_COLOR: ColorId = "azul";

export function parseColor(raw: string | undefined): ColorId {
  return COLORS.find((c) => c.id === raw)?.id ?? DEFAULT_COLOR;
}

export const colorLabel = (id: string | undefined) => COLORS.find((c) => c.id === id)?.label ?? "";

export type Bundle = {
  id: BundleId;
  name: string;
  /** Livros no kit (usado em relatórios e no upsell). */
  units: number;
  price: number;
  compareAtPrice?: number;
  /** Texto curto abaixo do nome do kit. */
  priceNote: string;
  checkoutProductName: string;
  checkoutUrl: string;
  featured?: boolean;
  badge?: string;
};

export const bundles: Bundle[] = [
  {
    id: "1",
    name: "1 livro",
    units: 1,
    price: 139.9,
    compareAtPrice: 180,
    priceNote: "Para o seu pequeno",
    checkoutProductName: brand.productName,
    checkoutUrl: "/checkout?plano=1",
  },
  {
    id: "2",
    name: "2 livros",
    units: 2,
    price: 249.9,
    compareAtPrice: 360,
    priceNote: "Ideal para irmãos ou para presentear",
    checkoutProductName: `${brand.productName} — 2 livros`,
    checkoutUrl: "/checkout?plano=2",
    featured: true,
    badge: "Mais vantajoso",
  },
  {
    id: "3",
    name: "3 livros",
    units: 3,
    price: 339.9,
    compareAtPrice: 540,
    priceNote: "Para a família toda ou a escolinha",
    checkoutProductName: `${brand.productName} — 3 livros`,
    checkoutUrl: "/checkout?plano=3",
    badge: "Menor preço por livro",
  },
];

/** Kits visíveis na loja. */
export const availableBundles = bundles;

/** Kit que abre selecionado na loja. */
export const DEFAULT_BUNDLE_ID: BundleId = "1";

export function parseBundleId(raw: string | undefined): BundleId | undefined {
  if (raw === "1" || raw === "2" || raw === "3") return raw;
  return undefined;
}

export function getBundle(id: string | undefined): Bundle {
  const parsed = parseBundleId(id);
  return availableBundles.find((b) => b.id === parsed) ?? availableBundles[0]!;
}

export function getCheckoutUrl(id: string | undefined) {
  return getBundle(id).checkoutUrl;
}

/** Próximo kit para upsell (1→2, 2→3) */
export function getUpgradeBundle(current: Bundle): Bundle | null {
  if (current.id === "1") return availableBundles.find((b) => b.id === "2") ?? null;
  if (current.id === "2") return availableBundles.find((b) => b.id === "3") ?? null;
  return null;
}

/** "1 livro" / "3 livros" */
export const unitsLabel = (units: number) => `${units} ${units > 1 ? "livros" : "livro"}`;

export function bundleDurationLabel(bundle: Bundle) {
  return `${unitsLabel(bundle.units)} · português e inglês`;
}
