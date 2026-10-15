import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
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
          background:
            "linear-gradient(120deg, #d9f0e4 0%, #fafbf8 42%, #fdefd8 100%)",
          color: "#0f172a",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#10b981",
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#3f4c5e",
            }}
          >
            {site.role}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, lineHeight: 1.05, letterSpacing: -3, fontWeight: 600 }}>{site.name}</div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.4,
              color: "#3f4c5e",
              marginTop: 24,
              maxWidth: 900,
            }}
          >
            {`Backend systems, full-stack delivery and AI engineering. ${site.yearsExperience} years in production.`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #c4cdc3",
            paddingTop: 28,
            fontSize: 24,
            color: "#3f4c5e",
          }}
        >
          <div>{site.location}</div>
          <div>TypeScript · Node.js · React · PostgreSQL · AWS</div>
        </div>
      </div>
    ),
    size,
  );
}
