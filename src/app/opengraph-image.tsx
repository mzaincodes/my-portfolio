import { ImageResponse } from "next/og";

import { siteConfig } from "@/data/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#050816",
          backgroundImage:
            "radial-gradient(900px circle at 15% 0%, rgba(59,130,246,0.35), transparent 55%), radial-gradient(700px circle at 90% 100%, rgba(139,92,246,0.30), transparent 55%)",
          color: "#F8FAFC",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            {siteConfig.initials}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#94A3B8",
            }}
          >
            Portfolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 82, fontWeight: 700, letterSpacing: -2 }}>
            {siteConfig.name}
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 600, color: "#60A5FA" }}>
            {siteConfig.role}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#94A3B8", maxWidth: 900 }}>
            {siteConfig.tagline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, color: "#64748B" }}>
          <div style={{ display: "flex" }}>Next.js</div>
          <div style={{ display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>TypeScript</div>
          <div style={{ display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>Node.js</div>
          <div style={{ display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>{siteConfig.location}</div>
        </div>
      </div>
    ),
    size,
  );
}
