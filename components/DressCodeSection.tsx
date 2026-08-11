import Image from "next/image";
import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["dressCode"] };

export default function DressCodeSection({ content }: Props) {
  return (
    <section className="bg-[#faf8f4]" id="dresscode">
      <div className="px-6 pt-24 text-center">
        <div className="mx-auto max-w-xl">
          <h2
            className="mb-4 text-4xl font-medium text-[#2c2c2c]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {content.heading}
          </h2>
          <div className="mx-auto mb-8 h-px w-12 bg-[#c9a96e]" />
          <p
            className="mb-12 text-2xl font-normal italic text-[#5D7B9F]"
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
          className="mx-auto max-w-xl text-sm leading-7 text-[#666666]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {content.lines[0]}
          <br />
          {content.lines[1]}
          <br />
          {content.lines[2]}
        </p>
      </div>
    </section>
  );
}
