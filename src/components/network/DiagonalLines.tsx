import React, { useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import cx from "classnames";

const TOTAL_RECT = 64;
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
        "relative h-full w-full flex items-center justify-center overflow-hidden ",
        { "opacity-1": isShow },
        { "opacity-0": !isShow }
      )}
      style={{
        transition: "opacity",
        transitionDuration: `${(64 - 6) * 0.004}`,
      }}
    >
      {new Array(TOTAL_RECT).fill(0).map((_, i) => {
        const dim = i + 40 + i * 8;
        const zIndex = Math.abs(i - TOTAL_RECT) + 20;
        return (
          <motion.div
            key={i}
            className="bg-[transparent] border border-[grey] absolute rotate-45 "
            style={{ width: `${dim}px`, height: `${dim}px`, zIndex }}
            animate={{
              opacity: isHover ? 0.2 : 0,
              transition: {
                delay: isHover ? 0.01 * i : 0.004 * i,
                duration: isHover ? 0.1 : 0.04,
              },
            }}
          />
        );
      })}
    </div>
  );
};

export default DiagonalLines;
