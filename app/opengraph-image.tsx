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
          display: "flex",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at 10% 20%, rgba(255, 211, 128, 0.4), transparent 35%), radial-gradient(circle at 90% 10%, rgba(255, 190, 92, 0.35), transparent 32%), linear-gradient(135deg, #1b120c, #2c1a0f 55%, #3a2415)",
          color: "#f8f1e7",
          padding: "72px",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid rgba(255, 213, 144, 0.5)",
            borderRadius: "999px",
            padding: "10px 22px",
            fontSize: "24px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Frappuccino Atelier
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "88px",
              lineHeight: 1,
              color: "#ffd48c",
            }}
          >
            Cinematic Cold Craft
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "34px",
              color: "rgba(248, 241, 231, 0.9)",
              maxWidth: "900px",
            }}
          >
            Premium texture, flavor storytelling, and one-minute ordering.
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
