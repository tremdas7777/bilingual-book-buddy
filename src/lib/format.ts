const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function money(value: number): string {
  return brl.format(value);
}

export function discountPercent(price: number, compareAt: number): number {
  if (compareAt <= price) return 0;
  return Math.round((1 - price / compareAt) * 100);
}

export function installment(price: number, count: number): string {
  return money(Math.floor((price / count) * 100) / 100);
}
