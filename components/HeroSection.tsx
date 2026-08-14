import type { SiteContent } from "@/content/types";

type Props = { content: SiteContent["hero"] };

export default function HeroSection({ content }: Props) {
  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center bg-neutral-900">
      <video
        className="absolute inset-0 h-full w-full object-cover md:hidden"
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <video
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
        src="/videos/hero-wide.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-1" style={{ fontFamily: "var(--font-heading)" }}>
          <h1 className="text-7xl font-light leading-none tracking-wide text-white sm:text-8xl md:text-9xl">
            Sol
          </h1>
          <span className="text-5xl font-light italic text-white/70 sm:text-6xl">&amp;</span>
          <h1 className="text-7xl font-light leading-none tracking-wide text-white sm:text-8xl md:text-9xl">
            Gabriel
          </h1>
        </div>

        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="h-px w-12 bg-white/60" />
          <div
            className="flex items-center text-lg font-light uppercase tracking-widest text-white/90"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span className="w-20 text-right">14 ·</span>
            <span className="px-2">Nov</span>
            <span className="w-20 text-left">· 2026</span>
          </div>
          <div className="h-px w-12 bg-white/60" />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60">
        <span className="text-xs uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-body)" }}>
          {content.scroll}
        </span>
        <div className="h-8 w-px bg-white/40" />
      </div>
    </section>
  );
}
