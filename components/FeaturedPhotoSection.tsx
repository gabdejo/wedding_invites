import Image from "next/image";
import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["featuredPhoto"]; id?: string };

export default function FeaturedPhotoSection({ content, id = "featured-photo" }: Props) {
  const { photos } = content;
  if (photos.length === 0) return null;

  return (
    <section className="bg-[#faf8f4]" id={id}>
      <div className={`grid gap-1 ${photos.length > 1 ? "md:grid-cols-2" : ""}`}>
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative aspect-[16/10] w-full max-h-[80vh] overflow-hidden bg-gradient-to-br from-[#e8f0f8] via-[#dce8f2] to-[#c8d9eb]"
          >
            {photo.imagePath && (
              <Image
                src={photo.imagePath}
                alt={photo.alt}
                fill
                sizes={photos.length > 1 ? "(min-width: 768px) 50vw, 100vw" : "100vw"}
                className="object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
