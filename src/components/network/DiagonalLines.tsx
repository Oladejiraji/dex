import React, { useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import cx from 'classnames';

const TOTAL_RECT = 64;
const DiagonalLines = ({ isHover }: { isHover: boolean }) => {
  console.log(isHover);
  const [isShow, setIsShow] = useState(false);
  useLayoutEffect(() => {
    setTimeout(() => {
      setIsShow(true);
    }, 1000);
  }, []);
  return (
    <div
      className={cx(
        'relative flex h-full w-full items-center justify-center overflow-hidden',
        { 'opacity-1': isShow },
        { 'opacity-0': !isShow }
      )}
      style={{
        transition: 'opacity',
        transitionDuration: `${(64 - 6) * 0.004}`,
      }}
    >
      {new Array(TOTAL_RECT).fill(0).map((_, i) => {
        const dim = i + 40 + i * 8;
        const zIndex = Math.abs(i - TOTAL_RECT) + 20;
        // const delay = isHover ? 0.01 * i : 0.004 * i;
        return (
          <motion.div
            key={i}
            className="absolute rotate-45 border border-[#272727] bg-[transparent]"
            style={{ width: `${dim}px`, height: `${dim}px`, zIndex }}
            animate={{
              opacity: 0.8,
              // opacity: isHover ? 0.8 : 0,
              transition: {
                // delay,
                // duration: isHover ? 0.1 : 0.04,
                // repeatType: "mirror",
                // repeat: 3,
                // repeatDelay: delay * (TOTAL_RECT / 10),
              },
            }}
          />
        );
      })}
    </div>
  );
};

export default DiagonalLines;
