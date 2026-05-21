import type { Metadata } from "next";
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

export default function PaymentReturn({
  searchParams,
}: {
  searchParams: { merchantOrderId?: string };
}) {
  const merchantOrderId =
    typeof searchParams.merchantOrderId === "string" ? searchParams.merchantOrderId : "";

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
