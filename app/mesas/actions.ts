"use server";

import { createClient } from "@supabase/supabase-js";

export async function setTable(key: string, personIds: string[], tableNo: number | null) {
  if (!process.env.MENSAJES_KEY || key !== process.env.MENSAJES_KEY) return false;
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string
  );
  const { error } = await db.from("guest_persons").update({ table_no: tableNo }).in("id", personIds);
  return !error;
}
