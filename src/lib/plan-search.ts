import { z } from "zod";
import { parseBundleId, parseColor, type BundleId, type ColorId } from "@/lib/bundles";

const bundleParamSchema = z.preprocess(
  (value) => (typeof value === "number" ? String(value) : value),
  z.enum(["1", "2", "3"]),
);

/** Query string dos kits (?plano=1|2|3 — kit escolhido; ?cor=azul|rosa — cor do livro). */
export const planSearchSchema = z.object({
  plano: bundleParamSchema.optional(),
  cor: z.enum(["azul", "rosa"]).optional().catch(undefined),
});

export type PlanSearch = z.infer<typeof planSearchSchema>;

export function bundleIdFromSearch(search: PlanSearch): BundleId {
  return parseBundleId(search.plano) ?? "1";
}

export function colorFromSearch(search: PlanSearch): ColorId {
  return parseColor(search.cor);
}
