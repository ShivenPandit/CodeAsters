import type { Metadata } from "next";
import SEO, { createSEOMetadata } from "@/components/SEO";
import PaymentPage from "@/components/pages/PaymentPage";
import { buildStandardBreadcrumb, buildWebPageSchema } from "@/lib/seo";

const paymentTitle = "Payment";
const paymentDescription = "Complete your payment securely with PhonePe.";

export const metadata: Metadata = createSEOMetadata({
  title: paymentTitle,
  description: paymentDescription,
  path: "/payment",
  keywords: ["payment", "PhonePe", "checkout", "secure payment"],
});

export default function Payment() {
  return (
    <>
      <SEO
        idPrefix="payment-schema"
        schema={[
          buildWebPageSchema({
            title: paymentTitle,
            description: paymentDescription,
            path: "/payment",
          }),
          buildStandardBreadcrumb("Payment", "/payment"),
        ]}
      />
      <PaymentPage />
    </>
  );
}
