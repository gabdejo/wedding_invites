"use server";

import { loadSeated } from "../mesas/seated";

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// Public lookup: needs >= 3 chars and returns few matches, so it can't be used to dump the guest list.
export async function findGuest(q: string) {
  const query = norm(q.trim());
  if (query.length < 3) return [];
  const { data } = await loadSeated();
  return data
    .filter((p) => norm(p.name).includes(query))
    .slice(0, 6)
    .map((p) => ({ id: p.id, name: p.name, table_no: p.table_no }));
}

export async function tableGuests(n: number) {
  const { data } = await loadSeated();
  return data.filter((p) => p.table_no === n).map((p) => ({ id: p.id, name: p.name }));
}
