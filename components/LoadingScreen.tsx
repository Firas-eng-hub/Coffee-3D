"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getFramePath, LAST_FRAME_INDEX, TOTAL_FRAME_COUNT } from "@/components/frameSequence";

export default function LoadingScreen({ onLoaded }: { onLoaded: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    let loadedCount = 0;
    let finishTimeout: ReturnType<typeof setTimeout> | null = null;

    const markFrameProcessed = () => {
      loadedCount += 1;
      if (!mounted) return;

      const nextProgress = Math.min(100, Math.round((loadedCount / TOTAL_FRAME_COUNT) * 100));
      setProgress(nextProgress);

      if (loadedCount === TOTAL_FRAME_COUNT) {
        setIsLoaded(true);
        finishTimeout = setTimeout(() => onLoaded(), 350);
      }
    };

    for (let i = 0; i <= LAST_FRAME_INDEX; i += 1) {
      const img = new Image();
      img.onload = markFrameProcessed;
      img.onerror = markFrameProcessed;
      img.src = getFramePath(i);
    }

    return () => {
      mounted = false;
      if (finishTimeout) clearTimeout(finishTimeout);
    };
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#120c08] text-[#fbbf24]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl"
          >
            Brewing the Experience
          </motion.p>
          <div className="mt-8 h-1.5 w-56 overflow-hidden rounded-full bg-white/15 md:w-72">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#f59e0b] to-[#fbbf24]"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.2 }}
            />
          </div>
          <div className="mt-4 text-xs tracking-[0.25em] text-white/70 uppercase">
            {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
