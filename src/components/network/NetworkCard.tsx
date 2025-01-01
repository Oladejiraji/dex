import { ChainType } from '@/services/queries/coins/types';
import React, { useState } from 'react';
import Button from '../shared/Button';
import Image from 'next/image';
import MainAssets from '@/lib/assets/main';
import Link from 'next/link';
import { AppRoutes } from '@/utils/routes';

const NetworkCard = ({ chain }: { chain: ChainType }) => {
  const [_, setIsHover] = useState(false);
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
          <Button className="rounded-[0.38rem] border border-[#272727] px-[0.63rem] py-[0.56rem]">
            <p className="font-geist-medium text-[0.81rem] text-[#CDCDCD]">Swap {chain.name}</p>
          </Button>
        </Link>
      </div>
      <div
        className="group relative flex h-[12.50rem] w-[12.50rem] flex-col justify-between rounded-[0.63rem] bg-[#040506] p-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Positioned elements start */}
        {/* Mask with border shadow and linear gradient */}
        <div className="network_gradient absolute left-0 top-0 z-[10] h-full w-full rounded-[0.63rem]" />
        {/* Mask with multiple diagonal lines */}
        <div className="absolute left-0 top-0 z-[11] h-full w-full">
          <Image alt="diagonal lines overlay" src={MainAssets.DiagonalLines} />
        </div>
        {/* 100% minus subtracted rectangle */}
        <div className="absolute left-0 top-0 z-[62] h-full w-full">
          <Image src={MainAssets.Subtract} alt="Subtract" className="h-[12.50rem] w-[12.50rem]" />
        </div>

        {/* Hover component */}
        <div className="pulsing_hover absolute inset-0 z-[66] h-full w-full" />

        {new Array(4).fill(0).map((_, index) => (
          <div
            key={index}
            style={{ animationDelay: `${index * 1.2}s` }}
            className="pulsing_radial_gradient_network pointer-events-none absolute right-0 top-0 z-[64] h-full w-full touch-none rounded-[0.63rem] mix-blend-overlay"
          />
        ))}
        {/* Positioned elements end */}

        {/* This div is for layout stability */}
        <div className="h-5"></div>
        <div className="pointer-events-none relative z-[65] flex touch-none justify-center">
          <Image src={chain.icon} alt="Chain Icon" width={56} height={56} className="rounded-[0.25rem]" />
        </div>
        <div className="relative z-[62]">
          <p className="font-geist-medium text-[0.81rem] text-[#4B4B4B]">{chain.name}</p>
        </div>
      </div>
    </div>
  );
};

export default NetworkCard;
