import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["location"] };

export default function LocationSection({ content }: Props) {
  const mapsUrl = "https://maps.app.goo.gl/UqyHfwYS5m7971fz5";

  return (
    <section className="bg-[#f5f0e8] px-6 py-24 text-center" id="location">
      <div className="mx-auto max-w-xl">
        <h2
          className="mb-4 text-4xl font-light text-[#2c2c2c]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {content.heading}
        </h2>
        <div className="mx-auto mb-6 h-px w-12 bg-[#c9a96e]" />

        <p className="mb-1 text-base text-[#7a7a7a]" style={{ fontFamily: "var(--font-body)" }}>
          {content.venueName}
        </p>
        <p className="mb-10 text-base text-[#7a7a7a]" style={{ fontFamily: "var(--font-body)" }}>
          {content.address}
        </p>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-[#c9a96e] px-10 py-3 text-sm uppercase tracking-[0.2em] text-[#c9a96e] transition-colors hover:bg-[#c9a96e] hover:text-white"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {content.openInMaps}
        </a>
      </div>
    </section>
  );
}
