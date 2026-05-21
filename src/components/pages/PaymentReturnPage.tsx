import PageHeader from "@/components/PageHeader";
import PhonePeReturnStatus from "@/components/payments/PhonePeReturnStatus";

export default function PaymentReturnPage({ merchantOrderId }: { merchantOrderId: string }) {
  return (
    <>
      <PageHeader
        label="Payment"
        title="Payment status"
        description="We are verifying your payment with PhonePe."
      />

      <section className="bg-page-soft section-space-bottom">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <PhonePeReturnStatus merchantOrderId={merchantOrderId} />
        </div>
      </section>
    </>
  );
}
