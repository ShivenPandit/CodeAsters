import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function Privacy() {
  return (
    <div className="pt-32 pb-20 bg-[#FAFAFB]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-[#6366F1] mb-4">
          Legal
        </span>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.025em] leading-[1.1] text-[#0A0A0A] mb-8">
          Privacy Policy
        </h1>

        <div className="prose-custom space-y-8 text-sm text-[#6B7280] leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

          <section>
            <h2 className="text-lg font-semibold text-[#0A0A0A] mb-3">Information We Collect</h2>
            <p>
              When you use our contact form, we collect your name, email address, phone number, and any
              project details you choose to share. We do not collect data automatically through cookies
              or tracking scripts beyond what is necessary for basic site functionality.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0A0A0A] mb-3">How We Use Your Information</h2>
            <p>
              We use the information you provide solely to respond to your inquiry and discuss potential
              project work. We do not sell, rent, or share your personal information with third parties
              for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0A0A0A] mb-3">Email Communication</h2>
            <p>
              Our contact form uses EmailJS to deliver your message to our team. By submitting the form,
              you consent to your information being processed through this service for the purpose of
              communication. You may receive an auto-reply confirming receipt of your message.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0A0A0A] mb-3">Data Retention</h2>
            <p>
              We retain your contact information only as long as necessary to complete our communication
              and any resulting project engagement. You may request deletion of your data at any time by
              emailing us at codeasters@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0A0A0A] mb-3">Third-Party Services</h2>
            <p>
              Our site is hosted on secure VPS infrastructure and uses EmailJS for form submissions. These services have
              their own privacy policies governing how they process data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0A0A0A] mb-3">Contact</h2>
            <p>
              If you have questions about this privacy policy, please contact us at{" "}
              <a href="mailto:codeasters@gmail.com" className="text-[#6366F1] hover:underline">
                codeasters@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
