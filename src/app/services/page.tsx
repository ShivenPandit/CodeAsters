import type { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, admin dashboards, business systems, UI/UX design, and performance optimization. See what CodeAsters builds.",
};

export default function Services() {
  return <ServicesPage />;
}
