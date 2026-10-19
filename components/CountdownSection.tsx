"use client";

import { useEffect, useState } from "react";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

const WEDDING_DATE = new Date("2026-11-14T12:00:00");

function getTimeLeft(): TimeLeft {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["countdown"] };

export default function CountdownSection({ content }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const t = timeLeft ?? { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <section className="bg-[#5D7B9F] px-6 py-20 text-center" id="countdown">
      <p
        className="mb-10 text-2xl uppercase tracking-[0.05em] text-[#ffffff] sm:text-3xl"
        style={{ fontFamily: "var(--font-heading-cormorant)" }}
      >
        {content.heading}
      </p>

      <div className="flex justify-center gap-3 sm:gap-12">
        {[
          { label: content.labels.days, value: t.days },
          { label: content.labels.hours, value: t.hours },
          { label: content.labels.minutes, value: t.minutes },
          { label: content.labels.seconds, value: t.seconds },
        ].map(({ label, value }) => (
          <div key={label} className="flex w-14 flex-col items-center gap-2 sm:w-24">
            <span
              className="text-4xl font-light tabular-nums text-white sm:text-6xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {pad(value)}
            </span>
            <span
              className="whitespace-nowrap text-[10px] uppercase tracking-wide text-[#AEBDCF] sm:text-xs sm:tracking-widest"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
