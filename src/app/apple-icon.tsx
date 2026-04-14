import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "32px",
          background: "linear-gradient(135deg, #0A0A0A 0%, #202020 100%)",
          color: "#FFFFFF",
          fontSize: 74,
          fontWeight: 700,
          letterSpacing: -3,
          fontFamily:
            "ui-sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        }}
      >
        CA
      </div>
    ),
    {
      ...size,
    }
  );
}
