import { ImageResponse } from "next/og";

// Brand icon artwork for the private demo. Brand artwork is original to this concept.
export const size = { width: 64, height: 64 };
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
          background: "#181512",
          border: "3px solid #C69749",
          borderRadius: 16,
          color: "#FAF7F2",
          fontFamily: "serif",
          fontSize: 27,
          fontWeight: 600,
          letterSpacing: -2,
        }}
      >
        <span>AY</span>
        <span style={{ color: "#C69749", fontSize: 12, marginLeft: 2 }}>✦</span>
      </div>
    ),
    size
  );
}
