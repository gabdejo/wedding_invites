"use client";

import { useState } from "react";
import Image from "next/image";
import type { SiteContent } from "@/content/types";
import Reveal from "@/components/Reveal";
import ReadInText from "@/components/ReadInText";

type Props = { content: SiteContent["ourStory"] };
type Photo = SiteContent["ourStory"]["milestones"][number]["photos"][number];

type SpotLayout = { top: number; left: number; width: number; rotate: number; z: number };

// Percent-based mini-collage spots, keyed by photo count. Circular, overlapping cluster.
const CLUSTER_LAYOUTS: Record<number, SpotLayout[]> = {
  2: [
    { top: 4, left: 4, width: 54, rotate: -7, z: 2 },
    { top: 28, left: 40, width: 56, rotate: 6, z: 3 },
  ],
  3: [
    { top: 0, left: 6, width: 42, rotate: -8, z: 2 },
    { top: 6, left: 42, width: 48, rotate: 5, z: 4 },
    { top: 38, left: 18, width: 46, rotate: -3, z: 3 },
  ],
  4: [
    { top: 0, left: 2, width: 42, rotate: -8, z: 2 },
    { top: 4, left: 40, width: 44, rotate: 5, z: 3 },
    { top: 34, left: 8, width: 42, rotate: 3, z: 4 },
    { top: 36, left: 46, width: 42, rotate: -6, z: 5 },
  ],
  5: [
    { top: 0, left: 2, width: 36, rotate: -8, z: 2 },
    { top: 3, left: 34, width: 38, rotate: 6, z: 4 },
    { top: 0, left: 64, width: 34, rotate: -4, z: 3 },
    { top: 32, left: 14, width: 38, rotate: 5, z: 5 },
    { top: 34, left: 50, width: 36, rotate: -6, z: 6 },
  ],
};

const CLUSTER_HEIGHTS: Record<number, string> = {
  2: "h-[240px] sm:h-[300px]",
  3: "h-[300px] sm:h-[380px]",
  4: "h-[340px] sm:h-[420px]",
  5: "h-[360px] sm:h-[440px]",
};

function StoryPhoto({
  photo,
  onClick,
  layout,
}: {
  photo: Photo;
  onClick: () => void;
  layout: SpotLayout;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={photo.caption?.trim() || photo.alt}
      className="absolute rounded-sm bg-white p-2 pb-5 shadow-xl ring-1 ring-black/5 transition-transform duration-200 hover:z-40 hover:scale-105 focus-visible:z-40 focus-visible:scale-105"
      style={{
        top: `${layout.top}%`,
        left: `${layout.left}%`,
        width: `${layout.width}%`,
        transform: `rotate(${layout.rotate}deg)`,
        zIndex: layout.z,
      }}
    >
      <div
        className={`relative w-full overflow-hidden bg-gradient-to-br from-[#e8f0f8] via-[#dce8f2] to-[#c8d9eb] ${
          photo.orientation === "landscape" ? "aspect-[4/3]" : "aspect-[3/4]"
        }`}
      >
        {photo.imagePath && (
          <Image src={photo.imagePath} alt={photo.alt} fill className="object-cover" />
        )}
      </div>
    </button>
  );
}

export default function OurStorySection({ content }: Props) {
  const [openPhoto, setOpenPhoto] = useState<Photo | null>(null);

  return (
    <section className="overflow-x-clip bg-[#faf8f4] px-6 pt-20 pb-24" id="our-story">
      <Reveal className="mx-auto mb-20 max-w-xl text-center sm:mb-28">
        <p
          className="mb-3 text-sm font-medium tracking-widest sm:text-base"
          style={{ fontFamily: "var(--font-body-new)" }}
        >
          <ReadInText
            text={content.eyebrow}
            color="#9a8066"
            lightColor="#e3d9c8"
            staggerMs={150}
            durationMs={1500}
          />
        </p>
        <h2
          className="text-4xl font-medium italic text-[#2c2c2c] sm:text-5xl"
          style={{ fontFamily: "var(--font-heading-new)" }}
        >
          {content.heading}
        </h2>
        <div className="mx-auto mt-6 h-px w-12 bg-[#c9a96e]" />
      </Reveal>

      <div className="mx-auto flex max-w-5xl flex-col gap-24 sm:gap-32">
        {content.milestones.map((milestone, mIndex) => {
          const isMontage = mIndex === 3;
          const textOnRight = mIndex % 2 === 1;
          const hasPhotos = milestone.photos.length > 0;

          return (
            <div
              key={milestone.title}
              className={`md:grid md:items-center md:gap-12 ${
                !hasPhotos ? "" : isMontage ? "md:grid-cols-[0.9fr_1.4fr]" : "md:grid-cols-2"
              }`}
            >
              <Reveal
                durationMs={2500}
                className={`mx-auto max-w-sm text-center md:max-w-none ${
                  !hasPhotos
                    ? "md:mx-auto md:text-center"
                    : `md:mx-0 md:text-left ${textOnRight ? "md:order-2 md:text-right" : "md:order-1"}`
                }`}
              >
                <h3
                  className="mb-3 text-2xl font-medium italic text-[#2c2c2c] sm:text-3xl"
                  style={{ fontFamily: "var(--font-heading-new)" }}
                >
                  {milestone.title}
                </h3>
                <p
                  className="text-base leading-relaxed text-[#7a7a7a]"
                  style={{ fontFamily: "var(--font-body-new)" }}
                >
                  {milestone.text}
                </p>
                {milestone.highlight && (
                  <p
                    className="mt-4 text-3xl font-normal italic text-[#c9a96e] sm:text-4xl"
                    style={{ fontFamily: "var(--font-heading-new)" }}
                  >
                    {milestone.highlight}
                  </p>
                )}
              </Reveal>

              {hasPhotos && (
                <Reveal
                  durationMs={2500}
                  className={`relative mx-auto mt-10 w-full max-w-sm md:mx-0 md:mt-0 md:max-w-none ${
                    CLUSTER_HEIGHTS[milestone.photos.length] ?? CLUSTER_HEIGHTS[3]
                  } ${textOnRight ? "md:order-1" : "md:order-2"}`}
                >
                  {milestone.photos.map((photo, pIndex) => {
                    const layouts = CLUSTER_LAYOUTS[milestone.photos.length] ?? CLUSTER_LAYOUTS[3];
                    const layout = layouts[pIndex % layouts.length];
                    return (
                      <StoryPhoto
                        key={pIndex}
                        photo={photo}
                        layout={layout}
                        onClick={() => setOpenPhoto(photo)}
                      />
                    );
                  })}
                </Reveal>
              )}
            </div>
          );
        })}
      </div>

      {openPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
          style={{ animation: "lightbox-backdrop-in 0.2s ease-out" }}
          onClick={() => setOpenPhoto(null)}
        >
          <div
            className="relative w-full max-w-sm rounded-sm bg-white p-3 pb-8 shadow-2xl"
            style={{ animation: "lightbox-polaroid-in 0.25s ease-out" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenPhoto(null)}
              aria-label="Cerrar"
              className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg text-[#2c2c2c] shadow-md"
            >
              ×
            </button>
            <div
              className={`relative w-full overflow-hidden bg-gradient-to-br from-[#e8f0f8] via-[#dce8f2] to-[#c8d9eb] ${
                openPhoto.orientation === "landscape" ? "aspect-[4/3]" : "aspect-[3/4]"
              }`}
            >
              {openPhoto.imagePath && (
                <Image src={openPhoto.imagePath} alt={openPhoto.alt} fill className="object-cover" />
              )}
            </div>
            <p
              className="mt-3 text-center text-sm text-[#7a7a7a]"
              style={{ fontFamily: "var(--font-body-new)" }}
            >
              {openPhoto.caption?.trim() || openPhoto.alt}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
