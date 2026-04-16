type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitStore = Map<string, RateLimitEntry>;

declare global {
  var __codeastersRateLimitStore: RateLimitStore | undefined;
}

const store: RateLimitStore =
  globalThis.__codeastersRateLimitStore ?? new Map<string, RateLimitEntry>();

globalThis.__codeastersRateLimitStore = store;

function pruneExpired(now: number) {
  if (store.size < 500) return;

  for (const [key, value] of store.entries()) {
    if (value.resetAt <= now) {
      store.delete(key);
    }
  }
}

export function consumeRateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  pruneExpired(now);

  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    store.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      allowed: true,
      remaining: Math.max(max - 1, 0),
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (current.count >= max) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(Math.ceil((current.resetAt - now) / 1000), 1),
    };
  }

  current.count += 1;
  store.set(key, current);

  return {
    allowed: true,
    remaining: Math.max(max - current.count, 0),
    retryAfterSeconds: Math.max(Math.ceil((current.resetAt - now) / 1000), 1),
  };
}
