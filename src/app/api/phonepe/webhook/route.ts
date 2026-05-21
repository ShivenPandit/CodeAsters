import { NextResponse } from "next/server";
import { verifyPhonePeWebhookAuth } from "@/lib/server/phonepe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!verifyPhonePeWebhookAuth(authHeader)) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  const data = payload as Record<string, unknown> | null;
  const event = data && typeof data.event === "string" ? data.event : "unknown";
  const payloadData = data && typeof data.payload === "object" ? data.payload : null;
  const merchantOrderId =
    payloadData && typeof payloadData === "object"
      ? (payloadData as Record<string, unknown>).merchantOrderId
      : null;

  console.info("[phonepe] webhook", {
    event,
    merchantOrderId: typeof merchantOrderId === "string" ? merchantOrderId : "unknown",
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
