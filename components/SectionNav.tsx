"use client";

import { useState } from "react";
import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["nav"] };

export default function SectionNav({ content }: Props) {
  // "open" drives the transition classes; "mounted" keeps the blurred overlay
  // out of the DOM entirely while at rest, so it's not a permanent GPU cost.
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  function show() {
    setMounted(true);
    requestAnimationFrame(() => setOpen(true));
  }

  function hide() {
    setOpen(false);
    setTimeout(() => setMounted(false), 300);
  }

  function goTo(id: string) {
    hide();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={show}
          aria-label="Menu"
          className="fixed bottom-6 left-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#5D7B9F] shadow-lg ring-1 ring-black/10 transition-colors hover:bg-[#5D7B9F] hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      )}

      {mounted && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
              open ? "opacity-100" : "opacity-0"
            }`}
            onClick={hide}
          />
          <div
            className={`relative flex h-full w-[300px] max-w-[85vw] flex-col overflow-y-auto bg-[#faf8f4]/90 p-6 shadow-xl backdrop-blur-sm transition-transform duration-300 ease-out sm:w-[340px] ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="mb-8 flex items-start justify-between">
              <div>
                <h3 className="text-3xl font-medium text-[#2c2c2c]" style={{ fontFamily: "var(--font-heading)" }}>
                  {content.heading}
                </h3>
                <div className="mt-3 h-px w-12 bg-[#c9a96e]" />
              </div>
              <button
                type="button"
                onClick={hide}
                aria-label="Close"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[#AEBDCF] text-[#5D7B9F] transition-colors hover:bg-[#5D7B9F] hover:text-white"
              >
                ×
              </button>
            </div>

            <nav className="flex flex-col">
              {content.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(item.id)}
                  className="border-b border-[#e5ddd0] py-3 text-left text-sm font-medium uppercase tracking-[0.15em] text-[#2c2c2c] transition-colors hover:text-[#5D7B9F]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
