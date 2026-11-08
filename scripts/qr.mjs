// Generates the printable QR for the seating page: node scripts/qr.mjs
// Output: qr/mesa.svg (vector, for print) and qr/mesa.png (2000px).
import QRCode from "qrcode";
import { mkdirSync } from "node:fs";

const url = process.argv[2] ?? "https://solygabriel.com/mesa";
mkdirSync("qr", { recursive: true });
const opts = { errorCorrectionLevel: "H", margin: 4 };
await QRCode.toFile("qr/mesa.svg", url, { ...opts, type: "svg" });
await QRCode.toFile("qr/mesa.png", url, { ...opts, width: 2000 });
console.log("QR ->", url);
