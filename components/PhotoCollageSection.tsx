"use client";

import { useState } from "react";
import Image from "next/image";
import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["photoCollage"] };

const LAYOUT = [
  { top: 0, left: 2, width: 34, rotate: -8, z: 5 },
  { top: 3, left: 34, width: 38, rotate: 6, z: 3 },
  { top: 0, left: 64, width: 34, rotate: -5, z: 6 },
  { top: 23, left: 0, width: 38, rotate: 7, z: 2 },
  { top: 24, left: 36, width: 34, rotate: -10, z: 7 },
  { top: 26, left: 64, width: 34, rotate: 9, z: 3 },
  { top: 45, left: 6, width: 38, rotate: 4, z: 4 },
  { top: 45, left: 42, width: 34, rotate: -7, z: 2 },
  { top: 47, left: 66, width: 32, rotate: 8, z: 5 },
  { top: 65, left: 24, width: 40, rotate: -4, z: 6 },
];

export default function PhotoCollageSection({ content }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openPhoto = openIndex !== null ? content.photos[openIndex] : null;

  return (
    <section className="bg-[#faf8f4] px-6 py-16" id="photo-collage">
      <div className="relative mx-auto h-[620px] max-w-md sm:h-[740px] sm:max-w-lg md:h-[800px] md:max-w-2xl">
        {content.photos.map((photo, index) => {
          const layout = LAYOUT[index % LAYOUT.length];
          return (
            <button
              key={index}
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={photo.caption?.trim() || photo.alt}
              className="absolute rounded-sm bg-white p-2 pb-6 shadow-xl ring-1 ring-black/5 transition-transform duration-200 hover:scale-105 focus-visible:scale-105"
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
        })}
      </div>

      {openPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
          style={{ animation: "lightbox-backdrop-in 0.2s ease-out" }}
          onClick={() => setOpenIndex(null)}
        >
          <div
            className="relative w-full max-w-sm rounded-sm bg-white p-3 pb-8 shadow-2xl"
            style={{ animation: "lightbox-polaroid-in 0.25s ease-out" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
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
              style={{ fontFamily: "var(--font-body)" }}
            >
              {openPhoto.caption?.trim() || openPhoto.alt}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
