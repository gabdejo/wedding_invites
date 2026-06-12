import Image from "next/image";
import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["itinerary"] };

export default function ItinerarySection({ content }: Props) {
  return (
    <section className="bg-[#faf8f4] px-6 py-24" id="itinerary">
      <div className="mx-auto max-w-md text-center">
        <h2
          className="mb-4 text-4xl font-light text-[#2c2c2c]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {content.heading}
        </h2>
        <div className="mx-auto mb-16 h-px w-12 bg-[#c9a96e]" />

        <div className="relative mx-auto w-fit">
          <div className="absolute left-[100px] top-10 bottom-10 w-px bg-[#c9a96e]/40" />

          <div className="flex flex-col gap-10">
            {content.items.map((item) => (
              <div key={item.name} className="relative flex items-center gap-10 text-left">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm">
                  {item.imagePath ? (
                    <Image
                      src={item.imagePath}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-[#e8f0f8] via-[#dce8f2] to-[#c8d9eb]" />
                  )}
                </div>

                <div className="absolute left-[100px] h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#c9a96e] bg-[#faf8f4]" />

                <div>
                  <p
                    className="text-sm uppercase tracking-widest text-[#5D7B9F]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.time}
                  </p>
                  <p
                    className="text-2xl font-light text-[#2c2c2c]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
