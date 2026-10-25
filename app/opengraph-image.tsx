import { ImageResponse } from "next/og";
export const alt =
  "Build With Owen — Full Stack Websites. Built to Win Business.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#071627",
        color: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
      }}
    >
      <div style={{ fontSize: 26, color: "#a9bdd3", marginBottom: 38 }}>
        Build With Owen.
      </div>
      <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -3 }}>
        Full Stack Websites.
      </div>
      <div
        style={{
          fontSize: 76,
          fontWeight: 700,
          letterSpacing: -3,
          color: "#09b4fd",
        }}
      >
        Built to Win Business.
      </div>
      <div style={{ fontSize: 22, color: "#a9bdd3", marginTop: 38 }}>
        Websites · SEO · Ads · CRM · Automation
      </div>
    </div>,
    size,
  );
}
