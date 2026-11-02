import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Seating from "./Seating";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Mesas", robots: { index: false, follow: false } };

export default async function Mesas({ searchParams }: { searchParams: Promise<{ key?: string }> }) {
  const { key } = await searchParams;
  if (!process.env.MENSAJES_KEY || key !== process.env.MENSAJES_KEY) notFound();

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string
  );
  const [rsvps, persons, order] = await Promise.all([
    db.from("rsvps").select("guest_id, attending, guests").order("created_at", { ascending: false }),
    db
      .from("guest_persons")
      .select("id, guest_id, full_name, person_number, table_no, guests(full_name, guest_side, guest_group)")
      .order("person_number"),
    db.from("guests").select("id").order("whatsapp_sent_at", { nullsFirst: false }).order("created_at"),
  ]);
  const error = rsvps.error ?? persons.error ?? order.error;
  const rank = new Map((order.data ?? []).map((g, i) => [g.id, i]));

  // Latest RSVP per invitation wins; seat only the first `guests` persons of confirmed ones.
  const latest = new Map<string, { attending: boolean; guests: number }>();
  for (const r of rsvps.data ?? []) if (r.guest_id && !latest.has(r.guest_id)) latest.set(r.guest_id, r);
  const seen = new Map<string, number>();
  const sorted = [...(persons.data ?? [])].sort(
    (a, b) => (rank.get(a.guest_id) ?? 0) - (rank.get(b.guest_id) ?? 0) || (a.person_number ?? 0) - (b.person_number ?? 0)
  );
  const data = sorted.flatMap((p) => {
    const r = latest.get(p.guest_id);
    const n = (seen.get(p.guest_id) ?? 0) + 1;
    seen.set(p.guest_id, n);
    if (!r?.attending || n > r.guests) return [];
    const inv = Array.isArray(p.guests) ? p.guests[0] : p.guests;
    return [{ id: p.id, group: inv?.full_name ?? "", side: (inv?.guest_side as string | null) ?? null, cat: (inv?.guest_group as string | null) ?? null, name: p.full_name ?? `Acompañante ${p.person_number}`, table_no: p.table_no as number | null }];
  });

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
