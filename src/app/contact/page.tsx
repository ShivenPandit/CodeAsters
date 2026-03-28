import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Say hello to CodeAsters — quick questions and introductions. For a full project brief, use Start a project.",
};

export default function Contact() {
  return <ContactPage />;
}
