import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { consumeRateLimit } from "@/lib/server/rate-limit";
import { createPhonePeOrder } from "@/lib/server/phonepe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const rateLimitConfig = {
  max: 8,
  windowMs: 60 * 1000,
};
const orderCookieName = "phonepe_order_id";

function extractClientIp(headerList: Headers) {
  const xff = headerList.get("x-forwarded-for");
  if (xff) {
    const [firstIp] = xff.split(",");
    if (firstIp) return firstIp.trim();
  }

  const realIp = headerList.get("x-real-ip");
  if (realIp) return realIp.trim();

  return "unknown";
}

function hasTrustedOrigin(request: Request, headerList: Headers) {
  const origin = headerList.get("origin");
  if (!origin) return true;

  try {
    const requestOrigin = new URL(request.url).origin;
    return new URL(origin).origin === requestOrigin;
  } catch {
    return false;
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function toInteger(value: unknown) {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) return null;
  return parsed;
}

function stripControlChars(value: string) {
  return value.replace(/[\u0000-\u001F\u007F]/g, "");
}

function safeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return stripControlChars(value).trim().slice(0, maxLength);
}

function normalizePhoneNumber(value: string) {
  return value.replace(/[^\d+]/g, "");
}

function isValidPhoneNumber(value: string) {
  return /^\+?[0-9]{7,20}$/.test(value);
}

export async function POST(request: Request) {
  const headerList = await headers();
  const isDevelopment = process.env.NODE_ENV !== "production";

  if (!hasTrustedOrigin(request, headerList)) {
    return NextResponse.json({ ok: false, error: "Origin not allowed." }, { status: 403 });
  }

  if (!isDevelopment) {
    const clientIp = extractClientIp(headerList);
    const rateKey = `phonepe:create:${clientIp}`;
    const rateLimitResult = consumeRateLimit(
      rateKey,
      rateLimitConfig.max,
      rateLimitConfig.windowMs
    );

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again shortly." },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimitResult.retryAfterSeconds),
          },
        }
      );
    }
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  const data = asRecord(payload);
  if (!data) {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const amount = toInteger(data.amount);
  if (amount === null || amount < 100) {
    return NextResponse.json(
      { ok: false, error: "Amount must be at least 100 paise." },
      { status: 400 }
    );
  }

  const customerName = safeText(data.customerName, 80);
  const customerPhone = normalizePhoneNumber(safeText(data.customerPhone, 24));

  if (!customerName) {
    return NextResponse.json(
      { ok: false, error: "Customer name is required." },
      { status: 400 }
    );
  }

  if (!customerPhone || !isValidPhoneNumber(customerPhone)) {
    return NextResponse.json(
      { ok: false, error: "Valid customer phone number is required." },
      { status: 400 }
    );
  }

  try {
    const order = await createPhonePeOrder({
      amount,
      metaInfo: {
        udf1: customerName,
        udf2: customerPhone,
      },
    });

    const response = NextResponse.json(
      { ok: true, ...order },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
    response.cookies.set(orderCookieName, order.merchantOrderId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    return response;
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unable to create order.";
    return NextResponse.json(
      { ok: false, error: detail },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  }
}
