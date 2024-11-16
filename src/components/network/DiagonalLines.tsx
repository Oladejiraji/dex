import React, { useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import cx from "classnames";

const TOTAL_RECT = 74;
const DiagonalLines = ({ isHover }: { isHover: boolean }) => {
  const [isShow, setIsShow] = useState(false);
  useLayoutEffect(() => {
    setTimeout(() => {
      setIsShow(true);
    }, 1000);
  }, []);
  return (
    <div
      className={cx(
        "relative h-full w-full flex items-center justify-center overflow-hidden",
        { "opacity-1": isShow },
        { "opacity-0": !isShow }
      )}
    >
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
              transition: { delay: 0.01 * i, duration: 0.1 },
            }}
          />
        );
      })}
    </div>
  );
};

export default DiagonalLines;
