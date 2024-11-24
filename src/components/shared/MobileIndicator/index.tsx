import MainAssets from "@/lib/assets/main";
import Image from "next/image";
import React from "react";

const MobileIndicator = () => {
  return (
    <main className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="h-[70%] flex items-center">
        <div className="w-[198px] h-[198px]">
          <Image src={MainAssets.ComingSoon} alt="Coming soon svg" />
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
