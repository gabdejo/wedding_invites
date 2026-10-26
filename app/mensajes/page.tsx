import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Mensajes", robots: { index: false, follow: false } };

type Card = { name: string; text: string; tag?: string; date?: string };

function Wall({ title, cards }: { title: string; cards: Card[] }) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <h2
        className="mb-3 text-center text-3xl font-light text-[#2c2c2c]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title} <span className="text-[#9a8066]">· {cards.length}</span>
      </h2>
      <div className="mx-auto mb-10 h-px w-12 bg-[#c9a96e]" />
      <div className="grid gap-5 sm:grid-cols-2">
        {cards.map((c, i) => (
          <article key={i} className="rounded-sm bg-white p-6 shadow-sm">
            <p
              className="mb-4 text-xl italic leading-relaxed text-[#2c2c2c]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              “{c.text}”
            </p>
            <p className="text-sm text-[#5D7B9F]" style={{ fontFamily: "var(--font-body)" }}>
              — {c.name}
            </p>
            {(c.tag || c.date) && (
              <p className="mt-1 text-xs text-[#9a8066]" style={{ fontFamily: "var(--font-body)" }}>
                {[c.tag, c.date].filter(Boolean).join(" · ")}
              </p>
            )}
          </article>
        ))}
        {!cards.length && <p className="text-center text-[#7a7a7a] sm:col-span-2">Aún no hay mensajes</p>}
      </div>
    </section>
  );
}

export default async function Mensajes({ searchParams }: { searchParams: Promise<{ key?: string }> }) {
  const { key } = await searchParams;
  if (!process.env.MENSAJES_KEY || key !== process.env.MENSAJES_KEY) notFound();

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string
  );
  const [rsvps, gifts] = await Promise.all([
    db.from("rsvps").select("*").neq("notes", "").not("notes", "is", null).order("created_at", { ascending: false }),
    db.from("gifts").select("*").neq("dedication", "").not("dedication", "is", null).order("created_at", { ascending: false }),
  ]);

  const fmt = (d?: string) => (d ? new Date(d).toLocaleDateString("es-PE", { day: "numeric", month: "short" }) : undefined);

  const guestCards: Card[] = (rsvps.data ?? []).map((r) => ({
    name: r.name,
    text: r.notes,
    tag: r.attending ? "Asistirá" : "No podrá asistir",
    date: fmt(r.created_at),
  }));
  const giftCards: Card[] = (gifts.data ?? []).map((g) => ({
    name: g.buyer_name,
    text: g.dedication,
    tag: g.items,
    date: fmt(g.created_at),
  }));

  return (
    <main className="min-h-screen bg-[#faf8f4] pb-16">
      <header className="px-6 pt-16 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[#9a8066]" style={{ fontFamily: "var(--font-body)" }}>
          Sol & Gabriel
        </p>
      </header>
      {(rsvps.error || gifts.error) && (
        <p className="px-6 pt-6 text-center text-sm text-red-700">
          {rsvps.error?.message ?? gifts.error?.message}
        </p>
      )}
      <Wall title="Mensajes de nuestros invitados" cards={guestCards} />
      <Wall title="Dedicatorias de regalos" cards={giftCards} />
    </main>
  );
}
