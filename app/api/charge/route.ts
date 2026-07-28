import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token, amount, email, description } = await req.json();

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
      description,
    }),
  });

  const data = await culqiRes.json();

  if (!culqiRes.ok) {
    return NextResponse.json({ ok: false, error: data.user_message ?? "Charge failed" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
