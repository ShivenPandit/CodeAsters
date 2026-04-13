import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Inter, Arial, sans-serif",
          background:
            "radial-gradient(1200px 500px at 20% 0%, rgba(99,102,241,0.2), transparent 60%), linear-gradient(135deg, #f8fafc 0%, #eef2ff 45%, #e2e8f0 100%)",
          color: "#0A0A0A",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(15,23,42,0.12) 100%)",
          }}
        />

        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            padding: "56px 64px",
            zIndex: 1,
            gap: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "58%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  background: "#6366F1",
                  boxShadow: "0 0 0 6px rgba(99,102,241,0.16)",
                }}
              />
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: 0.2,
                  color: "#1E1B4B",
                }}
              >
                CodeAsters
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div
                style={{
                  fontSize: 58,
                  lineHeight: 1.05,
                  fontWeight: 800,
                  letterSpacing: -1.2,
                  maxWidth: 640,
                }}
              >
                Software built for performance, scale, and precision.
              </div>
              <div
                style={{
                  fontSize: 26,
                  lineHeight: 1.3,
                  color: "#334155",
                  maxWidth: 640,
                }}
              >
                Websites, full-stack products, dashboards, ERP systems, and cloud-ready platforms.
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 22,
                color: "#475569",
              }}
            >
              <span
                style={{
                  padding: "8px 14px",
                  borderRadius: 999,
                  border: "1px solid rgba(99,102,241,0.22)",
                  background: "rgba(99,102,241,0.08)",
                  color: "#4F46E5",
                  fontWeight: 700,
                }}
              >
                codeasters.com
              </span>
              <span>Full-Stack Software Development Agency</span>
            </div>
          </div>

          <div
            style={{
              width: "42%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "88%",
                borderRadius: 28,
                border: "1px solid rgba(148,163,184,0.32)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.88), rgba(241,245,249,0.78))",
                boxShadow:
                  "0 28px 80px -35px rgba(15,23,42,0.5), inset 0 1px 0 rgba(255,255,255,0.9)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "16px 20px",
                  borderBottom: "1px solid rgba(148,163,184,0.25)",
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: 999, background: "#FCA5A5" }} />
                <div style={{ width: 10, height: 10, borderRadius: 999, background: "#FDE68A" }} />
                <div style={{ width: 10, height: 10, borderRadius: 999, background: "#86EFAC" }} />
                <div
                  style={{
                    marginLeft: 14,
                    borderRadius: 8,
                    border: "1px solid rgba(148,163,184,0.25)",
                    background: "rgba(255,255,255,0.8)",
                    padding: "6px 10px",
                    fontSize: 14,
                    color: "#64748B",
                  }}
                >
                  app.codeasters.io
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: 20 }}>
                <div
                  style={{
                    height: 22,
                    borderRadius: 8,
                    width: "72%",
                    background: "linear-gradient(90deg, rgba(99,102,241,0.24), rgba(14,165,233,0.2))",
                  }}
                />
                <div
                  style={{
                    height: 14,
                    borderRadius: 8,
                    width: "92%",
                    background: "rgba(148,163,184,0.28)",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    marginTop: 6,
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: 90,
                        borderRadius: 12,
                        border: "1px solid rgba(148,163,184,0.2)",
                        background: "rgba(255,255,255,0.78)",
                      }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    height: 132,
                    borderRadius: 14,
                    border: "1px solid rgba(148,163,184,0.2)",
                    background:
                      "linear-gradient(180deg, rgba(99,102,241,0.08), rgba(14,165,233,0.06), rgba(255,255,255,0.7))",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
