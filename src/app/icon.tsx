import { ImageResponse } from "next/og";

// Original AY brand favicon artwork for this private demo.
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
          position: "relative",
          background: "#181512",
          border: "3px solid #C69749",
          borderRadius: 16,
          color: "#FAF7F2",
          fontFamily: "Georgia, serif",
          fontSize: 27,
          fontWeight: 600,
          letterSpacing: -2,
        }}
      >
        <span>AY</span>
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 7,
            height: 7,
            background: "#C69749",
            transform: "rotate(45deg)",
          }}
        />
      </div>
    ),
    size
  );
}
