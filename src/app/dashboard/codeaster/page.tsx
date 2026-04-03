import type { Metadata } from "next";
import { createSEOMetadata } from "@/components/SEO";
import AffiliateDashboard from "@/components/affiliate/AffiliateDashboard";

export const metadata: Metadata = createSEOMetadata({
  title: "Affiliate Dashboard — CodeAsters",
  description:
    "Manage your CodeAsters affiliate account: view leads, track conversions, and monitor your earnings.",
  path: "/dashboard/codeaster",
  noindex: true,
});

export default function DashboardPage() {
  return <AffiliateDashboard />;
}
