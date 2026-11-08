import type { Metadata } from "next";
import FindTable from "./FindTable";

export const metadata: Metadata = { title: "Tu mesa · Sol & Gabriel", robots: { index: false, follow: false } };

export default function Mesa() {
  return (
    <main className="min-h-screen bg-[#faf8f4] px-6 pb-16 pt-14">
      <p className="text-center text-xs uppercase tracking-[0.3em] text-[#9a8066]" style={{ fontFamily: "var(--font-body)" }}>
        Sol & Gabriel
      </p>
      <h1 className="mt-3 text-center text-4xl font-light text-[#2c2c2c]" style={{ fontFamily: "var(--font-heading)" }}>
        Encuentra tu mesa
      </h1>
      <FindTable />
    </main>
  );
}
