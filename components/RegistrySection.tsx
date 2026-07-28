"use client";

import { useState } from "react";
import Image from "next/image";
import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["registry"] };

export default function RegistrySection({ content }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [purchaseState, setPurchaseState] = useState<"idle" | "success" | "error">("idle");
  const [cart, setCart] = useState<Set<string>>(new Set());
  const visibleProducts = expanded ? content.products : [];
  const hasMore = content.products.length > 0;

  const cartItems = content.products.filter((p) => cart.has(p.name));
  const cartTotal = cartItems.reduce((sum, p) => sum + (p.price ?? 0), 0);

  function toggleCart(product: { name: string; price: number | null }) {
    if (product.price === null) return; // free-contribution products use bank transfer instead
    setCart((prev) => {
      const next = new Set(prev);
      if (next.has(product.name)) next.delete(product.name);
      else next.add(product.name);
      return next;
    });
  }

  function checkoutCart() {
    if (cartItems.length === 0) return;

    window.Culqi.publicKey = process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY as string;
    window.Culqi.settings({
      title: content.heading,
      currency: "PEN",
      amount: Math.round(cartTotal * 100),
    });
    window.Culqi.options({ lang: "es", installments: false });

    window.culqi = async () => {
      if (window.Culqi.token) {
        try {
          const res = await fetch("/api/charge", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token: window.Culqi.token.id,
              amount: Math.round(cartTotal * 100),
              email: window.Culqi.token.email,
              description: cartItems.map((p) => p.name).join(", "),
            }),
          });
          if (res.ok) {
            setPurchaseState("success");
            setCart(new Set());
          } else {
            setPurchaseState("error");
          }
        } catch {
          setPurchaseState("error");
        }
      } else if (window.Culqi.error) {
        setPurchaseState("error");
      }
    };

    window.Culqi.open();
  }

  return (
    <section className="bg-[#f0f4f9] px-6 py-24" id="registry">
      <div className="mx-auto max-w-5xl text-center">
        <h2
          className="mb-4 text-4xl font-light text-[#2c2c2c]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {content.heading}
        </h2>
        <div className="mx-auto mb-6 h-px w-12 bg-[#c9a96e]" />

        <p
          className="mx-auto mb-2 max-w-xl text-lg italic text-[#6b5744]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {content.intro}
        </p>
        <p className="mx-auto mb-12 max-w-xl text-sm leading-7 text-[#666666]" style={{ fontFamily: "var(--font-body)" }}>
          {content.lines[0]}
          <br />
          {content.lines[1]}
        </p>

        {expanded && (
        <div className="grid grid-cols-2 gap-4 text-left sm:grid-cols-3 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex flex-col overflow-hidden rounded-sm bg-white shadow-md ring-1 ring-black/5">
              <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-[#e8f0f8] via-[#dce8f2] to-[#c8d9eb]">
                {product.imagePath && (
                  <Image src={product.imagePath} alt={product.name} fill className="object-cover" />
                )}
              </div>
              <div className="flex flex-1 flex-col p-3">
                <span
                  className="mb-1 text-[10px] uppercase tracking-widest text-[#9BAED4]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {product.category}
                </span>
                <h3
                  className="mb-1 text-base font-light text-[#2c2c2c]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {product.name}
                </h3>
                <p className="mb-3 flex-1 text-xs leading-5 text-[#666666]" style={{ fontFamily: "var(--font-body)" }}>
                  {product.description}
                </p>
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[#5D7B9F]" style={{ fontFamily: "var(--font-body)" }}>
                    {product.price === null ? content.freeContributionLabel : `S/ ${product.price.toFixed(2)}`}
                  </span>
                  {product.price === null ? (
                    <a
                      href="#registry-bank-transfer"
                      className="border border-[#5D7B9F] px-3 py-1.5 text-center text-[10px] uppercase tracking-[0.15em] text-[#5D7B9F] transition-colors hover:bg-[#5D7B9F] hover:text-white"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {content.buyLabel}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => toggleCart(product)}
                      className={`border px-3 py-1.5 text-center text-[10px] uppercase tracking-[0.15em] transition-colors ${
                        cart.has(product.name)
                          ? "border-[#5D7B9F] bg-[#5D7B9F] text-white"
                          : "border-[#5D7B9F] text-[#5D7B9F] hover:bg-[#5D7B9F] hover:text-white"
                      }`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {cart.has(product.name) ? content.inCartLabel : content.addToCartLabel}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="mt-8 border border-[#5D7B9F] px-8 py-3 text-sm uppercase tracking-[0.2em] text-[#5D7B9F] transition-colors hover:bg-[#5D7B9F] hover:text-white"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {expanded ? content.showLessLabel : content.showAllLabel}
          </button>
        )}

        {cartItems.length > 0 && (
          <div className="sticky bottom-4 z-10 mx-auto mt-8 flex max-w-md flex-wrap items-center justify-between gap-3 rounded-sm bg-white p-4 shadow-lg ring-1 ring-black/10">
            <span className="text-sm text-[#2c2c2c]" style={{ fontFamily: "var(--font-body)" }}>
              {cartItems.length} {content.cartSummaryLabel} · {content.totalLabel} S/ {cartTotal.toFixed(2)}
            </span>
            <button
              type="button"
              onClick={checkoutCart}
              className="bg-[#5D7B9F] px-5 py-2 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#9BAED4]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {content.checkoutLabel}
            </button>
          </div>
        )}

        {purchaseState !== "idle" && (
          <p
            className={`mt-8 text-sm ${purchaseState === "success" ? "text-[#5D7B9F]" : "text-red-600"}`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            {purchaseState === "success" ? content.purchaseSuccess : content.purchaseError}
          </p>
        )}

        <div id="registry-bank-transfer" className="mx-auto mt-16 max-w-md rounded-sm bg-white p-8 text-left shadow-md ring-1 ring-black/5">
          <h3 className="mb-2 text-xl font-light text-[#2c2c2c]" style={{ fontFamily: "var(--font-heading)" }}>
            {content.bankTransfer.heading}
          </h3>
          <p className="mb-4 text-sm leading-6 text-[#666666]" style={{ fontFamily: "var(--font-body)" }}>
            {content.bankTransfer.note}
          </p>
          <ul className="space-y-1 text-sm text-[#2c2c2c]" style={{ fontFamily: "var(--font-body)" }}>
            <li><strong>{content.bankTransfer.bank}</strong></li>
            <li>{content.bankTransfer.accountHolder}</li>
            <li>Cuenta: {content.bankTransfer.accountNumber}</li>
            <li>CCI: {content.bankTransfer.cci}</li>
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-widest text-[#9a8066]">
          {content.legalLinks.map(({ label, href }) => (
            <a key={href} href={href} className="underline-offset-4 hover:underline" style={{ fontFamily: "var(--font-body)" }}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
