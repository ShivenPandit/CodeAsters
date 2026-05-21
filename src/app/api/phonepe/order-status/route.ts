import { NextResponse } from "next/server";
import { getPhonePeOrderStatus } from "@/lib/server/phonepe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const orderCookieName = "phonepe_order_id";

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

    const response = NextResponse.json(
      { ok: true, status },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
    const state =
      status && typeof status.state === "string" ? status.state.toUpperCase() : "";

    if (state === "COMPLETED" || state === "FAILED") {
      response.cookies.set(orderCookieName, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });
    }

    return response;
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unable to fetch status.";
    return NextResponse.json(
      { ok: false, error: detail },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  }
}
