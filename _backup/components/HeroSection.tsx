import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["hero"] };

export default function HeroSection({ content }: Props) {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
      style={{ background: "linear-gradient(135deg, #fdf9f3 0%, #f5ece0 50%, #fdf9f3 100%)" }}
    >
      <div className="flex flex-col items-center gap-4">
        <p
          className="text-sm uppercase tracking-[0.3em] text-[#9a8066]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {content.tagline}
        </p>

        <div className="flex flex-col items-center gap-1" style={{ fontFamily: "var(--font-heading)" }}>
          <h1 className="text-7xl font-light leading-none tracking-wide text-[#2c2c2c] sm:text-8xl md:text-9xl">
            Sol
          </h1>
          <span className="text-5xl font-light italic text-[#c9a96e] sm:text-6xl">&amp;</span>
          <h1 className="text-7xl font-light leading-none tracking-wide text-[#2c2c2c] sm:text-8xl md:text-9xl">
            Gabriel
          </h1>
        </div>

        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="h-px w-12 bg-[#c9a96e]" />
          <p
            className="text-lg font-light uppercase tracking-widest text-[#6b5744]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            14 · Nov · 2026
          </p>
          <div className="h-px w-12 bg-[#c9a96e]" />
        </div>

        <p className="mt-2 tracking-wide text-[#9a8066]" style={{ fontFamily: "var(--font-body)" }}>
          Lima, Perú
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[#b09880]">
        <span className="text-xs uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-body)" }}>
          {content.scroll}
        </span>
        <div className="h-8 w-px bg-[#c9a96e] opacity-60" />
      </div>
    </section>
  );
}
