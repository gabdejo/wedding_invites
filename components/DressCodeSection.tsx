import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["dressCode"] };

export default function DressCodeSection({ content }: Props) {
  return (
    <section className="bg-[#f8fafc] px-6 py-24 text-center" id="dresscode">
      <div className="mx-auto max-w-xl">
        <h2
          className="mb-4 text-4xl font-light text-[#2c2c2c]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {content.heading}
        </h2>
        <div className="mx-auto mb-8 h-px w-12 bg-[#c9a96e]" />

        <p
          className="mb-4 text-2xl font-light italic text-[#5D7B9F]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {content.style}
        </p>

        <p className="text-sm leading-7 text-[#7a7a7a]" style={{ fontFamily: "var(--font-body)" }}>
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
