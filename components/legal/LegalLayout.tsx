import Link from "next/link";
import type { ReactNode } from "react";

export default function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#faf8f4] px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/#registry"
          className="mb-8 inline-block text-xs font-medium uppercase tracking-widest text-[#9a8066] hover:underline"
          style={{ fontFamily: "var(--font-body)" }}
        >
          ← Volver a la mesa de regalos
        </Link>
        <h1
          className="mb-3 text-3xl font-medium text-[#2c2c2c] sm:text-4xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h1>
        <div className="mb-8 h-px w-12 bg-[#c9a96e]" />
        <div
          className="space-y-4 text-sm leading-7 text-[#444444] [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-medium [&_h2]:text-[#2c2c2c] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {children}
        </div>
      </div>
    </main>
  );
}
