// Tudo o que muda de loja para loja fica aqui: marca, preços, links de checkout e contatos.
// Os componentes da loja só leem deste arquivo.

export type ColorId = "azul" | "rosa";
export type KitId = "kit1" | "kit2";

export interface Kit {
  id: KitId;
  label: string;
  units: number;
  price: number;
  compareAt: number;
  badge?: string;
  note?: string;
}

export interface Review {
  name: string;
  city: string;
  text: string;
  rating: number;
}

export const store = {
  brand: "Pequeno Bilíngue",
  productName: "Livro Interativo Bilíngue com Som",
  tagline: "Toque, ouça e aprenda português e inglês brincando",
  supportEmail: "",
  // Somente dígitos, com DDI: ex. '5511999999999'. Vazio esconde o botão de WhatsApp.
  whatsapp: "",
  cnpj: "",
  legalName: "",

  colors: [
    { id: "azul", label: "Azul", swatch: "oklch(0.66 0.14 235)" },
    { id: "rosa", label: "Rosa", swatch: "oklch(0.76 0.13 355)" },
  ] as { id: ColorId; label: string; swatch: string }[],

  kits: [
    { id: "kit1", label: "1 livro", units: 1, price: 139.9, compareAt: 180 },
    {
      id: "kit2",
      label: "2 livros",
      units: 2,
      price: 249.9,
      compareAt: 360,
      badge: "Mais vantajoso",
      note: "Ideal para irmãos ou presente",
    },
  ] as Kit[],

  pixDiscount: 0.05,
  maxInstallments: 12,
  installmentsNoInterest: 3,

  shipping: {
    freeShipping: true,
    dispatch: "Envio em até 2 dias úteis",
    delivery: "Entrega com código de rastreio",
  },

  // Link do checkout (Yampi, Cartpanda, Shopify, Mercado Pago...) por cor e kit.
  // Enquanto estiver vazio, o botão de compra cai no WhatsApp (se configurado).
  checkoutLinks: {
    "azul-kit1": "",
    "azul-kit2": "",
    "rosa-kit1": "",
    "rosa-kit2": "",
  } as Record<`${ColorId}-${KitId}`, string>,

  metaPixelId: "",

  // Coloque apenas avaliações reais de clientes. A seção só aparece quando houver itens.
  reviews: [] as Review[],
};

export function findKit(id: KitId): Kit {
  return store.kits.find((k) => k.id === id) ?? (store.kits[0] as Kit);
}

export const defaultColor: ColorId = "azul";

export function checkoutLink(color: ColorId, kit: KitId): string | null {
  const direct = store.checkoutLinks[`${color}-${kit}`];
  if (direct) return direct;
  if (!store.whatsapp) return null;
  const k = store.kits.find((item) => item.id === kit);
  const c = store.colors.find((item) => item.id === color);
  const text = `Olá! Quero comprar o ${store.productName} — cor ${c?.label}, ${k?.label}.`;
  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(text)}`;
}
