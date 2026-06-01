import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["eventInfo"] };

export default function EventInfoSection({ content }: Props) {
  return (
    <section className="bg-[#faf8f4] px-6 py-24" id="info">
      <div className="mx-auto max-w-3xl text-center">
        <h2
          className="mb-4 text-4xl font-light text-[#2c2c2c]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {content.heading}
        </h2>
        <div className="mx-auto mb-12 h-px w-12 bg-[#c9a96e]" />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {content.details.map(({ icon, title, line1, line2 }) => (
            <div key={title} className="flex flex-col items-center gap-3">
              <span className="text-3xl">{icon}</span>
              <p
                className="text-xs uppercase tracking-[0.25em] text-[#c9a96e]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {title}
              </p>
              <div>
                <p
                  className="text-xl font-light text-[#2c2c2c]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {line1}
                </p>
                <p className="mt-1 text-sm text-[#7a7a7a]" style={{ fontFamily: "var(--font-body)" }}>
                  {line2}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
