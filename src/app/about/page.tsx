import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "CodeAsters is a modern digital studio focused on clarity, performance, and polished user experience. Learn about our approach.",
};

export default function About() {
  return <AboutPage />;
}
