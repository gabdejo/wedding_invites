"use client";

import { useEffect, useState } from "react";
import { findGuest, tableGuests } from "./actions";
import { Backdrop, TABLES, TableDetail, GUEST_VIEWBOX } from "../mesas/venue";

type Match = { id: string; name: string; table_no: number | null };

const font = { fontFamily: "var(--font-body)" };

export default function FindTable() {
  const [q, setQ] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);
  const [picked, setPicked] = useState<Match | null>(null);
  const [mates, setMates] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (picked) return;
    if (q.trim().length < 3) return;
    let stale = false;
    const t = setTimeout(async () => {
      const r = await findGuest(q);
      if (!stale) setMatches(r);
    }, 250);
    return () => {
      stale = true;
      clearTimeout(t);
    };
  }, [q, picked]);

  async function pick(m: Match) {
    setPicked(m);
    setMates(m.table_no ? await tableGuests(m.table_no) : []);
  }

  const n = picked?.table_no ?? null;

  return (
    <div className="mx-auto mt-8 max-w-md" style={font}>
      <input
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setPicked(null);
        }}
        placeholder="Escribe tu nombre"
        autoComplete="off"
        className="w-full rounded-sm border border-[#e5dfd3] bg-white px-4 py-3 text-base text-[#2c2c2c] outline-none focus:border-[#9BAED4]"
      />

      {!picked && (
        <ul className="mt-3 space-y-2">
          {(q.trim().length >= 3 ? matches : []).map((m) => (
            <li key={m.id}>
              <button onClick={() => pick(m)} className="w-full rounded-sm border border-[#e5dfd3] bg-white px-4 py-3 text-left text-[#2c2c2c]">
                {m.name}
              </button>
            </li>
          ))}
          {q.trim().length >= 3 && !matches.length && (
            <li className="text-center text-sm text-[#7a7a7a]">No te encontramos. Pregunta en recepción y te ayudamos.</li>
          )}
        </ul>
      )}

      {picked && (
        <div className="mt-8">
          {n ? (
            <>
              <p className="text-center text-sm text-[#7a7a7a]">{picked.name}</p>
              <p className="mt-1 text-center text-6xl font-light text-[#5D7B9F]" style={{ fontFamily: "var(--font-heading)" }}>
                Mesa {n}
              </p>
              <svg viewBox={GUEST_VIEWBOX} className="mt-6 w-full rounded-sm bg-[#e8eedb]">
                <Backdrop hideStage />
                {TABLES.map((t) => {
                  const mine = t.n === n;
                  const common = { fill: mine ? "#5D7B9F" : "#ffffff", stroke: mine ? "#5D7B9F" : "#9a8066", strokeWidth: mine ? 4 : 2 };
                  return (
                    <g key={t.n}>
                      {t.long ? <rect x={t.x - 22} y={t.y - 45} width={44} height={90} rx={4} {...common} /> : <circle cx={t.x} cy={t.y} r={27} {...common} />}
                      <text x={t.x} y={t.y + 5} textAnchor="middle" fontSize={16} fontWeight={600} fill={mine ? "#ffffff" : "#2c2c2c"}>{t.n}</text>
                    </g>
                  );
                })}
              </svg>
              <div className="mt-4">
                <TableDetail table={TABLES[n - 1]} seated={mates} highlight={picked.id} />
              </div>
              <p className="mt-2 text-center text-sm text-[#7a7a7a]">{mates.map((p) => p.name).join(" · ")}</p>
            </>
          ) : (
            <p className="text-center text-[#2c2c2c]">
              {picked.name}, aún no tienes mesa asignada. Pregunta en recepción y te ayudamos.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
