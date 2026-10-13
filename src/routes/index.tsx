import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ProductHero } from "@/components/store/product-hero";
import { media } from "@/components/store/product-media";
import {
  AnnouncementBar,
  Benefits,
  Comparison,
  Faq,
  FinalCta,
  Footer,
  Header,
  HowItWorks,
  Reviews,
  Specs,
  Themes,
} from "@/components/store/sections";
import { StickyBuyBar } from "@/components/store/sticky-buy-bar";
import { TryIt } from "@/components/store/try-it";
import { trackCheckoutClick } from "@/lib/analytics";
import { brand } from "@/lib/brand";
import {
  availableBundles,
  DEFAULT_BUNDLE_ID,
  DEFAULT_COLOR,
  getBundle,
  type BundleId,
  type ColorId,
} from "@/lib/bundles";
import { metaTrack } from "@/lib/meta-pixel";

const title = `${brand.productName} | ${brand.name}`;
const description =
  "Seu filho toca na figura e o livro fala em português e inglês. Mais de 10 temas, sem telas e sem internet. A partir de 3 anos.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "product" },
      { property: "og:image", content: media.capa },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: brand.productName,
          description,
          brand: { "@type": "Brand", name: brand.name },
          offers: availableBundles.map((b) => ({
            "@type": "Offer",
            name: b.name,
            price: b.price.toFixed(2),
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
          })),
        }),
      },
    ],
  }),
  component: Store,
});

function Store() {
  const navigate = useNavigate();
  const [color, setColor] = useState<ColorId>(DEFAULT_COLOR);
  const [bundleId, setBundleId] = useState<BundleId>(DEFAULT_BUNDLE_ID);
  const [showSticky, setShowSticky] = useState(false);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const bundle = getBundle(bundleId);

  useEffect(() => {
    metaTrack("ViewContent", { value: bundle.price, contentName: bundle.name });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function buy(source: string) {
    trackCheckoutClick({
      source,
      bundleId: bundle.id,
      bundleName: bundle.name,
      value: bundle.price,
    });
    navigate({ to: "/checkout", search: { plano: bundle.id, cor: color } });
  }

  const scrollToBuy = () =>
    document.getElementById("comprar")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Header onBuy={scrollToBuy} />
      <main>
        <ProductHero
          color={color}
          bundleId={bundleId}
          onColor={setColor}
          onBundle={setBundleId}
          onBuy={() => buy("hero")}
          ctaRef={ctaRef}
        />
        <HowItWorks />
        <TryIt />
        <Benefits />
        <Themes />
        <Comparison />
        <Reviews />
        <Specs />
        <Faq />
        <FinalCta onBuy={() => buy("final_cta")} />
      </main>
      <Footer />
      <StickyBuyBar visible={showSticky} kit={bundle} onBuy={() => buy("sticky_bar")} />
    </div>
  );
}
