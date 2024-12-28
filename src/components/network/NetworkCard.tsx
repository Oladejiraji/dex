import { ChainType } from "@/services/queries/coins/types";
import React, { useState } from "react";
import Button from "../shared/Button";
import Image from "next/image";
import MainAssets from "@/lib/assets/main";
import { motion } from "framer-motion";
import DiagonalLines from "./DiagonalLines";
import Link from "next/link";
import { AppRoutes } from "@/utils/routes";

const NetworkCard = ({ chain }: { chain: ChainType }) => {
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
          <Button className="border border-[#272727] px-[0.63rem] py-[0.56rem] rounded-[0.38rem]">
            <p className="text-[0.81rem] font-geist-medium text-[#CDCDCD] ">
              Swap {chain.name}
            </p>
          </Button>
        </Link>
      </div>
      <div
        className="w-[12.50rem] h-[12.50rem] rounded-[0.63rem] flex flex-col justify-between bg-[#040506] relative p-4 group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Positioned elements start */}
        {/* Mask with border shadow and linear gradient */}
        <div className="absolute left-0 top-0 z-[10] network_gradient w-full h-full rounded-[0.63rem]" />
        {/* Mask with multiple diagonal lines */}
        <div className="absolute left-0 top-0 z-[11] h-full w-full">
          <DiagonalLines isHover={isHover} />
        </div>
        {/* 100% minus subtracted rectangle */}
        <div className="absolute w-full h-full left-0 top-0 z-[62]">
          <Image
            src={MainAssets.Subtract}
            alt="Subtract"
            className="w-[12.50rem] h-[12.50rem]"
          />
        </div>

        <motion.div
          className="absolute top-0 right-0 h-full w-full  z-[64]  rounded-[0.63rem] mix-blend-overlay"
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
            className="rounded-[0.25rem]"
          />
        </div>
        <div className="z-[62] relative">
          <p className="text-[#4B4B4B] text-[0.81rem] font-geist-medium">
            {chain.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NetworkCard;
