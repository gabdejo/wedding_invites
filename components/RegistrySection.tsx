import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["registry"] };

export default function RegistrySection({ content }: Props) {
  return (
    <section className="bg-[#f0f4f9] px-6 py-24 text-center" id="registry">
      <div className="mx-auto max-w-xl">
        <h2
          className="mb-4 text-4xl font-light text-[#2c2c2c]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {content.heading}
        </h2>
        <div className="mx-auto mb-6 h-px w-12 bg-[#c9a96e]" />

        <p className="mb-10 text-sm leading-7 text-[#7a7a7a]" style={{ fontFamily: "var(--font-body)" }}>
          {content.lines[0]}
          <br />
          {content.lines[1]}
        </p>

        <div className="flex justify-center gap-4">
          {content.stores.map(({ name, url }) => (
            <a
              key={name}
              href={url}
              className="border border-[#5D7B9F] px-8 py-3 text-sm uppercase tracking-[0.2em] text-[#5D7B9F] transition-colors hover:bg-[#5D7B9F] hover:text-white"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
