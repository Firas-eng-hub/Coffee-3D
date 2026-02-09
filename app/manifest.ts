import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Frappuccino Atelier",
    short_name: "Frappuccino",
    description: "Cinematic coffee storytelling and fast Frappuccino ordering.",
    start_url: "/",
    display: "standalone",
    background_color: "#120c08",
    theme_color: "#fbbf24",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
