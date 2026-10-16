import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.fullName} — Associate Product Manager`;
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
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(120deg, #f6efe6 0%, #f3dbe2 60%, #f6c9a8 100%)",
          color: "#2a1c22",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#b83d66",
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </div>
          <div style={{ display: "flex", fontSize: 96, lineHeight: 1, marginTop: 24 }}>
            {site.brand}
          </div>
          <div style={{ display: "flex", fontSize: 36, marginTop: 28, color: "#4a3a41" }}>
            Associate Product Manager · System Analyst
          </div>
          <div style={{ display: "flex", fontSize: 26, marginTop: 40, color: "#7a6670" }}>
            {site.url.replace("https://", "")}
          </div>
        </div>
        <img
          src={site.photoUrl}
          alt=""
          width={380}
          height={480}
          style={{ objectFit: "contain", objectPosition: "bottom" }}
        />
      </div>
    ),
    size,
  );
}
