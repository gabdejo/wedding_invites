import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["ourStory"] };

export default function OurStorySection({ content }: Props) {
  return (
    <section className="bg-[#faf8f4] px-6 py-24 text-center" id="our-story">
      <div className="mx-auto max-w-2xl">
        <h2
          className="mb-4 text-4xl font-light italic text-[#2c2c2c]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {content.heading}
        </h2>
        <div className="mx-auto mb-10 h-px w-12 bg-[#c9a96e]" />
        <p
          className="text-base leading-relaxed text-[#7a7a7a] md:text-lg"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {content.body}
        </p>
      </div>
    </section>
  );
}
