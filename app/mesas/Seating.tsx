"use client";

import { useState } from "react";
import { setTable } from "./actions";

type Guest = { id: string; group: string; side: string | null; cat: string | null; name: string; table_no: number | null };

// Coordinates are in the venue sketch's pixel space (cropped by the viewBox below).
// Capacities are guesses — adjust to the real tables.
const ROUND = 10;
const LONG = 10;
const TABLES = [
  ...[[735, 228], [735, 332], [985, 228], [985, 332]].map(([x, y]) => ({ x, y, long: true })),
  ...[[645, 210], [645, 293], [645, 375], [1075, 210], [1075, 293], [1075, 375],
      [690, 445], [775, 432], [640, 515], [745, 508], [700, 570],
      [945, 432], [1030, 445], [975, 507], [1078, 515], [1020, 572]].map(([x, y]) => ({ x, y, long: false })),
].map((t, i) => ({ ...t, n: i + 1, cap: t.long ? LONG : ROUND }));

const font = { fontFamily: "var(--font-body)" };

function FilterRow({ options, value, onChange }: { options: string[]; value: string | null; onChange: (v: string | null) => void }) {
  if (!options.length) return null;
  return (
    <div className="mb-3 flex flex-wrap gap-2" style={font}>
      {[null, ...options].map((o) => (
        <button
          key={o ?? "all"}
          onClick={() => onChange(o)}
          className={`rounded-full border px-3 py-1 text-xs ${
            value === o ? "border-[#5D7B9F] bg-[#5D7B9F] text-white" : "border-[#e5dfd3] bg-white text-[#7a7a7a]"
          }`}
        >
          {o ?? "Todos"}
        </button>
      ))}
    </div>
  );
}

type Table = (typeof TABLES)[number];

function TableDetail({ table, seated, onRemove }: { table: Table; seated: Guest[]; onRemove: (id: string) => void }) {
  const n = Math.max(table.cap, seated.length);
  const half = Math.ceil(n / 2);
  const seats = Array.from({ length: n }, (_, i) => {
    if (!table.long) {
      const a = (i / n) * 2 * Math.PI - Math.PI / 2;
      const [c, s] = [Math.cos(a), Math.sin(a)];
      return { x: 300 + 90 * c, y: 170 + 90 * s, lx: 300 + 114 * c, ly: 170 + 114 * s + 5, anchor: c > 0.3 ? "start" : c < -0.3 ? "end" : "middle" };
    }
    const top = i < half;
    const k = top ? i : i - half;
    const x = 60 + ((k + 0.5) * 480) / (top ? half : n - half);
    return { x, y: top ? 124 : 216, lx: x, ly: top ? 98 : 252, anchor: "middle" };
  });
  const max = table.long ? 13 : 20;
  return (
    <svg viewBox="0 0 600 340" className="w-full">
      {table.long ? (
        <rect x={60} y={140} width={480} height={60} rx={6} fill="#f5f0e8" stroke="#9a8066" strokeWidth={2} />
      ) : (
        <circle cx={300} cy={170} r={60} fill="#f5f0e8" stroke="#9a8066" strokeWidth={2} />
      )}
      <text x={300} y={177} textAnchor="middle" fontSize={22} fontWeight={600} fill="#9a8066">{table.n}</text>
      {seats.map((p, i) => {
        const g = seated[i];
        return (
          <g key={i} onClick={g ? () => onRemove(g.id) : undefined} className={g ? "cursor-pointer" : ""}>
            {g && <title>{g.name} (toca para quitar)</title>}
            <circle cx={p.x} cy={p.y} r={14} fill={g ? "#5D7B9F" : "#fff"} stroke={g ? "#5D7B9F" : "#c9c2b4"} strokeDasharray={g ? undefined : "3 3"} />
            {g && (
              <text x={p.lx} y={p.ly} textAnchor={p.anchor as "start" | "middle" | "end"} fontSize={13} fill="#2c2c2c">
                {g.name.length > max ? g.name.slice(0, max - 1) + "…" : g.name}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default function Seating({ secret, initial }: { secret: string; initial: Guest[] }) {
  const [guests, setGuests] = useState(initial);
  const [split, setSplit] = useState(false); // pick individuals instead of whole invitations
  const [side, setSide] = useState<string | null>(null); // guest_side filter, null = all
  const [cat, setCat] = useState<string | null>(null); // guest_group filter
  const [tab, setTab] = useState<"free" | "tables">("free");
  const [open, setOpen] = useState<number | null>(null); // table whose occupants are shown

  const used = (n: number) => guests.filter((g) => g.table_no === n).length;
  const sides = [...new Set(guests.map((g) => g.side).filter((x): x is string => !!x))].sort();
  const cats = [...new Set(guests.map((g) => g.cat).filter((x): x is string => !!x))].sort();
  const unassigned = guests.filter((g) => g.table_no === null && (!side || g.side === side) && (!cat || g.cat === cat));

  const groups = [...new Set(unassigned.map((g) => g.group))];

  async function assign(ids: string[], n: number | null) {
    const prev = guests;
    setGuests(guests.map((g) => (ids.includes(g.id) ? { ...g, table_no: n } : g)));
    if (!(await setTable(secret, ids, n))) {
      setGuests(prev);
      alert("No se pudo guardar el cambio");
    }
  }

  const drop = (n: number) => (e: React.DragEvent) => {
    e.preventDefault();
    assign(JSON.parse(e.dataTransfer.getData("text/plain")), n);
    setOpen(n);
  };
  const allow = (e: React.DragEvent) => e.preventDefault();

  const chip = (g: Guest, active: boolean, onClick: () => void, dragIds: string[] = [g.id]) => (
    <button
      key={g.id}
      onClick={onClick}
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text/plain", JSON.stringify(dragIds))}
      className={`rounded-sm border px-3 py-1.5 text-left text-sm ${
        active ? "border-[#5D7B9F] bg-[#5D7B9F] text-white" : "border-[#e5dfd3] bg-white text-[#2c2c2c]"
      }`}
      style={font}
    >
      {g.name}
    </button>
  );

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[1fr_320px]">
      <div>
      <svg viewBox="590 60 550 650" className="w-full rounded-sm bg-[#e8eedb]">
        <rect x={760} y={65} width={210} height={75} fill="#f5f0e8" stroke="#c9a96e" />
        <text x={865} y={108} textAnchor="middle" fontSize={16} fill="#9a8066">Escenario</text>
        <rect x={773} y={190} width={175} height={200} fill="#ffffff" stroke="#c9a96e" />
        <text x={860} y={295} textAnchor="middle" fontSize={16} fill="#9a8066">Pista</text>
        <circle cx={862} cy={478} r={45} fill="#ffffff" stroke="#c9a96e" />
        <rect x={600} y={155} width={520} height={550} fill="none" stroke="#c9a96e" strokeDasharray="6 6" />
        {TABLES.map((t) => {
          const u = used(t.n);
          const fill = u > t.cap ? "#f3c9c9" : u === t.cap ? "#cfe0cf" : "#ffffff";
          const stroke = open === t.n ? "#5D7B9F" : "#9a8066";
          return (
            <g key={t.n} onClick={() => setOpen(t.n)} onDragOver={allow} onDrop={drop(t.n)} className="cursor-pointer">
              <title>{guests.filter((g) => g.table_no === t.n).map((g) => g.name).join(", ") || "Vacía"}</title>
              {t.long ? (
                <rect x={t.x - 22} y={t.y - 45} width={44} height={90} rx={4} fill={fill} stroke={stroke} strokeWidth={open === t.n ? 4 : 2} />
              ) : (
                <circle cx={t.x} cy={t.y} r={27} fill={fill} stroke={stroke} strokeWidth={open === t.n ? 4 : 2} />
              )}
              <text x={t.x} y={t.y - 2} textAnchor="middle" fontSize={16} fontWeight={600} fill="#2c2c2c">{t.n}</text>
              <text x={t.x} y={t.y + 14} textAnchor="middle" fontSize={12} fill="#7a7a7a">{u}/{t.cap}</text>
            </g>
          );
        })}
      </svg>
      <div className="mt-3" onDragOver={allow} onDrop={open ? drop(open) : undefined}>
        {open ? (
          <>
            <TableDetail table={TABLES[open - 1]} seated={guests.filter((g) => g.table_no === open)} onRemove={(id) => assign([id], null)} />
          </>
        ) : (
          <p className="text-sm text-[#7a7a7a]" style={font}>Toca una mesa para ver quién se sienta ahí.</p>
        )}
      </div>
      </div>

      <aside className="lg:sticky lg:top-4 lg:self-start">
        <div className="mb-4 flex border-b border-[#e5dfd3]" style={font}>
          {([["free", `Sin mesa · ${unassigned.length}`], ["tables", "Mesas"]] as const).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`-mb-px flex-1 border-b-2 py-2 text-sm ${tab === k ? "border-[#5D7B9F] text-[#5D7B9F]" : "border-transparent text-[#7a7a7a]"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="max-h-[70vh] overflow-y-auto pr-1">
        {tab === "free" && (
        <div>
          <p className="mb-3 text-xs text-[#7a7a7a]" style={font}>Toca una mesa y luego toca una invitación para sentarla ahí (o arrástrala).</p>
          <FilterRow options={sides} value={side} onChange={setSide} />
          <FilterRow options={cats} value={cat} onChange={setCat} />
          <label className="mb-3 flex items-center gap-2 text-sm text-[#2c2c2c]" style={font}>
            <input type="checkbox" checked={split} onChange={(e) => setSplit(e.target.checked)} />
            Separar (elegir personas sueltas)
          </label>
          <div className="flex flex-wrap gap-2">
            {groups.map((grp) => {
              const members = unassigned.filter((g) => g.group === grp);
              const idsOf = (g: Guest) => (split ? [g.id] : members.map((m) => m.id));
              const click = (g: Guest) => {
                if (!open) return alert("Primero toca una mesa");
                assign(idsOf(g), open);
              };
              const chips = members.map((g) => chip(g, false, () => click(g), idsOf(g)));
              return members.length === 1 ? (
                chips
              ) : (
                <div key={grp} className="flex w-full flex-wrap gap-2 border-l-2 border-[#c9a96e] pl-3">
                  {chips}
                </div>
              );
            })}
            {!unassigned.length && <p className="text-sm text-[#7a7a7a]">Todos asignados</p>}
          </div>
        </div>
        )}
        {tab === "tables" && (
        <div>
          <div className="space-y-3">
            {TABLES.filter((t) => used(t.n) || open === t.n).map((t) => (
              <div
                key={t.n}
                onClick={() => setOpen(t.n)}
                onDragOver={allow}
                onDrop={drop(t.n)}
                className={`rounded-sm border bg-white p-3 ${open === t.n ? "border-[#5D7B9F]" : "border-[#e5dfd3]"}`}
              >
                <p className="mb-2 text-xs uppercase tracking-wider text-[#9a8066]" style={font}>
                  Mesa {t.n} · {used(t.n)}/{t.cap}
                </p>
                <div className="flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
                  {guests.filter((g) => g.table_no === t.n).map((g) => chip(g, false, () => assign([g.id], null)))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-[#7a7a7a]" style={font}>
            Arrastra un nombre a otra mesa para moverlo, o tócalo para quitarlo.
          </p>
        </div>
        )}
        </div>
      </aside>
    </div>
  );
}
