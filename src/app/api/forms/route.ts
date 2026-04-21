import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/server/emailjs";
import { validateFormSubmission, type FormType } from "@/lib/server/form-submission";
import { consumeRateLimit } from "@/lib/server/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RateLimitConfig = {
  max: number;
  windowMs: number;
};

const rateLimitByFormType: Record<FormType, RateLimitConfig> = {
  contact: {
    max: 6,
    windowMs: 10 * 60 * 1000,
  },
  project: {
    max: 4,
    windowMs: 20 * 60 * 1000,
  },
  affiliate: {
    max: 4,
    windowMs: 20 * 60 * 1000,
  },
};

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

export async function POST(request: Request) {
  const headerList = await headers();
  const isDevelopment = process.env.NODE_ENV !== "production";

  if (!hasTrustedOrigin(request, headerList)) {
    return NextResponse.json(
      { ok: false, error: "Origin not allowed." },
      { status: 403 }
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const validation = validateFormSubmission(payload);

  if (!validation.ok) {
    if (validation.silentlyDrop) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    return NextResponse.json(
      { ok: false, error: validation.error },
      { status: validation.status }
    );
  }

  if (!isDevelopment) {
    const clientIp = extractClientIp(headerList);
    const rateConfig = rateLimitByFormType[validation.formType];
    const rateKey = `${validation.formType}:${clientIp}`;
    const rateLimitResult = consumeRateLimit(rateKey, rateConfig.max, rateConfig.windowMs);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: "Too many requests. Please try again in a little while.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimitResult.retryAfterSeconds),
          },
        }
      );
    }
  }

  try {
    await sendEmail(validation.formType, validation.templateParams);
  } catch (error) {
    console.error("[forms] email send failure", error);
    const detail =
      error instanceof Error
        ? error.message
        : "Unexpected server error while sending email.";

    return NextResponse.json(
      {
        ok: false,
        error: isDevelopment
          ? detail
          : "Unable to send your message right now. Please try again shortly.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
