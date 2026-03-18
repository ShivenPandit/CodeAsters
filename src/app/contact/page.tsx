import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with CodeAsters. Tell us about your project and we'll respond within 24 hours.",
};

export default function Contact() {
  return <ContactPage />;
}
