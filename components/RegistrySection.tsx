"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["registry"] };

const inputClass =
  "w-full border-b border-[#AEBDCF] bg-transparent py-3 text-sm text-[#2c2c2c] placeholder-[#9BAED4] outline-none transition-colors focus:border-[#5D7B9F]";

export default function RegistrySection({ content }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [purchaseState, setPurchaseState] = useState<"idle" | "success" | "error">("idle");
  const [showToast, setShowToast] = useState(false);
  const [cart, setCart] = useState<Map<string, number>>(new Map());
  const [amountEditing, setAmountEditing] = useState<string | null>(null);
  const [amountDraft, setAmountDraft] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [dedication, setDedication] = useState("");
  const visibleProducts = expanded ? content.products : [];
  const hasMore = content.products.length > 0;

  const cartItems = content.products
    .filter((p) => cart.has(p.name))
    .map((p) => ({ ...p, price: cart.get(p.name)! }));
  const cartTotal = cartItems.reduce((sum, p) => sum + p.price, 0);

  function toggleCart(product: { name: string; price: number | null }) {
    if (cart.has(product.name)) {
      setCart((prev) => {
        const next = new Map(prev);
        next.delete(product.name);
        return next;
      });
      return;
    }
    if (product.price === null) {
      setAmountEditing(product.name);
      setAmountDraft("");
      return;
    }
    setCart((prev) => new Map(prev).set(product.name, product.price as number));
  }

  function confirmAmount(name: string) {
    const amount = Number(amountDraft.replace(",", "."));
    if (!Number.isFinite(amount) || amount <= 0) return;
    setCart((prev) => new Map(prev).set(name, amount));
    setAmountEditing(null);
  }

  function checkoutCart() {
    if (cartItems.length === 0 || !buyerName.trim() || !buyerEmail.trim()) return;

    const description = [
      cartItems.map((p) => p.name).join(", "),
      `De: ${buyerName}`,
      buyerPhone && `Tel: ${buyerPhone}`,
      dedication && `Dedicatoria: ${dedication}`,
    ]
      .filter(Boolean)
      .join(" — ");

    window.Culqi.publicKey = process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY as string;
    window.Culqi.settings({
      title: content.heading,
      currency: "PEN",
      amount: Math.round(cartTotal * 100),
    });
    window.Culqi.options({ lang: "es", installments: false });

    window.culqi = async () => {
      window.Culqi.close();
      if (window.Culqi.token) {
        try {
          const res = await fetch("/api/charge", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token: window.Culqi.token.id,
              amount: Math.round(cartTotal * 100),
              email: window.Culqi.token.email || buyerEmail,
              description,
            }),
          });
          if (res.ok) {
            await supabase.from("gifts").insert({
              buyer_name: buyerName,
              buyer_email: buyerEmail,
              buyer_phone: buyerPhone || null,
              dedication: dedication || null,
              items: cartItems.map((p) => p.name).join(", "),
              amount: cartTotal,
            });
            setPurchaseState("success");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 6000);
            setCart(new Map());
            setCartOpen(false);
            setExpanded(false);
            document.getElementById("registry")?.scrollIntoView({ block: "start" });
            setBuyerName("");
            setBuyerEmail("");
            setBuyerPhone("");
            setDedication("");
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
      {showToast && (
        <div className="fixed inset-x-4 top-4 z-[60] flex justify-center sm:inset-x-auto sm:right-4 sm:justify-end">
          <div
            role="status"
            className="flex items-center gap-3 rounded-sm bg-[#5D7B9F] px-5 py-3 text-sm text-white shadow-lg"
            style={{ fontFamily: "var(--font-body)", animation: "toast-in 0.3s ease-out" }}
          >
            <span>{content.purchaseSuccess}</span>
            <button
              type="button"
              onClick={() => setShowToast(false)}
              aria-label="Close"
              className="text-white/80 transition-colors hover:text-white"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-5xl text-center">
        <h2
          className="mb-4 text-4xl font-medium text-[#2c2c2c]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {content.heading}
        </h2>
        <div className="mx-auto mb-6 h-px w-12 bg-[#c9a96e]" />

        <p
          className="mx-auto mb-12 max-w-xl text-lg italic text-[#6b5744]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {content.intro}
        </p>

        <div id="registry-bank-transfer" className="mx-auto mb-12 max-w-md text-left">
          <p className="mb-6 text-sm leading-7 text-[#666666]" style={{ fontFamily: "var(--font-body)" }}>
            {content.lines[0]}
            <br />
            {content.lines[1]}
          </p>
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

        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="mb-8 border border-[#5D7B9F] px-8 py-3 text-sm font-medium uppercase tracking-[0.2em] text-[#5D7B9F] transition-colors hover:bg-[#5D7B9F] hover:text-white"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {expanded ? content.showLessLabel : content.showAllLabel}
          </button>
        )}

        {cartItems.length > 0 && (
          <div className="sticky top-4 z-10 mx-auto mb-8 flex max-w-md flex-wrap items-center justify-between gap-3 rounded-sm bg-white p-4 shadow-lg ring-1 ring-black/10">
            <span className="text-sm text-[#2c2c2c]" style={{ fontFamily: "var(--font-body)" }}>
              {cartItems.length} {content.cartSummaryLabel} · {content.totalLabel} S/ {cartTotal.toFixed(2)}
            </span>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="bg-[#5D7B9F] px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#9BAED4]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {content.checkoutLabel}
            </button>
          </div>
        )}

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
                  className="mb-1 text-[10px] font-medium uppercase tracking-widest text-[#9BAED4]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {product.category}
                </span>
                <h3
                  className="mb-1 text-base font-medium text-[#2c2c2c]"
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
                  {amountEditing === product.name ? (
                    <form
                      className="flex gap-1"
                      onSubmit={(e) => {
                        e.preventDefault();
                        confirmAmount(product.name);
                      }}
                    >
                      <input
                        type="number"
                        min="1"
                        step="0.01"
                        inputMode="decimal"
                        autoFocus
                        placeholder={content.customAmountPrompt}
                        value={amountDraft}
                        onChange={(e) => setAmountDraft(e.target.value)}
                        className="w-0 min-w-0 flex-1 border border-[#5D7B9F] px-2 py-1.5 text-xs text-[#2c2c2c] outline-none"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                      <button
                        type="submit"
                        className="border border-[#5D7B9F] bg-[#5D7B9F] px-2 py-1.5 text-[10px] font-medium uppercase text-white"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {content.addToCartLabel}
                      </button>
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => toggleCart(product)}
                      className={`border px-3 py-1.5 text-center text-[10px] font-medium uppercase tracking-[0.15em] transition-colors ${
                        cart.has(product.name)
                          ? "border-[#5D7B9F] bg-[#5D7B9F] text-white"
                          : "border-[#5D7B9F] text-[#5D7B9F] hover:bg-[#5D7B9F] hover:text-white"
                      }`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {cart.has(product.name)
                        ? `${content.inCartLabel} · S/ ${cart.get(product.name)!.toFixed(2)}`
                        : product.price === null
                          ? content.buyLabel
                          : content.addToCartLabel}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
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

        {/* Legal links: gated behind "gift list expanded". To make always visible again, remove the {expanded && ( ... )} wrap. */}
        {expanded && (
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium uppercase tracking-widest text-[#9a8066]">
            {content.legalLinks.map(({ label, href }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline" style={{ fontFamily: "var(--font-body)" }}>
                {label}
              </a>
            ))}
          </div>
        )}
      </div>

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setCartOpen(false)} />
          <div className="relative flex h-full w-full flex-col overflow-y-auto bg-[#faf8f4] p-6 sm:w-[420px] sm:max-w-full">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#9a8066]" style={{ fontFamily: "var(--font-body)" }}>
                  {content.heading}
                </p>
                <h3 className="text-3xl font-medium text-[#2c2c2c]" style={{ fontFamily: "var(--font-heading)" }}>
                  {content.cartDrawerHeading}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Close"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[#AEBDCF] text-[#5D7B9F] transition-colors hover:bg-[#5D7B9F] hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="mb-6 border border-[#AEBDCF] bg-white p-4 text-xs leading-5 text-[#666666]" style={{ fontFamily: "var(--font-body)" }}>
              <p className="mb-1 font-medium text-[#5D7B9F]">{content.securePaymentHeading}</p>
              <p>{content.securePaymentNote}</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                checkoutCart();
              }}
              className="flex flex-col gap-4"
            >
              <input
                className={inputClass}
                placeholder={content.buyerNamePlaceholder}
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                required
                style={{ fontFamily: "var(--font-body)" }}
              />
              <input
                className={inputClass}
                type="email"
                placeholder={content.buyerEmailPlaceholder}
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                required
                style={{ fontFamily: "var(--font-body)" }}
              />
              <input
                className={inputClass}
                type="tel"
                placeholder={content.buyerPhonePlaceholder}
                value={buyerPhone}
                onChange={(e) => setBuyerPhone(e.target.value)}
                style={{ fontFamily: "var(--font-body)" }}
              />
              <textarea
                className={`${inputClass} resize-none`}
                rows={3}
                placeholder={content.dedicationPlaceholder}
                value={dedication}
                onChange={(e) => setDedication(e.target.value)}
                style={{ fontFamily: "var(--font-body)" }}
              />
              <button
                type="submit"
                disabled={!buyerName.trim() || !buyerEmail.trim()}
                className="mt-2 bg-[#5D7B9F] py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-colors hover:bg-[#9BAED4] disabled:cursor-not-allowed disabled:opacity-40"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {content.goToPayLabel}
              </button>
            </form>

            <div className="mt-6 flex flex-col gap-3 border-t border-[#e5ddd0] pt-6">
              {cartItems.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-sm bg-[#f0f4f9]">
                    {item.imagePath && (
                      <Image src={item.imagePath} alt={item.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#2c2c2c]" style={{ fontFamily: "var(--font-body)" }}>
                      {item.name}
                    </p>
                    <p className="text-xs text-[#666666]" style={{ fontFamily: "var(--font-body)" }}>
                      S/ {item.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleCart(item)}
                    aria-label={content.removeLabel}
                    className="px-2 text-lg text-[#9a8066] transition-colors hover:text-[#5D7B9F]"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
