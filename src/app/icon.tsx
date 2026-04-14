import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0A0A0A 0%, #202020 100%)",
        }}
      >
        <div
          style={{
            width: "78%",
            height: "78%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "120px",
            border: "16px solid rgba(255,255,255,0.2)",
            color: "#FFFFFF",
            fontSize: 220,
            fontWeight: 700,
            letterSpacing: -8,
            fontFamily:
              "ui-sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
          }}
        >
          CA
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
