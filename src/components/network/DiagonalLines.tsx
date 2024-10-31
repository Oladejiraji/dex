import React from "react";
import { motion } from "framer-motion";

const TOTAL_RECT = 74;
const DiagonalLines = ({ isHover }: { isHover: boolean }) => {
  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
      {new Array(TOTAL_RECT).fill(0).map((_, i) => {
        const dim = i + 40 + i * 3;
        const zIndex = Math.abs(i - TOTAL_RECT) + 20;
        return (
          <motion.div
            key={i}
            className="bg-[black] border border-[grey] absolute rotate-45 "
            style={{ width: `${dim}px`, height: `${dim}px`, zIndex }}
            animate={{
              opacity: isHover ? 0.1 : 0.02,
              transition: { delay: 0.01 * i },
            }}
          />
        );
      })}
    </div>
  );
};

export default DiagonalLines;
