import Hero from "@/components/home/Hero";
import ServicesPreview from "@/components/home/ServicesPreview";
import WorkPreview from "@/components/home/WorkPreview";
import ProcessPreview from "@/components/home/ProcessPreview";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <WorkPreview />
      <ProcessPreview />
      <CTA />
    </>
  );
}
