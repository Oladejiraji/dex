import MainAssets from "@/lib/assets/main";
import Image from "next/image";
import React from "react";

const Test = () => {
  return (
    <div>
      <div className="h-[100px]">
        <Image src={MainAssets.Panel} alt="Panel" />
      </div>
    </div>
  );
};

export default Test;
