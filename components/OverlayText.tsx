"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { clsx } from "clsx";

interface OverlayTextProps {
  scrollProgress: MotionValue<number>;
  start: number;
  end: number;
  title: string;
  subtitle: string;
  align?: "left" | "center" | "right";
  className?: string; // Add className prop
}

export default function OverlayText({
  scrollProgress,
  start,
  end,
  title,
  subtitle,
  align = "center",
  className, // destructure className
}: OverlayTextProps) {
  const opacity = useTransform(
    scrollProgress,
    [start, start + 0.05, end - 0.05, end],
    [0, 1, 1, 0]
  );
  
  const y = useTransform(
    scrollProgress,
    [start, start + 0.05, end - 0.05, end],
    [50, 0, 0, -50]
  );
  
  // Conditionally disable pointer events when not visible to prevent blocking clicks
  const pointerEvents = useTransform(opacity, (v) => (v > 0.1 ? "auto" : "none"));

  const alignClass = {
    left: "items-start text-left pl-8 md:pl-20",
    center: "items-center text-center",
    right: "items-end text-right pr-8 md:pr-20",
  }[align];

  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className={clsx(
        "fixed inset-0 flex flex-col justify-center pointer-events-none z-10 px-4",
        alignClass,
        className // Apply additional classes
      )}
    >
      <h2 className="text-5xl md:text-7xl lg:text-9xl font-serif text-[#D4AF37] mb-4">
        {title}
      </h2>
      <p className="text-lg md:text-2xl font-sans text-white/90 max-w-xl">
        {subtitle}
      </p>
    </motion.div>
  );
}
