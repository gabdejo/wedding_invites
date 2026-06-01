import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["contact"] };

export default function ContactSection({ content }: Props) {
  return (
    <section className="bg-[#5D7B9F] px-6 py-24 text-center" id="contact">
      <div className="mx-auto max-w-md">
        <h2
          className="mb-4 text-4xl font-light text-white"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {content.heading}
        </h2>
        <div className="mx-auto mb-8 h-px w-12 bg-[#c9a96e]" />

        <p className="mb-10 text-sm leading-7 text-[#AEBDCF]" style={{ fontFamily: "var(--font-body)" }}>
          {content.lines[0]}
          <br />
          {content.lines[1]}
        </p>

        <a
          href={content.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#25D366] px-10 py-4 text-sm uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {content.whatsappLabel}
        </a>

        <div className="mt-20 border-t border-[#4a6a8f] pt-8">
          <p
            className="text-2xl font-light italic text-[#c9a96e]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Sol &amp; Gabriel
          </p>
          <p
            className="mt-2 text-xs uppercase tracking-widest text-[#AEBDCF]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Nov 14 · 2026 · Lima
          </p>
        </div>
      </div>
    </section>
  );
}
