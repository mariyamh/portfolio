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
          background: "#fcfcfc",
          color: "#171717",
          padding: "80px 88px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#626262" }}>
          {`${site.role} · ${site.location}`}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 600, letterSpacing: -3 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 36, color: "#626262", marginTop: 20, maxWidth: 940 }}>
            I break things to understand how to make them better.
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#626262" }}>{site.url.replace(/^https?:\/\//, "")}</div>
      </div>
    ),
    size,
  );
}
