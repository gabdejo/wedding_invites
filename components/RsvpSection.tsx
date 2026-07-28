"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const inputClass =
  "w-full border-b border-[#AEBDCF] bg-transparent py-3 text-sm text-[#2c2c2c] placeholder-[#9BAED4] outline-none transition-colors focus:border-[#5D7B9F]";

import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["rsvp"] };

type Guest = { id: string; full_name: string; max_guests: number };

export default function RsvpSection({ content }: Props) {
  const [name, setName] = useState("");
  const [suggestions, setSuggestions] = useState<Guest[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guests, setGuests] = useState(1);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  async function handleNameChange(value: string) {
    setName(value);
    setSelectedGuest(null);
    if (value.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const { data } = await supabase.rpc("search_guests", { search_query: value.trim() });
    setSuggestions(data ?? []);
    setShowSuggestions(true);
  }

  function selectGuest(guest: Guest) {
    setSelectedGuest(guest);
    setName(guest.full_name);
    setGuests(1);
    setSuggestions([]);
    setShowSuggestions(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedGuest) return;
    setError(false);
    const { error } = await supabase.from("rsvps").insert({
      guest_id: selectedGuest.id,
      name: selectedGuest.full_name,
      email,
      attending,
      guests: attending ? guests : 1,
      notes,
    });
    if (error) setError(true);
    else setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="bg-[#e8eff7] px-6 py-24 text-center" id="rsvp">
        <div className="mx-auto max-w-md">
          <h2
            className="mb-4 text-4xl font-light text-[#2c2c2c]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {content.thankYou}
          </h2>
          <div className="mx-auto mb-6 h-px w-12 bg-[#c9a96e]" />
          <p className="text-sm text-[#666666]" style={{ fontFamily: "var(--font-body)" }}>
            {content.thankYouMessage}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#e8eff7] px-6 py-24" id="rsvp">
      <div className="mx-auto max-w-md text-center">
        <h2
          className="mb-4 text-4xl font-light text-[#2c2c2c]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {content.heading}
        </h2>
        <div className="mx-auto mb-4 h-px w-12 bg-[#c9a96e]" />
        <p className="mb-10 text-sm text-[#666666]" style={{ fontFamily: "var(--font-body)" }}>
          {content.deadline}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
          <div className="relative">
            <input
              className={inputClass}
              placeholder={content.namePlaceholder}
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              required
              style={{ fontFamily: "var(--font-body)" }}
            />

            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-10 mt-1 w-full border border-[#AEBDCF] bg-white shadow-md">
                {suggestions.map((guest) => (
                  <li key={guest.id}>
                    <button
                      type="button"
                      onMouseDown={() => selectGuest(guest)}
                      className="w-full px-3 py-2 text-left text-sm text-[#2c2c2c] hover:bg-[#e8eff7]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {guest.full_name}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {!selectedGuest && name.trim().length >= 2 && suggestions.length === 0 && (
              <p className="mt-2 text-xs text-[#7A96B0]" style={{ fontFamily: "var(--font-body)" }}>
                {content.guestNotFound}
              </p>
            )}
          </div>

          {selectedGuest && (
            <>
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
                  className="mb-3 text-xs uppercase tracking-[0.2em] text-[#7A96B0]"
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
                          : "border-[#AEBDCF] text-[#666666] hover:border-[#9BAED4] hover:text-[#9BAED4]"
                      }`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {attending === true && selectedGuest.max_guests > 1 && (
                <div>
                  <p
                    className="mb-3 text-xs uppercase tracking-[0.2em] text-[#7A96B0]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {content.numberOfGuests}
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      className="flex h-8 w-8 items-center justify-center border border-[#AEBDCF] text-[#666666] transition-colors hover:border-[#5D7B9F] hover:text-[#5D7B9F]"
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
                      onClick={() => setGuests((g) => Math.min(selectedGuest.max_guests, g + 1))}
                      className="flex h-8 w-8 items-center justify-center border border-[#AEBDCF] text-[#666666] transition-colors hover:border-[#5D7B9F] hover:text-[#5D7B9F]"
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
                className="mt-2 bg-[#5D7B9F] py-4 text-sm uppercase tracking-[0.3em] text-white transition-colors hover:bg-[#9BAED4] disabled:cursor-not-allowed disabled:opacity-40"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {content.submit}
              </button>

              {error && (
                <p className="text-center text-sm text-red-600" style={{ fontFamily: "var(--font-body)" }}>
                  {content.submitError}
                </p>
              )}
            </>
          )}
        </form>
      </div>
    </section>
  );
}
