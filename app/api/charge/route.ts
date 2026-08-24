import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token, amount, email, description } = await req.json();

  // Culqi requires description to be 5-80 chars.
  const safeDescription = (description ?? "").slice(0, 80).padEnd(5, ".");

  const culqiRes = await fetch("https://api.culqi.com/v2/charges", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CULQI_SECRET_KEY}`,
    },
    body: JSON.stringify({
      amount,
      currency_code: "PEN",
      email,
      source_id: token,
      description: safeDescription,
    }),
  });

  const data = await culqiRes.json();

  // Culqi can return HTTP 201 even when the issuing bank declined the charge —
  // the real result is in outcome.type, not the HTTP status.
  const declined = !culqiRes.ok || data.outcome?.type !== "venta_exitosa";

  if (declined) {
    console.error("Culqi charge failed", { email, description: safeDescription, culqiError: data });
    return NextResponse.json(
      { ok: false, error: data.outcome?.user_message ?? data.user_message ?? "Charge failed" },
      { status: 400 }
    );
  }

  return NextResponse.json({ ok: true });
}
