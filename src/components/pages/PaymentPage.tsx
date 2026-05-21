import PageHeader from "@/components/PageHeader";
import PhonePeCheckoutForm from "@/components/payments/PhonePeCheckoutForm";

export default function PaymentPage() {
  return (
    <>
      <PageHeader
        label="Payment"
        title="Complete your payment"
        description="Pay securely with PhonePe. You will be redirected to the PhonePe checkout page to finish the payment."
      />

      <section className="bg-page-soft section-space-bottom">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="rounded-2xl border border-[#E5E5E5] bg-white/90 p-6 shadow-sm backdrop-blur">
            <PhonePeCheckoutForm />
          </div>
          <p className="mt-4 text-xs text-[#6B7280]">
            Need help? Contact us at codeasters@gmail.com with your order reference.
          </p>
        </div>
      </section>
    </>
  );
}
