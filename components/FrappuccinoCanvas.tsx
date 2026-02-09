"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";
import { getFramePath, LAST_FRAME_INDEX } from "@/components/frameSequence";

interface FrappuccinoCanvasProps {
  scrollProgress: MotionValue<number>;
  reducedMotion?: boolean;
}

export default function FrappuccinoCanvas({ scrollProgress, reducedMotion = false }: FrappuccinoCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef(-1);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Preload images
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      const promises: Promise<void>[] = [];

      for (let i = 0; i <= LAST_FRAME_INDEX; i += 1) {
        const img = new Image();
        img.src = getFramePath(i);
        
        const promise = new Promise<void>((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => resolve(); // proceed anyway
        });
        
        promises.push(promise);
        loadedImages[i] = img;
      }

      await Promise.all(promises);
      setImages(loadedImages);
      setIsLoaded(true);
    };

    loadImages();
  }, []);

  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !images[index]) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw image maintaining aspect ratio
      const img = images[index];

      // Calculate aspect ratios to cover
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;

      let drawWidth;
      let drawHeight;
      let offsetX;
      let offsetY;

      if (canvasRatio > imgRatio) {
        // Canvas is wider than image (crop top/bottom)
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        // Canvas is taller than image (crop sides)
        drawWidth = canvas.height * imgRatio;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      currentFrameRef.current = index;
    },
    [images]
  );

  useMotionValueEvent(scrollProgress, "change", (latest) => {
      if (reducedMotion || !isLoaded || images.length === 0) return;
      
      // Map scroll (0 to 1) to frame index (0 to frameCount)
      const frameIndex = Math.min(
        LAST_FRAME_INDEX,
        Math.max(0, Math.floor(latest * LAST_FRAME_INDEX))
      );
      if (frameIndex === currentFrameRef.current) return;
      
      requestAnimationFrame(() => renderFrame(frameIndex));
  });
  
  // Handle resize
  useEffect(() => {
      const handleResize = () => {
          const canvas = canvasRef.current;
          if (canvas) {
              canvas.width = window.innerWidth;
              canvas.height = window.innerHeight;
              // Re-render current frame
              const frameIndex = Math.min(
                  LAST_FRAME_INDEX,
                  Math.max(
                    0,
                    Math.floor((reducedMotion ? 0 : scrollProgress.get()) * LAST_FRAME_INDEX)
                  )
              );
              if (isLoaded) renderFrame(frameIndex);
          }
      };
      
      window.addEventListener("resize", handleResize);
      handleResize(); // Init
      
      return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, reducedMotion, renderFrame, scrollProgress]);

  useEffect(() => {
    if (!isLoaded) return;
    const initialIndex = reducedMotion ? 0 : Math.floor(scrollProgress.get() * LAST_FRAME_INDEX);
    renderFrame(Math.min(LAST_FRAME_INDEX, Math.max(0, initialIndex)));
  }, [isLoaded, reducedMotion, renderFrame, scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full object-cover z-0"
    />
  );
}
