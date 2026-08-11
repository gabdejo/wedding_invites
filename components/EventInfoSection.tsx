"use client";

import { useState } from "react";
import Image from "next/image";
import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["eventInfo"] };
type EventItem = SiteContent["eventInfo"]["events"][number];

export default function EventInfoSection({ content }: Props) {
  return (
    <section className="bg-[#f0f4f9] px-6 py-24" id="info">
      <div className="mx-auto max-w-3xl text-center">
        <h2
          className="mb-4 text-4xl font-medium text-[#2c2c2c]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {content.heading}
        </h2>
        <div className="mx-auto mb-12 h-px w-12 bg-[#c9a96e]" />

        <div className="flex flex-wrap justify-center gap-6">
          {content.events.map((event) => (
            <FlipCard
              key={event.name}
              event={event}
              flipLabel={content.flipLabel}
              openInMaps={content.openInMaps}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlipCard({
  event,
  flipLabel,
  openInMaps,
}: {
  event: EventItem;
  flipLabel: string;
  openInMaps: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative h-96 w-72 cursor-pointer select-none"
      style={{ perspective: "1200px" }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="relative h-full w-full transition-transform duration-500 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Side A */}
        <div
          className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-white shadow-md"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative flex-1 overflow-hidden">
            {event.imagePath ? (
              <Image
                src={event.imagePath}
                alt={event.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-[#e8f0f8] via-[#dce8f2] to-[#c8d9eb]" />
            )}
          </div>
          <div className="flex flex-col items-center gap-1.5 px-5 py-5">
            <p
              className="text-2xl font-medium text-[#2c2c2c]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {event.name}
            </p>
            <span
              className="flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-[#9BAED4]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {flipLabel} <span aria-hidden>›</span>
            </span>
          </div>
        </div>

        {/* Side B */}
        <div
          className="absolute inset-0 flex flex-col items-center gap-10 rounded-2xl bg-white px-7 pb-7 pt-10 shadow-md"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <p
            className="text-4xl font-medium text-[#2c2c2c]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {event.name}
          </p>
          {event.time && (
            <p
              className="text-xl text-[#5D7B9F]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {event.time}
            </p>
          )}
          <p
            className="text-center text-base leading-relaxed text-[#7a7a7a]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {event.address}
          </p>
          {event.mapsUrl && (
            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-auto rounded-full border border-[#5D7B9F] px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-[#5D7B9F] transition-colors hover:bg-[#5D7B9F] hover:text-white"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {openInMaps}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
