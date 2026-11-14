import { createClient } from "@supabase/supabase-js";

export type Seated = {
  id: string;
  group: string;
  side: string | null;
  cat: string | null;
  name: string;
  unnamed: boolean; // plus-one whose name is not known yet
  table_no: number | null;
};

// Confirmed attendees only: latest RSVP per invitation wins, and only the first `guests` persons are seated.
export async function loadSeated(): Promise<{ data: Seated[]; error: { message: string } | null }> {
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
    return [{ id: p.id, group: inv?.full_name ?? "", side: (inv?.guest_side as string | null) ?? null, cat: (inv?.guest_group as string | null) ?? null, name: p.full_name ?? `Acompañante ${p.person_number}`, unnamed: !p.full_name, table_no: p.table_no as number | null }];
  });
  return { data, error };
}
