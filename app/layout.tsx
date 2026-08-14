import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Libre_Bodoni, Manrope } from "next/font/google";
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

// Font trial: OurStorySection is permanently pinned to these via
// --font-heading-new / --font-body-new. The rest of the site follows
// PREVIEW_NEW_FONTS below.
const libreBodoni = Libre_Bodoni({
  variable: "--font-heading-new",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-body-new",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Flip this to preview the whole site (minus OurStorySection, which is
// pinned above) in Libre Bodoni / Manrope instead of Cormorant / Inter.
const PREVIEW_NEW_FONTS = false;

export const metadata: Metadata = {
  title: "Sol & Gabriel — Nov 14, 2026",
  description: "We're getting married and want you to celebrate with us.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${inter.variable} ${libreBodoni.variable} ${manrope.variable}`}
      style={{
        "--font-heading": PREVIEW_NEW_FONTS ? "var(--font-heading-new)" : "var(--font-heading-cormorant)",
        "--font-body": PREVIEW_NEW_FONTS ? "var(--font-body-new)" : "var(--font-body-inter)",
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
