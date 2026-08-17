import type { Metadata } from "next";
import { Bodoni_Moda, Cormorant_Garamond, Inter, Libre_Bodoni, Manrope, Montserrat } from "next/font/google";
import Script from "next/script";
import MusicPlayer from "@/components/MusicPlayer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-body-inter",
  subsets: ["latin"],
});

// Libre Bodoni / Manrope: kept only for "Nuestra historia de Amor" (--font-heading-story
// below, pinned on purpose). --font-heading-new / --font-body-new (what OurStorySection's
// other text actually uses) now point at the Bodoni Moda / Montserrat preview instead —
// see the style block below.
const libreBodoni = Libre_Bodoni({
  variable: "--font-heading-libre-bodoni",
  subsets: ["latin"],
  // "variable" (one file, full weight range) instead of discrete weights — Google's CDN
  // was 404ing on the specific static-weight file hashes Next's font manifest requested.
  weight: "variable",
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-body-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Site-wide body/heading preview — also what --font-heading-new / --font-body-new
// resolve to now (see style block below). See PREVIEW_NEW_FONTS below.
const bodoniModa = Bodoni_Moda({
  variable: "--font-heading-preview",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-body-preview",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Flip this to preview the whole site (minus the texts pinned above) in
// Bodoni Moda / Montserrat instead of Cormorant / Inter.
const PREVIEW_NEW_FONTS = true;

export const metadata: Metadata = {
  title: "Sol & Gabriel — Nov 14, 2026",
  description: "We're getting married and want you to celebrate with us.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${inter.variable} ${libreBodoni.variable} ${manrope.variable} ${bodoniModa.variable} ${montserrat.variable}`}
      style={{
        "--font-heading": PREVIEW_NEW_FONTS ? "var(--font-heading-preview)" : "var(--font-heading-cormorant)",
        "--font-body": PREVIEW_NEW_FONTS ? "var(--font-body-preview)" : "var(--font-body-inter)",
        // OurStorySection's milestone titles/body/eyebrow (not its "Nuestra historia de
        // Amor" heading, pinned separately below) — now the Bodoni Moda / Montserrat preview.
        "--font-heading-new": "var(--font-heading-preview)",
        "--font-body-new": "var(--font-body-preview)",
        // Itinerary events (time + name, not the "Itinerario" title) — own group so
        // their font can be swapped independently. Aliases the defaults for now.
        "--font-heading-itinerary": "var(--font-heading-cormorant)",
        "--font-body-itinerary": "var(--font-body-preview)",
        // Two texts pinned to a specific typeface on purpose, independent of the
        // --font-heading toggle above (won't move if PREVIEW_NEW_FONTS flips).
        "--font-hero": "var(--font-heading-cormorant)", // "Sol & Gabriel" (HeroSection)
        "--font-heading-story": "var(--font-heading-libre-bodoni)", // "Nuestra historia de Amor" (OurStorySection)
      } as React.CSSProperties}
    >
      <body
        className="bg-[#faf8f4] text-[#2c2c2c]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {children}
        <MusicPlayer />
        <Script src="https://checkout.culqi.com/js/v4" strategy="lazyOnload" />
      </body>
    </html>
  );
}
