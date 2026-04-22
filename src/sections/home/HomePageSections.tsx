import dynamic from "next/dynamic";

const ServicesPreview = dynamic(() => import("@/components/home/ServicesPreview"), {
  loading: () => <div className="section-space" aria-hidden />,
});

const WorkPreview = dynamic(() => import("@/components/home/WorkPreview"), {
  loading: () => <div className="section-space" aria-hidden />,
});

const ProcessPreview = dynamic(() => import("@/components/home/ProcessPreview"), {
  loading: () => <div className="section-space" aria-hidden />,
});

const CTA = dynamic(() => import("@/components/home/CTA"), {
  loading: () => <div className="section-space" aria-hidden />,
});

export default function HomePageSections() {
  return (
    <>
      <ServicesPreview />
      <WorkPreview />
      <ProcessPreview />
      <CTA />
    </>
  );
}
