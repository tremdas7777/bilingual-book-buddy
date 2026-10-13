import { createFileRoute } from "@tanstack/react-router";
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
import {
  checkoutLink,
  defaultColor,
  findKit,
  store,
  type ColorId,
  type KitId,
} from "@/lib/store-config";
import { metaPixelSnippet, track } from "@/lib/track";

const title = `${store.productName} | ${store.brand}`;
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
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: store.productName,
          description,
          brand: { "@type": "Brand", name: store.brand },
          offers: store.kits.map((k) => ({
            "@type": "Offer",
            name: k.label,
            price: k.price.toFixed(2),
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
          })),
        }),
      },
      ...(store.metaPixelId ? [{ children: metaPixelSnippet(store.metaPixelId) }] : []),
    ],
  }),
  component: Store,
});

function Store() {
  const [color, setColor] = useState<ColorId>(defaultColor);
  const [kit, setKit] = useState<KitId>("kit1");
  const [buyError, setBuyError] = useState("");
  const [showSticky, setShowSticky] = useState(false);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const selectedKit = findKit(kit);

  useEffect(() => {
    track("ViewContent", {
      content_name: store.productName,
      value: selectedKit.price,
      currency: "BRL",
    });
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

  function buy() {
    const url = checkoutLink(color, kit);
    if (!url) {
      setBuyError("Checkout ainda não configurado. Defina os links em src/lib/store-config.ts.");
      document.getElementById("comprar")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setBuyError("");
    track("InitiateCheckout", {
      value: selectedKit.price,
      currency: "BRL",
      num_items: selectedKit.units,
    });
    window.location.href = url;
  }

  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Header
        onBuy={() => document.getElementById("comprar")?.scrollIntoView({ behavior: "smooth" })}
      />
      <main>
        <ProductHero
          color={color}
          kit={kit}
          onColor={setColor}
          onKit={setKit}
          onBuy={buy}
          buyError={buyError}
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
        <FinalCta onBuy={buy} />
      </main>
      <Footer />
      <StickyBuyBar visible={showSticky} kit={selectedKit} onBuy={buy} />
    </div>
  );
}
