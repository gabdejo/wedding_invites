import type { Metadata } from "next";
import { Libre_Bodoni, Manrope } from "next/font/google";
import Script from "next/script";
import MusicPlayer from "@/components/MusicPlayer";
import "./globals.css";

const libreBodoni = Libre_Bodoni({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Sol & Gabriel — Nov 14, 2026",
  description: "We're getting married and want you to celebrate with us.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${libreBodoni.variable} ${manrope.variable}`}>
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
