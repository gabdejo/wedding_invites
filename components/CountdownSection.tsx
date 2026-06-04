"use client";

import { useEffect, useState } from "react";

type TimeLeft = { months: number; days: number; hours: number; minutes: number; seconds: number };

const WEDDING_DATE = new Date("2026-11-14T12:00:00");

function getTimeLeft(): TimeLeft {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  const now = new Date();
  const months =
    (WEDDING_DATE.getFullYear() - now.getFullYear()) * 12 +
    (WEDDING_DATE.getMonth() - now.getMonth()) -
    (WEDDING_DATE.getDate() < now.getDate() ? 1 : 0);
  const monthsStart = new Date(now.getFullYear(), now.getMonth() + months, now.getDate());
  const remainingDiff = WEDDING_DATE.getTime() - monthsStart.getTime();
  return {
    months,
    days: Math.floor(remainingDiff / (1000 * 60 * 60 * 24)),
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

  const t = timeLeft ?? { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <section className="bg-[#5D7B9F] px-6 py-20 text-center" id="countdown">
      <p
        className="mb-10 text-sm uppercase tracking-[0.3em] text-[#c9a96e]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {content.heading}
      </p>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-8 sm:flex-nowrap sm:gap-12">
        {[
          { label: content.labels.months, value: t.months },
          { label: content.labels.days, value: t.days },
          { label: content.labels.hours, value: t.hours },
          { label: content.labels.minutes, value: t.minutes },
          { label: content.labels.seconds, value: t.seconds },
        ].map(({ label, value }) => (
          <div key={label} className="flex w-[calc(33.333%-16px)] flex-col items-center gap-2 sm:w-auto">
            <span
              className="text-4xl font-light tabular-nums text-white sm:text-6xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {pad(value)}
            </span>
            <span
              className="text-xs uppercase tracking-widest text-[#AEBDCF]"
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
