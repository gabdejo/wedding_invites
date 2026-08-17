import Image from "next/image";
import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["dressCode"] };

export default function DressCodeSection({ content }: Props) {
  return (
    <section className="bg-[#faf8f4]" id="dresscode">
      <div className="px-6 pt-24 text-center">
        <div className="mx-auto max-w-xl">
          <h2
            className="mb-4 text-3xl font-light text-[#2c2c2c] sm:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {content.heading}
          </h2>
          <div className="mx-auto mb-8 h-px w-12 bg-[#c9a96e]" />
          <p
            className="mb-12 text-3xl font-light italic tracking-wide text-[#5D7B9F] md:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {content.style}
          </p>
        </div>
      </div>

      <div className="relative h-[45vh] w-full md:h-[55vh]">
        <Image
          src="/images/dressCode.png"
          alt=""
          fill
          className="object-cover object-center md:object-contain"
          sizes="100vw"
        />
      </div>

      <div className="px-6 pb-24 pt-12 text-center">
        <p
          className="mx-auto max-w-xl text-base leading-relaxed text-[#666666] md:text-[1.1875rem]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {content.lines[0]}
          <br />
          {content.lines[1]}
        </p>
        <p
          className="mx-auto mt-6 max-w-md text-sm italic tracking-wide text-[#9a8066] md:text-[1.0625rem]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {content.lines[2]}
        </p>
      </div>
    </section>
  );
}
