import Image from "next/image";
import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["itinerary"] };

export default function ItinerarySection({ content }: Props) {
  const n = content.items.length;

  return (
    <section className="bg-[#f5f0e8] px-2 py-24 sm:px-6" id="itinerary">
      <div className="mx-auto max-w-xl text-center">
        <h2
          className="mb-4 text-4xl font-light text-[#2c2c2c]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {content.heading}
        </h2>
        <div className="mx-auto mb-16 h-px w-12 bg-[#c9a96e]" />

        {/* the vine PNG's painted stem only spans ~27%-70% of its transparent canvas width,
            so nodes anchor at those percentages (not 0%/100%) to sit right against the artwork.
            photo (left) and text (right) sit on opposite sides so both stay a fixed size while
            the vine itself can scale up without the two competing for the same strip of room. */}
        <div className="relative mx-auto aspect-[1024/1536] w-[clamp(258px,80vw,340px)]">
          <Image src="/images/vines.png" alt="" fill className="object-contain" />

          {content.items.map((item, i) => {
            const flip = i % 2 === 1;
            const top = ((i + 0.5) / n) * 100;
            return (
              <div key={item.name} className="absolute inset-x-0" style={{ top: `${top}%` }}>
                <div
                  className={`absolute h-[clamp(56px,19vw,72px)] w-[clamp(56px,19vw,72px)] -translate-y-1/2 shrink-0 overflow-hidden rounded-full bg-white shadow-sm ${
                    flip ? "left-[70%] ml-2" : "right-[70%] mr-2"
                  }`}
                >
                  {item.imagePath ? (
                    <Image src={item.imagePath} alt={item.name} fill className="object-cover" />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-[#e8f0f8] via-[#dce8f2] to-[#c8d9eb]" />
                  )}
                </div>

                <div
                  className={`absolute w-[clamp(96px,29vw,160px)] -translate-y-1/2 ${
                    flip ? "right-[70%] mr-3 text-right" : "left-[70%] ml-3 text-left"
                  }`}
                >
                  <p
                    className="text-[clamp(13px,3.2vw,15px)] uppercase tracking-widest text-[#5D7B9F]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.time}
                  </p>
                  <p
                    className="text-[clamp(22px,5.5vw,26px)] font-light text-[#2c2c2c]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
