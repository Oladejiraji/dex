"use client";

import MainAssets from "@/lib/assets/main";
import Image from "next/image";
import * as React from "react";

export default function TestComp() {
  return (
    <div className="test-con h-screen w-screen flex items-center justify-center">
      <div className="w-[400px] h-[400px] test-rotate">
        <Image src={MainAssets.StraightPanel} alt="Straight panel" />
      </div>
    </div>
  );
}
