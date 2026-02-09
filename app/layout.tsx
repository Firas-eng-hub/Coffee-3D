import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://coffee-3d.vercel.app"),
  title: {
    default: "Frappuccino Atelier | Cinematic Coffee Experience",
    template: "%s | Frappuccino Atelier",
  },
  description:
    "Discover a cinematic Frappuccino landing experience with flavor details, social proof, and a fast ordering flow built for mobile and desktop.",
  keywords: [
    "frappuccino",
    "coffee",
    "cold coffee",
    "coffee shop",
    "premium beverage",
    "next.js coffee website",
  ],
  authors: [{ name: "Frappuccino Atelier" }],
  creator: "Frappuccino Atelier",
  publisher: "Frappuccino Atelier",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Frappuccino Atelier | Cinematic Coffee Experience",
    description:
      "A premium cold craft experience with immersive storytelling, trusted reviews, and one-minute ordering.",
    siteName: "Frappuccino Atelier",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Frappuccino Atelier cinematic coffee experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frappuccino Atelier | Cinematic Coffee Experience",
    description:
      "Explore flavor, texture, and quick ordering in a cinematic Frappuccino website.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const preloadFrames = Array.from({ length: 10 }, (_, index) =>
    `/frames/frame_${index.toString().padStart(3, "0")}.jpg`
  );

  return (
    <html lang="en">
      <head>
        {preloadFrames.map((href) => (
          <link key={href} rel="preload" as="image" href={href} />
        ))}
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
