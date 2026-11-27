import { ImageResponse } from "next/og";

export const alt = "Cosmin-Ionel Enachescu — Informatics, Machine Learning & AI — Oslo, Norway";
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
          padding: 72,
          background: "radial-gradient(circle at 85% 10%, rgba(124,92,255,0.35), #0b0b0d 55%)",
          color: "#e8e8ec",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#9898a2", fontFamily: "monospace" }}>
          PORTFOLIO &amp; CV — OSLO, NORWAY
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 120, lineHeight: 0.95 }}>
          <span style={{ fontStyle: "italic", color: "#b9b9c2" }}>Cosmin-Ionel</span>
          <span>Enachescu</span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#a08cff", fontFamily: "monospace" }}>
          Informatics · Machine Learning &amp; AI · University of Oslo
        </div>
      </div>
    ),
    size,
  );
}
