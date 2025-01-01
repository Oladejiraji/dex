'use client';
import MainAssets from '@/lib/assets/main';
import Image from 'next/image';
import React from 'react';

const MobileIndicator = () => {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="flex h-[70%] items-center">
        <div className="group relative flex h-[12.50rem] w-[12.50rem] flex-col justify-between rounded-[0.63rem] bg-[#040506] p-4">
          {/* Positioned elements start */}
          {/* Mask with border shadow and linear gradient */}
          <div className="network_gradient absolute left-0 top-0 z-[10] h-full w-full rounded-[0.63rem]" />
          {/* 100% minus subtracted rectangle */}
          {/* <div className="absolute left-0 top-0 z-[62] h-full w-full">
            <Image src={MainAssets.Subtract} alt="Subtract" className="h-[12.50rem] w-[12.50rem]" />
          </div> */}

          <div className="absolute left-0 top-0 z-[11] h-full w-full opacity-50">
            <Image
              alt="diagonal lines overlay"
              src={MainAssets.DiagonalLines}
              width={200}
              height={200}
              className="rounded-[0.63rem]"
            />
          </div>
          {new Array(9).fill(0).map((_, i) => (
            <div
              key={i}
              style={{ animationDelay: `${i * 1}s` }}
              className="pulsing_radial_gradient absolute right-0 top-0 z-[64] h-full w-full rounded-[0.63rem] mix-blend-overlay"
            />
          ))}
          {/* Positioned elements end */}

          {/* This div is for layout stability */}
          <div className="h-[2.19rem]"></div>
          <div className="relative z-[65] flex items-center justify-center gap-2">
            <div className="mt-1 h-4 w-3">
              <Image src={MainAssets.RightGreyThick} alt="Left Icon for title button" />
            </div>
            <p className="text-[1.13rem] text-[#414141]">Superbase</p>
          </div>
          <div className="relative z-[62]">
            <p className="font-geist-medium text-[0.75rem] text-[#4B4B4B]">Coming Soon</p>
            <p className="font-geist-medium text-[0.75rem] text-[#4B4B4B]">v.1.14</p>
          </div>
        </div>
      </div>
      <div className="flex h-[30%] flex-col items-center justify-start">
        <div className="h-[1.13rem] w-[1.38rem]">
          <Image src={MainAssets.Pc} alt="Pc svg" />
        </div>
        <p className="pb-1 pt-5 font-geist-semibold text-sm leading-[1.13rem] text-[#CCCCCC]">Open on your PC</p>
        <p className="font-geist-medium text-xs leading-[0.94rem] text-[#919191]">For a better experience</p>
      </div>
    </main>
  );
};

export default MobileIndicator;
