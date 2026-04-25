type MetaPixelEventName = "PageView" | "Contact" | "Lead" | "Purchase";
type MetaPixelParams = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackMetaPixelEvent(
  eventName: MetaPixelEventName,
  params?: MetaPixelParams
) {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") return;

  if (params) {
    window.fbq("track", eventName, params);
    return;
  }

  window.fbq("track", eventName);
}
