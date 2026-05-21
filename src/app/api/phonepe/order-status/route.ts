import { NextResponse } from "next/server";
import { getPhonePeOrderStatus } from "@/lib/server/phonepe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const merchantOrderId = searchParams.get("merchantOrderId");

  if (!merchantOrderId) {
    return NextResponse.json(
      { ok: false, error: "merchantOrderId is required." },
      { status: 400 }
    );
  }

  const details = searchParams.get("details") === "true";
  const errorContext = searchParams.get("errorContext") === "true";

  try {
    const status = await getPhonePeOrderStatus(merchantOrderId, {
      details,
      errorContext,
    });

    return NextResponse.json({ ok: true, status }, { status: 200 });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unable to fetch status.";
    return NextResponse.json({ ok: false, error: detail }, { status: 502 });
  }
}
