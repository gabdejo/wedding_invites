// Venue layout shared by the admin (/mesas) and the guest page (/mesa).

// Coordinates are in the venue sketch's pixel space (cropped by the viewBox in each page).
// Capacities are guesses — adjust to the real tables.
const ROUND = 10;
const LONG = 10;
export const TABLES = [
  ...[[735, 228], [735, 332], [985, 228], [985, 332]].map(([x, y]) => ({ x, y, long: true })),
  ...[[645, 210], [645, 293], [645, 375], [1075, 210], [1075, 293], [1075, 375],
      [690, 445], [775, 432], [640, 515], [745, 508], [700, 570],
      [945, 432], [1030, 445], [975, 507], [1078, 515], [1020, 572]].map(([x, y]) => ({ x, y, long: false })),
].map((t, i) => ({ ...t, n: i + 1, cap: t.long ? LONG : ROUND }));

export type Table = (typeof TABLES)[number];

export const VENUE_VIEWBOX = "590 60 550 650";
export const GUEST_VIEWBOX = "590 145 550 570"; // no stage

// Static shapes of the sketch. The stage is a surprise, so the guest page hides it.
export function Backdrop({ hideStage = false }: { hideStage?: boolean }) {
  return (
    <>
      {!hideStage && (
        <>
          <rect x={760} y={65} width={210} height={75} fill="#f5f0e8" stroke="#c9a96e" />
          <text x={865} y={108} textAnchor="middle" fontSize={16} fill="#9a8066">Escenario</text>
        </>
      )}
      <rect x={773} y={190} width={175} height={200} fill="#ffffff" stroke="#c9a96e" />
      <text x={860} y={295} textAnchor="middle" fontSize={16} fill="#9a8066">Pista</text>
      <circle cx={862} cy={478} r={45} fill="#ffffff" stroke="#c9a96e" />
      <rect x={600} y={155} width={520} height={550} fill="none" stroke="#c9a96e" strokeDasharray="6 6" />
    </>
  );
}

export function TableDetail({
  table,
  seated,
  onRemove,
  highlight,
}: {
  table: Table;
  seated: { id: string; name: string }[];
  onRemove?: (id: string) => void;
  highlight?: string; // id of the seat to mark as "you"
}) {
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
        const me = !!g && g.id === highlight;
        return (
          <g key={i} onClick={g && onRemove ? () => onRemove(g.id) : undefined} className={g && onRemove ? "cursor-pointer" : ""}>
            {g && onRemove && <title>{g.name} (toca para quitar)</title>}
            <circle cx={p.x} cy={p.y} r={14} fill={g ? "#5D7B9F" : "#fff"} stroke={me ? "#2c2c2c" : g ? "#5D7B9F" : "#c9c2b4"} strokeWidth={me ? 4 : 1} strokeDasharray={g ? undefined : "3 3"} />
            {g && (
              <text x={p.lx} y={p.ly} textAnchor={p.anchor as "start" | "middle" | "end"} fontSize={13} fontWeight={me ? 700 : 400} fill="#2c2c2c">
                {g.name.length > max ? g.name.slice(0, max - 1) + "…" : g.name}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
