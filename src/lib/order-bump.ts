import imgPilhas from "@/assets/pilhas-aaa.svg";

/**
 * Order bumps do checkout (ofertas logo acima do botão de finalizar).
 * Preços usados no servidor — o cliente só exibe. Lista vazia = checkout sem bump.
 */
export type OrderBumpItem = {
  id: string;
  name: string;
  fullName: string;
  /** Nome enviado ao gateway (fatura). */
  gatewayName: string;
  price: number;
  /** Preço "de" (riscado). Sem ele, a oferta mostra só o preço. */
  compareAt?: number;
  img: string;
  /** Texto de venda exibido no checkout. */
  question: string;
  body: string;
  benefits: string[];
  /** Texto do checkbox; `{preco}` vira o preço formatado. */
  cta: string;
};

export type BumpId = OrderBumpItem["id"];

export const ORDER_BUMPS: readonly OrderBumpItem[] = [
  {
    id: "pilhas",
    name: "+ pilhas AAA",
    fullName: "Kit com 3 pilhas AAA alcalinas",
    gatewayName: "Pedido Pequeno Bilíngue",
    price: 14.9,
    compareAt: 24.9,
    img: imgPilhas,
    question: "O livro já chega pronto para brincar?",
    body: "O livro funciona com 3 pilhas AAA, que não vêm na caixa. Leve as pilhas agora, no mesmo envio, e seu filho começa a brincar no minuto em que o pacote chegar.",
    benefits: [
      "3 pilhas AAA alcalinas, o necessário para o livro",
      "Vai no mesmo envio, sem frete extra",
      "Sem correr para o mercado no dia da entrega",
    ],
    cta: "Sim! Quero as pilhas por + {preco}",
  },
];

/** Bumps escolhidos, na ordem do checkout (ids repetidos ou desconhecidos são ignorados). */
export const getBumps = (ids: readonly string[]) => ORDER_BUMPS.filter((b) => ids.includes(b.id));

/** Soma dos bumps escolhidos, em reais. */
export const bumpsTotal = (ids: readonly string[]) =>
  Math.round(getBumps(ids).reduce((s, b) => s + b.price * 100, 0)) / 100;
