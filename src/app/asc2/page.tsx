import MainAssets from "@/lib/assets/main";
import Image from "next/image";
import React from "react";

const Asc2 = () => {
  return (
    <div
      className="h-screen w-screen bg-white flex items-center justify-center relative "
      style={{ perspective: "1000px" }}
    >
      <div className="h-[500px] w-[500px] panel_con absolute">
        <Image src={MainAssets.StraightPanel} alt="panel" />
      </div>
    </div>
  );
};

export default Asc2;
