import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Seating from "./Seating";
import { loadSeated } from "./seated";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Mesas", robots: { index: false, follow: false } };

export default async function Mesas({ searchParams }: { searchParams: Promise<{ key?: string }> }) {
  const { key } = await searchParams;
  if (!process.env.MENSAJES_KEY || key !== process.env.MENSAJES_KEY) notFound();

  const { data, error } = await loadSeated();

  return (
    <main className="min-h-screen bg-[#faf8f4] pb-16">
      <header className="px-6 pt-16 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[#9a8066]" style={{ fontFamily: "var(--font-body)" }}>
          Sol & Gabriel · Mesas
        </p>
      </header>
      {error && <p className="px-6 pt-6 text-center text-sm text-red-700">{error.message}</p>}
      <Seating secret={key as string} initial={data} />
    </main>
  );
}
