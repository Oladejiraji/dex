import { ChainType } from "@/services/queries/coins/types";
import React, { useState } from "react";
import Button from "../shared/Button";
import Image from "next/image";
import MainAssets from "@/lib/assets/main";
import { useMotionTemplate, motion, useMotionValue } from "framer-motion";
import DiagonalLines from "./DiagonalLines";
import Link from "next/link";
import { AppRoutes } from "@/utils/routes";

const NetworkCard = ({ chain }: { chain: ChainType }) => {
  let maskImage = useMotionTemplate`radial-gradient(200px at 50% 50%, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  const [isHover, setIsHover] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const handleMouseEnter = () => {
    if (isAnimating) return; // Prevent hover state change during exit animation
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    setIsAnimating(true); // Start exit animation

    // Reset `isAnimating` after animation duration
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match this duration to your animation duration
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div>
        <Link href={AppRoutes.connect.path(chain.chainId)}>
          <Button className="border border-[#272727] px-[10px] py-[9px] rounded-[6px]">
            <p className="text-[13px] font-geist-medium text-[#CDCDCD] ">
              Bridge {chain.name}
            </p>
          </Button>
        </Link>
      </div>
      <div
        className="w-[200px] h-[200px] rounded-[10px] flex flex-col justify-between bg-[#040506] relative p-4 group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Positioned elements start */}
        {/* Mask with border shadow and linear gradient */}
        <div className="absolute left-0 top-0 z-[10] network_gradient w-full h-full rounded-[10px]" />
        {/* Mask with multiple diagonal lines */}
        <div className="absolute left-0 top-0 z-[11] h-full w-full">
          <DiagonalLines isHover={isHover} />
        </div>
        {/* 100% minus subtracted rectangle */}
        <div className="absolute w-full h-full left-0 top-0 z-[62]">
          <Image
            src={MainAssets.Subtract}
            alt="Subtract"
            className="w-[200px] h-[200px]"
          />
        </div>

        <motion.div
          className="absolute top-0 right-0 h-full w-full  z-[64]  rounded-[10px] mix-blend-overlay"
          // style={style}
          style={{
            background:
              "radial-gradient(circle, rgba(199,199,199,1) 0%, rgba(255,255,255,1) 100%)",
          }}
        />
        {/* Positioned elements end */}

        {/* This div is for layout stability */}
        <div className="h-5"></div>
        <div className="flex justify-center relative z-[65]">
          <Image
            src={chain.icon}
            alt="Chain Icon"
            width={56}
            height={56}
            className="rounded-[4px]"
          />
        </div>
        <div className="z-[62] relative">
          <p className="text-[#4B4B4B] text-[13px] font-geist-medium">
            {chain.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NetworkCard;
