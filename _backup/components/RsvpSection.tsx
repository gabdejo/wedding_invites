"use client";

import { useState } from "react";

const inputClass =
  "w-full border-b border-[#d4c8bc] bg-transparent py-3 text-sm text-[#2c2c2c] placeholder-[#b0a090] outline-none transition-colors focus:border-[#9BAED4]";

import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["rsvp"] };

export default function RsvpSection({ content }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guests, setGuests] = useState(1);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire to Supabase
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="bg-[#f5f0e8] px-6 py-24 text-center" id="rsvp">
        <div className="mx-auto max-w-md">
          <h2
            className="mb-4 text-4xl font-light text-[#2c2c2c]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {content.thankYou}
          </h2>
          <div className="mx-auto mb-6 h-px w-12 bg-[#c9a96e]" />
          <p className="text-sm text-[#7a7a7a]" style={{ fontFamily: "var(--font-body)" }}>
            {content.thankYouMessage}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f5f0e8] px-6 py-24" id="rsvp">
      <div className="mx-auto max-w-md text-center">
        <h2
          className="mb-4 text-4xl font-light text-[#2c2c2c]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {content.heading}
        </h2>
        <div className="mx-auto mb-4 h-px w-12 bg-[#c9a96e]" />
        <p className="mb-10 text-sm text-[#7a7a7a]" style={{ fontFamily: "var(--font-body)" }}>
          {content.deadline}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
          <input
            className={inputClass}
            placeholder={content.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ fontFamily: "var(--font-body)" }}
          />
          <input
            className={inputClass}
            placeholder={content.emailPlaceholder}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ fontFamily: "var(--font-body)" }}
          />

          <div>
            <p
              className="mb-3 text-xs uppercase tracking-[0.2em] text-[#9a8066]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {content.willYouAttend}
            </p>
            <div className="flex gap-3">
              {(
                [
                  { label: content.accepts, value: true as const },
                  { label: content.declines, value: false as const },
                ]
              ).map(({ label, value }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setAttending(value)}
                  className={`flex-1 border py-3 text-xs uppercase tracking-[0.15em] transition-colors ${
                    attending === value
                      ? "border-[#9BAED4] bg-[#9BAED4] text-white"
                      : "border-[#d4c8bc] text-[#7a7a7a] hover:border-[#9BAED4] hover:text-[#9BAED4]"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {attending === true && (
            <div>
              <p
                className="mb-3 text-xs uppercase tracking-[0.2em] text-[#9a8066]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {content.numberOfGuests}
              </p>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  className="flex h-8 w-8 items-center justify-center border border-[#d4c8bc] text-[#7a7a7a] transition-colors hover:border-[#9BAED4] hover:text-[#9BAED4]"
                >
                  −
                </button>
                <span
                  className="w-4 text-center text-lg text-[#2c2c2c]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {guests}
                </span>
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.min(10, g + 1))}
                  className="flex h-8 w-8 items-center justify-center border border-[#d4c8bc] text-[#7a7a7a] transition-colors hover:border-[#9BAED4] hover:text-[#9BAED4]"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <textarea
            className={`${inputClass} resize-none`}
            placeholder={content.notesPlaceholder}
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ fontFamily: "var(--font-body)" }}
          />

          <button
            type="submit"
            disabled={attending === null}
            className="mt-2 bg-[#2c2c2c] py-4 text-sm uppercase tracking-[0.3em] text-white transition-colors hover:bg-[#9BAED4] disabled:cursor-not-allowed disabled:opacity-40"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {content.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
