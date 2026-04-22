import { memo } from "react";

function HeroBackgroundBase() {
  return (
    <>
      <div className="ambient-glow top-[-200px] right-[-48px] opacity-60" />
      <div
        className="ambient-glow bottom-[-200px] left-[-150px] opacity-40"
        style={{ animationDelay: "-10s" }}
      />

      <div className="floating-dot w-3 h-3 top-[15%] left-[10%]" style={{ animationDelay: "0s" }} />
      <div className="floating-dot w-2 h-2 top-[70%] left-[85%]" style={{ animationDelay: "-2s" }} />
      <div className="floating-dot w-2.5 h-2.5 top-[40%] left-[5%]" style={{ animationDelay: "-4s" }} />
    </>
  );
}

const HeroBackground = memo(HeroBackgroundBase);

export default HeroBackground;
