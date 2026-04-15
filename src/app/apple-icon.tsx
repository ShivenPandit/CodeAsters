import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

async function loadLogoDataUrl() {
  const logoPath = path.join(process.cwd(), "public", "codeasters-logo.png");
  const logo = await readFile(logoPath);
  return `data:image/png;base64,${logo.toString("base64")}`;
}

export default async function AppleIcon() {
  const logoDataUrl = await loadLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0A",
        }}
      >
        <div
          style={{
            width: "82%",
            height: "82%",
            backgroundImage: `url(${logoDataUrl})`,
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
