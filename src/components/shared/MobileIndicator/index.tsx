"use client";
import DiagonalLines from "@/components/network/DiagonalLines";
import MainAssets from "@/lib/assets/main";
import Image from "next/image";
import React from "react";

const MobileIndicator = () => {
  return (
    //   <div className="w-[198px] h-[198px]">
    //   <Image src={MainAssets.ComingSoon} alt="Coming soon svg" />
    // </div>
    <main className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="h-[70%] flex items-center">
        <div className="w-[200px] h-[200px] rounded-[10px] flex flex-col justify-between bg-[#040506] relative p-4 group">
          {/* Positioned elements start */}
          {/* Mask with border shadow and linear gradient */}
          <div className="absolute left-0 top-0 z-[10] network_gradient w-full h-full rounded-[10px]" />
          {/* Mask with multiple diagonal lines */}
          {/* <div className="absolute left-0 top-0 z-[11] h-full w-full">
            <DiagonalLines isHover={true} />
          </div> */}
          {/* 100% minus subtracted rectangle */}
          <div className="absolute w-full h-full left-0 top-0 z-[62]">
            <Image
              src={MainAssets.Subtract}
              alt="Subtract"
              className="w-[200px] h-[200px]"
            />
          </div>

          <div
            className="absolute top-0 right-0 h-full w-full  z-[64]  rounded-[10px] mix-blend-overlay"
            // style={style}
            style={{
              background:
                "radial-gradient(circle, rgba(199,199,199,1) 0%, rgba(255,255,255,1) 100%)",
            }}
          />
          {/* Positioned elements end */}

          {/* This div is for layout stability */}
          <div className="h-[35px]"></div>
          <div className="flex justify-center gap-2 items-center relative z-[65]">
            <div className="h-4 w-3 mt-1 ">
              <Image
                src={MainAssets.RightGreyThick}
                alt="Left Icon for title button"
              />
            </div>
            <p className="text-[#414141] text-[18px]">Superbase</p>
          </div>
          <div className="z-[62] relative">
            <p className="text-[#4B4B4B] text-[12px] font-geist-medium">
              Coming Soon
            </p>
            <p className="text-[#4B4B4B] text-[12px] font-geist-medium">
              v.1.14
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start h-[30%]">
        <div className="w-[22px] h-[18px]">
          <Image src={MainAssets.Pc} alt="Pc svg" />
        </div>
        <p className="text-[#CCCCCC] text-sm font-geist-semibold leading-[18px] pt-5 pb-1">
          Open on your PC
        </p>
        <p className="text-[#919191] text-xs font-geist-medium leading-[15px]">
          For a better experience
        </p>
      </div>
    </main>
  );
};

export default MobileIndicator;
