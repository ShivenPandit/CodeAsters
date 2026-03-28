import type { Metadata } from "next";
import StartProjectPage from "@/components/pages/StartProjectPage";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Tell CodeAsters about your build — scope, timeline, and budget. We respond with a clear plan.",
};

export default function Start() {
  return <StartProjectPage />;
}
