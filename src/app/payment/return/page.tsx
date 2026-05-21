import type { Metadata } from "next";
import { cookies } from "next/headers";
import SEO, { createSEOMetadata } from "@/components/SEO";
import PaymentReturnPage from "@/components/pages/PaymentReturnPage";
import { buildStandardBreadcrumb, buildWebPageSchema } from "@/lib/seo";

const returnTitle = "Payment Status";
const returnDescription = "Verify your PhonePe payment status.";

export const metadata: Metadata = createSEOMetadata({
  title: returnTitle,
  description: returnDescription,
  path: "/payment/return",
  keywords: ["payment status", "PhonePe", "order status"],
});

const orderCookieName = "phonepe_order_id";

export default async function PaymentReturn({
  searchParams,
}: {
  searchParams: Promise<{ merchantOrderId?: string; orderId?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const cookieStore = await cookies();
  const merchantOrderId =
    typeof resolvedSearchParams.merchantOrderId === "string"
      ? resolvedSearchParams.merchantOrderId
      : typeof resolvedSearchParams.orderId === "string"
        ? resolvedSearchParams.orderId
        : cookieStore.get(orderCookieName)?.value || "";

  return (
    <>
      <SEO
        idPrefix="payment-status-schema"
        schema={[
          buildWebPageSchema({
            title: returnTitle,
            description: returnDescription,
            path: "/payment/return",
          }),
          buildStandardBreadcrumb("Payment Status", "/payment/return"),
        ]}
      />
      <PaymentReturnPage merchantOrderId={merchantOrderId} />
    </>
  );
}
