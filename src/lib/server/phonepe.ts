import "server-only";

import crypto from "crypto";

type PhonePeTokenResponse = {
  access_token: string;
  expires_at?: number;
  token_type?: string;
};

type PhonePeCheckoutResponse = {
  orderId: string;
  state: string;
  expireAt?: number;
  redirectUrl: string;
};

type PhonePeStatusResponse = Record<string, unknown>;

export type PhonePeCreateOrderInput = {
  amount: number;
  merchantOrderId?: string;
  metaInfo?: Record<string, string>;
  expireAfter?: number;
};

const TOKEN_SAFETY_BUFFER_MS = 60_000;
const PHONEPE_OAUTH_URL = "https://api.phonepe.com/apis/identity-manager/v1/oauth/token";
const PHONEPE_CHECKOUT_URL = "https://api.phonepe.com/apis/pg/checkout/v2/pay";
const PHONEPE_STATUS_URL_BASE = "https://api.phonepe.com/apis/pg/checkout/v2/order";

let tokenCache: { token: string; expiresAtMs: number } | null = null;

function requireEnv(key: string) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing ${key} environment variable.`);
  }
  return value;
}

function getStatusUrl(merchantOrderId: string) {
  return `${PHONEPE_STATUS_URL_BASE}/${merchantOrderId}/status`;
}

function getMerchantHeaders(): Record<string, string> {
  if (process.env.PHONEPE_PARTNER_MODE !== "true") return {};

  const merchantId = process.env.PHONEPE_MERCHANT_ID;
  if (!merchantId) return {};
  return { "X-MERCHANT-ID": merchantId };
}

function generateMerchantOrderId() {
  const shortId = crypto.randomBytes(4).toString("hex").toUpperCase();
  return `MO${Date.now()}${shortId}`;
}

function assertMerchantOrderId(value: string) {
  if (!/^[A-Za-z0-9]{1,63}$/.test(value)) {
    throw new Error("Invalid merchantOrderId format.");
  }
}

async function fetchPhonePeToken() {
  const response = await fetch(PHONEPE_OAUTH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: requireEnv("PHONEPE_CLIENT_ID"),
      client_version: requireEnv("PHONEPE_CLIENT_VERSION"),
      client_secret: requireEnv("PHONEPE_CLIENT_SECRET"),
      grant_type: "client_credentials",
    }),
    cache: "no-store",
  });

  const data = (await response.json().catch(() => null)) as PhonePeTokenResponse | null;

  if (!response.ok || !data?.access_token) {
    const record = data as Record<string, unknown> | null;
    const message = record && typeof record.message === "string" ? record.message : null;
    const code = record && typeof record.code === "string" ? record.code : null;
    console.error("[phonepe] token request failed", {
      status: response.status,
      code,
      message,
      data,
    });
    throw new Error(message || code || `PhonePe token request failed (${response.status}).`);
  }

  const expiresAtMs = data.expires_at ? data.expires_at * 1000 : Date.now() + 20 * 60 * 1000;
  tokenCache = {
    token: data.access_token,
    expiresAtMs,
  };

  return tokenCache.token;
}

async function getAccessToken() {
  if (tokenCache && tokenCache.expiresAtMs - TOKEN_SAFETY_BUFFER_MS > Date.now()) {
    return tokenCache.token;
  }

  return fetchPhonePeToken();
}

export function buildPhonePeRedirectUrl(merchantOrderId: string) {
  const redirectBase = requireEnv("PHONEPE_REDIRECT_URL");
  const redirectUrl = new URL(redirectBase);
  redirectUrl.searchParams.set("merchantOrderId", merchantOrderId);
  return redirectUrl.toString();
}

function readExpireAfterFromEnv() {
  const raw = process.env.PHONEPE_EXPIRE_AFTER_SECONDS;
  if (!raw) return undefined;
  const value = Number(raw);
  if (!Number.isFinite(value)) return undefined;
  return Math.max(Math.floor(value), 0);
}

export async function createPhonePeOrder(input: PhonePeCreateOrderInput) {
  const token = await getAccessToken();
  const merchantOrderId = input.merchantOrderId ?? generateMerchantOrderId();
  assertMerchantOrderId(merchantOrderId);

  const redirectUrl = buildPhonePeRedirectUrl(merchantOrderId);
  const expireAfter = input.expireAfter ?? readExpireAfterFromEnv();

  const payload: Record<string, unknown> = {
    merchantOrderId,
    amount: input.amount,
    paymentFlow: {
      type: "PG_CHECKOUT",
      merchantUrls: {
        redirectUrl,
      },
    },
    ...(expireAfter ? { expireAfter } : {}),
    ...(input.metaInfo ? { metaInfo: input.metaInfo } : {}),
  };

  const response = await fetch(PHONEPE_CHECKOUT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `O-Bearer ${token}`,
      ...getMerchantHeaders(),
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const data = (await response.json().catch(() => null)) as PhonePeCheckoutResponse | null;

  if (!response.ok || !data?.redirectUrl) {
    const record = data as Record<string, unknown> | null;
    const message = record && typeof record.message === "string" ? record.message : null;
    const code = record && typeof record.code === "string" ? record.code : null;
    console.error("[phonepe] create order failed", {
      status: response.status,
      code,
      message,
      data,
    });
    throw new Error(message || code || `PhonePe create order failed (${response.status}).`);
  }

  return {
    ...data,
    merchantOrderId,
  };
}

export async function getPhonePeOrderStatus(
  merchantOrderId: string,
  options: { details?: boolean; errorContext?: boolean } = {}
) {
  const token = await getAccessToken();
  assertMerchantOrderId(merchantOrderId);

  const url = new URL(getStatusUrl(merchantOrderId));
  url.searchParams.set("details", String(Boolean(options.details)));
  url.searchParams.set("errorContext", String(Boolean(options.errorContext)));

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `O-Bearer ${token}`,
      ...getMerchantHeaders(),
    },
    cache: "no-store",
  });

  const data = (await response.json().catch(() => null)) as PhonePeStatusResponse | null;

  if (!response.ok || !data) {
    throw new Error(`PhonePe order status failed (${response.status}).`);
  }

  return data;
}

export function verifyPhonePeWebhookAuth(authHeader: string | null) {
  const username = process.env.PHONEPE_WEBHOOK_USERNAME;
  const password = process.env.PHONEPE_WEBHOOK_PASSWORD;

  if (!username || !password || !authHeader) return false;

  const expectedHash = crypto
    .createHash("sha256")
    .update(`${username}:${password}`)
    .digest("hex");

  const normalized = authHeader.trim().replace(/^SHA256\s*/i, "");
  if (normalized.length !== expectedHash.length) return false;

  return crypto.timingSafeEqual(Buffer.from(normalized), Buffer.from(expectedHash));
}
