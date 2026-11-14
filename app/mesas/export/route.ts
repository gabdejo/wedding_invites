import ExcelJS from "exceljs";
import { loadSeated } from "../seated";
import { TABLES } from "../venue";

export const dynamic = "force-dynamic";

const RED = "FFA61E00";
const ORANGE = "FFCC4125";
const header = (c: ExcelJS.Cell, argb: string) => {
  c.fill = { type: "pattern", pattern: "solid", fgColor: { argb } };
  c.font = { bold: true, color: { argb: "FFFFFFFF" } };
  c.alignment = { horizontal: "center" };
};

// "Eduardo Neyra" -> "ED N." style: first 3 letters of the first name (whole name if ≤4) + last initial.
const abbr = (full: string) => {
  const [first = "", ...rest] = full.trim().toUpperCase().split(/\s+/);
  const last = rest[rest.length - 1];
  return `${first.length <= 4 ? first : first.slice(0, 3)}${last ? ` ${last[0]}.` : ""}`;
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get("key");
  if (!process.env.MENSAJES_KEY || key !== process.env.MENSAJES_KEY) return new Response("Not found", { status: 404 });

  const { data } = await loadSeated();
  const people = data.map((g) => ({ ...g, label: g.unnamed ? `ACOMPAÑANTE ${abbr(g.group)}` : g.name.toUpperCase() }));
  const wb = new ExcelJS.Workbook();

  // Sheet 1: tables, two per row like the paper plan.
  const ws = wb.addWorksheet("Distribución de mesas");
  ws.columns = [{ width: 5 }, { width: 34 }, { width: 7 }, { width: 3 }, { width: 5 }, { width: 34 }, { width: 7 }];
  ws.mergeCells("A1:G1");
  ws.getCell("A1").value = "DISTRIBUCIÓN DE MESAS";
  header(ws.getCell("A1"), RED);
  ws.getRow(1).height = 28;
  let row = 3;
  for (let i = 0; i < TABLES.length; i += 2) {
    const pair = TABLES.slice(i, i + 2);
    const rows = Math.max(...pair.map((t) => t.cap));
    pair.forEach((t, j) => {
      const c0 = j * 4 + 1;
      ws.mergeCells(row, c0, row, c0 + 2);
      const h = ws.getCell(row, c0);
      h.value = `MESA ${t.n}  - ${t.long ? "RECTANGULAR" : "REDONDA"}`;
      header(h, ORANGE);
      const seated = people.filter((p) => p.table_no === t.n);
      for (let k = 0; k < rows; k++) {
        const p = seated[k];
        ws.getRow(row + 1 + k).getCell(c0).value = k + 1;
        ws.getRow(row + 1 + k).getCell(c0 + 1).value = p?.label ?? null;
        ws.getRow(row + 1 + k).getCell(c0 + 2).value = p ? t.n : null;
        for (let c = c0; c <= c0 + 2; c++) {
          ws.getRow(row + 1 + k).getCell(c).border = { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } };
          if (c !== c0 + 1) ws.getRow(row + 1 + k).getCell(c).alignment = { horizontal: "center" };
        }
      }
    });
    row += rows + 3;
  }

  // Sheet 2: alphabetical list of invitees; "Pases extra" = seated plus-ones with no name yet.
  const ls = wb.addWorksheet("Lista alfabética");
  ls.columns = [{ header: "Invitado", width: 36 }, { header: "Pases extra (sin nombre)", width: 24 }, { header: "Mesa", width: 8 }];
  ls.getRow(1).eachCell((c) => header(c, RED));
  const extra = new Map<string, number>();
  for (const p of people) if (p.unnamed) extra.set(p.group, (extra.get(p.group) ?? 0) + 1);
  const list = people.filter((p) => !p.unnamed).map((p) => ({ name: p.label, group: p.group, table: p.table_no }));
  // invitations made only of unnamed plus-ones still need a line
  for (const g of extra.keys()) if (!list.some((p) => p.group === g)) list.push({ name: g.toUpperCase(), group: g, table: people.find((p) => p.group === g)?.table_no ?? null });
  const given = new Set<string>(); // the extras go on the first row of each invitation
  list.sort((a, b) => a.name.localeCompare(b.name, "es"));
  for (const p of list) {
    const n = given.has(p.group) ? undefined : extra.get(p.group);
    given.add(p.group);
    ls.addRow([p.name, n ?? null, p.table]);
  }

  const file = url.searchParams.get("type") === "lista" ? "lista" : "mesas";
  wb.removeWorksheet(file === "lista" ? ws.id : ls.id);
  const out = await wb.xlsx.writeBuffer();
  return new Response(out as ArrayBuffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${file}.xlsx"`,
    },
  });
}
