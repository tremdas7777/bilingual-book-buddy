import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { BrandLogo } from "@/components/site/BrandLogo";
import { Footer } from "@/components/store/sections";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b bg-background/90">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-4 sm:px-6">
          <Link to="/">
            <BrandLogo className="text-xl" />
          </Link>
          <Link
            to="/"
            hash="comprar"
            className="cta-btn flex min-h-10 items-center px-4 text-sm uppercase"
          >
            Comprar
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
