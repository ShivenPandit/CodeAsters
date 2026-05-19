import type { Metadata } from "next";
import SEO, { createSEOMetadata } from "@/components/SEO";
import {
  buildStandardBreadcrumb,
  buildWebPageSchema,
} from "@/lib/seo";

const termsTitle = "Terms of Service";
const termsDescription =
  "Review CodeAsters terms of service, including project scope, payment terms, intellectual property, and liability limitations.";
const LAST_UPDATED = "March 28, 2026";

export const metadata: Metadata = createSEOMetadata({
  title: termsTitle,
  description: termsDescription,
  path: "/terms",
  keywords: [
    "terms of service",
    "CodeAsters terms",
    "software services agreement",
  ],
});

export default function Terms() {
  return (
    <article className="bg-page-soft section-header-space" aria-labelledby="terms-title">
      <SEO
        idPrefix="terms-schema"
        schema={[
          buildWebPageSchema({
            title: termsTitle,
            description: termsDescription,
            path: "/terms",
          }),
          buildStandardBreadcrumb("Terms of Service", "/terms"),
        ]}
      />
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-[#6366F1] mb-4">
          Legal
        </span>
        <h1 id="terms-title" className="text-4xl sm:text-5xl font-semibold tracking-[-0.025em] leading-[1.1] text-[#0A0A0A] mb-6">
          Terms of Service
        </h1>

        <div className="space-y-8 text-sm text-[#6B7280] leading-relaxed">
          <p>Last updated: <time dateTime="2026-03-28">{LAST_UPDATED}</time></p>

          <section>
            <h2 className="text-lg font-semibold text-[#0A0A0A] mb-3">Agreement</h2>
            <p>
              By engaging CodeAsters for any project or service, you agree to the terms outlined below.
              These terms apply to all work performed by CodeAsters unless superseded by a separate
              written agreement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0A0A0A] mb-3">Services</h2>
            <p>
              CodeAsters provides web design, web development, dashboard development, business system
              development, UI/UX design, and related digital services. The specific scope of work for
              each project is defined through mutual agreement before work begins.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0A0A0A] mb-3">Payment</h2>
            <p>
              Payment terms, schedules, and amounts are agreed upon before the start of each project.
              Unless otherwise specified, a deposit is required before work begins, with remaining
              payments tied to project milestones.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0A0A0A] mb-3">Refund Policy</h2>
            <p>On any circumstances, refunds are not applicable.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0A0A0A] mb-3">Intellectual Property</h2>
            <p>
              Upon full payment, all custom code, designs, and deliverables created specifically for your
              project are transferred to you. CodeAsters retains the right to showcase the work in our
              portfolio unless otherwise agreed.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0A0A0A] mb-3">Revisions</h2>
            <p>
              Each project includes a reasonable number of revisions as defined in the project scope.
              Additional revisions beyond the agreed scope may be billed separately at an agreed rate.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0A0A0A] mb-3">Limitation of Liability</h2>
            <p>
              CodeAsters is not liable for any indirect, incidental, or consequential damages arising
              from the use of our services or deliverables. Our total liability is limited to the amount
              paid for the specific project in question.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0A0A0A] mb-3">Contact</h2>
            <p>
              For questions about these terms, please reach out at{" "}
              <a href="mailto:codeasters@gmail.com" className="text-[#6366F1] hover:underline">
                codeasters@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
