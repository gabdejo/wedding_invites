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
  return (
    <section className="bg-[#faf8f4] px-6 py-16" id="photo-collage">
      <div className="relative mx-auto h-[620px] max-w-md sm:h-[740px] sm:max-w-lg md:h-[800px] md:max-w-2xl">
        {content.photos.map((photo, index) => {
          const layout = LAYOUT[index % LAYOUT.length];
          return (
            <div
              key={index}
              className="absolute rounded-sm bg-white p-2 pb-6 shadow-xl ring-1 ring-black/5"
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
            </div>
          );
        })}
      </div>
    </section>
  );
}
