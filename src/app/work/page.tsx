import type { Metadata } from "next";
import WorkPage from "@/components/pages/WorkPage";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects by CodeAsters — real websites, dashboards, and business systems we designed and built.",
};

export default function Work() {
  return <WorkPage />;
}
