import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frappuccino Atelier",
  description: "A cinematic Frappuccino website with immersive storytelling, social proof, and fast ordering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
