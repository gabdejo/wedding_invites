"use client";

import { useState } from "react";
import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["faq"] };

export default function FaqSection({ content }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#faf8f4] px-6 py-24" id="faq">
      <div className="mx-auto max-w-xl text-center">
        <h2
          className="mb-4 text-4xl font-medium text-[#2c2c2c]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {content.heading}
        </h2>
        <div className="mx-auto mb-12 h-px w-12 bg-[#c9a96e]" />

        <div className="flex flex-col divide-y divide-[#e5ded0] text-left">
          {content.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-base text-[#2c2c2c]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.question}
                  </span>
                  <span
                    className={`shrink-0 text-xl font-light text-[#9a8066] transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p
                    className="pb-5 text-sm leading-7 text-[#7a7a7a]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
