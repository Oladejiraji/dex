import MainAssets from "@/lib/assets/main";
import Image from "next/image";
import React from "react";

const Test = () => {
  return (
    <div className="bg-white w-screen h-screen">
      <div className="">
        <Image src={MainAssets.StraightPanel} alt="Panel" />
      </div>
    </div>
  );
};

export default Test;
